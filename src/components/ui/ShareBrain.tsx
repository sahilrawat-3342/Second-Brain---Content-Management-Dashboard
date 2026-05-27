import { useState, useEffect } from "react";
import { CrossIcon } from "../../icons/cross";
import { Button } from "./button";
import axios from "axios";
import { API_SHARE_LINK_URL } from "../../config";

export function ShareBrainModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [shareLink, setShareLink] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      generateShareLink(true);
    } else {
      setShareLink("");
    }
  }, [open]);

  async function generateShareLink(share: boolean) {
    try {
      setLoading(true);
      const res = await axios.post(
        API_SHARE_LINK_URL,
        { share },
        { withCredentials: true }
      );
      if (share && (res.data.hash || res.data.Hash)) {
        const linkHash = res.data.hash || res.data.Hash;
        setShareLink(`${window.location.origin}/share/${linkHash}`);
      } else if (!share) {
        setShareLink("");
      }
    } catch (err: any) {
      console.error("Failed to update share link", err);
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
            <h2 className="text-xl font-bold text-gray-800">Share Your Brain</h2>
            <div onClick={onClose} className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors">
              <CrossIcon />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-gray-500 text-sm">
              Share your collection of links with others. Anyone with the link can view your brain.
            </p>

            {loading ? (
              <div className="text-gray-500 py-4">Generating link...</div>
            ) : shareLink ? (
              <div className="w-full flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="bg-transparent outline-none flex-1 text-gray-600 px-2 text-sm"
                />
                <Button
                  variant="primary"
                  text="Copy"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(shareLink);
                    alert("Copied to clipboard!");
                  }}
                />
              </div>
            ) : (
              <div className="text-gray-500 py-4">Sharing is currently disabled.</div>
            )}

            <div className="flex gap-4 mt-4 w-full">
              {shareLink ? (
                <Button
                  variant="secondary"
                  text="Disable Sharing"
                  size="md"
                  fullWidth={true}
                  onClick={() => generateShareLink(false)}
                />
              ) : (
                <Button
                  variant="primary"
                  text="Enable Sharing"
                  size="md"
                  fullWidth={true}
                  onClick={() => generateShareLink(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
