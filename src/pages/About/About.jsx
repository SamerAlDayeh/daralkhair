import React from "react";
import { IslamicPattern } from "../../components/IslamicPattern/IslamicPattern";
import { GoldBorderFrame } from "../../components/GoldBorderFrame/GoldBorderFrame";
import {
  Award,
  Compass,
  Globe,
  BookOpen,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import "./About.css";

export const About = () => {
  return (
    <div className="about-page font-arabic">
      {/* Hero Header */}
      <section className="about-hero">
        <IslamicPattern opacity={0.08} />
        <div className="container">
          <div className="about-hero-content font-arabic">
            <span className="section-subtitle font-arabic">
              عن دار الخير ناشرون
            </span>
            <h1 className="about-hero-title font-arabic">
              تراثنا مجد أمتنا
            </h1>
            <p className="about-hero-desc font-arabic">
              دار نشر تأسست في إسطنبول عام 2015م، وتُعنى بنشر التراث الإسلامي
              في التفسير والحديث والفقه واللغة والأدب.
            </p>
          </div>
        </div>
      </section>

      {/* History & Foundation */}
      <section className="history-section">
        <div className="container">
          <div className="history-grid font-arabic">
            <div className="history-text">
              <span className="section-subtitle">النشأة والتاريخ</span>
              <h2 className="history-heading font-arabic">
                انطلقت من إسطنبول عام 2015م
              </h2>
              <p className="about-paragraph">
                تأسست <strong>دار الخير ناشرون</strong> في مدينة إسطنبول عام
                2015م على يد الأستاذ بلال أبو الخير، ثم توسع نشاطها ليشمل
                دمشق وبيروت والقاهرة.
              </p>
              <p className="about-paragraph">
                تعتني الدار بنشر التراث الإسلامي في العلوم والفنون، ومنه كتب
                التفسير وعلومه، والحديث وأصوله، والفقه وأصوله، واللغة والأدب؛
                إيمانًا بقيمة هذا التراث وأثره في العلم والحضارة.
              </p>
              <div className="heritage-badge-box font-arabic">
                <BookOpen size={28} className="gold-icon" />
                <div>
                  <strong>مجالات النشر</strong>
                  <p>
                    التفسير وعلومه، والحديث وأصوله، والفقه وأصوله، واللغة
                    والأدب.
                  </p>
                </div>
              </div>
            </div>

            <div className="history-visual">
              <GoldBorderFrame variant="ornate">
                <img
                  src="/about-history.jpg"
                  alt="مجموعة من الكتب والإصدارات التراثية"
                  className="history-img"
                />
              </GoldBorderFrame>
            </div>
          </div>
        </div>
      </section>

      {/* Founding principle */}
      <section className="editorial-message-section">
        <IslamicPattern opacity={0.06} />
        <div className="container">
          <div className="message-card font-arabic">
            <h2 className="message-title font-arabic">منطلقنا</h2>
            <span className="section-subtitle">بسم الله الرحمن الرحيم</span>
            <div className="message-quote font-arabic">
              ﴿وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ وَرَسُولُهُ
              وَالْمُؤْمِنُونَ ۖ وَسَتُرَدُّونَ إِلَىٰ عَالِمِ الْغَيْبِ
              وَالشَّهَادَةِ فَيُنَبِّئُكُم بِمَا كُنتُمْ تَعْمَلُونَ﴾
            </div>
            <p className="message-p font-arabic">
              الحمد لله رب العالمين، والصلاة والسلام على سيدنا محمد وعلى آله
              وأصحابه أجمعين. نسأل الله أن يستعملنا في خدمة دينه وأمته، وألا
              يستبدلنا، وهو أرحم الراحمين.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Goals */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="section-header font-arabic">
            <span className="section-subtitle">رسالتنا ورؤيتنا</span>
            <h2 className="section-title">
              رسالتنا ورؤيتنا وأهدافنا
            </h2>
          </div>

          <div className="pillars-grid font-arabic">
            <div className="pillar-card">
              <h3 className="pillar-title">رسالتنا</h3>
              <div className="pillar-arabic font-arabic">إحياء التراث</div>
              <p className="pillar-desc">
                العناية بنشر التراث الإسلامي العريق وإحيائه بأسلوب علمي وفني
                متقن، وإيصال إبداعات العلماء المسلمين في التفسير والحديث والفقه
                والأصول واللغة والأدب إلى القراء والباحثين.
              </p>
            </div>

            <div className="pillar-card">
              <h3 className="pillar-title">رؤيتنا</h3>
              <div className="pillar-arabic font-arabic">آفاق عالمية</div>
              <p className="pillar-desc">
                أن تكون الدار رائدة عالميًا في خدمة علوم التراث الإسلامي وما
                يتصل بها من فنون وعلوم، وأن تصل بإصداراتها إلى القراء في مختلف
                أنحاء العالم.
              </p>
            </div>
          </div>

          <div className="goals-panel font-arabic">
            <div className="goals-heading">
              <div className="pillar-icon-box">
                <Award size={32} />
              </div>
              <div>
                <h3 className="pillar-title">أهدافنا</h3>
                <p className="goals-intro">
                  نسعى إلى تحقيق هذه الأهداف في خدمة التراث الإسلامي ونشره.
                </p>
              </div>
            </div>
            <ul className="pillar-goals-list">
              <li>
                <CheckCircle size={20} className="gold-icon" />
                <p>
                  <strong>إحياء التراث</strong>
                  <span>
                    نشر مؤلفات العلماء في التفسير والحديث والفقه واللغة والأدب.
                  </span>
                </p>
              </li>
              <li>
                <CheckCircle size={20} className="gold-icon" />
                <p>
                  <strong>ترسيخ الهوية</strong>
                  <span>
                    استلهام شعار الدار «تراثنا مجد أمتنا» وما يحمله من قيم
                    ومعانٍ.
                  </span>
                </p>
              </li>
              <li>
                <CheckCircle size={20} className="gold-icon" />
                <p>
                  <strong>الانتشار والتوسع</strong>
                  <span>
                    إيصال إصدارات الدار عبر مراكزها في إسطنبول ودمشق وبيروت
                    والقاهرة.
                  </span>
                </p>
              </li>
              <li>
                <CheckCircle size={20} className="gold-icon" />
                <p>
                  <strong>إتقان النشر</strong>
                  <span>
                    الاهتمام بالطباعة والتحقيق والإخراج الفني بما يليق بقيمة
                    الكتب.
                  </span>
                </p>
              </li>
              <li>
                <CheckCircle size={20} className="gold-icon" />
                <p>
                  <strong>الإخلاص والخدمة</strong>
                  <span>
                    خدمة الدين والأمة والإسهام في النهضة العلمية والثقافية.
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="branches-section">
        <div className="container">
          <div className="section-header font-arabic">
            <span className="section-subtitle">تواصل معنا</span>
            <h2 className="section-title">عناوين الفروع</h2>
          </div>

          <div className="branch-contacts-grid font-arabic">
            <article className="branch-contact-card">
              <div className="branch-contact-heading">
                <MapPin size={22} className="gold-icon" />
                <div>
                  <h3>فرع القاهرة</h3>
                  <span>مصر</span>
                </div>
              </div>
              <p className="branch-contact-address">
                خلف الجامع الأزهر، 5 شارع الدرديري، القاهرة.
              </p>
              <a
                className="branch-contact-link"
                href="https://maps.app.goo.gl/Xw8nVWPjio7nUmyWA"
                target="_blank"
                rel="noreferrer"
              >
                <MapPin size={18} />
                <span>عرض موقع الفرع على الخريطة</span>
              </a>
              <a className="branch-contact-link" href="tel:0225122742">
                <Phone size={18} />
                <span>هاتف: <bdi dir="ltr">0225122742</bdi></span>
              </a>
              <a
                className="branch-contact-link branch-whatsapp"
                href="https://wa.me/201068551788"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} />
                <span>واتساب: <bdi dir="ltr">01068551788</bdi></span>
              </a>
            </article>

            <article className="branch-contact-card">
              <div className="branch-contact-heading">
                <MapPin size={22} className="gold-icon" />
                <div>
                  <h3>فرع بيروت</h3>
                  <span>فردان، لبنان</span>
                </div>
              </div>
              <a
                className="branch-contact-link"
                href="https://maps.app.goo.gl/HLtmJKd4isPCMSZR9"
                target="_blank"
                rel="noreferrer"
              >
                <MapPin size={18} />
                <span>عرض موقع الفرع على الخريطة</span>
              </a>
              <a className="branch-contact-link" href="tel:009611865697">
                <Phone size={18} />
                <span>هاتف أرضي: <bdi dir="ltr">009611865697</bdi></span>
              </a>
              <a
                className="branch-contact-link branch-whatsapp"
                href="https://wa.me/96181129752"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} />
                <span>واتساب: <bdi dir="ltr">0096181129752</bdi></span>
              </a>
            </article>

            <article className="branch-contact-card">
              <div className="branch-contact-heading">
                <MapPin size={22} className="gold-icon" />
                <div>
                  <h3>فرع دمشق</h3>
                  <span>الحلبوني، سوريا</span>
                </div>
              </div>
              <a className="branch-contact-link" href="tel:2238135">
                <Phone size={18} />
                <span>هاتف: <bdi dir="ltr">2238135</bdi></span>
              </a>
              <a className="branch-contact-link" href="tel:0955484912">
                <Phone size={18} />
                <span>هاتف: <bdi dir="ltr">0955484912</bdi></span>
              </a>
            </article>
          </div>

          <a
            className="branches-email-link"
            href="mailto:darulhayrnashron@gmail.com"
          >
            <Mail size={20} className="gold-icon" />
            <span>البريد الإلكتروني:</span>
            <bdi dir="ltr">darulhayrnashron@gmail.com</bdi>
          </a>
        </div>
      </section>
    </div>
  );
};
