import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Box, Heading} from '@chakra-ui/react'
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
                <TabPanel p={4} key={index}>
                  {tab.position + ' => '}
                  <Link to='/'>{tab.name}</Link>
                  {' => ' + tab.time}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        )
      }

  return (
  <>
  <h1>Single Event</h1>
  {Object.keys(runsData).length ?
    <Flex direction='column' justifyContent='center' alignItems='center'>
    <DataTabs data={runsData} />
  </Flex>
  :
''
  }
  
  </>
  )
}

export default SingleEvent