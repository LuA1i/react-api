import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

interface Post {
  id: number
  title: string
}
function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    setIsLoading(true)
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts`)
        const posts = (await response.json()) as Post[]
        setPosts(posts)
      } catch (e: any) {
        setError(e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (isLoading) {
    return <h1>Posts is Loading</h1>
  }

  if (error) {
    return <h1>Something went wrong please try again</h1>
  }
  return (
    <div className="App">
      <h1>DAta Fetching In React</h1>
      <ul>
        {posts.map((post) => {
          return <li key={post.id}>{post.title}</li>
        })}
      </ul>
    </div>
  )
}

export default App
