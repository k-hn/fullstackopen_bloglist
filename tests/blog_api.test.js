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