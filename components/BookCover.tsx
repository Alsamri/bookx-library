"use client";

import React from "react";
import { cn } from "@/lib/utils";

import { Image } from "@imagekit/next";
import BookCoverSvg from "./BookCoverSvg";
import config from "@/lib/config";
type BookCoverVriant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVriant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};
interface Props {
  className?: string;
  variant?: BookCoverVriant;
  coverColor: string;
  coverUrl: string;
}

const BookCover = ({
  className,
  variant = "regular",
  coverColor = "#012b48",
  coverUrl = "https//placehold.co/400x600.png",
}: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <Image
          src={coverUrl}
          urlEndpoint={config.env.imagekit.urlEndpoint}
          alt="book cover"
          fill
          className="rounded-sm object-fill"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default BookCover;
