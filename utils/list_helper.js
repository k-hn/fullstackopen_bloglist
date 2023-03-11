const dummy = (_blogs) => {
  return 1
}

const totalLikes = (blogPosts) => {
  return blogPosts
    .map(blogPost => blogPost.likes)
    .reduce((acc, currentValue) => acc + currentValue, 0)
}

module.exports = {
  dummy,
  totalLikes
}