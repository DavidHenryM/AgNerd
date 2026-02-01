import { Background } from "@components/Background";
import { backgroundImages } from "@images/backgrounds";
import { drawerWidth, footerHeight } from "@app/settings";
import { Grid, Paper } from "@mui/material";
import { ReactNode } from 'react';

interface ContentProps {
  children: ReactNode;
  backgroundImageIndex?: number
}

export default function Content({children, backgroundImageIndex}: ContentProps){
  let index
  if (backgroundImageIndex === undefined){
    index = -1
  } else if( backgroundImageIndex >=  backgroundImages.length){
    index = backgroundImages.length - 1
  } else {
    index = backgroundImageIndex
  }

  return (
    <>
    {index >= 0 ?
      <Background image={backgroundImages[index]} /> : null
    }
      <Paper sx={{p:2, backgroundColor: "secondary.main", justifySelf:"center", position: 'relative'}}>
        <Grid 
          container 
          spacing={2} 
          sx={{
            p: {
              sm: 1, 
              md: 2, 
              lg: 10
            }, 
            ml: {
              sm: drawerWidth.sm,
              md: drawerWidth.md,
              lg: drawerWidth.lg
            },
            mb: footerHeight
          }}
        >          
          {children}
        </Grid>
      </Paper>
    </>
  )
}