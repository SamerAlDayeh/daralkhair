import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BOOKS_DATA, CATEGORIES } from "../../data/books";
import SPECIAL_OFFERS from "../../data/offers.json";
import { BookCard } from "../../components/BookCard/BookCard";
import { QuickViewModal } from "../../components/QuickViewModal/QuickViewModal";
import { IslamicPattern } from "../../components/IslamicPattern/IslamicPattern";
import { GoldBorderFrame } from "../../components/GoldBorderFrame/GoldBorderFrame";
import {
  Award,
  Users,
  ShieldCheck,
  Truck,
  ArrowLeft,
  Feather,
  Quote,
  Star,
} from "lucide-react";
import "./Home.css";
import sliderImg1 from "../../Imgs/Slider-1.jpeg";
import sliderImg2 from "../../Imgs/Slider-2.jpeg";

// بيانات آراء العملاء والعلماء
const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "د. عبد الرحمن السالم",
    role: "أستاذ الفقه المقارن - جامعة أم القرى",
    comment:
      "تتميز مطبوعات دار الخير بفرادة التحقيق وجودة الورق والتذهيب الفاخر، تحف تراثية تستحق أن تقتنى في كل مكتبة علمية عامرة.",
    rating: 5,
  },
  {
    id: 2,
    name: "الشيخ محمد بن علي الشنقيطي",
    role: "باحث في علوم القرآن والتفسير",
    comment:
      "إن الاهتمام بالضبط اللغوي وإخراج النص المحقق بهذه الدقة يعكس إخلاص القائمين على الدار ورعايتهم لتراث الأمة بكل أمانة.",
    rating: 5,
  },
  {
    id: 3,
    name: "د. فاطمة الزهراء البكري",
    role: "أستاذة التاريخ والحضارة الإسلامية",
    comment:
      "سرعة في التوصيل وتغليف فاخر يحافظ على الكتب من التلف. العناية بالطباعة والإخراج الفني لا يضاهيها سوى القيمة العلمية للمضمون.",
    rating: 5,
  },
];

export const Home = () => {
  const [quickViewBook, setQuickViewBook] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredBooks = BOOKS_DATA.slice(0, 6);

  const sliderImages = [sliderImg1, sliderImg2].filter(Boolean);

  useEffect(() => {
    if (sliderImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  return (
    <div className="home-page font-arabic">
      {/* 1. HERO SLIDER SECTION */}
      <section className="hero-slider-section">
        <div className="slider-wrapper">
          {sliderImages.map((src, index) => (
            <div
              key={index}
              className={`slider-slide ${index === currentSlide ? "active" : ""}`}
              style={{
                "--bg-img": `url(${src})`,
              }}
            >
              <div className="slider-image-box">
                <img
                  src={src}
                  alt={`عرض كتاب دار الخير ${index + 1}`}
                  className="slider-image"
                />
              </div>
            </div>
          ))}

          {sliderImages.length > 1 && (
            <div className="slider-controls">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot ${index === currentSlide ? "active" : ""}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`الانتقال للصورة ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle font-arabic">
              التخصصات والعلوم
            </span>
            <h2 className="section-title font-arabic">أقسام الدار</h2>
            <div className="ornament-divider">
              <span className="ornament-symbol">✦ ۞ ✦</span>
            </div>
          </div>

          <div className="categories-grid font-arabic">
            {CATEGORIES.filter((c) => c !== "جميع التصنيفات").map(
              (cat, idx) => (
                <Link
                  to={`/books?category=${encodeURIComponent(cat)}`}
                  key={idx}
                  className="category-card"
                >
                  <div className="category-icon-box">
                    <Feather className="category-icon" size={22} />
                  </div>
                  <div className="category-info">
                    <h3 className="category-name">{cat}</h3>
                    <span className="category-link">استعرض الإصدارات ←</span>
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      {/* 3. FEATURED BOOKS SHOWCASE */}
      <section className="books-showcase-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle font-arabic">إصدارات جديدة</span>
            <h2 className="section-title font-arabic">
              أحدثكتب وإصدارات دار الخير
            </h2>
            <div className="ornament-divider">
              <span className="ornament-symbol">✦ ۞ ✦</span>
            </div>
          </div>

          <div className="books-grid">
            {featuredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onQuickView={(b) => setQuickViewBook(b)}
              />
            ))}
          </div>

          <div className="view-more-container">
            <Link to="/books" className="btn-outline-gold font-arabic">
              <span>عرض كامل فهرس الكتب</span>
              <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SPECIAL BUNDLE OFFER BANNER */}
      <section className="offers-banner-section">
        <IslamicPattern opacity={0.06} />
        <div className="container">
          <div className="offers-banner-card font-arabic">
            <div className="offers-banner-text">
              <span className="offers-badge">عروض المجموعات الخاصة</span>
              <h2 className="offers-title">{SPECIAL_OFFERS[0].title}</h2>
              <p className="offers-desc">{SPECIAL_OFFERS[0].description}</p>
              <div className="offers-price-row">
                <span className="offer-now">
                  ${SPECIAL_OFFERS[0].offerPrice.toFixed(2)}
                </span>
                <span className="offer-was">
                  ${SPECIAL_OFFERS[0].originalPrice.toFixed(2)}
                </span>
                <span className="offer-code">
                  رمز الخصم: {SPECIAL_OFFERS[0].code}
                </span>
              </div>
              <Link
                to="/offers"
                className="btn-gold font-arabic mt-3 inline-flex"
              >
                <span>اطلب المجموعة الآن</span>
                <ArrowLeft size={16} />
              </Link>
            </div>
            <div className="offers-banner-img-box">
              <img
                src={SPECIAL_OFFERS[0].image}
                alt={SPECIAL_OFFERS[0].title}
                className="offers-banner-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION (قسم آراء العملاء والعلماء) */}
      <section className="testimonials-section">
        <IslamicPattern opacity={0.04} />
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle font-arabic">
              ثقة أهل العلم والقرّاء
            </span>
            <h2 className="section-title font-arabic">قالوا عن دار الخير</h2>
            <div className="ornament-divider">
              <span className="ornament-symbol">✦ ۞ ✦</span>
            </div>
          </div>

          <div className="testimonials-grid font-arabic">
            {TESTIMONIALS_DATA.map((item) => (
              <div key={item.id} className="testimonial-card">
                <div className="testimonial-quote-icon">
                  <Quote size={28} />
                </div>
                <div className="testimonial-stars">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-filled" />
                  ))}
                </div>
                <p className="testimonial-text">"{item.comment}"</p>
                <div className="testimonial-author">
                  <h4 className="author-name">{item.name}</h4>
                  <span className="author-role">{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewBook && (
        <QuickViewModal
          book={quickViewBook}
          onClose={() => setQuickViewBook(null)}
        />
      )}
    </div>
  );
};
