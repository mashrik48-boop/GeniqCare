# DNS Lock — Private DNS self-restriction app

A small native Android (Kotlin) app for locking your own phone's **Private
DNS** setting so you can't casually flip it off (e.g. to bypass a DNS-based
ad/content blocker like NextDNS, AdGuard DNS, etc.). It's a self-control
tool: you set it up on your own device, on purpose, knowing it makes the
setting hard for *you* to change for a while.

## How it works

Android only lets an app grey out the Private DNS screen if that app is the
device's **Device Owner** — a stronger form of device admin normally used by
corporate MDM apps. There's no way to get this from a Play Store install
flow; it has to be granted once via ADB, and only works while the device (or
profile) has no accounts configured yet.

Once granted, the app:
1. Sets your chosen Private DNS provider hostname
   (`DevicePolicyManager.setGlobalPrivateDnsModeProviderHostname`).
2. Applies the `DISALLOW_CONFIG_PRIVATE_DNS` user restriction, which greys
   out Settings → Connections → More connection settings → Private DNS.
3. Won't let you lift the restriction until a self-chosen timer expires
   (stored locally, nothing leaves the device).

## One-time setup

1. Build/install the app (`./gradlew assembleDebug` on a machine with the
   Android SDK, or open in Android Studio — see the root README for why no
   `.apk` is checked into this repo).
2. Factory reset the phone (or use a fresh secondary user) so no accounts
   are configured yet, and install the app during setup / before adding any
   Google/Samsung account.
3. Enable **USB debugging** (Settings → About phone → tap Build number 7×,
   then Settings → Developer options → USB debugging).
4. From a computer with `adb`:
   ```
   adb shell dpm set-device-owner com.geniqcare.privatednslock/.AdminReceiver
   ```
5. Open the app — it will now show the lock controls instead of the setup
   instructions.

## Using it

- Enter a Private DNS provider hostname (e.g. `dns.adguard.com`,
  `security.cloudflare-dns.com`, `dns.nextdns.io`) and how many minutes you
  want it locked for, then tap **Lock**.
- **Unlock** stays disabled until the timer runs out.
- **Remove device owner (full reset)** is an escape hatch for setup
  mistakes or when you're done with the app — it drops device-owner status
  entirely (requires a factory reset to re-provision).

## Honest limitations

This is a self-control tool, not tamper-proof parental/enterprise
enforcement:
- Device Owner apps can call `clearDeviceOwnerApp()` on themselves at any
  time — that's the "Remove device owner" button. A determined future-you
  could always tap it, uninstall, or factory reset. The friction is the
  point, not an unbypassable lock.
- It only locks the **Private DNS** setting, nothing else in Settings.
- Requires Android 12 (API 31)+ for `DISALLOW_CONFIG_PRIVATE_DNS`.
- Device Owner provisioning requires a clean profile (no accounts) — it
  can't be granted to an already-set-up phone without a factory reset or a
  new secondary user.
