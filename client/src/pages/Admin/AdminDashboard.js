import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import styles from "./styles/AdminDashboard.module.css"; // Import your CSS Module

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className={`container-fluid ${styles.dashboard} pt-5`}> {/* Use Bootstrap's grid system and your CSS Module */}
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className={`card w-75 p-3 ${styles.card}`}> {/* Use Bootstrap's grid system and your CSS Module */}
              <h3> Admin Name : {auth?.user?.name}</h3>
              <h3> Admin Email : {auth?.user?.email}</h3>
              <h3> Admin Contact : {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
      {/* <footer className="fixed-bottom bg-light " />  */}
    </Layout>
  );
};

export default AdminDashboard;
