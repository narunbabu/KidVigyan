import {AppRegistry} from 'react-native';
import App from './App';
// import App from './MathsApp/DynamicTab/App';
// import App from './MultiChecklist/App';
// import App from './MathsApp/components/Gameselection/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
