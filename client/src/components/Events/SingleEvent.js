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

function SingleEvent() {

  const { eventId } = useParams()
  const [runsData, setRunsData] = useState({})
  const [eventData, setEventData] = useState({})
  const [gender, setGender] = useState('')
  const [filterRuns, setFilterRuns] = useState({})


  function removeDuplicateArrayValues(arr) {
    return [...new Set(arr)]
  }
console.log(eventId)
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/events/${eventId}/`)
      console.log(data)
      setEventData(data)
      if (Object.keys(data.runs).length) {
        const alterRuns = data.runs.map(run => {
          return {
            year: `${run.year}`,
            position: `${run.position}`,
            name: `${run.runner.first_name} ${run.runner.last_name}`,
            time: `${new Date(((run.hours * 60 * 60) + (run.minutes * 60) + run.seconds) * 1000).toISOString().substr(11, 8)}`,
            runnerID: `${run.runner.id}`,
            gender: `${run.runner.gender}`
          }
        })
        console.log(removeDuplicateArrayValues(Object.entries(alterRuns).map(entry => entry[1].year)))
        setRunsData(alterRuns)
      }

    }
    getData()
  }, [eventId])

  useEffect(() => {
    setGender('male')
  }, [])

  useEffect(() => {
    setFilterRuns(Object.keys(runsData).length && runsData.filter(run => run.gender === gender))
  }, [gender, runsData])

  function genderToggle(e) {
    console.log(e.target.value)
    setGender(e.target.value)
  }

  function DataTabs({ data }) {
    return (
      <Tabs variant='enclosed'>
        <Select mb='10px' backgroundColor='white' value={gender} onChange={genderToggle} color='black'>
          <option value='male'>male</option>
          <option value='female'>female</option>
        </Select>
        <TabList>
          {removeDuplicateArrayValues(Object.entries(data).map(entry => entry[1].year)).map((tab, index) => (
            <Tab key={index}>{tab}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {removeDuplicateArrayValues(Object.entries(data).map(entry => entry[1].year)).map((tab, index) => (
            <TabPanel p={4} key={index}>
              <Flex direction='column' alignItems='flex-start'>
                {data.filter(subdata => subdata.year === tab).map(run =>
                  <Flex key={run.runnerID} direction='column' h={{ base: '50px', lg: '80px' }} w='100%'>
                    <Flex alignItems='center' justifyContent='space-between' h='100%' w='100%' >
                      <Flex alignItems='center'>
                      <Text id='position' fontSize={{ base: '40px', lg: '50px', xl: '60px' }}>{run.position}</Text>
                      <Link to={`/runner/${run.runnerID}`}>
                        <Text ml='10' fontSize={{ base: '13px', sm: '15px', md: '20px', lg: '22px', xl: '25px' }} id='position_name'>{run.name}</Text>
                      </Link>
                        </Flex>
                      <Text ml='10' fontSize={{ base: '13px', sm: '15px', md: '20px', lg: '22px', xl: '25px' }} id='position_time'>{run.time}</Text>
                    </Flex>
                    <hr color='black' width='100%' height='1px' />
                  </Flex>

                )}
              </Flex>
            </TabPanel>

          ))}
        </TabPanels>
      </Tabs>
    )
  }
console.log(Object.keys(runsData).length && runsData)
  return (
    <>
      {Object.keys(filterRuns).length ?
        <Flex minHeight='100vh' direction='column' justifyContent='center' alignItems='center'>
          <Flex mt='10' direction={{ base: 'column', lg: 'row' }} justifyContent='center' alignItems={{ base: 'center', lg: 'stretch' }}>
            <Flex bgGradient='linear(to-br, #FFBF00, #ffde7a)' borderTopLeftRadius={{ base: '0px', lg: '5px' }} borderTopRadius={{ base: '5px'}} direction='column' w={{ base: '80%', lg: '40%' }}>
              <Image w='100%' borderTopLeftRadius={{ base: '5px' }} borderTopRightRadius={{ base: '5px', lg: '0px' }} src={eventData.event_image}></Image>
              <Text fontSize={{ base: '40px', lg: '50px' }} id='single_event_title' >{eventData.name}</Text>
              <Flex justifyContent='center'>
                <Text w='80%' fontSize={{ base: '15px', lg: '16px', xl: '16px' }} mb='10'>{eventData.description}</Text>
              </Flex>
            </Flex>
            <Box backgroundColor='white' borderRightRadius={{ base: '0px', lg: '5px' }} borderBottomRadius={{ base: '5px', lg: '0px' }} padding='20px' w={{ base: '80%', lg: '40%' }} h='100%'>
              <DataTabs data={filterRuns.sort(function (a, b) {
                return parseFloat(a.position) - parseFloat(b.position)
              })} />
            </Box>
          </Flex>
          <Text fontSize={{ base: '25px', lg: '40px', xl: '50px' }} textAlign='center' w={{ base: '60%', lg: '80%' }} id='event_comment_l1'>Have you been to this event before?</Text>
          <Text fontSize={{ base: '25px', lg: '40px', xl: '50px' }} textAlign='center' w={{ base: '60%', lg: '80%' }} id='event_comment_l2'>If so, we'd love to see your pictures and thoughts!</Text>
          <Comments />
        </Flex>
        :
        <Flex justifyContent='center' alignItems='center'><Spinner color='white' /></Flex>
      }

    </>
  )
}

export default SingleEvent