/* P.S. Coffee — <image-slot> custom element (production build)
 *
 * Replaces the omelette design-canvas scaffold with a minimal version
 * that covers the only production requirements:
 *   - Responsive src: `src` on desktop, `mobile-src` on ≤760 px
 *   - object-fit controlled by the `fit` attribute (default: cover)
 *   - Accessible `placeholder` attribute used as alt text and fallback caption
 *   - Shape / mask attributes accepted but handled by parent CSS (no shadow DOM)
 *
 * The original component fired fetch('.image-slots.state.json') on every
 * connectedCallback — a guaranteed 404 in production. This version does not.
 */
(() => {
  const MQ_MOBILE = window.matchMedia ? window.matchMedia('(max-width: 760px)') : null;

  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['src', 'mobile-src', 'data-mobile-src', 'placeholder', 'fit'];
    }

    connectedCallback() {
      if (!this._connected) {
        this._connected = true;
        // Ensure the element participates in block layout so parent
        // width/height rules take effect (same as original :host display).
        if (!this.style.display) this.style.display = 'block';
        if (MQ_MOBILE) {
          this._mqHandler = () => this._render();
          MQ_MOBILE.addEventListener('change', this._mqHandler);
        }
      }
      this._render();
    }

    disconnectedCallback() {
      if (MQ_MOBILE && this._mqHandler) {
        MQ_MOBILE.removeEventListener('change', this._mqHandler);
      }
    }

    attributeChangedCallback() {
      if (this._connected) this._render();
    }

    _render() {
      const isMobile = MQ_MOBILE && MQ_MOBILE.matches;
      const mobileSrc = this.getAttribute('mobile-src') || this.getAttribute('data-mobile-src') || '';
      const src = (isMobile && mobileSrc) || this.getAttribute('src') || '';
      const placeholder = this.getAttribute('placeholder') || '';
      const fit = this.getAttribute('fit') || 'cover';

      if (src) {
        this._clearPlaceholder();
        if (!this._img) {
          this._img = document.createElement('img');
          this._img.style.cssText = 'width:100%;height:100%;display:block';
          this.appendChild(this._img);
        }
        this._img.style.objectFit = fit;
        this._img.alt = placeholder;
        if (this._img.getAttribute('src') !== src) this._img.setAttribute('src', src);
      } else {
        this._clearImage();
        if (!this._cap) {
          this._cap = document.createElement('span');
          this._cap.style.cssText = [
            'display:flex', 'align-items:center', 'justify-content:center',
            'width:100%', 'height:100%', 'font-size:13px',
            'color:rgba(0,0,0,.4)', 'background:rgba(0,0,0,.04)',
            'text-align:center', 'padding:8px', 'box-sizing:border-box',
          ].join(';');
          this.appendChild(this._cap);
        }
        this._cap.textContent = placeholder;
      }
    }

    _clearImage() {
      if (this._img) { this._img.remove(); this._img = null; }
    }

    _clearPlaceholder() {
      if (this._cap) { this._cap.remove(); this._cap = null; }
    }
  }

  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
