# InstaFood Backend

This is the backend for the InstaFood project. It provides authentication endpoints (user and food-partner) and connects to a local MongoDB instance.

## Contents

- `src/` - application source
  - `app.js` - Express app setup
  - `controllers/auth.controller.js` - authentication controllers for users and food partners
  - `database/db.js` - MongoDB connection helper
  - `models/` - Mongoose models (user, login, food partner, ...)
  - `routes/auth.routes.js` - auth routes mounted under `/api/auth`
- `server.js` - starts the app

## Prerequisites

- Node.js 14+ / 16+ recommended
- MongoDB (local or remote)

## Install

Open a terminal in the `backend` folder and run:

```powershell
npm install
```

## Environment variables

Create a `.env` file in the `backend` folder or set the following environment variables in your environment:

- `MONGO_URI` (optional) - MongoDB connection string. The app currently connects to `your-database-connection-string` by default.
- `JWT_SECRECT_KEY` - secret key used to sign JWTs (controller currently expects this exact name; consider renaming to `JWT_SECRET_KEY` to avoid typos).

Example `.env` (if using a loader like `dotenv` — not included by default):

```
MONGO_URI= your-database-connection-string
JWT_SECRECT_KEY=your-very-secret-key
```

## Run

Start the server from the `backend` folder:

```powershell
node server.js
```

If using `nodemon` (recommended for development):

```powershell
npx nodemon server.js
```

The server listens on port `3000` by default (see `server.js`).

## API Endpoints (auth)

All auth routes are mounted under `/api/auth` (see `src/routes/auth.routes.js`). The currently implemented routes:

- POST `/api/auth/user/register`
  - Body: `{ fullName, email, password }`
  - Registers a user and sets an auth cookie

- POST `/api/auth/user/login`
  - Body: `{ email, password }`
  - Logs in a user and sets an auth cookie

Note: The controller also contains food-partner handlers (`foodPartnerRegister`, `foodPartnerLogin`) but you should check whether corresponding routes are wired in `src/routes` or elsewhere.

## Cookies

The controllers set a `token` cookie with the signed JWT. Ensure your client accepts cookies if you plan to use cookie-based auth.

## Troubleshooting

- Error: `Cannot destructure property 'email' of 'req.body' as it is undefined`
  - Ensure `express.json()` middleware is enabled (it is in `src/app.js`). Also ensure requests include a JSON body and the `Content-Type: application/json` header.

- Error: `userModel.findOne is not a function`
  - This is caused by importing the model incorrectly. The models in `src/models` export objects like `{ userModel, loginModel }`. Make sure controllers import the correct property (for example: `const { userModel } = require('./models/user.model')`).

## Notes & Next steps

- Add validation middleware (Joi / express-validator / Zod) to validate request bodies.
- Add tests for auth endpoints (happy path + missing/invalid input).
- Consider consolidating model exports to export the model directly (module.exports = userModel) if controllers assume a default export.
- Rename `JWT_SECRECT_KEY` to `JWT_SECRET_KEY` and update usages to avoid spelling issues.

If you'd like, I can also:
- Add a minimal `.env.example` file.
- Wire food-partner routes if they are missing.
- Add a Postman collection or simple curl examples for the endpoints.
