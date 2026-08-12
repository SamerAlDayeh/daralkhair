import React, { useState } from "react";
import SPECIAL_OFFERS from "../../data/offers.json";
import { BOOKS_DATA } from "../../data/books";
import { BookCard } from "../../components/BookCard/BookCard";
import { QuickViewModal } from "../../components/QuickViewModal/QuickViewModal";
import { IslamicPattern } from "../../components/IslamicPattern/IslamicPattern";
import { useCart } from "../../context/CartContext";
import { ShoppingBag, Copy, Check, Tag } from "lucide-react";
import "./Offers.css";

export const Offers = () => {
  const { addToCart } = useCart();
  const [quickViewBook, setQuickViewBook] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  const offerBooks = BOOKS_DATA.filter((b) => b.isOffer);

  const getBundleBooks = (bundleBookIds = []) => {
    return bundleBookIds
      .map((id) => BOOKS_DATA.find((b) => String(b.id) === String(id)))
      .filter(Boolean);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleAddBundleToCart = (offer) => {
    const books = getBundleBooks(offer.bundleBookIds);
    books.forEach((b) => addToCart(b, 1));
  };

  return (
    <div className="offers-page-wrapper font-arabic">
      {/* 1. HERO SECTION */}
      <section className="offers-page-hero">
        <IslamicPattern opacity={0.06} />
        <div className="container">
          <span className="offers-page-subtitle">عروض حصرية وخصومات</span>
          <h1 className="offers-page-hero-title">عروض وخصومات دار الخير</h1>
          <p className="offers-page-hero-desc">
            استمتع بأفضل العروض الحصرية والخصومات المميزة على المجموعات القيمة
            والإصدارات الفريدة.
          </p>
        </div>
      </section>

      {/* 2. SPECIAL BUNDLES SECTION */}
      {SPECIAL_OFFERS && SPECIAL_OFFERS.length > 0 && (
        <section className="offers-page-bundles-section">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">باقات خاصة</span>
              <h2 className="section-title">المجموعات والعروض الكبرى</h2>
              <div className="ornament-divider">
                <span className="ornament-symbol">✦ ۞ ✦</span>
              </div>
            </div>

            <div className="offers-page-bundles-grid">
              {SPECIAL_OFFERS.map((offer) => (
                <div
                  key={offer.id || offer.code}
                  className="offers-page-bundle-card"
                >
                  <div className="offers-page-bundle-img-box">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="offers-page-bundle-img"
                    />
                    <span className="offers-page-bundle-badge">عرض خاص</span>
                  </div>

                  <div className="offers-page-bundle-content">
                    <h3 className="offers-page-bundle-title">{offer.title}</h3>
                    <p className="offers-page-bundle-desc">
                      {offer.description}
                    </p>

                    <div className="offers-page-price-row">
                      <span className="offers-page-price-now">
                        ${offer.offerPrice.toFixed(2)}
                      </span>
                      <span className="offers-page-price-was">
                        ${offer.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddBundleToCart(offer)}
                      className="btn-gold w-full inline-flex justify-center mt-3"
                      type="button"
                    >
                      <ShoppingBag size={18} />
                      <span>إضافة العرض للسلة</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. INDIVIDUAL DISCOUNTED BOOKS */}
      <section className="offers-page-discounted-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">إصدارات مخفضة</span>
            <h2 className="section-title">عروض وخصومات خاصة</h2>
            <div className="ornament-divider">
              <span className="ornament-symbol">✦ ۞ ✦</span>
            </div>
          </div>

          <div className="offers-page-books-grid">
            {offerBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onQuickView={(b) => setQuickViewBook(b)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {quickViewBook && (
        <QuickViewModal
          book={quickViewBook}
          onClose={() => setQuickViewBook(null)}
        />
      )}
    </div>
  );
};
