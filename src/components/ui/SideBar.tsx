import { SidebarItem } from "./SidebarItem";
import { XIcon } from "../../icons/x";
import { YoutubeIcon } from "../../icons/youtube";
import { Logo } from "../../icons/Logo";
import { useFilter } from "./useFilter";

interface SidebarProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen = true, setIsOpen }: SidebarProps) {
  const { setFilterContent } = useFilter();

  const handleClose = () => {
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && setIsOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={handleClose}
        />
      )}
      
      <div 
        className={`h-screen bg-white border-r w-72 fixed top-0 left-0 z-30 transition-transform duration-300 transform shadow-lg lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center pt-4 pl-4 pr-4">
          <h1 className="flex text-2xl items-center font-bold text-gray-800">
            <div className="pr-2 text-purple-600">
              <Logo />
            </div>
            Brainly
          </h1>
          {/* Close button on mobile */}
          <button 
            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors" 
            onClick={handleClose}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="pt-8 pl-4 space-y-2">
          <SidebarItem
            text="All"
            Icon={<YoutubeIcon />}
            onClick={() => { setFilterContent("all"); handleClose(); }}
          />
          <SidebarItem
            text="Youtube"
            Icon={<YoutubeIcon />}
            onClick={() => { setFilterContent("youtube"); handleClose(); }}
          />
          <SidebarItem
            text="Twitter"
            Icon={<XIcon />}
            onClick={() => { setFilterContent("twitter"); handleClose(); }}
          />
          <SidebarItem
            text="Instagram"
            Icon={<YoutubeIcon />} 
            onClick={() => { setFilterContent("instagram"); handleClose(); }}
          />
          <SidebarItem
            text="Notes"
            Icon={<YoutubeIcon />} // Fallback icon
            onClick={() => { setFilterContent("note"); handleClose(); }}
          />
        </div>
      </div>
    </>
  );
}
