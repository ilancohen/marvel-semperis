# Marvel Characters SPA

A Vue 3 application for browsing Marvel characters and comics using the Comic Vine API.

## Live Demo

🌐 **Deployed App**: [https://marvel-semperis.onrender.com](https://marvel-semperis.onrender.com)

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v10.28.2 or compatible)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd semperis
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env` file in the root directory:
   ```bash
   COMIC_VINE_API_KEY=your_api_key_here
   ```

### Getting a Comic Vine API Key

1. Visit [comicvine.com](https://www.comicvine.com/)
2. Create a free account or log in
3. Navigate to the [API section](https://comicvine.gamespot.com/api/)
4. Request an API key (it's free)
5. Copy your API key and add it to your `.env` file as `COMIC_VINE_API_KEY`

### Running the Application

**Development mode** (runs both client and server):
```bash
pnpm dev
```

This will start:
- Frontend dev server on `http://localhost:5173` (Vite default port)
- Backend proxy server on `http://localhost:3000`

**Production mode**:
```bash
pnpm build
pnpm start
```

The built application will be served on `http://localhost:3000`

### Available Scripts

- `pnpm dev` - Start development servers (client + server)
- `pnpm build` - Build the application for production
- `pnpm start` - Start production server
- `pnpm test` - Run tests
- `pnpm type-check` - Run TypeScript type checking
