# Daybook as an iPhone app: setup on the Mac

The iPhone app is ready in this repo. It's the same Daybook, plus reminder notifications from your phone, safer storage, and Strava login that comes straight back into the app. You only need the Mac to put the app on your phone (and every 7 days with a free Apple ID, see the end).

## 1. Check the Mac

Apple menu (top left) → **About This Mac**. It needs **macOS Sequoia 15.6 or newer** and about **45 GB free** space.

## 2. Install the tools (one time)

1. **Xcode**: get it free from the Mac App Store. Open it once, agree to the terms, and when it asks which platforms to install, tick **iOS**.
2. **Node.js**: go to nodejs.org, download the **LTS** macOS installer and run it.

## 3. Get Daybook onto the Mac

Open **Terminal** (press Cmd+Space and type Terminal), then paste these lines one at a time and press Return after each:

```
git clone https://github.com/fijyatta-netizen/daybook.git
cd daybook
npm install
npm run ios
```

If the Mac asks to install "command line developer tools" after the first line, click Install, wait for it to finish, then run that line again.

The last line opens the project in Xcode.

## 4. Sign it with your Apple ID

In Xcode:

1. In the left sidebar, click **App** (the blue icon at the top).
2. Click the **Signing & Capabilities** tab.
3. Under **Team**, choose **Add an Account…** and sign in with your Apple ID. Then pick **Your Name (Personal Team)**.
4. If it says the Bundle Identifier is unavailable, add something to the end, e.g. `io.github.fijyattanetizen.daybook.fyat`.

## 5. Put it on your iPhone

1. Plug the iPhone into the Mac. Tap **Trust** on the phone if it asks.
2. On the iPhone: **Settings → Privacy & Security → Developer Mode** → turn on, and let it restart.
3. In Xcode, at the top, pick your iPhone from the device list, then press the **▶ (Run)** button.
4. The first time, the iPhone says the developer isn't trusted. Go to **Settings → General → VPN & Device Management**, tap your Apple ID and tap **Trust**. Then open Daybook.

## 6. Bring your log across

1. In the **web** Daybook (the home-screen one): **Timeline → Export backup** and save it to Files.
2. In the **new app**: **Timeline → Import file** and pick that backup. Your days, photos, notes, week plans and reminders all come across.
3. When you add your first reminder, tap **Allow** for notifications.
4. **Strava**: in the app, go to Activity → Connect Strava and enter your Client ID and Secret again. You don't need to change anything on Strava's site.

## Good to know

- **Free Apple ID:** the app stops opening after 7 days. Plug the phone in and press ▶ in Xcode again. Your data stays.
- **Paid Apple Developer Program ($99/year):** no 7-day limit, and you can share Daybook with others through TestFlight.
- **Getting updates:** when Claude makes a new version, open Terminal and run `cd daybook`, then `git pull`, then `npm run ios`, then press ▶.
