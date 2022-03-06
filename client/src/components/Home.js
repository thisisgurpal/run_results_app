import { useRef, useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { useControls } from "leva";
import { Flex, Box } from '@chakra-ui/react'
import { Link } from "react-router-dom";

const calc = (x, y, rect) => [
  -(y - rect.top - rect.height / 2) / 5,
  (x - rect.left - rect.width / 2) / 5,
  1.4
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export default function Card() {
  const configList = Object.keys(config);
  const ref = useRef(null);
  const [xys, set] = useState([0, 0, 1]);
  const { preset } = useControls({
    preset: { value: "default", options: configList }
  });
  const props = useSpring({ xys, config: config[preset] });

  return (
    <Flex h='100%' w='100%' direction='column' alignItems='center' justifyContent='center'>
    <Box m='20'>
      <h1>Welcom to Runner App</h1>
      </Box>
      <Flex m='20' w='100%' h='200px'>
    <div className="ccard-main" ref={ref}>
      <Link to='/events'>
        <animated.div
        className="ccard"
        style={{ transform: props.xys.to(trans) }}
        onMouseLeave={() => set([0, 0, 1])}
        onMouseMove={(e) => {
          const rect = ref.current.getBoundingClientRect();
          set(calc(e.clientX, e.clientY, rect));
        } }
      >
        <h1>Enter</h1>
      </animated.div>
    </Link>
    </div>
    </Flex>
    </Flex>
  );
}
