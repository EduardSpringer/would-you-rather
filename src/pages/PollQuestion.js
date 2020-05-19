import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import {connect} from "react-redux";
import {handleAddAnswer} from "../store/actions/shared";

class PollQuestion extends Component{
    state = {
        value: "optionOne"
    }

    handleChangeRadioGroup = (e) => {
        this.setState({value: e.target.value});
    };

    handleClickButton = () => {
        this.props.addAnswerToQuestion(this.props.question.id, this.state.value)
    }

    render() {
        const {
            classes, question, author
        } = this.props;

        return (
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <Avatar src={author.avatarURL} aria-label="recipe" className={classes.avatar}/>
                            }
                            title={`Asked by ${author.name}`}
                        />
                        <CardContent>
                            <Typography className={classes.typography} variant="body2" color="secondary" component="div">
                                Would You Rather ...
                            </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" name="gender1" value={this.state.value} onChange={this.handleChangeRadioGroup}>
                                    <FormControlLabel value="optionOne" control={<Radio/>} label={question.optionOne.text}/>
                                    <FormControlLabel value="optionTwo" control={<Radio/>} label={question.optionTwo.text}/>
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                disableElevation
                                onClick={this.handleClickButton}
                            >
                                Vote
                            </Button>
                        </CardActions>
                    </Card>
        );
    }
}


const useStyles = () => ({
    root: {
        width: 400,
        margin: "20px 20px 0px 20px",
        padding: 20,
        borderStyle: "ridge",
        borderWidth: 1
    },
    typography: {
        paddingLeft: 30,
        paddingBottom: 5
    }
});

function mapStateToProps({authedUser}) {
    return {
        authedUser: authedUser
    }
}

function mapDispatchToProps(dispatch) {
    return ({
        addAnswerToQuestion: (qid, answer) => {
            dispatch(handleAddAnswer(qid, answer))
        }
    })
}

export default connect(
    mapStateToProps,mapDispatchToProps
)(withRouter(withStyles(useStyles)(PollQuestion)))