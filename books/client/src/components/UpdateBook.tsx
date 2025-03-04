"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const API_URL = "http://localhost:8000/books/";

const genres = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Science Fiction",
  "Fantasy",
  "Romance",
  "Thriller",
  "Biography",
  "History",
  "Self-Help",
];

interface Book {
  book_name: string;
  genre: string;
  author: string;
  year: number | string;
  description: string;
  price: number | string;
  image?: File | null;
}

export default function UpdateBook({ id }: { id: number }) {
  const router = useRouter();
  const [book, setBook] = useState<Book>({
    book_name: "",
    genre: "",
    author: "",
    year: "",
    description: "",
    price: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    // Fetch book details when component mounts
    axios
      .get(`${API_URL}${id}/`)
      .then((res) => {
        setBook({
          book_name: res.data.book_name,
          genre: res.data.genre,
          author: res.data.author,
          year: res.data.year,
          description: res.data.description,
          price: res.data.price,
          image: null, // You can fetch image URL from backend if needed
        });
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        setMessage("Failed to fetch book details.");
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBook({ ...book, image: e.target.files[0] });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("book_name", book.book_name);
    formData.append("genre", book.genre);
    formData.append("author", book.author);
    formData.append("year", book.year.toString());
    formData.append("description", book.description);
    formData.append("price", book.price.toString());
    if (book.image) {
      formData.append("image", book.image);
    }

    try {
      await axios.put(`${API_URL}${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.reload();
      toast.success("Book updated successfully!");
      setTimeout(() => router.refresh(), 1000); // Redirect after update
    } catch (error) {
      toast.error("Failed to update book.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Update</Button>
      </DialogTrigger>
      <DialogContent className="bg-[#f3e4d0]">
        <DialogHeader>
          <DialogTitle>Update Book Details</DialogTitle>
          <DialogDescription>
            Please update the book details below and click "Update" to save your changes.
          </DialogDescription>
        </DialogHeader>
        {message && <div className={`text-${message.includes("successfully") ? "green" : "red"}-500`}>{message}</div>}
        <div className="flex flex-col gap-4  ">
          <input
            type="text"
            name="book_name"
            placeholder="Book Title"
            value={book.book_name}
            onChange={handleChange}
           
            className="border p-2 rounded bg-[#FAF3E0] border-[#8B5E3C]"
            required
          />
          <select
            name="genre"
            value={book.genre}
            onChange={handleChange}
            className="border p-2 rounded bg-[#FAF3E0] border-[#8B5E3C]"
            required
          >
            <option value="">Select Genre</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={book.author}
            onChange={handleChange}
            className="border p-2 rounded bg-[#FAF3E0] border-[#8B5E3C]"
            required
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={book.year}
            onChange={handleChange}
            className="border p-2 rounded bg-[#FAF3E0] border-[#8B5E3C]"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={book.description}
            onChange={handleChange}
            className="border p-2 rounded bg-[#FAF3E0] border-[#8B5E3C]"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            min={0}
            value={book.price}
            onChange={handleChange}
            className="border p-2 rounded bg-[#FAF3E0] border-[#8B5E3C]"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded bg-[#FAF3E0] border-[#8B5E3C]"
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={()=>{router.push('/dashboard')}}>Cancel</Button>
          <Button
            className="bg-blue-500 text-white"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
