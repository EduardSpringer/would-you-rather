import logger from './logger';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';

/* Export and Invocation of apply Middleware (thunk, must be as first argument) */
export default applyMiddleware(
    thunk,
    logger
);
