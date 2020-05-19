import React, {Component} from 'react'
import {connect} from "react-redux";

import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core/styles";

import Nav from "../components/Nav";

class NotFound404 extends Component {
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
                    <Nav path={"/"}/>
                </Grid>
                <Grid item>
                    <img
                        className={classes.img}
                        alt="would-you-rather-app-welcome"
                        src={'/imgs/pageNotFound.svg'}
                    />
                </Grid>
            </Grid>
        )
    }
}

const useStyles = theme => ({
    img: {
        width: 600
    },
});

export default connect()((withStyles(useStyles)(NotFound404)))