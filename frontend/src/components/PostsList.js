import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Grid, Card, Typography, CardMedia, Button } from '@mui/material'
import axios from 'axios'
import { API_HOST } from '../constants'
import AddPost from './AddPost'
import Avatar from '@mui/material/Avatar';

function PostsList(props) {

  const [posts, setPosts] = useState([])
  
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

  //時刻を見やすく変更
  const handleToDate=(date)=>{
    date = new Date(date);
    if(date.getMinutes() < 10){
        date = (date.getMonth()%12+1)+"/"+date.getDate()+" "+date.getHours()+":0"+date.getMinutes()
    } else {
        date = (date.getMonth()%12+1)+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()
    }
    return date;
  }

  const removePost = (id, e) => {
    const sure = window.confirm('Are you sure?')
    if(sure) {
      axios.delete(`${API_HOST}/api/v1/posts/${id}`,
        {params: {store_id: window.sessionStorage.getItem(['store_id']) }}
      )
      .then( resp => {
        console.log('削除しました')
        const newList = JSON.parse(JSON.stringify(resp.data))
        console.log(newList)
        setPosts(newList)
      })
      .catch( e => {
        console.log(e)
      })
    }
  }

  return (<>
    <AddPost store={props.store} posts={posts} setPosts={setPosts} />
    
    <Container component="section" maxWidth="lg" >
      <Grid container sx={{p: 5}}>
        { posts.map((post, index)=> (
          <Grid item key={index} sm={12} sx={{backgroundColor: "white", mt: 2, borderRadius: 2 }} >
            <Card sx={{ height: "100%", p: 3}}>
              <Grid container>
                <Grid item sm={8} >
                  <Typography sx={{ fontSize: '16px'}}>
                    { handleToDate(post.created_at) }
                  </Typography>
                  <Grid container>
                    <Grid item sm={2}>
                      <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 60, height: 60 }}>
                        <img src={props.store.image.url} style={{width: 80, height: "auto"}} />
                      </Avatar>
                    </Grid>
                    <Grid item sm={10} sx={{pt: 3}}>
                    <Typography sx={{ fontSize: '18px', mb: 5}}>
                      { props.store.store_name}
                    </Typography>
                    </Grid>
                  </Grid>
                  <Typography sx={{ fontSize: '20px'}}>
                    { post.content}
                  </Typography>
                </Grid>
                  { post.image.url &&
                  <Grid item sm={4} >
                    <CardMedia
                      component="img"
                      image={post.image.url}
                      alt={"投稿画像"}
                      sx={{width: 280, height: "auto"}}
                    />
                  </Grid>
                  }
              </Grid>
              <Grid container justifyContent='end' alignItems='center' sx={{mt: 5, height: 60, pr: 8}}>
                <Button 
                  style={{ color: "white", backgroundColor: "#f44336", width: "30%", height: "100%" }}
                  onClick={ e => removePost(post.id, e)}
                >
                  削除
                </Button>
    </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>

  </>)
}

export default PostsList
