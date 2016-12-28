# Releasing an Android version

1. Go to the project's directory: i.e.: `cd ~/personal/repos/teleflik`
2. Build App Code: `grunt deploy`
3. Build Native Code: `cordova build android --release`
4. Sign JAR: `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore teleflik-release-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk teleflik_release`
5. Go to the built *apk* directory: `cd platforms/android/build/outputs/apk/`
6. Zip the built package and make it ready to publishing: `~/Library/Android/sdk/build-tools/19.1.0/zipalign -v 4 android-release-unsigned.apk teleflik.apk`
7. Go to Google Play Developers Console and upload new apk version: https://play.google.com/apps/publish/
