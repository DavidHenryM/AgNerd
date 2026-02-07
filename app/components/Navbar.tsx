import { adminNavigation, navigation } from "@app/navigation"
import { Box, Container, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, Typography, useMediaQuery, useTheme} from "@mui/material"
import { useEffect, type Dispatch } from "react"
import { drawerWidth } from "@app/settings"
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@app/assets/nerd_cowboy.png'

export default function Navbar(props: {
  drawerOpen: boolean, 
  darkModeActive: boolean, 
  setDarkModeActive: Dispatch<React.SetStateAction<boolean>>,
  setDrawerOpen: Dispatch<React.SetStateAction<boolean>>
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  useEffect(()=>{
    if (isMobile){
      props.setDrawerOpen(false)
    }
  },[isMobile, props])



  function handleMenuClick(){
    if (isMobile){
      props.setDrawerOpen(false)
    }
  }

  return (
    <>
      {/* <Waiting message="loading user role" open={loading}/> */}
      <Drawer
        sx={{
          display: 'flex', flexDirection: 'column',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: {
              xs: drawerWidth.xsDrawerOpen,
              sm: drawerWidth.smDrawerOpen, 
              md: drawerWidth.md, 
              lg: drawerWidth.lg
            },
            boxSizing: 'border-box',
          },
        }}
        slotProps={{paper: {
          sx: {
            backgroundColor: "secondary.main", // Or any custom hex/color
            color: "primary.main",               // Sets text color
            scrollbarWidth: 'none',
          }
        }}}
        variant="persistent"
        anchor="left"
        open={props.drawerOpen}
      >
      {/* This Box grows to fill all available space, pushing the icon to the far right */}
    <Box sx={{ flexGrow: 1, position: 'absolute', 
      top: 0, 
      left: `${Number(drawerWidth.smDrawerOpen.slice(0, -2)) - 45}px`, 
      zIndex: 1}}>
        { 
          isMobile ? 
            <IconButton color="inherit" onClick={()=>props.setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          : <></>
        }
    </Box>
      <Box sx={{ my: 2, display: "flex", justifyContent: "center", width: "100%" }}>
        <Image width={150} loading="eager" src={logo} alt="AgNerd"/>
      </Box>
        <List>
          {navigation.map((nav) => (
            <ListItem key={nav.label} disablePadding>
              <Link
                href={`/${nav.label.toLocaleLowerCase()}`}
                style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
              >
                <ListItemButton
                  onClick={()=>(handleMenuClick())}
                  sx={{
                    mx: 1,
                    my: 0.5,
                    px: 1.5,
                    py: 1,
                    borderRadius: 2,
                    color: 'primary.main',
                    transition: 'all 150ms ease',
                    '& .MuiListItemIcon-root': {
                      minWidth: 36,
                      color: 'primary.main',
                    },
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'secondary.main',
                      transform: 'translateY(-1px)',
                      boxShadow: 2,
                      '& .MuiListItemIcon-root': {
                        color: 'secondary.main',
                      },
                    },
                  }}
                >
                  <ListItemIcon>
                    <nav.Icon/>
                  </ListItemIcon>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {nav.label}
                  </Typography>
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider/>
        
        <List>
          {adminNavigation.map((nav) => (
            <ListItem key={nav.label} disablePadding>
              <Link
                href={`/${nav.label.toLocaleLowerCase()}`}
                style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
              >
                <ListItemButton
                  onClick={()=>(handleMenuClick())}
                  sx={{
                    mx: 1,
                    my: 0.5,
                    px: 1.5,
                    py: 1,
                    borderRadius: 2,
                    color: 'primary.main',
                    transition: 'all 150ms ease',
                    '& .MuiListItemIcon-root': {
                      minWidth: 36,
                      color: 'primary.main',
                    },
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'secondary.main',
                      transform: 'translateY(-1px)',
                      boxShadow: 2,
                      '& .MuiListItemIcon-root': {
                        color: 'secondary.main',
                      },
                    },
                  }}
                >
                  <ListItemIcon>
                    <nav.Icon/>
                  </ListItemIcon>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {nav.label}
                  </Typography>
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Container sx={{alignItems: "flex-end", marginTop: 'auto', marginBottom: 2}}>
          
        </Container>
      </Drawer>
    </>
  )
}



