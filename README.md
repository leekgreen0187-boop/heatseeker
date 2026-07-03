# HeatSeeker

HeatSeeker is a responsive sneaker-discovery website built with HTML, CSS, and vanilla JavaScript. It presents a curated collection of influential sneakers, including Jordan, Nike, and adidas releases.

The project was created to practice rendering data into the DOM, working with a public API, and implementing reliable client-side sorting.

## Features

- Sneaker cards generated from a JavaScript array
- Sorting by name (A–Z and Z–A)
- Sorting by release year (newest and oldest)
- Live search by sneaker name, brand, or rarity
- Product imagery supplemented by the DummyJSON API
- Built-in image fallbacks when the API is unavailable
- Responsive layouts for desktop, tablet, and mobile
- About and contact pages
- Accessible contact-form validation
- Shared navigation and footer

## Built With

- Semantic HTML5
- CSS3, Grid, and Flexbox
- Vanilla JavaScript
- [DummyJSON Products API](https://dummyjson.com/docs/products)

## Project Structure

```text
HeatSeeker/
├── index.html       # Sneaker collection, search, and sorting
├── about.html       # HeatSeeker story
├── contact.html     # Contact form
├── styles.css       # Shared styles and responsive layouts
├── script.js        # Data, rendering, API, sorting, and validation
├── README.md
├── LICENSE
└── .gitignore
```

## Run Locally

Clone the repository and open it in Visual Studio Code:

```bash
git clone https://github.com/YOUR-USERNAME/heatseeker.git
cd heatseeker
code .
```

Use the **Live Server** extension to open `index.html`. A local server is recommended because the site requests sneaker imagery from an external API.

No package installation or build step is required.

## Sorting Logic

The dropdown supports four required sort options:

- Name A–Z
- Name Z–A
- Release year: newest first
- Release year: oldest first

The original sneaker array remains unchanged. Each sort operates on a copied array before the cards are rendered again.

## Collaboration

1. Create a branch for your change: `git switch -c feature/short-description`
2. Make and test your edits.
3. Commit with a clear message.
4. Push the branch and open a pull request.
5. Use pull-request comments or GitHub Issues to discuss ideas before merging.

## Disclaimer

HeatSeeker is an educational portfolio project and is not affiliated with or endorsed by Nike, Jordan Brand, adidas, Yeezy, or DummyJSON. Product names and trademarks belong to their respective owners. Listed prices are illustrative and are not live marketplace prices.

## License

This project is available under the [MIT License](LICENSE).
