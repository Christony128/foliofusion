"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
  hasresume: boolean;
  email: Text;
  biodata: Text;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState<string>("");

  const fetchUser = async (token: string) => {
    try {
      const res = await fetch("http://localhost:1100/api/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch user");
      const data: User = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Unable to fetch user details", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/register");
      return;
    }
    fetchUser(token);
  }, [router]);

  const createResume = async () => {
    try {
      setUpdating(true);
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/register");
        return;
      }

      const updateRes = await fetch(
        "http://localhost:1100/api/users/updateHasResume",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (updateRes.ok) {
        setUser((prev) => (prev ? { ...prev, hasResume: true } : null));
        await fetchUser(token);
      }
    } catch (err) {
      console.error("Failed to update resume flag", err);
    } finally {
      setUpdating(false);
    }
    router.push("/dashboard/edit");
  };

  const editResume = () => {
    router.push("/dashboard/edit");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setMessage("Please enter a username");
      return;
    }

    try {
      const result = await fetch(
        `http://localhost:1100/api/users/${searchQuery}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (result.ok) {
        const data = await result.json();
        if (data.hasresume) {
          router.push(`/portfolios/${searchQuery}`);
        } else {
          setMessage("This user has not created their portfolio yet");
        }
      } else {
        setMessage("User not found");
      }
    } catch (err) {
      setMessage("Error searching for user");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-xl">No user data found.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome back, <span className="text-blue-600">{user.username}</span>
          </h1>
          <p className="text-gray-600 text-xl">
            Manage your portfolio and discover other developers' work
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Portfolio Manager
            </h2>

            <div className="space-y-6">
              <button
                disabled={updating}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white text-lg transition-colors ${
                  updating
                    ? "bg-gray-400 cursor-not-allowed"
                    : user.hasresume
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={user.hasresume ? editResume : createResume}
              >
                {user.hasresume ? (
                  "Edit My Portfolio"
                ) : (
                  "Create My Portfolio"
                )}
              </button>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-base">
                  {user.hasresume
                    ? "Your portfolio is live and accessible to others. Click above to edit and update your information."
                    : "Click 'Create My Portfolio' to initialize your very own portfolio and start showcasing your work."}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Discover Portfolios
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Enter username to search..."
                  value={searchQuery}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg"
                />
              </div>

              {message && (
                <div
                  className={`p-4 rounded-lg text-base font-medium ${
                    message.includes("not found") ||
                    message.includes("Error") ||
                    message.includes("Please enter")
                      ? "bg-red-50 border border-red-200 text-red-700"
                      : "bg-yellow-50 border border-yellow-200 text-yellow-700"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={!searchQuery}
                className="w-full py-4 px-6 bg-gray-700 text-white rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Search Portfolio
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
