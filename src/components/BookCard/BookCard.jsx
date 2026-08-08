import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ShoppingBag, Eye, Star } from "lucide-react";
import "./BookCard.css";

export const BookCard = ({ book, onQuickView }) => {
  const { addToCart } = useCart();

  return (
    <div className="book-card-wrapper">
      <div className="book-card">
        {/* Cover Container */}
        <div className="book-cover-container">
          <img
            src={book.coverImage}
            alt={book.title}
            className="book-cover-img"
            loading="lazy"
          />
          <div className="book-overlay-actions">
            {onQuickView && (
              <button
                className="action-btn quick-view-btn"
                onClick={() => onQuickView(book)}
                title="معاينة سريعة"
                aria-label="معاينة الكتاب"
              >
                <Eye size={18} />
                <span>معاينة</span>
              </button>
            )}
            <button
              className="action-btn add-cart-btn"
              onClick={() => addToCart(book, 1)}
              title="أضف إلى السلة"
              aria-label="أضف الكتاب إلى سلة الشراء"
            >
              <ShoppingBag size={18} />
              <span>أضف للسلة</span>
            </button>
          </div>

          {/* Badges */}
          <div className="book-badges">
            {book.isOffer && book.discountPercent && (
              <span className="badge discount-badge">
                خصم {book.discountPercent}%
              </span>
            )}
            {book.isNew && <span className="badge new-badge">إصدار حديث</span>}
          </div>
        </div>

        {/* Info */}
        <div className="book-info">
          <div className="book-category font-arabic">{book.category}</div>
          <Link to={`/books/${book.id}`} className="book-title-link">
            <h3 className="book-title font-arabic">{book.title}</h3>
          </Link>
          <div className="book-author font-arabic">
            بقلم: {book.authorArabic || book.author}
          </div>

          {/* Rating */}
          <div className="book-rating">
            <div className="stars">
              <Star size={14} className="star-filled" />
              <span className="rating-num">{book.rating.toFixed(1)}</span>
            </div>
            <span className="reviews-count">({book.reviewsCount} تقييم)</span>
          </div>

          {/* Footer / Pricing */}
          <div className="book-card-footer">
            <div className="book-price-box">
              <span className="current-price">${book.price.toFixed(2)}</span>
              {book.originalPrice && (
                <span className="original-price">
                  ${book.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <Link
              to={`/books/${book.id}`}
              className="view-details-link font-arabic"
            >
              التفاصيل ←
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
