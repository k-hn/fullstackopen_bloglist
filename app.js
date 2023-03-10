const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const blogsRouter = require("./controllers/blogs")
const logger = require("./utils/logger")
const config = require("./utils/config")

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

module.exports = app