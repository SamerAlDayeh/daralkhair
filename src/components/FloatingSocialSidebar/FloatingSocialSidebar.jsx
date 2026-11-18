import React from "react";
import { Facebook, Youtube, Instagram, Send } from "lucide-react";
import "./FloatingSocialSidebar.css";

const SOCIAL_LINKS = [
  {
    name: "facebook",
    label: "فيسبوك",
    tooltip: "تابعنا عبر فيسبوك",
    href: "https://facebook.com",
    Icon: Facebook,
  },
  {
    name: "youtube",
    label: "يوتيوب",
    tooltip: "قناتنا على يوتيوب",
    href: "https://youtube.com",
    Icon: Youtube,
  },
  {
    name: "instagram",
    label: "انستغرام",
    tooltip: "تابعنا على إنستغرام",
    href: "https://instagram.com",
    Icon: Instagram,
  },
  {
    name: "telegram",
    label: "تليجرام",
    tooltip: "قناتنا على تليجرام",
    href: "https://t.me",
    Icon: Send,
  },
];

export const FloatingSocialSidebar = () => (
  <aside className="floating-social-sidebar" aria-label="حسابات التواصل الاجتماعي">
    {SOCIAL_LINKS.map(({ name, label, tooltip, href, Icon }) => (
      <a
        key={name}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`social-icon-btn ${name}`}
        aria-label={label}
      >
        <span className="social-icon">
          <Icon size={19} aria-hidden="true" />
        </span>
        <span className="social-tooltip" aria-hidden="true">
          {tooltip}
        </span>
      </a>
    ))}
  </aside>
);
