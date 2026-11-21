# UmmahSalah — Webhost & iOS / Android PWA Deployment

## 1. Upload to Any Web Host
Upload all files in this folder (`index.html`, `manifest.json`, `sw.js`, `icon-512.jpg`) to:
- **Netlify Drop:** https://app.netlify.com/drop (drag & drop the folder)
- **GitHub Pages / Cloudflare Pages / cPanel `public_html`**

## 2. Install on iOS (iPhone / iPad)
1. Open your live `https://` URL in **Safari**.
2. Tap **Share** -> **Add to Home Screen**.
3. For App Store / TestFlight `.ipa`: run `npx cap init UmmahSalah dk.ummahsalah.app && npx cap add ios` with Capacitor and archive in Xcode.

## 3. Install on Android
1. Open your live `https://` URL in **Chrome** -> **Menu -> Install app**, OR
2. Use the companion `ummahsalah_android_studio.zip` project in Android Studio to build a native `.apk` / `.aab`.
