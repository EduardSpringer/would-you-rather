import React, {Component, Fragment} from "react";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FirstPlaceIcon from '@material-ui/icons/Filter1';
import Grid from '@material-ui/core/Grid';
import SecondPlaceIcon from '@material-ui/icons/Filter2';
import ThirdPlaceIcon from '@material-ui/icons/Filter3';
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";

class LeaderboardCard extends Component {
    render() {
        const {classes, rank} = this.props;
        let rankingIcon = "";

        switch(rank) {
            case 0:
                rankingIcon = <FirstPlaceIcon/>
                break;
            case 1:
                rankingIcon =  <SecondPlaceIcon/>
                break;
            case 2:
                rankingIcon =  <ThirdPlaceIcon/>
                break;
            default:
                console.warn("No more ranking icons available!")
        }

        return (
            <Fragment>
                {rankingIcon}
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar src={this.props.avatarURL} aria-label="recipe" className={classes.avatar}/>
                        }
                        title={this.props.name}
                    />
                    <CardContent>
                        <Grid
                            className={classes.grid}
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start"
                        >
                            <Grid item>
                                <Box className={classes.box}>
                                    <Typography gutterBottom align={"center"} variant="button" color="textPrimary"
                                                component="div">
                                        Answered Questions
                                    </Typography>
                                    <Typography gutterBottom align={"center"} variant="button" color="textPrimary"
                                                component="div">
                                        {this.props.answeredQuestions}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box className={classes.box}>
                                    <Typography gutterBottom align={"center"} variant="button" color="textPrimary"
                                                component="div">
                                        Created Questions
                                    </Typography>
                                    <Typography gutterBottom align={"center"} variant="button" color="textPrimary"
                                                component="div">
                                        {this.props.createdQuestions}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Chip className={classes.chip} label={`Score: ${this.props.score}`}/>
                    </CardContent>
                </Card>
            </Fragment>
        );
    }
}

const useStyles = theme => ({
    root: {
        padding: 20,
        borderStyle: "ridge",
        borderWidth: 1
    },
    box: {
        borderRadius: 0,
        padding: 10,
    },
    chip: {
        height: 40,
        borderRadius: 0,
        marginTop: 20,
        fontSize: 20,
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main
    },
    grid: {
        borderStyle: "ridge",
        borderWidth: 1
    }
});

export default (withStyles(useStyles)(LeaderboardCard))