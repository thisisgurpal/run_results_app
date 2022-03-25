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
                <Flex minHeight='100vh' direction='column' justifyContent='flex-start' alignItems='center'>
                    <Flex justifyContent='center' w='100%'><Text fontSize={{ base: '40px', md: '50px', lg: '60px' }} textAlign='center' mt='10' id='individual_page_headings' w='90%' >{trainingData.title}</Text></Flex>
                    <Flex mt='10' direction={{ base: 'column' }} justifyContent='center' alignItems={{ base: 'center' }}>
                        <Flex bgGradient='linear(to-br, #FFBF00, #ffde7a)' borderTopLeftRadius={{ base: '0px', lg: '5px' }} borderTopRadius={{ base: '5px' }} direction='column' w={{ base: '80%' }}>
                            <Image w='100%' borderTopLeftRadius={{ base: '5px' }} borderTopRightRadius={{ base: '5px' }} src={trainingData.training_image}></Image>
                            <Flex justifyContent='center'>
                                <Text w='80%' fontSize={{ base: '15px', lg: '16px', xl: '16px' }} mt='10' mb='10'><span className='first_letter_blog'>{trainingData.description.split(' ')[0].split('')[0]}</span>{trainingData.description.split(' ')[0].split('').splice(1).join('') + ' ' + trainingData.description.split(' ').splice(1).join(' ')}</Text>
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