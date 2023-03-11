const listHelper = require("../utils/list_helper")

test("dummy returns one", () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }
  ]

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog)

    expect(result).toBe(listWithOneBlog[0].likes)
  })
})

describe("favorite blog", () => {
  const blogList = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 3
    },
    {
      title: "Avatar",
      author: "James Cameron",
      likes: 2
    },
    {
      title: "Avatar 2",
      author: "James Cameron",
      likes: 2
    },
    {
      title: "Avatar 3",
      author: "James Cameron",
      likes: 2
    },
    {
      title: "Modern C Programming",
      author: "K.N. King",
      likes: 0
    },
    {
      title: "Modern Computer Architecture and Organization",
      author: "Jim Leden",
      likes: 12
    },
    {
      title: "A First Course in Graph Theory",
      author: "Gary Chartrand & Ping Zhang",
      likes: 6
    },
    {
      title: "Animated Problem Solving",
      author: "Marco T. Morazan",
      likes: 12
    }
  ]
  test("gets the most favorite blog out of the lot", () => {
    const result = listHelper.favoriteBlog(blogList)

    expect(result).toEqual({
      title: "Modern Computer Architecture and Organization",
      author: "Jim Leden",
      likes: 12
    })
  })

  describe("most blogs", () => {
    const blogList = [
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 3
      },
      {
        title: "Animated Problem Solving",
        author: "Marco T. Morazan",
        likes: 12
      },
      {
        title: "Avatar",
        author: "James Cameron",
        likes: 2
      },

      {
        title: "Avatar 3",
        author: "James Cameron",
        likes: 2
      },
      {
        title: "Modern C Programming",
        author: "K.N. King",
        likes: 0
      },
      {
        title: "Avatar 2",
        author: "James Cameron",
        likes: 2
      },
      {
        title: "Modern Computer Architecture and Organization",
        author: "Jim Leden",
        likes: 12
      },
      {
        title: "A First Course in Graph Theory",
        author: "Gary Chartrand & Ping Zhang",
        likes: 6
      }
    ]

    test("author with most blogs", () => {
      const result = listHelper.mostBlogs(blogList)

      expect(result).toEqual({
        author: "James Cameron",
        blogs: 3
      })
    })
  })

  describe("most likes", () => {
    const blogList = [
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 3
      },
      {
        title: "Animated Problem Solving",
        author: "Marco T. Morazan",
        likes: 50
      },
      {
        title: "Avatar",
        author: "James Cameron",
        likes: 2
      },

      {
        title: "Avatar 3",
        author: "James Cameron",
        likes: 2
      },
      {
        title: "Modern C Programming",
        author: "K.N. King",
        likes: 0
      },
      {
        title: "Avatar 2",
        author: "James Cameron",
        likes: 2
      },
      {
        title: "Modern Computer Architecture and Organization",
        author: "Jim Leden",
        likes: 12
      },
      {
        title: "A First Course in Graph Theory",
        author: "Gary Chartrand & Ping Zhang",
        likes: 6
      }
    ]

    test("author with the most likes", () => {
      const result = listHelper.mostLikes(blogList)

      expect(result).toEqual({
        author: "Marco T. Morazan",
        likes: 50
      })
    })
  })
})