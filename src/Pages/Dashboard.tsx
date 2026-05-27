import { Button } from "../components/ui/button";
import { PlusIcon } from "../icons/plusicon";
import { ShareIcon } from "../icons/share";
import { Card } from "../components/ui/Cards";
import { CreateContenModel } from "../components/ui/CreateContenModel";
import { ShareBrainModal } from "../components/ui/ShareBrain";
import { useState } from "react";
import { Sidebar } from  "../components/ui/SideBar";
import { useContent } from "../hooks/useContent";
import { useFilter } from "../components/ui/useFilter";

function Dashboard() {
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const contents = useContent();
  const { filterContent } = useFilter();

  const filteredContent = contents?.filter((item: any) => {
    if (filterContent === "all") return true;
    return item.type.toLowerCase() === filterContent;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-x-hidden">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} /> 
      
      <div className={`p-6 sm:p-8 transition-all duration-300 ${sidebarOpen ? "lg:ml-72" : "ml-0"}`}>
        <CreateContenModel open={contentModalOpen} OnClose={() => setContentModalOpen(false)} />
        <ShareBrainModal open={shareModalOpen} onClose={() => setShareModalOpen(false)} />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 text-gray-600 focus:outline-none transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Your Brain</h1>
              <p className="text-gray-500 mt-1 hidden sm:block">Organize and find all your saved content easily.</p>
            </div>
          </div>
          <div className="flex gap-4 self-end sm:self-auto">
            <Button 
              variant="secondary" 
              size="md" 
              text="Share" 
              startIcon={<ShareIcon size="md" />} 
              onClick={() => setShareModalOpen(true)} 
            />

            <Button 
              variant="primary" 
              size="md" 
              text="Add" 
              startIcon={<PlusIcon size="md" />} 
              onClick={() => setContentModalOpen(true)} 
            />
          </div>
        </div>

        <div className="columns-1 sm:columns-[280px] md:columns-[300px] gap-4">
          {filteredContent?.map((item: any, index: number) => (
            <div key={index} className="break-inside-avoid mb-4 transform hover:-translate-y-1 transition-all duration-300">
              <Card
                type={item.type}
                link={item.Link}
                title={item.title}
                description={item.description}
                contentId={item._id}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
