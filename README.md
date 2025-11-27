# Doodax - AI Small Claims Statement Generator

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-blue?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Rendered_With-Vite-blue?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green.svg)

<div align="center">
  <h2>
    <a href="https://doodax.com/tools/small-claims-generator/index.html" target="_blank">
      🚀 LIVE DEMO
    </a>
  </h2>
  <p>Click the link above to view the deployed application in a new tab.</p>
</div>

---

## 📖 About The Project

**Doodax** is a professional, privacy-focused web application designed to democratize access to the legal system. Navigating small claims court can be intimidating and costly; Doodax bridges this gap by providing a free, intuitive, and secure platform for generating foundational legal documents.

The application simplifies the process of creating a structured **Statement of Claim** for Small Claims Court in the United States. By leveraging client-side processing, we ensure complete user privacy—no sensitive legal data is ever sent to or stored on a server. The interface combines modern web technologies with an immersive "galaxy" aesthetic to reduce user stress, complemented by a comprehensive legal guide to assist users in representing themselves effectively.

## ✨ Key Features

*   **🤖 Instant Legal Drafting**: Uses logic-based templates to instantly generate a formatted Statement of Claim based on user inputs (Plaintiff, Defendant, Jurisdiction, and Incident details).
*   **🔒 100% Client-Side Privacy**: All data processing occurs strictly within the user's browser. Zero data retention policy ensures sensitive legal information never leaves the client.
*   **🌌 Immersive User Experience**: Features a high-performance, animated multi-colored galaxy background with glassmorphism UI elements for a modern, calming experience.
*   **📚 Comprehensive Knowledge Base**: Includes an SEO-optimized, detailed guide on navigating the small claims process, understanding jurisdictional limits, and preparing evidence.
*   **📱 Fully Responsive & Accessible**: Optimized for all devices, featuring accessible modals for About, Contact, Privacy Policy, and Terms of Service.
*   **🔍 SEO Optimized**: Built with JSON-LD schema, dynamic meta tags, and semantic HTML structure for maximum search engine visibility.

## 🛠️ Technology Stack

*   **Frontend Framework**: React 18+
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS (Utility-first)
*   **Animation**: HTML5 Canvas (Starfield) + CSS3 Animations
*   **Build Tool**: Vite

## 📂 Project Structure

```text
/
├── public/                     # Static assets served at root
│   ├── favicon.svg             # Brand iconography
│   ├── robots.txt              # Search engine crawler directives
│   └── sitemap.xml             # SEO sitemap configuration
├── src/
│   ├── components/             # Reusable React UI components
│   │   ├── Layout.tsx          # Main app wrapper (Header, Footer, Modals)
│   │   ├── SmallClaimsGenerator.tsx  # Core logic: Form inputs & Preview
│   │   ├── LandingSections.tsx # Marketing UI: Features & Testimonials
│   │   └── Starfield.tsx       # HTML5 Canvas background animation
│   ├── lib/
│   │   └── SmallClaimsTemplate.ts # Template literals for legal documents
│   ├── utils/
│   │   └── SeoArticle.tsx      # SEO Content component with JSON-LD
│   ├── App.tsx                 # Main application entry point
│   ├── index.tsx               # React DOM rendering
│   └── index.css               # Tailwind directives & Global styles
├── index.html                  # HTML entry point with meta tags
└── package.json                # Dependencies and scripts
```

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/doodax.git
    ```
2.  **Install dependencies**
    ```bash
    npm install
    ```
3.  **Start the development server**
    ```bash
    npm run dev
    ```

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

HSINI MOHAMED - [hsini.web@gmail.com](mailto:hsini.web@gmail.com)

Project Link: [https://ClaimsStatement.doodax.com](https://ClaimsStatement.doodax.com)
