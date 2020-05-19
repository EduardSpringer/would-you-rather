import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {setAuthedUser} from "../store/actions/authedUser";

import {withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import QuestionIcon from '@material-ui/icons/Help';
import LeaderBoardIcon from '@material-ui/icons/AssignmentInd';
import LogOutIcon from '@material-ui/icons/ExitToApp';
import Avatar from "@material-ui/core/Avatar";

class Nav extends Component {
    state = {
        path: this.props.path
    }

    handleChangeTabs = (event, newValue) => {
        this.props.history.push(newValue)
        this.setState({path: newValue})
    };

    handleClickLogOutTab = () => {
        this.props.history.push("/")
        this.props.logout(null)
    }

    render(){
        const {classes, authedUser} = this.props;

        return (
            <Fragment>
                <Tabs
                    value={this.state.path}
                    onChange={this.handleChangeTabs}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Home" icon={<HomeIcon/>} value={"/"}/>
                    <Tab label="New Question" icon={<QuestionIcon/>} value={"/add"}/>
                    <Tab label="Leader Board" icon={<LeaderBoardIcon/>} value={"/leaderboard"}/>

                    {authedUser &&
                    <Tab disableFocusRipple disabled label={authedUser.name} icon={
                        <Avatar className={classes.avatar} alt={authedUser.name} src={authedUser.avatarURL} variant="rounded" aria-label="recipe"/>
                    }/>
                    }

                    {authedUser &&
                    <Tab label="Logout" icon={<LogOutIcon/>} onClick={this.handleClickLogOutTab}/>
                    }
                </Tabs>
            </Fragment>
        );
    }
}

const useStyles = () => ({
    avatar: {
        width: 24,
        height: 24
    }
});

function mapStateToProps({authedUser}) {
    return {
        authedUser: authedUser
    }
}

function mapDispatchToProps (dispatch) {
    return({
        logout: id => {
            dispatch(setAuthedUser(id))
        }
    })
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(withStyles(useStyles)(Nav)))