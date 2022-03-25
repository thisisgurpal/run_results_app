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
  -(y - rect.top - rect.height / 2) / 10,
  (x - rect.left - rect.width / 2) / 10,
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
        <Flex minHeight='100vh' w='100%' direction='column' alignItems='center' justifyContent='flex-start'>
          <Flex mt={{ base: '7', sm: '8', md: '9', lg: '10' }} mb={{ base: '7', sm: '8', md: '9', lg: '10' }}>
                <Text fontWeight='bold'  textAlign='center' fontSize={{ base: '25px', sm: '40px', md: '50px', lg: '70px' }}><span className='home_title_welcome'>Welcome to Runners</span><span className="universe">Universe</span></Text>
                {/* <Text textAlign='center' fontSize={{ base: '25px', sm: '40px', md: '50px', lg: '70px' }} color='#FFBF00'>Universe</Text> */}
              </Flex>
          {Object.keys(eventsData).length &&
            <>
              <Flex h={{ base: '100%' }} m='2' w='100%'>
                <div className="ccard-main" ref={ref_events}>
                  <Link to='/events'>
                    <animated.div
                      className="ccard"
                      style={{ transform: propsEvent.xysEvents.to(trans) }}
                      onMouseLeave={() => setXysEvents([0, 0, 1])}
                      onMouseMove={(e) => {
                        const rect = ref_events.current.getBoundingClientRect();
                        setXysEvents(calc(e.clientX, e.clientY, rect));
                      }}
                    >
                      <Flex display='inline-block' position='relative' bgGradient='linear(to-br, #FFBF00, #ffde7a)' borderRadius='60px' direction='column' w='100%'>
                        <Flex justifyContent='center'>
                          <Text mt='5' mb='5' width='90%' textAlign='center' fontSize={{ base: '15px', sm: '20px' }} id='home_title'>RUNNING EVENTS</Text>
                        </Flex>
                      </Flex>
                    </animated.div>
                  </Link>
                </div>
              </Flex>
            </>}
          {Object.keys(trainingData).length &&
            <>
              <Flex h={{ base: '100%' }} m='2' w='100%'>
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
                      <Flex display='inline-block' position='relative' bgGradient='linear(to-br, #FFBF00, #ffde7a)' borderRadius='60px' direction='column' w='100%'>
                        <Flex justifyContent='center'>
                          <Text mt='5' mb='5' width='90%' textAlign='center' fontSize={{ base: '15px', sm: '20px' }} id='home_title'>TRAINING & HEALTH</Text>
                        </Flex>
                      </Flex>
                    </animated.div>
                  </Link>
                </div>
              </Flex>
            </>}
          {Object.keys(trainingData).length &&
            <>
              <Flex h={{ base: '100%' }} m='2' w='100%'>
                <div className="ccard-main" ref={ref_nutrition}>
                  <Link to='/events-for-you'>
                    <animated.div
                      className="ccard"
                      style={{ transform: propsNutrition.xysNutrition.to(trans) }}
                      onMouseLeave={() => setXysNutrition([0, 0, 1])}
                      onMouseMove={(e) => {
                        const rect = ref_nutrition.current.getBoundingClientRect();
                        setXysNutrition(calc(e.clientX, e.clientY, rect));
                      }}
                    >
                     <Flex display='inline-block' position='relative' bgGradient='linear(to-br, #FFBF00, #ffde7a)' borderRadius='60px' direction='column' w='100%'>
                        <Flex justifyContent='center'>
                          <Text mt='5' mb='5' width='90%' textAlign='center' fontSize={{ base: '15px', sm: '20px' }} id='home_title'>MARATHONS FOR YOU</Text>
                        </Flex>
                      </Flex>
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