import {
    RECEIVE_USERS
} from '../actions/users';
import {ADD_ANSWER_TO_USER} from "../actions/users";
import {ADD_QUESTION_TO_USER} from "../actions/users";

export default function users(state = {}, action) {
    const { authedUser, qid, answer } = action;

    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            };
        case ADD_ANSWER_TO_USER:
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer
                    }
                }
            };
        case ADD_QUESTION_TO_USER :
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    questions: state[authedUser].questions.concat([qid])
                }
            };
        default:
            return state;
    }
}
