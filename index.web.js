/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App.tsx';
import { name as appName } from './app.json';

// Generate required css
import iconFont from 'react-native-vector-icons/Fonts/AntDesign.ttf';
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import ionicons from 'react-native-vector-icons/Fonts/Ionicons.ttf';

const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: AntDesign;
}`;
const fontAwesomeStyles = `@font-face {
    src: url(${fontAwesome});
    font-family: FontAwesome;
  }`;
const ioniconsStyles = `@font-face {
    src: url(${ionicons});
    font-family: Ionicons;
  }`;

// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
    style.styleSheet.cssText = iconFontStyles;
    style.styleSheet.cssText = fontAwesomeStyles;
    style.styleSheet.cssText = ioniconsStyles;
} else {
    style.appendChild(document.createTextNode(iconFontStyles));
    style.appendChild(document.createTextNode(fontAwesomeStyles));
    style.appendChild(document.createTextNode(ioniconsStyles));
}

// Inject stylesheet
document.head.appendChild(style);

if (Platform.OS == "web") {
    if (module.hot) {
        module.hot.accept();
    }
}
AppRegistry.registerComponent(appName, () => App);

if (Platform.OS == "web") {
    AppRegistry.runApplication(appName, {
        initialProps: {},
        rootTag: document.getElementById('app-root'),
    });
}
