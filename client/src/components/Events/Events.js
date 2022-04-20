import { useState, useEffect, useLayoutEffect } from "react";
import axios from 'axios'
import { Image, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Box, Heading, Spinner } from '@chakra-ui/react'
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
      const { data } = await axios.get('/api/events/')
      console.log(data)
      setEventsData(data)
    }
    getEvents()
  }, [])



  return (
    <>
      {Object.keys(eventsData).length ?
        <Flex minHeight='100vh' alignItems='center' direction='column'>
          <Flex h={{ base: '80px', sm: '110px', md: '125px', lg: '150px' }} justifyContent='center' alignItems='center'>
            <Text textAlign='center' fontSize={{ base: '25px', sm: '40px', md: '60px', lg: '90px' }} id='individual_page_headings'>MARATHONS</Text>
          </Flex>
          <Flex justifyContent='center' w='90%' h={{ base: '500px', we: '600px', md: '1200px', xl: '500px' }}>
            <Flex maxW='1000px' h='100%' direction={{ base: 'column' }}>
              <Box w='100%' h={{ base: 'auto', xl: '100%' }} mr='2'>
                <Link to={`/events/${eventsData.filter(event => event.distance.distance === '26.2')[0].id}`}>
                  <Box id='main_event' color='black' display='flex' justifyContent='center' h={{ base: 'auto', xl: '100%' }} alignItems='center' w='100%' bgGradient='linear(to-br, #FFBF00, #ffde7a)'>
                    <Flex direction='column' w='100%' h='100%'>
                      <Image w='100%' src={eventsData.filter(event => event.distance.distance === '26.2')[0].event_image} alt=''></Image>
                      <Flex h='100%' mt='15' mb='15' alignItems='center' justifyContent='center'>
                        <Text textAlign='center' lineHeight='100%' fontSize={{ base: '30px', sm: '35px', md: '40px', xl: '50px' }} className="home_image_title">{eventsData.filter(event => event.distance.distance === '26.2')[0].name}</Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Link>
              </Box>
              <Flex mt={{ base: '5', xl: '0' }} direction='column' flexWrap='wrap' width='100%'>
                {eventsData.filter(event => event.distance.distance === '26.2').filter(event => event.name !== eventsData.filter(event => event.distance.distance === '26.2')[0].name).map(event => {
                  return (
                    <Box key={event.id} h={{ base: '60px', md: '120px', xl: '25%' }} width='100%'>
                      <Link to={`/events/${event.id}`}>
                        <hr color='white' w='100%' h='1px' />
                        <Flex name="actions" p='4' color='white' h='100%' flexDirection='row' alignItems='center' justifyContent='flex-start'>
                          <Box w='300px' display={{ base: 'none', md: 'block' }}>
                            <Image display={{ base: 'none', md: 'block' }} mr='10' src={event.event_image} w={{ base: '150px', xl: '200px' }} alt=''></Image>
                          </Box>
                          <Flex mt='3' mb='3' w='100%' justifyContent='center'>
                            <Text fontSize={{ base: '18px', sm: '22px', md: '28px', xl: '30px' }} id='user_page_links' textAlign='center'>
                              {event.name}
                            </Text>
                          </Flex>
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
        <Flex justifyContent='center' alignItems='center'><Spinner color='white' /></Flex>
      }
    </>
  )
}

export default Events



