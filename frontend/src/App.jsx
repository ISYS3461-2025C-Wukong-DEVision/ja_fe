import { useState } from 'react'
import AppRouter from './router/AppRouter.jsx'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <AppRouter />
    </>
  )
}

export default App
