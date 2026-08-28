import React, { useState } from 'react';
import { 
  ArrowLeft, Calendar, Clock, User, Share2, Tag, BookOpen, 
  MessageCircle, Heart, Check, Sparkles, MapPin, ChevronRight,
  Phone, Send, Compass, ShieldCheck, ArrowUpRight, ThumbsUp
} from 'lucide-react';

const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
};

export default function BlogDetailPage({ 
  blog, 
  onBack, 
  onOpenEnquiry, 
  onSelectBlog, 
  allBlogs = [] 
}) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!blog) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4 text-center bg-[#F8FAFC]">
        <div className="w-16 h-16 rounded-full bg-rose-100 text-[#E11D48] flex items-center justify-center shadow-inner">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#0F172A]">Article Not Found</h2>
        <p className="text-slate-600 text-sm max-w-md">
          The travel blog article you are looking for might have been moved or removed.
        </p>
        <button
          onClick={onBack}
          className="bg-[#0F172A] hover:bg-[#E11D48] text-white px-7 py-3 rounded-2xl text-xs font-bold shadow-md transition-all cursor-pointer"
        >
          Back to All Articles
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${blog.metaTitle || blog.title} | Samika Holidays`,
        text: `Read "${blog.title}" on Samika Holidays Travel Journal!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const relatedBlogs = allBlogs
    .filter(b => (b.id !== blog.id && b._id !== blog._id && b._id !== blog.id))
    .slice(0, 3);

  return (
    <div className="space-y-12 pb-24 pt-4 bg-[#F8FAFC] text-slate-900 min-h-screen">
      
      {/* Top Breadcrumb Navigation */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 border-b border-slate-200">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#E11D48] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Travel Journal</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLiked(!liked)}
              className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                liked 
                  ? 'bg-rose-50 border-rose-200 text-rose-600' 
                  : 'bg-white border-slate-200 text-slate-600 hover:text-rose-600'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-rose-600 text-rose-600' : ''}`} />
              <span className="hidden sm:inline">{liked ? 'Liked' : 'Like'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-[#E11D48] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Article Header & Main Content */}
      <article className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Article Meta Header */}
        <div className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 text-[#E11D48] border border-rose-500/20 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
            <Tag className="w-3 h-3 text-[#FF6B35]" />
            <span>{blog.category || 'Travel Guide'}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-[1.18] tracking-tight">
            {blog.title}
          </h1>

          {blog.subtitle && (
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-serif italic">
              {stripHtml(blog.subtitle)}
            </p>
          )}

          {/* Author Details Strip */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-500 border-t border-slate-200/80 pt-4">
            <div className="flex items-center gap-2 font-semibold text-slate-800">
              <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-xs">
                {(blog.author || 'S')[0].toUpperCase()}
              </div>
              <span>{blog.author || 'Samika Holiday Travel Desk'}</span>
            </div>

            <span>•</span>

            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>{blog.readTime || '5 min read'}</span>
            </div>

            {blog.createdAt && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Featured Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-xl bg-slate-900 border border-slate-200">
          <img
            src={blog.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80'}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
          {blog.content ? (
            <div 
              className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-a:text-[#E11D48] prose-img:rounded-3xl"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          ) : (
            <p className="text-slate-600 leading-relaxed">
              Explore the untouched scenic valleys, snowcapped peaks, serene lakes, and spiritual shrines of Uttarakhand with local guides and verified resort deals.
            </p>
          )}

          {/* Tags */}
          {Array.isArray(blog.tags) && blog.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-2">Tags:</span>
              {blog.tags.map((tag, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-xl text-xs font-semibold">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Plan Trip CTA Box */}
        <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35]">INSPIRED BY THIS ARTICLE?</span>
            <h3 className="font-serif text-2xl font-bold">Plan Your Custom Mountain Trip Today</h3>
            <p className="text-xs text-slate-300">Talk with our local travel concierge for itineraries and verified resort bookings.</p>
          </div>
          <button
            onClick={() => onOpenEnquiry(`Inquiry inspired by article: ${blog.title}`)}
            className="bg-gradient-to-r from-[#E11D48] to-[#FF6B35] hover:from-[#BE123C] hover:to-[#EA580C] text-white px-7 py-3.5 rounded-2xl font-bold text-xs shrink-0 shadow-lg shadow-rose-900/30 transition-all hover:scale-105 cursor-pointer"
          >
            Plan This Itinerary →
          </button>
        </div>

      </article>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-10 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-slate-900">More Himalayan Stories</h3>
            <button onClick={onBack} className="text-xs font-bold text-[#E11D48] hover:underline flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedBlogs.map(b => (
              <div
                key={b.id || b._id}
                onClick={() => onSelectBlog && onSelectBlog(b)}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">{b.category || 'Guide'}</span>
                </div>
                <div className="p-4 space-y-1">
                  <h4 className="font-serif font-bold text-base text-slate-900 group-hover:text-[#E11D48] transition-colors line-clamp-2 leading-snug">{b.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
