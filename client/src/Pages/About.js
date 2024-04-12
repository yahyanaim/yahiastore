import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/aboutus.png"
            alt="contactus"
            style={{ width: "70%", position: "relative", left: "5%" }}
          />
        </div>
        <div className="col-md-4" style={{postion: "relative", top: "50px"}}>
        <h1 className="bg-dark p-2 text-white text-center">ABOUT US</h1>
        <br></br>
          <p className="text-justify mt-2">
            Welcome to Yahia Store! We are your one-stop shop for a
            wide range of high-quality products. Our goal is to provide you with
            an exceptional shopping experience by offering a diverse selection,
            competitive prices, and excellent customer service.
            we believe in delivering value and convenience to our customers. With our extensive product range, you can find everything you need in one place. From electronics and home appliances to fashion and beauty, we have carefully curated our collection to meet your diverse needs.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
