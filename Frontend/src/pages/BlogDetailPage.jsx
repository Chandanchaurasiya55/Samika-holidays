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
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4 text-center bg-[#FAF7F2]/40">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0F382C] flex items-center justify-center shadow-inner">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#0F382C]">Article Not Found</h2>
        <p className="text-stone-600 text-sm max-w-md">
          The travel blog article you are looking for might have been moved or removed.
        </p>
        <button
          onClick={onBack}
          className="bg-[#0F382C] hover:bg-[#0A261E] text-white px-7 py-3 rounded-2xl text-xs font-bold shadow-md transition-all cursor-pointer"
        >
          Back to All Articles
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${blog.metaTitle || blog.title} | Atithya Stay`,
        text: `Read "${blog.title}" on Atithya Stay Travel Journal!`,
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

  const formattedDate = blog.createdAt 
    ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'Published Recently';

  return (
    <div className="space-y-10 pb-24 bg-[#FAF7F2]/30 min-h-screen">
      
      {/* Top Breadcrumb Header Bar */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-2xs">
        <div className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6 py-3.5 flex items-center justify-between gap-4">
          
          {/* Breadcrumb path */}
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 overflow-hidden">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-stone-700 hover:text-[#0F382C] font-bold transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-[#C8933E]" />
              <span>All Blogs</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />
            <span className="text-[#0F382C] font-bold shrink-0">{blog.category || 'Travel Guide'}</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300 hidden sm:inline shrink-0" />
            <span className="text-stone-400 truncate hidden sm:inline max-w-md">{blog.title}</span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry(`Inquiry from Blog: ${blog.title}`)}
              className="bg-[#0F382C] hover:bg-[#0A261E] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C8933E]" />
              <span>Plan Trip</span>
            </button>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH EDITORIAL ARTICLE HEADER & CONTAINER */}
      <div className="w-full max-w-[97%] 2xl:max-w-[1780px] mx-auto px-2 sm:px-4 lg:px-6 space-y-8">
        
        {/* Article Title & Metadata Section (Clean Luxury Editorial Typography) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200/90 shadow-sm space-y-6">
          
          {/* Category & Location Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="bg-[#0F382C] text-emerald-200 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
              {blog.category || 'Travel Guide'}
            </span>
            {blog.location && (
              <span className="bg-stone-100 text-stone-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-stone-200">
                <MapPin className="w-3.5 h-3.5 text-[#C8933E]" />
                <span>{blog.location}</span>
              </span>
            )}
            <span className="bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>{blog.readTime || '5 min read'}</span>
            </span>
          </div>

          {/* Main Clean Serif Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.2]">
            {blog.title}
          </h1>

          {/* Subtitle / Excerpt Lead */}
          {blog.subtitle && (
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-normal max-w-5xl">
              {stripHtml(blog.subtitle)}
            </p>
          )}

          {/* Author Strip & Date Row */}
          <div className="pt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#0F382C] text-[#C8933E] flex items-center justify-center font-serif font-bold text-base shadow-xs shrink-0">
                {(blog.author || 'A')[0]}
              </div>
              <div>
                <span className="font-bold text-stone-900 block text-sm">{blog.author || 'Atithya Stay Travel Desk'}</span>
                <span className="text-[11px] text-stone-400 font-medium">Uttarakhand Hospitality & Tourism Specialist</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-stone-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#C8933E]" />
                <span>{formattedDate}</span>
              </span>
              <span className="hidden sm:inline text-stone-300">•</span>
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Local Guide</span>
              </span>
            </div>
          </div>

        </div>

        {/* 2-COLUMN FULL-WIDTH GRID (Main Story on Left + Sticky Travel Facts on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ======================================================== */}
          {/* LEFT: MAIN ARTICLE BODY (8 Cols)                         */}
          {/* ======================================================== */}
          <article className="lg:col-span-8 space-y-8 min-w-0">
            
            {/* Featured High-Res Cover Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-md aspect-video w-full bg-stone-900 border border-stone-200">
              <img
                src={blog.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80'}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              {blog.location && (
                <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
                  <MapPin className="w-3.5 h-3.5 text-[#C8933E]" />
                  <span>{blog.location}, Uttarakhand</span>
                </span>
              )}
            </div>

            {/* Article Content Container */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200 shadow-sm space-y-8 text-stone-800">
              
              {/* Formatted Article Body */}
              <div className="leading-relaxed text-stone-800">
                {blog.content ? (
                  /<[a-z][\s\S]*>/i.test(blog.content) ? (
                    <div 
                      className="prose prose-lg prose-stone max-w-none prose-headings:font-serif prose-headings:text-[#0F382C] prose-headings:font-bold prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-stone-100 prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-stone-700 prose-p:leading-relaxed prose-p:mb-5 prose-p:text-base sm:prose-p:text-lg prose-li:text-stone-700 prose-li:leading-relaxed prose-li:text-base prose-a:text-[#C8933E] prose-a:underline prose-a:font-semibold prose-img:rounded-3xl prose-img:shadow-md prose-img:my-8 prose-blockquote:border-l-4 prose-blockquote:border-[#C8933E] prose-blockquote:bg-[#FAF7F2] prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:font-serif prose-blockquote:text-stone-800 prose-strong:text-stone-900"
                      dangerouslySetInnerHTML={{ __html: blog.content }} 
                    />
                  ) : (
                    <div className="space-y-6 text-stone-700 text-base sm:text-lg leading-relaxed">
                      {blog.content.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )
                ) : (
                  <p className="text-stone-500 italic">No content available for this article.</p>
                )}
              </div>

              {/* Tags Cloud */}
              {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                <div className="pt-8 border-t border-stone-100 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-extrabold text-stone-400 uppercase tracking-widest mr-2 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#C8933E]" />
                    <span>Tags & Topics:</span>
                  </span>
                  {blog.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-3.5 py-1.5 bg-stone-100 hover:bg-[#0F382C] hover:text-white text-stone-700 text-xs font-semibold rounded-full transition-colors cursor-default"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author Bio Spotlight Box */}
              <div className="pt-8 border-t border-stone-100">
                <div className="p-6 sm:p-8 bg-[#FAF7F2] rounded-3xl border border-[#E7DECD] flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                  <div className="w-16 h-16 rounded-2xl bg-[#0F382C] text-[#C8933E] flex items-center justify-center font-serif font-bold text-2xl shrink-0 shadow-md">
                    {(blog.author || 'A')[0]}
                  </div>
                  <div className="space-y-2 flex-1">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#C8933E] tracking-widest block">Written by</span>
                      <h4 className="font-serif text-lg font-bold text-stone-900">{blog.author || 'Atithya Stay Travel Desk'}</h4>
                      <p className="text-xs text-stone-500 font-medium">Local Explorer & Uttarakhand Tour Specialist</p>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Curating authentic mountain journeys, handpicked resort stays, spiritual darshan assistance, and offbeat travel itineraries across Uttarakhand.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Share & Like Bar */}
              <div className="pt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={onBack}
                  className="inline-flex items-center gap-2 text-stone-700 hover:text-[#0F382C] text-xs font-bold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to All Articles</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      liked ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-rose-600 text-rose-600' : ''}`} />
                    <span>{liked ? 'Liked!' : 'Like Story'}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

            </div>

          </article>

          {/* ======================================================== */}
          {/* RIGHT: STICKY TRAVEL DESK & BOOKING SIDEBAR (4 Cols)     */}
          {/* ======================================================== */}
          <aside className="lg:col-span-4 space-y-6 self-start lg:sticky lg:top-20">
            
            {/* Quick Trip Highlights Card */}
            {(blog.location || blog.bestTimeToVisit || blog.idealDuration || blog.howToReach) && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-stone-100 text-[#0F382C]">
                  <Sparkles className="w-5 h-5 text-[#C8933E]" />
                  <h3 className="font-serif text-lg font-bold">Fast Travel Facts</h3>
                </div>

                <div className="space-y-3.5 text-xs">
                  {blog.location && (
                    <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
                      <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Destination Region</span>
                      <p className="font-bold text-stone-800 flex items-center gap-1.5 text-sm">
                        <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{blog.location}</span>
                      </p>
                    </div>
                  )}

                  {blog.bestTimeToVisit && (
                    <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
                      <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Best Season to Visit</span>
                      <p className="font-bold text-stone-800 flex items-center gap-1.5 text-sm">
                        <Calendar className="w-4 h-4 text-[#C8933E] shrink-0" />
                        <span>{blog.bestTimeToVisit}</span>
                      </p>
                    </div>
                  )}

                  {blog.idealDuration && (
                    <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
                      <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Recommended Duration</span>
                      <p className="font-bold text-stone-800 flex items-center gap-1.5 text-sm">
                        <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{blog.idealDuration}</span>
                      </p>
                    </div>
                  )}

                  {blog.howToReach && (
                    <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-100 space-y-1">
                      <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Transit & Connectivity</span>
                      <p className="font-medium text-stone-700 text-xs leading-relaxed">
                        {blog.howToReach}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Custom Trip Enquiry Card */}
            <div className="bg-[#0F382C] text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-5 border border-emerald-800">
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C8933E] block">TAILORED PACKAGES</span>
                <h4 className="font-serif text-xl font-bold">Want to Visit {blog.location || 'Uttarakhand'}?</h4>
                <p className="text-stone-300 text-xs leading-relaxed">
                  Get a personalized itinerary including verified luxury resorts, private vehicle & dedicated local assistance.
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry(`Inquiry from Blog: ${blog.title}`)}
                  className="w-full bg-[#C8933E] hover:bg-[#B5812F] text-white py-3 px-4 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get Free Itinerary Quote</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://wa.me/919258677823"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-700 hover:bg-emerald-600 text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href="tel:+919258677823"
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Desk</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Trending / More Travel Guides Sidebar Widget */}
            {relatedBlogs.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
                <h4 className="font-serif text-base font-bold text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#C8933E]" />
                  <span>More Travel Guides</span>
                </h4>

                <div className="space-y-3.5">
                  {relatedBlogs.map((item) => (
                    <div
                      key={item.id || item._id}
                      onClick={() => onSelectBlog && onSelectBlog(item)}
                      className="flex items-center gap-3 group cursor-pointer p-2 rounded-2xl hover:bg-stone-50 transition-colors"
                    >
                      <div className="w-18 h-16 rounded-xl overflow-hidden bg-stone-900 shrink-0">
                        <img 
                          src={item.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80'} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="space-y-1 min-w-0 flex-1">
                        <span className="text-[9px] font-bold text-[#C8933E] uppercase block">{item.category || 'Guide'}</span>
                        <h5 className="font-serif text-xs font-bold text-stone-900 group-hover:text-[#0F382C] line-clamp-2 leading-snug">
                          {item.title}
                        </h5>
                        <span className="text-[10px] text-stone-400 block">{item.readTime || '5 min'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </aside>

        </div>

        {/* FULL-WIDTH LUXURY CALL TO ACTION BANNER */}
        <div className="bg-[#0F382C] text-white rounded-3xl p-8 sm:p-12 border border-emerald-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8933E]">AUTHENTIC UTTARAKHAND EXPERIENCES</span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold">Ready to Experience This Destination?</h3>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Let our local Himalayan trip planners craft your customized holiday with verified luxury resorts, trusted drivers, and 24/7 dedicated on-trip support.
            </p>
          </div>
          <button
            onClick={() => onOpenEnquiry && onOpenEnquiry(`Inquiry from Blog: ${blog.title}`)}
            className="bg-[#C8933E] hover:bg-[#B5812F] text-white px-8 py-4 rounded-2xl font-bold text-xs sm:text-sm shadow-xl transition-all shrink-0 cursor-pointer relative z-10 flex items-center gap-2"
          >
            <span>Get Custom Itinerary</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
