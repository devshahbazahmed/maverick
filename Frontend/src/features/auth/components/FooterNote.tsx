export default function FooterNote() {
  return (
    <div>
      <p className="mt-8 text-[11px] text-[#888888] text-center leading-relaxed tracking-wide">
        By creating an account you agree to our{' '}
        <a
          href="/terms"
          className="text-[#555555] hover:text-gold transition-colors duration-200 underline underline-offset-2"
        >
          Terms
        </a>{' '}
        &amp;{' '}
        <a
          href="/privacy"
          className="text-[#555555] hover:text-gold transition-colors duration-200 underline underline-offset-2"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
