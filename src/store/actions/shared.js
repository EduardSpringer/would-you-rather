import {
    getInitialData,
    saveQuestion,
    saveQuestionAnswer
} from '../../utils/api';
import {
    receiveUsers,
    addQuestionToUser,
    addAnswerToUser
} from './users';
import {
    receiveQuestions,
    addQuestion,
    addAnswerToQuestion
} from "./questions";

/* To fill the store with data when app loads */
export function handleInitialData() {
    return dispatch => {
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
            });
    };
}

export function handleAddQuestion (optionOneText, optionTwoText){
    return (dispatch, getState) => {
        const { authedUser } = getState();

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser.id
        })
            .then((question) => {
                dispatch(addQuestion(question));
                dispatch(addQuestionToUser(authedUser.id, question.id))
            }).catch(err => {console.error(err)})
    }
}

export function handleAddAnswer (qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState();

        saveQuestionAnswer(authedUser.id,qid,answer)
            .then(() => {
                dispatch(addAnswerToQuestion(authedUser.id, qid, answer));
                dispatch(addAnswerToUser(authedUser.id, qid, answer))
            }).catch(err => {console.error(err)}
        )
    }
}