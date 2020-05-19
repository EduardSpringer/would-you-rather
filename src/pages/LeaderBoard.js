import React, {Component} from 'react';
import {connect} from "react-redux";

import {withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import Nav from "../components/Nav"
import LeaderboardCard from "../components/LeaderBoardCard"

class Leaderboard extends Component {
    render() {
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item>
                    <Nav path={"/leaderboard"}/>
                </Grid>

                <Grid item>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={2}
                    >

                        {this.props.rankedUser.map((user, index) => {
                            return(
                                <Grid item key={user.id}>
                                    <LeaderboardCard
                                        {...user}
                                        rank={index}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const useStyles = () => ({

});

function mapStateToProps({users}) {
    const rankedUser = Object.values(users)
        .map(user => ({
            id: user.id,
            name: user.name,
            avatarURL: user.avatarURL,
            answeredQuestions: Object.values(user.answers).length,
            createdQuestions: user.questions.length,
            score: Object.values(user.answers).length + user.questions.length
        }))
        .sort((a, b) => b.score - a.score)

    return {
        rankedUser: rankedUser
    }
}

function mapDispatchToProps() {
    return({})
}


export default connect(
    mapStateToProps, mapDispatchToProps
)((withStyles(useStyles)(Leaderboard)))