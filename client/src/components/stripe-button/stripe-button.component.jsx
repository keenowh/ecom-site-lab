import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey =
        "pk_test_51JSLSML4jplIXyloPbdMROZpBVYawaqWFOeyh2n7adpiCyCMxaEh4w0ZIdQAcAglHDXDj6s0TnRutzfcJZTp5Whv00K53MxTCP";

    const onToken = (token) => {
        axios({
            url: "payment",
            method: "post",
            data: {
                amount: priceForStripe,
                token,
            },
        })
            .then((response) => {
                alert("Payment Successful");
            })
            .catch((error) => {
                console.log("Payment error", JSON.parse(error));
                alert("Payment Unsuccessful");
            });
    };

    return (
        <StripeCheckout
            label="Pay Now"
            name="Naneun Clothing"
            billingAddress
            shippingAddress
            image={"https://svgshare.com/i/CUz.svg"}
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;
