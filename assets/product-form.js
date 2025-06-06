class ProductForm extends HTMLElement {
  constructor() {
    super();
    this.form = this.querySelector('form');
    this.form.addEventListener('change', this.onChange.bind(this));
    this.cartButton = this.querySelector('[name="add"]');
    this.priceElement = this.closest('.main-product').querySelector('.main-product__price');
  }

  onChange(event) {
    const formData = new FormData(this.form);
    const sectionId = this.dataset.sectionId;

    // Fetch new variant data from Shopify
    fetch(`${this.dataset.url}?section_id=${sectionId}`, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.text())
    .then(responseText => {
      const html = new DOMParser().parseFromString(responseText, 'text/html');
      this.updatePrice(html);
      this.updateButton(html);
      this.updateURL(formData);
    })
    .catch(e => {
      console.error(e);
    });
  }

  updatePrice(html) {
    const newPriceElement = html.querySelector('.main-product__price');
    if (this.priceElement && newPriceElement) {
      this.priceElement.innerHTML = newPriceElement.innerHTML;
    }
  }

  updateButton(html) {
    const newButton = html.querySelector('[name="add"]');
    if (this.cartButton && newButton) {
      this.cartButton.innerHTML = newButton.innerHTML;
      this.cartButton.disabled = newButton.disabled;
    }
  }

  updateURL(formData) {
    const variantId = formData.get('id');
    window.history.replaceState({}, '', `${this.dataset.url}?variant=${variantId}`);
  }
}

customElements.define('product-form', ProductForm);