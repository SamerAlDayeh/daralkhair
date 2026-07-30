import React, { useState } from 'react';
import { Book } from '../../types';
import { useCart } from '../../context/CartContext';
import { X, ShoppingBag, Star, BookOpen, Check, Award } from 'lucide-react';
import './QuickViewModal.css';

interface QuickViewModalProps {
  book: Book | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ book, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState<string>('');

  if (!book) return null;

  const activeImage = selectedImg || book.coverImage;

  const handleAddToCart = () => {
    addToCart(book, quantity);
    onClose();
  };

  return (
    <div className="quickview-backdrop" onClick={onClose}>
      <div className="quickview-modal" onClick={e => e.stopPropagation()}>
        <button className="quickview-close-btn" onClick={onClose} aria-label="إغلاق النافذة">
          <X size={20} />
        </button>

        <div className="quickview-grid">
          {/* Gallery */}
          <div className="quickview-gallery">
            <div className="quickview-main-img-box">
              <img src={activeImage} alt={book.title} className="quickview-main-img" />
            </div>
            <div className="quickview-thumbnails">
              <img
                src={book.coverImage}
                alt="الغلاف"
                className={`thumb ${activeImage === book.coverImage ? 'active' : ''}`}
                onClick={() => setSelectedImg(book.coverImage)}
              />
              {book.insideImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`صفحة ${idx + 1}`}
                  className={`thumb ${activeImage === img ? 'active' : ''}`}
                  onClick={() => setSelectedImg(img)}
                />
              ))}
            </div>
          </div>

          {/* Book Info */}
          <div className="quickview-details">
            <div className="quickview-category font-arabic">{book.category}</div>
            <h2 className="quickview-title font-arabic">{book.title}</h2>
            <div className="quickview-arabic-title font-arabic">{book.titleArabic}</div>
            <div className="quickview-author font-arabic">المؤلف: {book.authorArabic || book.author}</div>

            <div className="quickview-rating">
              <Star size={16} className="star-filled" />
              <span className="rating-num">{book.rating.toFixed(1)}</span>
              <span className="reviews-count">({book.reviewsCount} تقييم القراء)</span>
            </div>

            <div className="quickview-price-row">
              <span className="price">${book.price.toFixed(2)}</span>
              {book.originalPrice && (
                <span className="original-price">${book.originalPrice.toFixed(2)}</span>
              )}
              {book.discountPercent && (
                <span className="discount-tag font-arabic">خصم {book.discountPercent}%</span>
              )}
            </div>

            <p className="quickview-desc font-arabic">{book.description}</p>

            <div className="quickview-specs-grid font-arabic">
              <div className="spec-item">
                <BookOpen size={14} className="spec-icon" />
                <span>التجليد: <strong>{book.binding}</strong></span>
              </div>
              <div className="spec-item">
                <Award size={14} className="spec-icon" />
                <span>الصفحات: <strong>{book.pages}</strong></span>
              </div>
              <div className="spec-item">
                <Check size={14} className="spec-icon" />
                <span>اللغة: <strong>{book.language}</strong></span>
              </div>
              <div className="spec-item">
                <span>الرقم المعياري: <strong>{book.isbn}</strong></span>
              </div>
            </div>

            <div className="quickview-cart-row">
              <div className="qty-picker">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="qty-btn"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="qty-val">{quantity}</span>
                <button onClick={() => setQuantity(prev => prev + 1)} className="qty-btn">
                  +
                </button>
              </div>

              <button className="btn-gold flex-1 font-arabic" onClick={handleAddToCart}>
                <ShoppingBag size={18} />
                <span>أضف إلى سلة الشراء</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
