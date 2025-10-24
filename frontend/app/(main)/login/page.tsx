"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:1100/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.removeItem("token");
        localStorage.setItem("token", data.token);
        console.log("Login successful:", data);
        router.push("./dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Network error. Please try again.");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("./dashboard");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 pt-12 px-4">
      <h1 className="text-center text-5xl font-bold mb-6">Login</h1>
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
          type="password"
          name="password"
          value={password}
          placeholder="Enter your password"
          onChange={handleChange}
          className="border p-3 rounded"
        />
        <button
          type="submit"
          className="border border-black bg-black text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-white hover:text-black transition-colors duration-700"
        >
          Submit
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
