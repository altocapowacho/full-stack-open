import { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog.jsx'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import Togglable from './components/Togglable.jsx'
import Notification from './components/Notification.jsx'
import blogService from './services/blogs.js'
import loginService from './services/login.js'

const STORAGE_KEY = 'bloglistUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notice, setNotice] = useState({ message: null, type: 'success' })

  const blogFormRef = useRef()

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const stored = JSON.parse(raw)
      setUser(stored)
      blogService.setToken(stored.token)
    }
  }, [])

  useEffect(() => {
    if (user) blogService.getAll().then(setBlogs)
  }, [user])

  const flash = (message, type = 'success') => {
    setNotice({ message, type })
    setTimeout(() => setNotice({ message: null, type: 'success' }), 4000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const data = await loginService.login({ username, password })
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      blogService.setToken(data.token)
      setUser(data)
      setUsername('')
      setPassword('')
    } catch {
      flash('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    blogService.setToken(null)
    setUser(null)
    setBlogs([])
  }

  const createBlog = async (newBlog) => {
    try {
      const created = await blogService.create(newBlog)
      setBlogs(blogs.concat(created))
      blogFormRef.current?.toggleVisibility()
      flash(`a new blog ${created.title} by ${created.author} added`)
    } catch (err) {
      flash(err?.response?.data?.error ?? 'could not create blog', 'error')
    }
  }

  const likeBlog = async (updated) => {
    try {
      const saved = await blogService.update(updated.id, updated)
      setBlogs(blogs.map((b) => (b.id === saved.id ? { ...saved, user: b.user } : b)))
    } catch (err) {
      flash(err?.response?.data?.error ?? 'could not update blog', 'error')
    }
  }

  const removeBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
      flash(`removed ${blog.title}`)
    } catch (err) {
      flash(err?.response?.data?.error ?? 'could not remove blog', 'error')
    }
  }

  if (!user) {
    return (
      <div>
        <Notification message={notice.message} type={notice.type} />
        <LoginForm
          username={username}
          password={password}
          onUsernameChange={(e) => setUsername(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onSubmit={handleLogin}
        />
      </div>
    )
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notice.message} type={notice.type} />
      <p>
        {user.name ?? user.username} logged in{' '}
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      <div>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            onLike={likeBlog}
            onRemove={removeBlog}
            currentUsername={user.username}
          />
        ))}
      </div>
    </div>
  )
}

export default App
