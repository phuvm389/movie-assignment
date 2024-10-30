"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputController } from "../Forms/InputController";
import { useDispatch } from "react-redux";
import { addUserSubmitted } from "@/store/reducers/userSubmittedSlice";
import { userSubmittedApi } from "@/api/userSubmittedApi";

const UserSubmittedAddSchema = Yup.object().shape({
  originalTitle: Yup.string().required("Original Title is required"),
  // posterPath: Yup.string().required("PosterPath Title is required"),
  overview: Yup.string().required("Overview is required"),
  // genres: Yup.string().required("Genres is required"),
  releaseDate: Yup.string()
    .test("releaseDate", "Date cannot be in the past", function (value: any) {
      const today = new Date();
      const cardExpiryDate = new Date(value);
      return cardExpiryDate >= today;
    })
    .required("Release Date is required"),
  popularity: Yup.string().required("Popularity is required"),
  imdbId: Yup.string().url("imdbId is url").required("imdbId is required"),
});

export const UserSubmittedAdd = () => {
  const [isLoading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const formOptions = { resolver: yupResolver(UserSubmittedAddSchema) };
  const methods = useForm(formOptions);
  const dispatch = useDispatch();

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      const id = (Math.random() + 1).toString(36).substring(7);
      const newUserSubmitted = await userSubmittedApi.createUserSubmitted({
        ...data,
        posterPath: "mBaXZ95R2OxueZhvQbcEWy2DqyO.jpg",
        id,
      });
      if (newUserSubmitted) {
        dispatch(addUserSubmitted(newUserSubmitted));
        methods.reset({
          originalTitle: "",
          overview: "",
          releaseDate: "",
          popularity: "",
          imdbId: "",
        });
      }
    } catch (error) {
      console.log("Add User Submit => ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-submitted-add py-12 lg:py-16">
      <h2 className="mb-10">{"User Submitted Add Form"}</h2>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          {statusMessage && (
            <div className="italic text-red-400">{statusMessage}</div>
          )}
          <InputController
            name="originalTitle"
            label="Title"
            placeholder="Title"
          />
          <InputController
            name="overview"
            label="Full description"
            placeholder="Full description"
            type="textarea"
          />
          <InputController
            name="releaseDate"
            label="Release Date"
            placeholder="Release Date"
            type="date"
          />
          <InputController
            name="popularity"
            label="Popularity"
            placeholder="Popularity"
            type="number"
          />
          <InputController
            name="imdbId"
            label="imdbId"
            placeholder="imdbId"
            type="url"
          />

          <button className="btn" disabled={isLoading} aria-label="Submit">
            {isLoading ? "Adding..." : "Submit"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
