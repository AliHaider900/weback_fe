# weBack Frontend

This is the frontend for the weBack project, built with Next.js and React. It provides a modern UI for interacting with the backend APIs.

## Prerequisites

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher (comes with Node.js)

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd weBack/weBack_Frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   - Create a `.env.local` file in the root of `weBack_Frontend`.
   - Add any required environment variables (see `api/config.js` for API URLs, etc).

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The app will be available at [https://www.weback.kiwicoder.com/](https://www.weback.kiwicoder.com).

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Useful Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Run linter

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS
- Radix UI
- Axios

## Folder Structure

- `app/` — Application pages and layouts
- `components/` — Reusable UI components
- `api/` — API configuration
- `hooks/` — Custom React hooks
- `lib/` — Utilities and data
- `public/` — Static assets

## License

This project is licensed under the MIT License.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
