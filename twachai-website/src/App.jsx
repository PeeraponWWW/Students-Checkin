import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Qusetion_Answer from './components/teacher/Qusetion_Answer'
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/test" element={<Qusetion_Answer/>} />
    </Routes>
  )
}

export default App
