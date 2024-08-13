import PredictionComponent from "./components/PredictionComponent";
import RevenueChart from "./components/RevenueChart";
import { getLocalData, Post } from "@/lib/getData";
import Navbar from "./components/Navbar";

export default async function Dashboard() {
  const posts: Post[] = await getLocalData();

  return (
    <div className="p-6">
      <Navbar />
      <div className="bg-gradient-to-r from-blue-200 to-blue-800 p-2 m-4 rounded-lg shadow-lg max-w-md mx-auto  ">
        <h1 className="text-5xl font-extrabold text-white text-center">
          Dashboard
        </h1>
      </div>

      <div className="flex justify-center m-6 space-x-6">
        <div className="flex-1">
          <RevenueChart data={posts} />
        </div>
        <div className="flex-none">
          
        </div>
      </div>
    </div>
  );
}
