import { useNavigate } from 'react-router';

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="bg-white/90 backdrop-blur-md font-montserrat fixed top-0 w-full z-50 border-b border-border h-20">
      <div className="flex justify-between items-center px-6 md:px-20 h-full max-w-360 mx-auto w-full">
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          className="flex items-center cursor-pointer select-none shrink-0"
        >
          <img
            src="/maverick-logo.svg"
            alt="Maverick"
            className="h-15 w-auto"
          />
        </div>

        {/* Menu items - Center */}
        <nav className="hidden lg:flex gap-10 text-[11px] font-medium tracking-wider uppercase absolute left-1/2 transform -translate-x-1/2">
          <a
            onClick={() => navigate('/')}
            className="text-muted hover:text-on-surface transition-colors duration-300 cursor-pointer"
          >
            Collections
          </a>
          <a className="text-muted hover:text-on-surface transition-colors duration-300 cursor-pointer">
            Bespoke
          </a>
          <a className="text-muted hover:text-on-surface transition-colors duration-300 cursor-pointer">
            Atelier
          </a>
        </nav>

        {/* Action Icons */}
        <div className="flex gap-6 items-center ml-auto">
          <button className="text-muted hover:text-gold transition-colors duration-300 cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">
              shopping_bag
            </span>
          </button>
          <button className="text-muted hover:text-gold transition-colors duration-300 cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">
              person
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
