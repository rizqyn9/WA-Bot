const posts = [
    {
      title: "Post one",
      body: "This is post one"
    },
    {
      title: "Post two",
      body: "This is post two"
    }
  ]
  
  const createPost = post => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        posts.push(post)
        const error = true
        if(!error) {
          resolve()
        }else{
          reject(console.log("reject"))
        }
      }, 2000)
    })
  }
  
  const getPosts = () => {
    setTimeout(() => {
      posts.forEach(post => {
        console.log(post)
      })
    }, 3000)
  }
  
  const newPost = {
    title: "Post three",
    body: "This is post three"
  }
  
  createPost(newPost)
    .then(getPosts)
    .catch(error => console.log(error))
    