# Wallpaper App

A simple wallpaper app for your phone to discover and personalize your device with a sleek wallpaper. Browse a stunning grid of high-quality images from Prexels API. Download and customize your home screens, and enhance your display with stylish clock and weather widgets. Elevate your mobile experience with just a few taps..
## App preview
| App home page  | Set wallpapers | Search wallpapers | Search categories |
| ------------- | ------------- | ------------- | ------------- |
| <img src="https://github.com/user-attachments/assets/62e81746-156a-4b3f-8c0f-c32aaac263f8" width="200" height="400"> | <img src="https://github.com/user-attachments/assets/bb72f134-d136-4524-96ea-997a2eef1343"  width="200" height="400">  | <img src="https://github.com/palakkeni5/wallpaper-app/blob/main/assets/gifs/wallpaper-app-search-wallpaper-gif.gif?raw=true" width="200" height="400"> | <img src="https://github.com/palakkeni5/wallpaper-app/blob/main/assets/gifs/wallpaper-app-categories-gif.gif?raw=true" width="200" height="400">



## Description

The app was created in react native.
The app uses the following :
1. [Prexels API](https://www.pexels.com/api/) to search, fetch and download images and [prexels]( https://www.npmjs.com/package/pexels) npm client to interact with the application code
2. Github Actions CI/CD pipeline to automatically build latest release APK on code commit
3. [react-native-manage-wallpaper](https://github.com/meharbhutta/react-native-manage-wallpaper) to handle wallpaper in the app
4. [react-native-reanimated ](https://github.com/software-mansion/react-native-reanimated) for app animations
5. [react-native-reanimated-carousel](https://github.com/dohooo/react-native-reanimated-carousel) for the animated carousals in the app 

## Getting Started

To build the project locally

1.  Clone the app
2.  Create a .env file in the base of the folder
3.  Create an account at [Prexels](https://www.pexels.com/api/) and generate API key
4.  edit .env file :  PEXELS_API_KEY = YOUR_API_KEY
   
Please find the remaining guide to  run and build the project locally [here](https://github.com/palakkeni5/wallpaper-app/blob/main/build.md)

## Dependencies

* node version - 20.12.2
* npm version - 10.5.0

## Android APK

Kindly find the latest APK release in the releases part of this repository

## Authors

[Palak Pramod Keni](https://www.linkedin.com/in/palak-keni/)

## Acknowledgments

* Thanks to [Wallpaper App](https://github.com/ibelgin/Wallpaper-App) previously developed for UI inspirations.

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).
