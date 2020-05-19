import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux'

import {handleInitialData} from "./store/actions/shared";

import theme from "./utils/helpers.js"

import {MuiThemeProvider} from "@material-ui/core";

import LogIn from "./pages/LogIn"
import Home from "./pages/Home"
import PollResult from "./pages/Poll";
import NewPollQuestion from "./pages/NewPollQuestion"
import Leaderboard from "./pages/LeaderBoard";
import NotFound404 from "./pages/NotFound404"

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        if (this.props.authedUser) {
            return (
                <MuiThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Switch>
                            <Route component={LogIn}/>
                        </Switch>
                    </BrowserRouter>
                </MuiThemeProvider>
            );
        }

        return (
            <BrowserRouter>
                <MuiThemeProvider theme={theme}>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/questions/:id' component={PollResult}/>
                        <Route path='/add' component={NewPollQuestion}/>
                        <Route path='/leaderboard' component={Leaderboard}/>
                        <Route path='*' component={NotFound404}/>
                    </Switch>
                </MuiThemeProvider>
            </BrowserRouter>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser: authedUser === null || authedUser === ''
    };
}

/* Using the connect() function to upgrades a component to a container
* Containers can read states from the store and dispatch actions.
* */

export default connect(
    mapStateToProps
)(App)