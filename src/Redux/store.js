import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { mediasReducer } from "./MediaRedux/reducer";
import { authReducer } from "./user/reducer";
import { searchReducer } from "./Search/reducer";
import { feedbackReducer } from "./Feedback/reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  medias: mediasReducer,
  auth: authReducer,
  search: searchReducer,
  feedback: feedbackReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk)),
);
