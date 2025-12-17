import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Card } from './components/card'
import { CardAdd } from './pages/CardAdd'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Cards } from './pages/Cards'

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  
  return (
    <Routes>
      
      <Route path="/" element={<Cards/>}/>
      <Route path="/cardAdd" element={<CardAdd/>}/>
    </Routes>

  )
}

export default App
