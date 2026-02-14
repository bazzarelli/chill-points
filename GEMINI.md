# Chill Points Game

## Project Overview

This is a Next.js web application called "Chill Points Game". It seems to be a game designed to help users with breathing exercises for health optimization. The application features user authentication, a game interface, and tracks user progress.

**Key Technologies:**

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Database:** [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/) ORM
*   **Authentication:** [NextAuth.js](https://next-auth.js.org/) with GitHub, Google, and Discord providers.
*   **Testing:** [Jest](https://jestjs.io/) for unit/integration tests and [Cypress](https://www.cypress.io/) for end-to-end tests.
*   **Linting & Formatting:** [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)

## Building and Running

To get the application running locally, you'll need to have Node.js and pnpm installed.

1.  **Install Dependencies:**
    ```bash
    pnpm install
    ```

2.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project and add the necessary environment variables for the database connection and authentication providers. You can use `.env.example` as a template if it exists.

3.  **Run Database Migrations:**
    ```bash
    pnpm run migrate:dev
    ```

4.  **Run the Development Server:**
    ```bash
    pnpm run dev
    ```

    The application should now be running at [http://localhost:3000](http://localhost:3000).

## Testing

The project has both unit/integration tests and end-to-end tests.

*   **Run Unit/Integration Tests:**
    ```bash
    pnpm test
    ```

*   **Run End-to-End Tests:**
    ```bash
    pnpm run test:e2e
    ```

    You can also open the Cypress test runner with:
    ```bash
    pnpm run cypress
    ```

## Development Conventions

*   **Code Style:** The project uses ESLint and Prettier to enforce a consistent code style. It's recommended to set up your editor to format on save.
*   **Commits:** Commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
*   **Branching:** (Assumed) Create a new branch for each feature or bug fix.
*   **Pull Requests:** (Assumed) Open a pull request to merge changes into the `main` branch.
