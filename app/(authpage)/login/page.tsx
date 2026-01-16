"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const router = useRouter();
  const handleLogin = async (values) => {
    try {
      const { data } = await axios.post(
        "https://fakestoreapi.com/auth/login",
        values
      );
      if (data.token) {
        router.push("/");
      }
    } catch (err) {
      toast(err.response?.data);
    }
  };

  return (
    <div className="flex items-center justify-center m-auto">
      <div className="w-full max-w-xs p-8 rounded-lg bg-gray-100 border border-gray-200 shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            handleLogin(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <Field
                  name="username"
                  className="w-full border bg-white border-gray-300 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="First name"
                />
                {errors.username && touched.username ? (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.username}
                  </div>
                ) : null}
              </div>
              <div>
                <Field
                  name="password"
                  type="password"
                  className="w-full border bg-white border-gray-300 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </div>
                ) : null}
              </div>
              <Button variant="default" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
