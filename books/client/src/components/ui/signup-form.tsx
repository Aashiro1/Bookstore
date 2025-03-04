'use client';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/app/utils/authService";
import { useState } from "react";


export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
    // State for form fields
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      address: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  
    // State for errors
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    
  
  
    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
      setErrors({ ...errors, [e.target.id]: "" }); // Clear errors on input
    };
  
    // Form validation logic
    const validateForm = () => {
      const newErrors: { [key: string]: string } = {};
  
      if (!formData.username.trim()) newErrors.name = "Name is required";
      else if (formData.username.length < 2 || formData.username.length > 20)
        newErrors.name = "Name must be 6 to 20 characters long";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Invalid email format";
  
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      else if (!/^\d{10}$/.test(formData.phone))
        newErrors.phone = "Enter a valid 10-digit phone number";
  
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters long";
  
      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Please confirm your password";
      else if (formData.confirmPassword !== formData.password)
        newErrors.confirmPassword = "Passwords do not match";
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      // Validate form before submitting
      if (!validateForm()) {
        return;
      }
  
      try {
      
        // Register the user
        await register(formData);
        // Redirect to login page after successful registration
        window.location.href = '/'
      } catch (err) {
        console.log("Registration failed", err);
        // You can handle the error more explicitly, maybe show a message to the user
      }
    };

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Welcome to Book Heaven</h1>
        <p className="text-balance text-sm text-muted-foreground">
        A room without books is like a body without a soul.
        </p>
      </div>
      <div className="grid gap-6">
      {/* Name Input */}
        <div className="grid gap-2">
         <Label htmlFor="username" className="text-[#2C3E50]">
            Name
            </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter Your Name"
                  value={formData.username}
                  onChange={handleChange}
                  className="bg-[#FAF3E0] border-[#8B5E3C]"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
                {/* Email */}
                <div className="grid gap-2">
                <Label htmlFor="email" className="text-[#2C3E50]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#FAF3E0] border-[#8B5E3C]"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
          {/* Address */}
          <div className="grid gap-2">
                <Label htmlFor="address" className="text-[#2C3E50]">
                  Address
                </Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Enter Your Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="bg-[#FAF3E0] border-[#8B5E3C]"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address}</p>
                )}
              </div>
                {/* Phone Number */}
                <div className="grid gap-2">
                <Label htmlFor="phone" className="text-[#2C3E50]">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="number"
                  min="0"
                  placeholder="Enter Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-[#FAF3E0] border-[#8B5E3C]"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>

        {/* Password */}
        <div className="grid gap-2">
                <Label htmlFor="password" className="text-[#2C3E50]">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Your Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-[#FAF3E0] border-[#8B5E3C]"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
      {/* Confirm Password */}
      <div className="grid gap-2">
                <Label htmlFor="confirmPassword" className="text-[#2C3E50]">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Your Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-[#FAF3E0] border-[#8B5E3C]"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Signup Button */}
              <Button
                type="submit"
                className="w-full bg-[#8B5E3C] text-white hover:bg-[#6D4C41]"
              >
                Signup
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-[#4A4A4A]">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4 text-[#8B5E3C]">
              Login
        </a>
            </div>
          </form>
  );
}