import { combineReducers } from 'redux';

import authedUser from './authedUser';
import users from './users';
import questions from './questions';

//beacause the createStore function only accepts a single reducer
//ES6´s property shorthand
export default combineReducers({
    authedUser,
    users,
    questions
});