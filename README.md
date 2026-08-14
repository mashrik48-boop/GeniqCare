# GeniqCare

Five things live in this repo. Live site: **https://mashrik48-boop.github.io/GeniqCare/**

## 1. `geniqcare-app/` — GeniqCare Health Companion (installable PWA, works right now)

The full bilingual (English / Québec French) personalized supplement & health
app: auth, 4-step onboarding, home dashboard, dosage schedule with reminders,
supplement catalog (browse / QR-code lookup / personalized formula) reusing
the real Biogenique product data, micronutrient tracker with charts, a
scripted AI assistant that books consultations end-to-end, notifications
inbox/preferences, settings with a live FR/EN language toggle, account
management (incl. Law 25-style deletion flow), and orders/subscriptions.
State persists in `localStorage`; no backend required to try it.

Live at: https://mashrik48-boop.github.io/GeniqCare/geniqcare-app/

**To install on Android:** open that URL in Chrome → menu → **Add to Home
screen**. Installs full-screen like a native app.

## 2. `android-geniqcare/` — native Android Studio project (WebView shell)

A Kotlin app that loads the hosted `geniqcare-app` PWA above. See the note
below on why there's no compiled `.apk` in this repo.

## 3. `webapp/` — Biogenique store (installable PWA)

A separate, smaller app: Biogenique's real product catalog (102 items) with
cart and checkout handoff to biogenique.com.

Live at: https://mashrik48-boop.github.io/GeniqCare/webapp/

## 4. `android/` — native Android Studio project (WebView shell) for the store

Loads `https://www.biogenique.com` directly.

## 5. `catechism-app/` — Orthodox Way: Oriental Catechism (installable PWA)

A dark, gold-and-burgundy devotional app for the Oriental Orthodox tradition
(Coptic, Ethiopian/Eritrean, Syriac, Armenian, Malankara): a systematic
catechism across six doctrinal pillars (Trinity, Cyrillian Miaphysite
Christology, the Holy Mysteries, the Theotokos & Saints, Salvation &
Theosis, Holy Church & Councils) with Scripture references and patristic
quotations; patristic Bible commentary across John, Matthew, Luke, Romans,
1 Corinthians, Hebrews, Genesis, and the Psalms, drawing heavily on Fr.
Tadros Malaty alongside classical Fathers (Cyril of Alexandria, Athanasius,
Ephrem the Syrian, Severus of Antioch, Gregory the Illuminator); the
Agpeya/Shehimo canonical hours, the Creed, Trisagion, and an interactive
41x Kyrie Eleison prayer-rope counter; an apologetics Q&A catalog; a
tiered multiple-choice quiz engine with score history; a glossary, the
seven canonical fasts, and the six sister Churches; a personal study
journal; unified bookmarking across every content type; and offline,
client-side search across all of it. It also ships the **complete source
catechism** (Fr. Tadros Y. Malaty's "Oriental Orthodox Catechism," 19
books / ~300 chapters covering Holy Tradition, Holy Scriptures, Theology,
Creation, the Heavenly Hosts, Pneumatology, Ecclesiology, Catholicism vs.
Orthodoxy, the Holy Sacraments, Mariology, Eschatology, Coptic Liturgy,
Worship & Prayer, Monasticism, Christian Living, Soteriology, Christology,
and an excerpt of St. Athanasius's "On the Incarnation") as a searchable,
bookmarkable Library reader (`data/library.json`). State persists in
`localStorage`; no backend required.

Live at: https://mashrik48-boop.github.io/GeniqCare/catechism-app/

---

## Why there's no `.apk` file in this repo

This build environment's network policy blocks `dl.google.com`, which is the
only source for the Android SDK platform/build-tools needed to compile an
APK. There is no local Android SDK installed here, so a real signed `.apk`
cannot be produced in this sandbox — for either Android project.

To get a real `.apk`:
```
cd android-geniqcare   # or android/
./gradlew assembleDebug   # run this on a machine/CI with the Android SDK installed
```
Or open the folder in Android Studio and hit **Run** / **Build APK**.

## Deployment

`.github/workflows/pages.yml` publishes `landing/`, `webapp/`,
`geniqcare-app/`, and `catechism-app/` to GitHub Pages on every push to the
tracked branches.
