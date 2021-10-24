import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase.utils";

class App extends Component {
    constructor() {
        super();

        this.state = {
            currentUser: null,
        };
    }
    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = onAuthStateChanged(auth, (user) => {
            this.setState({ currentUser: user });

            console.log(user);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/shop" component={ShopPage} />
                    <Route
                        exact
                        path="/signin"
                        component={SignInAndSignUpPage}
                    />
                </Switch>
            </div>
        );
    }
}

export default App;
