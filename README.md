# Harshad Patil - Full Stack Developer Portfolio 🚀

Welcome to my personal portfolio repository! This is a highly interactive, animated, and 3D-enhanced single-page application built to showcase my skills, projects, and professional journey as a Full Stack Developer and MCA student.

![Electric Night Theme](https://img.shields.io/badge/Theme-Electric_Night-22D3EE?style=flat-square)
![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-black?style=flat-square&logo=three.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

## ✨ Features

- **Electric Night Theme:** A custom-designed, premium color palette featuring deep midnight backgrounds, electric cyan accents, and indigo glows. Includes full Dark/Light mode support.
- **3D Interactive Background:** Built with Three.js (`@react-three/fiber`), featuring a smooth mouse-parallax camera, glowing wireframe spheres, and a dynamic particle field.
- **AI Voice Assistant:** An integrated Web Speech API agent that introduces me and my work with synced visual audio waves and a male voice.
- **Framer Motion Animations:** Smooth scroll reveals, layout transitions, glassmorphism card hover effects, and a custom interactive cursor glow.
- **Data-Driven Architecture:** All content (skills, projects, experience, etc.) is modularized in `src/data/`, making it incredibly easy to update and scale without touching UI components.
- **Direct Mail Integration:** Contact form uses native `mailto:` to securely open the user's local email client with pre-filled, formatted data.
- **Fully Responsive:** Carefully crafted to look perfect on mobile, tablet, and desktop devices.
- **SEO Optimized:** Meta tags, Open Graph, and optimized rendering for better search engine visibility.

## 🛠️ Technology Stack

- **Core:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4 (using `@custom-variant dark` class toggling), Custom CSS Variables
- **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animation:** Framer Motion, React Type Animation
- **Icons:** React Icons (`react-icons/fi`)

## 📂 Project Structure

```text
src/
 ├── assets/          # Static assets, images, and resume PDF
 ├── components/      # Reusable UI components (Hero, About, Projects, etc.)
 ├── data/            # Static data files (skills.ts, projects.ts, etc.)
 ├── hooks/           # Custom React hooks (useTheme)
 ├── index.css        # Global styles, Tailwind setup, and theme design tokens
 └── App.tsx          # Main application layout and Suspense wrappers
```

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshad4558/Harshad-sPortfolio2.0.git
   cd Harshad-sPortfolio2.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to view the portfolio.

4. **Build for production**
   ```bash
   npm run build
   ```
   The optimized, code-split static files will be generated in the `dist/` folder.

## 🎨 Theme Configuration

The **Electric Night** theme is controlled entirely via CSS variables in `src/index.css`. To modify colors, you only need to update the `:root` (light mode) and `.dark` (dark mode) CSS Custom Properties. The rest of the application will adapt automatically!

## 📫 Contact

- **Email:** hcpatil2324@gmail.com
- **LinkedIn:** [harshad-patil45](https://linkedin.com/in/harshad-patil45)
- **GitHub:** [harshad4558](https://github.com/harshad4558)

---
*Crafted with ❤️ in Kolhapur, India by Harshad Patil.*