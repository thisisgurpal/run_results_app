import { useState, useEffect, useLayoutEffect } from "react";
import axios from 'axios'
import { Image, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Box, Heading } from '@chakra-ui/react'
import { Link } from "react-router-dom";

function Events() {
  const [eventsData, setEventsData] = useState({})

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
        <Flex minHeight='100vh' direction='column'>
          <Text mt='10' textAlign='center' id='home_title'>MARATHONS</Text>
          <Flex justifyContent='center' h='540px'>
            <Box w='80%' h='100%' display='flex'>
              <Box w='90%' h='100%' mr='2'>
                <Link to={`/events/${eventsData.filter(event => event.distance.distance === '26.2')[0].id}`}>
                <Box id='main_event' color='black' display='flex' justifyContent='center' alignItems='center' w='100%' h='100%' backgroundColor='#FFBF00'>
                  <Flex direction='column' h='100%'>
                    <Image mb='5' src={eventsData.filter(event => event.distance.distance === '26.2')[0].event_image} alt=''></Image>
                    <Text textAlign='center' lineHeight='100%' className="home_image_title">{eventsData.filter(event => event.distance.distance === '26.2')[0].name}</Text>
                    {/* <Text textAlign='center' className="home_image_desc">{eventsData.filter(event => event.distance.distance === '26.2')[0].description}</Text> */}
                  </Flex>
                </Box>
                </Link>
              </Box>
              <Flex ml='2' direction='column' flexWrap='wrap' width='100%' h='100%'>
                {eventsData.filter(event => event.distance.distance === '26.2').filter(event => event.name !== eventsData.filter(event => event.distance.distance === '26.2')[0].name).map(event => {
                  return (
                    <Box h='25%' id='events_small'>
                      <Link key={event.id} to={`/events/${event.id}`}>
                        <hr color='white' w='100%' h='1px' />
                        <Flex name="actions" p='4' mb='5' color='white' h='100%' flexDirection='row' alignItems='center' justifyContent='flex-start'>
                          <Image mr='10' src={event.event_image} h='100%' alt=''></Image>
                          <Text textAlign='center'>
                            {event.name}
                          </Text>
                        </Flex>
                      </Link>
                    </Box>
                  )
                })}
                <hr color='white' w='100%' h='1px' />
              </Flex>
            </Box>
          </Flex>
          <Text mt='10' textAlign='center' id='home_title'>100 MILERS CLUB</Text>
          <Flex justifyContent='center' h='540px'>
            <Box w='80%' h='100%' display='flex'>
              <Box w='90%' h='100%' mr='2'>
              <Link to={`/events/${eventsData.filter(event => event.distance.distance === '100')[0].id}`}>
                <Box id='main_event' color='black' display='flex' justifyContent='center' alignItems='center' w='100%' h='100%' backgroundColor='#FFBF00'>
                  <Flex direction='column' h='100%'>
                    <Image mb='5' src={eventsData.filter(event => event.distance.distance === '100')[0].event_image} alt=''></Image>
                    <Text textAlign='center' lineHeight='100%' className="home_image_title">{eventsData.filter(event => event.distance.distance === '100')[0].name}</Text>
                    {/* <Text textAlign='center' className="home_image_desc">{eventsData.filter(event => event.distance.distance === '100')[0].description}</Text> */}
                  </Flex>
                </Box>
                </Link>
              </Box>
              <Flex ml='2' direction='column' flexWrap='wrap' width='100%' h='100%'>
                {eventsData.filter(event => event.distance.distance === '100').filter(event => event.name !== eventsData.filter(event => event.distance.distance === '100')[0].name).map(event => {
                  return (
                    <Box h='25%' id='events_small'>
                      <Link key={event.id} to={`/events/${event.id}`}>
                        <hr color='white' w='100%' h='1px' />
                        <Flex name="actions" p='4' mb='5' color='white' h='100%' flexDirection='row' alignItems='center' justifyContent='flex-start'>
                          <Image mr='10' src={event.event_image} h='100%' alt=''></Image>
                          <Text textAlign='center'>
                            {event.name}
                          </Text>
                        </Flex>
                      </Link>
                    </Box>
                  )
                })}
                <hr color='white' w='100%' h='1px' />
              </Flex>
            </Box>
          </Flex>
          <Text mt='10' textAlign='center' id='home_title'>200 MILE RACES</Text>
          <Flex justifyContent='center' h='540px'>
            <Box w='80%' h='100%' display='flex'>
              <Box w='90%' h='100%' mr='2'>
                <Box id='main_event' color='black' display='flex' justifyContent='center' alignItems='center' w='100%' h='100%' backgroundColor='#FFBF00'>
                  <Flex direction='column' h='100%'>
                    <Image mb='5' src={eventsData[0].event_image} alt=''></Image>
                    <Text textAlign='center' lineHeight='100%' className="home_image_title">{eventsData[0].name}</Text>
                  </Flex>
                </Box>
              </Box>
              <Flex ml='2' direction='column' flexWrap='wrap' width='100%' h='100%'>
                {eventsData.map(event => {
                  return (
                    <Box h='25%' id='events_small'>
                      <Link key={event.id} to={`/events/${event.id}`}>
                        <hr color='white' w='100%' h='1px' />
                        <Flex name="actions" p='4' mb='5' color='white' h='100%' flexDirection='row' alignItems='center' justifyContent='flex-start'>
                          <Image mr='10' src={event.event_image} h='100%' alt=''></Image>
                          <Text textAlign='center'>
                            {event.name}
                          </Text>
                        </Flex>
                      </Link>
                    </Box>
                  )
                })}
                <hr color='white' w='100%' h='1px' />
              </Flex>
            </Box>
          </Flex>
        </Flex>
        :
        <Flex minHeight='100vh'></Flex>
      }
    </>
  )
}

export default Events



