import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_GET_SHARED_BRAIN_URL } from "../config";
import { Card } from "../components/ui/Cards";
import { Button } from "../components/ui/button";
import { ShareIcon } from "../icons/share";

export default function SharedBrain() {
  const { hash } = useParams<{ hash: string }>();
  const [contents, setContents] = useState<any[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSharedBrain() {
      try {
        setLoading(true);
        const response = await axios.get(`${API_GET_SHARED_BRAIN_URL}/${hash}`, {
          withCredentials: true,
        });

        if (response.data.Success === false) {
          setError("This shared brain link is invalid or has been disabled.");
          return;
        }

        setContents(response.data.content);
        setUserName(response.data.UserName);
      } catch (err: any) {
        console.error("Failed to fetch shared brain", err);
        setError("An error occurred while loading this shared brain.");
      } finally {
        setLoading(false);
      }
    }

    if (hash) {
      fetchSharedBrain();
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 sm:px-10 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="text-blue-600 bg-blue-100 p-2 rounded-xl">
            <ShareIcon size="lg" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {loading ? "Loading Brain..." : userName ? `${userName}'s Brain` : "Shared Brain"}
          </h1>
        </div>
        <div>
          <Button 
            variant="primary" 
            size="md" 
            text="Create Your Own" 
            onClick={() => navigate("/signup")} 
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-gray-500 text-lg animate-pulse">
            Loading contents...
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="text-red-500 text-xl font-semibold bg-red-50 p-4 rounded-xl border border-red-100">
              {error}
            </div>
            <Button variant="secondary" size="md" text="Go Home" onClick={() => navigate("/")} />
          </div>
        ) : contents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <p className="text-lg">This brain is currently empty.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-[280px] md:columns-[300px] gap-4">
            {contents.map((item: any, index: number) => (
              <div key={index} className="break-inside-avoid mb-4 transform hover:-translate-y-1 transition-all duration-300">
                <Card
                  type={item.type}
                  link={item.Link}
                  title={item.title}
                  description={item.description}
                  contentId={item._id}
                  readonly={true}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
