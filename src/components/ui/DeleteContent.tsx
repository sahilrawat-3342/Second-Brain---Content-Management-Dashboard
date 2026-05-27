import axios from "axios";
import { API_DELETE_CONTENT_URL } from "../../config";


export async function DeleteContent(contentId : string) {

    await axios.delete(API_DELETE_CONTENT_URL,{
        data : {
            contentId
        },
    })
}