import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class UserCard extends Component {

    handleClickButton = () => {
        this.props.history.push("/questions/" + this.props.question.id)
    }

    render() {
        const {classes, question, author, type} = this.props;

        return (
            <Card className={classes.root} >
                <CardHeader
                    avatar={
                        <Avatar src={author.avatarURL} alt="profile-picture" aria-label="recipe" 
                                className={classes.avatar}/>
                    }
                    title={`${author.name} asks:`}
                    
                />
                <CardContent >
                    <Typography variant="body2" color="secondary" >
                        Would You Rather ...
                    </Typography>
                    <Typography variant="body1" color="textSecondary" >
                        ... {question.optionOne.text} ...
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        fullWidth
                        disableElevation
                        onClick={this.handleClickButton}
                    >
                        {type === "answeredQuestions" ? "View Poll" : "Answer Poll"}
                    </Button>
                </CardActions>
            </Card>
        );
    }
}


const useStyles = () => ({
    root: {
        margin: "20px 20px 0px 20px",
        padding: 20,
        borderStyle: "ridge",
        borderWidth: 1,
        minWidth: 400
    },
    button: {
        height: 35
    }
});

function mapStateToProps({users, questions, authUser}, {qid}) {
    return {
        question: questions[qid],
        author: users[questions[qid].author],
    };
}

function mapDispatchToProps() {
    return {}
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(withStyles(useStyles)(UserCard)))