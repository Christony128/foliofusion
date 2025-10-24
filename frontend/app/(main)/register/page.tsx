"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    biodata: "",
  });
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("./dashboard");
    }
  }, [router]);
  const { username, email, password, password2, biodata } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Passwords don't match");
      return;
    }

    try {
      const res = await fetch("http://localhost:1100/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, biodata }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.removeItem("token");
        localStorage.setItem("token", data.token);
        console.log("Registration successful:", data);
        window.dispatchEvent(new Event("storage"));
        router.push("./dashboard");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 pt-12 px-4">
      <h1 className="text-center text-5xl font-bold mb-6">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm flex flex-col gap-4"
      >
        <input
          type="text"
          name="username"
          value={username}
          placeholder="Enter your username"
          onChange={handleChange}
          className="border p-3 rounded"
        />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={handleChange}
          className="border p-3 rounded"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Enter your password"
          onChange={handleChange}
          className="border p-3 rounded"
        />
        <input
          type="password"
          name="password2"
          value={password2}
          placeholder="Confirm your password"
          onChange={handleChange}
          className="border p-3 rounded"
        />
        <input
          type="text"
          name="biodata"
          value={biodata}
          placeholder="Enter your biodata(optional)"
          onChange={handleChange}
          className="border p-3 rounded"
        />
        <button
          type="submit"
          className="border border-black bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black transition hover:cursor-pointer transition-colors duration-700"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
