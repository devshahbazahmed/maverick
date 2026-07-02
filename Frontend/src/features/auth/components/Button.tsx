import React from 'react';

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      id="register-submit"
      type="submit"
      className="
                  w-full flex items-center justify-center gap-2.5
                  py-3.5 uppercase text-[12px] font-semibold tracking-[0.14em]
                  text-base cursor-pointer border-0 rounded-full
                  bg-[#111111] transition-[opacity,transform,box-shadow] duration-200 hover:opacity-90 hover:-translate-y-px hover:shadow-lg active:translate-y-0
                "
    >
      <span>{children}</span>
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </button>
  );
}
