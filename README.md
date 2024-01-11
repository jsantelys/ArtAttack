# Art Attack

Mobile app that allows user to navigate the catalog of artworks exposed by Art Institute of Chicago API

The app features thumbnail and a brief description on the main screen, allows users to dive into detailed screens for a closer look to the artwork.

Users are also capable of saving some favorite artwork and revisit them whenever they want.

This app uses redux persistence store to keep data saved even if the app is closed. It also includes some animations using react native reanimated.

https://github.com/jsantelys/ArtAttack/assets/95723611/75094c3c-36f8-4521-bb80-b1d6fd92ac5e



# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

