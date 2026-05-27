import { ShareIcon } from "../../icons/share";
import { useEffect, useRef } from "react";
import { DustbinIcon } from "../../icons/Dustbin";
import { DeleteContent } from "../../components/ui/DeleteContent";

interface CardProps {
    type : "twitter" | "youtube" | "instagram" | "note";
    link? : string;
    title : string;
    contentId : string;
    description?: string;
    readonly?: boolean;
}

export function Card({link = "", title, type, contentId, description, readonly = false} : CardProps) {
    const embedRef = useRef<HTMLDivElement>(null);
    const normalizedLink = link.replace("https://x.com/", "https://twitter.com/");

    useEffect(() => {
        if (
            type === "twitter" &&
            (window as any).twttr &&
            (window as any).twttr.widgets &&
            typeof (window as any).twttr.widgets.load === "function"
        ) {
            const timeout = setTimeout(() => {
                (window as any).twttr.widgets.load(embedRef.current);
            }, 100);

            return () => clearTimeout(timeout);
        }
    }, [type, normalizedLink]);

    const isShort = link.includes('/shorts/');

    const getYouTubeEmbedLink = (url: string): string => {
        const match = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&/?]+)/);
        const id = match?.[1];
        return id ? `https://www.youtube.com/embed/${id}` : url;
    };

    const getInstagramEmbedLink = (url: string): string => {
        if (url.includes('/embed')) return url;
        // ensure url ends with / if it doesn't already have query params, then add embed
        const cleanUrl = url.split('?')[0].replace(/\/$/, '');
        return `${cleanUrl}/embed`;
    };

    return (
        <div className="p-3 bg-white/90 backdrop-blur-md rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col w-full group m-0.5 mb-1 px-2">
            <div className="flex justify-between items-start m-1 mb-1 px-2">
                <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg overflow-hidden">
                    <span className="truncate">{title}</span>
                </div>
                <div className="flex items-center gap-3">
                    {link && (
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                            <ShareIcon size="md"/>
                        </a>
                    )}
                    {!readonly && (
                        <div 
                            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer" 
                            onClick={() => DeleteContent(contentId)}
                            title="Delete"
                        >
                            <DustbinIcon />
                        </div>
                    )}
                </div>
            </div>
            
            <div className="w-full rounded-2xl overflow-hidden bg-slate-50/50 flex items-center justify-center">
                {type === "twitter" && (
                    <div ref={embedRef} className="w-full flex justify-center">
                        <blockquote className="twitter-tweet">
                            <a href={normalizedLink} target="_blank" rel="noopener noreferrer"></a>
                        </blockquote>
                    </div>
                )}

                {type === "youtube" && (
                    <iframe 
                        className={`w-full ${isShort ? 'aspect-[9/16] min-h-[400px]' : 'aspect-video'}`} 
                        src={getYouTubeEmbedLink(link)} 
                        title={title} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen
                    ></iframe>
                )}

                {type === "instagram" && (
                    <iframe 
                        className="w-full min-h-[400px]" 
                        src={getInstagramEmbedLink(link)} 
                        title={title} 
                        frameBorder="0" 
                        scrolling="no"
                        allowTransparency={true}
                    ></iframe>
                )} 

                {type === "note" && description && (
                    <div className="w-full p-5 text-gray-700 whitespace-pre-wrap text-sm leading-relaxed text-left">
                        {description}
                    </div>
                )}
            </div>
        </div>
    );
}
