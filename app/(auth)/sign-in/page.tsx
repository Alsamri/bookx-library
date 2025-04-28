"use client";

import { signInSchema } from "@/lib/validition";
import React from "react";
import AuthForm from "@/components/AuthForm";
import { signinWithCredentials } from "@/lib/actions/auth";
const Page = () => (
  <AuthForm
    type="SIGN_IN"
    schema={signInSchema}
    defaultValues={{
      email: "",
      password: "",
    }}
    onSubmit={signinWithCredentials}
  />
);

export default Page;
