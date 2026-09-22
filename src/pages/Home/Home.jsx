import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BOOKS_DATA from "../../data/Books.json";
import SPECIAL_OFFERS from "../../data/offers.json";
import { BookCard } from "../../components/BookCard/BookCard";
import { QuickViewModal } from "../../components/QuickViewModal/QuickViewModal";
import { IslamicPattern } from "../../components/IslamicPattern/IslamicPattern";
import {
  ArrowLeft,
  Star,
  Globe,
  MapPin,
  Calendar,
  BookOpen,
} from "lucide-react";
import "./Home.css";

import sliderImg1 from "../../Imgs/Slider-1.jpeg";
import sliderImg2 from "../../Imgs/Slider-2.jpeg";

// دالة آمنة لتنسيق الأسعار وتجنب أخطاء toFixed
const formatPrice = (price) => {
  const num = Number(price);
  return isNaN(num) ? "0.00" : num.toFixed(2);
};

const AGENCIES_DATA = [
  { id: 1, name: "مكتبة الرشد", country: "المملكة العربية السعودية" },
  { id: 2, name: "دار ابن حزم", country: "لبنان" },
  { id: 3, name: "مكتبة الإمام المازري", country: "تونس" },
  { id: 4, name: "مؤسسة الرسالة", country: "سوريا" },
  { id: 5, name: "مكتبة الأنجلو", country: "مصر" },
  { id: 6, name: "دار الفكر", country: "الأردن" },
];

const EXHIBITIONS_DATA = [
  {
    id: 1,
    name: "معرض القاهرة الدولي للكتاب",
    location: "مصر",
    date: "يناير - فبراير",
  },
  {
    id: 2,
    name: "معرض الرياض الدولي للكتاب",
    location: "السعودية",
    date: "سبتمبر - أكتوبر",
  },
  {
    id: 3,
    name: "معرض الشارقة الدولي للكتاب",
    location: "الإمارات",
    date: "نوفمبر",
  },
  {
    id: 4,
    name: "معرض الدار البيضاء للكتاب",
    location: "المغرب",
    date: "مايو",
  },
];

const AUTHORS_DATA = [
  { id: 1, name: "د. محمد راتب النابلسي", title: "عالم وداعية إسلامي" },
  { id: 2, name: "د. علي محمد الصلابي", title: "مؤرخ وباحث إسلامي" },
  {
    id: 3,
    name: "الشيخ عبد الفتاح أبو غدة",
    title: "من كبار المحققين والعلماء",
  },
  { id: 4, name: "أ.د. عبد الكريم زيدان", title: "أستاذ الشريعة الإسلامية" },
];

export const Home = () => {
  const [quickViewBook, setQuickViewBook] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  const sliderImages = [sliderImg1, sliderImg2].filter(Boolean);

  // التأكد من وجود بيانات الكتب لمنع الأخطاء
  const booksList = Array.isArray(BOOKS_DATA) ? BOOKS_DATA : [];
  const marqueeBooks = [...booksList, ...booksList];

  const offersList = Array.isArray(SPECIAL_OFFERS) ? SPECIAL_OFFERS : [];

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
      {sliderImages.length > 0 && (
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
      )}

      {/* 2. CONTINUOUS MARQUEE SLIDER */}
      {marqueeBooks.length > 0 && (
        <section className="marquee-books-section">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle font-arabic">
                إصدارات متميزة
              </span>
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
                <div
                  key={`${book.id || idx}-${idx}`}
                  className="marquee-card-wrapper"
                >
                  <BookCard
                    book={book}
                    onQuickView={(b) => setQuickViewBook(b)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. HOME OFFERS SECTION */}
      {offersList.length > 0 && (
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
              {offersList.map((offer, index) => (
                <div
                  key={offer.id || offer.code || index}
                  className="home-offer-card font-arabic"
                >
                  <div className="home-offer-img-box">
                    <img
                      src={offer.image || "/placeholder-offer.jpg"}
                      alt={offer.title || "عرض خاص"}
                      className="home-offer-img"
                    />
                    <span className="home-offer-badge">عرض خاص</span>
                  </div>
                  <div className="home-offer-content">
                    <h3 className="home-offer-title">{offer.title}</h3>
                    <p className="home-offer-desc">{offer.description}</p>

                    <div className="home-offer-price-row">
                      <span className="home-offer-price-now">
                        ${formatPrice(offer.offerPrice || offer.price)}
                      </span>
                      {(offer.originalPrice || offer.oldPrice) && (
                        <span className="home-offer-price-was">
                          ${formatPrice(offer.originalPrice || offer.oldPrice)}
                        </span>
                      )}
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
      )}

      {/* 4. AGENCIES SECTION */}
      <section className="agencies-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle font-arabic">شركاء النجاح</span>
            <h2 className="section-title font-arabic">
              توكيلاتنا الحصرية حول العالم
            </h2>
            <div className="ornament-divider">
              <span className="ornament-symbol">✦ ۞ ✦</span>
            </div>
          </div>

          <div className="agencies-grid">
            {AGENCIES_DATA.map((agency) => (
              <div key={agency.id} className="agency-card">
                <div className="agency-icon-wrapper">
                  <Globe size={32} />
                </div>
                <h4 className="agency-name">{agency.name}</h4>
                <div className="agency-country">
                  <MapPin size={14} />
                  <span>{agency.country}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXHIBITIONS SECTION */}
      <section className="exhibitions-section">
        <IslamicPattern opacity={0.03} />
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle font-arabic">حضور عالمي</span>
            <h2 className="section-title font-arabic">
              المعارض الدولية التي نشارك بها
            </h2>
            <div className="ornament-divider">
              <span className="ornament-symbol">✦ ۞ ✦</span>
            </div>
          </div>

          <div className="exhibitions-grid">
            {EXHIBITIONS_DATA.map((exhibition) => (
              <div key={exhibition.id} className="exhibition-card">
                <h3 className="exhibition-title">{exhibition.name}</h3>
                <div className="exhibition-details">
                  <div className="detail-item">
                    <MapPin size={16} />
                    <span>{exhibition.location}</span>
                  </div>
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span>{exhibition.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. AUTHORS SECTION */}
      <section className="authors-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle font-arabic">قامات علمية</span>
            <h2 className="section-title font-arabic">
              شيوخ ومؤلفون نتعامل معهم
            </h2>
            <div className="ornament-divider">
              <span className="ornament-symbol">✦ ۞ ✦</span>
            </div>
          </div>

          <div className="authors-grid">
            {AUTHORS_DATA.map((author) => (
              <div key={author.id} className="author-card">
                <div className="author-avatar">
                  <BookOpen size={40} className="author-icon" />
                </div>
                <h4 className="author-name">{author.name}</h4>
                <span className="author-title">{author.title}</span>
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
