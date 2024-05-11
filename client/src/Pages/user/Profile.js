import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

const Profile = () => {
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <h1>USER PROFILE</h1>
            <div className="mb-3"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
