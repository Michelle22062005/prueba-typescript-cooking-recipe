# Cooking Recipe

Cooking Recipe is a web application built with Next.js. It allows users to browse recipes, view recipe details, create an account, log in, and save favorite recipes.

## Repository

[Michelle22062005/prueba-typescript-cooking-recipe](https://github.com/Michelle22062005/prueba-typescript-cooking-recipe)

## Features

- Browse available recipes.
- View detailed information for each recipe.
- User registration and login.
- Authentication with credentials and OAuth providers using NextAuth.
- Favorite recipe management by user.
- Welcome email sent after account creation.
- Data persistence with MongoDB and Mongoose.

## Technologies

- Next.js 16
- React 19
- TypeScript
- MongoDB
- Mongoose
- NextAuth
- bcryptjs
- Nodemailer
- HeroUI
- Tailwind CSS
- SweetAlert2

## Requirements

Before running the project, make sure you have:

- Node.js
- npm
- An available MongoDB database

## Installation

Clone the repository and install the dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env.local` file in the project root and configure the required variables:

```env
DATABASE=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

MAIL_USER=your_gmail_address
MAIL_PASS=your_password_or_app_password
```

`DATABASE` is required to connect the application to MongoDB. Google, GitHub, and email variables are required only if you want to use those services.

## Running the Project

Start the development server:

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

Runs the project in development mode.

```bash
npm run build
```

Builds the production version.

```bash
npm run start
```

Runs the production version after building.

```bash
npm run lint
```

Runs ESLint to check the code.

## Main Structure

```text
src/
  app/
    api/              Recipe, user, favorite, auth, and email endpoints
    favorites/        Favorites page
    login/            Login page
    register/         Register page
    recipes/          Recipe detail page
  components/         Reusable components
  context/            Authentication and favorites context
  database/models/    Mongoose models
  lib/                Database connection
  services/           Functions to consume the internal API
  types/              TypeScript types
```

## Application Routes

- `/`: displays the main recipe list.
- `/recipes/[id]`: displays the details of a recipe.
- `/login`: allows users to log in.
- `/register`: allows users to create an account.
- `/favorites`: displays the authenticated user's favorite recipes.

## Main Endpoints

- `GET /api/recipes`: gets all recipes.
- `GET /api/recipes/[id]`: gets a recipe by id.
- `POST /api/register`: registers a new user.
- `POST /api/login`: validates user credentials.
- `GET /api/favorites?userId=...`: gets a user's favorite recipes.
- `POST /api/favorites`: saves a recipe as favorite.
- `DELETE /api/favorites?userId=...&recipeId=...`: removes a recipe from favorites.
- `POST /api/sendemail`: sends a welcome email.

## Data Models

### Recipe

A recipe includes name, image, preparation time, difficulty, description, ingredients, preparation steps, portions, and creation date.

### User

A user includes name, email, encrypted password, and creation date.

### Favorite

A favorite connects a user with a recipe. The `userId` and `recipeId` combination is unique to prevent duplicates.

## Notes

- Passwords are encrypted with `bcryptjs`.
- Authentication uses JWT through NextAuth.
- To send emails with Gmail, using an App Password is recommended.
- The favorites page requires an active session.
