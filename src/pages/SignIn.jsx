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
  // const BASE_URL = "https://credotbackramees.onrender.com";

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

      // const res = await fetch(`${BASE_URL}/api/auth/signin`, {
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
    <div className="flex justify-between items-center   mx-auto ">
      <div className="w-full h-screen bg-[#F4F4F4]  flex items-center justify-center">
        <div className=" h-[555px] w-[656px] flex flex-col items-center justify-center">
          <h1 className="font-bold text-xl mb-5">Login to your account</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center"
          >
            <input
              className="w-96 h-[60px] p-2"
              type="email"
              placeholder="Email"
              id="email"
              onChange={handleChange}
            />
            <input
              className="w-96 h-[60px] p-2"
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            />
            <button className="w-[176px] h-[52px] border bg-[#1AA5C3] text-white uppercase font-semibold">
              Login
            </button>
            {error && <p className="text-red-500 mt-5">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
