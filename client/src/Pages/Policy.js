import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/policy.png"
            alt="contactus"
            style={{ width: "80%" }}
          />
        </div>
        <div className="col-md-4" style={{ position: "relative", top: "50px"}}>
        <h1 className="bg-dark p-2 text-white text-center">Terme Policy </h1>
        <br></br>
          <p>
            <strong>Product and Services : </strong>The
            store will offer a variety of high quality products .
          </p>
          <p>
            <strong>Order and Payment :</strong> Customers can make
            orders through the online Store and Payment upon Delivery.
            </p>
          <p>
            <strong>Shipping and Delivery :</strong> The
            estimated delivery time will be clearly communicated to the
            customers during the checkout process.
          </p>
          <p>
            <strong>Returns and Refunds :</strong> The store will provide a
            clear and fair return and refund policy.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
