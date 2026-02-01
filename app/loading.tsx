'use client'

import { NerdCowboy } from "./components/Images"


import { CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material'

export default function Loading(){
  return (
    <Grid container 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="200vh"
      size={12}
    >
    <Paper>
      <Stack direction="column" justifyContent={"center"} alignItems="center" >
        <NerdCowboy size={100}/>
        <CircularProgress color="primary" />
        <Typography color="primary" variant='h6'>Loading...</Typography>

      </Stack>
    </Paper>
    </Grid>
  )
}