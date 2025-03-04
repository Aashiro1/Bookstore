'use client';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/app/utils/authService";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear errors on input change
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: { username?: string; password?: string } = {};

    // **Username Validation**
    if (!formData.username.trim()) {
      validationErrors.username = "Username is required.";
    }

    // **Password Validation**
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters.";
    }

    // **If there are errors, prevent form submission**
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // try {
    //   // Call the login function from the auth service
    //   await login(formData);
    //   window.location.href = '/userdashboard'; // Redirect on successful login
    // } catch (err) {
    //   console.error('Invalid username or password');
    //   alert("Login failed, please check your credentials.");
    // }


    try {
      const role = await login(formData); // Get role from backend
      
      // Redirect based on role
      if (role === "Admin") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/userdashboard";
      }
    } catch (err) {
      console.error("Invalid username or password");
      alert("Login failed, please check your credentials.");
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Welcome to Book Heaven</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Login to explore and manage your bookstore collection
        </p>
      </div>
      <div className="grid gap-6">
        {/* Username Input */}
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter Your Username"
            value={formData.username}
            onChange={handleChange}
            className="bg-[#FAF3E0] border-[#8B5E3C]"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

        {/* Password Input */}
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="bg-[#FAF3E0] border-[#8B5E3C]"
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-[#8B5E3C] text-white hover:bg-[#6D4C41]">
          Login
        </Button>
      </div>

      {/* Signup Link */}
      <div className="mt-4 text-center text-sm text-[#4A4A4A]">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="underline underline-offset-4 text-[#8B5E3C]">
          Sign up
        </a>
      </div>
    </form>
  );
}