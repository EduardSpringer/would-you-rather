import React, {Component} from 'react'
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Card from "@material-ui/core/Card";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";

class PollResult extends Component {
    render() {
        const {
            classes, question, author, hasAnswer, optionOneTotalVotes,
            optionTwoTotalVotes, optionsTotalVotes,
            optionOneTotalVotesPercent, optionTwoTotalVotesPercent
        } = this.props;

        const votedStyle = {borderColor: "#e61f5c", borderWidth: 3, borderStyle: "solid"}

        return (
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar src={author.avatarURL} aria-label="recipe" className={classes.avatar}/>
                    }
                    title={`Asked by ${author.name}`}
                />

                <CardContent>
                    <Typography className={classes.typography} variant="body2" color="textPrimary" component="div">
                        RESULTS
                    </Typography>

                    {hasAnswer === "optionOne" &&
                    <Chip className={classes.chip} color="secondary" label="YOUR VOTE"/>
                    }

                    <Box className={classes.box} style={hasAnswer === "optionOne" ? votedStyle : {}}>
                        <Typography gutterBottom align={"center"} variant="h6" color="textPrimary" component="div">
                            {`Would you rather ${question.optionOne.text}?`}
                        </Typography>
                        <LinearProgress className={classes.linearProgress} variant="determinate"
                                        value={optionOneTotalVotesPercent}/>
                        <Typography gutterBottom align={"center"} variant="button" color="textPrimary" component="div">
                            {`${optionOneTotalVotes} out ${optionsTotalVotes} votes (${optionOneTotalVotesPercent.toFixed(0)} %)`}
                        </Typography>
                    </Box>

                    {hasAnswer === "optionTwo" &&
                    <Chip className={classes.chip} color="secondary" label="YOUR VOTE"/>
                    }

                    <Box className={classes.box} style={hasAnswer === "optionTwo" ? votedStyle : {}}>
                        <Typography gutterBottom align={"center"} variant="h6" color="textPrimary" component="div">
                            {`Would you rather ${question.optionTwo.text}?`}
                        </Typography>
                        <LinearProgress className={classes.linearProgress} variant="determinate"
                                        value={optionTwoTotalVotesPercent}/>
                        <Typography gutterBottom align={"center"} variant="button" color="textPrimary" component="div">
                            {`${optionTwoTotalVotes} out ${optionsTotalVotes} votes (${optionTwoTotalVotesPercent.toFixed(0)} %)`}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }
}

const useStyles = () => ({
    root: {
        width: 400,
        margin: "20px 20px 0px 20px",
        borderStyle: "ridge",
        borderWidth: 1
    },
    box: {
        borderStyle: "ridge",
        borderWidth: 1,
        margin: "0px 0px 10px 10px",
        borderRadius: 0,
        padding: 10,
    },
    linearProgress: {
        height: 20,
        margin: "10px 5px 10px 5px"
    },
    chip: {
        marginLeft: 10,
        height: 28,
        borderRadius: 0
    },
    typography: {
        margin: "0px 0px 5px 10px"
    }
});

export default connect()((withStyles(useStyles)(PollResult)))