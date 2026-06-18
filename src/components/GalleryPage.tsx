import { useMemo, useState } from "react";
import { MandalaWatermark } from "./MandalaWatermark";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import shivaLogo from "../assets/shivaya-yoga-logo.webp";
import { getGalleryImages } from "../utils/gallery";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export function GalleryPage() {
  const images = useMemo(() => getGalleryImages(), []);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = () =>
    setLightboxIndex((current) =>
      current === null ? 0 : (current + 1) % images.length,
    );

  const prevImage = () =>
    setLightboxIndex((current) =>
      current === null
        ? images.length - 1
        : (current - 1 + images.length) % images.length,
    );

  return (
    <div className="relative min-h-screen">
      <MandalaWatermark />

      <section className="gallery-page-hero">
        <img src={shivaLogo} className="gallery-page-logo" alt="Shiva Logo" />
        <p>Shivaya Yogashala</p>
        <h1>Gallery</h1>
      </section>

      <section className="gallery-page-grid-section">
        <div className="gallery-page-grid">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className="gallery-page-card"
              onClick={() => openLightbox(index)}
            >
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                className="gallery-page-image"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      </section>

      {lightboxIndex !== null && (
        <div className="gallery-lightbox-backdrop" role="dialog" aria-modal="true">
          <div className="gallery-lightbox-panel">
            <button
              type="button"
              className="gallery-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close gallery preview"
            >
              <X size={24} />
            </button>

            <div className="gallery-lightbox-content">
              <button
                type="button"
                className="gallery-lightbox-nav gallery-lightbox-prev"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ArrowLeft size={24} />
              </button>

              <div className="gallery-lightbox-image-wrapper">
                <ImageWithFallback
                  src={images[lightboxIndex].src}
                  alt={images[lightboxIndex].alt}
                  className="gallery-lightbox-image"
                />
                <div className="gallery-lightbox-caption">
                  {images[lightboxIndex].caption}
                </div>
              </div>

              <button
                type="button"
                className="gallery-lightbox-nav gallery-lightbox-next"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryPage;
