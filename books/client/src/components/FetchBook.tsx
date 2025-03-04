"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const API_LINK = "http://localhost:8000/books/";

type Book = {
  id: string;
  book_name: string;
  genre: string;
  description: string;
  author: string;
  year?: number;
  price?: number;
  image?: string;
};

export default function FetchBook() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(API_LINK);
        setBooks(response.data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="w-full px-6 py-6">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1} // Default to 1 slide per view on small screens
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 5 },
        }}
        navigation
        pagination={{ clickable: true }}
        className="w-full"
      >
        {books.map((book) => (
          <SwiperSlide key={book.id} className="flex justify-center">
            <Card className="shadow-xl rounded-lg overflow-hidden bg-[#DCC7AA] w-[250px]">
              {book.image ? (
                <img src={book.image} alt={book.book_name} className="w-full h-64 object-cover" />
              ) : (
                <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-white">
                  No Image
                </div>
              )}
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold text-gray-900">{book.book_name}</h3>
                <p className="text-sm text-gray-600">{book.genre}</p>
                <p className="text-right font-semibold text-gray-900">
                  {book.price ? `$${book.price}` : "N/A"}
                </p>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
