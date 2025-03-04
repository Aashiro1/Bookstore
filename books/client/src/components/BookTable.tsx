"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteBook from "./DeleteBook";
import UpdateBook from "./UpdateBook";

const API_LINK = "http://localhost:8000/books/";

export function BookTable() {
  const [books, setBooks] = useState<
    {
      id: number;
      book_name: string;
      author: string;
      genre: string;
      year: string;
      description: string;
      price: number;
    }[]
  >([]);
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
    <div>
      {loading ? (
        <p className="text-center text-gray-500">Loading books...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <Table>
          <TableHeader className="bg-[#EDE0D4] text-[#2C3E50]">
            <TableRow>
              <TableHead className="text-[#2C3E50]">ID</TableHead>
              <TableHead className="text-[#2C3E50]">Title</TableHead>
              <TableHead className="text-[#2C3E50]">Author</TableHead>
              <TableHead className="text-[#2C3E50]">Genre</TableHead>
              <TableHead className="text-[#2C3E50]">Year</TableHead>
              <TableHead className="text-[#2C3E50]">Description</TableHead>
              <TableHead className="text-[#2C3E50]">Price</TableHead>
              <TableHead className="text-[#2C3E50]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">{book.id}</TableCell>
                <TableCell>{book.book_name}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.year}</TableCell>
                <TableCell>{book.description}</TableCell>
                <TableCell>${book.price}</TableCell>
                <TableCell className="text-right">
                  {/* <Button className="mr-2" variant="outline">
                    <Link href={`/dashboard/${book.id}/update/`}> Edit</Link>
                  </Button> */}
                  <div className="px-2 space-x-2">
                    <UpdateBook id={book.id} />

                    <DeleteBook id={book.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
