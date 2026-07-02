export default function GoogleButton() {
  return (
    <div>
      <a href="/api/v1/auth/google">
        <button
          id="register-submit"
          type="submit"
          className="
                  w-full flex items-center justify-center gap-2.5
                  py-2 uppercase text-[12px] font-semibold tracking-[0.14em]
                  text-[#1111111] cursor-pointer border-2 border-black
                  bg-base
                  transition-[opacity,transform] duration-200 rounded-full
                  hover:opacity-90 hover:-translate-y-px active:translate-y-0
                "
        >
          <img src="/google.svg" alt="google" width={30} height={30} />
          <span>Continue with Google</span>
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
      </a>
    </div>
  );
}
