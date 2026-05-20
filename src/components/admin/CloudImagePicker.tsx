"use client";

import { useState, useRef, useCallback } from "react";
import { CloudUpload, CloudQueue, CheckCircle, Refresh } from "@mui/icons-material";

interface CloudImage {
  url: string;
  key: string;
  source: "r2" | "cloudinary";
  uploadedAt?: string;
}

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function CloudImagePicker({ value, onChange, label = "Image" }: Props) {
  const [tab, setTab] = useState<"upload" | "cloud">("upload");
  const [cloudImages, setCloudImages] = useState<CloudImage[]>([]);
  const [cloudLoading, setCloudLoading] = useState(false);
  const [cloudError, setCloudError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadCloudImages = useCallback(async (cursor?: string) => {
    setCloudLoading(true);
    setCloudError(null);
    try {
      const url = cursor
        ? `/api/admin/storage/list?cursor=${encodeURIComponent(cursor)}`
        : "/api/admin/storage/list";
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json() as { images: CloudImage[]; nextCursor: string | null };
      setCloudImages(prev => cursor ? [...prev, ...data.images] : data.images);
      setNextCursor(data.nextCursor);
    } catch (e) {
      setCloudError(String(e));
    } finally {
      setCloudLoading(false);
    }
  }, []);

  const handleTabSwitch = (t: "upload" | "cloud") => {
    setTab(t);
    if (t === "cloud" && cloudImages.length === 0) loadCloudImages();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setUploading(true);
    setUploadError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/convert-image/", { method: "POST", body: fd });
      if (!res.ok) throw new Error(`Upload failed: HTTP ${res.status}`);
      const data = await res.json() as { url?: string; error?: string };
      if (!data.url) throw new Error(data.error || "No URL returned");
      onChange(data.url);
    } catch (err) {
      setUploadError(String(err));
    } finally {
      setUploading(false);
    }
  };

  const handleSelect = (url: string) => {
    setSelectedUrl(url);
    onChange(url);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-300">{label}</label>

      {/* Tab switcher */}
      <div className="flex rounded-xl overflow-hidden border border-white/10">
        <button
          type="button"
          onClick={() => handleTabSwitch("upload")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
            tab === "upload"
              ? "bg-[#f5be53]/20 text-[#f5be53] border-b-2 border-[#f5be53]"
              : "bg-[#101c2e] text-slate-400 hover:text-white"
          }`}
        >
          <CloudUpload fontSize="small" />
          Upload New
        </button>
        <button
          type="button"
          onClick={() => handleTabSwitch("cloud")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
            tab === "cloud"
              ? "bg-[#f5be53]/20 text-[#f5be53] border-b-2 border-[#f5be53]"
              : "bg-[#101c2e] text-slate-400 hover:text-white"
          }`}
        >
          <CloudQueue fontSize="small" />
          Pick from Cloud
        </button>
      </div>

      {/* Upload tab */}
      {tab === "upload" && (
        <label className={`block ${uploading ? "cursor-wait" : "cursor-pointer"}`}>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={uploading} />
          <div className={`w-full bg-[#101c2e] border rounded-xl py-3 px-4 text-center transition-colors ${
            uploading
              ? "border-[#f5be53]/30 text-[#f5be53]"
              : "border-white/10 text-slate-400 hover:text-[#f5be53] hover:border-[#f5be53]/30"
          }`}>
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-[#f5be53] border-t-transparent rounded-full animate-spin" />
                Uploading…
              </span>
            ) : value ? "Change Image" : "Choose a file to upload"}
          </div>
          {uploadError && <p className="text-red-400 text-xs mt-1">{uploadError}</p>}
        </label>
      )}

      {/* Cloud pick tab */}
      {tab === "cloud" && (
        <div className="bg-[#101c2e] border border-white/10 rounded-xl p-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400">{cloudImages.length} images in cloud storage</span>
            <button
              type="button"
              onClick={() => loadCloudImages()}
              disabled={cloudLoading}
              className="text-slate-400 hover:text-[#f5be53] transition-colors"
              title="Refresh"
            >
              <Refresh fontSize="small" className={cloudLoading ? "animate-spin" : ""} />
            </button>
          </div>

          {cloudError && (
            <p className="text-red-400 text-xs mb-2">{cloudError}</p>
          )}

          {cloudLoading && cloudImages.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-[#f5be53] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : cloudImages.length === 0 ? (
            <p className="text-center text-slate-500 text-sm py-8">No images found in cloud storage</p>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-2 max-h-56 overflow-y-auto">
                {cloudImages.map((img) => (
                  <button
                    key={img.key}
                    type="button"
                    onClick={() => handleSelect(img.url)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                      (selectedUrl === img.url || value === img.url)
                        ? "border-[#f5be53]"
                        : "border-white/10 hover:border-white/30"
                    }`}
                    title={img.key}
                  >
                    <img
                      src={img.url}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {(selectedUrl === img.url || value === img.url) && (
                      <div className="absolute inset-0 bg-[#f5be53]/20 flex items-center justify-center">
                        <CheckCircle className="text-[#f5be53]" fontSize="small" />
                      </div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 bg-black/50 text-[9px] text-center py-0.5 text-white/70">
                      {img.source}
                    </div>
                  </button>
                ))}
              </div>
              {nextCursor && (
                <button
                  type="button"
                  onClick={() => loadCloudImages(nextCursor)}
                  disabled={cloudLoading}
                  className="mt-2 w-full text-xs text-slate-400 hover:text-[#f5be53] py-1 transition-colors"
                >
                  {cloudLoading ? "Loading…" : "Load more"}
                </button>
              )}
            </>
          )}
        </div>
      )}

      {/* Current image preview */}
      {value && (
        <div className="flex items-center gap-3 mt-1">
          <div className="w-20 h-12 bg-white/5 rounded flex items-center justify-center p-1 overflow-hidden">
            <img src={value} alt="preview" className="max-h-full max-w-full object-contain" />
          </div>
          <button
            type="button"
            onClick={() => { onChange(""); setSelectedUrl(null); }}
            className="text-slate-400 hover:text-red-400 text-sm"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
