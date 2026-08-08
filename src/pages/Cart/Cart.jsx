import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { GoldBorderFrame } from "../../components/GoldBorderFrame/GoldBorderFrame";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  MessageSquare,
  ArrowRight,
  Truck,
  CheckCircle2,
} from "lucide-react";
import "./Cart.css";

const WHATSAPP_NUMBER = "966148224900";
const FREE_SHIPPING_THRESHOLD = 200;
const SHIPPING_FEE = 25;

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useCart();

  const [customer, setCustomer] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    country: "المملكة العربية السعودية",
    notes: "",
  });

  const [orderSent, setOrderSent] = useState(false);

  const totalItemsCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const shippingFee =
    cart.length > 0
      ? totalPrice > FREE_SHIPPING_THRESHOLD
        ? 0
        : SHIPPING_FEE
      : 0;
  const grandTotal = totalPrice + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityDecrement = (bookId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(bookId, currentQuantity - 1);
    } else {
      removeFromCart(bookId);
    }
  };

  const generateWhatsAppMessage = () => {
    if (cart.length === 0) return "";

    let text = `*طلب جديد من موقع دار الخير للنشر والتوزيع*\n`;
    text += `----------------------------------------\n`;
    text += `*بيانات العميل:*\n`;
    text += `• الاسم: ${customer.fullName.trim() || "غير مدخل"}\n`;
    text += `• الهاتف: ${customer.phone.trim() || "غير مدخل"}\n`;
    text += `• العنوان: ${customer.address.trim() || "غير مدخل"} - ${customer.city.trim() || ""} (${customer.country})\n`;
    if (customer.notes.trim()) text += `• ملاحظات: ${customer.notes.trim()}\n`;

    text += `\n*الكتب والمطبوعات المطلوبة:*\n`;
    cart.forEach((item, index) => {
      text += `${index + 1}. *${item.book.title}*\n`;
      text += `   الكمية: ${item.quantity} × $${item.book.price.toFixed(2)} = *$${(item.quantity * item.book.price).toFixed(2)}*\n`;
    });

    text += `----------------------------------------\n`;
    text += `• المجموع الفرعي: $${totalPrice.toFixed(2)}\n`;
    text += `• الشحن: ${shippingFee === 0 ? "مجاني" : `$${shippingFee.toFixed(2)}`}\n`;
    text += `• *الإجمالي الكلي: $${grandTotal.toFixed(2)}*\n`;
    text += `\n_تم إرسال الطلب عبر موقع دار الخير الرسمي_`;

    return encodeURIComponent(text);
  };

  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();

    if (
      !customer.fullName.trim() ||
      !customer.phone.trim() ||
      !customer.address.trim() ||
      !customer.city.trim()
    ) {
      alert(
        "يرجى تعبئة جميع الحقول المطلوبة (الاسم الكامل، رقم الهاتف، العنوان، والمدينة).",
      );
      return;
    }

    const encodedMsg = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setOrderSent(true);
  };

  return (
    <div className="cart-page font-arabic">
      <div className="container py-5">
        <div className="section-header">
          <span className="section-subtitle">سلة المشتريات وإتمام الطلب</span>
          <h1 className="section-title">سلة الشراء وتأكيد الطلب المباشر</h1>
          <div className="ornament-divider">
            <span className="ornament-symbol">✦ ۞ ✦</span>
          </div>
        </div>

        {orderSent && (
          <div className="order-success-banner mb-4 p-4 text-center border rounded">
            <CheckCircle2
              size={32}
              className="text-success mb-2 inline-block"
            />
            <h3 className="text-lg font-bold">
              تم توجيه طلبك إلى الواتساب بنجاح
            </h3>
            <p className="text-sm text-gray-600">
              في حال لم تفتح النافذة تلقائياً، يرجى التحقق من إعدادات حظر
              النوافذ المنبثقة في متصفحك.
            </p>
          </div>
        )}

        {cart.length === 0 ? (
          <div className="empty-cart-card">
            <ShoppingBag size={64} className="gold-icon mb-3" />
            <h2>سلة الشراء فارغة حالياً</h2>
            <p>لم تقم بإضافة أية مطبوعات أو مجموعات شرعية إلى سلتك بعد.</p>
            <Link to="/books" className="btn-gold mt-3">
              <span>تصفح فهرس الكتب</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="cart-grid">
            {/* Left Column: Items List */}
            <div className="cart-items-col">
              <div className="cart-header-row">
                <h3>المطبوعات المختارة ({totalItemsCount})</h3>
                <button
                  type="button"
                  className="clear-cart-btn"
                  onClick={clearCart}
                  aria-label="تفريغ السلة"
                >
                  <Trash2 size={16} />
                  <span>تفريغ السلة</span>
                </button>
              </div>

              <div className="cart-items-list">
                {cart.map((item) => (
                  <div key={item.book.id} className="cart-item-card">
                    <img
                      src={item.book.coverImage}
                      alt={item.book.title}
                      className="cart-item-cover"
                    />

                    <div className="cart-item-info">
                      <span className="cart-item-cat">
                        {item.book.category}
                      </span>
                      <Link
                        to={`/books/${item.book.id}`}
                        className="cart-item-title-link"
                      >
                        <h4 className="cart-item-title">{item.book.title}</h4>
                      </Link>
                      <div className="cart-item-arabic">
                        المؤلف: {item.book.authorArabic || item.book.author}
                      </div>
                      <div className="cart-item-unit-price">
                        ${item.book.price.toFixed(2)} للكتاب
                      </div>
                    </div>

                    <div className="cart-item-qty-box">
                      <button
                        type="button"
                        className="qty-btn-sm"
                        onClick={() =>
                          handleQuantityDecrement(item.book.id, item.quantity)
                        }
                        aria-label="إنقاص الكمية"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="qty-num">{item.quantity}</span>
                      <button
                        type="button"
                        className="qty-btn-sm"
                        onClick={() =>
                          updateQuantity(item.book.id, item.quantity + 1)
                        }
                        aria-label="زيادة الكمية"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="cart-item-subtotal">
                      ${(item.book.price * item.quantity).toFixed(2)}
                    </div>

                    <button
                      type="button"
                      className="delete-item-btn"
                      onClick={() => removeFromCart(item.book.id)}
                      title="حذف المطبوعة"
                      aria-label={`حذف ${item.book.title} من السلة`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-trust-note">
                <Truck size={20} className="gold-icon" />
                <span>
                  الطلبات التي تتجاوز <strong>200 دولار</strong> تتمتع بـ{" "}
                  <strong>شحن دولي مجاني ومؤمن</strong>.
                </span>
              </div>
            </div>

            {/* Right Column: Order Form & WhatsApp Checkout */}
            <div className="cart-summary-col">
              <GoldBorderFrame variant="ornate">
                <div className="order-summary-card">
                  <h3 className="summary-title">نموذج بيانات التوصيل والطلب</h3>

                  <form
                    className="checkout-form"
                    onSubmit={handleWhatsAppCheckout}
                  >
                    <div className="form-group">
                      <label htmlFor="fullName">الاسم الكامل *</label>
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        required
                        value={customer.fullName}
                        onChange={handleInputChange}
                        placeholder="مثال: د. أحمد السيد"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">رقم الهاتف / الواتساب *</label>
                      <input
                        id="phone"
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
                      <label htmlFor="address">عنوان التوصيل الشامل *</label>
                      <input
                        id="address"
                        type="text"
                        name="address"
                        required
                        value={customer.address}
                        onChange={handleInputChange}
                        placeholder="الشارع، رقم المبنى، الحي"
                        className="form-input"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="city">المدينة *</label>
                        <input
                          id="city"
                          type="text"
                          name="city"
                          required
                          value={customer.city}
                          onChange={handleInputChange}
                          placeholder="الرياض / جدة / دبي"
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="country">الدولة *</label>
                        <select
                          id="country"
                          name="country"
                          value={customer.country}
                          onChange={handleInputChange}
                          className="form-input"
                        >
                          <option value="المملكة العربية السعودية">
                            المملكة العربية السعودية
                          </option>
                          <option value="الإمارات العربية المتحدة">
                            الإمارات العربية المتحدة
                          </option>
                          <option value="مصر">جمهورية مصر العربية</option>
                          <option value="الكويت">الكويت</option>
                          <option value="قطر">قطر</option>
                          <option value="البحرين">البحرين</option>
                          <option value="عُمان">سلطنة عُمان</option>
                          <option value="المملكة المتحدة">
                            المملكة المتحدة
                          </option>
                          <option value="الولايات المتحدة">
                            الولايات المتحدة الأمريكية
                          </option>
                          <option value="دولة أخرى">دولة أخرى</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="notes">ملاحظات إضافية على الطلب</label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={2}
                        value={customer.notes}
                        onChange={handleInputChange}
                        placeholder="مثال: تغليف إهداء، أو تحديد وقت الشحن"
                        className="form-input"
                      />
                    </div>

                    {/* Price Breakdown */}
                    <div className="checkout-price-breakdown">
                      <div className="breakdown-row">
                        <span>مجموع المطبوعات:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="breakdown-row">
                        <span>أجور الشحن الدولي:</span>
                        <span>
                          {shippingFee === 0 ? (
                            <strong className="text-gold">مجاناً</strong>
                          ) : (
                            `$${shippingFee.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      <div className="breakdown-row total-row">
                        <span>المبلغ الإجمالي:</span>
                        <span className="total-val">
                          ${grandTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* WhatsApp Checkout Button */}
                    <button
                      type="submit"
                      className="btn-gold whatsapp-submit-btn"
                    >
                      <MessageSquare size={20} />
                      <span>إرسال الطلب مباشرة عبر الواتساب</span>
                    </button>

                    <p className="whatsapp-note">
                      بالضغط هنا، سيتم إنشاء رسالة تفصيلية مميكنة وإرسالها إلى
                      فريق مبيعات دار الخير لإنهاء الشحن فوراً.
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
