import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Image, Input, Box, Heading, AlertIcon, Alert, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Select, Flex, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function EventsForYou() {

    const [allPRS, setAllPRS] = useState([])
    const [eventsData, setEventsData] = useState({})
    const [filterEventsData, setFilterEventsData] = useState({})
    const [prs, setPrs] = useState({
        hours: '',
        minutes: '',
        seconds: '',
        age: ''
    })

    const [errorPR, setErrorPR] = useState({
        hours: '',
        minutes: '',
        seconds: '',
        age: ''
    })

    let hours_error
    let minutes_error
    let seconds_error
    let age_error

    // const [metric, setMetric] = React.useState(0)

    // const [distance, setDistance] = React.useState(0)

    const handleHoursChange = (value) => {
        setPrs({ ...prs, hours: value })
        setErrorPR({ ...errorPR, hours: '' })
    }

    const handleMinutesChange = (value) => {
        setPrs({ ...prs, minutes: value })
        setErrorPR({ ...errorPR, minutes: '' })
    }

    const handleSecondsChange = (value) => {
        setPrs({ ...prs, seconds: value })
        setErrorPR({ ...errorPR, seconds: '' })
    }

    const handleAgeChange = (value) => {
        setPrs({ ...prs, age: value })
        setErrorPR({ ...errorPR, age: '' })
    }

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get('/api/events/') // * <-- replace with your endpoint
            console.log(data)
            setEventsData(data)
        }
        getData()
    }, [])

    function filterEvents() {
        const filtered_events = eventsData.filter(event =>
            event.distance.distance === '26.2' && event.requirement.some(requirement => {
                if (prs.age >= 80){
                    return(
                        parseInt(prs.age) >= parseInt(requirement.age_group.split('-')[0]) &&
                        ((parseInt(prs.hours)  * 60) + parseInt(prs.minutes) + (parseInt(prs.seconds)/60)) <= ((parseInt(requirement.hours)  * 60) + parseInt(requirement.minutes) + (parseInt(requirement.seconds)/60))
                    )
                   
                } else {
                    return (
                        parseInt(prs.age) <= parseInt(requirement.age_group.split('-')[1]) &&
                parseInt(prs.age) >= parseInt(requirement.age_group.split('-')[0]) &&
                ((parseInt(prs.hours)  * 60) + parseInt(prs.minutes) + (parseInt(prs.seconds)/60)) <= ((parseInt(requirement.hours)  * 60) + parseInt(requirement.minutes) + (parseInt(requirement.seconds)/60))
                    )
                } 
            }
                
                ))
            
                // ((event.requirement.hours * 60) + event.requirement.minutes + (event.requirement.seconds / 60)) >= ((parseInt(prs.hours)  * 60) + parseInt(prs.minutes) + (parseInt(prs.seconds)/60))
        console.log(filtered_events)
        setFilterEventsData(filtered_events)
    }

    function addPR() {
        if (prs.hours === '') {
            hours_error = 'Select hours'
        } else hours_error = null
        if (prs.minutes === '') {
            minutes_error = 'Select minutes'
        } else minutes_error = null
        if (prs.seconds === '') {
            seconds_error = 'Select seconds'
        } else seconds_error = null
        if (prs.age === '') {
            age_error = 'Select age'
        } else age_error = null

        if (prs.hours !== '' && prs.minutes !== '' && prs.seconds !== '' && prs.age !== '') {

            filterEvents()

        } else {
            setErrorPR({
                hours: hours_error,
                minutes: minutes_error,
                seconds: seconds_error,
                age: age_error
            })
        }

    }

    function deletePR(e) {
        const pr_to_delete = allPRS.filter(pr => (pr.distance + pr.metric) === e.target.value)
        console.log(allPRS.indexOf(pr_to_delete))
        allPRS.splice(allPRS.indexOf(pr_to_delete), 1)
        console.log(e.target.value)
        console.log(allPRS)
        filterEvents()
    }

    return (
        <Flex minHeight='100vh' w='100%' direction='column' alignItems='center'>
            <Flex direction='row' w='100%' justifyContent='center' alignItems='center'>
                <Flex id='input_prs' p='20' borderRadius='10px' m='10' direction='column' w='600px'>
                    <Text textAlign='center' lineHeight= '100%' id='prs_input_title'>Enter your best runs:</Text>
                    <Text textAlign='center' mt='5'>Find out what events you are qualified to run in!</Text>
                    <Flex direction='row' alignItems='center' mt={5}>
                        <Text w='100px' mr='8'>Age:</Text>
                        <NumberInput maxW='100px' min={0} max={150} mr='2rem' value={prs.age} onChange={handleAgeChange}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <Slider
                            flex='1'
                            focusThumbOnChange={false}
                            value={prs.age}
                            onChange={handleAgeChange}
                            max={150}
                            min={0}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb fontSize='sm' boxSize='32px' children={prs.age} />
                        </Slider>
                    </Flex>
                    {errorPR.age && <Alert status='error' color='black' h='30px' mt={4}><AlertIcon />{errorPR.age}</Alert>}
                    <Flex direction='row' alignItems='center' mt={5}>
                        <Text w='100px' mr='8'>Hours:</Text>
                        <NumberInput maxW='100px' min={0} max={60} mr='2rem' value={prs.hours} onChange={handleHoursChange}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <Slider
                            flex='1'
                            focusThumbOnChange={false}
                            value={prs.hours}
                            onChange={handleHoursChange}
                            max={60}
                            min={0}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb fontSize='sm' boxSize='32px' children={prs.hours} />
                        </Slider>
                    </Flex>
                    {errorPR.hours && <Alert status='error' color='black' h='30px' mt={4}><AlertIcon />{errorPR.hours}</Alert>}
                    <Flex direction='row' alignItems='center' mt={5}>
                        <Text w='100px' mr='8'>Minutes:</Text>
                        <NumberInput maxW='100px' min={0} max={60} mr='2rem' value={prs.minutes} onChange={handleMinutesChange}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <Slider
                            flex='1'
                            focusThumbOnChange={false}
                            value={prs.minutes}
                            onChange={handleMinutesChange}
                            max={60}
                            min={0}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb fontSize='sm' boxSize='32px' children={prs.minutes} />
                        </Slider>
                    </Flex>
                    {errorPR.minutes && <Alert status='error' color='black' h='30px' mt={4}><AlertIcon />{errorPR.minutes}</Alert>}
                    <Flex direction='row' alignItems='center' mt={5}>
                        <Text w='100px' mr='8'>Seconds:</Text>
                        <NumberInput maxW='100px' min={0} max={60} mr='2rem' value={prs.seconds} onChange={handleSecondsChange}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <Slider
                            flex='1'
                            focusThumbOnChange={false}
                            value={prs.seconds}
                            onChange={handleSecondsChange}
                            max={60}
                            min={0}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb fontSize='sm' boxSize='32px' children={prs.seconds} />
                        </Slider>
                    </Flex>
                    {errorPR.seconds && <Alert status='error' color='black' h='30px' mt={4}><AlertIcon />{errorPR.seconds}</Alert>}
                    <Flex justifyContent='center'>
                        <Button backgroundColor='#FFBF00' mt='10' w='200px' color='black' onClick={addPR}>Add</Button>
                    </Flex>
                </Flex>
            </Flex>
            <>
                {Object.keys(filterEventsData).length ?
                    <Flex ml='2' direction='column' alignItems='center' flexWrap='wrap' width='80%' h='800px'>
                    {filterEventsData.map(event => {
                      return (
                        <Box key={event.id} h='25%' w='100%' id='events_small'>
                          <Link to={`/events/${event.id}`}>
                            <hr color='white' width='100%' height='1px' />
                            <Flex name="actions" p='4' mb='5' color='white' h='100%' flexDirection='row' alignItems='center' justifyContent='flex-start'>
                              <Image mr='10' src={event.event_image} h='100%' alt=''></Image>
                              <Text textAlign='center'>
                                {event.name}
                              </Text>
                            </Flex>
                          </Link>
                        </Box>
                      )
                    })}
                    <hr color='white' width='100%' height='1px' />
                  </Flex>
                    :
                    ''
                }
            </>
        </Flex>

    )
}

export default EventsForYou