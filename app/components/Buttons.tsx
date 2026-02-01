import { Stack, Typography, Button } from "@mui/material"
import { Icons } from "../lib/Icons"


export function DesexButton(props: {desexed: boolean, sex: string}) {
  if (!props.desexed && props.sex == "MALE") {
    return (
      <Button onClick={() => {}}  style={{width:70, height:90}}>
        <Stack direction="column" alignItems="center" justifyContent="center" spacing={1}>
          <Icons.GiScissors style={{width:50, height:50}}/>  
          <Typography>Desex</Typography>
        </Stack>
      </Button>
    )
  } else {
    return (<></>)
  }
}

export function PregButton(props: {sex: string, onOpen: () => void}) {
  if (props.sex == "FEMALE") {
    return (
      <Button onClick={props.onOpen}  style={{width:70, height:90}}>
        <Stack direction="column" alignItems="center" justifyContent="center" spacing={1}>
          <Icons.GiEmbryo style={{width:50, height:50}}/>
          <Typography>Preg</Typography>
        </Stack>
      </Button>
    )
  } else {
    return (<></>)
  }
}