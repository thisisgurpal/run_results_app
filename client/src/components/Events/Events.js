import { useState, useEffect, useLayoutEffect } from "react";
import axios from 'axios'
import { Image, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Box, Heading } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { createBreakpoints } from '@chakra-ui/theme-tools'

createBreakpoints({
  we: '20em',
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
})

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
          <Text mt='10' textAlign='center' fontSize={{ base: '25px', sm: '40px', md: '60px', lg: '90px'}} id='home_title'>MARATHONS</Text>
          <Flex justifyContent='center' h={{ base: '500px', we: '600px', md: '1200px', xl: '500px' }}>
            <Flex w={{ base: '80%', xl: '80%' }} h='100%' direction={{ base: 'column', xl: 'row'}}>
              <Box w='100%' h={{ base: 'auto', xl: '100%' }} mr='2'>
                <Link to={`/events/${eventsData.filter(event => event.distance.distance === '26.2')[0].id}`}>
                  <Box id='main_event' color='black' display='flex' justifyContent='center' h={{ base: 'auto', xl: '100%' }} alignItems='center' w='100%' bgGradient='linear(to-br, #FFBF00, #ffde7a)'>
                    <Flex direction='column' w='100%' h='100%'>
                      <Image h='70%' src={eventsData.filter(event => event.distance.distance === '26.2')[0].event_image} alt=''></Image>
                      <Flex h='100%' mt='15' mb='15' alignItems='center' justifyContent='center'>
                      <Text textAlign='center' lineHeight='100%' fontSize={{ base: '30px', sm: '35px', md: '40px', xl: '50px' }} className="home_image_title">{eventsData.filter(event => event.distance.distance === '26.2')[0].name}</Text>
                      </Flex>
                      {/* <Text textAlign='center' className="home_image_desc">{eventsData.filter(event => event.distance.distance === '26.2')[0].description}</Text> */}
                    </Flex>
                  </Box>
                </Link>
              </Box>
              <Flex ml={{ base: '0', xl: '2' }} mt={{ base: '5', xl: '0' }} direction='column' flexWrap='wrap' width='100%'>
                {eventsData.filter(event => event.distance.distance === '26.2').filter(event => event.name !== eventsData.filter(event => event.distance.distance === '26.2')[0].name).map(event => {
                  return (
                    <Box h={{ base: '60px', md: '120px',  xl: '25%' }} id='events_small'>
                      <Link key={event.id} to={`/events/${event.id}`}>
                        <hr color='white' w='100%' h='1px' />
                        <Flex name="actions" p='4' color='white' h='100%' flexDirection='row' alignItems='center' justifyContent='flex-start'>
                          <Image display={{ base: 'none', md: 'block' }}mr='10' src={event.event_image} h='100px' alt=''></Image>
                          <Text fontSize={{ base: '18px', sm: '22px', md: '28px', xl: '30px' }} textAlign='center'>
                            {event.name}
                          </Text>
                        </Flex>
                      </Link>
                    </Box>
                  )
                })}
                <hr color='white' w='100%' h='1px' />
              </Flex>
            </Flex>
          </Flex>
          <Text mt='10' textAlign='center' fontSize={{ base: '25px', sm: '40px', md: '60px', lg: '90px'}} id='home_title'>100 MILERS CLUB</Text>
          <Flex justifyContent='center' h={{ base: '500px', we: '600px', md: '1200px', xl: '500px' }}>
            <Flex w={{ base: '80%', xl: '80%' }} h='100%' direction={{ base: 'column', xl: 'row'}}>
              <Box w='100%' h={{ base: 'auto', xl: '100%' }} mr='2'>
                <Link to={`/events/${eventsData.filter(event => event.distance.distance === '100')[0].id}`}>
                  <Box id='main_event' color='black' display='flex' justifyContent='center' h={{ base: 'auto', xl: '100%' }} alignItems='center' w='100%' bgGradient='linear(to-br, #FFBF00, #ffde7a)'>
                    <Flex direction='column' w='100%' h='100%'>
                      <Image h='70%' src={eventsData.filter(event => event.distance.distance === '100')[0].event_image} alt=''></Image>
                      <Flex h='100%' mt='15' mb='15' alignItems='center' justifyContent='center'>
                      <Text textAlign='center' lineHeight='100%' fontSize={{ base: '30px', sm: '35px', md: '40px', xl: '50px' }} className="home_image_title">{eventsData.filter(event => event.distance.distance === '100')[0].name}</Text>
                      </Flex>
                      {/* <Text textAlign='center' className="home_image_desc">{eventsData.filter(event => event.distance.distance === '26.2')[0].description}</Text> */}
                    </Flex>
                  </Box>
                </Link>
              </Box>
              <Flex ml={{ base: '0', xl: '2' }} mt={{ base: '5', xl: '0' }} direction='column' flexWrap='wrap' width='100%'>
                {eventsData.filter(event => event.distance.distance === '100').filter(event => event.name !== eventsData.filter(event => event.distance.distance === '100')[0].name).map(event => {
                  return (
                    <Box h={{ base: '60px', md: '120px',  xl: '25%' }} id='events_small'>
                      <Link key={event.id} to={`/events/${event.id}`}>
                        <hr color='white' w='100%' h='1px' />
                        <Flex name="actions" p='4' color='white' h='100%' flexDirection='row' alignItems='center' justifyContent='flex-start'>
                          <Image display={{ base: 'none', md: 'block' }}mr='10' src={event.event_image} h='100px' alt=''></Image>
                          <Text fontSize={{ base: '18px', sm: '22px', md: '28px', xl: '30px' }} textAlign='center'>
                            {event.name}
                          </Text>
                        </Flex>
                      </Link>
                    </Box>
                  )
                })}
                <hr color='white' w='100%' h='1px' />
              </Flex>
            </Flex>
          </Flex>
          <Text mt='10' textAlign='center' fontSize={{ base: '25px', sm: '40px', md: '60px', lg: '90px'}} id='home_title'>200 MILE RACES</Text>
          <Flex justifyContent='center' h={{ base: '500px', we: '600px', md: '1200px', xl: '500px' }}>
            <Flex w={{ base: '80%', xl: '80%' }} h='100%' direction={{ base: 'column', xl: 'row'}}>
              <Box w='100%' h={{ base: 'auto', xl: '100%' }} mr='2'>
                <Link to={`/events/${eventsData.filter(event => event.distance.distance === '26.2')[0].id}`}>
                  <Box id='main_event' color='black' display='flex' justifyContent='center' h={{ base: 'auto', xl: '100%' }} alignItems='center' w='100%' bgGradient='linear(to-br, #FFBF00, #ffde7a)'>
                    <Flex direction='column' w='100%' h='100%'>
                      <Image h='70%' src={eventsData.filter(event => event.distance.distance === '26.2')[0].event_image} alt=''></Image>
                      <Flex h='100%' mt='15' mb='15' alignItems='center' justifyContent='center'>
                      <Text textAlign='center' lineHeight='100%' fontSize={{ base: '30px', sm: '35px', md: '40px', xl: '50px' }} className="home_image_title">{eventsData.filter(event => event.distance.distance === '26.2')[0].name}</Text>
                      </Flex>
                      {/* <Text textAlign='center' className="home_image_desc">{eventsData.filter(event => event.distance.distance === '26.2')[0].description}</Text> */}
                    </Flex>
                  </Box>
                </Link>
              </Box>
              <Flex ml={{ base: '0', xl: '2' }} mt={{ base: '5', xl: '0' }} direction='column' flexWrap='wrap' width='100%'>
                {eventsData.filter(event => event.distance.distance === '26.2').filter(event => event.name !== eventsData.filter(event => event.distance.distance === '26.2')[0].name).map(event => {
                  return (
                    <Box h={{ base: '60px', md: '120px',  xl: '25%' }} id='events_small'>
                      <Link key={event.id} to={`/events/${event.id}`}>
                        <hr color='white' w='100%' h='1px' />
                        <Flex name="actions" p='4' color='white' h='100%' flexDirection='row' alignItems='center' justifyContent='flex-start'>
                          <Image display={{ base: 'none', md: 'block' }}mr='10' src={event.event_image} h='100px' alt=''></Image>
                          <Text fontSize={{ base: '18px', sm: '22px', md: '28px', xl: '30px' }} textAlign='center'>
                            {event.name}
                          </Text>
                        </Flex>
                      </Link>
                    </Box>
                  )
                })}
                <hr color='white' w='100%' h='1px' />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        :
        <Flex minHeight='100vh'></Flex>
      }
    </>
  )
}

export default Events



