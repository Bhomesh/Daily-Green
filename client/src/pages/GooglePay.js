import React from "react";
import GooglePayButton from "@google-pay/button-react";
const logo = require("../logo.svg");

const GooglePay = () => {
  const totalPrice = "10";
  const currencyCode = "INR";
  const countryCode = "IN";

  return (
    <div>
      <h1
        className="googleText"
        style={{
          textAlign: "center",
          fontSize: "45px",
          color: "#FFFFFF",
          marginTop: "40vh",
        }}
      >
        <img src={logo} alt="logo" className="App-logo" />
        Google Pay
      </h1>

      <GooglePayButton
        className="paybtn"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "example",
                  gatewayMerchantId: "exampleGatewayMerchantId",
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: "12345678901234567890",
            merchantName: "Demo Merchant",
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: totalPrice,
            currencyCode: currencyCode,
            countryCode: countryCode,
          },
          shippingAddressRequired: true,
          callbackIntents: ["PAYMENT_AUTHORIZATION"],
        }}
        onLoadPaymentData={(paymentRequest) => {
          console.log("success", paymentRequest);
        }}
        onPaymentAuthorized={(paymentData) => {
          console.log("Payment Authorized Success", paymentData);
          return { transactionState: "SUCCESS" };
        }}
        existingPaymentMethodRequired="false"
        buttonColor="white"
        buttonType="Buy"
      />
    </div>
  );
};

export default GooglePay;
