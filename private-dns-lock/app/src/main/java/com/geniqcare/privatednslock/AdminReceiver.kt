package com.geniqcare.privatednslock

import android.app.admin.DeviceAdminReceiver
import android.content.Context
import android.content.Intent
import android.widget.Toast

class AdminReceiver : DeviceAdminReceiver() {

    override fun onEnabled(context: Context, intent: Intent) {
        super.onEnabled(context, intent)
    }

    override fun onDisabled(context: Context, intent: Intent) {
        super.onDisabled(context, intent)
        // Losing device-owner status (e.g. via a factory reset) also drops the
        // restriction automatically, so nothing to clean up here — just let the
        // user know locking no longer works until re-provisioned.
        Toast.makeText(context, R.string.admin_disabled, Toast.LENGTH_LONG).show()
    }
}
