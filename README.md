<img src="./public/ReactFireStarterLogo.svg" alt="React Firebase Starter Logo" width="200" height="200">

# React Fire Starter

**React Fire Starter** is a powerful boilerplate project designed to help you quickly start a modern web application with **React**, **Firebase**, **Vite**, **TypeScript**, **Recoil**, and **React Router DOM**. This template includes a pre-built login system, public pages, and private pages infrastructure, making it an ideal starting point for your next project.

## Features

- **Authentication with Firebase**: Secure and reliable user authentication.
- **Public and Private Routes**: Easily manage accessible routes based on user authentication state.
- **State Management with Recoil**: Simple and efficient state management.
- **Modern Build Setup with Vite and TypeScript**: Fast and optimized development experience.

## Installation

1. **Fork the Repository**:

   - Click the "Use this template" button on GitHub to create your own copy.

2. **Clone Your Forked Repository**:

   ```bash
   git clone https://github.com/yourusername/react-fire-starter.git
   cd react-fire-starter
   ```

3. Install dependencies:

```bash
npm install
```

4. Set up a Firebase project:

   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project.
   - Go to the project settings.
   - Add a web app to the project.
   - Copy the Firebase config object.

5. Configure environment variables:

   - Create a `.env` file in the root directory of the project.
   - Add the Firebase config object to the `.env` file:
     ```env
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     ```

6. Run the development server:

```bash
npm run dev
```

## Customization

### Change Logo

- Replace the `public/ReactFireStarterLogo.svg` file with your own SVG logo.

### Update Login Page

- Update the `src/pages/Login.tsx` file to customize the login page.

### Update Landing Page

- Update the `src/pages/Landing.tsx` file to customize the landing page.

### Add a Private Page (Authenticated)

- Create a new file in the `src/pages` directory.
- Add a new route in the `src/App.tsx` file.
- Add the new route to the `privateRoutes` config.

### Add a Public Page (Unauthenticated)

- Create a new file in the `src/pages` directory.
- Add a new route in the `src/App.tsx` file.
- Add the new route to the `publicRoutes` config.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

## License

This project is open source and available under the [MIT License](LICENSE).

## Keywords

react, firebase, vite, typescript, recoil, boilerplate, authentication, template, web app, starter kit, react-router, react-router-dom, firebase-auth, firebase-authentication, vitejs, frontend, web development, spa, single page application, react-hooks, typescript-react, vite-template, react-template, firebase-template, react-firebase, vite-react, recoil-state, state management, login, signup, user registration, private routes, public routes, protected routes, user authentication, project setup, dev tools, modern web development, react boilerplate, vite boilerplate, firebase boilerplate, starter template, developer tools, codebase, best practices, scalable architecture, project template, react project, web starter, client-side, react ecosystem, frontend tooling, react-vite, react starter, authentication system, fullstack, reactjs, frontend template, project boilerplate, react auth, firebase login, react recoil, react spa, typescript starter, typescript boilerplate, vitejs starter, vitejs boilerplate, firebase project, authentication template, modern js, jsx, tsx, jsx react, typescript react template
