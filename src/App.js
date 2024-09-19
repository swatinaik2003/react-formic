import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import "./App.css";

const UserProfileForm = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Construct query parameters string from form values
      const queryParams = new URLSearchParams(values).toString();

      const response = await axios.get(
        `https://dummyjson.com/users?${queryParams}`
      );

      console.log("Success:", response.data);
      // Handle success (e.g., show a success message, redirect, etc.)
      alert("User profile fetched successfully!");
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show an error message)
      alert("Failed to fetch user profile.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: "", lastName: "", email: "", age: "", mobile: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.name) errors.name = "Required";
        if (!values.lastName) errors.lastName = "Required";
        if (!values.email) {
          errors.email = "Required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
          errors.email = "Invalid email address";
        }
        if (!values.age) errors.age = "Required";
        if (!values.mobile) errors.mobile = "Required";
        else if (!/^\d{10}$/.test(values.mobile)) {
          errors.mobile = "Invalid mobile number";
        }
        return errors;
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="name">First Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <Field type="text" name="lastName" />
            <ErrorMessage name="lastName" component="div" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label htmlFor="age">Age</label>
            <Field type="number" name="age" />
            <ErrorMessage name="age" component="div" />
          </div>

          <div>
            <label htmlFor="mobile">Mobile Number</label>
            <Field type="text" name="mobile" />
            <ErrorMessage name="mobile" component="div" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UserProfileForm;
