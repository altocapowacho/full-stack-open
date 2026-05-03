const dummy = (_blogs) => 1

const totalLikes = (blogs) =>
  blogs.reduce((sum, blog) => sum + (blog.likes ?? 0), 0)

const favoriteBlog = (blogs) => {
  if (!blogs.length) return null
  const best = blogs.reduce((acc, b) => ((b.likes ?? 0) > (acc.likes ?? 0) ? b : acc))
  return { title: best.title, author: best.author, likes: best.likes ?? 0 }
}

const mostBlogs = (blogs) => {
  if (!blogs.length) return null
  const counts = blogs.reduce((acc, b) => {
    acc[b.author] = (acc[b.author] ?? 0) + 1
    return acc
  }, {})
  const author = Object.keys(counts).reduce((a, b) =>
    counts[a] >= counts[b] ? a : b,
  )
  return { author, blogs: counts[author] }
}

const mostLikes = (blogs) => {
  if (!blogs.length) return null
  const totals = blogs.reduce((acc, b) => {
    acc[b.author] = (acc[b.author] ?? 0) + (b.likes ?? 0)
    return acc
  }, {})
  const author = Object.keys(totals).reduce((a, b) =>
    totals[a] >= totals[b] ? a : b,
  )
  return { author, likes: totals[author] }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
