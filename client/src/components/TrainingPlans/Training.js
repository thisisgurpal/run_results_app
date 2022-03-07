import React, { useEffect } from 'react'
import axios from 'axios'
import { Flex } from '@chakra-ui/react'

function Training() {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/events/') // * <-- replace with your endpoint
      console.log(data)
    }
    getData()
  }, [])

  return (
    <Flex minHeight='100vh'>
  <h1>Training</h1>
  </Flex>
  )
}

export default Training