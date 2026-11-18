import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BOOKS_DATA from "../../data/Books.json";
import SPECIAL_OFFERS from "../../data/offers.json";
import { BookCard } from "../../components/BookCard/BookCard";
import { QuickViewModal } from "../../components/QuickViewModal/QuickViewModal";
import { IslamicPattern } from "../../components/IslamicPattern/IslamicPattern";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import "./Home.css";

const sliderImages = Object.entries(
  import.meta.glob("../../Imgs/*.{jpg,jpeg,png,webp}", {
    eager: true,
    query: "?url",
    import: "default",
  })
)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([, imageUrl]) => imageUrl);

const formatPrice = (price) => {
  const num = Number(price);
  return isNaN(num) ? "0.00" : num.toFixed(2);
};

const AGENCIES_DATA = [
  { id: 1, name: "مكتبة الرشد", location: "الرياض، السعودية" },
  { id: 2, name: "دار ابن حزم", location: "بيروت، لبنان" },
  { id: 3, name: "مكتبة الإمام المازري", location: "تونس، تونس" },
  { id: 4, name: "مؤسسة الرسالة", location: "سوريا" },
  { id: 5, name: "دار الفكر", location: "الأردن" },
  { id: 6, name: "دار القلم", location: "دمشق، سوريا" },
  { id: 7, name: "دار السراج", location: "إسطنبول، تركيا" },
  { id: 8, name: "المكتبة العربية", location: "إسطنبول، تركيا" },
  { id: 9, name: "دار النور المبين", location: "الأردن" },
  { id: 10, name: "مكتبة إسماعيل", location: "بريطانيا" },
  { id: 11, name: "دار الدقاق", location: "دمشق، سوريا" },
  { id: 12, name: "الدار الشامية", location: "دمشق، سوريا" },
  { id: 13, name: "المكتبة الهاشمية", location: "إسطنبول، تركيا" },
  { id: 14, name: "دار الغانم", location: "الأردن" },
];

const EXHIBITIONS_DATA = [
  { id: 1, name: "معرض القاهرة الدولي للكتاب", location: "مصر" },
  { id: 2, name: "معرض الرياض الدولي للكتاب", location: "السعودية" },
  { id: 3, name: "معرض الشارقة الدولي للكتاب", location: "الإمارات" },
  { id: 4, name: "معرض الدار البيضاء للكتاب", location: "المغرب" },
  { id: 5, name: "معرض دمشق الدولي للكتاب", location: "دمشق، سوريا" },
  { id: 6, name: "معرض أربيل الدولي للكتاب", location: "أربيل، العراق" },
];

export const Home = () => {
  const [quickViewBook, setQuickViewBook] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const agenciesCarouselRef = useRef(null);
  const marqueeContainerRef = useRef(null);
  const marqueeDragRef = useRef(null);
  const suppressMarqueeClickRef = useRef(false);

  const booksList = Array.isArray(BOOKS_DATA) ? BOOKS_DATA : [];
  const marqueeBooks = booksList;
  const offersList = Array.isArray(SPECIAL_OFFERS) ? SPECIAL_OFFERS : [];

  const handleMarqueePointerDown = (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    marqueeDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
      isDragging: false,
    };
  };

  const handleMarqueePointerMove = (event) => {
    const drag = marqueeDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const distance = event.clientX - drag.startX;
    if (!drag.isDragging && Math.abs(distance) > 5) {
      drag.isDragging = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.classList.add("dragging");
    }

    if (drag.isDragging) {
      event.currentTarget.scrollLeft = drag.startScrollLeft - distance;
      event.preventDefault();
    }
  };

  const finishMarqueePointer = (event) => {
    const drag = marqueeDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    if (drag.isDragging) {
      suppressMarqueeClickRef.current = true;
      window.setTimeout(() => {
        suppressMarqueeClickRef.current = false;
      }, 300);
    }

    marqueeDragRef.current = null;
    event.currentTarget.classList.remove("dragging");
  };

  const handleMarqueeClickCapture = (event) => {
    if (!suppressMarqueeClickRef.current) return;

    event.preventDefault();
    event.stopPropagation();
    suppressMarqueeClickRef.current = false;
  };

  const scrollAgencies = (distance) => {
    agenciesCarouselRef.current?.scrollBy({
      left: distance,
      behavior: "smooth",
    });
  };

  const scrollBooks = (direction) => {
    const slider = marqueeContainerRef.current;
    const firstCard = slider?.querySelector(".marquee-card-wrapper");
    if (!slider || !firstCard) return;

    const cardStyle = window.getComputedStyle(firstCard);
    const step =
      firstCard.getBoundingClientRect().width +
      parseFloat(cardStyle.marginLeft) +
      parseFloat(cardStyle.marginRight);
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    if (maxScroll <= 0) return;

    const target = slider.scrollLeft + direction * step;
    const nextPosition =
      target < 0 ? maxScroll : target > maxScroll ? 0 : target;

    slider.scrollTo({ left: nextPosition, behavior: "smooth" });
  };

  // تم زيادة المدة إلى 7000 ملي ثانية (7 ثوانٍ) لتبطئة انتقال السلايدر
  useEffect(() => {
    if (sliderImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  return (
    <div className="home-page font-arabic">
      {/* 1. HERO SLIDER SECTION */}
      {sliderImages.length > 0 && (
        <section
          className="hero-slider-section"
          style={{ "--active-slide-img": `url(${sliderImages[currentSlide]})` }}
        >
          <div className="slider-wrapper">
            {sliderImages.map((src, index) => (
              <div
                key={index}
                className={`slider-slide ${index === currentSlide ? "active" : ""}`}
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

      {/* 2. DRAGGABLE BOOK SLIDER */}
      {marqueeBooks.length > 0 && (
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

          <div className="marquee-slider">
            <div
              ref={marqueeContainerRef}
              className="marquee-container"
              role="region"
              aria-label="اسحب لاستعراض إصدارات الكتب"
              tabIndex={0}
              onPointerDown={handleMarqueePointerDown}
              onPointerMove={handleMarqueePointerMove}
              onPointerUp={finishMarqueePointer}
              onPointerCancel={finishMarqueePointer}
              onClickCapture={handleMarqueeClickCapture}
            >
              <div className="marquee-track">
                {marqueeBooks.map((book, idx) => (
                  <div key={`${book.id || idx}-${idx}`} className="marquee-card-wrapper">
                    <BookCard
                      book={book}
                      onQuickView={(b) => setQuickViewBook(b)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div
              className="marquee-slider-controls"
              role="group"
              aria-label="التنقل بين الكتب"
            >
              <button
                type="button"
                className="marquee-slider-arrow"
                onClick={() => scrollBooks(1)}
                aria-label="الكتب السابقة"
              >
                <ChevronRight size={24} />
              </button>
              <button
                type="button"
                className="marquee-slider-arrow"
                onClick={() => scrollBooks(-1)}
                aria-label="الكتب التالية"
              >
                <ChevronLeft size={24} />
              </button>
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
              <h2 className="section-title font-arabic">العروض والخصومات الخاصة</h2>
              <div className="ornament-divider">
                <span className="ornament-symbol">✦ ۞ ✦</span>
              </div>
            </div>

            <div className="home-offers-grid font-arabic">
              {offersList.map((offer, index) => (
                <div key={offer.id || offer.code || index} className="home-offer-card font-arabic">
                  <div className="home-offer-img-box">
                    <img
                      src={offer.image || "/placeholder-offer.jpg"}
                      alt={offer.title || "عرض خاص"}
                      className="home-offer-img"
                    />
                    <span className="home-offer-badge">
                      {offer.discountBadge || `خصم ${offer.discountPercent}%`}
                    </span>
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
            <h2 className="section-title font-arabic">توكيلاتنا الحصرية حول العالم</h2>
            <div className="ornament-divider">
              <span className="ornament-symbol">✦ ۞ ✦</span>
            </div>
          </div>

          <div className="agencies-carousel">
            <div className="agencies-grid" ref={agenciesCarouselRef}>
              {AGENCIES_DATA.map((agency) => (
                <div key={agency.id} className="agency-card">
                  <h3 className="agency-name">{agency.name}</h3>
                  <span className="agency-location">{agency.location}</span>
                </div>
              ))}
            </div>
            <div className="agencies-carousel-controls">
              <button
                type="button"
                className="agencies-carousel-btn"
                onClick={() => scrollAgencies(+280)}
                aria-label="التوكيل التالي"
              >
                <ChevronRight size={20} />
              </button>
              <button
                type="button"
                className="agencies-carousel-btn"
                onClick={() => scrollAgencies(-280)}
                aria-label="التوكيل السابق"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EXHIBITIONS SECTION */}
      <section className="exhibitions-section">
        <IslamicPattern opacity={0.03} />
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle font-arabic">حضور عالمي</span>
            <h2 className="section-title font-arabic">المعارض الدولية التي نشارك بها</h2>
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