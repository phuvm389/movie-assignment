"use client";
import movieApi from "@/api/movieApi";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputController } from "../Forms/InputController";
import { IUserLogin } from "@/api/movieApi.interface";

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  // username: phu.vo
  // password: abc123ok.
  const [statusMessage, setStatusMessage] = useState("");

  const formOptions = { resolver: yupResolver(loginSchema) };
  const methods = useForm(formOptions);

  const handleLogin = async (data: IUserLogin) => {
    setLoading(true);
    try {
      const login = await movieApi.login(data);
      if (!login?.success) {
        setStatusMessage(login.statusMessage);
      }
    } catch (error) {
      console.log("User login error => ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login container mx-auto py-10 min-h-4/6-screen flex flex-col justify-center">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleLogin)}>
          {statusMessage && (
            <div className="italic text-red-400">{statusMessage}</div>
          )}
          <InputController
            name="username"
            label="Username"
            placeholder="Username"
          />
          <InputController
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
          <button className="btn" disabled={isLoading} aria-label="Login">
            {isLoading ? "LOADING..." : "LOG IN"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Login;
