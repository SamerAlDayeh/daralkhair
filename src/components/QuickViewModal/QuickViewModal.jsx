import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import {
  X,
  ShoppingBag,
  Building2,
  Calendar,
  Hash,
  ZoomIn,
} from "lucide-react";
import "./QuickViewModal.css";

// دالة تنسيق السعر
const formatPrice = (price) => {
  const num = Number(price);
  return isNaN(num) ? "0.00" : num.toFixed(2);
};

// دالة استخراج صورة الغلاف بمرونة
const getCoverImage = (b) => {
  if (!b) return "/placeholder-book.jpg";
  return (
    b.coverImage ||
    b.cover_image ||
    b.image ||
    b.img ||
    b.cover ||
    "/placeholder-book.jpg"
  );
};

// دالة استخراج الصور الداخلية بمرونة مهما كان مسمى الحقل في الـ JSON
const getInsideImages = (b) => {
  if (!b) return [];
  let imgs =
    b.insideImages ||
    b.inside_images ||
    b.images ||
    b.gallery ||
    b.previewImages ||
    [];

  if (typeof imgs === "string") {
    imgs = [imgs];
  }
  return Array.isArray(imgs) ? imgs : [];
};

export const QuickViewModal = ({ book, onClose }) => {
  // 1. جميع الـ Hooks تُستدعى أولاً وبنفس الترتيب دائماً
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);

  // 2. تحديث الحالة عند تغيير الكتاب
  useEffect(() => {
    if (book) {
      setSelectedImg(getCoverImage(book));
      setQuantity(1);
      setIsZoomed(false);
    }
  }, [book]);

  // 3. إيقاف التنفيذ بعد الـ Hooks في حال عدم وجود كتاب
  if (!book) return null;

  // 4. استخراج كافة الصور بمرونة مع منع التكرار
  const coverImg = getCoverImage(book);
  const insideImgs = getInsideImages(book);
  const allImages = Array.from(
    new Set([coverImg, ...insideImgs].filter(Boolean)),
  );
  const activeImage = selectedImg || coverImg;

  // التحقق من وجود المواصفات
  const isbnValue = book.ISBN || book.isbn;
  const hasSpecs = Boolean(book.publisher || book.year || isbnValue);

  const handleAddToCart = () => {
    addToCart(book, quantity);
    onClose();
  };

  return (
    <>
      <div className="quickview-backdrop" onClick={onClose}>
        <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
          <button
            className="quickview-close-btn"
            onClick={onClose}
            aria-label="إغلاق النافذة"
          >
            <X size={20} />
          </button>

          <div className="quickview-grid">
            {/* معرض الصور */}
            <div className="quickview-gallery">
              <div
                className="quickview-main-img-box"
                onClick={() => setIsZoomed(true)}
                title="اضغط لتكبير الصورة"
              >
                <img
                  src={activeImage}
                  alt={book.title || "صورة الكتاب"}
                  className="quickview-main-img"
                />
              </div>

              {/* عرض شريط المصغرات إذا كان هناك أكثر من صورة واحدة */}
              {allImages.length > 1 && (
                <div className="quickview-thumbnails">
                  {allImages.map((imgUrl, idx) => (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt={`صورة ${idx + 1}`}
                      className={`thumb ${activeImage === imgUrl ? "active" : ""}`}
                      onClick={() => setSelectedImg(imgUrl)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* تفاصيل الكتاب */}
            <div className="quickview-details">
              {book.category && (
                <div className="quickview-category font-arabic">
                  {book.category}
                </div>
              )}

              {book.title && (
                <h2 className="quickview-title font-arabic">{book.title}</h2>
              )}

              {book.author && (
                <div className="quickview-author font-arabic">
                  المؤلف: {book.author}
                </div>
              )}

              {book.price !== undefined && (
                <div className="quickview-price-row">
                  <span className="price">${formatPrice(book.price)}</span>
                </div>
              )}

              {book.description && (
                <p className="quickview-desc font-arabic">{book.description}</p>
              )}

              {/* المواصفات تظهر فقط للبيانات المحددة في الـ JSON */}
              {hasSpecs && (
                <div className="quickview-specs-grid font-arabic">
                  {book.publisher && (
                    <div className="spec-item">
                      <Building2 size={15} className="spec-icon" />
                      <span>
                        دار النشر: <strong>{book.publisher}</strong>
                      </span>
                    </div>
                  )}

                  {book.year && (
                    <div className="spec-item">
                      <Calendar size={15} className="spec-icon" />
                      <span>
                        سنة النشر: <strong>{book.year}</strong>
                      </span>
                    </div>
                  )}

                  {isbnValue && (
                    <div className="spec-item">
                      <Hash size={15} className="spec-icon" />
                      <span>
                        الرقم المعياري: <strong>{isbnValue}</strong>
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* اختيار الكمية والشراء */}
              <div className="quickview-cart-row">
                <div className="qty-picker">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="qty-btn"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="qty-val">{quantity}</span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn-gold flex-1 font-arabic"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={18} />
                  <span>أضف إلى سلة الشراء</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* نافذة تكبير الصورة (Lightbox Overlay) */}
      {isZoomed && (
        <div
          className="quickview-zoom-overlay"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="quickview-zoom-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="quickview-zoom-close-btn"
              onClick={() => setIsZoomed(false)}
              aria-label="إغلاق التكبير"
            >
              <X size={24} />
            </button>
            <img
              src={activeImage}
              alt={book.title || "صورة مكبرة"}
              className="quickview-zoomed-img"
            />
          </div>
        </div>
      )}
    </>
  );
};
