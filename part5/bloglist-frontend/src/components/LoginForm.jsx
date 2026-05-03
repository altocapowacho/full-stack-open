const LoginForm = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}) => (
  <form onSubmit={onSubmit}>
    <h2>log in to application</h2>
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={onUsernameChange}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={onPasswordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm
