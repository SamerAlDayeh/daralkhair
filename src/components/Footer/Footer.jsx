import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-main-content">
        <div className="footer-grid">
          {/* Col 1: Brand & About */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <div className="brand-icon-box">
                <span className="brand-arabic-symbol">دار</span>
              </div>
              <div className="brand-text-box">
                <span className="brand-name font-arabic font-bold text-xl">
                  دار الخير
                </span>
                <span className="brand-subtext font-arabic">
                  للنشر والتوزيع
                </span>
              </div>
            </div>
            <p className="footer-about-text font-arabic">
              دار نشر مخصصة لتحقيق وتذهيب وطباعة أمهات كتب التراث الإسلامي
              وتفسير القرآن والحديث الشريف بأسلوب علمي فاخر يعكس أصالة الفكر
              الإسلامي.
            </p>
            <div className="footer-blessing font-arabic">
              "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ
              لَهُ طَرِيقًا إِلَى الْجَنَّةِ"
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading font-arabic">روابط سريعة</h4>
            <ul className="footer-links-list font-arabic">
              <li>
                <Link to="/">الرئيسية</Link>
              </li>
              <li>
                <Link to="/books">المكتبة الشاملة</Link>
              </li>
              <li>
                <Link to="/offers">العروض والمجموعات</Link>
              </li>
              <li>
                <Link to="/about">عن دار الخير</Link>
              </li>
              <li>
                <Link to="/cart">سلة الشراء</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="footer-col">
            <h4 className="footer-heading font-arabic">أقسام المطبوعات</h4>
            <ul className="footer-links-list font-arabic">
              <li>
                <Link to="/books?category=القرآن+وعلوم+التفسير">
                  القرآن وعلوم التفسير
                </Link>
              </li>
              <li>
                <Link to="/books?category=الحديث+الشريف+والسنّة">
                  الحديث الشريف والسنّة
                </Link>
              </li>
              <li>
                <Link to="/books?category=الفقه+وأصوله">الفقه وأصوله</Link>
              </li>
              <li>
                <Link to="/books?category=الرقائق+والتزكية">
                  الرقائق والتزكية
                </Link>
              </li>
              <li>
                <Link to="/books?category=التاريخ+والسير">التاريخ والسير</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading font-arabic">العنوان والتواصل</h4>
            <ul className="contact-info-list font-arabic">
              <li>
                <MapPin size={18} className="contact-icon" />
                <span>
                  طريق الملك عبد العزيز، المدينة المنورة، المملكة العربية
                  السعودية
                </span>
              </li>
              <li>
                <Phone size={18} className="contact-icon" />
                <span dir="ltr">+966 14 822 4900 / +20 2 2401 5520</span>
              </li>
              <li>
                <Mail size={18} className="contact-icon" />
                <span>contact@daralkhairpublishers.com</span>
              </li>
              <li>
                <Clock size={18} className="contact-icon" />
                <span>الأحد - الخميس: 9:00 صباحاً - 8:00 مساءً</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="copyright-text font-arabic">
            © {new Date().getFullYear()} دار الخير للنشر والتوزيع. جميع الحقوق
            محفوظة.
          </div>
          <div className="footer-socials font-arabic">
            <a href="#twitter" aria-label="Twitter">
              تويتر
            </a>
            <a href="#facebook" aria-label="Facebook">
              فيسبوك
            </a>
            <a href="#instagram" aria-label="Instagram">
              انستغرام
            </a>
            <a href="#youtube" aria-label="YouTube">
              يوتيوب
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
