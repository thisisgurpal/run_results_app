import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Image, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Box, Heading} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function SingleEvent() {

    const { eventId } = useParams()
    const [ runsData, setRunsData ] = useState({})
    const [ eventData, setEventData ] = useState({})

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
                    runnerID: `${run.runner.id}`
            }})
            console.log(removeDuplicateArrayValues(Object.entries(alterRuns).map(entry => entry[1].year)))
            setRunsData(alterRuns)
          }
          
        }
        getData()
      }, [eventId])

    function DataTabs({ data }) {
        return (
          <Tabs variant='enclosed' w='80%'>
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
                    <Flex alignItems='center' key={run.runnerID}><Text id='position' fontSize='100px'>{run.position}</Text><Link to={`/runner/${run.runnerID}`}>
                      <Text ml='10' fontSize='50px' id='position_name'>{run.name}</Text>
                    </Link><Text ml='10' fontSize='50px' id='position_time'>{run.time}</Text></Flex>
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
  {Object.keys(runsData).length ?
    <Flex minHeight='100vh' direction='column' justifyContent='center' alignItems='center'>
      <Image src={eventData.event_image}></Image>
      <Box backgroundColor='white' borderRadius='10px' padding='20px' width='1200px' h='1000px'>
      <DataTabs data={runsData} />
      </Box>
    
  </Flex>
  :
''
  }
  
  </>
  )
}

export default SingleEvent