import React from 'react';
import { Provider } from 'react-redux';

import initStore from './src/store';

exports.wrapRootComponent = Root => {
  initStore().then(store => {
    return () => (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  });
};
