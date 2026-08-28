import { useState } from 'react';
import {
  BarChart3, Inbox, Package, Hotel, PlusCircle, Trash2, CheckCircle2,
  Clock, XCircle, Search, Sparkles, Filter, Calendar as CalendarIcon, MapPin, Users, User,
  Phone, Mail, ArrowUpRight, Image as ImageIcon, Eye, Tag, Check, RefreshCw,
  ShieldCheck, ChevronRight, CreditCard, DollarSign, Wallet, Receipt, X, LogOut,
  Share2, ThumbsUp, Star, Home, LayoutDashboard, Menu, TrendingUp, Thermometer,
  CloudRain, Wind, Layers, Map, Compass, ArrowRight, CheckSquare, AlertCircle, Heart,
  BookOpen, FileText, Globe, Code, AlertTriangle, CheckCheck, Zap
} from 'lucide-react';

export default function AdminPanel({ 
  enquiries = [], 
  packages = [], 
  hotels = [], 
  posts = [], 
  destinations = [],
  blogs = [],
  onUpdateEnquiryStatus, 
  onUpdateEnquiryPayment,
  onDeleteEnquiry, 
  onAddPackage, 
  onDeletePackage, 
  onAddHotel, 
  onDeleteHotel, 
  onAddPost, 
  onDeletePost,
  onAddDestination,
  onDeleteDestination,
  onAddBlog,
  onDeleteBlog,
  onAdminLogout
}) {
  // Navigation tabs: 'overview', 'inquiries', 'payments', 'packages', 'hotels', 'destinations', 'posts'
  const [activeNav, setActiveNav] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [graphTimeframe, setGraphTimeframe] = useState('7 Days'); // '7 Days' | '30 Days'
  const [selectedWeatherDest, setSelectedWeatherDest] = useState('Nainital');
  const [mapViewType, setMapViewType] = useState('Satellite'); // 'Satellite' | 'Terrain'

  // Payment Modal State
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    paidAmount: '',
    totalAmount: '',
    paymentStatus: 'Unpaid',
    paymentMethod: 'UPI'
  });

  // Package Form State
  const [pkgForm, setPkgForm] = useState({
    title: '',
    subtitle: '',
    duration: '3 Nights / 4 Days',
    category: 'Family Tours',
    price: '',
    priceUnit: 'person',
    badge: 'Popular',
    image: '',
    uploadedImages: [],
    specsInput: 'Verified Hotels, Daily Meals, All Sightseeing, Private Transport',
    highlights: [
      'Handpicked 3-Star & 4-Star luxury mountain stays',
      'Private dedicated vehicle with experienced local driver',
      'Customizable itinerary to suit your family preferences',
      'Zero hidden charges & 100% price guarantee'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival, Warm Welcome & Resort Check-in', desc: 'Arrive at your destination and get received by our courteous driver. Check in at your luxury mountain view resort, refresh, and spend the evening enjoying local mall roads or scenic lake promenade.' },
      { day: 'Day 2', title: 'Full Day Guided Sightseeing & Exploration', desc: 'Wake up to sunrise views over the Himalayas. Enjoy a wholesome breakfast followed by a full-day guided excursion covering iconic viewpoints, historic temples, waterfalls, and nature walks.' },
      { day: 'Final Day', title: 'Memories, Souvenirs & Departure', desc: 'After breakfast, take in the morning mountain breeze and pack unforgettable memories. Depart in comfort with our dedicated cab drop service.' }
    ]
  });

  // Hotel Form State
  const [hotelForm, setHotelForm] = useState({
    name: '',
    location: '',
    dest: 'Nainital',
    rating: '4.8 (New)',
    price: '',
    image: '',
    uploadedImages: [],
    tag: 'Luxury Resort',
    description: '',
    checkInOut: 'Check-in: 12:00 PM | Check-out: 11:00 AM',
    dining: 'Buffet Breakfast & Kumaoni cuisine available',
    amenitiesInput: 'Swimming Pool, Restaurant, Free WiFi, Parking, Spa, Mountain View'
  });

  // Destination Form State
  const [destForm, setDestForm] = useState({
    name: '',
    searchKey: '',
    category: 'Wildlife',
    tag: '',
    nightInfo: 'Tour Package • 1 Night',
    rating: '4.8',
    iconType: 'paw',
    img: ''
  });

  // Wedding Post Form State
  const [postForm, setPostForm] = useState({
    page: 'weddings',
    title: '',
    subtitle: '',
    image: '',
    description: ''
  });

  // Helper: Strip HTML tags to get raw clean text for excerpts/counting
  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
  };

  // Blog Article Form State (With Real-Time SEO Tracking)
  const [blogForm, setBlogForm] = useState({
    title: '',
    subtitle: '',
    focusKeyword: '',
    metaTitle: '',
    metaDescription: '',
    category: 'Travel Guide',
    location: '',
    readTime: '5 min read',
    author: 'Samika Holiday Travel Desk',
    bestTimeToVisit: '',
    idealDuration: '',
    howToReach: '',
    image: '',
    content: '',
    tagsInput: 'Uttarakhand, Travel Guide, Himalayas'
  });

  const [blogBodyTab, setBlogBodyTab] = useState('write'); // 'write' | 'preview'

  // Calculate Live SEO Audit & Score (0 - 100)
  const calculateSeoScore = () => {
    let score = 0;
    const kw = (blogForm.focusKeyword || '').toLowerCase().trim();
    const title = (blogForm.metaTitle || blogForm.title || '').trim();
    const desc = (blogForm.metaDescription || blogForm.subtitle || '').trim();
    const rawContent = blogForm.content || '';
    const cleanContent = stripHtml(rawContent).toLowerCase();
    const words = cleanContent ? cleanContent.split(/\s+/).filter(Boolean).length : 0;

    const checklist = [];

    // 1. Focus Keyword Checks
    if (kw) {
      const inTitle = title.toLowerCase().includes(kw);
      const inDesc = desc.toLowerCase().includes(kw);
      const inContent = cleanContent.includes(kw);

      if (inTitle) {
        score += 20;
        checklist.push({ label: `Focus keyword "${kw}" found in Title (+20)`, pass: true });
      } else {
        checklist.push({ label: `Add focus keyword "${kw}" in Title (+20)`, pass: false });
      }

      if (inDesc) {
        score += 15;
        checklist.push({ label: `Focus keyword found in Meta Description (+15)`, pass: true });
      } else {
        checklist.push({ label: `Include focus keyword in Meta Description (+15)`, pass: false });
      }

      if (inContent) {
        score += 15;
        checklist.push({ label: `Focus keyword found in Article Content (+15)`, pass: true });
      } else {
        checklist.push({ label: `Mention focus keyword in Body Content (+15)`, pass: false });
      }
    } else {
      checklist.push({ label: `Specify a Target Focus Keyword (+50 potential points)`, pass: false });
      if (title.length >= 10) score += 10;
      if (desc.length >= 20) score += 10;
    }

    // 2. Title Length
    if (title.length >= 40 && title.length <= 65) {
      score += 15;
      checklist.push({ label: `Meta Title is optimal length (${title.length}/60 chars) (+15)`, pass: true });
    } else if (title.length > 0 && title.length < 40) {
      score += 7;
      checklist.push({ label: `Meta Title is slightly short (${title.length} chars). Aim for 40-60 chars (+15)`, pass: false });
    } else if (title.length > 65) {
      score += 5;
      checklist.push({ label: `Meta Title exceeds 65 chars (might get truncated in Google) (+15)`, pass: false });
    } else {
      checklist.push({ label: `Add an SEO Title (40-60 chars) (+15)`, pass: false });
    }

    // 3. Meta Description Length
    if (desc.length >= 120 && desc.length <= 165) {
      score += 15;
      checklist.push({ label: `Meta Description length is perfect (${desc.length}/160 chars) (+15)`, pass: true });
    } else if (desc.length > 0 && desc.length < 120) {
      score += 8;
      checklist.push({ label: `Meta Description is short (${desc.length} chars). Aim for 120-160 chars (+15)`, pass: false });
    } else if (desc.length > 165) {
      score += 6;
      checklist.push({ label: `Meta Description is over 165 chars (Google may truncate) (+15)`, pass: false });
    } else {
      checklist.push({ label: `Add Meta Description (120-160 chars) (+15)`, pass: false });
    }

    // 4. Content Word Count
    if (words >= 250) {
      score += 10;
      checklist.push({ label: `Article body has great depth (${words} words) (+10)`, pass: true });
    } else if (words >= 100) {
      score += 5;
      checklist.push({ label: `Article body length (${words} words). Target at least 250 words (+10)`, pass: false });
    } else {
      checklist.push({ label: `Add more content (at least 250 words for higher ranking) (+10)`, pass: false });
    }

    // 5. Cover Image
    if (blogForm.image) {
      score += 5;
      checklist.push({ label: `Featured Cover Image uploaded (+5)`, pass: true });
    } else {
      checklist.push({ label: `Upload an Article Cover Photo (+5)`, pass: false });
    }

    // 6. Location & Tags
    if (blogForm.location && blogForm.tagsInput) {
      score += 5;
      checklist.push({ label: `Location Focus & Meta Tags configured (+5)`, pass: true });
    } else {
      checklist.push({ label: `Set Location Focus and Tags (+5)`, pass: false });
    }

    const finalScore = Math.min(100, Math.max(0, score));
    return {
      score: finalScore,
      checklist,
      words,
      titleLen: title.length,
      descLen: desc.length
    };
  };

  const handleBlogImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setBlogForm(prev => ({
        ...prev,
        image: event.target.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.content) {
      alert('Please enter Blog Title and Article Content');
      return;
    }

    const seoResult = calculateSeoScore();
    const tags = blogForm.tagsInput ? blogForm.tagsInput.split(',').map(t => t.trim()).filter(Boolean) : [];

    if (onAddBlog) {
      onAddBlog({
        ...blogForm,
        metaTitle: blogForm.metaTitle || blogForm.title,
        metaDescription: blogForm.metaDescription || blogForm.subtitle,
        seoScore: seoResult.score,
        image: blogForm.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        tags
      });
    }

    showNotification(`Blog article "${blogForm.title}" Published with SEO Score ${seoResult.score}/100!`);
    setBlogForm({
      title: '',
      subtitle: '',
      focusKeyword: '',
      metaTitle: '',
      metaDescription: '',
      category: 'Travel Guide',
      location: '',
      readTime: '5 min read',
      author: 'Samika Holiday Travel Desk',
      bestTimeToVisit: '',
      idealDuration: '',
      howToReach: '',
      image: '',
      content: '',
      tagsInput: 'Uttarakhand, Travel Guide, Himalayas'
    });
  };

  const [notification, setNotification] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  const handleDestinationSubmit = (e) => {
    e.preventDefault();
    if (!destForm.name) {
      alert('Please fill in Destination Name');
      return;
    }

    onAddDestination({
      ...destForm,
      searchKey: destForm.searchKey || destForm.name,
      img: destForm.img || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    });

    showNotification(`Destination "${destForm.name}" Published Successfully!`);
    setDestForm({
      name: '',
      searchKey: '',
      category: 'Wildlife',
      tag: '',
      nightInfo: 'Tour Package • 1 Night',
      rating: '4.8',
      iconType: 'paw',
      img: ''
    });
  };

  // Stored Admin Details
  const currentUser = (() => {
    try {
      const stored = localStorage.getItem('samika_current_user') || localStorage.getItem('atithya_current_user');
      return stored ? JSON.parse(stored) : { name: 'Super Admin', username: 'admin', email: 'admin@samikaholidays.com' };
    } catch {
      return { name: 'Super Admin', username: 'admin', email: 'admin@samikaholidays.com' };
    }
  })();

  // 100% Dynamic Calculations from Real State
  const totalEnquiriesCount = enquiries.length;
  const confirmedOrResolvedCount = enquiries.filter(e => e.status === 'Confirmed' || e.status === 'Resolved').length;
  const resolutionRate = totalEnquiriesCount > 0 ? Math.round((confirmedOrResolvedCount / totalEnquiriesCount) * 100) : 0;

  const totalRevenueCollected = enquiries.reduce((acc, curr) => acc + (Number(curr.paidAmount) || 0), 0);
  const totalBookingVolume = enquiries.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);
  const totalDueBalance = enquiries.reduce((acc, curr) => {
    const total = Number(curr.totalAmount) || 0;
    const paid = Number(curr.paidAmount) || 0;
    return acc + Math.max(0, total - paid);
  }, 0);
  const advanceDepositRate = totalBookingVolume > 0 
    ? Math.round((totalRevenueCollected / totalBookingVolume) * 100) 
    : (totalRevenueCollected > 0 ? 100 : 0);

  // Dynamic Package Distribution Calculation
  const categoryColors = ['#3B82F6', '#60A5FA', '#1D4ED8', '#93C5FD', '#2563EB'];
  const packageCategoryCounts = packages.reduce((acc, p) => {
    const cat = p.category || 'Family Tours';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const dynamicCategoryList = Object.entries(packageCategoryCounts).map(([category, count], idx) => ({
    category,
    count,
    percentage: packages.length > 0 ? Math.round((count / packages.length) * 100) : 0,
    color: categoryColors[idx % categoryColors.length]
  }));

  // Dynamic Pie Segments Calculation (Circumference ~ 376.99)
  const circumference = 2 * Math.PI * 60;
  let accumulatedDash = 0;
  const dynamicPieSegments = dynamicCategoryList.map((item) => {
    const strokeDash = (item.percentage / 100) * circumference;
    const offset = -accumulatedDash;
    accumulatedDash += strokeDash;
    return {
      ...item,
      strokeDasharray: `${strokeDash} ${circumference}`,
      strokeDashoffset: offset
    };
  });

  // Dynamic Destination Summary from Real Hotels
  const destinationMap = hotels.reduce((acc, h) => {
    const dest = h.dest || h.location || 'Uttarakhand';
    acc[dest] = (acc[dest] || 0) + 1;
    return acc;
  }, {});

  const dynamicDestPins = Object.entries(destinationMap).map(([dest, count], idx) => {
    const words = dest.split(' ');
    const initials = words.length > 1 ? `${words[0][0]}${words[1][0]}` : dest.slice(0, 2);
    const pinColors = ['bg-blue-500', 'bg-emerald-600', 'bg-amber-500', 'bg-purple-600', 'bg-rose-500'];
    return {
      name: dest,
      initials: (initials || 'UT').toUpperCase(),
      count,
      color: pinColors[idx % pinColors.length]
    };
  });

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesSearch = 
      !searchQuery ||
      (enq.name && enq.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (enq.phone && enq.phone.includes(searchQuery)) ||
      (enq.email && enq.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (enq.service && enq.service.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || enq.status === statusFilter;
    const matchesLocation = selectedLocation === 'All Locations' || (enq.destination && enq.destination.toLowerCase().includes(selectedLocation.toLowerCase()));

    return matchesSearch && matchesStatus && matchesLocation;
  });

  // Open Payment Modal
  const handleOpenPaymentModal = (enq) => {
    setSelectedEnquiry(enq);
    setPaymentForm({
      paidAmount: enq.paidAmount || 0,
      totalAmount: enq.totalAmount || 0,
      paymentStatus: enq.paymentStatus || 'Unpaid',
      paymentMethod: enq.paymentMethod || 'UPI (GPay)'
    });
    setPaymentModalOpen(true);
  };

  // Submit Payment Record
  const handleSavePayment = (e) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    const targetId = selectedEnquiry.id || selectedEnquiry._id;

    onUpdateEnquiryPayment(targetId, {
      paidAmount: Number(paymentForm.paidAmount) || 0,
      totalAmount: Number(paymentForm.totalAmount) || 0,
      paymentStatus: paymentForm.paymentStatus,
      paymentMethod: paymentForm.paymentMethod
    });

    setPaymentModalOpen(false);
    showNotification(`Payment details updated for ${selectedEnquiry.name}`);
  };

  // Package Multiple Images Upload Handler
  const handlePackageImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPkgForm(prev => ({
          ...prev,
          uploadedImages: [...prev.uploadedImages, event.target.result],
          image: prev.image || event.target.result
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveUploadedImage = (indexToRemove) => {
    setPkgForm(prev => {
      const newImages = prev.uploadedImages.filter((_, idx) => idx !== indexToRemove);
      return {
        ...prev,
        uploadedImages: newImages,
        image: newImages.length > 0 ? newImages[0] : ''
      };
    });
  };

  // Highlights Handlers
  const handleAddHighlight = (text = '') => {
    setPkgForm(prev => ({
      ...prev,
      highlights: [...prev.highlights, text || '']
    }));
  };

  const handleUpdateHighlight = (index, value) => {
    setPkgForm(prev => {
      const updated = [...prev.highlights];
      updated[index] = value;
      return { ...prev, highlights: updated };
    });
  };

  const handleRemoveHighlight = (indexToRemove) => {
    setPkgForm(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  // Itinerary Handlers
  const handleAddItineraryDay = () => {
    setPkgForm(prev => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        { day: `Day ${prev.itinerary.length + 1}`, title: '', desc: '' }
      ]
    }));
  };

  const handleUpdateItineraryDay = (index, field, value) => {
    setPkgForm(prev => {
      const updated = [...prev.itinerary];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, itinerary: updated };
    });
  };

  const handleRemoveItineraryDay = (indexToRemove) => {
    setPkgForm(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  // Destination Image Upload Handler
  const handleDestImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setDestForm(prev => ({
        ...prev,
        img: event.target.result
      }));
    };
    reader.readAsDataURL(file);
  };

  // Wedding Post Image Upload Handler
  const handleWeddingImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setPostForm(prev => ({
        ...prev,
        image: event.target.result
      }));
    };
    reader.readAsDataURL(file);
  };

  // Submit Package Handler
  const handlePackageSubmit = (e) => {
    e.preventDefault();
    if (!pkgForm.title || !pkgForm.price) {
      alert('Please fill in Package Title and Price');
      return;
    }

    const specs = pkgForm.specsInput.split(',').map(s => s.trim()).filter(Boolean);
    const validHighlights = pkgForm.highlights.filter(h => h && h.trim().length > 0);
    const allImages = pkgForm.uploadedImages && pkgForm.uploadedImages.length > 0 
      ? pkgForm.uploadedImages 
      : (pkgForm.image ? [pkgForm.image] : ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80']);
    const primaryImage = allImages[0];

    onAddPackage({
      ...pkgForm,
      image: primaryImage,
      images: allImages,
      specs,
      inclusions: specs,
      highlights: validHighlights.length > 0 ? validHighlights : [
        'Handpicked 3-Star & 4-Star luxury mountain stays',
        'Private dedicated vehicle with experienced local driver',
        'Customizable itinerary to suit your family preferences',
        'Zero hidden charges & 100% price guarantee'
      ],
      itinerary: pkgForm.itinerary.filter(it => it.title || it.desc)
    });

    showNotification(`Package "${pkgForm.title}" Published Successfully!`);
    setPkgForm({
      title: '',
      subtitle: '',
      duration: '3 Nights / 4 Days',
      category: 'Family Tours',
      price: '',
      priceUnit: 'person',
      badge: 'Popular',
      image: '',
      uploadedImages: [],
      specsInput: 'Verified Hotels, Daily Meals, All Sightseeing, Private Transport',
      highlights: [
        'Handpicked 3-Star & 4-Star luxury mountain stays',
        'Private dedicated vehicle with experienced local driver',
        'Customizable itinerary to suit your family preferences',
        'Zero hidden charges & 100% price guarantee'
      ],
      itinerary: [
        { day: 'Day 1', title: 'Arrival, Warm Welcome & Resort Check-in', desc: 'Arrive at your destination and get received by our courteous driver. Check in at your luxury mountain view resort, refresh, and spend the evening enjoying local sights.' },
        { day: 'Day 2', title: 'Full Day Guided Sightseeing & Exploration', desc: 'Wake up to sunrise views over the Himalayas. Enjoy a wholesome breakfast followed by a full-day guided excursion covering iconic viewpoints.' },
        { day: 'Final Day', title: 'Memories, Souvenirs & Departure', desc: 'After breakfast, take in the morning mountain breeze and pack unforgettable memories. Depart in comfort with our dedicated cab drop service.' }
      ]
    });
  };

  // Hotel Multiple Images Upload Handler
  const handleHotelImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setHotelForm(prev => ({
          ...prev,
          uploadedImages: [...prev.uploadedImages, event.target.result],
          image: prev.image || event.target.result
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveUploadedHotelImage = (indexToRemove) => {
    setHotelForm(prev => {
      const newImages = prev.uploadedImages.filter((_, idx) => idx !== indexToRemove);
      return {
        ...prev,
        uploadedImages: newImages,
        image: newImages.length > 0 ? newImages[0] : ''
      };
    });
  };

  // Submit Hotel Handler
  const handleHotelSubmit = (e) => {
    e.preventDefault();
    if (!hotelForm.name || !hotelForm.price) {
      alert('Please fill in Hotel Name and Price');
      return;
    }

    const amenities = hotelForm.amenitiesInput.split(',').map(a => a.trim()).filter(Boolean);
    const allImages = hotelForm.uploadedImages && hotelForm.uploadedImages.length > 0 
      ? hotelForm.uploadedImages 
      : (hotelForm.image ? [hotelForm.image] : ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80']);
    const primaryImage = allImages[0];

    onAddHotel({
      ...hotelForm,
      amenities,
      image: primaryImage,
      images: allImages,
      description: hotelForm.description || `Nestled amidst the pristine valleys and lush pine-covered slopes of ${hotelForm.location || hotelForm.dest || 'Uttarakhand'}, ${hotelForm.name} offers an authentic luxury mountain retreat. Enjoy modern amenities, panoramic views from private balconies, curated multi-cuisine dining, and unmatched warm Himalayan hospitality.`,
      checkInOut: hotelForm.checkInOut || 'Check-in: 12:00 PM | Check-out: 11:00 AM',
      dining: hotelForm.dining || 'Buffet Breakfast & Kumaoni cuisine available'
    });

    showNotification(`Hotel "${hotelForm.name}" Added Successfully!`);
    setHotelForm({
      name: '',
      location: '',
      dest: 'Nainital',
      rating: '4.8 (New)',
      price: '',
      image: '',
      uploadedImages: [],
      tag: 'Luxury Resort',
      description: '',
      checkInOut: 'Check-in: 12:00 PM | Check-out: 11:00 AM',
      dining: 'Buffet Breakfast & Kumaoni cuisine available',
      amenitiesInput: 'Swimming Pool, Restaurant, Free WiFi, Parking, Spa, Mountain View'
    });
  };

  // Submit Post Handler
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!postForm.title) {
      alert('Please fill in Post Title');
      return;
    }

    onAddPost({
      ...postForm,
      image: postForm.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    });

    showNotification(`New Post Published for "${postForm.page.toUpperCase()}" Page!`);
    setPostForm({
      page: 'destinations',
      title: '',
      subtitle: '',
      image: '',
      description: ''
    });
  };

  // Live Date string formatted as dd/mm/yyyy
  const todayDateStr = (() => {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  })();

  // Weather data mapping
  const weatherMap = {
    Nainital: { temp: '22°C', air: '68%', status: 'Pleasant & Open', sky: 'Clear Mountain Breeze' },
    'Jim Corbett': { temp: '29°C', air: '62%', status: 'Safari Zone Active', sky: 'Sunny Wildlife Day' },
    Mussoorie: { temp: '20°C', air: '74%', status: 'Cool & Misty', sky: 'Hillside Views Open' }
  };

  const currentClimate = weatherMap[selectedWeatherDest] || weatherMap['Nainital'];

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-800 p-3 sm:p-5 lg:p-7 antialiased font-sans">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 right-6 z-50 bg-[#0F382C] text-white px-6 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-[#C8933E] shrink-0" />
          <span className="text-xs font-bold">{notification}</span>
        </div>
      )}

      {/* Main Outer Dashboard Container */}
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-5 items-start">
        
        {/* ======================================================== */}
        {/* LEFT SIDEBAR (Sticky & Constant on Screen)               */}
        {/* ======================================================== */}
        <aside className="w-full lg:w-64 xl:w-72 bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-stone-200/80 flex flex-col justify-between shrink-0 space-y-6 lg:sticky lg:top-7 lg:self-start lg:h-[calc(100vh-3.5rem)] lg:min-h-[calc(100vh-3.5rem)] lg:overflow-y-auto">
          
          <div className="space-y-6">
            {/* Top User Profile */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-stone-100">
              <div className="w-12 h-12 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-slate-700 shadow-inner">
                <User className="w-6 h-6 text-slate-600" />
              </div>
              <div className="overflow-hidden">
                <h3 className="font-extrabold text-sm text-slate-900 truncate">
                  {currentUser.name || 'Super Admin'}
                </h3>
                <p className="text-[11px] text-slate-400 font-semibold tracking-wide">
                  Position: Administrator
                </p>
              </div>
            </div>

            {/* Sidebar Navigation Items */}
            <nav className="space-y-1.5">
              {[
                { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                { id: 'inquiries', label: 'Inquiries & Bookings', icon: Inbox, count: enquiries.length },
                { id: 'payments', label: 'Payments & Revenue', icon: CreditCard, count: enquiries.filter(e => (e.paidAmount > 0 || e.totalAmount > 0)).length },
                { id: 'packages', label: 'Tour Packages', icon: Package, count: packages.length },
                { id: 'hotels', label: 'Hotels & Stays', icon: Hotel, count: hotels.length },
                { id: 'destinations', label: 'Popular Destinations', icon: MapPin, count: destinations.length },
                { id: 'posts', label: 'Wedding Posts', icon: Heart, count: posts.length },
                { id: 'blogs', label: 'Blogs', icon: BookOpen, count: blogs.length },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Log Out Button (Exact Screenshot Style) */}
          <div className="pt-4 border-t border-stone-100">
            <button
              onClick={() => {
                if (window.confirm('Do you want to log out from Admin Panel?')) {
                  onAdminLogout();
                }
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Admin Sign Out</span>
            </button>
          </div>

        </aside>

        {/* ======================================================== */}
        {/* RIGHT MAIN CONTENT AREA                                  */}
        {/* ======================================================== */}
        <main className="flex-1 min-w-0 space-y-5">
          
          {/* Top Bar Header Area (Exact Screenshot Style) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                {activeNav === 'overview' && 'My Dashboard'}
                {activeNav === 'inquiries' && 'Inquiries & Guest Bookings'}
                {activeNav === 'payments' && 'Revenue & Payment Billing'}
                {activeNav === 'packages' && 'Tour Packages Manager'}
                {activeNav === 'hotels' && 'Hotels & Luxury Resorts'}
                {activeNav === 'destinations' && 'Popular Destinations'}
                {activeNav === 'posts' && 'Destination Post Publisher'}
                {activeNav === 'blogs' && 'Blog Articles & Stories'}
              </h1>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Samika Holidays • Uttarakhand Luxury Tourism & Hospitality Management
              </p>
            </div>
          </div>

          {/* ======================================================== */}
          {/* TAB 1: OVERVIEW MULTI-CARD GRID (EXACT SCREENSHOT LAYOUT) */}
          {/* ======================================================== */}
          {activeNav === 'overview' && (
            <div className="space-y-5">
              
              {/* TOP ROW: Large Curve Chart (Left) + 2 Stat Quantity Cards (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* 1. Large Booking & Enquiry Trends Graph Card (Span 7 cols) */}
                <div className="lg:col-span-6 xl:col-span-6 bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80 space-y-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">Enquiry & Booking Volume</h3>
                      <p className="text-[11px] text-slate-400 font-medium">Traveler interest & reservations trajectory</p>
                    </div>
                    {/* Timeframe Toggle Buttons (Exact Screenshot Style) */}
                    <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">
                      <button
                        onClick={() => setGraphTimeframe('7 Days')}
                        className={`px-3 py-1 rounded-lg text-[11px] font-extrabold transition-all ${
                          graphTimeframe === '7 Days'
                            ? 'bg-blue-200 text-blue-800 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        7 Days
                      </button>
                      <button
                        onClick={() => setGraphTimeframe('30 Days')}
                        className={`px-3 py-1 rounded-lg text-[11px] font-extrabold transition-all ${
                          graphTimeframe === '30 Days'
                            ? 'bg-blue-500 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        30 Days
                      </button>
                    </div>
                  </div>

                  {/* Smooth Filled Curve Area Chart (SVG exact replica of screenshot) */}
                  <div className="relative pt-2">
                    <svg viewBox="0 0 500 220" className="w-full h-44 sm:h-48 overflow-visible">
                      <defs>
                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
                        </linearGradient>
                        <linearGradient id="lightBlueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#BFDBFE" stopOpacity="0.3" />
                        </linearGradient>
                      </defs>

                      {/* Light blue background wave */}
                      <path
                        d="M 30,170 C 90,140 140,80 200,80 C 260,80 300,140 360,110 C 420,80 460,40 500,100 L 500,200 L 30,200 Z"
                        fill="url(#lightBlueGradient)"
                      />

                      {/* Dark blue foreground wave */}
                      <path
                        d="M 30,180 C 80,150 120,110 170,110 C 220,110 240,160 280,100 C 330,40 400,20 440,70 C 470,110 490,140 500,160 L 500,200 L 30,200 Z"
                        fill="url(#blueGradient)"
                      />

                      {/* Y-Axis Labels */}
                      <text x="5" y="40" className="text-[10px] fill-slate-400 font-bold">05</text>
                      <text x="5" y="80" className="text-[10px] fill-slate-400 font-bold">04</text>
                      <text x="5" y="120" className="text-[10px] fill-slate-400 font-bold">03</text>
                      <text x="5" y="160" className="text-[10px] fill-slate-400 font-bold">02</text>
                      <text x="5" y="200" className="text-[10px] fill-slate-400 font-bold">01</text>
                    </svg>

                    {/* X-Axis Labels */}
                    <div className="flex justify-between px-4 text-[10px] font-bold text-slate-400 pt-2 border-t border-slate-100">
                      <span>00</span>
                      <span>01</span>
                      <span>02</span>
                      <span>03</span>
                      <span>04</span>
                      <span>05</span>
                    </div>
                  </div>
                </div>

                {/* 2. Top Right Two Quantity Stat Cards (Span 6 cols, stacked/grid) */}
                <div className="lg:col-span-6 xl:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Stat Card 1: Total Enquiries */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80 flex flex-col justify-between space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-extrabold text-base text-slate-900">Total Enquiries</h4>
                        <p className="text-[10px] text-slate-400 font-medium">Last Updated: Live • {confirmedOrResolvedCount} Resolved</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-bold text-slate-400">Quantity</div>
                        <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                          {enquiries.length}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400">Leads</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveNav('inquiries')}
                      className="inline-flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm transition-all w-fit"
                    >
                      <span>See more</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Stat Card 2: Revenue Collected */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80 flex flex-col justify-between space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-extrabold text-base text-slate-900">Revenue Received</h4>
                        <p className="text-[10px] text-slate-400 font-medium">Total Bookings: ₹{totalBookingVolume.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-bold text-slate-400">Amount</div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                          ₹{totalRevenueCollected.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] font-bold text-emerald-600 font-bold">Confirmed</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveNav('payments')}
                      className="inline-flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm transition-all w-fit"
                    >
                      <span>See more</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Stat Card 3: Active Tour Packages */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80 flex flex-col justify-between space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-extrabold text-base text-slate-900">Tour Packages</h4>
                        <p className="text-[10px] text-slate-400 font-medium">{packages.slice(0, 3).map(p => p.title.split(' ')[0]).join(', ')}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-bold text-slate-400">Inventory</div>
                        <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                          {packages.length}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400">Active</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveNav('packages')}
                      className="inline-flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm transition-all w-fit"
                    >
                      <span>See more</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Stat Card 4: Hotels & Resorts */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80 flex flex-col justify-between space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-extrabold text-base text-slate-900">Verified Stays</h4>
                        <p className="text-[10px] text-slate-400 font-medium">Across {Array.from(new Set(hotels.map(h => h.dest || h.location))).slice(0, 2).join(', ')}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-bold text-slate-400">Hotels</div>
                        <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                          {hotels.length}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400">Listed</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveNav('hotels')}
                      className="inline-flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm transition-all w-fit"
                    >
                      <span>See more</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>

              {/* MIDDLE ROW: Destination Climate Hub (Left) + Interactive Map & Stays Preview (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* 4. Destination Climate Hub Card (Span 6 cols) */}
                <div className="lg:col-span-6 bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900">Uttarakhand Destination Live Climate</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Live weather conditions & travel advisories</p>
                    </div>
                    {/* Destination Selection Pills */}
                    <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">
                      {['Nainital', 'Jim Corbett', 'Mussoorie'].map((dest) => (
                        <button
                          key={dest}
                          onClick={() => setSelectedWeatherDest(dest)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                            selectedWeatherDest === dest
                              ? 'bg-blue-500 text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {dest}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3 Metric Columns with Big Figures (Exact Screenshot Format) */}
                  <div className="grid grid-cols-3 gap-3 py-3 border-y border-slate-100 text-center">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400">
                        <Thermometer className="w-3.5 h-3.5 text-blue-500" />
                        <span>Temperature</span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        {currentClimate.temp}
                      </div>
                      <div className="text-[10px] text-slate-400">{currentClimate.sky}</div>
                    </div>

                    <div className="space-y-1 border-x border-slate-100">
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400">
                        <Wind className="w-3.5 h-3.5 text-cyan-500" />
                        <span>Mountain Air</span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        {currentClimate.air}
                      </div>
                      <div className="text-[10px] text-slate-400">Humidity Index</div>
                    </div>

                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Roads & Travel</span>
                      </div>
                      <div className="pt-1">
                        <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-extrabold">
                          {currentClimate.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-500 font-medium">Verified local weather stream</span>
                    <button
                      onClick={() => showNotification(`Weather advisory for ${selectedWeatherDest}: Optimal for traveler stays.`)}
                      className="inline-flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm transition-all"
                    >
                      <span>See more</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 5. Destination Map & Stays Preview Card (Span 6 cols) */}
                <div className="lg:col-span-6 bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
                  <div className="flex items-center justify-between z-10">
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900">Uttarakhand Tourism Map & Stays</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Geographic coverage & partner properties</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs p-1 rounded-xl border border-slate-200 text-[10px] font-bold text-slate-700">
                      <button 
                        onClick={() => setMapViewType('Satellite')}
                        className={`px-2 py-0.5 rounded-lg ${mapViewType === 'Satellite' ? 'bg-blue-500 text-white' : 'text-slate-600'}`}
                      >
                        Satellite
                      </button>
                      <button 
                        onClick={() => setMapViewType('Terrain')}
                        className={`px-2 py-0.5 rounded-lg ${mapViewType === 'Terrain' ? 'bg-blue-500 text-white' : 'text-slate-600'}`}
                      >
                        Terrain
                      </button>
                    </div>
                  </div>

                  {/* Visual Map graphic with Uttarakhand destinations (Dynamic from Real Hotels) */}
                  <div className="my-3 py-6 px-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-around flex-wrap gap-3 relative">
                    {dynamicDestPins.map((pin, idx) => (
                      <div key={idx} className="text-center">
                        <div className={`w-8 h-8 rounded-full ${pin.color} text-white flex items-center justify-center mx-auto shadow-md font-bold text-xs`}>
                          {pin.initials}
                        </div>
                        <span className="text-[10px] font-extrabold text-slate-800 block mt-1">{pin.name}</span>
                        <span className="text-[9px] text-slate-400 font-semibold">{pin.count} {pin.count === 1 ? 'Stay' : 'Stays'}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Zoom & View Controls */}
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold z-10">
                    <span>Active properties: {hotels.length} Resorts across {dynamicDestPins.length} Destinations</span>
                    <button
                      onClick={() => setActiveNav('hotels')}
                      className="text-blue-600 hover:underline font-extrabold"
                    >
                      View all hotels →
                    </button>
                  </div>
                </div>

              </div>

              {/* BOTTOM ROW: Progress Targets (Left) + Bar Chart with Badge (Middle) + Donut/Pie Chart (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* 6. Progress Value Cards (Span 4 cols) */}
                <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80 space-y-4 flex flex-col justify-around">
                  
                  {/* Progress Item 1 */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                        <CheckSquare className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <h5 className="font-extrabold text-xs text-slate-900">Enquiry Resolution Rate</h5>
                        <p className="text-[10px] text-slate-400 leading-tight">{confirmedOrResolvedCount} of {totalEnquiriesCount} leads confirmed/resolved</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${resolutionRate}%` }}></div>
                      </div>
                      <span className="text-xs font-extrabold text-slate-900">{resolutionRate}%</span>
                    </div>
                  </div>

                  {/* Progress Item 2 */}
                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                        <CreditCard className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <h5 className="font-extrabold text-xs text-slate-900">Advance Deposit Target</h5>
                        <p className="text-[10px] text-slate-400 leading-tight">₹{totalRevenueCollected.toLocaleString('en-IN')} collected of ₹{totalBookingVolume.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${advanceDepositRate}%` }}></div>
                      </div>
                      <span className="text-xs font-extrabold text-slate-900">{advanceDepositRate}%</span>
                    </div>
                  </div>

                </div>

                {/* 7. Bar Chart Card with Blue Floating Badge (Span 4 cols) */}
                <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80 space-y-3 flex flex-col justify-between relative">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-slate-900">Monthly Revenue & Bookings</h4>
                      <span className="text-[10px] text-slate-400">Live summary</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold mt-1">
                      <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Confirmed</span>
                      <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-300"></span> Total Requests</span>
                    </div>
                  </div>

                  {/* Floating badge over highest bar (Exact screenshot style) */}
                  <div className="relative pt-6 pb-2">
                    <div className="absolute top-0 right-10 bg-blue-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-xl shadow-md flex items-center gap-1 animate-bounce">
                      <span>₹{totalRevenueCollected > 0 ? totalRevenueCollected.toLocaleString('en-IN') : '0'}</span>
                      <span className="text-[8px] opacity-80">Total</span>
                    </div>

                    {/* Bar chart columns */}
                    <div className="flex items-end justify-between gap-3 h-32 px-2 border-b border-slate-100">
                      {[
                        { label: 'Pending', count: enquiries.filter(e => e.status === 'Pending').length, max: Math.max(1, enquiries.length) },
                        { label: 'Contacted', count: enquiries.filter(e => e.status === 'Contacted').length, max: Math.max(1, enquiries.length) },
                        { label: 'Confirmed', count: enquiries.filter(e => e.status === 'Confirmed').length, max: Math.max(1, enquiries.length) },
                        { label: 'Resolved', count: enquiries.filter(e => e.status === 'Resolved').length, max: Math.max(1, enquiries.length) },
                        { label: 'Paid', count: enquiries.filter(e => e.paymentStatus === 'Paid' || e.paymentStatus === 'Partial').length, max: Math.max(1, enquiries.length) },
                      ].map((bar, idx) => {
                        const pct = Math.round((bar.count / bar.max) * 100);
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                            <div className="w-4 sm:w-5 bg-slate-200 rounded-t-lg flex flex-col justify-end overflow-hidden h-full max-h-[85%]">
                              <div className="w-full bg-blue-500 rounded-t-lg transition-all duration-500" style={{ height: `${Math.max(bar.count > 0 ? 15 : 0, pct)}%` }}></div>
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 truncate max-w-[45px]">{bar.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold pt-1">
                    <span>Revenue: ₹{totalRevenueCollected.toLocaleString('en-IN')}</span>
                    <span>Total Leads: {enquiries.length}</span>
                  </div>
                </div>

                {/* 8. Pie / Donut Chart Card (Span 4 cols) */}
                <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80 space-y-3 flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Package Distribution</h4>
                    <p className="text-[10px] text-slate-400 font-medium">Category breakdown of active packages</p>
                  </div>

                  {/* SVG Pie Chart (100% Dynamic segments from real packages) */}
                  <div className="flex items-center justify-around py-2">
                    <svg viewBox="0 0 160 160" className="w-28 h-28 sm:w-32 sm:h-32">
                      {dynamicPieSegments.length === 0 ? (
                        <circle
                          r="60"
                          cx="80"
                          cy="80"
                          fill="transparent"
                          stroke="#E2E8F0"
                          strokeWidth="30"
                        />
                      ) : (
                        dynamicPieSegments.map((segment, idx) => (
                          <circle
                            key={idx}
                            r="60"
                            cx="80"
                            cy="80"
                            fill="transparent"
                            stroke={segment.color}
                            strokeWidth="30"
                            strokeDasharray={segment.strokeDasharray}
                            strokeDashoffset={segment.strokeDashoffset}
                            className="transition-all duration-700"
                          />
                        ))
                      )}
                    </svg>

                    {/* Dynamic Legend */}
                    <div className="space-y-1.5 text-[11px] font-bold max-h-32 overflow-y-auto pr-1">
                      {dynamicCategoryList.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
                          <span className="text-slate-700 truncate">{item.category} ({item.percentage}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-blue-600">
                    <span>{dynamicCategoryList.length} Active Categories</span>
                    <button onClick={() => setActiveNav('packages')} className="hover:underline">
                      Manage →
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: INQUIRIES & BOOKINGS MANAGEMENT                   */}
          {/* ======================================================== */}
          {activeNav === 'inquiries' && (
            <div className="space-y-5">
              
              {/* Controls Bar */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search guest name, phone, email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-bold text-slate-500">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-2xl px-3 py-2 focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Inquiries ({enquiries.length})</option>
                    <option value="Pending">Pending</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Inquiries Table */}
              <div className="bg-white rounded-3xl shadow-sm border border-stone-200/80 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                        <th className="py-4 px-5">Guest Name</th>
                        <th className="py-4 px-4">Contact Info</th>
                        <th className="py-4 px-4">Destination & Service</th>
                        <th className="py-4 px-4">Date & Guests</th>
                        <th className="py-4 px-4">Payment Status</th>
                        <th className="py-4 px-4">Status</th>
                        <th className="py-4 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                      {filteredEnquiries.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="py-12 text-center text-slate-400">
                            No inquiries match the current filter.
                          </td>
                        </tr>
                      ) : (
                        filteredEnquiries.map((enq) => {
                          const targetId = enq.id || enq._id;
                          const paid = Number(enq.paidAmount) || 0;
                          const total = Number(enq.totalAmount) || 0;

                          return (
                            <tr key={targetId} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-4 px-5">
                                <div className="font-extrabold text-slate-900 text-sm">{enq.name}</div>
                                {enq.notes && (
                                  <div className="text-[10px] text-slate-400 truncate max-w-xs mt-0.5">
                                    "{enq.notes}"
                                  </div>
                                )}
                              </td>
                              <td className="py-4 px-4 space-y-0.5">
                                <div className="flex items-center gap-1.5 text-slate-800">
                                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                                  <span>{enq.phone}</span>
                                </div>
                                {enq.email && (
                                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                                    <span>{enq.email}</span>
                                  </div>
                                )}
                              </td>
                              <td className="py-4 px-4">
                                <span className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded-lg text-[11px] font-bold mb-1">
                                  {enq.destination || 'Uttarakhand'}
                                </span>
                                <div className="text-slate-800 text-[11px] font-medium">{enq.service}</div>
                              </td>
                              <td className="py-4 px-4 text-slate-600">
                                <div>{enq.date || 'TBD'}</div>
                                <div className="text-[10px] text-slate-400">{enq.guests || '2 Guests'}</div>
                              </td>
                              <td className="py-4 px-4">
                                <button
                                  onClick={() => handleOpenPaymentModal(enq)}
                                  className="text-left group cursor-pointer"
                                >
                                  <div className="flex items-center gap-1.5">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                      enq.paymentStatus === 'Paid'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : enq.paymentStatus === 'Partial'
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-red-50 text-red-700'
                                    }`}>
                                      {enq.paymentStatus || 'Unpaid'}
                                    </span>
                                  </div>
                                  <div className="text-[10px] text-slate-500 mt-1 font-bold group-hover:text-blue-600">
                                    ₹{paid.toLocaleString('en-IN')} / ₹{total.toLocaleString('en-IN')}
                                  </div>
                                </button>
                              </td>
                              <td className="py-4 px-4">
                                <select
                                  value={enq.status || 'Pending'}
                                  onChange={(e) => onUpdateEnquiryStatus(targetId, e.target.value)}
                                  className={`text-xs font-bold rounded-xl px-2.5 py-1 focus:outline-none cursor-pointer border ${
                                    enq.status === 'Confirmed'
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                      : enq.status === 'Contacted'
                                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                                      : enq.status === 'Cancelled'
                                      ? 'bg-red-50 text-red-700 border-red-200'
                                      : 'bg-amber-50 text-amber-700 border-amber-200'
                                  }`}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Resolved">Resolved</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td className="py-4 px-5 text-right">
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Delete inquiry from ${enq.name}?`)) {
                                      onDeleteEnquiry(targetId);
                                      showNotification('Inquiry deleted');
                                    }
                                  }}
                                  className="text-slate-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-xl transition-colors"
                                  title="Delete Inquiry"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: PAYMENTS & REVENUE BILLING                        */}
          {/* ======================================================== */}
          {activeNav === 'payments' && (
            <div className="space-y-5">
              
              {/* Financial Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm">
                  <span className="text-[11px] font-extrabold uppercase text-slate-400">Total Bookings Volume</span>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1">
                    ₹{totalBookingVolume.toLocaleString('en-IN')}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Gross reservation quotes generated</p>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm">
                  <span className="text-[11px] font-extrabold uppercase text-emerald-600">Total Revenue Collected</span>
                  <div className="text-3xl font-extrabold text-emerald-700 mt-1">
                    ₹{totalRevenueCollected.toLocaleString('en-IN')}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Deposits received via UPI / Cards / Bank</p>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm">
                  <span className="text-[11px] font-extrabold uppercase text-amber-600">Outstanding Balance Due</span>
                  <div className="text-3xl font-extrabold text-amber-700 mt-1">
                    ₹{totalDueBalance.toLocaleString('en-IN')}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Pending collection upon check-in</p>
                </div>
              </div>

              {/* Transactions & Invoices List */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-lg text-slate-900">Guest Payment Records</h3>
                  <span className="text-xs font-bold text-slate-500">Click any row to adjust payment</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {enquiries.map((enq) => {
                    const targetId = enq.id || enq._id;
                    const paid = Number(enq.paidAmount) || 0;
                    const total = Number(enq.totalAmount) || 0;

                    return (
                      <div
                        key={targetId}
                        onClick={() => handleOpenPaymentModal(enq)}
                        className="py-3.5 flex items-center justify-between hover:bg-slate-50 px-3 rounded-2xl cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                            <Receipt className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-extrabold text-slate-900 text-xs">{enq.name}</div>
                            <div className="text-[10px] text-slate-400">{enq.service} • {enq.phone}</div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-xs font-extrabold text-slate-900">
                            ₹{paid.toLocaleString('en-IN')} / ₹{total.toLocaleString('en-IN')}
                          </div>
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                            enq.paymentStatus === 'Paid'
                              ? 'bg-emerald-100 text-emerald-800'
                              : enq.paymentStatus === 'Partial'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-50 text-red-700'
                          }`}>
                            {enq.paymentStatus || 'Unpaid'} • {enq.paymentMethod || 'UPI'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: TOUR PACKAGES INVENTORY                           */}
          {/* ======================================================== */}
          {activeNav === 'packages' && (
            <div className="space-y-6">
              
              {/* Add Package Form Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <PlusCircle className="w-5 h-5 text-blue-500" />
                    <div>
                      <h3 className="font-extrabold text-lg text-slate-900">Add New Tour Package</h3>
                      <p className="text-xs text-slate-400">Create new tour packages with photos, inclusions, highlights & day itinerary</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handlePackageSubmit} className="space-y-6 text-xs">
                  
                  {/* Section 1: Basic Details */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">1. Basic Package Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Package Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Nainital 3D/2N Luxury Getaway"
                          value={pkgForm.title}
                          onChange={(e) => setPkgForm({ ...pkgForm, title: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Subtitle / Tagline</label>
                        <input
                          type="text"
                          placeholder="Lakes, Mountains & Serenity"
                          value={pkgForm.subtitle}
                          onChange={(e) => setPkgForm({ ...pkgForm, subtitle: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Price (₹) *</label>
                        <input
                          type="text"
                          required
                          placeholder="6,999"
                          value={pkgForm.price}
                          onChange={(e) => setPkgForm({ ...pkgForm, price: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Duration</label>
                        <input
                          type="text"
                          placeholder="2 Nights / 3 Days"
                          value={pkgForm.duration}
                          onChange={(e) => setPkgForm({ ...pkgForm, duration: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Category</label>
                        <select
                          value={pkgForm.category}
                          onChange={(e) => setPkgForm({ ...pkgForm, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none cursor-pointer"
                        >
                          <option value="Family Tours">Family Tours</option>
                          <option value="Adventure">Adventure</option>
                          <option value="Spiritual Tours">Spiritual Tours</option>
                          <option value="Honeymoon">Honeymoon</option>
                          <option value="Corporate Retreat">Corporate Retreat</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Badge Tag</label>
                        <select
                          value={pkgForm.badge}
                          onChange={(e) => setPkgForm({ ...pkgForm, badge: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none cursor-pointer"
                        >
                          <option value="Popular">Popular</option>
                          <option value="Best Seller">Best Seller</option>
                          <option value="Trending">Trending</option>
                          <option value="Special Offer">Special Offer</option>
                          <option value="Luxury Stay">Luxury Stay</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Direct Multiple Images Upload */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">2. Package Photos & Gallery</h4>
                      <span className="text-[11px] text-slate-400 font-medium">{pkgForm.uploadedImages.length} images selected</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Upload Images (Device / Multiple)</label>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handlePackageImageUpload}
                          className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">Select one or multiple photos from your device</p>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Or Image URL (Optional)</label>
                        <input
                          type="text"
                          placeholder="https://images.unsplash.com/..."
                          value={pkgForm.image}
                          onChange={(e) => setPkgForm({ ...pkgForm, image: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">Fallback URL if no files uploaded</p>
                      </div>
                    </div>

                    {/* Uploaded Images Thumbnails Preview List */}
                    {pkgForm.uploadedImages.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <span className="text-[11px] font-bold text-slate-600 block">Uploaded Photo Gallery Preview:</span>
                        <div className="flex flex-wrap gap-3">
                          {pkgForm.uploadedImages.map((imgSrc, idx) => (
                            <div key={idx} className="relative w-24 h-20 rounded-xl overflow-hidden border-2 border-blue-400 shadow-xs group">
                              <img src={imgSrc} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => handleRemoveUploadedImage(idx)}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 shadow-sm hover:bg-red-700 transition-all"
                                title="Remove Image"
                              >
                                <X className="w-3 h-3" />
                              </button>
                              {idx === 0 && (
                                <span className="absolute bottom-0 inset-x-0 bg-blue-600 text-white text-[9px] font-bold text-center py-0.5">
                                  Cover Photo
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section 3: Package Inclusions & Highlights */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">3. Inclusions & Experience Highlights</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Inclusions */}
                      <div className="space-y-2">
                        <label className="block font-bold text-slate-700">Package Inclusions (Comma Separated)</label>
                        <input
                          type="text"
                          placeholder="Verified 3/4★ Hotels, Daily Meals, All Sightseeing, Private Transport"
                          value={pkgForm.specsInput}
                          onChange={(e) => setPkgForm({ ...pkgForm, specsInput: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                        />
                        {/* Quick Inclusions Chips */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {['Verified 3/4★ Hotels', 'Daily Meals', 'Sightseeing', 'Private Transport', 'Jungle Safari', 'Tour Guide'].map((chip) => (
                            <button
                              key={chip}
                              type="button"
                              onClick={() => {
                                const current = pkgForm.specsInput ? pkgForm.specsInput.split(',').map(s => s.trim()) : [];
                                if (!current.includes(chip)) {
                                  setPkgForm({
                                    ...pkgForm,
                                    specsInput: current.length > 0 ? `${pkgForm.specsInput}, ${chip}` : chip
                                  });
                                }
                              }}
                              className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 text-[10px] font-semibold text-slate-600 transition-colors"
                            >
                              + {chip}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Highlights Interactive List Builder (Modern Card Design) */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="block font-bold text-slate-700">Highlights of This Experience</label>
                          <button
                            type="button"
                            onClick={() => handleAddHighlight('')}
                            className="text-blue-600 hover:text-blue-700 font-bold text-[11px] flex items-center gap-1"
                          >
                            <PlusCircle className="w-3.5 h-3.5" />
                            <span>+ Add Point</span>
                          </button>
                        </div>

                        {/* Quick Preset Chips */}
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            'Luxury Mountain View Resort',
                            'Dedicated Cab & Driver',
                            'Customizable Itinerary',
                            '100% Price Guarantee',
                            '24x7 Assistance'
                          ].map((chip) => (
                            <button
                              key={chip}
                              type="button"
                              onClick={() => {
                                if (!pkgForm.highlights.includes(chip)) {
                                  handleAddHighlight(chip);
                                }
                              }}
                              className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 text-[10px] font-semibold text-slate-600 transition-colors"
                            >
                              + {chip}
                            </button>
                          ))}
                        </div>

                        {/* Editable Highlight Rows */}
                        <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                          {pkgForm.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-200 rounded-xl">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
                              <input
                                type="text"
                                placeholder={`Highlight point #${idx + 1}`}
                                value={highlight}
                                onChange={(e) => handleUpdateHighlight(idx, e.target.value)}
                                className="flex-1 bg-transparent text-xs font-semibold text-slate-800 focus:outline-none"
                              />
                              {pkgForm.highlights.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveHighlight(idx)}
                                  className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                                  title="Remove Highlight"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Section 4: Day-by-Day Tour Itinerary Builder */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">4. Day-by-Day Tour Itinerary</h4>
                        <p className="text-[10px] text-slate-400">Add plan and description for each day of the journey</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddItineraryDay}
                        className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-bold text-xs transition-colors"
                      >
                        <PlusCircle className="w-3.5 h-3.5 text-blue-500" />
                        <span>+ Add Another Day</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {pkgForm.itinerary.map((item, idx) => (
                        <div key={idx} className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2.5 relative">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={item.day}
                                onChange={(e) => handleUpdateItineraryDay(idx, 'day', e.target.value)}
                                className="w-24 px-2.5 py-1 bg-white border border-slate-300 rounded-md font-bold text-xs text-[#0F382C]"
                              />
                            </div>
                            {pkgForm.itinerary.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveItineraryDay(idx)}
                                className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Remove</span>
                              </button>
                            )}
                          </div>

                          <div>
                            <input
                              type="text"
                              placeholder="Day Title (e.g. Arrival, Warm Welcome & Resort Check-in)"
                              value={item.title}
                              onChange={(e) => handleUpdateItineraryDay(idx, 'title', e.target.value)}
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-xs focus:outline-none focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <textarea
                              rows={2}
                              placeholder="Day Description / Activities plan..."
                              value={item.desc}
                              onChange={(e) => handleUpdateItineraryDay(idx, 'desc', e.target.value)}
                              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:border-blue-500 leading-relaxed"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 5: Submit Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                    >
                      <PlusCircle className="w-4.5 h-4.5" />
                      <span>Publish & Save Package</span>
                    </button>
                  </div>

                </form>
              </div>

              {/* Existing Packages Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {packages.map((pkg) => {
                  const targetId = pkg.id || pkg._id;
                  return (
                    <div key={targetId} className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm flex flex-col justify-between">
                      <div className="relative h-40">
                        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                          {pkg.category}
                        </span>
                      </div>
                      <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-extrabold text-sm text-slate-900">{pkg.title}</h4>
                          <p className="text-[11px] text-slate-400">{pkg.subtitle}</p>
                          <div className="text-xs font-extrabold text-blue-600 mt-2">
                            ₹{pkg.price} <span className="text-[10px] text-slate-400">/ {pkg.priceUnit || 'person'}</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 font-bold">{pkg.duration}</span>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete package "${pkg.title}"?`)) {
                                onDeletePackage(targetId);
                                showNotification('Package deleted');
                              }
                            }}
                            className="text-red-600 hover:bg-red-50 p-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: HOTELS & RESORTS                                  */}
          {/* ======================================================== */}
          {activeNav === 'hotels' && (
            <div className="space-y-6">
              
              {/* Add Hotel Form Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <Hotel className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg text-slate-900">Add New Hotel / Resort</h3>
                      <p className="text-xs text-slate-400 font-medium">Create verified property listings with photo gallery, policies and room amenities</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleHotelSubmit} className="space-y-6 text-xs">
                  
                  {/* Section 1: Basic Hotel Info */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">1. Basic Property Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Hotel / Resort Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Corbett Riverside Jungle Resort"
                          value={hotelForm.name}
                          onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Destination Area *</label>
                        <input
                          type="text"
                          required
                          list="destination-suggestions"
                          placeholder="e.g. Nainital, Jim Corbett, Chopta, Auli..."
                          value={hotelForm.dest}
                          onChange={(e) => setHotelForm({ ...hotelForm, dest: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                        />
                        <datalist id="destination-suggestions">
                          <option value="Nainital" />
                          <option value="Jim Corbett" />
                          <option value="Mussoorie" />
                          <option value="Rishikesh" />
                          <option value="Bhimtal" />
                          <option value="Kausani" />
                          <option value="Haridwar" />
                          <option value="Mukteshwar" />
                          <option value="Auli" />
                          <option value="Chopta" />
                          <option value="Ranikhet" />
                          <option value="Lansdowne" />
                          <option value="Dhanaulti" />
                          <option value="Kedarnath" />
                          <option value="Badrinath" />
                          <option value="Almora" />
                          <option value="Dehradun" />
                          <option value="Pithoragarh" />
                          <option value="Uttarkashi" />
                        </datalist>
                        <p className="text-[10px] text-slate-400 mt-1">Type any custom destination name or pick from suggestions</p>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Property Tag / Category</label>
                        <input
                          type="text"
                          placeholder="e.g. Luxury Jungle Resort, Heritage Lake View, Mountain Panorama"
                          value={hotelForm.tag}
                          onChange={(e) => setHotelForm({ ...hotelForm, tag: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Starting Price (₹/Night) *</label>
                        <input
                          type="text"
                          required
                          placeholder="5,499"
                          value={hotelForm.price}
                          onChange={(e) => setHotelForm({ ...hotelForm, price: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Full Location Address</label>
                        <input
                          type="text"
                          placeholder="Mall Road, Nainital, Uttarakhand"
                          value={hotelForm.location}
                          onChange={(e) => setHotelForm({ ...hotelForm, location: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Rating & Reviews Tag</label>
                        <input
                          type="text"
                          placeholder="4.9 (520 Reviews)"
                          value={hotelForm.rating}
                          onChange={(e) => setHotelForm({ ...hotelForm, rating: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Hotel Images & Direct Upload */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">2. Hotel Photos & Gallery</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Direct File Uploader */}
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Upload Multiple Images (From Computer / Phone)</label>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleHotelImageUpload}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">Select one or multiple photos to build the property gallery</p>
                      </div>

                      {/* Optional URL input */}
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Or Single Image URL (Optional)</label>
                        <input
                          type="text"
                          placeholder="https://images.unsplash.com/photo-..."
                          value={hotelForm.image}
                          onChange={(e) => setHotelForm({ ...hotelForm, image: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">Direct web image URL fallback</p>
                      </div>
                    </div>

                    {/* Image Previews */}
                    {hotelForm.uploadedImages.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <span className="text-[11px] font-bold text-slate-600 block">Uploaded Hotel Gallery Preview ({hotelForm.uploadedImages.length} Photos):</span>
                        <div className="flex flex-wrap gap-3">
                          {hotelForm.uploadedImages.map((imgSrc, idx) => (
                            <div key={idx} className="relative w-24 h-20 rounded-xl overflow-hidden border-2 border-blue-400 shadow-xs group">
                              <img src={imgSrc} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => handleRemoveUploadedHotelImage(idx)}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 shadow-sm hover:bg-red-700 transition-all"
                                title="Remove Image"
                              >
                                <X className="w-3 h-3" />
                              </button>
                              {idx === 0 && (
                                <span className="absolute bottom-0 inset-x-0 bg-blue-600 text-white text-[9px] font-bold text-center py-0.5">
                                  Cover Photo
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section 3: Property Details, Policies & Amenities */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">3. About Property, Policies & Amenities</h4>
                    
                    {/* About Property Description */}
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">About Hotel / Resort Description</label>
                      <textarea
                        rows={3}
                        placeholder="Nestled amidst the pristine valleys and lush pine-covered slopes of Uttarakhand, this resort offers an authentic luxury mountain retreat..."
                        value={hotelForm.description}
                        onChange={(e) => setHotelForm({ ...hotelForm, description: e.target.value })}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500 leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Check-In / Check-Out Timings</label>
                        <input
                          type="text"
                          placeholder="Check-in: 12:00 PM | Check-out: 11:00 AM"
                          value={hotelForm.checkInOut}
                          onChange={(e) => setHotelForm({ ...hotelForm, checkInOut: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Dining & Meals Plan</label>
                        <input
                          type="text"
                          placeholder="Buffet Breakfast & Kumaoni cuisine available"
                          value={hotelForm.dining}
                          onChange={(e) => setHotelForm({ ...hotelForm, dining: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="space-y-2 pt-2">
                      <label className="block font-bold text-slate-700">Property Amenities & Facilities (Comma Separated)</label>
                      <input
                        type="text"
                        placeholder="Swimming Pool, Multi-Cuisine Restaurant, Free WiFi, Mountain View, Spa, Free Parking"
                        value={hotelForm.amenitiesInput}
                        onChange={(e) => setHotelForm({ ...hotelForm, amenitiesInput: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                      />
                      
                      {/* Quick Amenities Preset Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {[
                          'Swimming Pool',
                          'Restaurant',
                          'Free WiFi',
                          'Mountain View',
                          'Jungle View',
                          'Spa & Wellness',
                          'Bonfire',
                          'Room Service',
                          'Free Parking',
                          'Power Backup'
                        ].map((chip) => (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => {
                              const current = hotelForm.amenitiesInput ? hotelForm.amenitiesInput.split(',').map(s => s.trim()) : [];
                              if (!current.includes(chip)) {
                                setHotelForm({
                                  ...hotelForm,
                                  amenitiesInput: current.length > 0 ? `${hotelForm.amenitiesInput}, ${chip}` : chip
                                });
                              }
                            }}
                            className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 text-[10px] font-semibold text-slate-600 transition-colors"
                          >
                            + {chip}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Submit Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                    >
                      <PlusCircle className="w-4.5 h-4.5" />
                      <span>Publish & Save Hotel Listing</span>
                    </button>
                  </div>

                </form>
              </div>

              {/* Hotels Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {hotels.map((htl) => {
                  const targetId = htl.id || htl._id;
                  return (
                    <div key={targetId} className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm flex flex-col justify-between">
                      <div className="relative h-40">
                        <img src={htl.image} alt={htl.name} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                          {htl.dest}
                        </span>
                      </div>
                      <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-extrabold text-sm text-slate-900">{htl.name}</h4>
                          <p className="text-[11px] text-slate-400">{htl.location}</p>
                          <div className="text-xs font-extrabold text-blue-600 mt-2">
                            ₹{htl.price} <span className="text-[10px] text-slate-400">/ night</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 font-bold">{htl.tag || 'Luxury'}</span>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete hotel "${htl.name}"?`)) {
                                onDeleteHotel(targetId);
                                showNotification('Hotel deleted');
                              }
                            }}
                            className="text-red-600 hover:bg-red-50 p-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: POPULAR DESTINATIONS                                */}
          {/* ======================================================== */}
          {activeNav === 'destinations' && (
            <div className="space-y-6">
              
              {/* Add Destination Form Card */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-blue-500" />
                  <h3 className="font-extrabold text-lg text-slate-900">Add Popular Destination (Live Homepage)</h3>
                </div>

                <form onSubmit={handleDestinationSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Destination Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jim Corbett National Park"
                      value={destForm.name}
                      onChange={(e) => setDestForm({ ...destForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Category</label>
                    <select
                      value={destForm.category}
                      onChange={(e) => setDestForm({ ...destForm, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="Wildlife">Wildlife</option>
                      <option value="Lakes">Lakes</option>
                      <option value="Spiritual">Spiritual</option>
                      <option value="Hills">Hills</option>
                      <option value="Snow">Snow & Ski</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tagline / Short Description</label>
                    <input
                      type="text"
                      placeholder="e.g. Wildlife Adventure in Nainital District"
                      value={destForm.tag}
                      onChange={(e) => setDestForm({ ...destForm, tag: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Package / Night Info</label>
                    <input
                      type="text"
                      placeholder="e.g. Tour Package • 1 Night"
                      value={destForm.nightInfo}
                      onChange={(e) => setDestForm({ ...destForm, nightInfo: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Star Rating</label>
                    <input
                      type="text"
                      placeholder="4.8"
                      value={destForm.rating}
                      onChange={(e) => setDestForm({ ...destForm, rating: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Image Upload / URL */}
                  <div className="sm:col-span-2 space-y-2 pt-2 border-t border-slate-100">
                    <label className="block font-bold text-slate-700">Destination Cover Photo</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleDestImageUpload}
                          className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">Upload from device (PNG, JPG, WebP)</p>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Or paste Image URL (e.g. /corbett_tiger.png)"
                          value={destForm.img}
                          onChange={(e) => setDestForm({ ...destForm, img: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Image Preview */}
                    {destForm.img && (
                      <div className="flex items-center gap-3 pt-1">
                        <div className="relative w-24 h-16 rounded-xl overflow-hidden border-2 border-blue-500 shadow-xs">
                          <img src={destForm.img} alt="Destination Preview" className="w-full h-full object-cover" />
                        </div>
                        <button
                          type="button"
                          onClick={() => setDestForm({ ...destForm, img: '' })}
                          className="text-red-600 hover:text-red-700 font-bold text-xs flex items-center gap-1"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Remove Photo</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Publish Destination to Homepage</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Destinations Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {destinations.map((dest) => {
                  const targetId = dest.id || dest._id;
                  return (
                    <div key={targetId} className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm flex flex-col justify-between group">
                      <div className="relative h-40">
                        <img src={dest.img} alt={dest.name} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                          {dest.category}
                        </span>
                        <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-white/20">
                          ★ {dest.rating || '4.8'}
                        </span>
                      </div>
                      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-extrabold text-sm text-slate-900 leading-tight">{dest.name}</h4>
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{dest.tag}</p>
                          <p className="text-[10px] font-bold text-slate-500 mt-1">{dest.nightInfo}</p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 font-bold">Homepage Live</span>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete destination "${dest.name}" from Homepage?`)) {
                                onDeleteDestination(targetId);
                                showNotification(`Destination "${dest.name}" removed from Homepage!`);
                              }
                            }}
                            className="text-red-600 hover:bg-red-50 p-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: WEDDING POSTS & VENUES                              */}
          {/* ======================================================== */}
          {activeNav === 'posts' && (
            <div className="space-y-6">
              
              {/* Add Wedding Post Form Card */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500 fill-current" />
                  <h3 className="font-extrabold text-lg text-slate-900">Publish Live Destination Wedding Venue / Post</h3>
                </div>

                <form onSubmit={handlePostSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Target Page Section</label>
                    <select
                      value={postForm.page}
                      onChange={(e) => setPostForm({ ...postForm, page: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="weddings">Destination Weddings Page</option>
                      <option value="corporate">Corporate Retreats Page</option>
                      <option value="destinations">Destinations Page</option>
                      <option value="hotels">Hotels Page Highlights</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Wedding Venue / Post Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jim Corbett Riverside Mandap & Luxury Lawn"
                      value={postForm.title}
                      onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Subtitle / Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Exclusive Wild Luxury & Nature Mandap Setup"
                      value={postForm.subtitle}
                      onChange={(e) => setPostForm({ ...postForm, subtitle: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Wedding Image Upload / URL */}
                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700 mb-1">Venue Cover Photo (Device or URL)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleWeddingImageUpload}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-rose-600 file:text-white hover:file:bg-rose-700 cursor-pointer"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Or Image URL</label>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/... or /wedding_hero.png"
                      value={postForm.image}
                      onChange={(e) => setPostForm({ ...postForm, image: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Wedding Photo Preview */}
                  {postForm.image && (
                    <div className="sm:col-span-2 flex items-center gap-3 pt-1">
                      <div className="relative w-28 h-18 rounded-xl overflow-hidden border-2 border-rose-500 shadow-xs">
                        <img src={postForm.image} alt="Wedding Preview" className="w-full h-full object-cover" />
                      </div>
                      <button
                        type="button"
                        onClick={() => setPostForm({ ...postForm, image: '' })}
                        className="text-red-600 hover:text-red-700 font-bold text-xs flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Remove Photo</span>
                      </button>
                    </div>
                  )}

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Description / Venue Highlights</label>
                    <textarea
                      rows="3"
                      placeholder="Describe the wedding venue, guest capacity, catering, decor highlights, and scenic mountain views..."
                      value={postForm.description}
                      onChange={(e) => setPostForm({ ...postForm, description: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                      <span>Publish Wedding Post to Website</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Posts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {posts.map((post) => {
                  const targetId = post.id || post._id;
                  return (
                    <div key={targetId} className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm flex flex-col justify-between">
                      <div className="relative h-40">
                        <img src={post.image || '/wedding_hero.png'} alt={post.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 bg-rose-900/85 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                          {post.page === 'weddings' ? 'Wedding Venue' : post.page}
                        </span>
                      </div>
                      <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-extrabold text-sm text-slate-900">{post.title}</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">{post.subtitle}</p>
                          {post.description && (
                            <p className="text-[10px] text-slate-500 mt-2 line-clamp-2">
                              {post.description}
                            </p>
                          )}
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete wedding post "${post.title}"?`)) {
                                onDeletePost(targetId);
                                showNotification('Wedding post deleted!');
                              }
                            }}
                            className="text-red-600 hover:bg-red-50 p-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: BLOGS & ARTICLES CMS WITH SEO ANALYZER              */}
          {/* ======================================================== */}
          {activeNav === 'blogs' && (() => {
            const seoResult = calculateSeoScore();
            const scoreColor = seoResult.score >= 80 ? 'text-emerald-600 bg-emerald-50 border-emerald-300' : seoResult.score >= 50 ? 'text-amber-600 bg-amber-50 border-amber-300' : 'text-rose-600 bg-rose-50 border-rose-300';
            const progressColor = seoResult.score >= 80 ? 'bg-emerald-500' : seoResult.score >= 50 ? 'bg-amber-500' : 'bg-rose-500';

            return (
              <div className="space-y-6">
                
                {/* Main Blog Creation Form */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-sm space-y-6">
                  
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#0F382C] text-[#C8933E] flex items-center justify-center shadow-xs">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-lg text-slate-900 leading-tight">Create & Publish Blog Article</h3>
                        <p className="text-xs text-slate-400">Full HTML formatting, real-time SEO scoring & Google search preview</p>
                      </div>
                    </div>

                    {/* Quick SEO Badge */}
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border font-bold text-xs shadow-2xs ${scoreColor}`}>
                      <Zap className="w-4 h-4" />
                      <span>Live SEO Score: {seoResult.score} / 100</span>
                    </div>
                  </div>

                  <form onSubmit={handleBlogSubmit} className="space-y-6 text-xs">
                    
                    {/* Section 1: General Information */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-slate-800 font-extrabold text-sm pb-1 border-b border-slate-100">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <span>1. Article Core Details</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Blog Category / Topic *</label>
                          <select
                            value={blogForm.category}
                            onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none cursor-pointer"
                          >
                            <option value="Travel Guide">Travel Guide</option>
                            <option value="Spiritual Journeys">Spiritual Journeys (Kainchi Dham, Chardham)</option>
                            <option value="Hill Stations">Hill Stations & Mountains (Nainital, Mussoorie)</option>
                            <option value="Adventure & Treks">Adventure & Wildlife (Corbett, Treks)</option>
                            <option value="Hidden Gems">Offbeat & Hidden Gems</option>
                            <option value="Food & Culture">Kumaoni Food & Culture</option>
                            <option value="Travel Tips">Travel Tips & Packing Guides</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Destination / Focus Region</label>
                          <input
                            type="text"
                            placeholder="e.g. Nainital, Kainchi Dham, Jim Corbett"
                            value={blogForm.location}
                            onChange={(e) => setBlogForm({ ...blogForm, location: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-emerald-600"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Estimated Read Time</label>
                          <input
                            type="text"
                            placeholder="e.g. 5 min read"
                            value={blogForm.readTime}
                            onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-emerald-600"
                          />
                        </div>

                        <div className="sm:col-span-2 lg:col-span-3">
                          <label className="block font-bold text-slate-700 mb-1">Main Article Title (H1 Heading) *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Complete 2026 Travel Guide to Nainital, Bhimtal & Kainchi Dham"
                            value={blogForm.title}
                            onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 text-sm focus:outline-none focus:border-emerald-600"
                          />
                        </div>

                        <div className="sm:col-span-2 lg:col-span-3">
                          <label className="block font-bold text-slate-700 mb-1">Subtitle / Short Summary Excerpt</label>
                          <input
                            type="text"
                            placeholder="e.g. Discover hidden viewpoint spots, serene lake homestays, temple darshan timings, and local food..."
                            value={blogForm.subtitle}
                            onChange={(e) => setBlogForm({ ...blogForm, subtitle: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-emerald-600"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Author Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Samika Holiday Travel Desk"
                            value={blogForm.author}
                            onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-emerald-600"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Best Time to Visit</label>
                          <input
                            type="text"
                            placeholder="e.g. March to June & Oct to Dec"
                            value={blogForm.bestTimeToVisit}
                            onChange={(e) => setBlogForm({ ...blogForm, bestTimeToVisit: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-emerald-600"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Ideal Duration</label>
                          <input
                            type="text"
                            placeholder="e.g. 2 Nights / 3 Days"
                            value={blogForm.idealDuration}
                            onChange={(e) => setBlogForm({ ...blogForm, idealDuration: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-emerald-600"
                          />
                        </div>

                        <div className="sm:col-span-2 lg:col-span-3">
                          <label className="block font-bold text-slate-700 mb-1">How to Reach (Air / Train / Road Access)</label>
                          <input
                            type="text"
                            placeholder="e.g. Nearest Railway: Kathgodam (35 km) | Airport: Pantnagar (70 km) | Direct luxury Volvo from Delhi"
                            value={blogForm.howToReach}
                            onChange={(e) => setBlogForm({ ...blogForm, howToReach: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-emerald-600"
                          />
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-1 sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1">Article Cover Photo (Device File)</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleBlogImageUpload}
                            className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#0F382C] file:text-white hover:file:bg-[#0A261E] cursor-pointer"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Or Image URL</label>
                          <input
                            type="text"
                            placeholder="https://images.unsplash.com/..."
                            value={blogForm.image}
                            onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-emerald-600"
                          />
                        </div>

                        {blogForm.image && (
                          <div className="sm:col-span-2 lg:col-span-3 flex items-center gap-3 pt-1">
                            <div className="relative w-32 h-20 rounded-xl overflow-hidden border-2 border-emerald-600 shadow-xs">
                              <img src={blogForm.image} alt="Blog Preview" className="w-full h-full object-cover" />
                            </div>
                            <button
                              type="button"
                              onClick={() => setBlogForm({ ...blogForm, image: '' })}
                              className="text-red-600 hover:text-red-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Remove Photo</span>
                            </button>
                          </div>
                        )}

                        <div className="sm:col-span-2 lg:col-span-3">
                          <label className="block font-bold text-slate-700 mb-1">Tags & Keywords (Comma Separated)</label>
                          <input
                            type="text"
                            placeholder="Uttarakhand, Nainital Guide, Boating, Kumaon Hills, Travel 2026"
                            value={blogForm.tagsInput}
                            onChange={(e) => setBlogForm({ ...blogForm, tagsInput: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-emerald-600"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: SEO Optimization & Real-Time Score Meter */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-800 font-extrabold text-sm">
                          <Globe className="w-4 h-4 text-blue-600" />
                          <span>2. SEO Meta Fields & Live Score Optimizer</span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-500">Google SERP Ready</span>
                      </div>

                      {/* SEO Score Meter & Progress Card */}
                      <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-sm text-slate-800">Article SEO Optimization Score:</span>
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${scoreColor}`}>
                                {seoResult.score} / 100 ({seoResult.score >= 80 ? 'Excellent' : seoResult.score >= 50 ? 'Moderate' : 'Needs Improvement'})
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500">Real-time keyword density, meta tag length, content length & search ranking health check.</p>
                          </div>

                          <div className="w-full sm:w-48 bg-slate-200 rounded-full h-3 overflow-hidden">
                            <div
                              className={`h-full ${progressColor} transition-all duration-500`}
                              style={{ width: `${seoResult.score}%` }}
                            />
                          </div>
                        </div>

                        {/* Real-time Checklist Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-2 border-t border-slate-200">
                          {seoResult.checklist.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                              {item.pass ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              ) : (
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              )}
                              <span className={item.pass ? 'text-slate-700 font-semibold' : 'text-slate-500'}>
                                {item.label}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Google SERP Search Snippet Preview Box */}
                        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1 mt-2">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                            <Search className="w-3 h-3 text-blue-500" />
                            <span>Google Search Result Snippet Preview</span>
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">
                            https://www.samikaholidays.com &gt; blogs &gt; {blogForm.title ? blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'article-slug'}
                          </div>
                          <h4 className="text-base font-semibold text-blue-800 hover:underline cursor-pointer leading-tight truncate">
                            {blogForm.metaTitle || blogForm.title || 'Enter your blog title here | Samika Holidays Travel Guide'}
                          </h4>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {blogForm.metaDescription || blogForm.subtitle || 'Add a compelling meta description to describe your blog post content to search engine users and improve click-through rates.'}
                          </p>
                        </div>
                      </div>

                      {/* SEO Inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Primary Focus Keyword *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Nainital Travel Guide or Kainchi Dham"
                            value={blogForm.focusKeyword}
                            onChange={(e) => setBlogForm({ ...blogForm, focusKeyword: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-blue-500"
                          />
                          <span className="text-[10px] text-slate-400 mt-1 block">Main phrase you want to rank for on Google</span>
                        </div>

                        <div className="sm:col-span-2 lg:col-span-2">
                          <div className="flex items-center justify-between mb-1">
                            <label className="font-bold text-slate-700">Custom SEO Meta Title</label>
                            <span className={`text-[10px] font-bold ${
                              (blogForm.metaTitle || blogForm.title).length >= 40 && (blogForm.metaTitle || blogForm.title).length <= 65 ? 'text-emerald-600' : 'text-slate-400'
                            }`}>
                              {(blogForm.metaTitle || blogForm.title).length} / 60 chars (Recommended: 40-60)
                            </span>
                          </div>
                          <input
                            type="text"
                            placeholder="e.g. 10 Best Things to Do in Nainital (2026 Guide) | Samika Holidays"
                            value={blogForm.metaTitle}
                            onChange={(e) => setBlogForm({ ...blogForm, metaTitle: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div className="sm:col-span-2 lg:col-span-3">
                          <div className="flex items-center justify-between mb-1">
                            <label className="font-bold text-slate-700">Custom SEO Meta Description</label>
                            <span className={`text-[10px] font-bold ${
                              (blogForm.metaDescription || blogForm.subtitle).length >= 120 && (blogForm.metaDescription || blogForm.subtitle).length <= 165 ? 'text-emerald-600' : 'text-slate-400'
                            }`}>
                              {(blogForm.metaDescription || blogForm.subtitle).length} / 160 chars (Recommended: 120-160)
                            </span>
                          </div>
                          <textarea
                            rows="2"
                            placeholder="e.g. Plan your trip with our verified Nainital travel guide covering boating at Naini Lake, top luxury resorts, Kainchi Dham darshan timings, and weather tips..."
                            value={blogForm.metaDescription}
                            onChange={(e) => setBlogForm({ ...blogForm, metaDescription: e.target.value })}
                            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500 leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Body Content (HTML & Formatted Text with Live Preview) */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-slate-800 font-extrabold text-sm">
                          <Code className="w-4 h-4 text-emerald-600" />
                          <span>3. Article Body Content (HTML Supported) *</span>
                        </div>

                        {/* Editor Mode Tabs */}
                        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 gap-1">
                          <button
                            type="button"
                            onClick={() => setBlogBodyTab('write')}
                            className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                              blogBodyTab === 'write' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                            }`}
                          >
                            ✍️ HTML / Text Editor
                          </button>
                          <button
                            type="button"
                            onClick={() => setBlogBodyTab('preview')}
                            className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                              blogBodyTab === 'preview' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
                            }`}
                          >
                            👁️ Live HTML Render Preview
                          </button>
                        </div>
                      </div>

                      {/* HTML Quick Helper Buttons */}
                      {blogBodyTab === 'write' && (
                        <div className="flex flex-wrap items-center gap-1.5 p-2.5 bg-slate-50 rounded-2xl border border-slate-200 text-[10px] text-slate-600 font-semibold">
                          <span className="font-bold text-slate-400 mr-1">Quick HTML Tags:</span>
                          {[
                            { label: '<h2>Heading</h2>', tag: '<h2>Section Heading</h2>\n' },
                            { label: '<h3>Subheading</h3>', tag: '<h3>Subheading</h3>\n' },
                            { label: '<p>Paragraph</p>', tag: '<p>Write your detailed paragraph here...</p>\n' },
                            { label: '<strong>Bold</strong>', tag: '<strong>Important Highlight</strong>' },
                            { label: '<ul><li>List</li></ul>', tag: '<ul>\n  <li>Tip 1: ...</li>\n  <li>Tip 2: ...</li>\n</ul>\n' },
                            { label: '<blockquote>Quote</blockquote>', tag: '<blockquote>"Best viewpoint in Kumaon."</blockquote>\n' },
                            { label: '<img src="" />', tag: '<img src="https://images.unsplash.com/..." alt="Nainital Lake View" className="rounded-2xl my-4 w-full" />\n' },
                          ].map((helper, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setBlogForm(prev => ({ ...prev, content: (prev.content ? prev.content + '\n' : '') + helper.tag }))}
                              className="px-2 py-1 bg-white hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border border-slate-200 rounded-lg transition-all font-mono cursor-pointer"
                            >
                              {helper.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Editor or Preview Tab Content */}
                      {blogBodyTab === 'write' ? (
                        <div className="space-y-1">
                          <textarea
                            rows="10"
                            required
                            placeholder="Write your complete blog article here. You can directly paste raw HTML tags (<h2>, <p>, <ul>, <li>, <blockquote>, <img>) or write plain text paragraphs. It will automatically render as rich formatted text on the website..."
                            value={blogForm.content}
                            onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs text-slate-800 focus:outline-none focus:border-emerald-600 leading-relaxed shadow-inner"
                          />
                          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-1">
                            <span>Words: {stripHtml(blogForm.content).split(/\s+/).filter(Boolean).length} words</span>
                            <span>Direct HTML tags will be parsed and rendered on the website</span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 bg-white border-2 border-dashed border-emerald-300 rounded-2xl min-h-[220px] max-h-[400px] overflow-y-auto space-y-4 text-stone-800">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                            Live Render Preview
                          </div>
                          {blogForm.content ? (
                            <div 
                              className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-[#0F382C] prose-p:text-stone-700 prose-p:leading-relaxed prose-li:text-stone-700 prose-a:text-[#C8933E] prose-img:rounded-2xl prose-blockquote:border-l-[#C8933E] prose-blockquote:bg-stone-50 prose-blockquote:p-3 prose-blockquote:rounded-r-xl"
                              dangerouslySetInnerHTML={{ __html: blogForm.content }} 
                            />
                          ) : (
                            <p className="text-slate-400 italic text-xs">No article content written yet. Switch to Editor tab to add content.</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Publish Submit Button */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                      <div className="text-[11px] text-slate-500 font-medium">
                        Live SEO Score: <strong className={scoreColor.split(' ')[0]}>{seoResult.score}/100</strong> • Will be instantly visible on public Blogs page
                      </div>
                      <button
                        type="submit"
                        className="bg-[#0F382C] hover:bg-[#0A261E] text-white px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer shrink-0"
                      >
                        <BookOpen className="w-4 h-4 text-[#C8933E]" />
                        <span>Publish Blog Article ({seoResult.score} Score)</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Published Blogs Grid */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">
                      Published Blog Articles ({blogs.length})
                    </h4>
                    <span className="text-xs text-slate-400 font-semibold">Managed live in database</span>
                  </div>

                  {blogs.length === 0 ? (
                    <div className="bg-white rounded-3xl p-10 text-center border border-stone-200 text-slate-400 space-y-2">
                      <BookOpen className="w-10 h-10 mx-auto text-slate-300" />
                      <p className="font-bold text-sm text-slate-600">No blog articles published yet.</p>
                      <p className="text-xs">Use the form above to write and publish your first SEO-optimized travel blog!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {blogs.map((blog) => {
                        const targetId = blog.id || blog._id;
                        const cleanSummary = stripHtml(blog.subtitle || blog.content);
                        const blogScore = blog.seoScore || 85;
                        const blogScoreColor = blogScore >= 80 ? 'bg-emerald-600 text-white' : blogScore >= 50 ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white';

                        return (
                          <div key={targetId} className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm flex flex-col justify-between">
                            <div className="relative h-44">
                              <img src={blog.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'} alt={blog.title} className="w-full h-full object-cover" />
                              <span className="absolute top-3 left-3 bg-[#0F382C]/90 backdrop-blur-xs text-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                                {blog.category || 'Travel Guide'}
                              </span>
                              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-lg shadow-sm ${blogScoreColor}`}>
                                  SEO {blogScore}
                                </span>
                                <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-lg border border-white/20">
                                  {blog.readTime || '5 min'}
                                </span>
                              </div>
                            </div>

                            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                              <div>
                                <span className="text-[10px] text-[#C8933E] font-bold block uppercase tracking-wider">
                                  By {blog.author || 'Samika Holiday Travel Desk'} {blog.location && `• ${blog.location}`}
                                </span>
                                <h4 className="font-serif text-base font-bold text-slate-900 leading-snug mt-1 line-clamp-2">
                                  {blog.title}
                                </h4>
                                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                  {cleanSummary}
                                </p>
                              </div>

                              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px]">
                                <span className="text-slate-400 font-medium">
                                  {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Published'}
                                </span>
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Delete blog article "${blog.title}"?`)) {
                                      if (onDeleteBlog) onDeleteBlog(targetId);
                                      showNotification('Blog article deleted!');
                                    }
                                  }}
                                  className="text-red-600 hover:bg-red-50 p-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            );
          })()}


        </main>

      </div>

      {/* Payment Update Modal */}
      {paymentModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-500" />
                <h3 className="font-extrabold text-base text-slate-900">Update Payment Record</h3>
              </div>
              <button onClick={() => setPaymentModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl text-xs space-y-1">
              <div className="font-extrabold text-slate-900">{selectedEnquiry.name}</div>
              <div className="text-slate-500">{selectedEnquiry.service} • {selectedEnquiry.destination}</div>
            </div>

            <form onSubmit={handleSavePayment} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Total Booking Amount (₹)</label>
                <input
                  type="number"
                  value={paymentForm.totalAmount}
                  onChange={(e) => setPaymentForm({ ...paymentForm, totalAmount: e.target.value })}
                  placeholder="e.g. 25000"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Paid / Advance Amount (₹)</label>
                <input
                  type="number"
                  value={paymentForm.paidAmount}
                  onChange={(e) => setPaymentForm({ ...paymentForm, paidAmount: e.target.value })}
                  placeholder="e.g. 10000"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Payment Status</label>
                <select
                  value={paymentForm.paymentStatus}
                  onChange={(e) => setPaymentForm({ ...paymentForm, paymentStatus: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-none cursor-pointer"
                >
                  <option value="Unpaid">Unpaid (0% Received)</option>
                  <option value="Partial">Partial (Advance Deposited)</option>
                  <option value="Paid">Fully Paid (100% Settled)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Payment Method</label>
                <select
                  value={paymentForm.paymentMethod}
                  onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-none cursor-pointer"
                >
                  <option value="UPI (GPay / PhonePe / Paytm)">UPI (GPay / PhonePe / Paytm)</option>
                  <option value="Credit / Debit Card">Credit / Debit Card</option>
                  <option value="Bank Transfer (NEFT/RTGS)">Bank Transfer (NEFT/RTGS)</option>
                  <option value="Cash at Counter">Cash at Counter</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPaymentModalOpen(false)}
                  className="w-1/2 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-md transition-all"
                >
                  Save Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
