const _ = require("lodash")

const dummy = (_blogs) => {
  return 1
}

const totalLikes = (blogPosts) => {
  return blogPosts
    .map(blogPost => blogPost.likes)
    .reduce((acc, currentValue) => acc + currentValue, 0)
}

const favoriteBlog = (blogList) => {
  let favorite = blogList[0]
  blogList.forEach(blog => {
    if (blog.likes > favorite.likes) {
      favorite = blog
    }
  })

  return favorite
}

const mostBlogs = (blogList) => {
  return _.chain(blogList)
    .groupBy("author")
    .map((blogs, author) => {
      const blogsLength = _.size(blogs)
      return ({ author, blogs: blogsLength })
    })
    .maxBy("blogs")
    .value()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}