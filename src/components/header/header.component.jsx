import React from "react";
import { Link } from "react-router-dom";
import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { connect } from "react-redux";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
const Header = ({ currentUser, hidden }) => (
    <div className="header">
        <Link to="/" className="logo-container">
            <Logo className="logo" />
        </Link>
        <div className="options">
            <Link to="/shop" className="option">
                SHOP
            </Link>
            <Link to="/contact" className="option">
                CONTACT
            </Link>
            {currentUser ? (
                <div className="option" onClick={() => signOut(auth)}>
                    SIGN OUT
                </div>
            ) : (
                <Link to="/signin" className="option">
                    SIGN IN
                </Link>
            )}
            <CartIcon />
        </div>
        {hidden ? null : <CartDropdown />}
    </div>
);

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
    currentUser: currentUser,
    hidden: hidden,
});

export default connect(mapStateToProps)(Header);
