const express = require("express")
require("express-async-errors")
const cors = require("cors")
const mongoose = require("mongoose")
const blogsRouter = require("./controllers/blogs")
const logger = require("./utils/logger")
const config = require("./utils/config")
const middleware = require("./utils/middleware")

const app = express()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch(error => {
    logger.error("error connecting to MongoDB: ", error.message)
  })

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app