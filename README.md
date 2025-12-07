# PrestaShopTesting

This repo is considered to be repository for testing script related to PrestaShop

## Setup

This project uses Playwright with TypeScript for end-to-end testing and Prettier for code formatting.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
npm install
npx playwright install
```

## Usage

### Running Tests

```bash
# Run all tests in headless mode
npm test

# Run tests in headed mode (with browser UI)
npm run test:headed

# Run tests in UI mode (interactive)
npm run test:ui

# Show test report
npm run test:report
```

### Code Formatting

```bash
# Format all files
npm run format

# Check formatting without making changes
npm run format:check
```

## Project Structure

- `tests/` - Contains all test files
- `playwright.config.ts` - Playwright configuration
- `tsconfig.json` - TypeScript configuration
- `.prettierrc` - Prettier formatting rules
