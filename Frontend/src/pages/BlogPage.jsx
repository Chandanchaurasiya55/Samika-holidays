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
    'Adventure & Safaris',
    'Hidden Gems',
    'Food & Culture',
    'Travel Tips'
  ];

  const filteredBlogs = (blogsList || []).filter(blog => {
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
    <div className="space-y-16 pb-20 bg-[#F8FAFC] text-slate-900 min-h-screen">
      
      {/* Hero Header */}
      <section className="relative bg-[#0F172A] text-white pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[440px] flex flex-col justify-center">
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-black/40" />

        <div className="relative max-w-4xl mx-auto text-center space-y-4 z-10">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 text-[#FF6B35] border border-rose-500/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>Himalayan Stories & Travel Insights</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Samika Travel Journal <br />
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF385C] to-[#E11D48] bg-clip-text text-transparent italic">
              Insider Himalayan Guides
            </span>
          </h1>

          <p className="text-slate-200 text-xs sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Insider guides, hidden valleys, spiritual darshan tips, trekking secrets, and the vibrant local culture of Uttarakhand.
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto pt-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles, places, or travel tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-slate-300 text-xs focus:outline-none focus:bg-white focus:text-slate-900 transition-all shadow-lg"
              />
              <Search className="w-4 h-4 text-[#FF6B35] absolute left-4 top-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 -mt-12 relative z-20">
        
        {/* Category Capsule Filter Bar */}
        <div className="flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-white rounded-3xl border border-slate-200/90 shadow-sm max-w-full overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-5 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#0F172A] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-[#E11D48] hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Cards Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-sm max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-[#0F172A] flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8 text-[#E11D48]" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900">No Articles Found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {searchQuery 
                ? `No articles matched your search "${searchQuery}". Try a different keyword.`
                : 'No articles have been published in this category yet. Check back soon for new stories!'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="bg-[#0F172A] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm cursor-pointer"
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
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    {/* Cover Photo */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                      <img
                        src={blog.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'}
                        alt={blog.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                      {/* Top Badges */}
                      <span className="absolute top-4 left-4 bg-[#0F172A]/90 backdrop-blur-md text-[#FF6B35] text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-white/20 shadow-md">
                        {blog.category || 'Travel Guide'}
                      </span>

                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-xl border border-white/20 flex items-center gap-1.5 shadow-md">
                        <Clock className="w-3 h-3 text-[#FF6B35]" />
                        <span>{blog.readTime || '5 min read'}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                        <span>{blog.author || 'Samika Holiday Travel Desk'}</span>
                        <span>•</span>
                        <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-slate-900 leading-snug group-hover:text-[#E11D48] transition-colors line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {stripHtml(blog.subtitle || blog.content)}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50/50">
                    <span className="text-[#E11D48] font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Read Full Article</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>

                    {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                      <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
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
