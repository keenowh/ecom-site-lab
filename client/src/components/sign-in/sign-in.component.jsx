import React, { useState } from "react";
import { connect } from "react-redux";
import CustomButton from "../../components/custom-button/custom-button.component";
import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import {
    googleSignInStart,
    emailSignInStart,
} from "../../redux/user/user.actions";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [userCredentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const { email, password } = userCredentials;

    const handleSubmit = async (e) => {
        e.preventDefault();

        emailSignInStart(email, password);
    };

    const handleChange = (e) => {
        const { value, name } = e.target;

        setCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your Email and Password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    type="email"
                    name="email"
                    label="Email"
                    value={email}
                    required
                    handleChange={handleChange}
                />
                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    required
                    label="Password"
                    handleChange={handleChange}
                />
                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton onClick={googleSignInStart} isGoogleSignIn>
                        Sign in with Google
                    </CustomButton>
                </div>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) =>
        dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
