# Biogenique App

Two deliverables in this repo:

## 1. `webapp/` — installable Progressive Web App (works right now)

A mobile shopping app for Biogenique's real product catalog (102 items, live
prices and images pulled from Biogenique's official product data). No build
step required.

**To install on Android:**
1. Host the `webapp/` folder (e.g. GitHub Pages, Netlify, or any static host),
   or open `webapp/index.html` directly in Chrome on your phone.
2. Tap the browser menu → **Add to Home screen** (or use the in-app "Install"
   banner if served over HTTPS).
3. It launches full-screen like a native app, with a searchable/filterable
   product grid and cart. Checkout hands off to the real biogenique.com to
   complete payment.

## 2. `android/` — native Android Studio project (WebView shell)

A minimal Kotlin app that loads `https://www.biogenique.com` directly, so
"fully functional" browsing/checkout is guaranteed to be the real live store.

**Why there's no `.apk` file in this repo:** this build environment's network
policy blocks `dl.google.com`, which is the only source for the Android SDK
platform/build-tools needed to compile an APK. There is no local Android SDK
installed here, so a real signed `.apk` cannot be produced in this sandbox.

To get a real `.apk`:
```
cd android
./gradlew assembleDebug   # run this on a machine/CI with Android SDK installed
```
Or open the `android/` folder in Android Studio and hit **Run** / **Build APK**.
