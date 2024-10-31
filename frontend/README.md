# React Vite Application

A modern React application bootstrapped with Vite.js for lightning-fast development and optimal production builds.

## 🚀 Features

- ⚡️ Lightning Fast HMR (Hot Module Replacement)
- 🎨 Built-in ESLint & Prettier configuration
- 📱 Responsive design ready
- 🔧 TypeScript support
- 📦 Optimized production builds

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14.18+ or 16+)
- npm or yarn or pnpm

## 🏗️ Installation

1. Clone the repository:

```bash
git clone https://github.com/nxveeen/EventAura-FullStack/frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

## 📝 Available Scripts

In the project directory, you can run:

### Development

```bash
npm run dev
```

Runs the app in development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Build

```bash
npm run build
```

Builds the app for production to the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

Locally preview the production build.

### Lint

```bash
npm run lint
```

Run ESLint to analyze and fix code issues.

## 📁 Project Structure

```
your-project-name/
├── public/             # Static files
├── src/
│   ├── assets/        # Images, fonts, etc.
│   ├── components/    # Reusable components
│   ├── pages/         # Page components
│   ├── store/         # Redux Store
│   ├── App.jsx        # Root component
│   └── main.jsx       # Entry point
├── index.html
├── package.json
├── jsconfig.json      # JavaScript configuration
├── tailwind.config.json      # Taiwind configuration
├── vite.config.ts     # Vite configuration
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
```

Access variables in your code:

```javascript
console.log(import.meta.env.VITE_API_URL);
```

## 📚 Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Authors

- Your Name - [GitHub Profile](https://github.com/nxveeen)

## 🙏 Acknowledgments

- [Vite.js](https://vitejs.dev/) for the amazing build tool
- [React](https://reactjs.org/) for the fantastic library
