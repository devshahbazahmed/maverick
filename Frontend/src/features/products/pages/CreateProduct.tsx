import React, { useState, useEffect, useRef } from 'react';
import { useProduct } from '../hook/useProduct.ts';
import { useNavigate } from 'react-router';

// ─── CSS Class Constants (Matching Maverick Branding) ──────────────────────
const fieldLabelCls =
  'block text-[10px] font-semibold tracking-[0.2em] uppercase text-muted mb-2 transition-colors duration-200';

const inputCls =
  'w-full bg-transparent border-0 border-b border-border text-on-surface text-[15px] tracking-[0.01em] py-2.5 outline-none placeholder:text-muted/70 transition-colors duration-200 focus:border-b-on-surface';

const selectCls =
  'w-full bg-transparent border-0 border-b border-border text-on-surface text-[15px] tracking-[0.01em] py-2.5 outline-none transition-colors duration-200 focus:border-b-on-surface cursor-pointer';

export default function CreateProduct() {
  const { handleCreateProduct } = useProduct();
  const navigate = useNavigate();

  // Form Fields State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priceAmount, setPriceAmount] = useState('');
  const [priceCurrency, setPriceCurrency] = useState('INR');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Archive']); // default selected tag

  // Images State
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // UX State
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleFiles = (filesList: FileList) => {
    const newFiles = Array.from(filesList).filter((file) =>
      file.type.startsWith('image/')
    );

    if (newFiles.length === 0) return;

    if (images.length + newFiles.length > 7) {
      setError('You can select a maximum of 7 images.');
      return;
    }

    const updatedImages = [...images, ...newFiles];
    setImages(updatedImages);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
    setError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);

    URL.revokeObjectURL(previews[index]);
    const updatedPreviews = [...previews];
    updatedPreviews.splice(index, 1);
    setPreviews(updatedPreviews);
  };

  // Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!title.trim()) {
      setError('Product title is required.');
      return;
    }
    if (!description.trim()) {
      setError('Product description is required.');
      return;
    }
    if (!priceAmount || parseFloat(priceAmount) <= 0) {
      setError('Please enter a valid price amount.');
      return;
    }
    if (images.length === 0) {
      setError('Please upload at least one product image.');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('priceAmount', priceAmount);
      formData.append('priceCurrency', priceCurrency);

      // Append all selected files to the "images" field array
      images.forEach((file) => {
        formData.append('images', file);
      });

      await handleCreateProduct(formData);
      setSuccess(true);

      // Auto navigate back to dashboard/home after 2.5 seconds
      setTimeout(() => {
        navigate('/');
      }, 2500);
    } catch (err) {
      console.error(err);
      setError('Failed to create product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base text-on-surface font-montserrat flex flex-col selection:bg-on-surface selection:text-base">
      {/* ══════════════════════════════════════════
          TOP NAVBAR
      ══════════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════════
          MAIN PANEL
      ══════════════════════════════════════════ */}
      <main className="grow pt-32 pb-24 px-6 md:px-20 max-w-360 mx-auto w-full flex flex-col justify-center">
        {/* Success Banner */}
        {success && (
          <div className="mb-10 p-6 bg-green-50 border border-green-300 text-green-700 font-medium tracking-wide text-center">
            Product published successfully. Redirecting to showroom...
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="mb-10 p-6 bg-red-950/20 border border-red-800 text-red-400 font-medium tracking-wide">
            {error}
          </div>
        )}

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="font-playfair text-4xl md:text-5xl text-on-surface font-semibold mb-3 leading-tight">
            Create New Product
          </h1>
          <p className="text-[13px] text-[#888888] leading-relaxed max-w-2xl">
            List your exclusive pieces. Upload high-quality imagery, define
            pricing, and position your creation in the right collection.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[20px] border border-border/40 shadow-[0_20px_60px_rgba(10,10,10,0.08)] p-8 md:p-10">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12"
          >
            {/* Left Column - Form Fields */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Title Field */}
              <div className="input-group flex flex-col">
                <label htmlFor="title" className={fieldLabelCls}>
                  Product Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., The Onyx Silhouette"
                  className={inputCls}
                  disabled={isLoading || success}
                />
              </div>

              {/* Description Field */}
              <div className="input-group flex flex-col">
                <label htmlFor="description" className={fieldLabelCls}>
                  Description
                </label>
                <textarea
                  id="description"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe materials, design, craftsmanship..."
                  className={`${inputCls} resize-none`}
                  disabled={isLoading || success}
                />
              </div>

              {/* Price Section */}
              <div>
                <label className={fieldLabelCls}>Pricing</label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 input-group flex flex-col">
                    <input
                      id="priceAmount"
                      type="number"
                      step="0.01"
                      min="0"
                      value={priceAmount}
                      onChange={(e) => setPriceAmount(e.target.value)}
                      placeholder="0.00"
                      className={inputCls}
                      disabled={isLoading || success}
                    />
                  </div>
                  <div className="input-group flex flex-col">
                    <select
                      id="priceCurrency"
                      value={priceCurrency}
                      onChange={(e) => setPriceCurrency(e.target.value)}
                      className={selectCls}
                      disabled={isLoading || success}
                    >
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Collection Tags */}
              <div>
                <label className={fieldLabelCls}>Collection</label>
                <div className="flex flex-wrap gap-3">
                  {['Bespoke', 'Archive', 'Accessories'].map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        disabled={isLoading || success}
                        className={`px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-wide transition-all duration-200 ${
                          isSelected
                            ? 'bg-on-surface text-white border border-on-surface'
                            : 'bg-border/30 text-on-surface border border-border/50 hover:border-on-surface hover:bg-border/50'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Media Upload */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <label className={fieldLabelCls}>Product Images</label>
                <p className="text-[12px] text-[#888888] leading-relaxed mb-4">
                  Upload up to 7 high-resolution images. The first image will be
                  the cover.
                </p>
              </div>

              {/* Drag & Drop */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`h-40 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? 'border-on-surface bg-on-surface/3'
                    : 'border-border hover:border-on-surface/50 bg-border/10'
                }`}
              >
                <span className="material-symbols-outlined text-3xl text-[#888888] mb-2">
                  cloud_upload
                </span>
                <span className="text-[12px] font-semibold text-on-surface text-center px-4">
                  Drag & drop images or click to browse
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isLoading || success}
                />
              </div>

              {/* Image Previews */}
              {previews.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {previews.map((previewUrl, index) => (
                    <div
                      key={previewUrl}
                      className="aspect-square relative bg-border group overflow-hidden rounded-lg border border-border/40 shadow-sm"
                    >
                      <img
                        src={previewUrl}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                      />
                      {index === 0 && (
                        <div className="absolute bottom-0 left-0 bg-on-surface/90 text-white px-2 py-1 text-[9px] font-semibold uppercase tracking-wider">
                          Cover
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 w-6 h-6 bg-on-surface/80 hover:bg-red-700 text-white rounded flex items-center justify-center transition-colors duration-200"
                        title="Remove image"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          close
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || success}
                className="w-full py-4 bg-on-surface text-white font-semibold uppercase tracking-[0.15em] text-[12px] rounded-full hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <span>Publish Product</span>
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
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
    </div>
  );
}
