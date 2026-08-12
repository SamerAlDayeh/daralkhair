import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BOOKS_DATA } from "../../data/books";
import SPECIAL_OFFERS from "../../data/offers.json";
import { BookCard } from "../../components/BookCard/BookCard";
import { QuickViewModal } from "../../components/QuickViewModal/QuickViewModal";
import { IslamicPattern } from "../../components/IslamicPattern/IslamicPattern";
import { ArrowLeft, Quote, Star, Tag } from "lucide-react";
import "./Home.css";
import sliderImg1 from "../../Imgs/Slider-1.jpeg";
import sliderImg2 from "../../Imgs/Slider-2.jpeg";

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
      "إن الاهتمام بالصياغة والضبط اللغوي وإخراج النص المحقق بهذه الدقة يعكس إخلاص القائمين على الدار ورعايتهم لتراث الأمة بكل أمانة.",
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
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  const sliderImages = [sliderImg1, sliderImg2].filter(Boolean);
  const marqueeBooks = [...BOOKS_DATA, ...BOOKS_DATA];

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
              style={{ "--bg-img": `url(${src})` }}
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

      {/* 2. CONTINUOUS MARQUEE SLIDER */}
      <section className="marquee-books-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle font-arabic">إصدارات متميزة</span>
            <h2 className="section-title font-arabic">مختاراتنا الفاخرة</h2>
            <div className="ornament-divider">
              <span className="ornament-symbol">✦ ۞ ✦</span>
            </div>
          </div>
        </div>

        <div className="marquee-container">
          <div
            className={`marquee-track ${isMarqueePaused ? "paused" : ""}`}
            onTouchStart={() => setIsMarqueePaused(true)}
            onTouchEnd={() => setIsMarqueePaused(false)}
          >
            {marqueeBooks.map((book, idx) => (
              <div key={`${book.id}-${idx}`} className="marquee-card-wrapper">
                <BookCard
                  book={book}
                  onQuickView={(b) => setQuickViewBook(b)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOME OFFERS SECTION */}
      <section className="home-offers-section">
        <IslamicPattern opacity={0.05} />
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle font-arabic">خصومات حصرية</span>
            <h2 className="section-title font-arabic">
              العروض والخصومات الخاصة
            </h2>
            <div className="ornament-divider">
              <span className="ornament-symbol">✦ ۞ ✦</span>
            </div>
          </div>

          <div className="home-offers-grid font-arabic">
            {SPECIAL_OFFERS.map((offer) => (
              <div
                key={offer.id || offer.code}
                className="home-offer-card font-arabic"
              >
                <div className="home-offer-img-box">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="home-offer-img"
                  />
                  <span className="home-offer-badge">عرض خاص</span>
                </div>
                <div className="home-offer-content">
                  <h3 className="home-offer-title">{offer.title}</h3>
                  <p className="home-offer-desc">{offer.description}</p>

                  <div className="home-offer-price-row">
                    <span className="home-offer-price-now">
                      ${offer.offerPrice.toFixed(2)}
                    </span>
                    <span className="home-offer-price-was">
                      ${offer.originalPrice.toFixed(2)}
                    </span>
                  </div>

                  <Link
                    to="/offers"
                    className="btn-gold font-arabic w-full inline-flex justify-center mt-3"
                  >
                    <span>اطلب العرض الآن</span>
                    <ArrowLeft size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS SECTION */}
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
