import React, { useState } from 'react';
import { SPECIAL_OFFERS } from '../../data/offers';
import { BOOKS_DATA } from '../../data/books';
import { BookCard } from '../../components/BookCard/BookCard';
import { QuickViewModal } from '../../components/QuickViewModal/QuickViewModal';
import { IslamicPattern } from '../../components/IslamicPattern/IslamicPattern';
import { GoldBorderFrame } from '../../components/GoldBorderFrame/GoldBorderFrame';
import { useCart } from '../../context/CartContext';
import { Book, SpecialOffer } from '../../types';
import { ShoppingBag, Copy, Check } from 'lucide-react';
import './Offers.css';

export const Offers: React.FC = () => {
  const { addToCart } = useCart();
  const [quickViewBook, setQuickViewBook] = useState<Book | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const offerBooks = BOOKS_DATA.filter(b => b.isOffer);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleAddBundleToCart = (offer: SpecialOffer) => {
    offer.bundleBooks.forEach(b => addToCart(b, 1));
  };

  return (
    <div className="offers-page font-arabic">
      {/* Hero Header */}
      <section className="offers-hero">
        <IslamicPattern opacity={0.08} />
        <div className="container">
          <div className="offers-hero-content font-arabic">
            <span className="offers-badge font-arabic">۞ العروض الخاصة والمجموعات ۞</span>
            <h1 className="offers-hero-title font-arabic">العروض الحصرية والمجموعات الملوكية</h1>
            <p className="offers-hero-desc font-arabic">
              حسومات مباشرة من دار النشر، ومجموعات علمية محققة ومذهبة بأسعار تخفيضية مخصصة لطلاب العلم والمكتبات.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Collector Bundles */}
      <section className="bundles-section">
        <div className="container">
          <div className="section-header font-arabic">
            <span className="section-subtitle">مجموعات فاخرة</span>
            <h2 className="section-title">خزائن ومجموعات العروض الخاصة</h2>
            <div className="ornament-divider">
              <span className="ornament-symbol">✦ ۞ ✦</span>
            </div>
          </div>

          <div className="bundles-grid">
            {SPECIAL_OFFERS.map(offer => (
              <GoldBorderFrame key={offer.id} variant="ornate" className="bundle-card-frame">
                <div className="bundle-card font-arabic">
                  <div className="bundle-header">
                    <span className="bundle-discount-badge">{offer.discountBadge}</span>
                    {offer.code && (
                      <button
                        className="copy-code-btn"
                        onClick={() => handleCopyCode(offer.code!)}
                        title="نسخ رمز الخصم"
                      >
                        {copiedCode === offer.code ? (
                          <>
                            <Check size={14} />
                            <span>تم النسخ!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>كود: {offer.code}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="bundle-body">
                    <div className="bundle-image-box">
                      <img src={offer.image} alt={offer.title} className="bundle-img" />
                    </div>

                    <div className="bundle-details">
                      <h3 className="bundle-title font-arabic">{offer.title}</h3>
                      <div className="bundle-arabic font-arabic">{offer.subtitle}</div>
                      <p className="bundle-desc font-arabic">{offer.description}</p>

                      {/* Included Books List */}
                      <div className="bundle-books-list font-arabic">
                        <span className="included-label">محتويات هذه المجموعة:</span>
                        <ul>
                          {offer.bundleBooks.map(b => (
                            <li key={b.id}>
                              <span className="book-bullet">✦</span>
                              <span>{b.title} ({b.authorArabic || b.author})</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bundle-price-footer font-arabic">
                        <div className="bundle-prices">
                          <span className="offer-price">${offer.offerPrice.toFixed(2)}</span>
                          <span className="orig-price">${offer.originalPrice.toFixed(2)}</span>
                        </div>
                        <button
                          className="btn-gold bundle-buy-btn font-arabic"
                          onClick={() => handleAddBundleToCart(offer)}
                        >
                          <ShoppingBag size={18} />
                          <span>أضف المجموعة كاملاً</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </GoldBorderFrame>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Discounted Books */}
      <section className="discounted-books-section">
        <div className="container">
          <div className="section-header font-arabic">
            <span className="section-subtitle">إصدارات مخفضة</span>
            <h2 className="section-title">كتب ومراجع فردية شملها الخصم</h2>
            <div className="ornament-divider">
              <span className="ornament-symbol">✦ ۞ ✦</span>
            </div>
          </div>

          <div className="books-grid">
            {offerBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onQuickView={b => setQuickViewBook(b)}
              />
            ))}
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
