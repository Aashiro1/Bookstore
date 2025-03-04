"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import Image from "next/image";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookForm } from "@/components/BookForm";
import { BookTable } from "@/components/BookTable";
import axios from 'axios';
import { useRouter } from "next/router";

const API_LINK = "http://localhost:8000/books/";

export default function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "Admin") {
      window.location.href = '/unauthorized' // Redirect unauthorized users
    }
  }, []);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      await axios.post(API_LINK, data);
      setIsDialogOpen(false);
      alert("Book added successfully!");
    } catch (error: any) {
      alert(`Error: ${error.response?.data?.message || "There was an error submitting the form."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-auto ">
        <AppSidebar />
        {/* Fix: Change overflow-hidden to overflow-auto for scrolling */}
        <div className="flex flex-col flex-1 overflow-auto ">
          <SidebarInset>
            <header className="flex h-16 items-center gap-2 border-b px-4 py-4 bg-[#EDE0D4]">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Home</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>

            {/* Main Content Section */}
            <div className="bg-[#f5e8d5]">
            <div className="pt-10 px-10 ">
              <Card className="flex-start size-auto w-auto bg-[#EDE0D4]">
                <CardHeader className="flex flex-col items-center">
                  <div className="flex gap-40">
                    <CardTitle className="italic text-6xl">
                      Upload Your Books <br /> To Increase Your Sales
                    </CardTitle>  
                    <CardContent>
                      <p className="text-2xl">
                        Engage your shop books with this Dashboard <br /> and make sales every day to your shop
                      </p>
                    </CardContent>
                    <Image src="/We Heart It.jpg" alt="Bookstore" width={300} height={300} className="rounded-lg" />
                  </div>
                </CardHeader>
                <CardFooter>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-36 h-14 mb-6 bg-[#c7ac87] text-white hover:bg-[#6D4C41] text-2xl" disabled={loading}>
                        {loading ? "Submitting..." : "Add a Book"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg w-full p-6 bg-[#EDE0D4]">
                      <VisuallyHidden><DialogTitle>Add a New Book</DialogTitle></VisuallyHidden>
                      <h2 className="text-xl font-semibold mb-4 flex justify-center text-[#2C3E50]">Add a New Book</h2>
                      <BookForm />
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </div>

            {/* Fix: Make the table container scrollable */}
            <div className="ml-20 w-full max-w-5xl py-10 px-20">
              <BookTable />
            </div>
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
