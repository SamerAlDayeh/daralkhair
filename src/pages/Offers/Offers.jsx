import React, { useState } from "react";
import SPECIAL_OFFERS from "../../data/offers.json";
import { BOOKS_DATA } from "../../data/books";
import { BookCard } from "../../components/BookCard/BookCard";
import { QuickViewModal } from "../../components/QuickViewModal/QuickViewModal";
import { IslamicPattern } from "../../components/IslamicPattern/IslamicPattern";
import { GoldBorderFrame } from "../../components/GoldBorderFrame/GoldBorderFrame";
import { useCart } from "../../context/CartContext";
import { ShoppingBag, Copy, Check } from "lucide-react";
import "./Offers.css";

export const Offers = () => {
  const { addToCart } = useCart();
  const [quickViewBook, setQuickViewBook] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  const offerBooks = BOOKS_DATA.filter((b) => b.isOffer);

  // دالة مساعدة لجلب بيانات الكتب التابعة للمجموعة بناءً على bundleBookIds
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
    <div className="offers-page font-arabic">
      {/* Individual Discounted Books */}
      <section className="discounted-books-section">
        <div className="container">
          <div className="section-header font-arabic">
            <span className="section-subtitle">إصدارات مخفضة</span>
            <h2 className="section-title">عروض وخصومات خاصة </h2>
            <div className="ornament-divider">
              <span className="ornament-symbol">✦ ۞ ✦</span>
            </div>
          </div>

          <div className="books-grid">
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
      <QuickViewModal
        book={quickViewBook}
        onClose={() => setQuickViewBook(null)}
      />
    </div>
  );
};
