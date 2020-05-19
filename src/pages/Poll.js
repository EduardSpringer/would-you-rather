import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {setAuthedUser} from "../store/actions/authedUser";

import Grid from "@material-ui/core/Grid";

import Nav from "../components/Nav";
import PollResult from "./PollResult";
import PollQuestion from "./PollQuestion";

class Poll extends Component {
    redirect() {
        this.props.history.push('/404')
    }

    render() {
        const {
            question, author, hasAnswer, optionOneTotalVotes,
            optionTwoTotalVotes, optionsTotalVotes,
            optionOneTotalVotesPercent, optionTwoTotalVotesPercent
        } = this.props;

        if(question === undefined){
            return (
                <React.Fragment>
                    {this.redirect()}
                </React.Fragment>
            )
        }

        return (
            <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="center"
                spacing={2}
            >
                <Grid item>
                    <Nav path={"/"}/>
                </Grid>
                <Grid item>
                    {hasAnswer
                        ?
                        <PollResult
                            question={question}
                            author={author}
                            hasAnswer={hasAnswer}
                            optionOneTotalVotes={optionOneTotalVotes}
                            optionTwoTotalVotes={optionTwoTotalVotes}
                            optionsTotalVotes={optionsTotalVotes}
                            optionOneTotalVotesPercent={optionOneTotalVotesPercent}
                            optionTwoTotalVotesPercent={optionTwoTotalVotesPercent}
                        />
                        :
                        <PollQuestion
                            question={question}
                            author={author}
                        />
                    }
                </Grid>
            </Grid>
        );
    }
}

function mapStateToProps({questions, users, authedUser}, {match}) {
    const {id} = match.params;
    const question = questions[id];

    if(!question) {
        return {}
    }

    const author = users[question.author];

    let hasAnswer = '';

    if (users[authedUser.id].answers.hasOwnProperty(question.id)) {
        hasAnswer = users[authedUser.id].answers[question.id]
    }

    const optionOneTotalVotes = question.optionOne.votes.length;
    const optionTwoTotalVotes = question.optionTwo.votes.length;
    const optionsTotalVotes = optionOneTotalVotes + optionTwoTotalVotes;

    const optionOneTotalVotesPercent = (optionOneTotalVotes / optionsTotalVotes * 100);
    const optionTwoTotalVotesPercent = (optionTwoTotalVotes / optionsTotalVotes * 100);

    return {
        question: question,
        author: author,
        hasAnswer: hasAnswer,
        optionOneTotalVotes: optionOneTotalVotes,
        optionTwoTotalVotes: optionTwoTotalVotes,
        optionsTotalVotes: optionsTotalVotes,
        optionOneTotalVotesPercent: optionOneTotalVotesPercent,
        optionTwoTotalVotesPercent: optionTwoTotalVotesPercent
    }
}

function mapDispatchToProps(dispatch) {
    return ({
        logout: id => {
            dispatch(setAuthedUser(id))
        }
    })
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(Poll))