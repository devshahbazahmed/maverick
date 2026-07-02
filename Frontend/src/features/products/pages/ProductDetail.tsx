import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useProduct } from '../hook/useProduct';
import Header from '../components/Header';
import Footer from '../components/Footer';
import type { Product, ProductImage } from '../types';

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { handleGetProductById } = useProduct();

  async function fetchProductDetails() {
    if (!productId) return;
    setIsLoading(true);
    try {
      const data = await handleGetProductById(productId);
      setProduct(data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base text-on-surface font-montserrat flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-on-surface border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-base text-on-surface font-montserrat flex flex-col selection:bg-on-surface selection:text-base">
        <Header />

        <main className="grow pt-32 pb-24 px-6 md:px-20 max-w-360 mx-auto w-full flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="font-playfair text-3xl font-semibold text-on-surface mb-3">
              Product Not Found
            </h1>
            <p className="text-[13px] text-[#888888] mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-on-surface text-white font-semibold uppercase tracking-widest text-[12px] rounded-full hover:opacity-90 transition-all duration-200"
            >
              Back to Collections
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const images =
    product.images && product.images.length > 0 ? product.images : [];
  const currentImage =
    images.length > 0
      ? images[selectedImageIndex]?.url
      : '/placeholder-product.png';

  return (
    <div className="min-h-screen bg-base text-on-surface font-montserrat flex flex-col selection:bg-on-surface selection:text-base">
      <Header />
      <div className="pt-28 px-6 md:px-20 max-w-360 mx-auto w-full">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-[11px] text-muted hover:text-on-surface transition-colors duration-300 uppercase tracking-wider font-medium"
        >
          <span className="material-symbols-outlined text-[14px]">
            arrow_back
          </span>
          Back to Collections
        </button>
      </div>

      <main className="grow pb-24 px-6 md:px-20 max-w-360 mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mt-8">
          {/* Left Column - Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative h-96 md:h-125 bg-border/20 rounded-2xl border border-border/40 overflow-hidden flex items-center justify-center">
              <img
                src={currentImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImageIndex(
                        (i) => (i - 1 + images.length) % images.length
                      )
                    }
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-on-surface w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      chevron_left
                    </span>
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImageIndex((i) => (i + 1) % images.length)
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-on-surface w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      chevron_right
                    </span>
                  </button>
                </>
              )}
              <div className="absolute bottom-4 right-4 bg-on-surface/90 text-white px-3 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider">
                {selectedImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                {images.map((img: ProductImage, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === index
                        ? 'border-on-surface shadow-md'
                        : 'border-border/40 hover:border-on-surface/50'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="flex flex-col gap-6">
            {/* Title */}
            <div>
              <h1 className="font-playfair text-4xl md:text-5xl text-on-surface font-semibold mb-2 leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-3 text-[12px] text-muted uppercase tracking-wider font-medium">
                <span>Created {formatDate(product.createdAt)}</span>
                <span className="w-1 h-1 bg-muted rounded-full"></span>
                <span>ID: {product._id.slice(0, 8)}</span>
              </div>
            </div>

            {/* Price */}
            <div className="border-b border-border/20 pb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-on-surface">
                  {product.price?.amount}
                </span>
                <span className="text-[14px] text-muted uppercase tracking-wider font-semibold">
                  {product.price?.currency || 'INR'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted mb-3">
                Description
              </h2>
              <p className="text-[14px] text-[#888888] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">
                Quantity
              </label>
              <div className="flex items-center border border-border rounded-lg">
                <button className="w-10 h-10 flex items-center justify-center text-on-surface hover:bg-border/20 transition-colors duration-200">
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <input
                  type="number"
                  defaultValue="1"
                  min="1"
                  className="w-12 text-center border-0 outline-none bg-transparent font-semibold"
                  disabled
                />
                <button className="w-10 h-10 flex items-center justify-center text-on-surface hover:bg-border/20 transition-colors duration-200">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <button className="px-6 py-4 bg-white border-2 border-on-surface text-on-surface font-semibold uppercase tracking-[0.15em] text-[12px] rounded-full hover:bg-on-surface/5 transition-all duration-200 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  shopping_cart
                </span>
                Add to Cart
              </button>
              <button className="px-6 py-4 bg-on-surface text-white font-semibold uppercase tracking-[0.15em] text-[12px] rounded-full hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  flash_on
                </span>
                Buy Now
              </button>
            </div>

            {/* Seller Info Card */}
            <div className="border-t border-border/20 pt-8">
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted mb-4">
                Seller Information
              </h3>
              <div className="bg-border/20 rounded-lg p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-on-surface/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px] text-on-surface/40">
                    storefront
                  </span>
                </div>
                <div className="grow">
                  <p className="text-[12px] font-semibold text-on-surface uppercase tracking-wider">
                    Seller
                  </p>
                  {/* <p className="text-[11px] text-muted truncate font-mono">
                    {product.seller}...
                  </p> */}
                </div>
                <button className="px-3 py-2 bg-white hover:bg-border/30 text-on-surface rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-colors duration-200">
                  View
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-3 border-t border-border/20 pt-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-muted/50">
                  verified
                </span>
                <div>
                  <p className="text-[10px] text-muted uppercase tracking-wider font-semibold">
                    Authentic
                  </p>
                  <p className="text-[11px] text-[#888888]">Verified Product</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-muted/50">
                  local_shipping
                </span>
                <div>
                  <p className="text-[10px] text-muted uppercase tracking-wider font-semibold">
                    Shipping
                  </p>
                  <p className="text-[11px] text-[#888888]">Worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
