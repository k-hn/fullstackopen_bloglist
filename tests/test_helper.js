const Blog = require("../models/blog")

const initialBlogList = [
  {
    "title": "Large language models are having their Stable Diffusion moment",
    "author": "Simon Willison",
    "url": "https://simonwillison.net/2023/Mar/11/llama/",
    "likes": 614
  },
  {
    "title": "The Threat on Your Desk: Building an Evil USB-C Dock",
    "author": "Lachlan Davidson",
    "url": "https://research.aurainfosec.io/pentest/threat-on-your-desk-evil-usbc-dock/",
    "likes": 125
  },
  {
    "title": "Repairing a tiny ribbon cable inside a 28 year old IBM ThinkPad 701c",
    "author": "John Graham-Cumming",
    "url": "https://blog.jgc.org/2023/03/repairing-tiny-ribbon-cable-inside-28.html",
    "likes": 82
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogList,
  blogsInDb
}