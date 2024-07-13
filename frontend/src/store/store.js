import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import itemReducer from './item.js';
import userStoreReducer from './userStore.js';
import searchReducer from './search.js';
import likeReducer from './like.js';
import followReducer from './followReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  itemState: itemReducer,
  userStoreState: userStoreReducer,
  searchState: searchReducer,
  likeState: likeReducer,
  followState: followReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
