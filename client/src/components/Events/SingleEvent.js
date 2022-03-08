import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Text, Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Box, Heading} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function SingleEvent() {

    const { eventId } = useParams()
    const [ runsData, setRunsData ] = useState({})
    const [ eventData, setEventData ] = useState({})

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
                    time: `${run.hours}:${run.minutes}`
            }})
            setRunsData(alterRuns)
          }
          
        }
        getData()
      }, [eventId])

    function DataTabs({ data }) {
        return (
          <Tabs variant='enclosed' w='80%'>
            <TabList>
              {data.map((tab, index) => (
                <Tab key={index}>{tab.year}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {data.map((tab, index) => (
                <TabPanel display='flex' alignItems='center' p={4} key={index}>
                  <Text id='position' fontSize='100px'>{tab.position}</Text>
                  <Link to='/'><Text ml='10' fontSize='50px' id='position_name'>{tab.name}</Text></Link>
                  <Text ml='10' fontSize='50px' id='position_time'>{tab.time}</Text>
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