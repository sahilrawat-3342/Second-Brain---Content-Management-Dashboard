import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/cross";
import { Button } from "./button";
import { Input } from "./Input";
import axios from "axios";
import { API_CREATE_CONTENT_URL } from "../../config";

export function CreateContenModel({ open, OnClose }: { open: boolean; OnClose: () => void }) {
  const titleref = useRef<HTMLInputElement>(null);
  const linkref = useRef<HTMLInputElement>(null);
  const textarearef = useRef<HTMLTextAreaElement>(null);
  const [type, setType] = useState("note");
  const [loading, setLoading] = useState(false);

  async function addContent() {
    const title = titleref.current?.value;
    const Link = linkref.current?.value || "";
    const description = textarearef.current?.value || "";

    if (!title) {
        alert("Please fill in the title.");
        return;
    }
    if (type !== "note" && !Link) {
        alert("Please provide a link.");
        return;
    }
    if (type === "note" && !description) {
        alert("Please write a note.");
        return;
    }

    try {
      setLoading(true);
      await axios.post(
        API_CREATE_CONTENT_URL,
        {
          title,
          type,
          Link,
          description,
        },
        {
          withCredentials: true,
        }
      );
      OnClose();
    } catch (err: any) {
      console.error("Failed to add content", err);
      alert(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div>
      <div className="w-screen h-screen bg-slate-900/60 backdrop-blur-sm fixed top-0 left-0 z-40 transition-opacity duration-300"></div>
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 transform transition-all scale-100 opacity-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Add Content</h2>
            <div onClick={OnClose} className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors">
              <CrossIcon />
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <Input placeholder={"Title"} reference={titleref} />
            {type === "note" ? (
              <textarea 
                ref={textarearef}
                placeholder="Write your note here..."
                className="w-full px-4 py-2 text-sm border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-y"
              />
            ) : (
              <Input placeholder={"Link"} reference={linkref} />
            )}
          </div>

          <p className="text-sm font-medium text-gray-700 mb-2">Content Type</p>
          <div className="flex gap-2 justify-center mb-6 flex-wrap">
            <Button
              variant={type === "note" ? "primary" : "secondary"}
              text="Note"
              size="sm"
              onClick={() => setType("note")}
            />
            <Button
              variant={type === "youtube" ? "primary" : "secondary"}
              text="Youtube"
              size="sm"
              onClick={() => setType("youtube")}
            />
            <Button
              variant={type === "twitter" ? "primary" : "secondary"}
              text="Twitter"
              size="sm"
              onClick={() => setType("twitter")}
            />
            <Button
              variant={type === "instagram" ? "primary" : "secondary"}
              text="Instagram"
              size="sm"
              onClick={() => setType("instagram")}
            />
          </div>

          <div className="flex justify-center mt-3">
            <Button
              variant="primary"
              text={loading ? "Adding..." : "Submit"}
              size="md"
              onClick={addContent}
              fullWidth={true}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
