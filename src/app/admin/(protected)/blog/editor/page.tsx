"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { BLOG_CONTENT } from "@/lib/blogContent";

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

export default function BlogEditorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const [form, setForm] = useState<BlogPost>({
    id: "", title: "", slug: "", excerpt: "", content: "", category: "Guide",
    status: "draft", coverImage: "", publishedAt: "", createdAt: ""
  });
  const [uploading, setUploading] = useState(false);
  const [converting, setConverting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [convertToWebp, setConvertToWebp] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loaded, setLoaded] = useState(false);

  const categories = ["Guide", "Buying Guide", "News", "Tips", "Case Study", "Troubleshooting", "Finance", "Trends", "Insights"];

  useEffect(() => {
    const stored = localStorage.getItem("sahara_blogs");
    if (stored) {
      const allPosts: BlogPost[] = JSON.parse(stored);
      // Migrate stale placeholder content to real content
      const migrated = allPosts.map(p => {
        const isPlaceholder = !p.content || p.content.trim() === "" || p.content === "Full content here...";
        if (isPlaceholder && BLOG_CONTENT[p.slug]) return { ...p, content: BLOG_CONTENT[p.slug] };
        return p;
      });
      setPosts(migrated);
      if (postId) {
        const post = migrated.find(p => p.id === postId);
        if (post) setForm(post);
      }
    }
    setLoaded(true);
  }, [postId]);

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
          return;
        }
      }
      const reader = new FileReader();
      reader.onloadend = () => setForm(prev => ({ ...prev, coverImage: reader.result as string }));
      reader.readAsDataURL(file);
    } catch {
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
      setForm(prev => ({ ...prev, coverImage: data.url || imageUrl }));
      setImageUrl("");
    } catch {
      setForm(prev => ({ ...prev, coverImage: imageUrl }));
      setImageUrl("");
    } finally {
      setConverting(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    setForm(prev => ({ ...prev, title, slug }));
  };

  const handleSave = () => {
    let newPosts: BlogPost[];
    if (form.id && posts.some(p => p.id === form.id)) {
      newPosts = posts.map(p => p.id === form.id
        ? { ...form, publishedAt: form.status === "published" ? new Date().toISOString().split("T")[0] : p.publishedAt }
        : p
      );
    } else {
      newPosts = [...posts, {
        ...form,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
        publishedAt: form.status === "published" ? new Date().toISOString().split("T")[0] : ""
      }];
    }
    localStorage.setItem("sahara_blogs", JSON.stringify(newPosts));
    router.push("/admin/blog");
  };

  const input = "w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#f5be53]/40";

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
              <button onClick={() => router.push("/admin/blog")} className="px-6 py-3 rounded-xl bg-[#101c2e] text-slate-300 hover:text-white font-medium transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform">
                Save Post
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Basic fields */}
            <div className="glass-card rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                  <input type="text" value={form.title} onChange={handleTitleChange} className={input} placeholder="Enter post title" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Slug</label>
                  <input type="text" value={form.slug} onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))} className={input} placeholder="post-url-slug" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                  <select value={form.category} onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))} className={input}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                  <select value={form.status} onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value }))} className={input}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Cover image */}
            <div className="glass-card rounded-2xl p-6">
              <label className="block text-sm font-medium text-slate-300 mb-3">Cover Image</label>
              <div className="flex items-center gap-3 mb-3">
                <label className="flex-1 cursor-pointer">
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  <div className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-center text-slate-400 hover:text-[#f5be53] hover:border-[#f5be53]/30 transition-colors">
                    {uploading ? "Uploading..." : form.coverImage ? "Change Image" : "Upload Image"}
                  </div>
                </label>
                <label className="flex items-center gap-2 cursor-pointer shrink-0">
                  <input type="checkbox" checked={convertToWebp} onChange={(e) => setConvertToWebp(e.target.checked)} className="w-4 h-4 rounded" />
                  <span className="text-sm text-slate-400">Convert to WebP</span>
                </label>
              </div>
              <div className="flex gap-2 mb-3">
                <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className={`${input} flex-1`} placeholder="https://example.com/image.jpg" />
                <button onClick={handleUrlFetch} disabled={converting || !imageUrl} className="px-4 py-2 rounded-xl bg-[#f5be53] text-[#412d00] font-medium hover:bg-[#c8962e] disabled:opacity-50 shrink-0">
                  {converting ? "..." : "Fetch"}
                </button>
              </div>
              <p className="text-xs text-slate-500 mb-3">Paste an image URL to auto-fetch and convert to WebP</p>
              {form.coverImage && (
                <div className="flex items-center gap-3">
                  <div className="w-48 h-28 rounded-xl bg-white/10 overflow-hidden">
                    <img src={form.coverImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <button onClick={() => setForm(prev => ({ ...prev, coverImage: "" }))} className="text-slate-400 hover:text-red-400 text-sm transition-colors">Remove</button>
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div className="glass-card rounded-2xl p-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
                className={`${input} h-24 resize-none`}
                placeholder="Brief summary shown in blog listing (1–2 sentences)"
              />
            </div>

            {/* Rich text content editor */}
            <div className="glass-card rounded-2xl p-6">
              <label className="block text-sm font-medium text-slate-300 mb-1">Content</label>
              <p className="text-xs text-slate-500 mb-3">
                Use the toolbar to format text. Select text then click <strong className="text-slate-400">🔗 Link</strong> to add internal links (e.g. <code className="text-slate-400">/services/Printer-rental</code>).
              </p>
              {loaded && (
                <RichTextEditor
                  key={postId || "new"}
                  value={form.content}
                  onChange={(html) => setForm(prev => ({ ...prev, content: html }))}
                  placeholder="Write your blog content here..."
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

