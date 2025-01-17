import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import MainCOntent from "./components/MainCOntent"
import ProductPage from "./components/ProductPage"

const App = () => {
  return (
   <Router>
    <div className="flex h-screen">
      <Sidebar />
      <div className="rounded w-full flex justify-between flex-wrap">
        <Routes>
<Route path="/" element={<MainCOntent />} />
<Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </div>
   </Router>
  )
}

export default App