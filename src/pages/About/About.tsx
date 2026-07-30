import React from 'react';
import { IslamicPattern } from '../../components/IslamicPattern/IslamicPattern';
import { GoldBorderFrame } from '../../components/GoldBorderFrame/GoldBorderFrame';
import { Award, Compass, ShieldCheck, Globe, Users, CheckCircle } from 'lucide-react';
import './About.css';

export const About: React.FC = () => {
  return (
    <div className="about-page font-arabic">
      {/* Hero Header */}
      <section className="about-hero">
        <IslamicPattern opacity={0.08} />
        <div className="container">
          <div className="about-hero-content font-arabic">
            <span className="section-subtitle font-arabic">عن دار الخير للنشر والتوزيع</span>
            <h1 className="about-hero-title font-arabic">أكثر من أربع عقود في خدمة أمهات كتب التراث الإسلامي</h1>
            <p className="about-hero-desc font-arabic">
              مسيرة عريقة مكرسة للتحقيق العلمي الدقيق للمخطوطات، والطباعة الفاخرة المذهبة، ونشر العلوم الشرعية للباحثين والمكتبات حول العالم.
            </p>
          </div>
        </div>
      </section>

      {/* History & Foundation */}
      <section className="history-section">
        <div className="container">
          <div className="history-grid font-arabic">
            <div className="history-text">
              <span className="section-subtitle">نشأتنا وتاريخنا</span>
              <h2 className="history-heading font-arabic">
                تأسست بالمدينة المنورة عام 1398 هـ / 1978 م
              </h2>
              <p className="about-paragraph">
                تأسست <strong>دار الخير للنشر والتوزيع</strong> بالمدينة المنورة على يد نخبة من العلماء والمحققين والمهتمين بجمع ونشر أمهات كتب التراث الشرعي. ونظرًا لانتشار الطباعات غير المحققة أو المشحونة بالأخطاء المطبعية، آلى مؤسسو الدار على أنفسهم إيجاد صرح علمي يمنح المخطوط الشرعي حقّه من التدقيق والمقابلة على النسخ الخطيّة النادرة.
              </p>
              <p className="about-paragraph">
                وعلى مدار أكثر من أربعين عاماً، نمت دار الخير لتتحول من محترف تحقيق متخصص إلى دار نشر إسلامية عالمية معتمدة من كبرى الكليات والجامعات والمراكز الأكاديمية في العالم الإسلامي.
              </p>
              <div className="heritage-badge-box font-arabic">
                <ShieldCheck size={28} className="gold-icon" />
                <div>
                  <strong>ضمان الاعتماد العلمي والتحقيق</strong>
                  <p>تخضع جميع إصداراتنا لمراجعة وإقرار المجلس العلمي الأعلى لعلماء الحديث والفقه.</p>
                </div>
              </div>
            </div>

            <div className="history-visual">
              <GoldBorderFrame variant="ornate">
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=900"
                  alt="مخطوطات إسلامية قديمة"
                  className="history-img"
                />
              </GoldBorderFrame>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Goals */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="section-header font-arabic">
            <span className="section-subtitle">رؤيتنا المنهجية</span>
            <h2 className="section-title">الرسالة، الرؤية والأهداف الأكاديمية</h2>
            <div className="ornament-divider">
              <span className="ornament-symbol">✦ ۞ ✦</span>
            </div>
          </div>

          <div className="pillars-grid font-arabic">
            {/* Pillar 1: Mission */}
            <div className="pillar-card">
              <div className="pillar-icon-box">
                <Compass size={32} />
              </div>
              <h3 className="pillar-title">رسالتنا</h3>
              <div className="pillar-arabic font-arabic">خدمة التراث</div>
              <p className="pillar-desc">
                صون التراث الفكري والديني الإسلامي عبر طباعة وتحقيق أمهات كتب التفسير، الحديث، الفقه، والتزكية بأعلى معايير الدقة العلمية والجمال الفني.
              </p>
            </div>

            {/* Pillar 2: Vision */}
            <div className="pillar-card">
              <div className="pillar-icon-box">
                <Globe size={32} />
              </div>
              <h3 className="pillar-title">رؤيتنا</h3>
              <div className="pillar-arabic font-arabic">الريادة العالمية</div>
              <p className="pillar-desc">
                أن نكون المرجع الأول الموثوق للطباعة الشرعية الفاخرة عالميًا، وتسهيل وصول العلوم النافعة لطلاب العلم والجامعات والمكتبات الإسلامية.
              </p>
            </div>

            {/* Pillar 3: Core Goals */}
            <div className="pillar-card">
              <div className="pillar-icon-box">
                <Award size={32} />
              </div>
              <h3 className="pillar-title">أهدافنا</h3>
              <div className="pillar-arabic font-arabic">التطوير المستمر</div>
              <p className="pillar-desc">
                استمرار رقمة المخطوطات النادرة، ودعم الباحثين المعاصرين، والحفاظ على جودة الورق العاجي الخالي من الحموضة والتذهيب الملوكي.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Publishing Message & Editorial Integrity */}
      <section className="editorial-message-section">
        <IslamicPattern opacity={0.06} />
        <div className="container">
          <div className="message-card font-arabic">
            <span className="section-subtitle">المنهج العلمي</span>
            <h2 className="message-title font-arabic">رسالة الهيئة العلمية ولائحة التحقيق</h2>
            <div className="message-quote font-arabic">
              "إن العناية بكتاب الله وسنة نبينا محمد ﷺ وتحقيق كتب التراث الإسلامي أمانة عظمى، لا نبتغي بها إلا وجه الله تعالى وحفظ شريعة المطهرة"
            </div>
            <p className="message-p font-arabic">
              في دار الخير للنشر والتوزيع، لا ننظر إلى طباعة الكتاب كعمل تجاري مجرد، بل كأمانة شرعية وأخلاقية. تمر كل مطبوعة بثلاث مراحل رئيسية قبل اعتمادها للنشر:
            </p>
            <div className="stages-list font-arabic">
              <div className="stage-item">
                <CheckCircle size={20} className="gold-icon" />
                <span><strong>المرحلة الأولى: المقابلة على المخطوطات</strong> — مقابلة النص على ثلاث نسخ خطية أصيلة على الأقل من الخزائن التاريخية.</span>
              </div>
              <div className="stage-item">
                <CheckCircle size={20} className="gold-icon" />
                <span><strong>المرحلة الثانية: الخدمة العلمية والتعليق</strong> — تخريج الأحاديث والآثار، وتفصيل الفروق اللغوية، وضبط الكلمات بالشكْل التام.</span>
              </div>
              <div className="stage-item">
                <CheckCircle size={20} className="gold-icon" />
                <span><strong>المرحلة الثالثة: الإخراج الفني الملوكي</strong> — الطباعة على ورق عاجي خالي من الحموضة، وتذهيب الأغلفة بماء الذهب 24k والخياطة اليابانية.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Senior Scholars */}
      <section className="scholars-section">
        <div className="container">
          <div className="section-header font-arabic">
            <span className="section-subtitle">الإشراف الأكاديمي</span>
            <h2 className="section-title">المجلس العلمي وهيئة التحقيق</h2>
            <div className="ornament-divider">
              <span className="ornament-symbol">✦ ۞ ✦</span>
            </div>
          </div>

          <div className="scholars-grid font-arabic">
            <div className="scholar-card">
              <div className="scholar-avatar-box">
                <Users size={32} className="gold-icon" />
              </div>
              <h3 className="scholar-name">فضيلة الشيخ د. عبد الرحمن المدني</h3>
              <div className="scholar-role">رئيس هيئة تحرير الحديث الشريف والأسانيد</div>
              <p className="scholar-bio">أستاذ علوم الحديث سابقاً بالجامعة الإسلامية بالمدينة المنورة وخبرة أكثر من 35 عاماً في تحقيق المخطوطات.</p>
            </div>

            <div className="scholar-card">
              <div className="scholar-avatar-box">
                <Users size={32} className="gold-icon" />
              </div>
              <h3 className="scholar-name">د. فاطمة الأزهرية</h3>
              <div className="scholar-role">مديرة قسم التفسير واللغة العربية</div>
              <p className="scholar-bio">متخصصة في علوم القراءات والتفسير والتراث الأندلسي وحاصلة على الدكتوراه من جامعة الأزهر الشريف.</p>
            </div>

            <div className="scholar-card">
              <div className="scholar-avatar-box">
                <Users size={32} className="gold-icon" />
              </div>
              <h3 className="scholar-name">الخطاط يوسف الخطاط</h3>
              <div className="scholar-role">المشرف الفني على خطوط المصاحف والأغلفة</div>
              <p className="scholar-bio">خطاط ومرمم معتمد للخطوط الثلث والنسخي ومصمم حليات الأغلفة المذهبة بدار الخير.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
