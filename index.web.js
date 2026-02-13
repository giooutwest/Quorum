import React from 'react';
import {createRoot} from 'react-dom/client';
import {initAnalytics} from './src/firebase';
import App from './App';

// Initialize Firebase Analytics
initAnalytics();

var rootEl = document.getElementById('root');

window.addEventListener('error', function (event) {
  rootEl.innerHTML =
    '<pre style="color:red;padding:20px;font-size:14px;">Runtime Error:\n' +
    event.message +
    '\nat ' + event.filename + ':' + event.lineno +
    '</pre>';
});

window.addEventListener('unhandledrejection', function (event) {
  rootEl.innerHTML =
    '<pre style="color:red;padding:20px;font-size:14px;">Unhandled Promise:\n' +
    String(event.reason) +
    '</pre>';
});

try {
  var reactRoot = createRoot(rootEl);
  reactRoot.render(
    React.createElement(App)
  );
} catch (error) {
  rootEl.innerHTML =
    '<pre style="color:red;padding:20px;font-size:14px;">Startup Error:\n' +
    error.message + '\n\n' + error.stack +
    '</pre>';
}
