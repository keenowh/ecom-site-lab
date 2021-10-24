import React from "react";
import CustomButton from "../../components/custom-button/custom-button.component";
import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import { SignInWithGoogle } from "../../firebase/firebase.utils";
class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        };
    }

    handleSubmit = (e) => {
        e.preventDafault();

        this.setState({ email: "", password: "" });
    };

    handleChange = (e) => {
        const { value, name } = e.target;

        this.setState({ [name]: value });
    };
    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your Email and Password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        label="Email"
                        value={this.state.email}
                        required
                        handleChange={this.handleChange}
                    />
                    <FormInput
                        type="password"
                        name="email"
                        value={this.state.password}
                        required
                        label="Password"
                        handleChange={this.handleChange}
                    />
                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={SignInWithGoogle} isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;
