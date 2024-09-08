# Cicilia Dor Levy

Welcome to **Cicilia Dor Levy**, which consists of two systems: a **React** app built with **Vite** for the frontend, and a **Node.js** backend. This guide will walk you through the installation, setup, and usage of both systems.

### Project Structure

- **`front/`**: The frontend built with React and Vite.
- **`back/`**: The backend built with Node.js.
- **`src/functions/`**: Contains Firebase functions for backend logic.

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- npm or Yarn for dependency management
- [Firebase CLI](https://firebase.google.com/docs/cli) for deploying functions to Firebase

### Installation

Follow these steps to install the project dependencies.

#### 1. Install Frontend Dependencies

Navigate to the `front` directory and install the required npm packages:

```bash
cd front
npm install

cd back
npm install

cd src/functions
npm install
```

### Deploying Firebase Functions

Once the backend functions are installed, you can deploy them to Firebase using the Firebase CLI. Make sure you are in the `src/functions` directory and run the following command:

```bash
firebase deploy --only functions
```

#### Start the Frontend

To start the React frontend development server, run the following command from the `front` directory:

```bash
cd front
npm run dev
```

#### Start the Backend

To start the Node Backend development server, run the following command from the `front` directory:

```bash
cd back
node src/app.js
```

