import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { Button, Select, Tabs, TabPanels, TabList, TabPanel, Tab, Avatar, Flex, Box, Text } from '@chakra-ui/react'
import { getTokenFromLocalStorage } from '../helper/auth'

function RunnerProfile() {

  const [runnerData, setRunnerData] = useState({})
  const [runData, setRunData] = useState({})
  const { runnerID } = useParams()

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/runners/${runnerID}`) // * <-- replace with your endpoint
      console.log(data)
      setRunnerData(data)
    }
    getData()
  }, [runnerID])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/runs/`) // * <-- replace with your endpoint
      console.log(data.filter(run => parseInt(run.runner.id) === parseInt(runnerID)))
      console.log(data)
      console.log(runnerID)
      setRunData(data.filter(run => parseInt(run.runner.id) === parseInt(runnerID)))
    }
    getData()
  }, [runnerID])

  const addFavouriteRunner = async () => {
    const fav_runner_to_post = {
      runners: runnerID
    }
    await axios.post(`/api/user_runners/`, fav_runner_to_post, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      }
    }) // * <-- replace with your endpoint
}

const removeFavouriteRunner = async (e) => {
  e.preventDefault()
  try {
    const token = localStorage.getItem('tinyhabits-token')
    console.log(token)
    await axios.delete(`/api/user_runners/${runnerID}/`, {
      'headers': {
        'Authorization': 'Bearer ' + token
      }
    }) //Posting the data from the form
  } catch (err) {
    console.log(err.response)
  }
}

  function DataTabs({ data }) {
    return (
      <Tabs variant='enclosed' w='80%'>
        <TabList>
          <Tab>Events Ran</Tab>
        </TabList>
        <TabPanels>
          <TabPanel display='flex' alignItems='center' p={4}><Flex direction='column' alignItems='flex-start'>
                    <Flex alignItems='center'>
                    {/* <Select backgroundColor='white' color='black' placeholder='Select option'>
                            <option value='240'>240</option>
                            <option value='200'>200</option>
                            <option value='150'>150</option>
                            <option value='100'>100</option>
                            <option value='50'>50</option>
                            <option value='26.2'>26.2</option>
                        </Select> */}
                        {data.map(run => 
                    <Flex alignItems='center' key={run.id}>
                      <Link to={`/events/${run.event.id}`}>
                      <Text ml='10' fontSize='50px' id='position_name'>{run.event.name}</Text>
                    </Link>
                    <Text fontSize='50px'>{' (Place: ' + run.position + ', Time: ' + run.hours + ':' + run.minutes + ')'}</Text>
                    {/* <Text ml='10' fontSize='50px' id='position_time'>{run.hours + ':' + run.minutes}</Text> */}
                    </Flex>
                    )}
                        <Link to='/training'>
                      <Text ml='10' fontSize='50px' id='position_name'></Text>
                    </Link></Flex>
                  </Flex></TabPanel>
        </TabPanels>
      </Tabs>
    )
  }
  return (
    <>
      {Object.keys(runnerData).length && Object.keys(runData).length ?
        <Flex minHeight='100vh' direction='column' alignItems='center'>
          <Box mt='20'>
            <Flex direction='column' alignItems='center'>
              <Avatar
                borderRadius='full'
                boxSize='80px'
                src={runnerData.profile_image !== '' ? runnerData.profile_image : ''}
                alt='profile picture' />
            </Flex>
            <Text color='#fff' textAlign='center'>{runnerData.first_name + ' ' + runnerData.last_name}</Text>
          </Box>
          <Button onClick={addFavouriteRunner}>Favourite</Button>
          <Button onClick={removeFavouriteRunner}>Remove Favourite</Button>
          <Flex direction='column' justifyContent='center' alignItems='center'>
            <Box backgroundColor='white' borderRadius='10px' padding='20px' width='1200px' h='1000px'>
              <DataTabs data={runData} />
            </Box>
          </Flex>
        </Flex>
        :
        ''
      }
    </>
  )
}

export default RunnerProfile