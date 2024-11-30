import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LadingPage from './pages/LadingPage'
import CreateTask from './pages/CreateTask'
import EditTask from './components/EditTask'
import { Toaster } from 'react-hot-toast'
import ConfirmationModel from './components/ConfirmationModel'
import AllTask from './pages/AllTask'

function App() {

  return (

    <>
    <Toaster/>
    <BrowserRouter>
    <Routes>
      <Route  path="/" element={<LadingPage/>} />
      <Route path="/signin" element={<LadingPage page="signin"/>} />
      <Route path="/signup" element={<LadingPage page="signup"/>} />
      <Route path="/tasks" element={<AllTask/>} />
      <Route path="/createtask" element={<CreateTask/>} />
      <Route path="/edit/:id" element={<EditTask/>} />
      <Route path="/delete/:id" element={<ConfirmationModel/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
