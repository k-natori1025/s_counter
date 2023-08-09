import React from 'react'
import { useState } from 'react'
import { Container, Grid, TextField, Box, Button } from '@mui/material'
import axios from 'axios'
import { API_HOST } from '../constants'

function AddPost(props) {

  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
  const [preview, setPreview] = useState("")

  const addPost = async (event) => {
    console.log("イベント発火")
    event.preventDefault()
    const data = await createFormData()

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    axios.post(`${API_HOST}/api/v1/posts`, data, config,
      // { withCredentials: true }
    ).then(resp=> {
        console.log('registration response', resp)
        console.log(resp.data)
        const newPost = resp.data
        console.log('newPostです', newPost)
        props.setPosts([newPost, ...props.posts])
        setContent("")
        setImage("")
        setPreview("")
    }).catch(e => {
        console.log(e)
    })
    event.preventDefault()
  }

  const onFileInputChange = (e) => {
    const file = e.target.files[0]
    console.log(file)
    setPreview(window.URL.createObjectURL(file))
    const imageName = e.target.files[0].name
    console.log(imageName)
    setImage(file)
  }

  const createFormData = () => {    
    const formData = new FormData()    
    formData.append('post[content]', content)      
    formData.append('post[image]', image)
    formData.append('post[store_id]', props.store.id)
    console.log(formData)
    return formData
  }

  return (<>
    <Container component="section" maxWidth="lg" sx={{ mt:2 }} >
      <Box 
        component="form" 
        backgroundColor="white" 
        onSubmit={addPost} 
        encType='multipart/form_data'
        sx={{p:5, display: "flex", justifyContent: "center", borderRadius: 2}} 
      >
        <Grid container sx={{width: "80%"}} >
          <Grid item sm={12} >
            <TextField
              multiline
              fullWidth
              rows={4}
              name="content"
              label="投稿内容を入れてください"
              value={content}
              onChange={ event => setContent(event.target.value)} />
          </Grid>
          <Grid item sm={12} >
            添付画像<br/>
            <input type="file" name="file" accept="image/*" onChange={onFileInputChange} /><br/>
            {preview?
              <img src={preview} alt="preview" style={{width: "150px", height: "100px"}} />
              : null}
          </Grid>
          <Grid item sm={12} textAlign="center" sx={{mt:5}} >
            <Button type="submit" variant="contained" sx={{width: "50%", height: "100%" }} >
              投稿する
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  </>)
}

export default AddPost
