import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { Tabs, TabPanels, TabList, TabPanel, Tab, Avatar, Flex, Box, Text } from '@chakra-ui/react'
import { getTokenFromLocalStorage } from '../helper/auth'

function UserProfile() {

  const [profileData, setProfileData] = useState({})

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/auth/profile/`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        }
      }) // * <-- replace with your endpoint
      console.log(data)
      setProfileData(data)
    }
    getData()
  }, [])

  function DataTabs({ data }) {
    return (
      <Tabs variant='enclosed' w='80%'>
        <TabList>
          <Tab>Favourite Training & Nutrition</Tab>
          <Tab>Favourite Runners</Tab>
          <Tab>Comments</Tab>
        </TabList>
        <TabPanels>
          <TabPanel display='flex' alignItems='center' p={4}><Flex direction='column' alignItems='flex-start'>
                  {data.fav_training.map(training => 
                    <Flex alignItems='center' key={training.id}><Link to='/training'>
                      <Text ml='10' fontSize='50px' id='position_name'>{training.training.description}</Text>
                    </Link></Flex>
                    )}
                  </Flex></TabPanel>
                  <TabPanel display='flex' alignItems='center' p={4}><Flex direction='column' alignItems='flex-start'>
                  {data.user_runners.map(runner => 
                    <Flex alignItems='center' key={runner.id}><Link to='/training'>
                      <Text ml='10' fontSize='50px' id='position_name'>{runner.runners.first_name}</Text>
                    </Link></Flex>
                    )}
                  </Flex></TabPanel>
                  <TabPanel display='flex' alignItems='center' p={4}><Flex direction='column' alignItems='flex-start'>
                  {data.comments.map(comment => 
                    <Flex alignItems='center' key={comment.id}><Link to={`/events/${comment.event}`}>
                      <Text ml='10' fontSize='50px' id='position_name'>{comment.description}</Text>
                    </Link></Flex>
                    )}
                  </Flex></TabPanel>
        </TabPanels>
      </Tabs>
    )
  }

  return (
    <>
      {Object.keys(profileData).length ?
        <Flex minHeight='100vh' direction='column' alignItems='center'>
          <Box mt='20'>
            <Flex direction='column' alignItems='center'>
              <Avatar
                borderRadius='full'
                boxSize='80px'
                src={profileData.profile_image !== '' ? profileData.profile_image : ''}
                alt='profile picture' />
            </Flex>
            <Text color='#fff' textAlign='center'>{profileData.first_name + ' ' + profileData.last_name}</Text>
          </Box>
          <Flex direction='column' justifyContent='center' alignItems='center'>
            <Box backgroundColor='white' borderRadius='10px' padding='20px' width='1200px' h='1000px'>
              <DataTabs data={profileData} />
            </Box>
          </Flex>
        </Flex>
        :
        ''
      }
    </>
  )
}

export default UserProfile