import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BOOKS_DATA, CATEGORIES } from '../../data/books';
import { SPECIAL_OFFERS } from '../../data/offers';
import { BookCard } from '../../components/BookCard/BookCard';
import { QuickViewModal } from '../../components/QuickViewModal/QuickViewModal';
import { IslamicPattern } from '../../components/IslamicPattern/IslamicPattern';
import { GoldBorderFrame } from '../../components/GoldBorderFrame/GoldBorderFrame';
import { Book } from '../../types';
import {
  BookOpen,
  Award,
  Users,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowLeft,
  Feather,
  Eye,
  ShoppingBag,
  Star
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion } from 'motion/react';
import './Home.css';

export const Home: React.FC = () => {
  const [quickViewBook, setQuickViewBook] = useState<Book | null>(null);
  const { addToCart } = useCart();

  const featuredBooks = BOOKS_DATA.slice(0, 6);
  const heroBook = BOOKS_DATA[0]; // Tafsir Ibn Kathir

  return (
    <div className="home-page font-arabic">
      {/* 1. HERO SECTION - SIMPLIFIED & ELEGANT */}
      <section className="hero-section">
        <IslamicPattern opacity={0.06} />
        <div className="hero-ambient-glow" />

        <div className="container hero-container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-badge font-arabic">
              <span className="gold-symbol">۞</span>
              <span>دار الخير للنشر والتوزيع — تأسست 1978م بالمدينة المنورة</span>
            </div>

            <h1 className="hero-title font-arabic">
              تحقيق علمي رصين <br />
              <span className="text-gold">وطباعة فاخرة</span> للتراث الإسلامي
            </h1>

            <p className="hero-subtitle font-arabic">
              نضع بين يديك أمهات كتب التفسير والحديث والفقه والتاريخ، بمراجعات علمية دقيقة مقابلة على أصح المخطوطات، وتجليد ملوكي مذهب يليق بعظمة العلم الشرعي.
            </p>

            <div className="hero-actions font-arabic">
              <Link to="/books" className="btn-gold hero-btn">
                <BookOpen size={18} />
                <span>تصفح المكتبة الشاملة</span>
              </Link>
              <Link to="/offers" className="btn-outline-gold hero-btn">
                <Sparkles size={18} />
                <span>العروض والمجموعات</span>
              </Link>
            </div>

            {/* Quick Trust Highlights */}
            <div className="hero-trust-bar font-arabic">
              <div className="trust-item">
                <ShieldCheck size={16} className="trust-icon" />
                <span>تحقيق علمي معتمد</span>
              </div>
              <div className="trust-divider">•</div>
              <div className="trust-item">
                <Award size={16} className="trust-icon" />
                <span>تجليد وتذهيب فاخر</span>
              </div>
              <div className="trust-divider">•</div>
              <div className="trust-item">
                <Truck size={16} className="trust-icon" />
                <span>شحن آمن لجميع الدول</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Featured Book Showcase */}
          <motion.div
            className="hero-showcase"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="hero-card-frame">
              <div className="hero-card-top-tag">إصدار متميز ومحقق</div>
              <div className="hero-card-img-wrapper">
                <img
                  src={heroBook.coverImage}
                  alt={heroBook.title}
                  className="hero-card-img"
                />
              </div>
              <div className="hero-card-info font-arabic">
                <div className="hero-card-category">{heroBook.category}</div>
                <h3 className="hero-card-title">{heroBook.title}</h3>
                <p className="hero-card-author">بقلم: {heroBook.authorArabic || heroBook.author}</p>
                <div className="hero-card-footer">
                  <div className="hero-card-price font-arabic">
                    <span className="price-label">السعر:</span>
                    <span className="price-value">${heroBook.price.toFixed(2)}</span>
                  </div>
                  <div className="hero-card-btns">
                    <button
                      className="btn-quick-view"
                      onClick={() => setQuickViewBook(heroBook)}
                      title="معاينة الكتاب"
                    >
                      <Eye size={16} />
                      <span>معاينة</span>
                    </button>
                    <button
                      className="btn-add-cart"
                      onClick={() => addToCart(heroBook, 1)}
                      title="أضف إلى السلة"
                    >
                      <ShoppingBag size={16} />
                      <span>شراء</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid font-arabic">
            <div className="stat-card">
              <div className="stat-num">1,200+</div>
              <div className="stat-label">مطبوعة محققة</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">45+</div>
              <div className="stat-label">عاماً في خدمة التراث</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">85+</div>
              <div className="stat-label">جامعة ومكتبة معتمدة</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">65+</div>
              <div className="stat-label">دولة يتم الشحن إليها</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES SECTION */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle font-arabic">التخصصات والعلوم</span>
            <h2 className="section-title font-arabic">أقسام وموسوعات المكتبة</h2>
            <div className="ornament-divider">
              <span className="ornament-symbol">✦ ۞ ✦</span>
            </div>
          </div>

          <div className="categories-grid font-arabic">
            {CATEGORIES.filter(c => c !== 'جميع التصنيفات').map((cat, idx) => (
              <Link
                to={`/books?category=${encodeURIComponent(cat)}`}
                key={idx}
                className="category-card"
              >
                <div className="category-icon-box">
                  <Feather className="category-icon" size={22} />
                </div>
                <div className="category-info">
                  <h3 className="category-name">{cat}</h3>
                  <span className="category-link">استعرض الإصدارات ←</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED BOOKS SHOWCASE */}
      <section className="books-showcase-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle font-arabic">إصدارات جديدة</span>
            <h2 className="section-title font-arabic">أحدث كتب ومراجع دار الخير</h2>
            <div className="ornament-divider">
              <span className="ornament-symbol">✦ ۞ ✦</span>
            </div>
          </div>

          <div className="books-grid">
            {featuredBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onQuickView={b => setQuickViewBook(b)}
              />
            ))}
          </div>

          <div className="view-more-container">
            <Link to="/books" className="btn-outline-gold font-arabic">
              <span>عرض كامل فهرس الكتب</span>
              <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. SPECIAL BUNDLE OFFER BANNER */}
      <section className="offers-banner-section">
        <IslamicPattern opacity={0.06} />
        <div className="container">
          <div className="offers-banner-card font-arabic">
            <div className="offers-banner-text">
              <span className="offers-badge">عروض المجموعات الخاصة</span>
              <h2 className="offers-title">{SPECIAL_OFFERS[0].title}</h2>
              <p className="offers-desc">{SPECIAL_OFFERS[0].description}</p>
              <div className="offers-price-row">
                <span className="offer-now">${SPECIAL_OFFERS[0].offerPrice.toFixed(2)}</span>
                <span className="offer-was">${SPECIAL_OFFERS[0].originalPrice.toFixed(2)}</span>
                <span className="offer-code">رمز الخصم: {SPECIAL_OFFERS[0].code}</span>
              </div>
              <Link to="/offers" className="btn-gold font-arabic mt-3 inline-flex">
                <span>اطلب المجموعة الآن</span>
                <ArrowLeft size={16} />
              </Link>
            </div>
            <div className="offers-banner-img-box">
              <img
                src={SPECIAL_OFFERS[0].image}
                alt={SPECIAL_OFFERS[0].title}
                className="offers-banner-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. ABOUT SUMMARY SECTION */}
      <section className="about-summary-section">
        <div className="container">
          <div className="about-summary-grid font-arabic">
            <div className="about-text-content">
              <span className="section-subtitle">أصالة وعراقة</span>
              <h2 className="about-heading font-arabic">
                أكثر من أربعة عقود في خدمة الكتاب الشرعي
              </h2>
              <p className="about-p">
                تأسست <strong>دار الخير للنشر والتوزيع</strong> عام 1978م، ومقعدها الرئيس بالمدينة المنورة. حرصت الدار منذ تأسيسها على إخراج كتب التراث في أبهى صورة علمية وفنية.
              </p>
              <div className="about-quote-box font-arabic">
                "إن هذا العلم دين؛ فانظروا عمن تأخذون دينكم"
                <span className="quote-author">— الإمام محمد بن سيرين رحمه الله</span>
              </div>
              <Link to="/about" className="btn-outline-gold font-arabic mt-3 inline-flex">
                <span>تعرّف على منهج الدار وهيئة التحقيق</span>
              </Link>
            </div>

            <div className="about-visual-box">
              <GoldBorderFrame variant="ornate">
                <img
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=900"
                  alt="مخطوطات ومكتبة إسلامية"
                  className="about-visual-img"
                />
              </GoldBorderFrame>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE US */}
      <section className="why-us-section">
        <div className="container">
          <div className="section-header font-arabic">
            <span className="section-subtitle">مميزات مطبوعاتنا</span>
            <h2 className="section-title">لماذا يفضل العلماء طبعات دار الخير؟</h2>
            <div className="ornament-divider">
              <span className="ornament-symbol">✦ ۞ ✦</span>
            </div>
          </div>

          <div className="why-us-grid font-arabic">
            <div className="why-card">
              <div className="why-icon-box">
                <ShieldCheck size={26} />
              </div>
              <h3>تحقيق علمي دقيق</h3>
              <p>مقابلة النص على أصح المخطوطات والنسخ الخطية مع تخريج شامل.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-box">
                <Award size={26} />
              </div>
              <h3>تجليد وتذهيب ملوكي</h3>
              <p>استخدام أوراق عاجية خالية من الحموضة وتذهيب مذهب عالي الجودة.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-box">
                <Truck size={26} />
              </div>
              <h3>تغليف وشحن محمي</h3>
              <p>تغليف مخصص لحماية أطراف المجلدات وضمان وصولها بحالة ممتازة.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-box">
                <Users size={26} />
              </div>
              <h3>اعتماد الكليات الشرعية</h3>
              <p>اعتماد واسع كطبعات مرجعية في جامعات ومراكز الأبحاث الإسلامية.</p>
            </div>
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
