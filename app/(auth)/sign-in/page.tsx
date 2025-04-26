"use client";

import { signInSchema } from "@/lib/validition";
import React from "react";
import AuthForm from "@/components/AuthForm";
const Page = () => (
  <AuthForm
    type="SIGN_IN"
    schema={signInSchema}
    defaultValues={{
      email: "",
      password: "",
    }}
    onSubmit={() => {}}
  />
);

export default Page;
