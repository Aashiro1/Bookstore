"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { logout } from "@/app/utils/authService";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem('role');

    // Set authentication state
    if (token) {
      setIsAuthenticated(true);
    }

    // Set user role state
    if (role === "User") {
      setIsUser(true);
    }
  }, []);

  return (
    <header className="bg-[#B08968] text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          BookStore
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-xl">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          {isAuthenticated ? (
            <>
              {isUser && (
                <Link href="/userdashboard" className="hover:underline">
                  Dashboard
                </Link>
              )}
              <Link href="/" onClick={logout} className="">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/signup" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-blue-700 p-4">
          <Link
            href="/"
            className="block py-2"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block py-2"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>

          {isAuthenticated ? (
            <>
              {isUser && (
                <Link href="/userdashboard" className="block py-2" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
              )}
              <Link href="/" onClick={logout} className="block py-2" onClick={() => setIsOpen(false)}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="block py-2" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link href="/signup" className="block py-2" onClick={() => setIsOpen(false)}>
                Register
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
