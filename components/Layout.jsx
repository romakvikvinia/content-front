import React from "react";
import { Footer } from "components/Footer";
import { NavBar } from "components/NavBar";
import ActiveResource from "./ActiveResource";

export const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <ActiveResource />
      {children}
      <Footer />
    </>
  );
};
