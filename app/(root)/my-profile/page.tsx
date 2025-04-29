import React from "react";
import { Button } from "@/components/ui/button";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constant";
import { serverSignOut } from "@/lib/actions/auth";

const page = () => {
  return (
    <>
      <form action={serverSignOut}>
        <Button className="mb-10">Logout</Button>
      </form>
      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  );
};

export default page;
