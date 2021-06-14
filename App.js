import * as React from 'react';

import { Provider } from 'react-redux';
import { store, persistor } from './saiki/redux/store/store';

import MainNavigator from './saiki/Routes';

import SplashScreen from 'react-native-splash-screen';

function App() {
  React.useEffect(() => {
    //setTimeout(() => SplashScreen.hide(), 1000);
    
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    return () => clearTimeout(timer);

  }, []);

  return (
    <Provider store={store}>
      <MainNavigator/>
    </Provider>
  );
}

export default App;