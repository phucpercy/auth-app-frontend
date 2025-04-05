# Auth App Frontend

This repository contains the frontend of an authentication application built with **Next.js** and **TypeScript**.

Application can be found at https://auth-app-nooriam.vercel.app . However, due to the domain problem, websocket sever has not been deployed, so the function of real-time notifications is not running. The rest is working fine.

--

## Table of Contents

1. [Auth App Frontend](#auth-app-frontend)
2. [Getting Started](#-getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Environment Variables](#environment-variables)
   - [Running the Application](#running-the-application)
3. [Project Structure](#project-structure)
4. [Design Decisions and Trade-offs](#design-decisions-and-trade-offs)
   - [1. Framework: Next.js (App Router)](#1-framework-nextjs-app-router)
   - [2. Language: TypeScript](#2-language-typescript)
   - [3. Styling: Tailwind CSS](#3-styling-tailwind-css)
   - [4. Component-Driven Architecture](#4-component-driven-architecture)
   - [5. State Management: React Local State Only](#5-state-management-react-local-state-only)

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm or [Yarn](https://yarnpkg.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/phucpercy/auth-app-frontend.git

# Move into the directory
cd auth-app-frontend

# Install dependencies
npm install
# or
yarn install
```

### Environment Variables
Create a `.env.local` file in the root directory and add the following environment variables:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:8080/ws
```

### Running the Application
To start the development server, run:

```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
The project is structured as follows:

```
auth-app-frontend/
├── public/ # Static assets
├── src/
│   ├── app/ # Nextj.s app directory
        ├── globals.css/ # global styles
│   ├── components/ # Reusable components
│   ├── hooks/ # Custom hooks
│   ├── lib/ # Utility functions and libraries
        ├── api/ # API functions
│   ├── types/ # TypeScript types and interfaces
├── .gitignore
├── package.json
├── README.md
├── tsconfig.json
└── ...
```
## Design Decisions and Trade-offs

In developing the Auth App Frontend, several critical design decisions were made to balance functionality, maintainability, and performance. This part outlines these decisions and the inherent trade-offs involved.

---

### 1. **Framework: Next.js (App Router)**

**Decision**: Use of Next.js with the new `src/` directory structure.

**Trade-offs**:

- **Pros**:
 - Built-in file-based routing with nested layouts.
 - Native SSR/SSG support improves performance.
 - Optimized for deployment on platforms like Vercel.

- **Cons**:
 - Learning curve around client/server component separation.
 - Limited third-party documentation and ecosystem compared to `pages/` directory.

*Rationale**: The `src/` directory provides modern routing, layout management, and native support for server/client components. 

### 2. **Language: TypeScript**

**Decision**: TypeScript is used across the entire project.

**Trade-offs**
- **Pros**:
 - Reduces bugs by catching errors at compile time.
 - Enhances IDE support (auto-completion, refactoring).
 - Improves code maintainability in teams.

- **Cons**:
 - Adds complexity for newcomers unfamiliar with static typing.
 - Extra boilerplate and type definition setup required.

**Rationale**: TypeScript ensures type safety, reduces runtime errors, and improves the development experience through better tooling 


### 3. **Styling: Tailwind CSS**

**Decision**: Use of Tailwind CSS for styling.

**Trade-offs**
- **Pros**:
 - Fast UI prototyping.
 - No need for complex CSS architecture.
 - Smaller bundle size with purging.

- **Cons**:
 - JSX becomes cluttered with many classes.
 - Requires learning a custom class syntax.
- Harder to enforce design consistency without a design system.

**Rationale**: Utility-first CSS frameworks allow rapid UI development and reduce custom CSS maintenance overhead.

### 4. **Component-Driven Architecture**

**Decision**: Modular, reusable components (e.g., `SignInForm`, `SignUpForm`).

**Trade-offs**:
- **Pros**:
 - Easier to maintain, test, and extend.
 - Cleaner codebase as UI grows.
 - Encourages encapsulation and single responsibility.

- **Cons**:
  - Risk of prop drilling in deeply nested components.
  - Shared state handling becomes difficult without a state manager or context.

**Rationale**: Improves separation of concerns and promotes reuse across views and pages.

## 5. **State Management: React Local State Only**

**Decision**: No external state library; uses `useState`/`useEffect`.

**Trade-offs**:
- **Pros**:
 - Simple and dependency-free.
 - Ideal for small, focused components.

- **Cons**:
 - Not scalable for complex apps.
 - Cross-component state sharing may require `Context` or third-party tools (e.g., Redux, Zustand).

**Rationale**: Lightweight choice suitable for simple forms and authentication flows. 
