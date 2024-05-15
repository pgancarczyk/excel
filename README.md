## How to run locally

To start locally in the development mode, copy .env.example to .env and run:

```bash
docker compose up -d db
pnpm db:push
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in the browser.

## Choice of libraries

- Next.js as the main framework, for its ease of backend + frontend + db integration
- PostreSQL with Prisma for data storage, no TRPC in favour of using Next.js server actions - all database manipulation is typed
- NextAuth and Github OAuth for authentication, for its simplicity
- TanStack table for its versatility and because it's headless (no UI framework was used, only Tailwind as a styling utility)
- Jest and Playwright for unit and E2E tests
- SheetJS for Excel files parsing
