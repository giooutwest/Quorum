import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

try {
  AppRegistry.runApplication(appName, {
    rootTag: document.getElementById('root'),
  });
} catch (error) {
  const root = document.getElementById('root');
  root.innerHTML =
    '<pre style="color:red;padding:20px;font-size:14px;">' +
    error.message +
    '\n\n' +
    error.stack +
    '</pre>';
}

window.addEventListener('error', function (event) {
  const root = document.getElementById('root');
  root.innerHTML =
    '<pre style="color:red;padding:20px;font-size:14px;">Runtime Error:\n' +
    event.message +
    '\n\nFile: ' +
    event.filename +
    ':' +
    event.lineno +
    '</pre>';
});

window.addEventListener('unhandledrejection', function (event) {
  const root = document.getElementById('root');
  root.innerHTML =
    '<pre style="color:red;padding:20px;font-size:14px;">Unhandled Promise:\n' +
    event.reason +
    '</pre>';
});
