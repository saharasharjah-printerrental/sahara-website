"use client";

import { useState, useEffect } from "react";

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
  { id: "1", title: "Top 5 Printer Brands for UAE Businesses in 2026", slug: "top-5-printer-brands-2026", excerpt: "Discover the best printer brands trusted by UAE businesses.", content: "Full content here...", category: "Buying Guide", status: "published", coverImage: "", publishedAt: "2026-03-15", createdAt: "2026-03-10" },
  { id: "2", title: "Printer Rental vs Buying: What's Best for Your Office?", slug: "printer-rental-vs-buying", excerpt: "Compare the costs and benefits of renting vs buying printers.", content: "Full content here...", category: "Guide", status: "draft", coverImage: "", publishedAt: "", createdAt: "2026-03-20" },
];

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const stored = localStorage.getItem("sahara_blogs");
    if (stored) {
      setPosts(JSON.parse(stored));
    } else {
      setPosts(samplePosts);
      localStorage.setItem("sahara_blogs", JSON.stringify(samplePosts));
    }
  }, []);

  const savePosts = (newPosts: BlogPost[]) => {
    setPosts(newPosts);
    localStorage.setItem("sahara_blogs", JSON.stringify(newPosts));
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this blog post?")) {
      savePosts(posts.filter(p => p.id !== id));
    }
  };

  const handleStatus = (id: string, status: string) => {
    savePosts(posts.map(p => p.id === id ? { ...p, status, publishedAt: status === "published" ? new Date().toISOString().split("T")[0] : "" } : p));
  };

  const handleSave = (post: BlogPost) => {
    if (editingPost) {
      savePosts(posts.map(p => p.id === post.id ? post : p));
    } else {
      savePosts([...posts, { ...post, id: Date.now().toString(), createdAt: new Date().toISOString().split("T")[0] }]);
    }
    setShowModal(false);
    setEditingPost(null);
  };

  const filteredPosts = posts.filter(p => {
    if (filter === "published") return p.status === "published";
    if (filter === "draft") return p.status === "draft";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#071325]">
      <main className="pt-8 pb-16 px-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
              <p className="text-slate-400 mt-1">Create and manage blog content</p>
            </div>
            <button onClick={() => { setEditingPost(null); setShowModal(true); }} className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-6 py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform flex items-center gap-2">
              <span className="material-symbols-outlined">add</span>
              New Post
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            {["all", "published", "draft"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f ? "bg-[#f5be53] text-[#412d00]" : "bg-[#101c2e] text-slate-400 hover:text-white"}`}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Title</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Category</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Status</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Date</th>
                    <th className="text-left text-sm font-medium text-slate-400 p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="border-b border-white/5">
                      <td className="p-4">
                        <p className="font-medium text-white">{post.title}</p>
                        <p className="text-sm text-slate-400">{post.slug}</p>
                      </td>
                      <td className="p-4 text-slate-300">{post.category}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${post.status === "published" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 text-sm">{post.publishedAt || post.createdAt}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingPost(post); setShowModal(true); }} className="p-2 rounded-lg bg-[#101c2e] text-slate-400 hover:text-white">
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button onClick={() => handleStatus(post.id, post.status === "published" ? "draft" : "published")} className={`p-2 rounded-lg transition-colors ${post.status === "published" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"}`}>
                            <span className="material-symbols-outlined text-sm">{post.status === "published" ? "unpublished" : "publish"}</span>
                          </button>
                          <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg bg-[#101c2e] text-slate-400 hover:text-red-400">
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {showModal && (
        <BlogModal post={editingPost} onSave={handleSave} onClose={() => { setShowModal(false); setEditingPost(null); }} />
      )}
    </div>
  );
}

function BlogModal({ post, onSave, onClose }: { post: BlogPost | null; onSave: (p: BlogPost) => void; onClose: () => void }) {
  const [form, setForm] = useState<BlogPost>(post || {
    id: "", title: "", slug: "", excerpt: "", content: "", category: "Guide", status: "draft", coverImage: "", publishedAt: "", createdAt: ""
  });

  const categories = ["Guide", "Buying Guide", "News", "Tips", "Case Study"];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="glass-card rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{post ? "Edit Post" : "New Post"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><span className="material-symbols-outlined">close</span></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-") })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white">
                <option>draft</option>
                <option>published</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white h-20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Content</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white h-40" />
          </div>
          <div className="flex gap-4 pt-4">
            <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-[#101c2e] text-slate-300 hover:text-white">Cancel</button>
            <button onClick={() => onSave(form)} className="flex-1 bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] py-3 rounded-xl font-bold hover:scale-[1.02]">Save Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}