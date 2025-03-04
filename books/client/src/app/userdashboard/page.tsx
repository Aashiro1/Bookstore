"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header";
import axios from "axios";

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

export default function UserDashboard() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

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
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full min-h-screen">
        <Header />
        <div className="flex-1 flex flex-col md:flex-row gap-6 p-6 bg-[#f7dcb7]">
          <div className="flex-1 overflow-x-auto">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Available Book List
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="w-full"
                  onClick={() => setSelectedBook(book)}
                >
                  <Card className="shadow-xl rounded-lg overflow-hidden bg-[#fceed9]">
                    {book.image ? (
                      <img
                        src={book.image}
                        alt={book.book_name}
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-white">
                        No Image
                      </div>
                    )}
                    <CardContent className="p-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {book.book_name}
                      </h3>
                      <p className="text-sm text-gray-600">{book.genre}</p>
                      <p className="text-right font-semibold text-gray-900">
                        {book.price ? `$${book.price}` : "N/A"}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dialog for Book Details */}
          <Dialog open={!!selectedBook} onOpenChange={(open) => !open && setSelectedBook(null)}>
            <DialogTrigger />
            <DialogContent className="w-full md:w-[350px] p-6 mt-6 md:mt-0 bg-[#f3e4d0]">
              <DialogHeader>
                <DialogTitle>Book Details</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                {selectedBook ? (
                  <div className="space-y-2 text-gray-600 ">
                    <div>
                    {selectedBook.image ? (
                      <img
                        src={selectedBook.image}
                        alt={selectedBook.book_name}
                        className="w-full h-60 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-white">
                        No Image
                      </div>
                    )}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Name: </span>
                      {selectedBook.book_name}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Genre: </span>
                      {selectedBook.genre}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Author: </span>
                      {selectedBook.author}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">
                        Description:{" "}
                      </span>
                      {selectedBook.description}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Year: </span>
                      {selectedBook.year ?? "N/A"}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Price: </span>
                      {selectedBook.price ? `$${selectedBook.price}` : "N/A"}
                    </div>
                    {isAuthenticated ? (
                      <Button className="mt-4 w-full bg-green-500 hover:bg-green-600">
                        Add To Cart
                      </Button>
                    ) : (
                      <div className="bg-red-500 text-center p-1">Login First</div>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-500">Select a book to see details.</div>
                )}
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </SidebarProvider>
  );
}
