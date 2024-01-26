import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { FirebaseProvider } from './contexts/firebase.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <FirebaseProvider>
        <main className="blue-dark text-foreground bg-gradient-to-r to-blue-400 from-green-400 h-screen">
          <div className="container mx-auto min-w-28">
          <App />
          </div>
        </main>
      </FirebaseProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
