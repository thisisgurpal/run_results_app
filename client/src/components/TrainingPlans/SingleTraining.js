import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Select, Image, Text, Tabs, TabList, TabPanels, Tab, Spinner, TabPanel, Flex, Box, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Comments from '../Comments'
import { createBreakpoints } from '@chakra-ui/theme-tools'

createBreakpoints({
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
})

function SingleTraining() {

    const { trainingId } = useParams()
    const [trainingData, setTrainingData] = useState({})

    console.log(trainingId)
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get(`/api/training/${trainingId}/`)
            console.log(data)
            setTrainingData(data)

        }
        getData()
    }, [trainingId])

    console.log(Object.keys(trainingData).length && trainingData)
    return (
        <>
            {Object.keys(trainingData).length ?
                <Flex minHeight='100vh' direction='column' justifyContent='center' alignItems='center'>
                    <Flex mt='10' direction={{ base: 'column' }} justifyContent='center' alignItems={{ base: 'center' }}>
                        <Flex bgGradient='linear(to-br, #FFBF00, #ffde7a)' borderTopLeftRadius={{ base: '0px', lg: '5px' }} borderTopRadius={{ base: '5px' }} direction='column' w={{ base: '80%' }}>
                            <Image w='100%' borderTopLeftRadius={{ base: '5px' }} borderTopRightRadius={{ base: '5px' }} src={trainingData.training_image}></Image>
                            <Text fontSize={{ base: '40px', lg: '50px' }} id='single_event_title' >{trainingData.name}</Text>
                            <Flex justifyContent='center'>
                                <Text w='80%' fontSize={{ base: '15px', lg: '16px', xl: '16px' }} mb='10'>{trainingData.description}</Text>
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

export default SingleTraining