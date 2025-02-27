"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { validateBookForm } from "@/components/ui/form-validation"; // Import validation function

const API_LINK = "http://localhost:8000/books";
const genres = [
  "Fiction", "Non-Fiction", "Mystery", "Science Fiction", "Fantasy",
  "Romance", "Thriller", "Biography", "History", "Self-Help",
];

interface Book {
  book_name: string;
  genre: string;
  author: string;
  year: number | string;
  description: string;
  price: number | string;
}

export default function UpdateBook() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [book, setBook] = useState<Book>({
    book_name: "",
    genre: "",
    author: "",
    year: "",
    description: "",
    price: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`${API_LINK}/${id}/`)
      .then((res) => setBook(res.data))
      .catch((err) => console.error("Error fetching book:", err));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value: rawValue } = e.target;
    let value = rawValue;
  
    // Trim input fields
    if (name === "book_name" || name === "author" || name === "description") {
      value = value.trim();
    }
  
    if (name === "year") {
      const currentYear = new Date().getFullYear();
      const numericYear = parseInt(value, 10);
  
      // Prevent future years
      if (!isNaN(numericYear) && numericYear > currentYear) {
        return; // Ignore if future year is entered
      }
    }
  
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setMessage("");

    const validationErrors = validateBookForm(book);
    if (validationErrors) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const updatedBook = {
        ...book,
        year: Number(book.year),
        price: Number(book.price),
      };

      await axios.put(`${API_LINK}/${id}/update/`, updatedBook);
      setMessage("Book updated successfully!");
      setTimeout(() => router.push("/book"), 1500);
    } catch (error) {
      setMessage("Failed to update book.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Update Book</h1>
      {message && <p className={`text-${message.includes("successfully") ? "green" : "red"}-500`}>{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="book_name"
          placeholder="Book Title"
          value={book.book_name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        {errors.book_name && <p className="text-red-500">{errors.book_name}</p>}

        <select
          name="genre"
          value={book.genre}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Genre</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>{genre}</option>
          ))}
        </select>
        {errors.genre && <p className="text-red-500">{errors.genre}</p>}

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        {errors.author && <p className="text-red-500">{errors.author}</p>}

        <input
          type="number"
          name="year"
          placeholder="Year"
          value={book.year}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        {errors.year && <p className="text-red-500">{errors.year}</p>}

        <textarea
          name="description"
          placeholder="Description"
          value={book.description}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        {errors.description && <p className="text-red-500">{errors.description}</p>}

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={book.price}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        {errors.price && <p className="text-red-500">{errors.price}</p>}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
}
