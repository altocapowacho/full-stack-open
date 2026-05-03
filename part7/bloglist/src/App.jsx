import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import NavbarTop from './components/NavbarTop.jsx'
import NotificationBanner from './components/NotificationBanner.jsx'
import LoginView from './components/LoginView.jsx'
import BlogList from './components/BlogList.jsx'
import BlogDetails from './components/BlogDetails.jsx'
import UserList from './components/UserList.jsx'
import UserDetails from './components/UserDetails.jsx'
import { useAuth } from './context/AuthContext.jsx'

const App = () => {
  const { user } = useAuth()

  if (!user) {
    return (
      <>
        <NotificationBanner />
        <LoginView />
      </>
    )
  }

  return (
    <>
      <NavbarTop />
      <NotificationBanner />
      <Container>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
