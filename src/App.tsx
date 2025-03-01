import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Users from './home/users/Users'
import Products from './home/products/Products'

function App() {


  return (
    <>
  <Router>
      <Routes>
        <Route path="/home/users" element={<Users />} />
        <Route path="/home/products" element={<Products />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
