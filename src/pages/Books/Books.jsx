import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
// استدعاء البيانات من ملف json الجديد
import booksData from "../../data/Books.json";
import { BookCard } from "../../components/BookCard/BookCard";
import { QuickViewModal } from "../../components/QuickViewModal/QuickViewModal";
import { IslamicPattern } from "../../components/IslamicPattern/IslamicPattern";
import { Search, SlidersHorizontal, RefreshCw, BookOpen } from "lucide-react";
import { motion } from "framer-motion"; // تم تعديل المسار ليكون framer-motion القياسي (تأكد من الحزمة لديك)
import "./Books.css";

// استخراج التصنيفات ديناميكياً من البيانات
const CATEGORIES = [
  "جميع التصنيفات",
  ...new Set(booksData.map((book) => book.category)),
];

export const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "جميع التصنيفات";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(300);
  const [sortBy, setSortBy] = useState("featured");
  const [quickViewBook, setQuickViewBook] = useState(null);

  // تحديث التصنيف إذا تغير الرابط
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // حساب أعلى سعر في الكتالوج ديناميكياً
  const maxPriceInCatalog = useMemo(() => {
    const max = Math.max(...booksData.map((b) => b.price));
    return max < 50 ? 50 : max; // وضع حد أدنى منطقي لشريط السحب
  }, []);

  // ضبط شريط السعر عند التحميل الأولي
  useEffect(() => {
    setPriceRange(maxPriceInCatalog);
  }, [maxPriceInCatalog]);

  // منطق الفلترة والترتيب بناءً على الهيكلية الجديدة
  const filteredBooks = useMemo(() => {
    return booksData
      .filter((book) => {
        const query = searchQuery.toLowerCase();
        // البحث في العنوان، المؤلف، دار النشر، والرقم المعياري
        const matchesSearch =
          (book.title && book.title.toLowerCase().includes(query)) ||
          (book.author && book.author.toLowerCase().includes(query)) ||
          (book.publisher && book.publisher.toLowerCase().includes(query)) ||
          (book.ISBN && book.ISBN.toString().toLowerCase().includes(query)) ||
          (book.category && book.category.toLowerCase().includes(query));

        // فلتر التصنيف
        const matchesCategory =
          selectedCategory === "جميع التصنيفات" ||
          book.category === selectedCategory;

        // فلتر السعر
        const matchesPrice = book.price <= priceRange;

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "newest") return b.year - a.year; // بناء على حقل year
        if (sortBy === "oldest") return a.year - b.year;
        return 0; // الافتراضي
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
      {/* القسم العلوي (الترويسة) */}
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
            {/* شريط الفلاتر الجانبي */}
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

              {/* مربع البحث */}
              <div className="filter-group">
                <label className="filter-label">البحث عن كتاب أو مؤلف</label>
                <div className="search-input-wrapper">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="اسم الكتاب، المؤلف، دار النشر"
                    className="filter-input font-arabic"
                  />
                </div>
              </div>

              {/* فلتر الأقسام (مولد ديناميكياً) */}
              <div className="filter-group">
                <label className="filter-label">القسم والعلوم الشرعية</label>
                <div className="category-pills-list">
                  {CATEGORIES.map((cat, idx) => (
                    <button
                      key={idx}
                      className={`cat-pill ${
                        selectedCategory === cat ? "active" : ""
                      }`}
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

              {/* فلتر السعر */}
              <div className="filter-group">
                <div className="price-header">
                  <label className="filter-label">السعر الأعلى</label>
                  <span className="price-val">${priceRange}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max={maxPriceInCatalog}
                  step="1"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="price-slider"
                />
                <div className="price-limits">
                  <span>$5</span>
                  <span>${maxPriceInCatalog}</span>
                </div>
              </div>
            </aside>

            {/* منطقة عرض الكتب الرئيسية */}
            <main className="catalog-main">
              {/* شريط الأدوات */}
              <div className="catalog-toolbar font-arabic">
                <div className="results-count">
                  عرض <strong>{filteredBooks.length}</strong> من إجمالي{" "}
                  <strong>{booksData.length}</strong> مطبوعة
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
                      <option value="featured">الافتراضي (المميزة)</option>
                      <option value="price-desc">السعر: من الأعلى للأقل</option>
                      <option value="price-asc">السعر: من الأقل للأعلى</option>
                      <option value="newest">سنة النشر: الأحدث</option>
                      <option value="oldest">سنة النشر: الأقدم</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* شبكة الكتب أو رسالة عدم وجود نتائج */}
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

      {/* نافذة العرض السريع */}
      <QuickViewModal
        book={quickViewBook}
        onClose={() => setQuickViewBook(null)}
      />
    </div>
  );
};
/*
{
    "id": 19,
    "title": "شرح معاني الصلاة",
    "author": "د. ماهر ياسين الفحل",
    "publisher": "دار الخير ناشرون ومؤسسة دار الحديث",
    "category": "حديث",
    "ISBN": "978-9933-902-11-7",
    "year": 2025,
    "price": 10
  },
  {
    "id": 20,
    "title": "رياض الصالحين من كلام سيد المرسلين",
    "author": "د. ماهر ياسين الفحل",
    "publisher": "دار الخير ناشرون ومؤسسة دار الحديث",
    "category": "حديث",
    "ISBN": "9.78626E+11",
    "year": 2025,
    "price": 20
  },
  {
    "id": 21,
    "title": "تيسير الجامع في العلل والفوائد",
    "author": "د. ماهر ياسين الفحل",
    "publisher": "دار الخير ناشرون ومؤسسة دار الحديث",
    "category": "حديث",
    "ISBN": "9.78986E+12",
    "year": 2026,
    "price": 30
  },
  {
    "id": 22,
    "title": "أسباب نزول القرآن",
    "author": "د. ماهر ياسين الفحل",
    "publisher": "دار الخير ناشرون ومؤسسة دار الحديث",
    "category": "حديث",
    "ISBN": "9.78993E+12",
    "year": 2025,
    "price": 30
  }
*/
