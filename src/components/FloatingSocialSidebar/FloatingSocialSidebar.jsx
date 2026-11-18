import React from "react";
import {
  Facebook,
  Instagram,
  MessageCircle,
  Send,
  Twitter,
} from "lucide-react";
import { SOCIAL_LINKS } from "../../data/socialLinks";
import "./FloatingSocialSidebar.css";

const SOCIAL_ICONS = {
  facebook: Facebook,
  x: Twitter,
  instagram: Instagram,
  telegram: Send,
  whatsapp: MessageCircle,
};

export const FloatingSocialSidebar = () => (
  <aside className="floating-social-sidebar" aria-label="حسابات التواصل الاجتماعي">
    {SOCIAL_LINKS.map(({ name, label, tooltip, href }) => {
      const Icon = SOCIAL_ICONS[name];
      return (
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
      );
    })}
  </aside>
);
