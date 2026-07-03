/* ============================================
   HEATSEEKER - SNEAKER COLLECTION SITE
   ============================================ */

/* ============================================
   DATA & CONSTANTS
   ============================================ */

/** Curated sneaker collection data */
const sneakers = [
  { name: "Air Jordan 1 Retro High OG 'Chicago'", brand: "Jordan", releaseYear: 1985, price: 550, rarity: "Iconic" },
  { name: "Air Jordan 4 'Bred'", brand: "Jordan", releaseYear: 1989, price: 480, rarity: "Classic" },
  { name: "Nike Dunk Low 'Panda'", brand: "Nike", releaseYear: 2021, price: 160, rarity: "General Release" },
  { name: "adidas Yeezy Boost 350 V2 'Zebra'", brand: "adidas", releaseYear: 2017, price: 320, rarity: "Limited" },
  { name: "Air Jordan 11 'Concord'", brand: "Jordan", releaseYear: 1995, price: 400, rarity: "Classic" },
  { name: "Nike Air Max 1 'Anniversary'", brand: "Nike", releaseYear: 1987, price: 220, rarity: "Retro" },
  { name: "adidas Forum Low 'White Blue'", brand: "adidas", releaseYear: 2021, price: 120, rarity: "General Release" },
  { name: "Air Jordan 3 'Black Cement'", brand: "Jordan", releaseYear: 1988, price: 420, rarity: "Classic" },
  { name: "Nike Air Foamposite One 'Royal'", brand: "Nike", releaseYear: 1997, price: 310, rarity: "Iconic" },
  { name: "Nike KD 15 'Aunt Pearl'", brand: "Nike", releaseYear: 2022, price: 260, rarity: "Limited" },
  { name: "Nike Ja 1 'Day One'", brand: "Nike", releaseYear: 2023, price: 180, rarity: "Debut" },
  { name: "adidas AE 1 'With Love'", brand: "adidas", releaseYear: 2023, price: 150, rarity: "Performance" }
];

/* ============================================
   DOM SELECTORS
   ============================================ */

// Catalog elements
const grid = document.querySelector("#sneaker-grid");
const sortSelect = document.querySelector("#sort-select");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const resultCount = document.querySelector("#result-count");
const statusMessage = document.querySelector("#status-message");
const emptyState = document.querySelector("#empty-state");
const clearSearchButton = document.querySelector("#clear-search");

// Contact form elements
const contactForm = document.querySelector("#contact-form");

// Footer elements
const currentYearElements = document.querySelectorAll("#current-year");

/* ============================================
   STATE MANAGEMENT
   ============================================ */

let sneakerImages = [];
let searchTerm = "";

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

/**
 * Generates a graceful SVG fallback image when API is unavailable
 * @param {number} index - Index of the sneaker to determine color
 * @returns {string} Data URL for SVG image
 */
function makeFallbackImage(index) {
  const colors = ["#ff5c35", "#d9f24f", "#a8c7fa", "#f0b8d2"];
  const color = colors[index % colors.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 480"><rect width="600" height="480" fill="#f0ede6"/><path d="M115 285c70-7 123-83 174-116 35-22 60 20 88 65 22 36 76 44 126 53 24 4 38 25 28 47-8 17-25 27-45 27H136c-47 0-62-71-21-76Z" fill="${color}"/><path d="M135 327h357M229 244l101 42m-74-79 103 60" fill="none" stroke="#171717" stroke-width="12" stroke-linecap="round"/><path d="M158 345h330" stroke="#fff" stroke-width="18" stroke-linecap="round"/></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

/* ============================================
   CATALOG & SORTING
   ============================================ */

/**
 * Fetches product imagery from DummyJSON API
 * Falls back to local SVG images if API is unavailable
 */
async function loadSneakerImages() {
  if (!grid) return;

  try {
    const categories = ["mens-shoes", "womens-shoes"];
    const responses = await Promise.all(
      categories.map(category => fetch(`https://dummyjson.com/products/category/${category}`))
    );

    if (responses.some(response => !response.ok)) {
      throw new Error("The image service did not respond.");
    }

    const datasets = await Promise.all(responses.map(response => response.json()));
    sneakerImages = datasets.flatMap(dataset => dataset.products.map(product => product.thumbnail));
  } catch (error) {
    console.warn("HeatSeeker is using local fallback artwork:", error.message);
  } finally {
    statusMessage.hidden = true;
    updateCollection();
  }
}

/**
 * Sorts sneaker collection based on selected criteria
 * @param {Array} collection - Array of sneaker objects
 * @param {string} sortBy - Sort method (az, za, newest, oldest)
 * @returns {Array} Sorted sneaker array
 */
function sortSneakers(collection, sortBy) {
  // Copying with [...] keeps the original sneakers array unchanged
  const sorted = [...collection];

  switch (sortBy) {
    case "az":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "za":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "newest":
      return sorted.sort((a, b) => b.releaseYear - a.releaseYear);
    case "oldest":
      return sorted.sort((a, b) => a.releaseYear - b.releaseYear);
    default:
      return sorted;
  }
}

/**
 * Renders sneaker cards in the grid
 * @param {Array} collection - Array of sneaker objects to render
 */
function renderSneakers(collection) {
  grid.innerHTML = "";

  collection.forEach((sneaker, index) => {
    const originalIndex = sneakers.indexOf(sneaker);
    const card = document.createElement("article");
    card.className = "sneaker-card";
    card.style.animationDelay = `${index * 45}ms`;

    const image = sneakerImages[originalIndex % sneakerImages.length] || makeFallbackImage(originalIndex);

    card.innerHTML = `
      <div class="card-image">
        <span class="card-number">${String(originalIndex + 1).padStart(2, "0")}</span>
        <img src="${image}" alt="${sneaker.name}" loading="lazy">
      </div>
      <div class="card-body">
        <p class="card-brand">${sneaker.brand}</p>
        <h3>${sneaker.name}</h3>
        <div class="card-details">
          <span>Released ${sneaker.releaseYear}</span>
          <span>Archive pair</span>
        </div>
        <div class="card-price">
          <strong>$${sneaker.price}</strong>
          <span class="rarity">${sneaker.rarity}</span>
        </div>
      </div>`;

    grid.appendChild(card);
  });

  resultCount.textContent = `${collection.length} ${collection.length === 1 ? "pair" : "pairs"} in the collection`;
  emptyState.hidden = collection.length !== 0;
}

/**
 * Filters, sorts, and renders the sneaker collection
 */
function updateCollection() {
  const filtered = sneakers.filter(sneaker => {
    const searchableText = `${sneaker.name} ${sneaker.brand} ${sneaker.rarity}`.toLowerCase();
    return searchableText.includes(searchTerm.toLowerCase());
  });

  const sorted = sortSneakers(filtered, sortSelect.value);
  renderSneakers(sorted);
}

/* ============================================
   EVENT LISTENERS - CATALOG
   ============================================ */

/**
 * Initialize catalog interactions (sort, search, clear filters)
 */
function initCatalog() {
  if (!grid) return;

  sortSelect.addEventListener("change", updateCollection);

  searchForm.addEventListener("submit", event => {
    event.preventDefault();
    searchTerm = searchInput.value.trim();
    updateCollection();
    document.querySelector("#catalog").scrollIntoView({ behavior: "smooth" });
  });

  searchInput.addEventListener("input", () => {
    searchTerm = searchInput.value.trim();
    updateCollection();
  });

  clearSearchButton.addEventListener("click", () => {
    searchInput.value = "";
    searchTerm = "";
    updateCollection();
    searchInput.focus();
  });

  loadSneakerImages();
}

/* ============================================
   CONTACT FORM VALIDATION
   ============================================ */

/**
 * Validates contact form fields and handles submission
 */
function initContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = contactForm.elements.name;
    const email = contactForm.elements.email;
    const message = contactForm.elements.message;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Define validation rules for each field
    const validations = [
      {
        field: name,
        errorId: "name-error",
        valid: name.value.trim().length >= 2,
        message: "Please enter at least two characters."
      },
      {
        field: email,
        errorId: "email-error",
        valid: emailPattern.test(email.value.trim()),
        message: "Please enter a valid email address."
      },
      {
        field: message,
        errorId: "message-error",
        valid: message.value.trim().length >= 10,
        message: "Please write at least ten characters."
      }
    ];

    // Apply validation states
    validations.forEach(item => {
      item.field.classList.toggle("invalid", !item.valid);
      item.field.setAttribute("aria-invalid", String(!item.valid));
      document.querySelector(`#${item.errorId}`).textContent = item.valid ? "" : item.message;
    });

    // Handle form submission or show errors
    const formIsValid = validations.every(item => item.valid);
    const formStatus = document.querySelector("#form-status");

    if (formIsValid) {
      formStatus.textContent = `Thanks, ${name.value.trim()}! Your demo message is ready to go.`;
      contactForm.reset();
    } else {
      formStatus.textContent = "";
      validations.find(item => !item.valid).field.focus();
    }
  });
}

/* ============================================
   INITIALIZATION
   ============================================ */

/**
 * Update current year in footer elements
 */
function updateFooterYear() {
  currentYearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
  });
}

/**
 * Initialize all components on page load
 */
function init() {
  initCatalog();
  initContactForm();
  updateFooterYear();
}

// Start the app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
