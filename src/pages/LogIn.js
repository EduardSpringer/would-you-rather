import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setAuthedUser} from '../store/actions/authedUser';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";

import Nav from "../components/Nav";

class LogIn extends Component {
    state = {
        selectedUser: ""
    }

    handleClickButton = () => {
            this.props.login(this.state.selectedUser)
    }
    handleChangeSelect = (e) => {
        this.setState({selectedUser: e.target.value})
    };

    render() {
        const {classes, users} = this.props;

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
                    <Typography variant="h6" align="center">
                        Welcome to the Would You Rather App!
                    </Typography>
                    <Typography align="center" gutterBottom>
                        Please sign in to continue
                    </Typography>
                </Grid>
                <Grid item>
                    <img
                        className={classes.img}
                        alt="would-you-rather-app-welcome"
                        src={"https://svgur.com/i/LDR.svg"}
                    />
                </Grid>
                <Grid item>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="select-user-label">Select User</InputLabel>
                        <Select
                            labelId="select-user-label"
                            id="select-user"
                            label="Select User"
                            autoWidth
                            value={this.state.selectedUser}
                            onChange={this.handleChangeSelect}
                        >
                            {users.map(user => {
                                return (
                                    <MenuItem key={user.id} value={user}>
                                        <ListItemIcon>
                                            <Avatar className={classes.avatar} alt={user.name} src={user.avatarURL} variant="rounded" aria-label="recipe"/>
                                        </ListItemIcon>
                                        <Typography
                                            variant="inherit">{user.name}</Typography>
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.handleClickButton}
                    >
                        Sign In
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

const useStyles = () => ({
    img: {
        width: 250,
        height: "auto"
    },
    formControl: {
        minWidth: 250
    },
    avatar: {
        width: 24,
        height: "auto"
    }
});

function mapStateToProps({users}) {
    return {
        users: Object.values(users)
    }
}

function mapDispatchToProps (dispatch) {
    return({
        login: id => {
            dispatch(setAuthedUser(id))
        }
    })
}

export default connect(
    mapStateToProps, mapDispatchToProps
)((withStyles(useStyles)(LogIn)))