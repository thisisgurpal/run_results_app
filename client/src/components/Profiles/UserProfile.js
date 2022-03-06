import React, { useEffect } from 'react'
import axios from 'axios'

function UserProfile() {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/events/') // * <-- replace with your endpoint
      console.log(data)
    }
    getData()
  }, [])

  return <h1>User Profile</h1>
}

export default UserProfile