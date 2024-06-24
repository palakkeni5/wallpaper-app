## Prerequisites:

Follow the guide [here](https://reactnative.dev/docs/set-up-your-environment) to set environment
Android Studio &
Node JS 

## Build for testing to check if app works locally:

1. clone project
2. set correct node and npm version
3. do ```console npm install ``` at the root of the project
4. ```console npm run android ```

## Build apk for debug/testing :

1. Go to the root of the project in the terminal and run the below command:
```console
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```
2. Go to android directory:
```console
cd android
```
3.  Now in this android folder, run this command
```console
./gradlew assembleDebug
```
There! you’ll find the apk file in the following path:
```console 
/android/app/build/outputs/apk/debug/app-debug.apk
```


## Build apk for release:

1. currently the keystore for the project is created & release configs are created 
2. follow the steps mentioned [here](https://reactnative.dev/docs/signed-apk-android) to know more
3. make sure that Gradle variables are set properly
4. Go to the root of the project in the terminal and run the below command:

```console
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```

2. Go to android directory:
```console
cd android
```

3.  Now in this android folder, run this command
```console
./gradlew assembleRelease
```
There! you’ll find the apk file in the following path:

```console
android/app/build/outputs/apk/app-release.apk
```
