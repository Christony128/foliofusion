"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
  hasResume: boolean;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [message,setMessage]=useState<string>("")

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

      const updateRes = await fetch('http://localhost:1100/api/users/updateHasresume', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (updateRes.ok) {
        setUser(prev => prev ? { ...prev, hasResume: true } : null);
        await fetchUser(token);
      }
    } catch (err) {
      console.error("Failed to update resume flag", err);
    } finally {
      setUpdating(false);
    }
    router.push('/dashboard/edit')
  };

  const editResume = () => {
    router.push('/dashboard/edit')
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const result = await fetch(`http://localhost:1100/api/users/${searchQuery}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (result.ok) {
    const data=await result.json()
    if(data.hasresume){
      router.push(`/${searchQuery}`)
    }
    else{
      setMessage("This user has not initialised their resume")
    }
  } else {
    setMessage("User not found")
  }
};
  
  

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center"><p>No user data found.</p></div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
          <div className="flex gap-4 items-center">
            <button
              disabled={updating}
              className={`bg-green-500 text-white px-4 py-2 rounded ${
                updating ? 'opacity-50' : 'hover:bg-green-600'
              }`}
              onClick={user.hasResume ? editResume : createResume}
            >
              {updating ? "Creating..." : (user.hasResume ? "Edit Resume" : "Create Resume")}
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Search username" 
              value={searchQuery}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {message}
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}