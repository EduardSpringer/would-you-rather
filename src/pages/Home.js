import React, {Component} from 'react';
import {connect} from "react-redux";

import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Nav from "../components/Nav";
import UserCard from "../components/UserCard";

class Home extends Component {
    state = {
        tabValue: 0
    }

    handleChangeTabs = (event, newValue) => {
        this.setState({tabValue: newValue});
    };

    render() {
        const {classes, answeredQuestions, unansweredQuestions} = this.props;

        const questionsUnavailable = <React.Fragment>
            <img
                className={classes.img}
                alt="questions-unailable"
                src={'imgs/notAvailable.svg'}
            />
            <Typography align={"center"} component={"div"} color="textPrimary">
                There are no more questions available ...
            </Typography>
        </React.Fragment>

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
                    <div className={classes.root}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={this.state.tabValue}
                            onChange={this.handleChangeTabs}
                            aria-label="Vertical tabs example"
                            className={classes.tabs}
                        >
                            <Tab label="Unanswered Questions"/>
                            <Tab label="Answered Questions"/>
                        </Tabs>
                        <TabPanel value={this.state.tabValue} index={0}>
                            {unansweredQuestions.length > 0
                                ?
                                unansweredQuestions.map(qid => {
                                    return (
                                        <UserCard key={qid} qid={qid} type="unansweredQuestions"/>
                                    );
                                })
                                :
                                questionsUnavailable
                            }
                        </TabPanel>
                        <TabPanel value={this.state.tabValue} index={1}>
                            {answeredQuestions.length > 0
                                ?
                                answeredQuestions.map(qid => {
                                return (
                                    <UserCard key={qid} qid={qid} type="answeredQuestions"/>
                                );
                            })
                                :
                                questionsUnavailable
                            }
                        </TabPanel>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component="div" >{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const useStyles = theme => ({
    root: {
        display: 'flex',
        minWidth: 850
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    img: {
        width: 240
    }
});

function mapStateToProps({users, authedUser, questions}) {
    const answeredQuestions = Object.keys(users[authedUser.id].answers)
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
    return {
        answeredQuestions: answeredQuestions,
        unansweredQuestions: Object.keys(questions)
            .filter(qid => !answeredQuestions.includes(qid))
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    }
}

function mapDispatchToProps() {
    return ({})
}

export default connect(
    mapStateToProps, mapDispatchToProps
)((withStyles(useStyles)(Home)))