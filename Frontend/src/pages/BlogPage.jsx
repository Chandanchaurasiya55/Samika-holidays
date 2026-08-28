import React, { useState } from 'react';
import { 
  BookOpen, Clock, User, Calendar, Tag, Sparkles, ArrowRight, 
  Search, Compass, MapPin, ChevronRight, MessageCircle 
} from 'lucide-react';

const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
};

export default function BlogPage({ blogsList = [], onSelectBlog, onOpenEnquiry }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Travel Guide',
    'Spiritual Journeys',
    'Hill Stations',
    'Adventure & Treks',
    'Hidden Gems',
    'Food & Culture',
    'Travel Tips'
  ];

  const filteredBlogs = (blogsList || blogs || []).filter(blog => {
    const matchesCategory = activeCategory === 'All' || 
      (blog.category && (
        blog.category.toLowerCase() === activeCategory.toLowerCase() ||
        blog.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
        activeCategory.toLowerCase().includes(blog.category.toLowerCase())
      ));
    const matchesSearch = !searchQuery || 
      (blog.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.subtitle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.content || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-14 pb-16 bg-[#FAF7F2]/40 min-h-screen">
      
      {/* Hero Header */}
      <section className="relative bg-[#0F382C] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="relative max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#C8933E]/20 text-[#C8933E] border border-[#C8933E]/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-4 h-4" />
            <span>Stories, Insights & Guides</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Blogs & Articles
          </h1>

          <p className="text-stone-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Insider guides, hidden Himalayan valleys, spiritual retreats, trekking secrets, and local culture of Uttarakhand.
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto pt-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles, guides, or destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-stone-300 text-xs focus:outline-none focus:bg-white focus:text-stone-900 transition-all shadow-lg"
              />
              <Search className="w-4 h-4 text-stone-300 absolute left-4 top-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="w-full max-w-[92%] 2xl:max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 space-y-8">
        
        {/* Category Capsule Filter Bar */}
        <div className="flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white rounded-full border border-stone-200 shadow-xs max-w-full overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#0F382C] text-white shadow-sm'
                    : 'text-stone-600 hover:text-[#0F382C] hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Cards Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-stone-200 shadow-sm max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-stone-100 text-[#0F382C] flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">No Articles Found</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              {searchQuery 
                ? `No articles matched your search "${searchQuery}". Try a different keyword.`
                : 'No blog posts have been published yet in this category. New stories coming soon!'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="bg-[#0F382C] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-sm"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredBlogs.map((blog) => {
              const targetId = blog.id || blog._id;
              return (
                <article
                  key={targetId}
                  onClick={() => onSelectBlog && onSelectBlog(blog)}
                  className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    {/* Cover Photo */}
                    <div className="relative h-56 w-full overflow-hidden bg-stone-900">
                      <img
                        src={blog.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'}
                        alt={blog.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                      {/* Top Badges */}
                      <span className="absolute top-4 left-4 bg-[#0F382C]/90 backdrop-blur-md text-emerald-200 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase border border-emerald-500/30 shadow-md">
                        {blog.category || 'Travel Guide'}
                      </span>

                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-white/20 flex items-center gap-1.5 shadow-md">
                        <Clock className="w-3 h-3 text-[#C8933E]" />
                        <span>{blog.readTime || '5 min read'}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-[11px] text-stone-400 font-bold uppercase tracking-wider">
                        <span>{blog.author || 'Atithya Travel Desk'}</span>
                        <span>•</span>
                        <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-stone-900 leading-snug group-hover:text-[#0F382C] transition-colors line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="text-xs text-stone-500 leading-relaxed line-clamp-3">
                        {stripHtml(blog.subtitle || blog.content)}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-4 border-t border-stone-100 flex items-center justify-between text-xs bg-stone-50/50">
                    <span className="text-[#C8933E] font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Read Full Story</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>

                    {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                      <span className="text-[10px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                        #{blog.tags[0]}
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </section>

    </div>
  );
}
