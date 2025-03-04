"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
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

const API_LINK = "http://localhost:8000/books";

export default function DeleteBook({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  console.log(id)

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${API_LINK}/${id}/delete/`);
      window.location.reload();
      toast.success("Book deleted successfully!");
      setTimeout(() => router.refresh(), 1000); // Refresh page after deletion
    } catch (error) {
      toast.error("Failed to delete book.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent className="bg-[#f3e4d0]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this book? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={()=>{router.push('/dashboard')}}>Cancel</Button>
          <Button
            className="bg-red-500 text-white"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
