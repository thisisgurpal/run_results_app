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
  const [trainingData, setTrainingData] = useState({})

  useEffect(() => {
    const getEvents = async () => {
      const { data } = await axios.get('/api/training/') // * <-- replace with your endpoint
      console.log(data)
      setTrainingData(data)
    }
    getEvents()
  }, [])



  return (
    <>
      {Object.keys(trainingData).length ?
        <Flex minHeight='100vh' direction='column'>
          <Text mt='10' textAlign='center' fontSize={{ base: '25px', sm: '40px', md: '60px', lg: '90px'}} id='home_title'>HEALTH & NUTRITION</Text>
          <Flex justifyContent='center' h={{ base: '500px', we: '600px', md: '1200px', xl: '500px' }}>
            <Flex w={{ base: '80%', xl: '80%' }} h='100%' direction={{ base: 'column', xl: 'row'}}>
              <Box w='100%' h={{ base: 'auto', xl: '100%' }} mr='2'>
                <Link to={`/events/${trainingData.filter(training => training.training_type === 'nutrition')[0].id}`}>
                  <Box id='main_event' color='black' display='flex' justifyContent='center' h={{ base: 'auto', xl: '100%' }} alignItems='center' w='100%' bgGradient='linear(to-br, #FFBF00, #ffde7a)'>
                    <Flex direction='column' w='100%' h='100%'>
                      <Image h='70%' src={trainingData.filter(training => training.training_type === 'nutrition')[0].training_image} alt=''></Image>
                      <Flex h='100%' mt='15' mb='15' alignItems='center' justifyContent='center'>
                      <Text textAlign='center' lineHeight='100%' fontSize={{ base: '30px', sm: '35px', md: '40px', xl: '50px' }} className="home_image_title">{trainingData.filter(training => training.training_type === 'nutrition')[0].title}</Text>
                      </Flex>
                      {/* <Text textAlign='center' className="home_image_desc">{eventsData.filter(event => event.distance.distance === '26.2')[0].description}</Text> */}
                    </Flex>
                  </Box>
                </Link>
              </Box>
              <Flex ml={{ base: '0', xl: '2' }} mt={{ base: '5', xl: '0' }} direction='column' flexWrap='wrap' width='100%'>
                {trainingData.filter(training => training.training_type === 'nutrition').filter(training => training.name !== trainingData.filter(training => training.training_type === 'nutrition')[0].title).map(training => {
                  return (
                    <Box h={{ base: '60px', md: '120px',  xl: '25%' }} id='events_small'>
                      <Link key={training.id} to={`/events/${training.id}`}>
                        <hr color='white' w='100%' h='1px' />
                        <Flex name="actions" p='4' color='white' h='100%' flexDirection='row' alignItems='center' justifyContent='center'>
                          <Box w='300px' display={{ base: 'none', md: 'block' }}>
                          <Image display={{ base: 'none', md: 'block' }} mr='10' src={training.training_image} w={{ base: '150px', xl: '200px' }} alt=''></Image>
                            </Box>
                            <Flex mt='3' mb='3' w='100%' justifyContent='center'>
                            <Text fontSize={{ base: '18px', sm: '22px', md: '28px', xl: '30px' }} textAlign='center'>
                            {training.title}
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
          <Text mt='10' textAlign='center' fontSize={{ base: '25px', sm: '40px', md: '60px', lg: '90px'}} id='home_title'>ENDURANCE TRAINING</Text>
          <Flex justifyContent='center' h={{ base: '500px', we: '600px', md: '1200px', xl: '500px' }}>
            <Flex w={{ base: '80%', xl: '80%' }} h='100%' direction={{ base: 'column', xl: 'row'}}>
              <Box w='100%' h={{ base: 'auto', xl: '100%' }} mr='2'>
                <Link to={`/events/${trainingData.filter(training => training.training_type === 'endurance')[0].id}`}>
                  <Box id='main_event' color='black' display='flex' justifyContent='center' h={{ base: 'auto', xl: '100%' }} alignItems='center' w='100%' bgGradient='linear(to-br, #FFBF00, #ffde7a)'>
                    <Flex direction='column' w='100%' h='100%'>
                      <Image h='70%' src={trainingData.filter(training => training.training_type === 'endurance')[0].training_image} alt=''></Image>
                      <Flex h='100%' mt='15' mb='15' alignItems='center' justifyContent='center'>
                      <Text textAlign='center' lineHeight='100%' fontSize={{ base: '30px', sm: '35px', md: '40px', xl: '50px' }} className="home_image_title">{trainingData.filter(training => training.training_type === 'endurance')[0].title}</Text>
                      </Flex>
                      {/* <Text textAlign='center' className="home_image_desc">{eventsData.filter(event => event.distance.distance === '26.2')[0].description}</Text> */}
                    </Flex>
                  </Box>
                </Link>
              </Box>
              <Flex ml={{ base: '0', xl: '2' }} mt={{ base: '5', xl: '0' }} direction='column' flexWrap='wrap' width='100%'>
                {trainingData.filter(training => training.training_type === 'endurance').filter(training => training.name !== trainingData.filter(training => training.training_type === 'endurance')[0].title).map(training => {
                  return (
                    <Box h={{ base: '60px', md: '120px',  xl: '25%' }} id='events_small'>
                      <Link key={training.id} to={`/events/${training.id}`}>
                        <hr color='white' w='100%' h='1px' />
                        <Flex name="actions" p='4' color='white' h='100%' flexDirection='row' alignItems='center' justifyContent='flex-start'>
                        <Box w='300px' display={{ base: 'none', md: 'block' }}>
                          <Image display={{ base: 'none', md: 'block' }} mr='10' src={training.training_image} w={{ base: '150px', xl: '200px' }} alt=''></Image>
                            </Box>
                            <Flex mt='3' mb='3' w='100%' justifyContent='center'>
                            <Text fontSize={{ base: '18px', sm: '22px', md: '28px', xl: '30px' }} textAlign='center'>
                            {training.title}
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
          <Text mt='10' textAlign='center' fontSize={{ base: '25px', sm: '40px', md: '60px', lg: '90px'}} id='home_title'>STRENGTH TRAINING</Text>
          <Flex justifyContent='center' h={{ base: '500px', we: '600px', md: '1200px', xl: '500px' }}>
            <Flex w={{ base: '80%', xl: '80%' }} h='100%' direction={{ base: 'column', xl: 'row'}}>
              <Box w='100%' h={{ base: 'auto', xl: '100%' }} mr='2'>
                <Link to={`/events/${trainingData.filter(training => training.training_type === 'strength')[0].id}`}>
                  <Box id='main_event' color='black' display='flex' justifyContent='center' h={{ base: 'auto', xl: '100%' }} alignItems='center' w='100%' bgGradient='linear(to-br, #FFBF00, #ffde7a)'>
                    <Flex direction='column' w='100%' h='100%'>
                      <Image h='70%' src={trainingData.filter(training => training.training_type === 'strength')[0].training_image} alt=''></Image>
                      <Flex h='100%' mt='15' mb='15' alignItems='center' justifyContent='center'>
                      <Text textAlign='center' lineHeight='100%' fontSize={{ base: '30px', sm: '35px', md: '40px', xl: '50px' }} className="home_image_title">{trainingData.filter(training => training.training_type === 'strength')[0].title}</Text>
                      </Flex>
                      {/* <Text textAlign='center' className="home_image_desc">{eventsData.filter(event => event.distance.distance === '26.2')[0].description}</Text> */}
                    </Flex>
                  </Box>
                </Link>
              </Box>
              <Flex ml={{ base: '0', xl: '2' }} mt={{ base: '5', xl: '0' }} direction='column' flexWrap='wrap' width='100%'>
                {trainingData.filter(training => training.training_type === 'strength').filter(training => training.name !== trainingData.filter(training => training.training_type === 'strength')[0].title).map(training => {
                  return (
                    <Box h={{ base: '60px', md: '120px',  xl: '25%' }} id='events_small'>
                      <Link key={training.id} to={`/events/${training.id}`}>
                        <hr color='white' w='100%' h='1px' />
                        <Flex name="actions" p='4' color='white' h='100%' flexDirection='row' alignItems='center' justifyContent='flex-start'>
                        <Box w='300px' display={{ base: 'none', md: 'block' }}>
                          <Image display={{ base: 'none', md: 'block' }} mr='10' src={training.training_image} w={{ base: '150px', xl: '200px' }} alt=''></Image>
                            </Box>
                            <Flex mt='3' mb='3' w='100%' justifyContent='center'>
                            <Text fontSize={{ base: '18px', sm: '22px', md: '28px', xl: '30px' }} textAlign='center'>
                            {training.title}
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
        <Flex minHeight='100vh'></Flex>
      }
    </>
  )
}

export default Events

