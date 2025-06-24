import React from "react";
import Layout from "./Components/Landing/Layout";
import Hero from "./Components/Landing/Hero";
import { Route, Routes } from "react-router-dom";
import Features from "./Components/Landing/Features";
import Howitworks from "./Components/Landing/Howitworks";
import Faq from "./Components/Landing/Faq";
import SignUp from "./Components/Auth/SignUp";
import SignIn from "./Components/Auth/SignIn";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import ConfirmCode from "./Components/Auth/ConfirmCode";
import Success from "./Components/Auth/Success";

const App = () => {
  return (
    <div className="max-w-[1600px] mx-auto">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero />} />
          <Route path="/features"  exact element={<Features />} />
          <Route path="/how-it-works"  exact element={<Howitworks />} />
          <Route path="/faq"  exact element={<Faq />} />
        </Route>
             <Route path="/signup"  exact element={<SignUp />} />
          <Route path="/signin"  exact element={<SignIn />} />
          <Route path="/forgotpassword"  exact element={<ForgotPassword />} />
          <Route path="/confirmation-code"  exact element={<ConfirmCode />} />
          <Route path="/success"  exact element={<Success />} />
      </Routes>
    </div>
  );
};

export default App;
