import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { Button, Image, Tabs, TabPanels, TabList, TabPanel, Tab, Avatar, Flex, Box, Text } from '@chakra-ui/react'
import { getTokenFromLocalStorage, userIsAuthenticated } from '../helper/auth'


function UserProfile() {

  const [profileData, setProfileData] = useState({})
  const [loggedInUser, setLoggedInUser] = useState({})
  const [commentDeleted, setCommentDeleted] = useState(false)

  const { userId } = useParams()
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/auth/profile/${userId}/`)
      console.log(data)
      setProfileData(data)
      setCommentDeleted(false)
    }
    getData()
  }, [commentDeleted, userId])

  useEffect(() => {
    const getLoggedInUser = async () => {
      const { data } = await axios.get(`/api/auth/profile/`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        }
      })
      setLoggedInUser(data)
    }
    getLoggedInUser()
  }, [])

  const generateDate = (comment) => {
    if (new Date(comment.created_at).toLocaleDateString() === new Date().toLocaleDateString()) return 'Today'
    if (new Date(comment.created_at).getDate() === new Date().getDate() - 1) return 'Yesterday'
    else return new Date(comment.created_at).toLocaleDateString()
  }

  const deleteComment = async (e) => {
    e.preventDefault()
    try {
      await axios.delete(`/api/comments/${e.target.id}/`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        }
      }) //Posting the data from the form
      setCommentDeleted(true)
    } catch (err) {
      console.log(err.response)
    }
  }

console.log(Object.keys(profileData).length && profileData)
  function DataTabs({ data }) {
    return (
      <Tabs variant='enclosed' w='100%'>
        <TabList color='white' >
          <Tab>Favourite Training & Nutrition</Tab>
          <Tab>Favourite Runners</Tab>
          <Tab>Comments</Tab>
        </TabList>
        <TabPanels>
          <TabPanel display='flex' alignItems='center' p={4}><Flex w='100%' direction='column' alignItems='flex-start'>
          {data.fav_training.map(training =>
              <Flex mt='10px' w='100%' alignItems='center' key={training.training.id}><Link class='fav_runner_link' to={`/training`}>
                <hr border-color='#6c6c6c' color='grey' w='100%' h='1px' />
                <Flex w='100%' alignItems='center'>
                  <Text mt='2' mb='2' textAlign='center' width='100%' id='events_small' fontSize='50px'>{training.training.title}</Text>
                </Flex>
              </Link></Flex>
            )}
            <hr color='grey' width='100%' h='1px' />
          </Flex></TabPanel>
          <TabPanel display='flex' alignItems='center' p={4}><Flex w='100%' direction='column' alignItems='flex-start'>
            {data.user_runners.map(runner =>
              <Flex mt='10px' w='100%' alignItems='center' key={runner.id}><Link class='fav_runner_link' to={`/runner/${runner.runners.id}`}>
                <hr border-color='#6c6c6c' color='grey' w='100%' h='1px' />
                <Flex w='100%' alignItems='center'>
                  <Text mt='2' mb='2' textAlign='center' width='100%' id='events_small' fontSize='50px'>{runner.runners.first_name + ' ' + runner.runners.last_name}</Text>
                </Flex>
              </Link></Flex>
            )}
            <hr color='grey' width='100%' h='1px' />
          </Flex></TabPanel>
          <TabPanel display='flex' alignItems='center' p={4}><Flex w='100%' direction='column' alignItems='flex-start'>
            {/* {data.comments.map(comment => 
                    <Flex alignItems='center' key={comment.id}><Link to={`/events/${comment.event}`}>
                      <Text ml='10' fontSize='50px' id='position_name'>{comment.description}</Text>
                    </Link></Flex>
                    )} */}
            {data.comments.length ?
            data.comments.map(comment => {
              return (
                <Flex direction='column' w='100%'>
                  <hr color='white' width='100%' height='1px' />
                  <Flex key={comment.id} rounded='md' w='100%' mt='5'>
                    <Link to={`/profile/${profileData.id}`}></Link>
                    <Box w='100%'>

                      <Flex w='100%' direction='column'>
                        <Flex justifyContent='space-between'>
                        <Flex alignItems='center'>
                          <Avatar src={profileData.profile_image} size='md' />
                          <Flex alignItems='center'>
                            <Text ml='3' fontSize='20px' color='white' mr='2'>
                              {`${profileData.first_name + ' ' + profileData.last_name} `}
                            </Text>
                          </Flex>

                        </Flex>
                        {userIsAuthenticated() && loggedInUser.id === comment.user && 
                        <Button id={comment.id} onClick={deleteComment}>Delete</Button>
                        }
                        </Flex>
                        <Text color='grey' fontSize='15px' lineHeight='190%'>{`  ${generateDate(comment)} at ${String(comment.created_at).substring(11, 16)}`}</Text>
                      </Flex>
                      <Image borderTopRadius='5px' w='100%' src={comment.comment_image}></Image>
                      <Box backgroundColor='white' mb='7' borderBottomRadius='5px' h='100px'>
                        <Text fontSize='20px' color='black' p='5' >{comment.description}</Text>
                      </Box>
                    </Box>
                  </Flex>
                </Flex>

              )

            })

            :
            <Box borderRadius='5px'>
              <Text backgroundColor='white' borderRadius='5px' p='4' >No comments yet</Text>
            </Box>
          }
          </Flex></TabPanel>
        </TabPanels>
      </Tabs>
    )
  }

  return (
    <>
      {Object.keys(profileData).length ?
        <Flex minHeight='100vh' direction='column' alignItems='center'>
          <Box mb='10' display='flex' mt='20'>
            <Flex direction='column' mr='5' justifyContent='center'>
              <Avatar
                borderRadius='full'
                boxSize='80px'
                src={profileData.profile_image !== '' ? profileData.profile_image : ''}
                alt='profile picture' />
            </Flex>
            <Text ml='5' color='#fff' id='user_name_title' textAlign='center'>{profileData.first_name + ' ' + profileData.last_name}</Text>
          </Box>
          <Flex direction='column' justifyContent='center' alignItems='center'>
            <Box backgroundColor='#101010' borderRadius='10px' padding='20px' width='800px' h='1000px'>
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