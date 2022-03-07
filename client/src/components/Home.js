import { useRef, useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { useControls } from "leva";
import { Flex, Box, Text } from '@chakra-ui/react'
import { Link } from "react-router-dom";

const calc = (x, y, rect) => [
  -(y - rect.top - rect.height / 2) / 40,
  (x - rect.left - rect.width / 2) / 40,
  1.05
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function Home() {
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

  return (
    <Flex w='100%' direction='column' alignItems='center' justifyContent='center'>
      <Text mt='10' id='home_title'>RUNNING EVENTS</Text>
      <Flex m='10' w='100%'>
    <div className="ccard-main" ref={ref_events}>
      <Link to='/events'>
        <animated.div
        className="ccard"
        style={{ transform: propsEvent.xysEvents.to(trans) }}
        onMouseLeave={() => setXysEvents([0, 0, 1])}
        onMouseMove={(e) => {
          const rect = ref_events.current.getBoundingClientRect();
          setXysEvents(calc(e.clientX, e.clientY, rect));
        } }
      >
        <h1>Enter</h1>
      </animated.div>
    </Link>
    </div>
    </Flex>
    <Text mt='10' id='home_title'>WORLD CLASS TRAINING PLANS</Text>
      <Flex m='10' w='100%'>
    <div className="ccard-main" ref={ref_training}>
      <Link to='/training'>
        <animated.div
        className="ccard"
        style={{ transform: propsTraining.xysTraining.to(trans) }}
        onMouseLeave={() => setXysTraining([0, 0, 1])}
        onMouseMove={(e) => {
          const rect = ref_training.current.getBoundingClientRect();
          setXysTraining(calc(e.clientX, e.clientY, rect));
        } }
      >
        <h1>Enter</h1>
      </animated.div>
    </Link>
    </div>
    </Flex>
    <Text mt='10' id='home_title'>YOUR HEALTH MATTERS</Text>
      <Flex m='10' w='100%'>
    <div className="ccard-main" ref={ref_nutrition}>
      <Link to='/events'>
        <animated.div
        className="ccard"
        style={{ transform: propsNutrition.xysNutrition.to(trans) }}
        onMouseLeave={() => setXysNutrition([0, 0, 1])}
        onMouseMove={(e) => {
          const rect = ref_nutrition.current.getBoundingClientRect();
          setXysNutrition(calc(e.clientX, e.clientY, rect));
        } }
      >
        <h1>Enter</h1>
      </animated.div>
    </Link>
    </div>
    </Flex>
    </Flex>
  )
}

export default Home