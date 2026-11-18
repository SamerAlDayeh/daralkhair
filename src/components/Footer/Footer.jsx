import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Twitter,
} from "lucide-react";
import BOOKS_DATA from "../../data/Books.json";
import { SOCIAL_LINKS } from "../../data/socialLinks";
import "./Footer.css";

const SOCIAL_ICONS = {
  facebook: Facebook,
  x: Twitter,
  instagram: Instagram,
  telegram: Send,
  whatsapp: MessageCircle,
};

const BOOK_CATEGORIES = [
  ...new Set(BOOKS_DATA.map((book) => book.category).filter(Boolean)),
];

export const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-main-content">
        <div className="footer-grid">
          {/* Col 1: Brand & About */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <img
                src="/logo.webp"
                alt="شعار دار الخير للنشر والتوزيع"
                className="footer-logo"
              />
            </div>
            <p className="footer-about-text font-arabic">
              دار نشر تأسست في إسطنبول عام 2015م، تُعنى بنشر التراث الإسلامي في
              مجالات التفسير والحديث والفقه واللغة والأدب، تحت شعار: «تراثنا
              مجد أمتنا».
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
              {BOOK_CATEGORIES.map((category) => (
                <li key={category}>
                  <Link to={`/books?category=${encodeURIComponent(category)}`}>
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading font-arabic">الفروع والتواصل</h4>
            <ul className="contact-info-list font-arabic">
              <li>
                <MapPin size={18} className="contact-icon" />
                <span>
                  فروع الدار: القاهرة، بيروت، دمشق
                </span>
              </li>
              <li>
                <Mail size={18} className="contact-icon" />
                <a href="mailto:darulhayrnashron@gmail.com">
                  darulhayrnashron@gmail.com
                </a>
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
            {SOCIAL_LINKS.map(({ name, label, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`حساب دار الخير على ${label}`}
                title={label}
                className={`footer-social-link ${name}`}
              >
                {React.createElement(SOCIAL_ICONS[name], {
                  size: 19,
                  "aria-hidden": true,
                })}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
