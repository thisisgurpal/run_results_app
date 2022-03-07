import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import App from './App'
import { ChakraProvider, extendTheme, Center, Container} from '@chakra-ui/react'



ReactDOM.render(
  <ChakraProvider>
      <App />
  </ChakraProvider>, document.getElementById('root'))