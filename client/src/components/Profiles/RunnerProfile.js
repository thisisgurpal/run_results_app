import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { Image, Button, Select, Tabs, TabPanels, TabList, TabPanel, Tab, Avatar, Flex, Box, Text } from '@chakra-ui/react'
import { getTokenFromLocalStorage, userIsAuthenticated } from '../helper/auth'
  import Heart from "react-animated-heart";

function RunnerProfile() {

  const [runnerData, setRunnerData] = useState({})
  const [runData, setRunData] = useState({})
  const { runnerID } = useParams()
  const [profileData, setProfileData] = useState({})
  const [favouriteRunner, setFavouriteRunner] = useState('')
  const [isClick, setClick] = useState();

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/runners/${runnerID}/`) // * <-- replace with your endpoint
      console.log(data)
      setRunnerData(data)
    }
    getData()
  }, [runnerID])

  useEffect(() => {
    if (userIsAuthenticated()) {
      const getData = async () => {
        const { data } = await axios.get(`/api/auth/profile/`, {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          }
        }) // * <-- replace with your endpoint
        console.log(data)
        setProfileData(data)
        if (data.user_runners.every(runner => parseInt(runner.runners.id) !== parseInt(runnerID))) {
          setFavouriteRunner('Favourite')
          setClick(false)
        } else {
          setFavouriteRunner('Unfavourite')
          setClick(true)
        }
      }
      getData()
    }
  }, [runnerID, isClick])

  useEffect(() => {

  }, [])
  // useEffect(() => {
  //   if (Object.keys(profileData).length && profileData.user_runners.some(runner => runner.id === runnerID)){
  //     setFavouriteRunner('Unfavourite')
  //   } else {
  //     setFavouriteRunner('Favourite')
  //   }
  // }, [profileData, runnerID])

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

  const favouriteRunnerFunc = async (e) => {
    e.preventDefault()
    if (isClick === true) {
      // console.log(e.target.value)
      const id_to_delete = profileData.user_runners.filter(runner => parseInt(runner.runners.id) === parseInt(runnerID))[0].id
      try {
        const token = localStorage.getItem('tinyhabits-token')
        console.log(token)
        await axios.delete(`/api/user_runners/${id_to_delete}/`, {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          }
        }) //Posting the data from the form
        // setFavouriteRunner('Favourite')
        setClick(false)
      } catch (err) {
        console.log(err.response)
      }
    } else if (isClick === false) {
      // console.log(e.target.value)
      const fav_runner_to_post = {
        runners: runnerID
      }
      await axios.post(`/api/user_runners/`, fav_runner_to_post, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        }
      }) // * <-- replace with your endpoint
      setFavouriteRunner('Unfavourite')
      setClick(true)
    }
  }

  const removeFavouriteRunner = async (e) => {
    e.preventDefault()

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
              {/* <Avatar
                borderRadius='full'
                boxSize='80px'
                src={runnerData.profile_image !== '' ? runnerData.profile_image : ''}
                alt='profile picture' /> */}
            </Flex>
            <Text color='#fff' id='runner_name_title' textAlign='center'>{runnerData.first_name + ' ' + runnerData.last_name}</Text>
          </Box>
          {userIsAuthenticated() && <div value={isClick} className="App">
          {/* <Button value={favouriteRunner} onClick={favouriteRunnerFunc}> */}
            <Heart isClick={isClick} onClick={favouriteRunnerFunc} />
          {/* </Button> */}
      </div>}
          
          <Flex direction='column' justifyContent='center' alignItems='center'>
            <Box width='800px' h='1000px'>
              <Flex backgroundColor='#101010' p='20px' borderRadius='20px' ml='2' direction='column' flexWrap='wrap' width='100%' h='100%'>
                {runData.map(run => {
                  return (
                    <Box key={run.event.id} display='flex' justifyContent='space-between' h='150px' mt='20px'>
                      <Link className='runner_page_event_link' key={run.event.id} to={`/events/${run.event.id}`}>
                        <hr color='white' w='100%' h='1px' />
                        <Flex name="actions" p='4' mb='5' color='white' h='100%' flexDirection='row' alignItems='center' justifyContent='space-between'>
                          {/* <Image mr='10' src={run.event.event_image} h='100%' alt=''></Image> */}
                          <div id='events_small'>
                            {run.event.name} <Text>{run.year}</Text>
                          </div>
                          <Box h='120px' w='300px' backgroundColor='#fff' borderRadius='5px' >
                            <Flex h='100%' p='10px' direction='column' justifyContent='center' alignItems='center'>
                              <Box display='flex'>
                                <Text w='100%' fontSize='30px' color='black' textAlign='center'>
                                  {new Date(((run.hours * 60 * 60) + (run.minutes * 60) + run.seconds) * 1000).toISOString().substr(11, 8)}
                                </Text>
                              </Box>
                              <Box display='flex'>
                                <Text fontSize='30px' id='runner_page_position' fontWeight='bold' w='100%' color='black' textAlign='center' >Postion: {run.position}</Text>
                              </Box>
                            </Flex>
                          </Box>
                        </Flex>
                      </Link>
                    </Box>
                  )
                })}
                <hr color='white' w='100%' h='1px' />
              </Flex>
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