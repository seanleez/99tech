# Peasy Swap - Currency Exchange Application

A modern React-based currency exchange application built with Vite, TypeScript, and Bootstrap. Users can swap between different cryptocurrencies with real-time balance tracking and validation.

## 🚀 Deployment

### Domain: https://99tech-ochre.vercel.app/

## 📁 Folder Structure

```
peasy-swap/
├── public/                     # Static assets
│   └── vite.svg
├── src/
│   ├── apis/                   # API layer
│   │   ├── get-available-balance.api.ts
│   │   ├── post-convert-currencies.api.ts
│   │   └── index.ts
│   ├── assets/                 # Application assets
│   │   ├── images/
│   │   │   └── logo.png
│   │   └── tokens/             # 474 cryptocurrency token icons
│   ├── components/             # Reusable UI components
│   │   ├── currency-select/    # Currency dropdown component
│   │   ├── header/             # Application header
│   │   ├── number-input/       # Number input with validation
│   │   ├── spinner/            # Loading spinner
│   │   ├── svg-icon/           # SVG icon component
│   │   ├── toast/              # Toast notification
│   │   └── index.ts
│   ├── const/                  # Application constants
│   ├── contexts/               # React contexts
│   │   ├── toast.context.tsx   # Toast context provider
│   │   └── index.ts
│   ├── hooks/                  # Custom React hooks
│   ├── pages/                  # Application pages
│   │   ├── currency-swap/      # Main currency swap page
│   │   │   ├── currency-swap.page.tsx
│   │   │   ├── currency-swap.schema.ts
│   │   │   ├── currency-swap.style.scss
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── type/                   # TypeScript type definitions
│   │   ├── currency.type.ts
│   │   └── index.ts
│   ├── util/                   # Utility functions
│   │   ├── format-currency.util.ts
│   │   └── index.ts
│   ├── App.scss                # Global styles
│   ├── App.tsx                 # Main application component
│   ├── index.css               # Base styles
│   ├── main.tsx                # Application entry point
│   └── vite-env.d.ts           # Vite type definitions
├── dist/                       # Build output
├── node_modules/               # Dependencies
├── eslint.config.js             # ESLint configuration
├── index.html                  # HTML template
├── package.json                # Project dependencies and scripts
├── package-lock.json           # Dependency lock file
├── tsconfig.json                # TypeScript configuration
├── tsconfig.app.json            # App-specific TypeScript config
├── tsconfig.node.json           # Node-specific TypeScript config
├── vite.config.ts               # Vite configuration
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.20 or higher
- **npm**: 10.8.2 or higher

### Installation

1. Navigate to the project directory:

```bash
cd problem2/peasy-swap
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000` and will automatically open in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🧪 Test Cases

The application includes comprehensive validation and user interaction scenarios:

### 1. Submit When Not Input

- **Scenario**: User clicks "Swap" button without entering any amount
- **Expected Behavior**:
  - Form validation prevents submission
  - Error message: "Amount must be greater than 0"
  - Swap button remains disabled

### 2. Input Exceed Balance

- **Scenario**: User enters an amount greater than their available balance
- **Expected Behavior**:
  - Form validation prevents submission
  - Error message: "Amount cannot exceed balance"
  - Input field shows error state (red border)

### 3. Input on Both From and To Input

- **Scenario**: User enters amounts in both "From" and "To" fields
- **Expected Behavior**:
  - Only the last edited field determines the conversion
  - The other field automatically updates based on current exchange rates
  - Real-time conversion between currencies

### 4. Switch Currencies

- **Scenario**: User changes the selected currency in dropdown
- **Expected Behavior**:
  - Currency dropdown updates with new selection
  - Amount fields recalculate based on new exchange rates
  - Balance validation updates for the new currency
  - Exchange rate display updates

### 5. Interchange Currencies

- **Scenario**: User clicks the swap button (↕️) to swap from/to currencies
- **Expected Behavior**:
  - From and To currencies swap positions
  - Amounts are also swapped between fields
  - Exchange rate calculation updates
  - Button is only enabled when both currencies have available balance

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Bootstrap 5, SCSS
- **Form Management**: React Hook Form with Zod validation
- **Icons**: Bootstrap Icons
- **Currency Handling**: currency.js
- **Development**: ESLint, Prettier
