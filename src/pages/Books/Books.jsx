import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BOOKS_DATA, CATEGORIES } from "../../data/books";
import { BookCard } from "../../components/BookCard/BookCard";
import { QuickViewModal } from "../../components/QuickViewModal/QuickViewModal";
import { IslamicPattern } from "../../components/IslamicPattern/IslamicPattern";
import { Search, SlidersHorizontal, RefreshCw, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import "./Books.css";

export const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "جميع التصنيفات";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(300);
  const [sortBy, setSortBy] = useState("featured");
  const [quickViewBook, setQuickViewBook] = useState(null);

  // Sync category param if URL changes
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Max price calculation
  const maxPriceInCatalog = useMemo(() => {
    return Math.max(...BOOKS_DATA.map((b) => b.price), 300);
  }, []);

  // Filter & Sort Logic
  const filteredBooks = useMemo(() => {
    return BOOKS_DATA.filter((book) => {
      // Search term
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.titleArabic.includes(searchQuery) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.authorArabic && book.authorArabic.includes(searchQuery)) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === "جميع التصنيفات" ||
        book.category === selectedCategory;

      // Price Filter
      const matchesPrice = book.price <= priceRange;

      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "newest") return b.publicationYear - a.publicationYear;
      if (sortBy === "oldest") return a.publicationYear - b.publicationYear;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // default featured
    });
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("جميع التصنيفات");
    setPriceRange(maxPriceInCatalog);
    setSortBy("featured");
    setSearchParams({});
  };

  return (
    <div className="books-page">
      {/* Page Header Header Banner */}
      <section className="books-hero">
        <IslamicPattern opacity={0.07} />
        <div className="container">
          <div className="books-hero-content font-arabic">
            <span className="section-subtitle">
              المطبوعات والتحقيقات الشرعية
            </span>
            <h1 className="books-hero-title">المكتبة الشاملة والفهرس العام</h1>
            <p className="books-hero-desc">
              استعرض وبحث في مجموعات دار الخير الشاملة لأمهات كتب التفسير،
              الحديث الشريف، الفقه، والتاريخ الإسلامي المحققة.
            </p>
          </div>
        </div>
      </section>

      <section className="catalog-section">
        <div className="container">
          <div className="catalog-layout">
            {/* Sidebar Controls Filter Box */}
            <aside className="filters-sidebar font-arabic">
              <div className="sidebar-header">
                <div className="sidebar-title-box">
                  <SlidersHorizontal size={20} className="gold-icon" />
                  <h3>تصفية الفهرس</h3>
                </div>
                <button
                  onClick={resetFilters}
                  className="reset-btn"
                  title="إعادة تعيين الفلاتر"
                >
                  <RefreshCw size={14} />
                  <span>إعادة ضبط</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="filter-group">
                <label className="filter-label">البحث عن كتاب أو مؤلف</label>
                <div className="search-input-wrapper">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="اسم الكتاب، المؤلف، أو الرقم المعياري..."
                    className="filter-input font-arabic"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="filter-group">
                <label className="filter-label">القسم والعلوم الشرعية</label>
                <div className="category-pills-list">
                  {CATEGORIES.map((cat, idx) => (
                    <button
                      key={idx}
                      className={`cat-pill ${selectedCategory === cat ? "active" : ""}`}
                      onClick={() => {
                        setSelectedCategory(cat);
                        if (cat === "جميع التصنيفات") setSearchParams({});
                        else setSearchParams({ category: cat });
                      }}
                    >
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="filter-group">
                <div className="price-header">
                  <label className="filter-label">السعر الأعلى</label>
                  <span className="price-val">${priceRange}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max={maxPriceInCatalog}
                  step="5"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="price-slider"
                />
                <div className="price-limits">
                  <span>$20</span>
                  <span>${maxPriceInCatalog}</span>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="catalog-main">
              {/* Toolbar Header */}
              <div className="catalog-toolbar font-arabic">
                <div className="results-count">
                  عرض <strong>{filteredBooks.length}</strong> من إجمالي{" "}
                  <strong>{BOOKS_DATA.length}</strong> مطبوعة
                </div>

                <div className="sort-box">
                  <label htmlFor="sort-select">الترتيب حسب:</label>
                  <div className="select-wrapper">
                    <select
                      id="sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="sort-select font-arabic"
                    >
                      <option value="featured">الإصدارات المختارة</option>
                      <option value="price-desc">السعر: من الأعلى للأقل</option>
                      <option value="price-asc">السعر: من الأقل للأعلى</option>
                      <option value="rating">الأعلى تقييماً</option>
                      <option value="newest">الأحدث طباعة</option>
                      <option value="oldest">الأقدم إصداراً</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Grid or Empty state */}
              {filteredBooks.length > 0 ? (
                <motion.div
                  className="books-catalog-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {filteredBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      onQuickView={(b) => setQuickViewBook(b)}
                    />
                  ))}
                </motion.div>
              ) : (
                <div className="no-results-card font-arabic">
                  <BookOpen size={48} className="gold-icon mb-3" />
                  <h3>لم يتم العثور على كتب تطابق البحث</h3>
                  <p>
                    يرجى تغيير كلمات البحث، أو تصفير فلاتر الأقسام والأسعار.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="btn-gold mt-3 font-arabic"
                  >
                    إعادة ضبط جميع الفلاتر
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      <QuickViewModal
        book={quickViewBook}
        onClose={() => setQuickViewBook(null)}
      />
    </div>
  );
};
