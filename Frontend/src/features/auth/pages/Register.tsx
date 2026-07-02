import { useState } from 'react';
import type { IRegisterUser } from '../types';
import { useAuth } from '../hook/useAuth';
import { useNavigate } from 'react-router';
import LeftImagePanel from '../components/LeftImagePanel';
import FooterNote from '../components/FooterNote';
import GoogleButton from '../components/GoogleButton';
import Button from '../components/Button';

// ─── Shared class strings ────────────────────────────────────────────────────
const fieldLabelCls =
  'field-label block text-[10px] font-semibold tracking-[0.2em] uppercase text-muted mb-2 transition-colors duration-200';

const inputCls =
  'w-full bg-transparent border-0 border-b border-border text-on-surface text-[15px] tracking-[0.01em] py-2.5 outline-none placeholder:text-muted/70 transition-colors duration-200 focus:border-b-on-surface';

// ─── Component ───────────────────────────────────────────────────────────────
export default function RegisterPage() {
  const { handleRegister } = useAuth();
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
    const user = await handleRegister({
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
      contact: formData.contact,
      isSeller: formData.isSeller,
    });
    if (user.role === 'buyer') navigate('/');
    else if (user.role === 'seller') navigate('/seller/dashboard');
  };

  return (
    <div className="min-h-screen flex font-montserrat bg-base text-on-surface">
      <LeftImagePanel />

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white/60 overflow-y-auto">
        {/* Inner form card — constrained width */}
        <div className="w-full max-w-100 rounded-[28px] border border-border/60 bg-white/60 p-6 sm:p-8 shadow-[0_20px_60px_rgba(10,10,10,0.08)] backdrop-blur-sm">
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

          {/* Thin divider */}
          <div className="h-px bg-border-subtle mb-8" />

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
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center text-muted hover:text-on-surface transition-colors duration-200 cursor-pointer bg-transparent border-0 p-0"
                  >
                    {showPassword ? (
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
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
                    size-4.25 cursor-pointer appearance-none
                    border border-[#ccc] bg-transparent
                    transition-colors duration-200
                    checked:border-black checked:bg-white
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
              <Button>Create Account</Button>
              {/* Thin gold divider */}
              <div className="h-px bg-gold/20 mb-8" />
            </div>
          </form>

          {/* Google Signin */}
          <GoogleButton />

          {/* Footer note */}
          <FooterNote />
        </div>
      </div>
    </div>
  );
}
