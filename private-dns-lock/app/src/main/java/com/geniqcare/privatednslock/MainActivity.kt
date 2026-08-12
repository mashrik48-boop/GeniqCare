package com.geniqcare.privatednslock

import android.app.admin.DevicePolicyManager
import android.content.ClipData
import android.content.ClipboardManager
import android.content.ComponentName
import android.content.Context
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.os.UserManager
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity

private const val PREFS = "dns_lock_prefs"
private const val KEY_UNLOCK_AT = "unlock_at_millis"
private const val KEY_HOSTNAME = "dns_hostname"
private const val DEFAULT_HOSTNAME = "dns.adguard.com"
private const val ADB_COMMAND =
    "adb shell dpm set-device-owner com.geniqcare.privatednslock/.AdminReceiver"

class MainActivity : AppCompatActivity() {

    private lateinit var dpm: DevicePolicyManager
    private lateinit var admin: ComponentName
    private lateinit var prefs: android.content.SharedPreferences

    private lateinit var statusText: TextView
    private lateinit var setupBlock: android.view.View
    private lateinit var adbCommandText: TextView
    private lateinit var lockBlock: android.view.View
    private lateinit var hostnameInput: EditText
    private lateinit var durationInput: EditText
    private lateinit var lockButton: Button
    private lateinit var unlockButton: Button
    private lateinit var countdownText: TextView
    private lateinit var relinquishButton: Button

    private val handler = Handler(Looper.getMainLooper())
    private val tickRunnable = object : Runnable {
        override fun run() {
            refreshLockState()
            handler.postDelayed(this, 1000)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        dpm = getSystemService(Context.DEVICE_POLICY_SERVICE) as DevicePolicyManager
        admin = ComponentName(this, AdminReceiver::class.java)
        prefs = getSharedPreferences(PREFS, Context.MODE_PRIVATE)

        statusText = findViewById(R.id.statusText)
        setupBlock = findViewById(R.id.setupBlock)
        adbCommandText = findViewById(R.id.adbCommandText)
        lockBlock = findViewById(R.id.lockBlock)
        hostnameInput = findViewById(R.id.hostnameInput)
        durationInput = findViewById(R.id.durationInput)
        lockButton = findViewById(R.id.lockButton)
        unlockButton = findViewById(R.id.unlockButton)
        countdownText = findViewById(R.id.countdownText)
        relinquishButton = findViewById(R.id.relinquishButton)

        adbCommandText.text = ADB_COMMAND
        adbCommandText.setOnClickListener { copyAdbCommand() }
        hostnameInput.setText(prefs.getString(KEY_HOSTNAME, DEFAULT_HOSTNAME))
        durationInput.setText("30")

        lockButton.setOnClickListener { onLockClicked() }
        unlockButton.setOnClickListener { onUnlockClicked() }
        relinquishButton.setOnClickListener { confirmRelinquish() }
    }

    override fun onResume() {
        super.onResume()
        handler.post(tickRunnable)
    }

    override fun onPause() {
        super.onPause()
        handler.removeCallbacks(tickRunnable)
    }

    private fun copyAdbCommand() {
        val clipboard = getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        clipboard.setPrimaryClip(ClipData.newPlainText("adb command", ADB_COMMAND))
        Toast.makeText(this, R.string.adb_copied, Toast.LENGTH_SHORT).show()
    }

    /** Redraws everything from current device-owner / restriction / timer state. */
    private fun refreshLockState() {
        val isOwner = dpm.isDeviceOwnerApp(packageName)

        setupBlock.visibility = if (isOwner) android.view.View.GONE else android.view.View.VISIBLE
        lockBlock.visibility = if (isOwner) android.view.View.VISIBLE else android.view.View.GONE
        relinquishButton.visibility = if (isOwner) android.view.View.VISIBLE else android.view.View.GONE

        if (!isOwner) {
            statusText.text = getString(R.string.status_not_owner)
            return
        }

        val restricted = dpm.getUserRestrictions(admin)
            .getBoolean(UserManager.DISALLOW_CONFIG_PRIVATE_DNS, false)
        val unlockAt = prefs.getLong(KEY_UNLOCK_AT, 0L)
        val now = System.currentTimeMillis()
        val remainingMs = unlockAt - now

        if (!restricted) {
            statusText.text = getString(R.string.status_unlocked)
            lockButton.isEnabled = true
            unlockButton.isEnabled = false
            countdownText.text = ""
        } else {
            val host = dpm.getGlobalPrivateDnsHost(admin)
                ?: prefs.getString(KEY_HOSTNAME, DEFAULT_HOSTNAME)
                ?: DEFAULT_HOSTNAME
            statusText.text = getString(R.string.status_locked, host)
            lockButton.isEnabled = false
            if (remainingMs > 0) {
                unlockButton.isEnabled = false
                val minutes = remainingMs / 60000
                val seconds = (remainingMs / 1000) % 60
                countdownText.text = getString(R.string.countdown_format, minutes, seconds)
            } else {
                unlockButton.isEnabled = true
                countdownText.text = getString(R.string.countdown_ready)
            }
        }
    }

    private fun onLockClicked() {
        val hostname = hostnameInput.text.toString().trim()
        if (hostname.isEmpty()) {
            hostnameInput.error = getString(R.string.error_hostname_required)
            return
        }
        val minutes = durationInput.text.toString().toLongOrNull()
        if (minutes == null || minutes < 0) {
            durationInput.error = getString(R.string.error_duration_invalid)
            return
        }

        val result = dpm.setGlobalPrivateDnsModeProviderHostname(admin, hostname)
        if (result != 0) {
            Toast.makeText(this, R.string.error_hostname_unreachable, Toast.LENGTH_LONG).show()
            return
        }

        dpm.addUserRestriction(admin, UserManager.DISALLOW_CONFIG_PRIVATE_DNS)
        prefs.edit()
            .putString(KEY_HOSTNAME, hostname)
            .putLong(KEY_UNLOCK_AT, System.currentTimeMillis() + minutes * 60_000)
            .apply()

        Toast.makeText(this, R.string.locked_confirmation, Toast.LENGTH_SHORT).show()
        refreshLockState()
    }

    private fun onUnlockClicked() {
        dpm.clearUserRestriction(admin, UserManager.DISALLOW_CONFIG_PRIVATE_DNS)
        prefs.edit().remove(KEY_UNLOCK_AT).apply()
        Toast.makeText(this, R.string.unlocked_confirmation, Toast.LENGTH_SHORT).show()
        refreshLockState()
    }

    private fun confirmRelinquish() {
        AlertDialog.Builder(this)
            .setTitle(R.string.relinquish_title)
            .setMessage(R.string.relinquish_message)
            .setPositiveButton(R.string.relinquish_confirm) { _, _ ->
                dpm.clearUserRestriction(admin, UserManager.DISALLOW_CONFIG_PRIVATE_DNS)
                dpm.clearDeviceOwnerApp(packageName)
                prefs.edit().clear().apply()
                refreshLockState()
            }
            .setNegativeButton(android.R.string.cancel, null)
            .show()
    }
}
