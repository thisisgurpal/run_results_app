import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Image, Box, Text, Textarea, Flex, Avatar, Heading, Button, Spinner, Alert, AlertIcon } from '@chakra-ui/react'
import { userIsAuthenticated, getTokenFromLocalStorage } from './helper/auth'
import axios from 'axios'
import { ImageUpload } from './helper/ImageUpload'
import { Link } from 'react-router-dom'

const Comments = () => {
  const [commentFormData, setCommentFormData] = useState({
    description: '',
    comment_image: '',
    event: null
  })
  const [formErrors, setFormErrors] = useState({
    description: '',
    comment_image: '',
    event: ''
  })
  const [comments, setComments] = useState(null)
  const [hasError, setHasError] = useState({ error: false, message: '' })
  const { eventId } = useParams()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [profileData, setProfileData] = useState({})
  const [commentDeleted, setCommentDeleted] = useState(false)

  const handleImageUrl = url => {
    setCommentFormData({ ...commentFormData, comment_image: url })
    setFormSubmitted(false)
    setCommentDeleted(false)
  }

  useEffect(() => {
    const getAllComments = async () => {
      try {
        const { data } = await axios.get(`/api/comments/`)
        setComments(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getAllComments()
  }, [formSubmitted, commentDeleted])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const post_commentFormData = { ...commentFormData, event: parseInt(eventId) }
    try {
      await axios.post(`/api/comments/`, post_commentFormData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        }
      })
      setFormSubmitted(true)
      setCommentFormData({
        description: '',
        comment_image: '',
        event: null
      })
    } catch (err) {
      setFormErrors(err.response.data.errors)
    }
  }

  const handleInputChange = (e) => {
    setCommentFormData({
      description: e.target.value
    })
    setFormSubmitted(false)
    setCommentDeleted(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormSubmitted(false)
    }, 1000)
    return () => clearTimeout(timer);
  }, [formSubmitted])

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

  const generateDate = (comment) => {
    if (new Date(comment.created_at).toLocaleDateString() === new Date().toLocaleDateString()) return 'Today'
    if (new Date(comment.created_at).getDate() === new Date().getDate() - 1) return 'Yesterday'
    else return new Date(comment.created_at).toLocaleDateString()
  }
  console.log('comments', comments)
  return (
    <>
      {userIsAuthenticated() &&
        <>
          <Box mt='6' p='4' backgroundColor='#101010' w='50%' boxShadow='base' rounded='md'>
            <form onSubmit={handleSubmit}>
              <Text mb='8px' color='#fff' >Join the conversation</Text>
              <Textarea h='120px' backgroundColor='#FFFFFF'
                value={commentFormData.description}
                onChange={handleInputChange}
                placeholder='Leave a comment'
              />
              <Flex mt='5' direction='column'>
                <ImageUpload
                  value={commentFormData.comment_image}
                  name='picture'
                  handleImageUrl={handleImageUrl}
                  setImageUploading={setImageUploading} />
                {!imageUploading ?
                  <Flex justifyContent='center' alignItems='center'>
                    <Button mt='5' backgroundColor='#FFBF00' h='50px' w='130px' color='black' type='submit'>Comment</Button>
                  </Flex>

                  :
                  <Spinner color='white' mt='4' />
                }
              </Flex>
            </form>
            {formSubmitted &&
              <Alert mt='4' status='success'>
                <AlertIcon />
                Comment submitted!
              </Alert>
            }
          </Box>
        </>
      }
      {comments ?
        <Box mt='6' p='4' w='50%' background='#101010' rounded='lg'>

          <Text color='#fff' mb='4'>Comments</Text>
          {comments.length ?
            comments.sort(function (a, b) {
              return new Date(b.created_at) - new Date(a.created_at)
            }).map(comment => {
              return (
                <Flex key={comment.id} direction='column'>
                  <hr color='white' width='100%' height='1px' />
                  <Flex rounded='md' w='100%' mt='5'>
                    <Link to={`/profile/${comment.user.id}`}></Link>
                    <Box w='100%'>

                      <Flex w='100%' direction='column'>
                        <Flex mb='2' justifyContent='space-between'>
                          <Flex alignItems='center'>
                            <Link to={`/profile/${comment.user.id}`}>
                              <Avatar src={comment.user.profile_image} size='md' />
                            </Link>
                            <Flex alignItems='center'>
                              <Link to={`/profile/${comment.user.id}`}>
                                <Text ml='3' fontSize={{ base: '10px', sm: '15px', md: '18px', xl: '20px' }} color='white' mr='2'>
                                  {`${comment.user.first_name + ' ' + comment.user.last_name} `}
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
        </Box>
        : hasError.error ? (
          <Alert status='error'>
            <AlertIcon />
            {hasError.message}
          </Alert>) : <Spinner color='white' />
      }
    </>
  )
}

export default Comments