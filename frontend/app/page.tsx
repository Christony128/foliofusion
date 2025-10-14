"use client"
import {useRouter} from 'next/navigation'
export default function Home() {
  const router=useRouter();
    return (
      <div className="flex flex-col gap-12 ml-50">
        <div className="text-5xl text-black"><strong>Foliofusion</strong></div>
        <div className="flex flex-col gap-4"><div className="text-3xl text-gray-500">A free, easy to use tool to create portfolios</div>
        <div><button className="border border-black text-white rounded bg-black pt-4 pb-4 pl-6 pr-6 hover:text-black hover:bg-white transition-colors duration-500" onClick={()=>{router.push("/register")}}>Get Started</button></div></div>
      </div>
  );
}
