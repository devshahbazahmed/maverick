export default function LeftImagePanel() {
  return (
    <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] relative overflow-hidden flex-col">
      {/* Full-bleed hero image */}
      <img
        src="/register-hero.png"
        alt="Maverick editorial"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark gradient scrim — bottom-to-top for readable text */}
      <div className="absolute inset-0 bg-linear-to-t from-[#1a1410]/95 via-[#2a2420]/70 to-transparent" />

      {/* Thin left gold rule */}
      <div className="absolute top-0 left-0 h-full w-px bg-gold/20" />

      {/* Brand mark — top-left logo */}
      <div className="relative z-10 p-10">
        <img
          src="/maverick-logo-white.svg"
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
        <h2 className="font-playfair text-4xl xl:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-4 max-w-xs">
          Wear the&nbsp;
          <em className="not-italic text-gold">edge.</em>
        </h2>
        {/* Sub */}
        <p className="text-[13px] text-white leading-relaxed tracking-wide max-w-70">
          Curated luxury for the discerning individual. Join Maverick and own
          your aesthetic.
        </p>
      </div>
    </div>
  );
}
