export default function Footer() {
  return (
    <footer className="bg-white border-t border-border py-12 mt-auto">
      <div className="max-w-360 mx-auto px-6 md:px-20 flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <div className="font-playfair text-lg tracking-widest font-semibold text-on-surface mb-2">
            <img
              src="/maverick-logo.svg"
              alt="Maverick"
              className="h-15 w-auto"
            />
          </div>
          <p className="text-[11px] text-[#888888] tracking-wider uppercase">
            © {new Date().getFullYear()} ALL RIGHTS RESERVED.
          </p>
        </div>

        <nav className="flex flex-col md:flex-row gap-6 md:gap-10 text-[11px] font-medium">
          <a className="text-[#555555] hover:text-on-surface transition-colors cursor-pointer">
            Privacy
          </a>
          <a className="text-[#555555] hover:text-on-surface transition-colors cursor-pointer">
            Terms
          </a>
          <a className="text-[#555555] hover:text-on-surface transition-colors cursor-pointer">
            Support
          </a>
        </nav>
      </div>
    </footer>
  );
}
