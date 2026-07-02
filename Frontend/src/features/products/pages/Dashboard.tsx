import { useEffect } from 'react';
import { useProduct } from '../hook/useProduct.ts';
import { useAppSelector } from '../../../app/app.hooks.ts';
import { useNavigate } from 'react-router';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import type { Product } from '../types/index.ts';

export default function Dashboard() {
  const { handleGetSellerProducts } = useProduct();
  const navigate = useNavigate();
  const sellerProducts = useAppSelector(
    (state) => state.product.sellerProducts
  );

  useEffect(() => {
    handleGetSellerProducts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-white/65 text-on-surface font-montserrat flex flex-col selection:bg-on-surface selection:text-base">
      <Header />
      <main className="grow pt-32 pb-24 px-6 md:px-20 max-w-360 mx-auto w-full">
        {/* Page Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-4xl md:text-5xl text-on-surface font-semibold mb-3 leading-tight">
              My Products
            </h1>
            <p className="text-[13px] text-[#888888] leading-relaxed">
              Manage your product inventory and track sales performance.
            </p>
          </div>
          <button
            onClick={() => navigate('/seller/create-product')}
            className="px-6 py-3 bg-on-surface text-white font-semibold uppercase tracking-widest text-[12px] rounded-full hover:opacity-90 transition-all duration-200 whitespace-nowrap flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            New Product
          </button>
        </div>

        {/* Products Grid */}
        {sellerProducts && sellerProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellerProducts.map((product: Product) => {
              const coverImage =
                product.images && product.images.length > 0
                  ? product.images[0].url
                  : '/placeholder-product.png';

              return (
                <div
                  key={product._id}
                  className="group bg-white/20 rounded-2xl border border-border/40 shadow-[0_10px_30px_rgba(10,10,10,0.05)] overflow-hidden hover:shadow-[0_20px_60px_rgba(10,10,10,0.12)] transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative h-56 md:h-64 overflow-hidden bg-border/20">
                    <img
                      src={coverImage}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-on-surface/90 text-white px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider">
                      {product.price?.currency || 'INR'}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 md:p-5 flex flex-col gap-3">
                    {/* Title */}
                    <h3 className="font-playfair text-lg font-semibold text-on-surface line-clamp-2 leading-tight">
                      {product.title}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-on-surface">
                        {product.price?.amount}
                      </span>
                      <span className="text-[12px] text-muted uppercase tracking-wider">
                        {product.price?.currency || 'INR'}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-[12px] text-[#888888] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Date */}
                    <div className="text-[11px] text-muted/70 uppercase tracking-wider border-t border-border/20 pt-3">
                      Created {formatDate(product.createdAt)}
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <button className="px-3 py-2 bg-border/30 hover:bg-border/50 text-on-surface rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          edit
                        </span>
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button className="px-3 py-2 bg-border/30 hover:bg-border/50 text-on-surface rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          visibility
                        </span>
                        <span className="hidden sm:inline">View</span>
                      </button>
                      <button className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          delete
                        </span>
                        <span className="hidden sm:inline">Delete</span>
                      </button>
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
                  inventory_2
                </span>
              </div>
              <h2 className="font-playfair text-2xl font-semibold text-on-surface mb-2">
                No Products Yet
              </h2>
              <p className="text-[13px] text-[#888888] mb-8 leading-relaxed">
                Start building your collection. Create your first product to get
                started.
              </p>
              <button
                onClick={() => navigate('/products/create')}
                className="px-6 py-3 bg-on-surface text-white font-semibold uppercase tracking-widest text-[12px] rounded-full hover:opacity-90 transition-all duration-200 inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">
                  add
                </span>
                Create Product
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
