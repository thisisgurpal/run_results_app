import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Select, Image, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Box, Heading} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function SingleEvent() {

    const { eventId } = useParams()
    const [ runsData, setRunsData ] = useState({})
    const [ eventData, setEventData ] = useState({})
    const [ gender, setGender ] = useState('')
    const [ filterRuns, setFilterRuns ] = useState({})

    function removeDuplicateArrayValues(arr) {
      return [ ...new Set(arr) ]
    }

    useEffect(() => {
        const getData = async () => {
          const { data } = await axios.get(`/api/events/${eventId}`) // * <-- replace with your endpoint
          console.log(data)
          setEventData(data)
          if (Object.keys(data.runs).length){
            const alterRuns = data.runs.map(run => {
                return {
                    year: `${run.year}`,
                    position: `${run.position}`,
                    name: `${run.runner.first_name} ${run.runner.last_name}`,
                    time: `${run.hours}:${run.minutes}`,
                    runnerID: `${run.runner.id}`,
                    gender: `${run.runner.gender}`
            }})
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

function genderToggle(e){
  console.log(e.target.value)
setGender(e.target.value)
}

    function DataTabs({ data }) {
        return (
          <Tabs variant='enclosed'>
            <TabList>
              {removeDuplicateArrayValues(Object.entries(data).map(entry => entry[1].year)).map((tab, index) => (
                <Tab key={index}>{tab}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {removeDuplicateArrayValues(Object.entries(data).map(entry => entry[1].year)).map((tab, index) => (
                <TabPanel p={4} key={index}>
                                <Select backgroundColor='white' value={gender} onChange={genderToggle} color='black'>
                            <option value='male'>male</option>
                            <option value='female'>female</option>
                        </Select>
                  <Flex direction='column' alignItems='flex-start'>
                  {data.filter(subdata => subdata.year === tab).map(run =>
<Flex alignItems='center' h='80px' w='100%' key={run.runnerID}><Text id='position' fontSize='60px'>{run.position}</Text><Link to={`/runner/${run.runnerID}`}>
                      <Text ml='10' fontSize='30px' id='position_name'>{run.name}</Text>
                    </Link><Text ml='10' fontSize='30px' id='position_time'>{run.time}</Text></Flex>
                    )}
                  </Flex>
                </TabPanel>
                
              ))}
            </TabPanels>
          </Tabs>
        )
      }

  return (
  <>
  {Object.keys(filterRuns).length ?
    <Flex minHeight='100vh' direction='row' justifyContent='center' alignItems='center'>
      <Box display='flex' justifyContent='center'>
      <Flex backgroundColor='#FFBF00' direction='column' w='40%'>
      <Image w='100%' src={eventData.event_image}></Image>
      <Text fontSize='50px'>{eventData.name}</Text>
      <Text fontSize='20px'>{eventData.description}</Text>
      </Flex>
      <Box backgroundColor='white' borderRadius='10px' padding='20px' width='40%' h='100%'>
      <DataTabs data={filterRuns.sort(function(a, b) {
    return parseFloat(a.position) - parseFloat(b.position)
})} />
      </Box>
      </Box>
      
  </Flex>
  :
<Text>'hi'</Text>
  }
  
  </>
  )
}

export default SingleEvent