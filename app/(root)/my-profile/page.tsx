import React from "react";
import { Button } from "@/components/ui/button";
import BookList from "@/components/BookList";

import { serverSignOut } from "@/lib/actions/auth";
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { userBook } from "@/lib/actions/book";

const page = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }
  const borrowedBooks = (await userBook({ userId: session.user.id })) as Book[];

  return (
    <>
      <form action={serverSignOut}>
        <Button className="mb-10">Logout</Button>
      </form>
      <BookList title="Borrowed Books" books={borrowedBooks} />
    </>
  );
};

export default page;
