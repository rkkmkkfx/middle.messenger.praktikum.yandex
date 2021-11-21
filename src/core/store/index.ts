import Store from './Store';

import initialState from './state';
import reducers from './reducers';

export default new Store(initialState, {
  ...reducers,
  chat: (state, action) => state,
  chats: (state, action) => state,
});
