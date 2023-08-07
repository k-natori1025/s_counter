import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Grid, Card, CardContent, Typography } from '@mui/material'
import axios from 'axios'
import { API_HOST } from '../constants'
import AddPost from './AddPost'

function PostsList(props) {

  const [posts, setPosts] = useState([])
  console.log("postsです", posts)
  
  useEffect(()=> {
    axios.get(`${API_HOST}/api/v1/posts`,
      {params: {store_id: window.sessionStorage.getItem(['store_id']) }}
    )
    .then( resp => {
      const newList = JSON.parse(JSON.stringify(resp.data))
      console.log('newlistです', newList)
      setPosts(newList)
    })
    .catch( e => {
      console.log(e)
    })
  }, [])

  return (<>
    <AddPost store={props.store} posts={posts} setPosts={setPosts} />
    
    <Container component="section" maxWidth="lg" sx={{backgroundColor: "white", mt: 2}} >
      <Grid container >
        { posts.map((post, index)=> {
          <Grid item key={index} sm={12}>
            <Card sx={{ height: 300 }}>
              <CardContent>
                <Typography sx={{ fontSize: '16px'}}>
                  あああ{ post.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        })}
      </Grid>
    </Container>

  </>)
}

export default PostsList
