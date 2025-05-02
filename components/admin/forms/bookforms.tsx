"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validition";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ImageUpload";

interface Props extends Partial<Book> {
  type?: "create" | "update";
}

const AuthForm = ({ type, ...book }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      describtion: "",
      author: "",
      genre: "",
      rating: 1,
      totalCopies: 1,
      coveruRL: "",
      coverColor: "",
      videoUrl: "",
      summary: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof bookSchema>) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Title
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book title"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"author"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Author
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book Author"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"genre"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Genre
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Book title"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"rating"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Rating
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  placeholder="Book rating"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"totalCopies"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Total copies
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={1000}
                  placeholder="total copies"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"coveruRL"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Image
              </FormLabel>
              <FormControl>{/*fileupload func*/}</FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"coverColor"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Cover color
              </FormLabel>
              <FormControl>
                <ImageUpload
                  type="image"
                  accept="image/*"
                  placeholder="Upload a book cover"
                  folder="books/cover"
                  variant="light"
                  onFileChange={field.onChange}
                  value={field.value}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"describtion"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Describtion
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Book description"
                  {...field}
                  rows={10}
                  className="book-form_input"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"videoUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book trailer
              </FormLabel>
              <FormControl>
                <ImageUpload
                  type="video"
                  accept="video/*"
                  placeholder="Upload a book trailer"
                  folder="books/video"
                  variant="light"
                  onFileChange={field.onChange}
                  value={field.value}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"summary"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Summary
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Summary"
                  {...field}
                  rows={5}
                  className="book-form_input"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="book-form_btn text-white">
          Add Book to Library
        </Button>
      </form>
    </Form>
  );
};
export default AuthForm;
