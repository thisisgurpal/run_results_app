import React, { useState } from 'react'
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Spinner

} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ImageUpload } from '../helper/ImageUpload'

const Register = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    profile_image: '',
    user_runners: [],
    fav_training: [],
    comments: []
  })

  const [formError, setFormError] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    profile_image: '',
  })
  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value } //Spreading formData makes sure we maintain the data structure of formData
    setFormData(newObj)
    setFormError({ ...formError, [e.target.name]: '' })
  }

  const [alert, setAlert] = useState(false)

  // Saves the token from handleSubmit in the localStorage
  const [imageUploading, setImageUploading] = useState(false)


  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }

  const handleSubmit = async (e) => {
    // if (formData.password && formData.passwordConfirmation && formData.password !== formData.passwordConfirmation)
    //   setFormError({ ...formError, passwordConfirmation: 'passwords don\'t match' })
    console.log(formData)
    e.preventDefault()
    if (formData.profile_image) {
      try {
        const { data } = await axios.post('/api/auth/register/', formData) //Posting the data from the form
        console.log('token', data.token)
        setTokenToLocalStorage(data.token) // pass on the token to the localStorage
        navigate('/login')
      } catch (err) {
        const arr = Object.keys(err.response.data.errors)
        const key = (arr[0])
        setFormError({ [key]: err.response.data.message })
      }
    } else setAlert(true)
    setTimeout(() => {
      setAlert(false)
    }, 2000)
  }

  const handleImageUrl = url => {
    setFormData({ ...formData, profile_image: url })
  }

  return (
    <><Flex minHeight='100vh' width="full" mt='100px' alignItems="flex-start" justifyContent="center">
      <Box background='white' p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="2xl">
        <>
          <Box textAlign="center">
            <Heading>Register</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
                {/* Username */}
              <FormControl isRequired>
                <FormLabel htmlFor='username' mb='1'>Username</FormLabel>
                <Input onChange={handleChange} type="username" name="username" placeholder='Username' defaultValue={formData.username} />
                {formError.username && <Alert status='error' mt={4}>{formError.username}</Alert>}
              </FormControl>
              {/* FirstName */}
              <FormControl isRequired>
                <FormLabel htmlFor='first_name' mb='1'>Firstname</FormLabel>
                <Input onChange={handleChange} type="first_name" name="first_name" placeholder='Firstname' defaultValue={formData.first_name} />
                {formError.first_name && <Alert status='error' mt={4}>{formError.first_name}</Alert>}
              </FormControl>
              {/* LastName */}
              <FormControl isRequired>
                <FormLabel htmlFor='last_name' mb='1' mt={2}>Lastname</FormLabel>
                <Input onChange={handleChange} type="last_name" name="last_name" placeholder='Lastname' defaultValue={formData.last_name} />
                {formError.last_name && <Alert status='error' mt={4}>{formError.last_name}</Alert>}
              </FormControl>
              {/* Email */}
              <FormControl isRequired>
                <FormLabel htmlFor='email' mt={2} mb='1'>Email</FormLabel>
                <Input onChange={handleChange} type="email" name="email" placeholder='Email' defaultValue={formData.email} />
                {formError.email && <Alert status='error' mt={4}>{formError.email}</Alert>}
              </FormControl>
              {/* Password */}
              <FormControl isRequired mt={2} mb='1'>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input onChange={handleChange} type="password" name="password" placeholder='Password' defaultValue={formData.password} />
                {formError.password && <Alert status='error' mt={4}>{formError.password}</Alert>}
              </FormControl>
              {/* Password Confirmation */}
              <FormControl isRequired mt={2}>
                <FormLabel htmlFor='password_confirmation'>Password Confirmation</FormLabel>
                <Input onChange={handleChange} type="password" name="password_confirmation" placeholder='Password Confirmation' defaultValue={formData.password_confirmation} />
                {formError.password_confirmation && <Alert status='error' mt={4}>{formError.password_confirmation}</Alert>}
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel htmlFor='picture'>Add Profile Picture</FormLabel>
                <ImageUpload
                  value={formData.profile_image}
                  name='picture'
                  handleImageUrl={handleImageUrl}
                  setImageUploading={setImageUploading} />
              </FormControl>
              {/* Error + Button */}
              {!imageUploading ?
                <Button type="submit" background='black' color='white' width="full" mt={4}>Register</Button>
                :
                <Spinner mt='4' />
              }
              {alert &&
                <Alert status='error'>
                  <AlertIcon />
                  Please upload a profile photo
                </Alert>
              }
            </form>
          </Box>
        </>
      </Box>
    </Flex>
</>
  )
}

export default Register