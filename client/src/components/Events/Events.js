import { useState, useEffect, useLayoutEffect } from "react";
import axios from 'axios'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Box, Heading } from '@chakra-ui/react'
import { Link } from "react-router-dom";

function Events() {
  const [ eventsData, setEventsData ] = useState({})

useEffect(() => {
    const getEvents = async () => {
      const { data } = await axios.get('/api/events/') // * <-- replace with your endpoint
      console.log(data)
      setEventsData(data)
    }
    getEvents()
  }, [])

  

  return (
    <>
    {Object.keys(eventsData).length ?
    <Flex minHeight='100vh' direction='row' flexWrap='wrap'>
    {eventsData.map(event => {
      return (
        <Link boxshadow='xl' key={event.id} to={`/events/${event.id}`}>
          <Flex name="actions" p='4' mb='5' color='white' bgGradient='linear(to-t, red.200, pink.500)' width='300px' height='320px' flexDirection='column' borderWidth='1px' alignItems='center' justifyContent='flex-start' boxshadow='2xl' borderRadius='10'>
            <Box name="headline" pl='4' pr='4' mb='4' width=''>
              <Heading textAlign='center' name='eventName' color='primary' mt='0' size='lg'>
                {event.name}
              </Heading>
            </Box>
          </Flex>
        </Link>  
      )
    })}
    </Flex>
    :
    <Flex minHeight='100vh'></Flex>
  }
   </> 
  )
}

export default Events



