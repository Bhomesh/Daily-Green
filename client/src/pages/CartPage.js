import React, { useState, useEffect, useMemo, useCallback } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
import GooglePayButton from "@google-pay/button-react";

const CartPage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const getToken = async () => {
      try {
        const { data } = await axios.get("/api/v1/product/braintree/token");
        setClientToken(data?.clientToken);
      } catch (error) {
        console.log(error);
      }
    };
    getToken();
  }, [auth?.token]);

  const totalPrice = useMemo(() => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  }, [cart]);

  const totalPricePay = useMemo(() => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  }, [cart]);

  const removeCartItem = useCallback(
    (pid) => {
      try {
        let myCart = [...cart];
        let index = myCart.findIndex((item) => item._id === pid);
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
      } catch (error) {
        console.log(error);
      }
    },
    [cart, setCart]
  );

  const updateQuantity = (pid, action) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      if (index !== -1) {
        if (action === "increase") {
          myCart[index].quantity++;
        } else if (action === "decrease") {
          myCart[index].quantity--;
          if (myCart[index].quantity < 1) {
            myCart[index].quantity = 1;
          }
        }
      } else {
        // If the item doesn't exist in the cart, you can add it here
        // For example, you can fetch the item from the server and add it to the cart
      }
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = useCallback(async () => {
    try {
      setLoading(false);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [instance, cart, navigate, setCart]);

  return (
    <Layout>
      <div className=" cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div className="col-md-7  p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <div style={{ width: "50%", height: "50%" }}>
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">
                          <small className="text-muted">
                            {p.price.toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </small>
                        </p>
                      </div>

                      <div className="d-flex justify-content-between">
                        <p className="card-text">{p.description}</p>
                        <p>Quantity: {p.quantity}</p>
                      </div>

                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-danger"
                          onClick={() => removeCartItem(p._id)}
                        >
                          Remove
                        </button>
                        <div>
                          <button
                            className="btn btn-primary"
                            onClick={() => updateQuantity(p._id, "decrease")}
                          >
                            -
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => updateQuantity(p._id, "increase")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Cart Summary</h5>
                  <div className="d-flex justify-content-end align-items-center">
                    <p className="card-text">Total Items: {cart?.length}</p>
                    <p className="card-text">Total Price: {totalPrice}</p>
                    {instance && (
                      <DropIn
                        options={{ authorization: clientToken }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                    )}
                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={!cart?.length || loading}
                    >
                      {loading ? "Processing..." : "Proceed to Checkout"}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => navigate("/dashboard/user/orders")}
                    >
                      View Orders
                    </button>
                    <div>
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
                                allowedAuthMethods: [
                                  "PAN_ONLY",
                                  "CRYPTOGRAM_3DS",
                                ],
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
                            totalPrice: `${totalPricePay}`,
                            currencyCode: "INR",
                            countryCode: "IN",
                          },
                          shippingAddressRequired: false,
                          callbackIntents: ["PAYMENT_AUTHORIZATION"],
                        }}
                        onLoadPaymentData={(paymentRequest) => {
                          console.log("success", paymentRequest);
                        }}
                        onPaymentAuthorized={(paymentData) => {
                          console.log(
                            "Payment Authorized Success",
                            paymentData
                          );
                          return { transactionState: "SUCCESS" };
                        }}
                        existingPaymentMethodRequired="false"
                        buttonColor="black"
                        buttonType="Buy"
                      />
                    </div>
                    <button
                      className="btn btn-success"
                      onClick={() => navigate("/dashboard/pay")}
                    >
                      pay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
