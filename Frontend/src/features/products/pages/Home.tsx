import { useEffect } from 'react';
import { useAppSelector } from '../../../app/app.hooks';
import { useProduct } from '../hook/useProduct';
import { useNavigate } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import type { Product } from '../types';

export default function Home() {
  const navigate = useNavigate();
  const products = useAppSelector((state) => state.product.products);
  const { handleGetAllProducts } = useProduct();

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-base text-on-surface font-montserrat flex flex-col selection:bg-on-surface selection:text-base">
      <Header />

      <div className="pt-32 pb-16 px-6 md:px-20 max-w-360 mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="font-playfair text-5xl md:text-6xl text-on-surface font-semibold mb-4 leading-tight">
            Collections
          </h1>
          <p className="text-[14px] text-[#888888] leading-relaxed max-w-2xl mx-auto">
            Curated selections of contemporary fashion and timeless pieces.
            Discover the craftsmanship and artistry behind every creation in our
            exclusive collections.
          </p>
        </div>

        {/* Filter/Sort Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-8">
          <div className="text-[12px] text-muted uppercase tracking-wider font-medium">
            {products && products.length > 0
              ? `${products.length} Products`
              : 'No Products Available'}
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-border/30 hover:bg-border/50 text-on-surface rounded-full text-[11px] font-semibold uppercase tracking-wider transition-colors duration-200">
              All
            </button>
            <button className="px-4 py-2 bg-border/30 hover:bg-border/50 text-on-surface rounded-full text-[11px] font-semibold uppercase tracking-wider transition-colors duration-200">
              Bespoke
            </button>
            <button className="px-4 py-2 bg-border/30 hover:bg-border/50 text-on-surface rounded-full text-[11px] font-semibold uppercase tracking-wider transition-colors duration-200">
              Archive
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════ */}
      <main className="grow pb-24 px-6 md:px-20 max-w-360 mx-auto w-full">
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product: Product) => {
              const coverImage =
                product.images && product.images.length > 0
                  ? product.images[0].url
                  : '/placeholder-product.png';

              return (
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl border border-border/40 shadow-[0_10px_30px_rgba(10,10,10,0.05)] overflow-hidden hover:shadow-[0_20px_60px_rgba(10,10,10,0.12)] transition-all duration-300 cursor-pointer flex flex-col h-full hover:scale-[1.02]"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  {/* Product Image */}
                  <div className="relative h-64 md:h-72 overflow-hidden bg-border/20 shrink-0">
                    <img
                      src={coverImage}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-on-surface/90 text-white px-3 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider">
                      {product.price?.currency || 'INR'}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5 md:p-6 flex flex-col gap-3 grow">
                    {/* Title */}
                    <h3 className="font-playfair text-xl font-semibold text-on-surface line-clamp-2 leading-tight group-hover:text-gold transition-colors duration-300">
                      {product.title}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-bold text-on-surface">
                        {product.price?.amount}
                      </span>
                      <span className="text-[11px] text-muted uppercase tracking-wider font-semibold">
                        {product.price?.currency || 'INR'}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-[12px] text-[#888888] line-clamp-2 leading-relaxed grow">
                      {product.description}
                    </p>

                    {/* Divider */}
                    <div className="border-t border-border/20 pt-3 mt-auto">
                      {/* Date and Link */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted/70 uppercase tracking-wider">
                          {formatDate(product.createdAt)}
                        </span>
                        <span className="material-symbols-outlined text-[16px] text-muted group-hover:text-on-surface transition-colors duration-300">
                          arrow_forward
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 px-6">
            <div className="text-center max-w-md">
              <div className="mb-6 flex justify-center">
                <span className="material-symbols-outlined text-6xl text-muted/20">
                  collections_bookmark
                </span>
              </div>
              <h2 className="font-playfair text-2xl font-semibold text-on-surface mb-2">
                No Collections Available
              </h2>
              <p className="text-[13px] text-[#888888] mb-8 leading-relaxed">
                Check back soon for exclusive collections. We're curating
                something special.
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
