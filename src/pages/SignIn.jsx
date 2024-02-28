import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";


const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const BASE_URL = "https://credotbackramees.onrender.com";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

    //   const res = await fetch(`${BASE_URL}/api/auth/signin`, {
      const res = await fetch(`/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="flex justify-between items-center max-w-7xl  mx-auto  p-3">
      <div className="w-full h-[787px] bg-[#F4F4F4]  flex items-center justify-center">
        <div className=" h-[555px] w-[656px] flex flex-col items-center justify-center">
          <h1 className="font-bold text-xl mb-5">Login to your account</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center"
          >
            <input
              className="w-96 h-[60px]"
              type="email"
              placeholder="Email"
              id="email"
              onChange={handleChange}
            />
            <input
              className="w-96 h-[60px]"
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            />
            <div className=" flex items-center justify-center">
              <div className=" uppercase w-14 h-14 rounded-full flex items-center justify-center bg-white font-semibold mt-5">
                or
              </div>
            </div>

        

            <button className="w-[176px] h-[52px] border bg-[#1AA5C3] text-white uppercase font-semibold">
              Login
            </button>
            <div className="">
              <div className="flex">
                <p className="mr-2 font-light">Don't have an account?</p>
                <Link to={"/sign-up"}>
                  <span className="text-[#1AA5C3] ">Sign Up</span>
                </Link>
              </div>
            </div>
            {error && <p className="text-red-500 mt-5">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
