import logger from './logger';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';

// export and invocation of apply middleware
export default applyMiddleware(
    thunk,
    logger
); // thunk must be as first argument
