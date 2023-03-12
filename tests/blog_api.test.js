const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const helper = require("./test_helper")
const mongoose = require("mongoose")

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log("test DB cleared")

  const blogObjects = helper.initialBlogList
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
}, 10000)

afterAll(async () => {
  await mongoose.connection.close()
})

describe("retrieval of all blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  }, 10000)


  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(helper.initialBlogList.length)
  })

  test("blogs contain an id field", async () => {
    const dbBlogs = await helper.blogsInDb()

    expect(dbBlogs[0].id).toBeDefined()
  })
})


describe("blog creation", () => {
  test("new blogs are created correctly", async () => {
    const dbBlogsBefore = await helper.blogsInDb()

    const newBlog = {
      title: "Reflections of a King",
      author: "M'uad Dib",
      url: "http://dune.io",
      likes: "24"
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const dbBlogsAfter = await helper.blogsInDb()

    expect(dbBlogsAfter).toHaveLength(dbBlogsBefore.length + 1)

  })


  test("blog likes field defaults to 0 if missing", async () => {
    const newBlog = {
      title: "Reflections of a King",
      author: "M'uad Dib",
      url: "http://dune.io",
    }

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    expect(response.body.likes).toEqual(0)
  })


  test("blogs missing title fail during creation", async () => {
    const newBlog = {
      author: "M'uad Dib",
      url: "http://dune.io",
      likes: 3
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/)
  })

  test("blogs missing url fail during creation", async () => {
    const newBlog = {
      title: "Reflections of a King",
      author: "M'uad Dib",
      likes: 3
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/)
  })

  test("blogs missing title and url fail during creation", async () => {
    const newBlog = {
      author: "M'uad Dib",
      likes: 3
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/)
  })
})


describe("blog deletion", () => {
  test("deleting existing blog succeeds", async () => {
    const blogListBeforeDeletion = await helper.blogsInDb()
    const blogToDelete = blogListBeforeDeletion[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogListAfterDeletion = await helper.blogsInDb()
    expect(blogListAfterDeletion).toHaveLength(
      blogListBeforeDeletion.length - 1
    )
  })

  test("deleting non-existent blog fails with status 404", async () => {
    const nonExistentId = await helper.nonExistingId()

    await api
      .delete(`/api/notes/${nonExistentId}`)
      .expect(404)
  })
})



