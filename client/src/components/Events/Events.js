import { useState, useEffect } from "react";
import axios from 'axios'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from '@chakra-ui/react'

function Events() {
  const [ eventsData, setEventsData ] = useState({})

useEffect(() => {
    const getEvents = async () => {
      const { data } = await axios.get('/api/events/') // * <-- replace with your endpoint
      console.log(data)
      setEventsData(data)
    }
    getEvents()
  }, [])

  function DataTabs({ data }) {
    return (
      <Tabs variant='enclosed' w='80%'>
        <TabList>
          {data.map((tab, index) => (
            <Tab key={index}>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {data.map((tab, index) => (
            <TabPanel p={4} key={index}>
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    )
  }

  // 2. Create an array of data
  const tabData = [
    {
      label: 'Nigerian Jollof',
      content: 'Perhaps the greatest dish ever invented.',
    },
    {
      label: 'Pounded Yam & Egusi',
      content:
        'Perhaps the surest dish ever invented but fills the stomach more than rice.',
    },
  ]

  return (
    <>
    {Object.keys(eventsData).length ?
    eventsData.map(event => {
      return (
        <h1 key={event.id}>{event.name}</h1>   
      )
    })
    :
    ''
  }
  <Flex direction='column' justifyContent='center' alignItems='center'>
  <DataTabs data={tabData} />
  </Flex>
  
   </> 
  )
}

export default Events



