// components/Navbar.tsx
'use client';
import Image from "next/image";
import avatar from "../../public/hacker.png";
import logo from "../../public/logo.png";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image src={logo} alt="Logo" width={120} height={120} />
          <div className="flex-1 flex justify-center">
            <h1 className="text-white text-2xl font-bold"> </h1>
          </div>
        </div>
        <button
            onClick={() => handleNavigate('/predict')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            predict
          </button>
          <button
            onClick={() => handleNavigate('/aptos')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Go to Aptos
          </button>
          <button
            onClick={() => handleNavigate('/aptos/listenergy')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            List Energy
          </button>
        <div className="flex items-center space-x-4">
          <span className="text-white">User</span>
          <Image
            src={avatar}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          
        </div>
      </div>
    </nav>
  );
}
