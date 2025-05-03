"use server";

import { books } from "@/database/schema";
import { db } from "@/database/drizzle";
export const createBook = async (params: BookParams) => {
  try {
    const newBook = db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();

    return {
      succes: true,
      data: JSON.parse(JSON.stringify([0])),
    };
  } catch (error: any) {
    console.log(error, "new book error");
    return { success: false, error: "new book error" };
  }
};
