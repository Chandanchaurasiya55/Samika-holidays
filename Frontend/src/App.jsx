import { useState, useEffect, Suspense, lazy } from 'react';
import { API_BASE_URL } from './config';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy-loaded Pages & Components (Code Splitting)
const HomePage = lazy(() => import('./pages/HomePage'));
const HotelsPage = lazy(() => import('./pages/HotelsPage'));
const DestinationsPage = lazy(() => import('./pages/DestinationsPage'));
const TourPackagesPage = lazy(() => import('./pages/TourPackagesPage'));
const PackageDetailPage = lazy(() => import('./pages/PackageDetailPage'));
const HotelDetailPage = lazy(() => import('./pages/HotelDetailPage'));
const WeddingsPage = lazy(() => import('./pages/WeddingsPage'));
const CorporatePage = lazy(() => import('./pages/CorporatePage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const ContactUsPage = lazy(() => import('./pages/ContactUsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const AdminLoginPage = lazy(() => import('./components/AdminLoginPage'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const UserDashboard = lazy(() => import('./components/UserDashboard'));
const EnquiryModal = lazy(() => import('./components/EnquiryModal'));
const LoginModal = lazy(() => import('./components/LoginModal'));

// Luxury Brand Fallback Loader
function PageLoader() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center space-y-4 px-4 bg-[#FAF7F2]/40 animate-in fade-in duration-300">
      <div className="relative">
        <div className="w-14 h-14 rounded-full border-3 border-stone-200 border-t-[#0F382C] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-[#C8933E] rounded-full animate-ping" />
        </div>
      </div>
      <div className="text-center space-y-1">
        <p className="font-serif text-base font-bold text-[#0F382C] tracking-wide">
          Samika Holidays
        </p>
        <p className="text-xs text-stone-500 font-medium tracking-wider uppercase">
          Loading Experiences...
        </p>
      </div>
    </div>
  );
}

export const createSlug = (text) => {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export default function App() {
  // Modals & Auth State with localStorage Persistence
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return (localStorage.getItem('samika_is_user_logged_in') || localStorage.getItem('atithya_is_user_logged_in')) === 'true';
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return (localStorage.getItem('samika_is_admin_auth') || localStorage.getItem('atithya_is_admin_auth')) === 'true';
  });

  // Navigation tab state ('home' default)
  const [activeTab, setActiveTab] = useState(() => {
    const isAuth = (localStorage.getItem('samika_is_admin_auth') || localStorage.getItem('atithya_is_admin_auth')) === 'true';
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('admin') || path.includes('/admin')) {
      return isAuth ? 'admin' : 'admin-login';
    }
    const saved = localStorage.getItem('samika_active_tab') || localStorage.getItem('atithya_active_tab');
    if (saved === 'admin' && !isAuth) return 'admin-login';
    return saved || 'home';
  });

  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryTitle, setEnquiryTitle] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Sync auth & tab state to localStorage
  useEffect(() => {
    localStorage.setItem('samika_is_user_logged_in', isLoggedIn ? 'true' : 'false');
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('samika_is_admin_auth', isAdminAuthenticated ? 'true' : 'false');
  }, [isAdminAuthenticated]);

  useEffect(() => {
    localStorage.setItem('samika_active_tab', activeTab);
    const titles = {
      home: 'Samika Holidays | Luxury Hotels, Resorts & Tour Packages in Uttarakhand',
      hotels: 'Luxury Hotels & Resorts in Uttarakhand | Samika Holidays',
      packages: 'Tour Packages in Uttarakhand | Samika Holidays',
      destinations: 'Popular Destinations in Uttarakhand | Samika Holidays',
      weddings: 'Destination Weddings in Uttarakhand | Samika Holidays',
      corporate: 'Corporate Tours & Retreats | Samika Holidays',
      blogs: 'Travel Blogs & Guides | Samika Holidays',
      'blog-detail': 'Blog Article | Samika Holidays',
      about: 'About Us | Samika Holidays',
      contact: 'Contact Us | Samika Holidays',
      admin: 'Admin Panel | Samika Holidays',
      'admin-login': 'Admin Login | Samika Holidays'
    };
    document.title = titles[activeTab] || 'Samika Holidays | Luxury Travel Partner in Uttarakhand';
  }, [activeTab]);

  // --- DYNAMIC DATA STATES (Managed 100% via Admin Panel & Backend) ---
  const [blogs, setBlogs] = useState(() => {
    const local = localStorage.getItem('samika_blogs') || localStorage.getItem('atithya_blogs');
    return local ? JSON.parse(local) : [];
  });

  const [enquiries, setEnquiries] = useState(() => {
    const local = localStorage.getItem('samika_enquiries') || localStorage.getItem('atithya_enquiries');
    return local ? JSON.parse(local) : [];
  });

  const [packages, setPackages] = useState(() => {
    const local = localStorage.getItem('samika_packages') || localStorage.getItem('atithya_packages');
    return local ? JSON.parse(local) : [];
  });

  const [hotels, setHotels] = useState(() => {
    const local = localStorage.getItem('samika_hotels') || localStorage.getItem('atithya_hotels');
    return local ? JSON.parse(local) : [];
  });

  const [posts, setPosts] = useState(() => {
    const local = localStorage.getItem('samika_posts') || localStorage.getItem('atithya_posts');
    return local ? JSON.parse(local) : [];
  });

  const [destinations, setDestinations] = useState(() => {
    const local = localStorage.getItem('samika_destinations') || localStorage.getItem('atithya_destinations');
    return local ? JSON.parse(local) : [];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('samika_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('samika_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('samika_hotels', JSON.stringify(hotels));
  }, [hotels]);

  useEffect(() => {
    localStorage.setItem('samika_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('samika_destinations', JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem('samika_blogs', JSON.stringify(blogs));
  }, [blogs]);

  // Fetch initial data from Express Backend API
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const enqRes = await fetch(`${API_BASE_URL}/enquiries`);
        if (enqRes.ok) {
          const enqJson = await enqRes.json();
          if (enqJson.data && enqJson.data.length > 0) setEnquiries(enqJson.data);
        }

        const pkgRes = await fetch(`${API_BASE_URL}/packages`);
        if (pkgRes.ok) {
          const pkgJson = await pkgRes.json();
          if (pkgJson.data && pkgJson.data.length > 0) setPackages(pkgJson.data);
        }

        const htlRes = await fetch(`${API_BASE_URL}/hotels`);
        if (htlRes.ok) {
          const htlJson = await htlRes.json();
          if (htlJson.data && htlJson.data.length > 0) setHotels(htlJson.data);
        }

        const pstRes = await fetch(`${API_BASE_URL}/posts`);
        if (pstRes.ok) {
          const pstJson = await pstRes.json();
          if (pstJson.data && pstJson.data.length > 0) setPosts(pstJson.data);
        }

        const blgRes = await fetch(`${API_BASE_URL}/blogs`);
        if (blgRes.ok) {
          const blgJson = await blgRes.json();
          if (blgJson.data && blgJson.data.length > 0) setBlogs(blgJson.data);
        }
      } catch (err) {
        console.log('Backend API offline or connecting... using local persistent state.');
      }
    };

    fetchBackendData();
  }, []);

  // Handlers for Admin & User Operations
  const handleAddEnquiry = async (newEnq) => {
    try {
      const res = await fetch(`${API_BASE_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEnq)
      });
      if (res.ok) {
        const result = await res.json();
        if (result.data) {
          setEnquiries(prev => [result.data, ...prev]);
          return;
        }
      }
    } catch (err) { console.log(err); }

    const enqObject = {
      id: 'enq-' + Date.now(),
      ...newEnq,
      createdAt: new Date().toISOString()
    };
    setEnquiries(prev => [enqObject, ...prev]);
  };

  const handleUpdateEnquiryStatus = async (id, status) => {
    setEnquiries(prev => prev.map(e => (e.id === id || e._id === id) ? { ...e, status } : e));
    try {
      await fetch(`${API_BASE_URL}/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (err) { console.log(err); }
  };

  const handleUpdateEnquiryPayment = async (id, paymentData) => {
    setEnquiries(prev => prev.map(e => (e.id === id || e._id === id) ? { ...e, ...paymentData } : e));
    try {
      await fetch(`${API_BASE_URL}/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      });
    } catch (err) { console.log(err); }
  };

  const handleDeleteEnquiry = async (id) => {
    setEnquiries(prev => prev.filter(e => e.id !== id && e._id !== id));
    try {
      await fetch(`${API_BASE_URL}/enquiries/${id}`, { method: 'DELETE' });
    } catch (err) { console.log(err); }
  };

  const handleAddPackage = async (newPkg) => {
    try {
      const res = await fetch(`${API_BASE_URL}/packages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPkg)
      });
      if (res.ok) {
        const result = await res.json();
        if (result.data) {
          setPackages(prev => [result.data, ...prev]);
          return;
        }
      }
    } catch (err) { console.log(err); }

    const pkgObj = {
      id: 'pkg-' + Date.now(),
      badge: 'Popular',
      badgeColor: 'bg-[#0F382C]',
      rating: '5.0 (New)',
      ...newPkg
    };
    setPackages(prev => [pkgObj, ...prev]);
  };

  const handleDeletePackage = async (id) => {
    setPackages(prev => prev.filter(p => p.id !== id && p._id !== id));
    try {
      await fetch(`${API_BASE_URL}/packages/${id}`, { method: 'DELETE' });
    } catch (err) { console.log(err); }
  };

  const handleAddHotel = async (newHtl) => {
    try {
      const res = await fetch(`${API_BASE_URL}/hotels`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHtl)
      });
      if (res.ok) {
        const result = await res.json();
        if (result.data) {
          setHotels(prev => [result.data, ...prev]);
          return;
        }
      }
    } catch (err) { console.log(err); }

    const htlObj = {
      id: 'htl-' + Date.now(),
      rating: '4.9 (New)',
      ...newHtl
    };
    setHotels(prev => [htlObj, ...prev]);
  };

  const handleDeleteHotel = async (id) => {
    setHotels(prev => prev.filter(h => h.id !== id && h._id !== id));
    try {
      await fetch(`${API_BASE_URL}/hotels/${id}`, { method: 'DELETE' });
    } catch (err) { console.log(err); }
  };

  const handleAddPost = async (newPst) => {
    try {
      const res = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPst)
      });
      if (res.ok) {
        const result = await res.json();
        if (result.data) {
          setPosts(prev => [result.data, ...prev]);
          return;
        }
      }
    } catch (err) { console.log(err); }

    const pstObj = {
      id: 'post-' + Date.now(),
      createdAt: new Date().toISOString(),
      ...newPst
    };
    setPosts(prev => [pstObj, ...prev]);
  };

  const handleDeletePost = async (id) => {
    setPosts(prev => prev.filter(p => p.id !== id && p._id !== id));
    try {
      await fetch(`${API_BASE_URL}/posts/${id}`, { method: 'DELETE' });
    } catch (err) { console.log(err); }
  };

  const handleAddDestination = async (newDest) => {
    const destObj = {
      id: 'dest-' + Date.now(),
      rating: '4.8',
      iconType: newDest.iconType || 'paw',
      nightInfo: newDest.nightInfo || 'Tour Package • 1 Night',
      ...newDest
    };
    setDestinations(prev => [destObj, ...prev]);
  };

  const handleDeleteDestination = async (id) => {
    setDestinations(prev => prev.filter(d => (d.id || d._id) !== id));
  };

  const handleAddBlog = async (newBlog) => {
    try {
      const res = await fetch(`${API_BASE_URL}/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog)
      });
      if (res.ok) {
        const result = await res.json();
        if (result.data) {
          setBlogs(prev => [result.data, ...prev]);
          return;
        }
      }
    } catch (err) { console.log(err); }

    const blogObj = {
      id: 'blog-' + Date.now(),
      createdAt: new Date().toISOString(),
      ...newBlog
    };
    setBlogs(prev => [blogObj, ...prev]);
  };

  const handleDeleteBlog = async (id) => {
    setBlogs(prev => prev.filter(b => b.id !== id && b._id !== id));
    try {
      await fetch(`${API_BASE_URL}/blogs/${id}`, { method: 'DELETE' });
    } catch (err) { console.log(err); }
  };

  const handleSelectBlog = (blog) => {
    setSelectedBlog(blog);
    setActiveTab('blog-detail');
    const slug = createSlug(blog.title || blog.id);
    window.history.pushState(null, '', `#/blog/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // URL routing & Popstate listener
  useEffect(() => {
    const handleUrlRoute = () => {
      const rawPath = window.location.pathname.toLowerCase();
      const rawHash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
      const path = rawHash || rawPath;
      const isStoredAdmin = (localStorage.getItem('samika_is_admin_auth') || localStorage.getItem('atithya_is_admin_auth')) === 'true';

      // Check /package/:slug
      if (path.includes('/package/') || path.startsWith('package/')) {
        const parts = path.split('/').filter(Boolean);
        const slug = parts[parts.length - 1];
        const found = packages.find(p => createSlug(p.title) === slug || p.id === slug || createSlug(p.id) === slug);
        if (found) {
          setSelectedPackage(found);
          setActiveTab('package-detail');
          return;
        }
      }

      // Check /hotel/:slug
      if (path.includes('/hotel/') || path.startsWith('hotel/')) {
        const parts = path.split('/').filter(Boolean);
        const slug = parts[parts.length - 1];
        const found = hotels.find(h => createSlug(h.name) === slug || h.id?.toString() === slug || createSlug(h.id?.toString()) === slug);
        if (found) {
          setSelectedHotel(found);
          setActiveTab('hotel-detail');
          return;
        }
      }

      // Check /blog/:slug
      if (path.includes('/blog/') || path.startsWith('blog/')) {
        const parts = path.split('/').filter(Boolean);
        const slug = parts[parts.length - 1];
        const found = blogs.find(b => createSlug(b.title) === slug || b.id === slug || createSlug(b.id) === slug);
        if (found) {
          setSelectedBlog(found);
          setActiveTab('blog-detail');
          return;
        }
      }

      if (path.includes('admin-login') || path.includes('admin/login')) {
        setActiveTab('admin-login');
        return;
      }

      if (path.includes('admin')) {
        setActiveTab(isStoredAdmin || isAdminAuthenticated ? 'admin' : 'admin-login');
        return;
      }

      if (path.includes('hotels')) {
        setActiveTab('hotels');
        return;
      }
      if (path.includes('packages')) {
        setActiveTab('packages');
        return;
      }
      if (path.includes('destinations')) {
        setActiveTab('destinations');
        return;
      }
      if (path.includes('weddings')) {
        setActiveTab('weddings');
        return;
      }
      if (path.includes('corporate')) {
        setActiveTab('corporate');
        return;
      }
      if (path.includes('blogs') || path.includes('blog')) {
        setActiveTab('blogs');
        return;
      }
      if (path.includes('about')) {
        setActiveTab('about');
        return;
      }
      if (path.includes('contact')) {
        setActiveTab('contact');
        return;
      }
      if (path.includes('dashboard')) {
        setActiveTab('dashboard');
        return;
      }
      if (path === '/' || path === '' || path === '/home' || path === 'home') {
        setActiveTab('home');
        return;
      }
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    window.addEventListener('hashchange', handleUrlRoute);
    return () => {
      window.removeEventListener('popstate', handleUrlRoute);
      window.removeEventListener('hashchange', handleUrlRoute);
    };
  }, [packages, hotels, isAdminAuthenticated]);

  const handleOpenEnquiry = (title = '') => {
    setEnquiryTitle(title);
    setEnquiryModalOpen(true);
  };

  const handleNavigate = (tab, data = null) => {
    if (tab === 'packages' && typeof data !== 'string') {
      setPackageFilterDest('');
    }
    setActiveTab(tab);
    if (tab === 'package-detail' && data) {
      setSelectedPackage(data);
      const slug = createSlug(data.title || data.id);
      window.history.pushState({ tab: 'package-detail', id: data.id }, '', `/package/${slug}`);
    } else if (tab === 'hotel-detail' && data) {
      setSelectedHotel(data);
      const slug = createSlug(data.name || data.id);
      window.history.pushState({ tab: 'hotel-detail', id: data.id }, '', `/hotel/${slug}`);
    } else if (tab === 'home') {
      window.history.pushState({ tab: 'home' }, '', '/');
    } else if (tab === 'admin') {
      window.history.pushState({ tab: 'admin' }, '', '/admin');
    } else if (tab === 'admin-login') {
      window.history.pushState({ tab: 'admin-login' }, '', '/admin/login');
    } else {
      window.history.pushState({ tab }, '', `/${tab}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPackage = (pkg) => {
    handleNavigate('package-detail', pkg);
  };

  const handleSelectHotel = (hotel) => {
    handleNavigate('hotel-detail', hotel);
  };

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    localStorage.setItem('samika_is_user_logged_in', 'true');
    if (userData) {
      localStorage.setItem('samika_current_user', JSON.stringify(userData));
    }
    handleNavigate('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('samika_is_user_logged_in', 'false');
    localStorage.removeItem('samika_current_user');
    localStorage.removeItem('atithya_current_user');
    handleNavigate('home');
  };

  const handleAdminLoginSuccess = (adminUser) => {
    setIsAdminAuthenticated(true);
    localStorage.setItem('samika_is_admin_auth', 'true');
    if (adminUser) {
      localStorage.setItem('samika_current_user', JSON.stringify(adminUser));
    }
    handleNavigate('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.setItem('samika_is_admin_auth', 'false');
    localStorage.setItem('samika_active_tab', 'admin-login');
    localStorage.removeItem('samika_current_user');
    localStorage.removeItem('atithya_current_user');
    handleNavigate('admin-login');
  };
  const [packageFilterDest, setPackageFilterDest] = useState('');

  const handleNavigateToPackages = (dest = '') => {
    setPackageFilterDest(dest);
    handleNavigate('packages');
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 antialiased selection:bg-[#C8933E] selection:text-white">
      {/* Universal Sticky Glassmorphic Navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
        onOpenLogin={() => setLoginModalOpen(true)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        isAdminAuthenticated={isAdminAuthenticated}
        onAdminLogout={handleAdminLogout}
      />

      {/* Main Content Router with Lazy Loading Suspense */}
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          {activeTab === 'home' && (
            <HomePage
              onOpenEnquiry={handleOpenEnquiry}
              onSelectPackage={handleSelectPackage}
              onSelectHotel={handleSelectHotel}
              onSelectBlog={handleSelectBlog}
              setActiveTab={handleNavigate}
              featuredPackages={packages}
              packagesList={packages}
              hotelsList={hotels}
              destinationsList={destinations}
              blogsList={blogs}
              onNavigateToPackages={handleNavigateToPackages}
            />
          )}

          {activeTab === 'hotels' && (
            <HotelsPage
              onOpenEnquiry={handleOpenEnquiry}
              onSelectHotel={handleSelectHotel}
              hotelsList={hotels}
              postsList={posts.filter(p => p.page === 'hotels')}
            />
          )}

          {activeTab === 'hotel-detail' && (
            <HotelDetailPage
              hotel={selectedHotel}
              onBack={() => handleNavigate('hotels')}
              onOpenEnquiry={handleOpenEnquiry}
              allHotels={hotels}
              onSelectHotel={handleSelectHotel}
            />
          )}

          {activeTab === 'destinations' && (
            <DestinationsPage
              onOpenEnquiry={handleOpenEnquiry}
              setActiveTab={handleNavigate}
              destinationsList={destinations}
              postsList={posts.filter(p => p.page === 'destinations')}
            />
          )}

          {activeTab === 'packages' && (
            <TourPackagesPage
              onOpenEnquiry={handleOpenEnquiry}
              onSelectPackage={handleSelectPackage}
              packagesList={packages}
              initialDestination={packageFilterDest}
            />
          )}

          {activeTab === 'package-detail' && (
            <PackageDetailPage
              pkg={selectedPackage}
              onBack={() => handleNavigate('packages')}
              onOpenEnquiry={handleOpenEnquiry}
              allPackages={packages}
              onSelectPackage={handleSelectPackage}
            />
          )}

          {activeTab === 'weddings' && (
            <WeddingsPage 
              onOpenEnquiry={handleOpenEnquiry} 
              postsList={posts.filter(p => p.page === 'weddings')}
            />
          )}

          {activeTab === 'corporate' && (
            <CorporatePage 
              onOpenEnquiry={handleOpenEnquiry} 
              postsList={posts.filter(p => p.page === 'corporate')}
            />
          )}

          {activeTab === 'blogs' && (
            <BlogPage
              blogsList={blogs}
              onSelectBlog={handleSelectBlog}
              onOpenEnquiry={handleOpenEnquiry}
            />
          )}

          {activeTab === 'blog-detail' && (
            <BlogDetailPage
              blog={selectedBlog}
              onBack={() => handleNavigate('blogs')}
              onOpenEnquiry={handleOpenEnquiry}
              onSelectBlog={handleSelectBlog}
              allBlogs={blogs}
            />
          )}

          {activeTab === 'about' && (
            <AboutUsPage onOpenEnquiry={handleOpenEnquiry} />
          )}

          {activeTab === 'contact' && (
            <ContactUsPage onAddEnquiry={handleAddEnquiry} />
          )}

          {activeTab === 'dashboard' && (
            <UserDashboard
              enquiries={enquiries}
              packages={packages}
              onOpenEnquiry={handleOpenEnquiry}
              onLogout={handleLogout}
              setActiveTab={handleNavigate}
            />
          )}

          {activeTab === 'admin-login' && (
            <AdminLoginPage
              onAdminLoginSuccess={handleAdminLoginSuccess}
            />
          )}

          {activeTab === 'admin' && (
            <AdminPanel
              enquiries={enquiries}
              packages={packages}
              hotels={hotels}
              posts={posts}
              destinations={destinations}
              blogs={blogs}
              onUpdateEnquiryStatus={handleUpdateEnquiryStatus}
              onUpdateEnquiryPayment={handleUpdateEnquiryPayment}
              onDeleteEnquiry={handleDeleteEnquiry}
              onAddPackage={handleAddPackage}
              onDeletePackage={handleDeletePackage}
              onAddHotel={handleAddHotel}
              onDeleteHotel={handleDeleteHotel}
              onAddPost={handleAddPost}
              onDeletePost={handleDeletePost}
              onAddDestination={handleAddDestination}
              onDeleteDestination={handleDeleteDestination}
              onAddBlog={handleAddBlog}
              onDeleteBlog={handleDeleteBlog}
              onAdminLogout={handleAdminLogout}
            />
          )}
        </Suspense>
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* Quick Enquiry Modal & Login Modal (Lazy Loaded) */}
      <Suspense fallback={null}>
        {enquiryModalOpen && (
          <EnquiryModal
            isOpen={enquiryModalOpen}
            onClose={() => setEnquiryModalOpen(false)}
            defaultPackageTitle={enquiryTitle}
            onAddEnquiry={handleAddEnquiry}
            onNavigateToDashboard={() => handleNavigate('dashboard')}
            isLoggedIn={isLoggedIn}
          />
        )}

        {loginModalOpen && (
          <LoginModal
            isOpen={loginModalOpen}
            onClose={() => setLoginModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
            onAdminLoginSuccess={handleAdminLoginSuccess}
          />
        )}
      </Suspense>

    </div>
  );
}
