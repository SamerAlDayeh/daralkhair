import React from 'react';
import './GoldBorderFrame.css';

interface GoldFrameProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'simple' | 'ornate';
}

export const GoldBorderFrame: React.FC<GoldFrameProps> = ({
  children,
  className = '',
  variant = 'ornate',
}) => {
  return (
    <div className={`gold-border-frame-wrapper ${variant} ${className}`}>
      {variant === 'ornate' && (
        <>
          <div className="corner-ornament top-left">✦</div>
          <div className="corner-ornament top-right">✦</div>
          <div className="corner-ornament bottom-left">✦</div>
          <div className="corner-ornament bottom-right">✦</div>
        </>
      )}
      <div className="gold-border-frame-content">{children}</div>
    </div>
  );
};
