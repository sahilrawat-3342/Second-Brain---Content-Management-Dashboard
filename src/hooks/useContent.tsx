import { useEffect,useState } from "react";
import axios from "axios";
import { API_GET_CONTENT_URL } from "../config";


export function useContent() {
    const [content, setContent] = useState<any[]>([]);

    function refreshContent() {
        axios.get(API_GET_CONTENT_URL,{
            withCredentials: true
        }).then((fetchContent) => {
            setContent(fetchContent.data.content);
        })
    }

    useEffect(() => {
        refreshContent();
        let interval = setInterval(() => {
            refreshContent();
        },3*1000)

        return () => clearInterval(interval);
    },[])

    return content ;
}