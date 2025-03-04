"use client";

import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const API_LINK = "http://localhost:8000/books";

export default function DeleteBook() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_LINK}/${id}/delete/`);
      toast.success("Book deleted successfully!");
      setOpen(false);
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (error) {
      toast.error("Failed to delete book. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Delete Book</h1>
      <p>Are you sure you want to delete this book?</p>

      {/* Dialog Trigger */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-red-500 text-white px-4 py-2 rounded mt-4">
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="p-6">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              This action is irreversible. Are you sure you want to continue?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-500 text-white" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancel Button */}
      <Button
        variant="outline"
        className="mt-4 ml-2"
        onClick={() => router.push("/dashboard")}
      >
        Cancel
      </Button>
    </div>
  );
}
