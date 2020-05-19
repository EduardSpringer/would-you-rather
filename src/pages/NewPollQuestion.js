import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {handleAddQuestion} from "../store/actions/shared";

import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Nav from "../components/Nav";

class NewPollQuestion extends Component {
    state = {
        optionOne: "",
        optionTwo: "",
        openSuccessMessage: false,
        timeout: 1000
    }

    handleChangeTextField = (attribute, e) => {
        this.setState({[attribute]: e.target.value})
    }

    handleClickButton = () => {
        this.props.addQuestion(this.state.optionOne, this.state.optionTwo)
        this.setState({optionOne: "", optionTwo: ""})
        this.setState({openSuccessMessage: true})

        let timeout = setInterval(
            () => {
                clearInterval(timeout)
                this.props.history.push("/")
            }, this.state.timeout
        )
    }

    render() {
        const {classes} = this.props;

        return (
            <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="center"
                spacing={2}
            >
                <Grid item>
                    <Nav path={"/add"}/>
                </Grid>
                <Grid item>
                    <Card className={classes.root}>
                        <CardHeader
                            title="Create Your Question"
                            titleTypographyProps={{
                                style: {
                                    padding: 10
                                }
                            }}
                        />
                        <CardContent>
                            <Grid
                                className={classes.grid}
                                container
                                direction="column"
                                justify="flex-start"
                                alignItems="flex-start"
                                spacing={2}
                            >
                                <Grid item>
                                    <Typography className={classes.typography} variant="body1" color="textPrimary"
                                                component="div">
                                        Complete the question:
                                    </Typography>
                                    <Typography className={classes.typography} variant="h6" color="secondary"
                                                component="div">
                                        Would You Rather ...
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        className={classes.textField}
                                        id="option-one"
                                        label="Option 1:"
                                        variant="outlined"
                                        color="secondary"
                                        placeholder="Enter Option One Text Here"
                                        value={this.state.optionOne}
                                        onChange={e => this.handleChangeTextField("optionOne", e)}
                                    />
                                </Grid>
                                <Grid item>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <Grid item>
                                            <Divider
                                                className={classes.divider}
                                                orientation="horizontal"
                                                variant="middle"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography>
                                                OR
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Divider
                                                className={classes.divider}
                                                orientation="horizontal"
                                                variant="middle"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        className={classes.textField}
                                        id="option-two"
                                        label="Option 2:"
                                        variant="outlined"
                                        color="secondary"
                                        placeholder="Enter Option Two Text Here"
                                        value={this.state.optionTwo}
                                        onChange={e => this.handleChangeTextField("optionTwo", e)}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                        className={classes.button}
                                        color="primary"
                                        variant="contained"
                                        disabled={this.state.optionOne === '' || this.state.optionTwo === ''}
                                        onClick={this.handleClickButton}
                                    >
                                        Create
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Snackbar open={this.state.openSuccessMessage} autoHideDuration={this.state.timeout} onClose={() => {this.setState({openSuccessMessage: false})}}>
                    <MuiAlert onClose={() => {this.setState({openSuccessMessage: false})}} severity="success">
                        Your question was successfully created.
                    </MuiAlert>
                </Snackbar>
            </Grid>
        );
    }
}

const useStyles = () => ({
    root: {
        margin: "20px 20px 0px 20px",
        borderStyle: "ridge",
        borderWidth: 1
    },
    typography: {
        margin: "0px 10px 10px 0px"
    },
    grid: {
        padding: 10
    },
    textField: {
        minWidth: 400
    },
    divider: {
        width: 160
    },
    button: {
        marginTop: 20,
        minWidth: 400,
        height: 50
    }
});

function mapStateToProps({authedUser}) {
    return {
        authedUser: authedUser
    }
}

function mapDispatchToProps(dispatch) {
    return ({
        addQuestion: (optionOne, optionTwo) => {
            dispatch(handleAddQuestion(optionOne, optionTwo))
        }
    })
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(withStyles(useStyles)(NewPollQuestion)))