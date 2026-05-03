const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  assert.strictEqual(listHelper.dummy([]), 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('when list has only one blog equals likes of that blog', () => {
    assert.strictEqual(listHelper.totalLikes([{ likes: 5 }]), 5)
  })

  test('of bigger list is calculated right', () => {
    const blogs = [{ likes: 7 }, { likes: 5 }, { likes: 12 }, { likes: 0 }]
    assert.strictEqual(listHelper.totalLikes(blogs), 24)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })

  test('returns blog with most likes', () => {
    const blogs = [
      { title: 'a', author: 'x', likes: 1 },
      { title: 'b', author: 'y', likes: 9 },
      { title: 'c', author: 'z', likes: 4 },
    ]
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), {
      title: 'b',
      author: 'y',
      likes: 9,
    })
  })
})

describe('most blogs', () => {
  test('returns author with most blog posts', () => {
    const blogs = [
      { author: 'A' },
      { author: 'B' },
      { author: 'A' },
      { author: 'A' },
      { author: 'C' },
    ]
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
      author: 'A',
      blogs: 3,
    })
  })
})

describe('most likes', () => {
  test('returns author with most cumulative likes', () => {
    const blogs = [
      { author: 'A', likes: 3 },
      { author: 'B', likes: 12 },
      { author: 'A', likes: 5 },
    ]
    assert.deepStrictEqual(listHelper.mostLikes(blogs), {
      author: 'B',
      likes: 12,
    })
  })
})
