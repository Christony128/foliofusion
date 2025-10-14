"use client"
import {useRouter} from 'next/navigation'
import { useEffect, useState } from 'react';

function Dashboard() {
    const router=useRouter()
    const [token,setToken]=useState<string | null>(null)

    useEffect(()=>{
        const storedToken=localStorage.getItem("token");
        if(!(storedToken)){
            router.push("./register");
        }
        setToken(storedToken)
    },[])
    
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
export default Dashboard