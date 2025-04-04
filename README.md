# auth-app-frontend

This repository contains the frontend of an authentication application built with **Next.js** and **TypeScript**.

Application can be found at https://auth-app-nooriam.vercel.app . However, due to the domain problem, websocket sever has not been deployed, so the function of real-time notifications is not running. The rest is working fine.

---

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
