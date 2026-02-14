import { UserContextProvider } from './context/UserContext'
import { ChatContextProvider } from './context/ChatContext'
import { Routes, Route, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import Sidebar from './components/Sidebar'
import Status from './components/Status'

function AppLayout() {
  return (
    <div className='flex w-full'>
      <Sidebar />
      <Outlet />
    </div>
  )
}

function App() {

  return (
    <UserContextProvider>
      <ChatContextProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/status' element={<Status />}/>
          </Route>
        </Routes>
      </ChatContextProvider>
    </UserContextProvider>
  )
}

export default App
