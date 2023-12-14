import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'
import './resets.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DripStoreLogin } from './components/Pages/Login/DripStoreLogin'
import resets from './components/General/Buttons/_resets.module.css'
import classes from './App.module.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <DripStoreLogin />,
      },
      {
        path: '/cadastro',
        element:<div><h1>Cadastro</h1></div>,
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className={`${resets.storybrainResets} ${classes.root}`}>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
