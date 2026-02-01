import { Box, Stack, Typography } from "@mui/material"
import { VisualIdColour } from '@generated/browser'




export function EarTagGraphic(
  props: {
    tagColour: string,
    text: {
      colour: VisualIdColour | null, 
      line1: string | null, 
      line2: string | null, 
      line3: string | null
    }
  }
){
  if (props.text.line1 && !props.text.line2 && props.text.line3) {
    const text={
        colour: props.text.colour,
        line1: props.text.line1, 
        line3: props.text.line3
      }
    return <EarTagGraphicLine1And3 tagColour={props.tagColour} text={text}
  />
  } else if (props.text.line1 && props.text.line2 && props.text.line3) {
    const text = {
        colour: props.text.colour,
        line1: props.text.line1,
        line2: props.text.line2,
        line3: props.text.line3
      }
    return (<EarTagGraphicLine1And2And3 tagColour={props.tagColour} text={text} />)
  } else if(!props.text.line1 && !props.text.line2 && props.text.line3) {
    const text={
        colour: props.text.colour,
        line3: props.text.line3
      }
    return (<EarTagGraphicLine3 tagColour={props.tagColour} text={text} />)
  } else {
    return (
    <EarTagGraphicContainer tagColour={props.tagColour} textOffset={25}>
      <></>
    </EarTagGraphicContainer>)
  }
}

function EarTagGraphicLine3( props: {
  tagColour: string,
  text: {
    colour: VisualIdColour | null, 
    line3: string
  }
  }) {
  return (
    <EarTagGraphicContainer tagColour={props.tagColour} textOffset={25}>
      <Typography variant="h4" color={props.text.colour ? props.text.colour : "black"} fontWeight={"bold"}>
        {props.text.line3}
      </Typography>

    </EarTagGraphicContainer>
  )
}

function EarTagGraphicLine1And3( props: {
    tagColour: string,
    text: {
      colour: VisualIdColour | null, 
      line1: string,
      line3: string
    }
  }) {
  return (
    <EarTagGraphicContainer tagColour={props.tagColour} textOffset={25}>
      <Typography variant="h6" color={props.text.colour ? props.text.colour : "black"} fontWeight={"bold"}>
        {props.text.line1}
      </Typography>
      <Typography variant="h4" fontWeight={"bold"} color={props.text.colour ? props.text.colour : "black"}>
        {props.text.line3}
      </Typography>
    </EarTagGraphicContainer>
  )
}

function EarTagGraphicLine1And2And3( props: {
    tagColour: string,
    text: {
      colour: VisualIdColour | null, 
      line1: string,
      line2: string,
      line3: string
    }
  }) {
  return (
    <EarTagGraphicContainer tagColour={props.tagColour} textOffset={25}>
      <Typography variant="h6" color={props.text.colour ? props.text.colour : "black"} fontWeight={"bold"}>
        {props.text.line1}
      </Typography>
      <Typography variant="caption" color={props.text.colour ? props.text.colour : "black"} fontWeight={"bold"}>
        {props.text.line2}
      </Typography>
      <Typography variant="h6" fontWeight={"bold"} color={props.text.colour ? props.text.colour : "black"}>
        {props.text.line3}
      </Typography>
    </EarTagGraphicContainer>
  )
}


function EarTagGraphicContainer(props: {tagColour: string, children: React.ReactNode, textOffset: number}) {
  return (
    <Box
      fontSize={"1em"}
      position="relative"
      color={"black"}
      sx={{ width: 110, height: 140, display: "inline-block" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="110"
        height="140"
        style={{ display: "block" }}
      >
        <g transform="translate(5,5)">
          <polygon points="5,130 1,128 0,125 0,70 1,65 4,60 35,45 38,43 40,40 40,10 42,4 45,2 50,1 55,2 58,4 60,10 60,40 62,43 65,45 95,60 99,65 100,70 100,125 99,128 95,130 " 
            fill={props.tagColour}/>
          <circle cx="50" cy="10" r="5" fill="black" />
        </g>
      </svg>
      <Stack
      spacing={-1}
        alignItems="center"
        position="absolute"
        top={`calc(50% + ${props.textOffset}px)`}
        left="50%"
        sx={{ transform: "translate(-50%, -50%)", width: "100%"}}
      >
        {props.children}
      </Stack>
    </Box>
  )
}