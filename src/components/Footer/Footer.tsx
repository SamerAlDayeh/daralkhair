import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-wrapper">
      {/* Natural Tones Highlight Banner Bar */}
      <div className="footer-highlight-bar">
        <div className="container highlight-grid">
          <div className="highlight-item">
            <span className="highlight-tag">أحدث الإصدارات</span>
            <h4 className="highlight-title font-arabic">تاريخ الأندلس وحضارتها</h4>
            <p className="highlight-sub">للدكتور زياد أحمد</p>
          </div>

          <div className="highlight-item">
            <span className="highlight-tag">المجموعات الخاصة</span>
            <h4 className="highlight-title font-arabic">موسوعة طلاب العلم</h4>
            <p className="highlight-sub">خصم 25% هذا الشهر</p>
          </div>

          <div className="highlight-item stat-item">
            <div className="stat-num font-arabic">12k+</div>
            <div className="stat-text">
              كتاب تم شحنه<br />حول العالم
            </div>
          </div>

          <Link to="/books" className="highlight-action-box">
            <div>
              <h4 className="action-title">فهرس ودليل المطبوعات</h4>
              <p className="action-sub">استكشف أحدث كتب التراث المحققة</p>
            </div>
            <Send size={20} className="action-arrow rotate-180" />
          </Link>
        </div>
      </div>

      <div className="container footer-main-content">
        <div className="footer-grid">
          {/* Col 1: About */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <div className="brand-icon-box">
                <span className="brand-arabic-symbol">دار</span>
              </div>
              <div className="brand-text-box">
                <span className="brand-name font-arabic font-bold text-xl">دار الخير</span>
                <span className="brand-subtext font-arabic">للنشر والتوزيع</span>
              </div>
            </div>
            <p className="footer-about-text font-arabic">
              دار نشر مخصصة لتحقيق وتذهيب وطباعة أمهات كتب التراث الإسلامي وتفسير القرآن والحديث الشريف بأسلوب علمي فاخر يعكس أصالة الفكر الإسلامي.
            </p>
            <div className="footer-blessing font-arabic">
              "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ"
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading font-arabic">روابط سريعة</h4>
            <ul className="footer-links-list font-arabic">
              <li><Link to="/">الرئيسية</Link></li>
              <li><Link to="/books">المكتبة الشاملة</Link></li>
              <li><Link to="/offers">العروض والمجموعات</Link></li>
              <li><Link to="/about">عن دار الخير</Link></li>
              <li><Link to="/cart">سلة الشراء</Link></li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="footer-col">
            <h4 className="footer-heading font-arabic">أقسام المطبوعات</h4>
            <ul className="footer-links-list font-arabic">
              <li><Link to="/books?category=القرآن+وعلوم+التفسير">القرآن وعلوم التفسير</Link></li>
              <li><Link to="/books?category=الحديث+الشريف+والسنّة">الحديث الشريف والسنّة</Link></li>
              <li><Link to="/books?category=الفقه+وأصوله">الفقه وأصوله</Link></li>
              <li><Link to="/books?category=الرقائق+والتزكية">الرقائق والتزكية</Link></li>
              <li><Link to="/books?category=التاريخ+والسير">التاريخ والسير</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading font-arabic">العنوان والتواصل</h4>
            <ul className="contact-info-list font-arabic">
              <li>
                <MapPin size={16} className="contact-icon" />
                <span>طريق الملك عبد العزيز، المدينة المنورة، المملكة العربية السعودية</span>
              </li>
              <li>
                <Phone size={16} className="contact-icon" />
                <span>+966 14 822 4900 / +20 2 2401 5520</span>
              </li>
              <li>
                <Mail size={16} className="contact-icon" />
                <span>contact@daralkhairpublishers.com</span>
              </li>
              <li>
                <Clock size={16} className="contact-icon" />
                <span>الأحد - الخميس: 9:00 صباحاً - 8:00 مساءً</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="copyright-text font-arabic">
            © {new Date().getFullYear()} دار الخير للنشر والتوزيع. جميع الحقوق محفوظة.
          </div>
          <div className="footer-socials font-arabic">
            <a href="#twitter">تويتر</a>
            <a href="#facebook">فيسبوك</a>
            <a href="#instagram">انستغرام</a>
            <a href="#youtube">يوتيوب</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
