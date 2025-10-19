# SICVANGCREAGR Credit Conditions Simulator

A modern credit conditions simulator built with Next.js 15.5+ and PrimeReact.

## 🚀 Features

- ⚡ **Next.js 15.5.6** - Latest version with App Router
- 🔥 **TurboPack** - Ultra-fast bundler for development and production builds
- 🎨 **PrimeReact** - Rich UI component library
- 🎯 **TypeScript** - Type-safe development
- 💅 **Tailwind CSS v4** - Utility-first CSS framework
- ✨ **Prettier** - Consistent code formatting with TailwindCSS plugin
- 🔍 **ESLint** - Code quality and best practices

## 📦 Tech Stack

- **Framework**: Next.js 15.5.6
- **UI Components**: PrimeReact 10.9.7
- **Styling**: Tailwind CSS v4 + PrimeReact Themes
- **Language**: TypeScript 5
- **Bundler**: TurboPack (enabled by default)
- **Code Quality**: ESLint + Prettier

## 🛠️ Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Run development server with TurboPack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build

```bash
# Build for production with TurboPack
npm run build

# Start production server
npm start
```

### Code Quality

```bash
# Format code with Prettier
npm run format

# Check formatting
npm run format:check

# Run ESLint
npm run lint
```

## 📁 Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── globals.css      # Global styles + PrimeReact CSS imports
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page with PrimeReact demo
├── public/              # Static assets
├── .eslintrc.json       # ESLint configuration
├── .prettierrc.json     # Prettier configuration
├── next.config.ts       # Next.js configuration with TurboPack
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## 🎨 PrimeReact Integration

PrimeReact is fully integrated with:

- Theme: Lara Light Blue (customizable)
- Icons: PrimeIcons
- All components available for use

Example usage:

```tsx
import { Button } from "primereact/button";
import { Card } from "primereact/card";

export default function MyComponent() {
  return (
    <Card title="My Card">
      <Button label="Click Me" icon="pi pi-check" />
    </Card>
  );
}
```

## 🔧 Configuration Highlights

### TurboPack

TurboPack is enabled in all npm scripts:

- `npm run dev` - Development with TurboPack
- `npm run build` - Production build with TurboPack

### Prettier

Configured with:

- Tailwind CSS class sorting plugin
- Consistent formatting rules
- Auto-format on save (recommended in your editor)

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [PrimeReact Documentation](https://primereact.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TurboPack Documentation](https://turbo.build/pack/docs)

## 🚀 Deploy

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
