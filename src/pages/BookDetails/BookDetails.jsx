import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import BOOKS_DATA from "../../data/Books.json";
import { useCart } from "../../context/CartContext";
import { GoldBorderFrame } from "../../components/GoldBorderFrame/GoldBorderFrame";
import {
  ShoppingBag,
  Star,
  ArrowRight,
  Bookmark,
  ZoomIn,
  X,
  Building2,
  Calendar,
  Hash,
} from "lucide-react";
import "./BookDetails.css";

// دالة تنسيق السعر
const formatPrice = (price) => {
  const num = Number(price);
  return isNaN(num) ? "0.00" : num.toFixed(2);
};

const getBookImages = (book) => {
  if (!book) return [];
  return [1, 2, 3].map(
    (imageNumber) => `/BooksImgs/${book.id}/${imageNumber}.webp`,
  );
};

export const BookDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const book = BOOKS_DATA.find((b) => String(b.id) === String(id));

  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);

  // إعادة ضبط الحالة عند تغير الكتاب أو الـ ID
  useEffect(() => {
    if (book) {
      setSelectedImg(getBookImages(book)[0]);
      setQuantity(1);
      setIsZoomed(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [id, book]);

  if (!book) {
    return (
      <div className="container py-5 text-center font-arabic">
        <h2>الكتاب غير موجود</h2>
        <p>لم نتمكن من العثور على المطبوعة المطلوبة في الفهرس.</p>
        <Link to="/books" className="btn-gold mt-3 font-arabic">
          العودة إلى فهرس الكتب
        </Link>
      </div>
    );
  }

  // استخراج وتحضير كافة الصور
  const allImages = getBookImages(book);
  const coverImg = allImages[0];
  const activeImage = selectedImg || coverImg;

  // استخراج القيم بمرونة
  const isbnValue = book.ISBN || book.isbn;
  const publishYear = book.year || book.publicationYear;
  const descriptionText = book.longDescription || book.description || book.desc;

  const handleAddToCart = () => {
    addToCart(book, quantity);
  };

  return (
    <div className="book-details-page font-arabic">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb-nav">
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
          {/* المعرض الصوري */}
          <div className="book-gallery-col">
            <GoldBorderFrame variant="ornate" className="main-cover-frame">
              <div
                className="main-cover-box"
                onClick={() => setIsZoomed(true)}
                title="انقر لتكبير الصورة"
              >
                <img
                  src={activeImage}
                  alt={book.title || "صورة الكتاب"}
                  className="main-cover-img"
                />
                <div className="zoom-hint">
                  <ZoomIn size={20} />
                </div>
              </div>
            </GoldBorderFrame>

            {/* شريط الصور المصغرة */}
            {allImages.length > 1 && (
              <div className="inside-images-thumbnails">
                <span className="inside-label">معاينة الصفحات والتجليد:</span>
                <div className="thumbs-row">
                  {allImages.map((imgUrl, idx) => (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt={`معاينة ${idx + 1}`}
                      className={`inside-thumb ${
                        activeImage === imgUrl ? "active" : ""
                      }`}
                      onClick={() => setSelectedImg(imgUrl)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* تفاصيل الكتاب */}
          <div className="book-info-col">
            {book.category && (
              <div className="category-tag">{book.category}</div>
            )}

            {book.title && <h1 className="details-title">{book.title}</h1>}

            {book.titleArabic && (
              <div className="arabic-title">{book.titleArabic}</div>
            )}

            {(book.author || book.authorArabic) && (
              <div className="author-row">
                <span>
                  المؤلف: <strong>{book.authorArabic || book.author}</strong>
                </span>
              </div>
            )}

            {/* Rating */}
            {book.rating && (
              <div className="details-rating-box">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="star-filled" />
                  ))}
                </div>
                <span className="rating-score">
                  {Number(book.rating).toFixed(2)}
                </span>
                {book.reviewsCount && (
                  <span className="reviews-num">
                    ({book.reviewsCount} تقييم علمي موثق)
                  </span>
                )}
              </div>
            )}

            {/* Price Row */}
            {book.price !== undefined && (
              <div className="details-price-card">
                <div className="price-box">
                  <span className="price">${formatPrice(book.price)}</span>
                  {book.originalPrice && (
                    <span className="original">
                      ${formatPrice(book.originalPrice)}
                    </span>
                  )}
                </div>
                {book.discountPercent && (
                  <span className="savings-badge">
                    وفر {book.discountPercent}% مباشر
                  </span>
                )}
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="details-actions-row">
              <div className="quantity-picker">
                <button
                  onClick={() => setQuantity((p) => Math.max(1, p - 1))}
                  className="qty-btn"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  onClick={() => setQuantity((p) => p + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>

              <button
                className="btn-gold add-cart-large"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={20} />
                <span>أضف إلى سلة الشراء</span>
              </button>
            </div>

            {/* Specs Table */}
            <div className="specs-table-card">
              <h4 className="specs-title">بطاقة المطبوعة والتحقيق</h4>
              <div className="specs-grid">
                <div className="spec-row">
                  <span className="spec-label">
                    <Building2 size={15} className="inline-icon" /> دار النشر:
                  </span>
                  <span className="spec-val">
                    {book.publisher || "غير محدد"}
                  </span>
                </div>

                <div className="spec-row">
                  <span className="spec-label">
                    <Calendar size={15} className="inline-icon" /> سنة الطباعة:
                  </span>
                  <span className="spec-val">
                    {publishYear ? `${publishYear}م` : "غير محدد"}
                  </span>
                </div>

                <div className="spec-row">
                  <span className="spec-label">
                    <Hash size={15} className="inline-icon" /> الرقم المعياري
                    (ISBN):
                  </span>
                  <span className="spec-val">{isbnValue || "غير متوفر"}</span>
                </div>

                {descriptionText && (
                  <div className="spec-description">
                    <h5 className="spec-description-title">
                      نبذة عن الكتاب والقيمة العلمية
                    </h5>
                    <p className="spec-description-text">{descriptionText}</p>

                    {book.tableOfContents?.length > 0 && (
                      <div className="toc-box">
                        <h6 className="toc-title">
                          <Bookmark
                            size={18}
                            className="gold-icon inline-icon"
                          />
                          فهرس الموضوعات والأبواب
                        </h6>
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal لتكبير الصورة */}
      {isZoomed && (
        <div className="book-zoom-overlay" onClick={() => setIsZoomed(false)}>
          <div
            className="book-zoom-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="book-zoom-close-btn"
              onClick={() => setIsZoomed(false)}
              aria-label="إغلاق التكبير"
            >
              <X size={24} />
            </button>
            <img
              src={activeImage}
              alt={book.title || "صورة مكبرة"}
              className="book-zoomed-img"
            />
          </div>
        </div>
      )}
    </div>
  );
};
