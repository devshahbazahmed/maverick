import { useState } from 'react';
import type { IRegisterUser } from '../types';
import { useAuth } from '../hook/useAuth';
import { useNavigate } from "react-router"

// ─── Shared class strings ────────────────────────────────────────────────────
const fieldLabelCls =
  'field-label block text-[10px] font-semibold tracking-[0.18em] uppercase text-muted mb-2 transition-colors duration-200';

const inputCls =
  'w-full bg-transparent border-0 border-b border-border text-on-surface text-[15px] tracking-[0.01em] py-2.5 outline-none placeholder:text-muted transition-colors duration-200 focus:border-b-gold';

// ─── Component ───────────────────────────────────────────────────────────────
export default function RegisterPage() {
  const { handleRegister } = useAuth()
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IRegisterUser>({
    fullName: '',
    email: '',
    password: '',
    contact: '',
    isSeller: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleRegister({
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
      contact: formData.contact,
      isSeller: formData.isSeller
    })
    navigate("/")
  };

  return (
    <div className="min-h-screen flex font-montserrat bg-base">

      {/* ══════════════════════════════════════════
          LEFT — editorial image panel
      ══════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] relative overflow-hidden flex-col">

        {/* Full-bleed hero image */}
        <img
          src="/register-hero.png"
          alt="Maverick editorial"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark gradient overlay — bottom-to-top scrim */}
        <div className="absolute inset-0 bg-linear-to-t from-base via-base/60 to-transparent" />

        {/* Thin left gold rule */}
        <div className="absolute top-0 left-0 h-full w-px bg-gold/20" />

        {/* Brand mark — top-left logo */}
        <div className="relative z-10 p-10">
          <img
            src="/maverick-logo.svg"
            alt="Maverick"
            className="h-10 w-auto"
          />
        </div>

        {/* Bottom copy block */}
        <div className="relative z-10 mt-auto p-10 pb-12">
          {/* Overline */}
          <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gold mb-4">
            New Collection — 2026
          </p>
          {/* Headline */}
          <h2 className="font-playfair text-4xl xl:text-5xl font-bold text-on-surface leading-[1.1] tracking-tight mb-4 max-w-xs">
            Wear the&nbsp;
            <em className="not-italic text-gold">edge.</em>
          </h2>
          {/* Sub */}
          <p className="text-[13px] text-on-surface/50 leading-relaxed tracking-wide max-w-[280px]">
            Curated luxury for the discerning individual. Join Maverick and own your aesthetic.
          </p>

          {/* Social proof strip */}
          <div className="mt-8 flex items-center gap-6">
            <div className="border-t border-on-surface/10 flex-1" />
            <div className="flex -space-x-2">
              {['#8A6F47', '#5C4A3A', '#A07850', '#6B503A'].map((c, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border border-base/60 flex items-center justify-center text-[9px] font-bold text-base"
                  style={{ backgroundColor: c }}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-[11px] text-on-surface/40 tracking-wide whitespace-nowrap">
              12k+ members
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT — form panel
      ══════════════════════════════════════════ */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-surface overflow-y-auto">

        {/* Inner form card — constrained width */}
        <div className="w-full max-w-[400px]">

          {/* Logo — always visible on right panel */}
          <div className="flex justify-center lg:justify-start mb-10">
            <img
              src="/maverick-logo.svg"
              alt="Maverick"
              className="h-14 w-auto"
            />
          </div>

          {/* Header */}
          <div className="mb-8">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Get started
            </p>
            <h1 className="font-playfair text-[30px] font-bold text-on-surface leading-tight tracking-tight mb-2">
              Create Account
            </h1>
            <p className="text-[13px] text-muted tracking-wide">
              Already have an account?{' '}
              <a
                href="/login"
                className="text-gold font-medium no-underline hover:opacity-75 transition-opacity duration-200"
              >
                Sign in →
              </a>
            </p>
          </div>

          {/* Thin gold divider */}
          <div className="h-px bg-gold/20 mb-8" />

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-7">

              {/* Full Name */}
              <div className="input-group">
                <label htmlFor="fullName" className={fieldLabelCls}>
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className={inputCls}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </div>

              {/* Email */}
              <div className="input-group">
                <label htmlFor="email" className={fieldLabelCls}>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={inputCls}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div className="input-group">
                <label htmlFor="password" className={fieldLabelCls}>
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className={`${inputCls} pr-8`}
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center text-muted hover:text-on-surface transition-colors duration-200 cursor-pointer bg-transparent border-0 p-0"
                  >
                    {showPassword ? (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Contact */}
              <div className="input-group">
                <label htmlFor="contact" className={fieldLabelCls}>
                  Contact Number
                </label>
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  className={inputCls}
                  placeholder="+91 00000 00000"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  autoComplete="tel"
                />
              </div>

              {/* isSeller checkbox */}
              <div className="flex items-start gap-3.5 py-5 border-t border-b border-border-subtle">
                <input
                  id="isSeller"
                  name="isSeller"
                  type="checkbox"
                  checked={formData.isSeller}
                  onChange={handleChange}
                  className="
                    custom-checkbox relative shrink-0 mt-0.5
                    size-[17px] cursor-pointer appearance-none
                    border border-[#3a3a3a] bg-transparent
                    transition-colors duration-200
                    checked:border-gold checked:bg-gold
                  "
                />
                <label htmlFor="isSeller" className="flex-1 cursor-pointer">
                  <p className="text-[13px] font-semibold text-on-surface tracking-[0.03em] mb-1">
                    Register as a Seller
                  </p>
                  <p className="text-[11px] text-muted leading-relaxed tracking-wide">
                    List and manage your exclusive products on Maverick.
                  </p>
                </label>
              </div>

              {/* Submit */}
              <button
                id="register-submit"
                type="submit"
                className="
                  w-full flex items-center justify-center gap-2.5
                  py-[14px] uppercase text-[12px] font-semibold tracking-[0.14em]
                  text-base cursor-pointer border-0
                  bg-linear-to-br from-gold via-gold-light to-gold
                  transition-[opacity,transform] duration-200
                  hover:opacity-90 hover:-translate-y-px active:translate-y-0
                "
              >
                <span>Create Account</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

            </div>
          </form>

          {/* Footer note */}
          <p className="mt-8 text-[11px] text-muted/60 text-center leading-relaxed tracking-wide">
            By creating an account you agree to our{' '}
            <a href="/terms" className="text-muted hover:text-gold transition-colors duration-200 underline underline-offset-2">
              Terms
            </a>{' '}
            &amp;{' '}
            <a href="/privacy" className="text-muted hover:text-gold transition-colors duration-200 underline underline-offset-2">
              Privacy Policy
            </a>
            .
          </p>

        </div>
      </div>

    </div>
  );
}
