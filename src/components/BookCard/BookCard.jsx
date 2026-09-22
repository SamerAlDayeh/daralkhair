import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ShoppingBag, Eye } from "lucide-react";
import "./BookCard.css";

export const BookCard = ({ book, onQuickView }) => {
  const { addToCart } = useCart();

  // المسارات الخاصة بصور الكتاب داخل مجلد public/BooksImgs/{id}/
  const coverImage = `/BooksImgs/${book.id}/1.webp`;
  const internalImage1 = `/BooksImgs/${book.id}/2.webp`;
  const internalImage2 = `/BooksImgs/${book.id}/3.webp`;

  // مصفوفة كامل الصور لاستخدامها في المعاينة السريعة والمعرض
  const bookImages = [coverImage, internalImage1, internalImage2];

  const handleQuickView = () => {
    if (onQuickView) {
      // إرسال كائن الكتاب مضافاً إليه مصفوفة الصور لسهولة عرضها في Modal المعاينة
      onQuickView({
        ...book,
        images: bookImages,
        coverImage: coverImage,
      });
    }
  };

  return (
    <div className="book-card-wrapper font-arabic">
      <div className="book-card">
        {/* Cover Container */}
        <div className="book-cover-container">
          <img
            src={coverImage}
            alt={book.title}
            className="book-cover-img"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/BooksImgs/default-cover.webp"; // صورة افتراضية في حال عدم وجود المجلد
            }}
          />
          <div className="book-overlay-actions">
            {onQuickView && (
              <button
                className="action-btn quick-view-btn font-arabic"
                onClick={handleQuickView}
                title="معاينة سريعة"
                aria-label="معاينة الكتاب"
              >
                <Eye size={18} />
                <span>معاينة</span>
              </button>
            )}
            <button
              className="action-btn add-cart-btn font-arabic"
              onClick={() => addToCart({ ...book, coverImage }, 1)}
              title="أضف إلى السلة"
              aria-label="أضف الكتاب إلى سلة الشراء"
            >
              <ShoppingBag size={18} />
              <span>أضف للسلة</span>
            </button>
          </div>

          {/* Badges */}
          <div className="book-badges font-arabic">
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
            {/* مكان التقييم بالنجوم عند الحاجة */}
          </div>

          {/* Footer / Pricing */}
          <div className="book-card-footer">
            <div className="book-price-box">
              <span className="current-price">
                $
                {typeof book.price === "number"
                  ? book.price.toFixed(2)
                  : book.price}
              </span>
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
