"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  status: string;
  coverImage: string;
  publishedAt: string;
  createdAt: string;
}

const samplePosts: BlogPost[] = [
  { id: "1", title: "How to Choose the Best Printer Rental Dubai Service?", slug: "how-to-choose-the-best-printer-rental-dubai-service", excerpt: "Start your search for printer rental Dubai with a quick audit you can finish this afternoon", content: "Full content here...", category: "Guide", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1771224373/blogs/ai73xmapai8rb1z1u7qg.webp", publishedAt: "2/16/2026", createdAt: "2026-02-16" },
  { id: "2", title: "The Problem We Solve", slug: "the-problem-we-solve", excerpt: "In any office, the sudden breakdown of a document printer or copier creates a cascade of problems.", content: "Full content here...", category: "Insights", status: "published", coverImage: "https://res.cloudinary.com/dhmsnelcl/image/upload/v1758721285/blogs/iblcpt0jm18wwey7nm41.jpg", publishedAt: "9/24/2025", createdAt: "2025-09-24" },
];

export default function BlogEditorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  
  const [form, setForm] = useState<BlogPost>({
    id: "", title: "", slug: "", excerpt: "", content: "", category: "Guide", status: "draft", coverImage: "", publishedAt: "", createdAt: ""
  });
  const [uploading, setUploading] = useState(false);
  const [converting, setConverting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [convertToWebp, setConvertToWebp] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editorReady, setEditorReady] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);

  const categories = ["Guide", "Buying Guide", "News", "Tips", "Case Study"];

  useEffect(() => {
    const stored = localStorage.getItem("sahara_blogs");
    if (stored) {
      const allPosts = JSON.parse(stored);
      setPosts(allPosts);
      if (postId) {
        const post = allPosts.find((p: BlogPost) => p.id === postId);
        if (post) {
          setForm(post);
        }
      }
    }
  }, [postId]);

  const initQuill = useCallback(() => {
    if (typeof window === "undefined" || !editorRef.current) return;

    const checkAndInit = () => {
      if ((window as any).Quill && !quillRef.current) {
        try {
          const quill = new (window as any).Quill(editorRef.current, {
            theme: 'snow',
            placeholder: 'Write your blog content here...',
            modules: {
              toolbar: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }, { 'size': [] }],
                [{ 'align': [] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image', 'video'],
                ['clean'],
              ],
            },
          });

          quill.on('text-change', () => {
            const content = quill.root.innerHTML;
            setForm(prev => ({ ...prev, content }));
          });

          quillRef.current = quill;
          setEditorReady(true);

          if (form.content) {
            quill.root.innerHTML = form.content;
          }
        } catch (e) {
          console.error("Quill init error:", e);
        }
      }
    };

    if (!(window as any).Quill) {
      const scripts = [
        { src: "//cdn.quilljs.com/1.3.6/quill.min.js", id: "quill-js" },
        { src: "//cdn.quilljs.com/1.3.6/quill.snow.css", id: "quill-css", type: "link" },
      ];

      let loadedCount = 0;
      scripts.forEach((s) => {
        if (s.type === "link") {
          if (!document.getElementById(s.id)) {
            const link = document.createElement("link");
            link.id = s.id;
            link.rel = "stylesheet";
            link.href = s.src;
            link.onload = () => {
              loadedCount++;
              if (loadedCount >= scripts.length) checkAndInit();
            };
            document.head.appendChild(link);
          } else {
            loadedCount++;
            if (loadedCount >= scripts.length) checkAndInit();
          }
        } else {
          if (!document.getElementById(s.id)) {
            const script = document.createElement("script");
            script.id = s.id;
            script.src = s.src;
            script.onload = () => {
              loadedCount++;
              if (loadedCount >= scripts.length) checkAndInit();
            };
            document.body.appendChild(script);
          } else {
            loadedCount++;
            if (loadedCount >= scripts.length) checkAndInit();
          }
        }
      });
    } else {
      setTimeout(checkAndInit, 100);
    }
  }, [form.content]);

  useEffect(() => {
    initQuill();

    return () => {
      quillRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (editorReady && quillRef.current && form.content) {
      const currentContent = quillRef.current.root.innerHTML;
      if (currentContent !== form.content && form.content !== "<p><br></p>") {
        quillRef.current.root.innerHTML = form.content;
      }
    }
  }, [form.content, editorReady]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      if (convertToWebp) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/convert-image", { method: "POST", body: formData });
        const data = await res.json();
        if (data.url) {
          setForm(prev => ({ ...prev, coverImage: data.url }));
        } else {
          const reader = new FileReader();
          reader.onloadend = () => setForm(prev => ({ ...prev, coverImage: reader.result as string }));
          reader.readAsDataURL(file);
        }
      } else {
        const reader = new FileReader();
        reader.onloadend = () => setForm(prev => ({ ...prev, coverImage: reader.result as string }));
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      const reader = new FileReader();
      reader.onloadend = () => setForm(prev => ({ ...prev, coverImage: reader.result as string }));
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleUrlFetch = async () => {
    if (!imageUrl) return;
    setConverting(true);
    try {
      const res = await fetch("/api/convert-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: imageUrl })
      });
      const data = await res.json();
      
      if (data.url && data.format !== 'original') {
        setForm(prev => ({ ...prev, coverImage: data.url }));
      } else if (data.url && data.note) {
        setForm(prev => ({ ...prev, coverImage: data.url }));
      } else {
        setForm(prev => ({ ...prev, coverImage: imageUrl }));
      }
      setImageUrl("");
    } catch (error) {
      console.error("Fetch failed:", error);
      setForm(prev => ({ ...prev, coverImage: imageUrl }));
      setImageUrl("");
    } finally {
      setConverting(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    setForm({ ...form, title, slug });
  };

  const handleSave = () => {
    let contentToSave = form.content;
    
    if (quillRef.current) {
      contentToSave = quillRef.current.root.innerHTML;
    }

    // Clean up empty Quill paragraphs
    contentToSave = contentToSave.replace(/<p><br><\/p>/g, "");
    contentToSave = contentToSave.replace(/<p>\s*<\/p>/g, "");

    const finalForm = { ...form, content: contentToSave };
    let newPosts: BlogPost[];
    
    if (finalForm.id && posts.some(p => p.id === finalForm.id)) {
      newPosts = posts.map(p => p.id === finalForm.id ? { 
        ...finalForm, 
        publishedAt: finalForm.status === "published" ? new Date().toISOString().split("T")[0] : p.publishedAt 
      } : p);
    } else {
      newPosts = [...posts, { 
        ...finalForm, 
        id: Date.now().toString(), 
        createdAt: new Date().toISOString().split("T")[0], 
        publishedAt: finalForm.status === "published" ? new Date().toISOString().split("T")[0] : "" 
      }];
    }
    
    setPosts(newPosts);
    localStorage.setItem("sahara_blogs", JSON.stringify(newPosts));
    router.push("/admin/blog");
  };

  const handleCancel = () => {
    router.push("/admin/blog");
  };

  return (
    <div className="min-h-screen bg-[#071325]">
      <main className="pt-8 pb-16 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">{postId ? "Edit Post" : "New Post"}</h1>
              <p className="text-slate-400 mt-1">Create or edit a blog post</p>
            </div>
            <div className="flex gap-4">
              <button onClick={handleCancel} className="px-6 py-3 rounded-xl bg-[#101c2e] text-slate-300 hover:text-white font-medium">
                Cancel
              </button>
              <button onClick={handleSave} className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform">
                Save Post
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                  <input 
                    type="text" 
                    value={form.title} 
                    onChange={handleTitleChange}
                    className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                    placeholder="Enter post title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Slug</label>
                  <input 
                    type="text" 
                    value={form.slug} 
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                    placeholder="post-url-slug"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                  <select 
                    value={form.category} 
                    onChange={(e) => setForm({ ...form, category: e.target.value })} 
                    className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
                  >
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                  <select 
                    value={form.status} 
                    onChange={(e) => setForm({ ...form, status: e.target.value })} 
                    className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white"
                  >
                    <option>draft</option>
                    <option>published</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">Cover Image</label>
              <div className="flex items-center gap-3 mb-3">
                <label className="flex-1 cursor-pointer">
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  <div className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-center text-slate-400 hover:text-[#f5be53] hover:border-[#f5be53]/30 transition-colors">
                    {uploading ? "Uploading..." : form.coverImage ? "Change Image" : "Upload Image"}
                  </div>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={convertToWebp} onChange={(e) => setConvertToWebp(e.target.checked)} className="w-4 h-4 rounded" />
                  <span className="text-sm text-slate-400">Convert to WebP</span>
                </label>
              </div>
              <div className="flex gap-2 mb-3">
                <input 
                  type="text" 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)} 
                  className="flex-1 bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" 
                  placeholder="https://example.com/image.jpg" 
                />
                <button 
                  onClick={handleUrlFetch} 
                  disabled={converting || !imageUrl}
                  className="px-4 py-2 rounded-xl bg-[#f5be53] text-[#412d00] font-medium hover:bg-[#c8962e] disabled:opacity-50"
                >
                  {converting ? "..." : "Fetch"}
                </button>
              </div>
              <p className="text-xs text-slate-500 mb-3">Fetches image and automatically converts to WebP</p>
              {form.coverImage && (
                <div className="flex items-center gap-3">
                  <div className="w-48 h-28 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                    <img src={form.coverImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <button onClick={() => setForm(prev => ({ ...prev, coverImage: "" }))} className="text-slate-400 hover:text-red-400 text-sm">
                    Remove
                  </button>
                </div>
              )}
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Excerpt</label>
                <textarea 
                  value={form.excerpt} 
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })} 
                  className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white h-24" 
                  placeholder="Brief summary of the post"
                />
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">Content</label>
              <div className="bg-white rounded-xl min-h-[500px]">
                <div ref={editorRef} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .ql-container {
          min-height: 450px;
          font-size: 16px;
        }
        .ql-toolbar {
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: 1px solid #e5e5e5;
          border-radius: 4px 4px 0 0;
        }
        .ql-container {
          border: none;
        }
        .ql-editor {
          min-height: 400px;
        }
        .ql-editor.ql-blank::before {
          color: #999;
          font-style: normal;
        }
        .ql-snow .ql-stroke {
          stroke: #666;
        }
        .ql-snow .ql-fill {
          fill: #666;
        }
        .ql-snow .ql-picker {
          color: #666;
        }
        .ql-snow .ql-picker-options {
          background: white;
          border: 1px solid #ddd;
        }
        .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
          border-color: #ddd;
        }
        .ql-snow .ql-picker.ql-expanded .ql-picker-label {
          border-color: #ddd;
        }
      `}</style>
    </div>
  );
}