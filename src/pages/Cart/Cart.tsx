import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { GoldBorderFrame } from '../../components/GoldBorderFrame/GoldBorderFrame';
import { CustomerDetails } from '../../types';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  MessageSquare,
  ArrowRight,
  Truck
} from 'lucide-react';
import './Cart.css';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    country: 'المملكة العربية السعودية',
    notes: '',
  });

  const [, setOrderSent] = useState(false);

  const shippingFee = cart.length > 0 ? (totalPrice > 200 ? 0 : 25) : 0;
  const grandTotal = totalPrice + shippingFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = () => {
    if (cart.length === 0) return '';

    let text = `*طلب جديد من موقع دار الخير للنشر والتوزيع*\n`;
    text += `----------------------------------------\n`;
    text += `*بيانات العميل:*\n`;
    text += `• الاسم: ${customer.fullName || 'غير مدخل'}\n`;
    text += `• الهاتف: ${customer.phone || 'غير مدخل'}\n`;
    text += `• العنوان: ${customer.address || 'غير مدخل'} - ${customer.city || ''} (${customer.country})\n`;
    if (customer.notes) text += `• ملاحظات: ${customer.notes}\n`;

    text += `\n*الكتب والمطبوعات المطلوبة:*\n`;
    cart.forEach((item, index) => {
      text += `${index + 1}. *${item.book.title}*\n`;
      text += `   الكمية: ${item.quantity} × $${item.book.price} = *$${(item.quantity * item.book.price).toFixed(2)}*\n`;
    });

    text += `----------------------------------------\n`;
    text += `• المجموع الفرعي: $${totalPrice.toFixed(2)}\n`;
    text += `• الشحن: ${shippingFee === 0 ? 'مجاني' : `$${shippingFee.toFixed(2)}`}\n`;
    text += `• *الإجمالي الكلي: $${grandTotal.toFixed(2)}*\n`;
    text += `\n_تم إرسال الطلب عبر موقع دار الخير الرسمي_`;

    return encodeURIComponent(text);
  };

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName || !customer.phone || !customer.address) {
      alert('يرجى تعبئة الاسم الكامل، رقم الهاتف، وعنوان التوصيل قبل إرسال الطلب.');
      return;
    }

    const encodedMsg = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/966148224900?text=${encodedMsg}`;
    
    window.open(whatsappUrl, '_blank');
    setOrderSent(true);
  };

  return (
    <div className="cart-page font-arabic">
      <div className="container py-5">
        <div className="section-header font-arabic">
          <span className="section-subtitle font-arabic">سلة المشتريات وإتمام الطلب</span>
          <h1 className="section-title font-arabic">سلة الشراء وتأكيد الطلب المباشر</h1>
          <div className="ornament-divider">
            <span className="ornament-symbol">✦ ۞ ✦</span>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart-card font-arabic">
            <ShoppingBag size={64} className="gold-icon mb-3" />
            <h2>سلة الشراء فارغة حالياً</h2>
            <p>لم تقم بإضافة أية مطبوعات أو مجموعات شرعية إلى سلتك بعد.</p>
            <Link to="/books" className="btn-gold mt-3 font-arabic">
              <span>تصفح فهرس الكتب</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="cart-grid font-arabic">
            {/* Left Column: Items List */}
            <div className="cart-items-col">
              <div className="cart-header-row font-arabic">
                <h3>المطبوعات المختارة ({cart.reduce((sum, i) => sum + i.quantity, 0)})</h3>
                <button className="clear-cart-btn font-arabic" onClick={clearCart}>
                  <Trash2 size={16} />
                  <span>تفريغ السلة</span>
                </button>
              </div>

              <div className="cart-items-list">
                {cart.map(item => (
                  <div key={item.book.id} className="cart-item-card font-arabic">
                    <img
                      src={item.book.coverImage}
                      alt={item.book.title}
                      className="cart-item-cover"
                    />

                    <div className="cart-item-info">
                      <span className="cart-item-cat">{item.book.category}</span>
                      <Link to={`/books/${item.book.id}`} className="cart-item-title-link">
                        <h4 className="cart-item-title font-arabic">{item.book.title}</h4>
                      </Link>
                      <div className="cart-item-arabic font-arabic">المؤلف: {item.book.authorArabic || item.book.author}</div>
                      <div className="cart-item-unit-price">${item.book.price.toFixed(2)} للكتاب</div>
                    </div>

                    <div className="cart-item-qty-box">
                      <button
                        className="qty-btn-sm"
                        onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="qty-num">{item.quantity}</span>
                      <button
                        className="qty-btn-sm"
                        onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="cart-item-subtotal">
                      ${(item.book.price * item.quantity).toFixed(2)}
                    </div>

                    <button
                      className="delete-item-btn"
                      onClick={() => removeFromCart(item.book.id)}
                      title="حذف المطبوعة"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-trust-note font-arabic">
                <Truck size={20} className="gold-icon" />
                <span>الطلبات التي تتجاوز <strong>200 دولار</strong> تتمتع بـ <strong>شحن دولي مجاني ومؤمن</strong>.</span>
              </div>
            </div>

            {/* Right Column: Order Form & WhatsApp Generator */}
            <div className="cart-summary-col font-arabic">
              <GoldBorderFrame variant="ornate">
                <div className="order-summary-card font-arabic">
                  <h3 className="summary-title font-arabic">نموذج بيانات التوصيل والطلب</h3>

                  <form className="checkout-form font-arabic" onSubmit={handleWhatsAppCheckout}>
                    <div className="form-group">
                      <label>الاسم الكامل *</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={customer.fullName}
                        onChange={handleInputChange}
                        placeholder="مثال: د. أحمد السيد"
                        className="form-input font-arabic"
                      />
                    </div>

                    <div className="form-group">
                      <label>رقم الهاتف / الواتساب *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={customer.phone}
                        onChange={handleInputChange}
                        placeholder="+966 50 123 4567"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>عنوان التوصيل الشامل *</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={customer.address}
                        onChange={handleInputChange}
                        placeholder="الشارع، رقم المبنى، الحي"
                        className="form-input font-arabic"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>المدينة *</label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={customer.city}
                          onChange={handleInputChange}
                          placeholder="الرياض / جدة / دبي"
                          className="form-input font-arabic"
                        />
                      </div>

                      <div className="form-group">
                        <label>الدولة *</label>
                        <select
                          name="country"
                          value={customer.country}
                          onChange={handleInputChange}
                          className="form-input font-arabic"
                        >
                          <option value="المملكة العربية السعودية">المملكة العربية السعودية</option>
                          <option value="الإمارات العربية المتحدة">الإمارات العربية المتحدة</option>
                          <option value="مصر">جمهورية مصر العربية</option>
                          <option value="الكويت">الكويت</option>
                          <option value="قطر">قطر</option>
                          <option value="البحرين">البحرين</option>
                          <option value="عُمان">سلطنة عُمان</option>
                          <option value="المملكة المتحدة">المملكة المتحدة</option>
                          <option value="الولايات المتحدة">الولايات المتحدة الأمريكية</option>
                          <option value="دولة أخرى">دولة أخرى</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>ملاحظات إضافية على الطلب</label>
                      <textarea
                        name="notes"
                        rows={2}
                        value={customer.notes}
                        onChange={handleInputChange}
                        placeholder="مثال: تغليف إهداء، أو تحديد وقت الشحن"
                        className="form-input font-arabic"
                      />
                    </div>

                    {/* Price Breakdown */}
                    <div className="checkout-price-breakdown font-arabic">
                      <div className="breakdown-row">
                        <span>مجموع المطبوعات:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="breakdown-row">
                        <span>أجور الشحن الدولي:</span>
                        <span>{shippingFee === 0 ? <strong className="text-gold">مجاناً</strong> : `$${shippingFee.toFixed(2)}`}</span>
                      </div>
                      <div className="breakdown-row total-row">
                        <span>المبلغ الإجمالي:</span>
                        <span className="total-val">${grandTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* WhatsApp Checkout Button */}
                    <button type="submit" className="btn-gold whatsapp-submit-btn font-arabic">
                      <MessageSquare size={20} />
                      <span>إرسال الطلب مباشرة عبر الواتساب</span>
                    </button>

                    <p className="whatsapp-note font-arabic">
                      بالضغط هنا، سيتم إنشاء رسالة تفصيلية مميكنة وإرسالها إلى فريق مبيعات دار الخير لإنهاء الشحن فوراً.
                    </p>
                  </form>
                </div>
              </GoldBorderFrame>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
