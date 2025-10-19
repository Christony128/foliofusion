"use client"
import {useRouter,usePathname} from 'next/navigation'
import { useEffect, useState } from 'react';

export default function Header(){
    const pathname = usePathname();
    const router=useRouter();
    const [storedToken,setStoredToken]=useState<string | null>(null)
    const [user,setUser]=useState<any | null>(null)
    
    const fetchUser=async(token:any)=>{
        if (!token) return;
        try {
            const res=await fetch('http://localhost:1100/api/users/me',{
                headers: {Authorization: `Bearer ${token}`}
            })
            const data=await res.json()
            setUser(data);
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    }
        
    const logout=()=>{
        localStorage.removeItem("token")
        setStoredToken(null);
        setUser(null);
        router.push('/register')
    }
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        setStoredToken(token);
        if (token) {
            fetchUser(token);
        }
    }, [pathname]);
       
    function Button({link,text}:{link:string,text: string}){
        return <div>
            <button 
                className="text-black hover:underline hover:text-gray-600" 
                onClick={()=>{router.push(link)}}
            >
                {text}
            </button>
        </div>
    }
    
    return (
        <div className="flex items-center flex-col sm:flex-row justify-between border border-gray-300 pr-5 pt-2 pb-2 mb-10">
            <div className="logo text-gray-600 pl-30">Foliofusion</div>
            <div className="routes flex items-center gap-30">
                <Button link="/dashboard" text="portfolios" />
                <Button link="/about" text="About" />
                <div className="flex items-center gap-4">
                    {!storedToken && (
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">Not Logged in</span>
                            <button 
                                className="border border-black text-white bg-black rounded pt-2 pb-2 pl-3 pr-3 hover:text-black hover:bg-white" 
                                onClick={()=>router.push("/register")}
                            >
                                Register
                            </button>
                        </div>
                    )}
                    
                    {storedToken && (
                        <div className="flex items-center gap-4">
                            {user && (
                                <div className="flex flex-col items-end">
                                    <span className="font-medium">{user.username}</span>
                                    <span className="text-gray-500 text-sm">{user.email}</span>
                                </div>
                            )}
                            <button 
                                className="border border-black text-white bg-red-400 rounded pt-2 pb-2 pl-3 pr-3 hover:bg-red-600" 
                                onClick={logout}
                            >
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}