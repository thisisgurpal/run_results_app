import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { Tabs, TabPanels, TabList, TabPanel, Tab, Avatar, Flex, Box, Text } from '@chakra-ui/react'
import { getTokenFromLocalStorage } from '../helper/auth'

function RunnerProfile() {

  const [runnerData, setRunnerData] = useState({})

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/runners/`) // * <-- replace with your endpoint
      console.log(data)
      setRunnerData(data)
    }
    getData()
  }, [])

  function DataTabs({ data }) {
    return (
      <Tabs variant='enclosed' w='80%'>
        <TabList>
          <Tab>Favourite Training & Nutrition</Tab>
        </TabList>
        <TabPanels>
          <TabPanel display='flex' alignItems='center' p={4}><Flex direction='column' alignItems='flex-start'>
                    <Flex alignItems='center'><Link to='/training'>
                      <Text ml='10' fontSize='50px' id='position_name'></Text>
                    </Link></Flex>
                  </Flex></TabPanel>
        </TabPanels>
      </Tabs>
    )
  }

  return (
    <>
      {Object.keys(runnerData).length ?
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
          <Flex direction='column' justifyContent='center' alignItems='center'>
            <Box backgroundColor='white' borderRadius='10px' padding='20px' width='1200px' h='1000px'>
              <DataTabs data={runnerData} />
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