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