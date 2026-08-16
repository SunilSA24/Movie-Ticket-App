import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectedRoute from './component/ProtectedRoute';
import PublicRoute from './component/PublicRoute';
import Admin from './admin';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
