import { useRef, useState, useEffect } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { useControls } from "leva";
import { Image, Flex, Box, Text, Container, Spinner } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import axios from "axios";
import { createBreakpoints } from '@chakra-ui/theme-tools'

createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
})

const calc = (x, y, rect) => [
  -(y - rect.top - rect.height / 2) / 40,
  (x - rect.left - rect.width / 2) / 40,
  1.05
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function Home() {

  const [eventsData, setEventsData] = useState({})
  const [trainingData, setTrainingData] = useState({})
  // events configs
  const configList_events = Object.keys(config);
  const ref_events = useRef(null);
  const [xysEvents, setXysEvents] = useState([0, 0, 1]);
  const { presetEvent } = useControls({
    presetEvent: { value: "default", options: configList_events }
  });
  const propsEvent = useSpring({ xysEvents, config: config[presetEvent] });

  // training configs
  const configList_training = Object.keys(config);
  const ref_training = useRef(null);
  const [xysTraining, setXysTraining] = useState([0, 0, 1]);
  const { presetTraining } = useControls({
    presetTraining: { value: "default", options: configList_training }
  });
  const propsTraining = useSpring({ xysTraining, config: config[presetTraining] });

  // nutrition configs
  const configList_nutrition = Object.keys(config);
  const ref_nutrition = useRef(null);
  const [xysNutrition, setXysNutrition] = useState([0, 0, 1]);
  const { presetNutrition } = useControls({
    presetNutrition: { value: "default", options: configList_nutrition }
  });
  const propsNutrition = useSpring({ xysNutrition, config: config[presetNutrition] });

  useEffect(() => {
    const getEvents = async () => {
      const { data } = await axios.get('/api/events/') // * <-- replace with your endpoint
      console.log(data)
      setEventsData(data)
    }
    getEvents()
  }, [])

  useEffect(() => {
    const getTraining = async () => {
      const { data } = await axios.get('/api/training/') // * <-- replace with your endpoint
      console.log(data)
      setTrainingData(data)
    }
    getTraining()
  }, [])

  return (
    <>
    {Object.keys(eventsData).length ?
      <Flex minHeight='100vh' w='100%' direction='column' alignItems='center' justifyContent='center'>
      {Object.keys(eventsData).length &&
        <>
        <Flex>
        <Text fontWeight='bold' mt={{ base: '7', sm: '8', md: '9', lg: '10'}} textAlign='center' fontSize={{ base: '25px', sm: '40px', md: '50px', lg: '70px'}} id='home_title_welcome'>Welcome to Runners</Text>
        <Text mt={{ base: '7', sm: '8', md: '9', lg: '10'}} textAlign='center' fontSize={{ base: '25px', sm: '40px', md: '50px', lg: '70px'}} color='#FFBF00'>Universe</Text>
        </Flex>
        
          <Link to='/events'><Text mt={{ base: '7', sm: '8', md: '9', lg: '10'}} textAlign='center' fontSize={{ base: '25px', sm: '40px', md: '60px', lg: '70px'}} id='home_title'>RUNNING EVENTS</Text></Link><Flex h={{ base: '100%'}} m={{ base: '5', sm: '7', md: '8', lg: '10'}} w='100%'>
            <div className="ccard-main" ref={ref_events}>
              <Link to={`/events/${eventsData[0].id}`}>
                <animated.div
                  className="ccard"
                  style={{ transform: propsEvent.xysEvents.to(trans) }}
                  onMouseLeave={() => setXysEvents([0, 0, 1])}
                  onMouseMove={(e) => {
                    const rect = ref_events.current.getBoundingClientRect();
                    setXysEvents(calc(e.clientX, e.clientY, rect));
                  }}
                >
                  {/* <Text pos='absolute' textAlign='center' className="home_image_title" color='#fff'>{eventsData[0].name}</Text>
            <Box display='flex' justifyContent='center' alignItems='center' w='50%' h='100%'>
              <Box opacity="0.8" backgroundColor='black' w='100%' h='100%'></Box>
              </Box> */}
              <Flex display={{ base: 'inline-block', lg: 'none' }} position='relative' bgGradient='linear(to-br, #FFBF00, #ffde7a)'  borderRadius='5px' direction='column' w='100%'>
              <Image w='100%' borderTopRadius='5px' src={eventsData[0].event_image}></Image>
              <Flex justifyContent='center'>
              <Text fontSize={{ base: '18px', sm: '30px', md: '35px', lg: '40px'}} textAlign='center' mt='5' width='90%' className="home_image_title" >{eventsData[0].name}</Text>
                </Flex>
              <Flex justifyContent='center'>
                <Text w='80%' fontSize='15px' mb='10'>{eventsData[0].description}</Text>
              </Flex>
            </Flex>
                  <Flex display={{ base: 'none', lg: 'block'}} justifyContent='center' alignItems='center' h='100%' borderLeftRadius='5px' bgGradient='linear(to-br, #FFBF00, #ffde7a)' position='absolute' w='50%'>
                    <Flex direction='column'>
                    <Flex justifyContent='center'>
              <Text fontSize={{ base: '18px', sm: '30px', md: '35px', lg: '40px'}} textAlign='center' mt='5' w='90%' className="home_image_title" >{eventsData[0].name}</Text>
                </Flex>
                      <Flex justifyContent='center'>
                        <Text className="home_image_desc">{eventsData[0].description}</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Image borderRightRadius='5px' display={{ base: 'none', lg: 'block'}} w='100%' h='100%' src={eventsData[0].event_image} alt=''></Image>
                </animated.div>
              </Link>
            </div>
          </Flex>
        </>}
        {Object.keys(trainingData).length &&
        <>
          <Link to='/events'><Text mt={{ base: '7', sm: '8', md: '9', lg: '10'}} textAlign='center' fontSize={{ base: '25px', sm: '40px', md: '60px', lg: '70px'}} id='home_title'>TRAINING PLANS</Text></Link><Flex h={{ base: '100%'}} m={{ base: '5', sm: '7', md: '8', lg: '10'}} w='100%'>
          <div className="ccard-main" ref={ref_training}>
          <Link to='/training'>
            <animated.div
              className="ccard"
              style={{ transform: propsTraining.xysTraining.to(trans) }}
              onMouseLeave={() => setXysTraining([0, 0, 1])}
              onMouseMove={(e) => {
                const rect = ref_training.current.getBoundingClientRect();
                setXysTraining(calc(e.clientX, e.clientY, rect));
              }}
                >
                  {/* <Text pos='absolute' textAlign='center' className="home_image_title" color='#fff'>{eventsData[0].name}</Text>
            <Box display='flex' justifyContent='center' alignItems='center' w='50%' h='100%'>
              <Box opacity="0.8" backgroundColor='black' w='100%' h='100%'></Box>
              </Box> */}
              <Flex display={{ base: 'inline-block', lg: 'none' }} position='relative' bgGradient='linear(to-br, #FFBF00, #ffde7a)' borderRadius='5px' direction='column' w='100%'>
              <Image w='100%' borderTopRadius='5px' src={trainingData.filter(training => training.training_type !== 'nutrition')[0].training_image}></Image>
              <Flex justifyContent='center'>
              <Text fontSize={{ base: '18px', sm: '30px', md: '35px', lg: '40px'}} textAlign='center' width='90%' mt='5' className="home_image_title" >{trainingData.filter(training => training.training_type !== 'nutrition')[0].title}</Text>
                </Flex>
              
              <Flex justifyContent='center'>
                <Text w='80%' fontSize='15px' mb='10'>
                  {trainingData.filter(training => training.training_type !== 'nutrition')[0].description.split('.')[0] 
                  + '. ' 
                  + trainingData.filter(training => training.training_type !== 'nutrition')[0].description.split('.')[1] 
                  + '.'}
                  </Text>
              </Flex>
            </Flex>
                  <Flex display={{ base: 'none', lg: 'block'}} justifyContent='center' alignItems='center' h='100%' borderLeftRadius='5px' bgGradient='linear(to-br, #FFBF00, #ffde7a)' position='absolute' w='50%'>
                    <Flex direction='column'>
                    <Flex justifyContent='center'>
              <Text fontSize={{ base: '18px', sm: '30px', md: '35px', lg: '40px'}} textAlign='center' width='90%' mt='5' className="home_image_title" >{trainingData.filter(training => training.training_type !== 'nutrition')[0].title}</Text>
                </Flex>
                      <Flex justifyContent='center'>
                        <Text className="home_image_desc">{trainingData.filter(training => training.training_type !== 'nutrition')[0].description.split('.')[0] 
                        + '. ' 
                        + trainingData[0].description.split('.')[1] 
                        + '.'}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Image borderRightRadius='5px' display={{ base: 'none', lg: 'block'}} w='100%' h='100%' src={trainingData.filter(training => training.training_type !== 'nutrition')[0].training_image} alt=''></Image>
                </animated.div>
              </Link>
            </div>
          </Flex>
        </>}
        {Object.keys(trainingData).length &&
        <>
          <Link to='/events'><Text mt={{ base: '7', sm: '8', md: '9', lg: '10'}} textAlign='center' fontSize={{ base: '25px', sm: '40px', md: '60px', lg: '70px'}} id='home_title'>NUTRITION TIPS</Text></Link><Flex h={{ base: '100%'}} m={{ base: '5', sm: '7', md: '8', lg: '10'}} w='100%'>
          <div className="ccard-main" ref={ref_nutrition}>
          <Link to='/events'>
            <animated.div
              className="ccard"
              style={{ transform: propsNutrition.xysNutrition.to(trans) }}
              onMouseLeave={() => setXysNutrition([0, 0, 1])}
              onMouseMove={(e) => {
                const rect = ref_nutrition.current.getBoundingClientRect();
                setXysNutrition(calc(e.clientX, e.clientY, rect));
              }}
                >
                  {/* <Text pos='absolute' textAlign='center' className="home_image_title" color='#fff'>{eventsData[0].name}</Text>
            <Box display='flex' justifyContent='center' alignItems='center' w='50%' h='100%'>
              <Box opacity="0.8" backgroundColor='black' w='100%' h='100%'></Box>
              </Box> */}
              <Flex display={{ base: 'inline-block', lg: 'none' }} position='relative' bgGradient='linear(to-br, #FFBF00, #ffde7a)' borderRadius='5px' direction='column' w='100%'>
              <Image w='100%' borderTopRadius='5px' src={trainingData.filter(training => training.training_type === 'nutrition')[0].training_image}></Image>
              <Flex justifyContent='center'>
              <Text fontSize={{ base: '18px', sm: '30px', md: '35px', lg: '40px'}} textAlign='center' mt='5' width='90%' className="home_image_title" >{trainingData.filter(training => training.training_type === 'nutrition')[0].title}</Text>
                </Flex>
              <Flex justifyContent='center'>
                <Text w='80%' fontSize='15px' mb='10'>
                  {trainingData.filter(training => training.training_type === 'nutrition')[0].description.split('.')[0] 
                  + '. ' 
                  + trainingData.filter(training => training.training_type === 'nutrition')[0].description.split('.')[1] 
                  + '.'}
                  </Text>
              </Flex>
            </Flex>
                  <Flex display={{ base: 'none', lg: 'block'}} justifyContent='center' alignItems='center' h='100%' borderLeftRadius='5px' bgGradient='linear(to-br, #FFBF00, #ffde7a)' position='absolute' w='50%'>
                    <Flex direction='column'>
                    <Flex justifyContent='center'>
              <Text fontSize={{ base: '18px', sm: '30px', md: '35px', lg: '40px'}} mt='5' textAlign='center' width='90%' className="home_image_title" >{trainingData.filter(training => training.training_type === 'nutrition')[0].title}</Text>
                </Flex>
                      <Flex justifyContent='center'>
                        <Text className="home_image_desc">{trainingData.filter(training => training.training_type === 'nutrition')[0].description.split('.')[0] 
                        + '. ' 
                        + trainingData[0].description.split('.')[1] 
                        + '.'}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Image borderRightRadius='5px' display={{ base: 'none', lg: 'block'}} w='100%' h='100%' src={trainingData.filter(training => training.training_type === 'nutrition')[0].training_image} alt=''></Image>
                </animated.div>
              </Link>
            </div>
          </Flex>
        </>}
    </Flex>
    :
    <Flex justifyContent='center' alignItems='center'><Spinner color='white' /></Flex>
}
    </>
    
    
  )
}

export default Home