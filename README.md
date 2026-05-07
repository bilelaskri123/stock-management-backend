# Stock Management APIs

Stock Management system APIs that handle Auth module, Purchase module and stock movement.

## Requirements

- Node.js (18+ recommended)
- npm
- Postgres (for local runs) — you can set credentiels in `.env`

## Environment

Create a `.env` file in the project root with the same template as `.env.template` (not checked into git) with:

```
DB_NAME=YOUR_DATABASE_NAME
DB_USER=YOUR_DATABASE_USER
DB_PASSWORD=YOUR_DATABASE_PASSWORD
DB_HOST=YOUR_DATABASE_HOST
PORT=YOUR_APPLICATION_PORT
JWT_SECRET=YOUR_JWT_SECRET_KEY
JWT_EXPIRES_IN=YOUR_JWT_EXPIRATION_TIME
```

For tests the project sets `JWT_SECRET=test_jwt_secret` by default.

## Install

```bash
npm install
```

## Scripts

- Start server: `npm start` (reads `.env`)
- Start dev: `npm run start:dev`
- Run tests: `npm test`

## Testing

This project uses Jest + Supertest and an in-memory MongoDB for fast, isolated tests.

```bash
npm test
```

## Continuous Integration

A GitHub Actions workflow (`.github/workflows/ci.yml`) runs the test suite on push and pull requests (Node 18 and 20).

## Docker (Production)

A production docker-compose is provided in `docker-compose.prod.yml`.

Quick steps to run in production mode locally (example):

1. Create a `.env.prod` file (keep it secret) with values such as:

```
DB_NAME=stock_management
DB_USER=postgres
DB_PASSWORD=5432
DB_HOST=localhost
PORT=3000
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
```

2. Build and start the production stack:

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod up --build -d
```

3. Check services and logs:

```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f app
```
