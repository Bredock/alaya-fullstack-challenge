import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PostListPage from './Post/pages/PostListPage/PostListPage';
import PostDetailPage from './Post/pages/PostDetailPage/PostDetailPage';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Nav/components/Navbar';
import RegisterPage from './Auth/pages/RegisterPage/RegisterPage';
import LoginPage from './Auth/pages/LoginPage/LoginPage';
import { deleteToken } from './util/auth';



const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1ecde2',
        },
    },
});

function App(props) {
    const handleLogout = () => {
        deleteToken();
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="w-100">
                <Provider store={props.store}>
                    <BrowserRouter>
                        <Navbar logout={handleLogout} />
                        <div className="w-100 pt-5 mt-5">
                            <Switch>
                                <Route path="/" exact component={PostListPage} />
                                <Route path="/posts/:cuid/:slug" exact component={PostDetailPage} />
                                <Route path="/register" exact component={RegisterPage} />
                                <Route path="/login" exact component={LoginPage} />
                            </Switch>
                        </div>
                    </BrowserRouter>
                </Provider>
            </div>
        </ThemeProvider>
);
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
