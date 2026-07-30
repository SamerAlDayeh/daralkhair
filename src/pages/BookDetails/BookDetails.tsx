import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BOOKS_DATA } from '../../data/books';
import { useCart } from '../../context/CartContext';
import { BookCard } from '../../components/BookCard/BookCard';
import { QuickViewModal } from '../../components/QuickViewModal/QuickViewModal';
import { GoldBorderFrame } from '../../components/GoldBorderFrame/GoldBorderFrame';
import { Book } from '../../types';
import {
  ShoppingBag,
  Star,
  ArrowRight,
  Bookmark
} from 'lucide-react';
import './BookDetails.css';

export const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const book = BOOKS_DATA.find(b => b.id === id);

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>('');
  const [quickViewBook, setQuickViewBook] = useState<Book | null>(null);

  if (!book) {
    return (
      <div className="container py-5 text-center font-arabic">
        <h2>الكتاب غير موجود</h2>
        <p>لم نتمكن من العثور على المطبوعة المطلوبة في الفهرس.</p>
        <Link to="/books" className="btn-gold mt-3 font-arabic">العودة إلى فهرس الكتب</Link>
      </div>
    );
  }

  const currentCover = activeImage || book.coverImage;
  const relatedBooks = BOOKS_DATA.filter(b => b.category === book.category && b.id !== book.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(book, quantity);
  };

  return (
    <div className="book-details-page">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb-nav font-arabic">
          <Link to="/books" className="breadcrumb-link">
            <ArrowRight size={16} />
            <span>العودة للمكتبة</span>
          </Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-cat">{book.category}</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-title">{book.title}</span>
        </div>

        {/* Main Details Section */}
        <div className="book-details-grid">
          {/* Left Gallery */}
          <div className="book-gallery-col">
            <GoldBorderFrame variant="ornate" className="main-cover-frame">
              <div className="main-cover-box">
                <img src={currentCover} alt={book.title} className="main-cover-img" />
              </div>
            </GoldBorderFrame>

            <div className="inside-images-thumbnails font-arabic">
              <span className="inside-label">معاينة الصفحات والتجليد:</span>
              <div className="thumbs-row">
                <img
                  src={book.coverImage}
                  alt="غلاف الكتاب"
                  className={`inside-thumb ${currentCover === book.coverImage ? 'active' : ''}`}
                  onClick={() => setActiveImage(book.coverImage)}
                />
                {book.insideImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`معاينة صفحة ${index + 1}`}
                    className={`inside-thumb ${currentCover === img ? 'active' : ''}`}
                    onClick={() => setActiveImage(img)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Product Details */}
          <div className="book-info-col font-arabic">
            <div className="category-tag">{book.category}</div>
            <h1 className="details-title font-arabic">{book.title}</h1>
            <div className="arabic-title font-arabic">{book.titleArabic}</div>

            <div className="author-row">
              <span>المؤلف: <strong>{book.authorArabic || book.author}</strong></span>
            </div>

            {/* Rating */}
            <div className="details-rating-box">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="star-filled" />
                ))}
              </div>
              <span className="rating-score">{book.rating.toFixed(2)}</span>
              <span className="reviews-num">({book.reviewsCount} تقييم علمي موثق)</span>
            </div>

            {/* Price Row */}
            <div className="details-price-card">
              <div className="price-box">
                <span className="price">${book.price.toFixed(2)}</span>
                {book.originalPrice && (
                  <span className="original">${book.originalPrice.toFixed(2)}</span>
                )}
              </div>
              {book.discountPercent && (
                <span className="savings-badge">وفر {book.discountPercent}% مباشر</span>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="details-actions-row">
              <div className="quantity-picker">
                <button
                  onClick={() => setQuantity(p => Math.max(1, p - 1))}
                  className="qty-btn"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button onClick={() => setQuantity(p => p + 1)} className="qty-btn">
                  +
                </button>
              </div>

              <button className="btn-gold add-cart-large font-arabic" onClick={handleAddToCart}>
                <ShoppingBag size={20} />
                <span>أضف إلى سلة الشراء</span>
              </button>
            </div>

            {/* Specs Table */}
            <div className="specs-table-card">
              <h4 className="specs-title">بطاقة المطبوعة والتحقيق</h4>
              <div className="specs-grid">
                <div className="spec-row">
                  <span className="spec-label">نوع التجليد:</span>
                  <span className="spec-val">{book.binding}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">عدد الصفحات:</span>
                  <span className="spec-val">{book.pages} صفحة</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">سنة الطباعة:</span>
                  <span className="spec-val">{book.publicationYear}م</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">اللغة:</span>
                  <span className="spec-val">{book.language}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">الرقم المعياري (ISBN):</span>
                  <span className="spec-val">{book.isbn}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description & Table of Contents */}
        <div className="book-description-section font-arabic">
          <div className="desc-tabs">
            <h3 className="section-title font-arabic">نبذة عن الكتاب والقيمة العلمية</h3>
            <p className="long-description-p">{book.longDescription}</p>

            {book.tableOfContents && book.tableOfContents.length > 0 && (
              <div className="toc-box font-arabic">
                <h4 className="toc-title font-arabic">
                  <Bookmark size={18} className="gold-icon inline-icon" />
                  فهرس الموضوعات والأبواب
                </h4>
                <ul className="toc-list">
                  {book.tableOfContents.map((chap, i) => (
                    <li key={i} className="toc-item">
                      <span className="toc-num">{i + 1}</span>
                      <span className="toc-text">{chap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div className="related-books-section font-arabic">
            <div className="section-header">
              <span className="section-subtitle">إصدارات ذات صلة</span>
              <h2 className="section-title">كتب ومراجع أخرى في قسم {book.category}</h2>
            </div>
            <div className="books-grid">
              {relatedBooks.map(rel => (
                <BookCard
                  key={rel.id}
                  book={rel}
                  onQuickView={b => setQuickViewBook(b)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* QUICK VIEW MODAL */}
      <QuickViewModal
        book={quickViewBook}
        onClose={() => setQuickViewBook(null)}
      />
    </div>
  );
};
