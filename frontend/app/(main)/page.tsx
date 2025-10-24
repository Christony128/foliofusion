"use client";
import { useRouter } from "next/navigation";
import image1 from '../images/image.png';
import image2 from '../images/imagetwo.png';

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col items-center text-center gap-8 py-20 px-8">
        <h1 className="text-7xl font-bold text-gray-900">
          Foliofusion
        </h1>
        
        <p className="text-3xl text-gray-600 max-w-3xl leading-relaxed">
          A free, easy to use tool to create beautiful portfolios
        </p>
         <button
              className="border cursor-pointer border-black text-white rounded bg-black pt-6 pb-6 pl-20 pr-20 hover:text-black hover:bg-white transition-colors duration-500"
              onClick={() => {
                router.push("/register");
              }}
            >
              Get Started
            </button>
      </div>
      <div className="flex  justify-between min-h-screen px-12 py-20">
        <div className="flex-1">
          <img 
            src={image1.src} 
            alt="Portfolio showcase" 
            className="w-full max-w-2xl h-auto rounded-2xl shadow-2xl"
          />
        </div>
        <div className="flex-1 pl-16">
          <h2 className="text-6xl font-bold text-gray-900 mb-8">
            200+ Portfolios Generated
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-between min-h-screen px-12 py-20">
        <div className="flex-1 pr-16">
          <h2 className="text-6xl font-bold text-gray-900 mb-8">
            User-Friendly & Flexible interface to build your portfolio
          </h2>
        </div>
        <div className="flex-1">
          <img 
            src={image2.src} 
            alt="User friendly interface" 
            className="w-full max-w-2xl h-auto rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}