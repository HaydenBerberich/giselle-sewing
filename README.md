# Sewing Company Ecommerce Platform

This project is a full-stack e-commerce platform for a sewing company, built using the following technology stack:

## Tech Stack

**Frontend:**
- **Framework:** React (using Next.js)
- **Language:** Typescript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **UI Component:** Shadcn/ui
- **Admin Panel:** React (using Next.js)

**Backend:**
- **Language and Framework:** Node.js with NestJS
- **API Design:** REST API
- **Authentication:** JWT
- **Database:** PostgreSQL
- **ORM:** Prisma

**Payments:**
- Stripe

**Deployment and Infrastructure:**
- **Containerization:** Docker
- **Cloud Platform:** AWS
- **CI/CD:** GitHub Actions

**Testing:**
- **Unit Testing:** Jest
- **Integration Testing:** Jest
- **End-to-End Testing:** Playwright

## Getting Started

This guide explains how to set up and run the project locally for development.

**Prerequisites:**

*   **Node.js:** Ensure you have Node.js installed (which includes npm).
*   **Docker:** Ensure you have Docker installed and running.
*   **Docker Compose:** Ensure you have Docker Compose installed (often included with Docker Desktop).

**1. Environment Setup:**

*   **Root `.env` for Database:**
    *   In the **root directory** of the project, you will find a file named `.env.example`.
    *   Copy this file and rename the copy to `.env`:
        ```bash
        cp .env.example .env
        ```
    *   Edit the root `.env` file and fill in your desired PostgreSQL credentials (`POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`). **Choose a strong password!** This file provides credentials for the Docker container.
        ```env
        # Root .env file
        POSTGRES_USER=your_db_user
        POSTGRES_PASSWORD=your_strong_password
        POSTGRES_DB=your_db_name
        ```
*   **Backend `.env` for Prisma:**
    *   Navigate to the **backend** directory (e.g., `backend`).
    *   You will find a `.env.example` file specifically for the backend.
    *   Copy this file and rename the copy to `.env`:
        ```bash
        cd backend
        cp .env.example .env
        cd .. # Go back to root or previous directory
        ```
    *   Edit the `backend/.env` file. Ensure the `DATABASE_URL` uses the **same** credentials you set in the root `.env` file.
        ```env
        # backend/.env
        DATABASE_URL="postgresql://your_db_user:your_strong_password@localhost:5432/your_db_name?schema=public"
        ```
*   **Important:** Make sure both `.env` files (root and backend) are added to your `.gitignore` file to avoid committing sensitive credentials.

**2. Database Setup & Initial Migration:**

*   Navigate to the **root directory** of the project (where the `docker-compose.yml` file is located).
*   **Start the PostgreSQL database container** in the background:
    ```bash
    docker-compose up -d
    ```
*   You can verify the database container is running with `docker-compose ps`.
*   **Run the initial database migration:**
    *   Navigate to the **backend** directory.
    *   Execute the Prisma migrate command. This applies the schema defined in `prisma/schema.prisma` to the running database.
        ```bash
        cd backend # Or your actual backend directory name
        npx prisma migrate dev --name init
        ```
    *   *(You only need to run `prisma migrate dev` initially and whenever you change the `schema.prisma` file during development).*
*   To stop the database container when you are finished:
    ```bash
    docker-compose down
    ```
    *(Your data will persist between runs because a Docker volume is used).*

**3. Backend API Application:**

*   **Important:** Ensure the Database container from Step 2 is running and the initial migration has been applied before starting the backend.
*   Navigate to the **backend** directory:
    ```bash
    cd backend # Or your actual backend directory name
    ```
*   Install dependencies (if you haven't already):
    ```bash
    npm install # or yarn install
    ```
*   **(Configuration Note):** Ensure the backend is configured to run on port 3001 (e.g., in `src/main.ts`).
*   Start the development server:
    ```bash
    npm run start:dev # or yarn start:dev
    ```
*   The backend API will be running at: `http://localhost:3001`.

**4. Frontend Application:**

*   Navigate to the **frontend** directory:
    ```bash
    cd frontend-app # Or your actual frontend directory name
    ```
*   Install dependencies (if you haven't already):
    ```bash
    npm install # or yarn install
    ```
*   Start the development server:
    ```bash
    npm run dev # or yarn dev
    ```
*   Access the frontend in your browser at: `http://localhost:3000`

**5. Admin Panel Application:**

*   Navigate to the **admin panel** directory:
    ```bash
    cd admin-panel # Or your actual admin panel directory name
    ```
*   Install dependencies (if you haven't already):
    ```bash
    npm install # or yarn install
    ```
*   Start the development server (on port 3002):
    ```bash
    npm run dev -- --port 3002 # or yarn dev -p 3002
    ```
*   Access the admin panel in your browser at: `http://localhost:3002`

---

**(Optional) Verifying Database Connection:**

After starting the database container (Step 2), you can optionally verify the connection using a tool like `psql` or a GUI client using the credentials from your **root `.env` file** and connecting to `localhost` on port `5432`. After running the migration, you can also use these tools to inspect the tables (`users`, `products`, etc.) that were created.

```bash
# Example using psql (if installed)
psql -h localhost -p 5432 -U your_db_user -d your_db_name
# You will be prompted for your password. Once connected, try \dt to list tables.
```

# Blueprint

## Phase 0: Project Setup & Foundational Planning

1.  ✅ Initialize Version Control: Set up a Git repository (e.g., on GitHub, GitLab).
2.  ✅ Project Structure: Decide on monorepo vs. separate repositories for frontend, backend, and admin panel. Set up the chosen structure.
3.  ✅ Initialize Frontend (Next.js): Create the Next.js application with TypeScript.
4.  ✅ Initialize Admin Panel (Next.js): Create a separate Next.js application (or configure routes within the main frontend) for the admin panel with TypeScript.
5.  ✅ Initialize Backend (NestJS): Create the NestJS application.
6.  ✅ Install Core Dependencies: Add necessary base dependencies to each project (e.g., Tailwind, Shadcn/ui, Zustand for frontend; Prisma, JWT libs for backend).
7.  ✅ Configure Styling: Set up Tailwind CSS and integrate Shadcn/ui into both frontend and admin panel projects.
8.  ✅ Database Setup: Set up your PostgreSQL database instance (locally or cloud-based for dev).
9.  ✅ ORM Setup: Integrate Prisma into the NestJS project, connect it to the database, and define the initial database schema (e.g., User, Product, Category, Order models).
10. Generate Initial Migration: Create and run the first Prisma migration based on the initial schema.
11. Basic Environment Configuration: Set up `.env` files for managing environment variables (database URLs, JWT secrets, etc.).

## Phase 1: Backend Core Features (API Foundation)

1.  Implement User Module: Create NestJS module, service, controller for User CRUD operations.
2.  Implement Authentication Module: Set up JWT strategy in NestJS for user login (issuing tokens) and route protection. Implement registration logic.
3.  Implement Product Module: Create NestJS module, service, controller for Product CRUD (including details like name, description, price, stock, images).
4.  Implement Category Module: Create NestJS module, service, controller for Category CRUD (to organize products). Link Products to Categories.
5.  Define Core API Endpoints: Define and document the REST API endpoints for users, auth, products, and categories.
6.  Implement Basic Validation: Add input validation (DTOs) for API endpoints using NestJS pipes.

## Phase 2: Frontend Core Features (User Interface)

1.  Set Up Routing: Define main application routes in Next.js (e.g., Home, Products, Product Detail, Login, Register, Account).
2.  Build Layout Components: Create reusable layout components (Header, Footer, Navigation) using React, Shadcn/ui, and Tailwind.
3.  Implement State Management Setup: Configure Zustand for global state (e.g., user session, potentially cart later).
4.  Build Product Listing Page: Fetch products from the backend API and display them. Implement filtering/sorting/pagination UI elements.
5.  Build Product Detail Page: Fetch a single product's details from the API and display them.
6.  Build Auth Pages: Create Login and Registration forms.
7.  Integrate Frontend Authentication: Connect Login/Register forms to backend auth endpoints. Store JWT token upon successful login (e.g., in HttpOnly cookie or local storage handled carefully) and manage user state with Zustand.
8.  Implement Route Guards: Protect user-specific routes (e.g., Account page) based on authentication status.

## Phase 3: Backend E-commerce Logic (Shopping & Orders)

1.  Implement Shopping Cart Module: Design and implement cart functionality (add item, remove item, update quantity). Decide on cart persistence (database for logged-in users, potentially session/local storage mapping for guests).
2.  Implement Order Module: Create NestJS module, service, controller for managing orders (create order from cart, store order details, items, user association, status).
3.  Implement Payment Integration (Stripe):
    1.  Set up Stripe account and get API keys.
    2.  Integrate Stripe SDK into the backend.
    3.  Implement endpoint to create Stripe Payment Intents.
    4.  Implement Stripe Webhook handler to confirm payment success/failure and update order status.
4.  Define E-commerce API Endpoints: Define and document REST API endpoints for cart operations, order creation, and payment intent creation.
5.  Secure E-commerce Endpoints: Ensure cart, checkout, and order endpoints require user authentication.

## Phase 4: Frontend E-commerce Logic (User Interaction)

1.  Build Shopping Cart Component/Page: Display cart contents, allow quantity updates and item removal. Fetch/update cart data via API. Manage cart state (potentially syncing with Zustand).
2.  Build Checkout Flow: Create multi-step form or single page for collecting shipping/billing information and displaying order summary.
3.  Integrate Stripe Elements/Checkout: Implement Stripe frontend components for securely collecting payment details.
4.  Handle Payment Submission: Trigger payment intent creation on the backend, confirm payment on the frontend using Stripe.js, handle success/error responses.
5.  Build Order Confirmation Page: Displayed after successful payment, showing order summary and details.
6.  Build Order History Page: Fetch and display the logged-in user's past orders from the backend API.

## Phase 5: Admin Panel Development

1.  Set Up Admin Routing & Layout: Define routes and basic layout within the Admin Next.js project.
2.  Implement Admin Authentication: Secure the admin panel (can use the same JWT system but check for an admin role/permission).
3.  Build Product Management UI: Create interfaces (forms, tables) for CRUD operations on Products using Shadcn/ui. Connect to backend Product API endpoints.
4.  Build Category Management UI: Create interfaces for CRUD operations on Categories. Connect to backend Category API endpoints.
5.  Build Order Management UI: Create interface to view orders, filter/search orders, and update order status (e.g., "Processing", "Shipped", "Delivered"). Connect to backend Order API endpoints.
6.  Build User Management UI: Create interface to view registered users (potentially disable/enable accounts or manage roles if applicable). Connect to backend User API endpoints.

## Phase 6: Testing

1.  Backend Unit Tests (Jest): Write tests for individual NestJS services, controllers, and utility functions. Mock dependencies like Prisma.
2.  Frontend Unit Tests (Jest/React Testing Library): Write tests for individual React components and Zustand store logic.
3.  Backend Integration Tests (Jest/SuperTest): Write tests that hit the actual API endpoints (using a test database) to verify module interactions and request/response cycles.
4.  Frontend Integration Tests (Jest/React Testing Library): Test components that interact with state or involve multiple sub-components. Mock API calls.
5.  End-to-End Tests (Playwright): Write tests to simulate user flows across the entire application (e.g., user registration -> login -> browse products -> add to cart -> checkout).

## Phase 7: Deployment & Infrastructure

1.  Dockerize Applications: Create Dockerfiles for the Frontend, Backend, and Admin Panel applications.
2.  Docker Compose: Set up a `docker-compose.yml` file for easy local environment setup (running frontend, backend, database containers together).
3.  AWS Infrastructure Setup:
    1.  Provision PostgreSQL database (AWS RDS).
    2.  Set up hosting environment (e.g., ECS with Fargate or EC2 instances) for containers.
    3.  Configure Load Balancer and networking (VPC, Security Groups).
    4.  Consider S3 for storing user-uploaded images or static assets.
4.  CI/CD Pipeline (GitHub Actions):
    1.  Configure workflows to trigger on pushes/pull requests to run linting, tests.
    2.  Configure deployment workflows (e.g., on merge to `main` or tag creation) to build Docker images, push them to a registry (e.g., AWS ECR), and deploy to the AWS environment.
5.  Environment Configuration: Manage secrets and environment variables securely for different deployment stages (development, staging, production) using AWS Secrets Manager or Parameter Store.
6.  Set Up Logging & Monitoring: Configure centralized logging and application monitoring (e.g., AWS CloudWatch).

## Phase 8: Final Touches & Launch

1.  Cross-Browser & Responsive Testing: Ensure the site works correctly on major browsers and various screen sizes.
2.  Performance Optimization: Optimize frontend bundle sizes, image loading, API response times, and database queries.
3.  SEO Basics: Implement basic Search Engine Optimization (meta tags, sitemap).
4.  Content Population: Add essential static content (About Us, Contact Info, Terms of Service, Privacy Policy).
5.  Security Review: Double-check authentication, authorization, input validation, and dependency security.
6.  Database Backups: Configure regular database backups.
7.  Final User Acceptance Testing (UAT): Get feedback from stakeholders or test users.
8.  Go-Live: Deploy to production environment. Monitor closely.