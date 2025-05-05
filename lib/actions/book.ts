"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { and, eq } from "drizzle-orm";
import dayjs from "dayjs";
import { error } from "console";
export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const existingBorrow = await db
      .select()
      .from(borrowRecords)
      .where(
        and(
          eq(borrowRecords.userId, userId),
          eq(borrowRecords.bookId, bookId),
          eq(borrowRecords.status, "BORROWED")
        )
      )
      .limit(1);

    if (existingBorrow.length > 0) {
      return {
        success: false,
        error: "You have already borrowed this book and not returned it yet.",
      };
    }
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);
    if (!book.length || book[0].availableCopies <= 0) {
      return { success: false, error: "book is not available for borrow" };
    }
    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    const record = await db
      .insert(borrowRecords)
      .values({ userId, bookId, dueDate, status: "BORROWED" });

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    return { success: true, data: JSON.parse(JSON.stringify(record)) };
  } catch (error: any) {
    return {
      success: false,
      error: "An error eccurred while borrowing a book",
    };
  }
};
interface UserBooks {
  userId: string;
}
export const userBook = async ({ userId }: UserBooks) => {
  try {
    const borrowedBooks = await db
      .select({
        id: books.id,
        title: books.title,
        author: books.author,
        genre: books.genre,
        rating: books.rating,
        coverUrl: books.coverUrl,
        coverColor: books.coverColor,
        description: books.description,
        summary: books.summary,
        videoUrl: books.videoUrl,
      })
      .from(borrowRecords)
      .innerJoin(books, eq(borrowRecords.bookId, books.id))
      .where(
        and(
          eq(borrowRecords.userId, userId),
          eq(borrowRecords.status, "BORROWED")
        )
      );
    return borrowedBooks;
  } catch (error: any) {
    return [];
  }
};
