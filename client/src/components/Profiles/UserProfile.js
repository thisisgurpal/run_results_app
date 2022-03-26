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
          <Tab fontSize={{ base: '10px', sm: '15px', md: '18px', xl: '20px' }}>Favourite Training & Nutrition</Tab>
          <Tab fontSize={{ base: '10px', sm: '15px', md: '18px', xl: '20px' }}>Favourite Runners</Tab>
          <Tab fontSize={{ base: '10px', sm: '15px', md: '18px', xl: '20px' }}>Comments</Tab>
        </TabList>
        <TabPanels>
          <TabPanel display='flex' alignItems='center' p={4}><Flex w='100%' direction='column' alignItems='flex-start'>
            {data.fav_training.map(training =>
              <Flex mt='10px' w='100%' alignItems='center' key={training.training.id}><Link className='fav_runner_link' to={`/training`}>
                <hr border-color='#6c6c6c' color='grey' w='100%' h='1px' />
                <Flex w='100%' alignItems='center'>
                  <Text mt='2' mb='2' textAlign='center' width='100%' id='user_page_links' fontSize={{ base: '15px', sm: '20px', md: '30px', xl: '40px' }}>{training.training.title}</Text>
                </Flex>
              </Link></Flex>
            )}
            <hr color='grey' width='100%' h='1px' />
          </Flex></TabPanel>
          <TabPanel display='flex' alignItems='center' p={4}><Flex w='100%' direction='column' alignItems='flex-start'>
            {data.user_runners.map(runner =>
              <Flex mt='10px' w='100%' alignItems='center' key={runner.id}><Link className='fav_runner_link' to={`/runner/${runner.runners.id}`}>
                <hr border-color='#6c6c6c' color='grey' w='100%' h='1px' />
                <Flex w='100%' alignItems='center'>
                  <Text mt='2' mb='2' textAlign='center' width='100%' id='user_page_links' fontSize={{ base: '15px', sm: '20px', md: '30px', xl: '40px' }}>{runner.runners.first_name + ' ' + runner.runners.last_name}</Text>
                </Flex>
              </Link></Flex>
            )}
            <hr color='grey' width='100%' h='1px' />
          </Flex></TabPanel>
          <TabPanel display='flex' alignItems='center' p={4}><Flex w='100%' direction='column' alignItems='flex-start'>
          {data.comments.length ?
            data.comments.sort(function (a, b) {
              return new Date(b.created_at) - new Date(a.created_at)
            }).map(comment => {
              return (
                <Flex w='100%' key={comment.id} direction='column'>
                  <hr color='white' width='100%' height='1px' />
                  <Flex rounded='md' w='100%' mt='5'>
                    <Link to={`/profile/${comment.user.id}`}></Link>
                    <Box w='100%'>

                      <Flex w='100%' direction='column'>
                        <Flex mb='2' justifyContent='space-between'>
                          <Flex alignItems='center'>
                            <Link to={`/profile/${profileData.id}`}>
                              <Avatar src={profileData.profile_image} size='md' />
                            </Link>
                            <Flex alignItems='center'>
                              <Link to={`/profile/${profileData.id}`}>
                                <Text ml='3' fontSize={{ base: '10px', sm: '15px', md: '18px', xl: '20px' }} color='white' mr='2'>
                                  {`${profileData.first_name + ' ' + profileData.last_name} `}
                                </Text>
                              </Link>
                            </Flex>



                          </Flex>
                          {userIsAuthenticated() && profileData.id === comment.user.id &&
                            <Button id={comment.id} onClick={deleteComment}>Delete</Button>
                          }
                        </Flex>
                        <Text color='grey' mb='2' fontSize={{ base: '8px', sm: '10px', md: '13px', xl: '15px' }} lineHeight='190%'>{`  ${generateDate(comment)} at ${String(comment.created_at).substring(11, 16)}`}</Text>
                      </Flex>
                      <Image borderTopRadius='5px' w='100%' src={comment.comment_image}></Image>
                      <Box backgroundColor='#101010' mb='7' borderBottomRadius='5px' h='100px'>
                        <Text fontSize={{ base: '10px', sm: '15px', md: '18px', xl: '20px' }} color='white' p='5' >{comment.description}</Text>
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
          <Flex direction={{ base: 'column', sm: 'row' }} width={{ base: '300px', sm: '450px', md: '600px', xl: '800px' }} mb='10' alignItems='center' justifyContent='center' mt='20'>
            <Flex direction='column' mr={{ base: '0', sm: '5' }} justifyContent='center' alignItems='center'>
              <Avatar
                borderRadius='full'
                boxSize='80px'
                src={profileData.profile_image !== '' ? profileData.profile_image : ''}
                alt='profile picture' />
            </Flex>
            <Flex alignItems='center'>
              <Text ml={{ base: '0', sm: '5' }} mt={{ base: '5', sm: '0' }} color='#fff' id='user_name_title' fontSize={{ base: '30px', sm: '45px', md: '60px', xl: '80px' }} textAlign='center'>{profileData.first_name + ' ' + profileData.last_name}</Text>
            </Flex>
          </Flex>
          <Flex direction='column' justifyContent='center' alignItems='center'>
            <Box backgroundColor='#101010' borderRadius='10px' padding='20px' width={{ base: '300px', sm: '450px', md: '600px', xl: '800px' }} h='1000px'>
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