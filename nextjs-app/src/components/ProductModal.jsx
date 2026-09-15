"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { buildWhatsAppProductLink } from "../data/products";

export default function ProductModal({ product, isOpen, onClose }) {
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [zoom, setZoom] = useState(1);
  const isDraggingRef = useRef(false);
  const startCoordsRef = useRef({ x: 0, y: 0 });

  const resetView = useCallback(() => {
    setRotX(0);
    setRotY(0);
    setZoom(1);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      resetView();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, resetView]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Drag handlers
  const handleStart = (clientX, clientY) => {
    isDraggingRef.current = true;
    startCoordsRef.current = { x: clientX, y: clientY };
  };

  const handleMove = useCallback((clientX, clientY) => {
    if (!isDraggingRef.current) return;
    const dx = clientX - startCoordsRef.current.x;
    const dy = clientY - startCoordsRef.current.y;

    setRotY((prev) => prev + dx * 0.65);
    setRotX((prev) => Math.max(-40, Math.min(40, prev - dy * 0.45)));

    startCoordsRef.current = { x: clientX, y: clientY };
  }, []);

  const handleEnd = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const onMouseUp = () => handleEnd();

    if (isOpen) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isOpen, handleMove, handleEnd]);

  if (!isOpen || !product) return null;

  return (
    <div
      className="modal-overlay active"
      id="productModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      onClick={(e) => {
        if (e.target.id === "productModal") onClose();
      }}
    >
      <div className="modal-dialog">
        <button className="modal-close-btn" id="modalCloseBtn" aria-label="Cerrar ventana" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-content-grid">
          {/* Interactive 3D Viewer Container */}
          <div className="modal-viewer-wrapper">
            <div
              className="modal-zoom-container"
              id="modalZoomContainer"
              style={{ cursor: isDraggingRef.current ? "grabbing" : "grab", touchAction: "none" }}
              onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
              onTouchStart={(e) => {
                if (e.touches.length === 1) {
                  handleStart(e.touches[0].clientX, e.touches[0].clientY);
                }
              }}
              onTouchMove={(e) => {
                if (e.touches.length === 1) {
                  handleMove(e.touches[0].clientX, e.touches[0].clientY);
                }
              }}
              onTouchEnd={handleEnd}
            >
              <div className="glasses-3d-stage" id="glasses3dStage">
                <div
                  className="glasses-3d-object"
                  id="glasses3dObject"
                  style={{
                    transform: `scale(${zoom}) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                    transition: isDraggingRef.current ? "none" : "transform 0.1s ease-out",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="modal-zoom-image"
                    id="modalZoomImage"
                    draggable={false}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Control Bar */}
            <div className="viewer-bottom-bar">
              <div className="zoom-slider-wrap">
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-dark-500)" }}>Zoom</span>
                <input
                  type="range"
                  min="1"
                  max="2.5"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  id="viewerZoomRange"
                  className="viewer-slider"
                  title="Aumentar tamaño"
                />
              </div>
              <button
                type="button"
                className="viewer-btn"
                id="btnResetView"
                title="Restablecer posición original"
                onClick={resetView}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                <span>Centrar</span>
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="modal-details">
            <span
              className="product-tag-badge"
              id="modalTag"
              style={{ display: "inline-block", width: "fit-content", marginBottom: "0.5rem" }}
            >
              {product.tag}
            </span>
            <span className="product-brand" id="modalBrand" style={{ fontSize: "0.85rem" }}>
              {product.brand} • {product.categoryLabel}
            </span>
            <h2 id="modalTitle" style={{ fontSize: "1.6rem", margin: "0.4rem 0 0.8rem 0" }}>
              {product.name}
            </h2>

            <div style={{ marginBottom: "1rem" }}>
              <span className="product-price" id="modalPrice" style={{ fontSize: "1.75rem" }}>
                S/ {product.price}
              </span>
              {product.oldPrice && (
                <span className="product-price-old" id="modalOldPrice" style={{ fontSize: "1.1rem", marginLeft: "0.5rem" }}>
                  S/ {product.oldPrice}
                </span>
              )}
            </div>

            <p id="modalDesc" style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "var(--color-dark-600)" }}>
              {product.description}
            </p>

            {/* Specifications Table */}
            <div className="modal-specs-list" id="modalSpecsList">
              {product.details && (
                <>
                  <div className="modal-spec-row">
                    <span className="modal-spec-label">Material de Montura</span>
                    <span className="modal-spec-value">{product.details.material}</span>
                  </div>
                  <div className="modal-spec-row">
                    <span className="modal-spec-label">Tratamiento de Cristales</span>
                    <span className="modal-spec-value">{product.details.lenses}</span>
                  </div>
                  <div className="modal-spec-row">
                    <span className="modal-spec-label">Nivel de Protección</span>
                    <span className="modal-spec-value">{product.details.protection}</span>
                  </div>
                  <div className="modal-spec-row">
                    <span className="modal-spec-label">Dimensiones Oficiales</span>
                    <span className="modal-spec-value">{product.details.measurements}</span>
                  </div>
                  <div className="modal-spec-row">
                    <span className="modal-spec-label">Accesorios Incluidos</span>
                    <span className="modal-spec-value">{product.details.included}</span>
                  </div>
                </>
              )}
            </div>

            {/* Direct Purchase Button */}
            <div style={{ marginTop: "auto", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a
                href={buildWhatsAppProductLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                id="modalWhatsAppBtn"
                className="btn btn-whatsapp"
                style={{ flex: 1 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.99.54 1.776.84 2.8.84 3.18 0 5.767-2.587 5.768-5.766.001-3.181-2.586-5.766-5.772-5.766zm8.845 5.767c-.002 4.887-3.974 8.859-8.861 8.859-1.547 0-3.056-.408-4.381-1.182l-4.872 1.278 1.301-4.747c-.854-1.378-1.309-2.977-1.31-4.208 0-4.888 3.973-8.86 8.861-8.86 4.888.001 8.862 3.973 8.862 8.86z" />
                </svg>
                Comprar / Consultar en WhatsApp
              </a>
              <button className="btn btn-outline" onClick={onClose}>
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
