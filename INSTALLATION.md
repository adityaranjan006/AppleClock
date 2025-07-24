# Installation Guide

## 🎯 Quick Summary

**What users need:**
- ✅ Babel config (for react-native-reanimated)
- ❌ Metro config (SVG assets are bundled in the package)
- ✅ Peer dependencies installation
- ✅ Platform setup (iOS pod install, etc.)

## 📦 Installing react-native-apple-ui-clock

### Step 1: Install the Package

```bash
npm install react-native-apple-ui-clock
```

**or with yarn:**

```bash
yarn add react-native-apple-ui-clock
```

### Step 2: Install Peer Dependencies

The package requires these peer dependencies to work properly:

```bash
npm install react-native-reanimated react-native-gesture-handler react-native-svg expo-haptics
```

**or with yarn:**

```bash
yarn add react-native-reanimated react-native-gesture-handler react-native-svg expo-haptics
```

### Step 3: Platform-Specific Setup

#### For Expo Projects (Recommended)

If you're using Expo SDK 49+, most dependencies are already included. You may need to install:

```bash
npx expo install react-native-reanimated react-native-gesture-handler react-native-svg expo-haptics
```

#### For React Native CLI Projects

**iOS Setup:**
```bash
cd ios && pod install
```

**Android Setup:**
No additional setup required for Android.

### Step 4: Configure Dependencies

#### React Native Reanimated

Add to your `babel.config.js`:

```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // This should be last
  ],
};
```

#### React Native Gesture Handler

**For React Native CLI (iOS):**

Add to your `ios/YourApp/AppDelegate.mm`:

```objective-c
#import "RNGestureHandler.h"

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // ... other code
  return YES;
}
```

**For React Native CLI (Android):**

Add to `android/app/src/main/java/.../MainActivity.java`:

```java
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
```

### Step 5: Wrap Your App (for React Native CLI)

Wrap your root component with `GestureHandlerRootView`:

```tsx
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import YourAppContent from './YourAppContent';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <YourAppContent />
    </GestureHandlerRootView>
  );
}
```

## 🚀 Basic Usage

```tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Bedtime } from 'react-native-apple-ui-clock';

export default function App() {
  const [bedTime, setBedTime] = useState("10:00 pm");
  const [alarmTime, setAlarmTime] = useState("7:00 am");

  return (
    <View style={styles.container}>
      <Bedtime 
        bedTimeSet={setBedTime} 
        alarmTimeSet={setAlarmTime} 
        actualBedTime={bedTime} 
        actualAlarmTime={alarmTime} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

## 📱 Platform Requirements

- **React Native**: 0.70+
- **React**: 18+
- **iOS**: 11.0+
- **Android**: API level 21+
- **Expo SDK**: 49+ (if using Expo)

## 🔧 Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **iOS build issues**: Run `cd ios && pod install`
3. **Gesture handler not working**: Make sure you've wrapped your app with `GestureHandlerRootView`
4. **Reanimated issues**: Ensure the babel plugin is configured correctly

### Expo Compatibility

✅ **Expo Go**: Compatible  
✅ **EAS Build**: Compatible  
✅ **Expo Dev Build**: Compatible  

### Metro Configuration

**✅ No Metro configuration needed!** 

Your package includes all SVG assets internally, so users don't need to configure SVG support in their metro.config.js file.

*Note: Users only need Metro SVG configuration if they want to import their own SVG files in their app.*

## 📞 Support

If you encounter issues:

1. Check this troubleshooting guide
2. Ensure all peer dependencies are installed
3. Verify your React Native version compatibility
4. Open an issue on GitHub with your error details

## 🎯 Next Steps

- Check out the [README.md](README.md) for component documentation
- View available props and customization options
- See example implementations 