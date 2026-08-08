import React from "react";
import { useCart } from "../../context/CartContext";
import { CheckCircle2, Info, AlertCircle, X } from "lucide-react";
import "./Toast.css";

export const Toast = () => {
  const { toast, hideToast } = useCart();

  if (!toast.visible) return null;

  return (
    <div className={`toast-container ${toast.type}`}>
      <div className="toast-icon">
        {toast.type === "success" && <CheckCircle2 size={20} />}
        {toast.type === "info" && <Info size={20} />}
        {toast.type === "error" && <AlertCircle size={20} />}
      </div>
      <div className="toast-message">{toast.message}</div>
      <button
        className="toast-close"
        onClick={hideToast}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};
