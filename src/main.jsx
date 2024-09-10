import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './pages/auth/sign-in/index.jsx'
import HomePage from './pages/home/index.jsx'
import EditResume from './pages/dashboard/resume/[resumeId]/edit/index.jsx'
import DashBoardPage from './pages/dashboard/index.jsx'
import ViewResume from './pages/my-resume/[resumeId]/view/index.jsx'
import { ClerkProvider } from '@clerk/clerk-react'

const router = createBrowserRouter([
  {
    // path: '/',
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: <DashBoardPage />
      },
      {
        path: '/dashboard/resume/:resumeId/edit',
        element: <EditResume />
      }
    ]
  },
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/auth/sign-in',
    element: <SignInPage />
  },
  {
    path: '/my-resume/:resumeId/view',
    element: <ViewResume />
  }
])

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>,
)
