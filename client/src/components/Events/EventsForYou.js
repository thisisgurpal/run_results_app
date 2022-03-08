import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Heading, AlertIcon, Alert, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Select, Flex, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function EventsForYou() {

    const [allPRS, setAllPRS] = useState([])
    const [eventsData, setEventsData] = useState({})
    const [filterEventsData, setFilterEventsData] = useState([])
    const [prs, setPrs] = useState({
        metric: null,
        distance: null,
        days: '',
        hours: '',
        minutes: '',
        seconds: ''
    })

    const [errorPR, setErrorPR] = useState({
        metric: null,
        distance: null,
        days: '',
        hours: '',
        minutes: '',
        seconds: ''
    })

    let metric_error
    let distance_error
    let days_error
    let hours_error
    let minutes_error
    let seconds_error

    // const [metric, setMetric] = React.useState(0)

    // const [distance, setDistance] = React.useState(0)

    const handleDaysChange = (value) => {
        setPrs({ ...prs, days: value })
        setErrorPR({ ...errorPR, days: '' })
    }

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

    function handleOptionChange(e) {
        if (e.target.id === 'metric') {
            setPrs({ ...prs, metric: e.target.value })
            setErrorPR({ ...errorPR, metric: null })
        } else if (e.target.id === 'distance') {
            setPrs({ ...prs, distance: e.target.value })
            setErrorPR({ ...errorPR, distance: null })
        }
        // setFilterHabits({ ...filterHabits, [e.target.name]: e.target.value })
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
            allPRS.some(pr =>
                ((event.requirement.hours * 60) + event.requirement.minutes) >= ((parseInt(pr.hours * 60)) + parseInt(pr.minutes)) &&
                event.distance.distance === pr.distance &&
                event.distance.measurement === pr.metric
            )
        )
        console.log(filtered_events)
        setFilterEventsData(filtered_events)
    }

    function addPR() {
        if (!prs.metric) {
            metric_error = 'Choose a metric'
        } else metric_error = null
        if (!prs.distance) {
            distance_error = 'Choose a distance'
        } else distance_error = null
        if (prs.days === '') {
            days_error = 'Select days'
        } else days_error = null
        if (prs.hours === '') {
            hours_error = 'Select hours'
        } else hours_error = null
        if (prs.minutes === '') {
            minutes_error = 'Select minutes'
        } else minutes_error = null
        if (prs.seconds === '') {
            seconds_error = 'Select seconds'
        } else seconds_error = null

        if (prs.metric && prs.distance && prs.days !== '' && prs.hours !== '' && prs.minutes !== '' && prs.seconds !== '') {

            allPRS.push(prs)
            console.log(prs)
            console.log(allPRS)
            setAllPRS(allPRS)
            setPrs({
                metric: null,
                distance: null,
                days: '',
                hours: '',
                minutes: '',
                seconds: ''
            })

            filterEvents()

        } else {
            setErrorPR({
                metric: metric_error,
                distance: distance_error,
                days: days_error,
                hours: hours_error,
                minutes: minutes_error,
                seconds: seconds_error
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
                    <Text lineHeight= '100%' id='prs_input_title'>Enter your best runs:</Text>
                    <Flex direction='row' alignItems='center' mt={5}>
                        <Text w='100px' mr='8'>Metric:</Text>
                        <Select backgroundColor='white' color='black' value={prs.metric ? Select.value : ''} onChange={handleOptionChange} id='metric' placeholder='Select option'>
                            <option value='miles'>Miles</option>
                            <option value='kilometers'>Kilometers</option>
                        </Select>
                    </Flex>
                    {errorPR.metric && <Alert status='error' color='black' h='30px' mt={4}><AlertIcon />{errorPR.metric}</Alert>}
                    <Flex direction='row' alignItems='center' mt={5}>
                        <Text w='100px' mr='8'>Distance:</Text>
                        <Select backgroundColor='white' color='black' value={prs.distance ? Select.value : ''} onChange={handleOptionChange} id='distance' placeholder='Select option'>
                            <option value='240'>240</option>
                            <option value='200'>200</option>
                            <option value='150'>150</option>
                            <option value='100'>100</option>
                            <option value='50'>50</option>
                            <option value='26.2'>26.2</option>
                        </Select>
                    </Flex>
                    {errorPR.distance && <Alert status='error' color='black' h='30px' mt={4}><AlertIcon />{errorPR.distance}</Alert>}
                    <Flex direction='row' alignItems='center' mt={5}>
                        <Text w='100px' mr='8'>Days:</Text>
                        <NumberInput maxW='100px' max={20} mr='2rem' value={prs.days} onChange={handleDaysChange}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <Slider
                            flex='1'
                            focusThumbOnChange={false}
                            value={prs.days}
                            onChange={handleDaysChange}
                            max={20}
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb fontSize='sm' boxSize='32px' children={prs.days} />
                        </Slider>
                    </Flex>
                    {errorPR.days && <Alert status='error' color='black' h='30px' mt={4}><AlertIcon />{errorPR.days}</Alert>}
                    <Flex direction='row' alignItems='center' mt={5}>
                        <Text w='100px' mr='8'>Hours:</Text>
                        <NumberInput maxW='100px' max={60} mr='2rem' value={prs.hours} onChange={handleHoursChange}>
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
                        <NumberInput maxW='100px' max={60} mr='2rem' value={prs.minutes} onChange={handleMinutesChange}>
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
                        <NumberInput maxW='100px' max={60} mr='2rem' value={prs.seconds} onChange={handleSecondsChange}>
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
                <Box>
                    {Object.keys(allPRS).length ?
                        <>
                            <Box w='900px' h='725px' backgroundColor='#363636' borderRadius='10px'>
                                <Box p='30px' pl='50px'>
                            <Text color='white' id='prs_title'>Your runs:</Text>
                                {allPRS.map(pr => {
                                    return (
                                        <Flex key={allPRS.indexOf(pr)} direction='row' alignItems='center'>
                                            <Text color='white' id='prs' >{pr.distance}{pr.metric} {pr.days}:{pr.hours}:{pr.minutes}:{pr.seconds}</Text>
                                            <Button onClick={deletePR} value={pr.distance + pr.metric} ml='8' bg='white' color='#black'>Delete</Button>
                                        </Flex>
                                    )
                                })}
                                </Box>
                            </Box>
                        </>
                        :
                        ''
                    }
                </Box>
            </Flex>
            <>
                {Object.keys(filterEventsData).length ?
                    <Flex direction='row' flexWrap='wrap'>
                        {filterEventsData.map(event => {
                            return (
                                <Link boxshadow='xl' key={event.id} to={`/events/${event.id}`}>
                                    <Flex name="actions" p='4' mb='5' color='white' bgGradient='linear(to-t, red.200, pink.500)' width='300px' height='320px' flexDirection='column' borderWidth='1px' alignItems='center' justifyContent='flex-start' boxshadow='2xl' borderRadius='10'>
                                        <Box name="headline" pl='4' pr='4' mb='4' width=''>
                                            <Heading textAlign='center' name='eventName' color='primary' mt='0' size='lg'>
                                                {event.name}
                                            </Heading>
                                        </Box>
                                    </Flex>
                                </Link>
                            )
                        })}
                    </Flex>
                    :
                    ''
                }
            </>
        </Flex>

    )
}

export default EventsForYou