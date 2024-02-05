import {NativeModules} from 'react-native';
import Reactotron from 'reactotron-react-native';

import {name as APP_NAME} from '../../app.json';

const {scriptURL} = NativeModules.SourceCode;
const host = scriptURL.split('://')[1].split(':')[0];

export const reactotron = Reactotron.configure({name: APP_NAME, host})
  .useReactNative({asyncStorage: false, networking: true})
  .connect();

declare global {
  interface Console {
    tron: (typeof Reactotron)['log'];
  }
}

console.tron = reactotron.log;
