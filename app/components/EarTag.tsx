import { Box } from "@chakra-ui/react"
import { VisualIdColour } from "@prisma/client"


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
  return (
    <Box>
      <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"  width="140" height="140">
        <g transform="translate(5,5)">
          <polygon points="5,130 1,128 0,125 0,70 1,65 4,60 35,45 38,43 40,40 40,10 42,4 45,2 50,1 55,2 58,4 60,10 60,40 62,43 65,45 95,60 99,65 100,70 100,125 99,128 95,130 " 
            fill={props.tagColour}/>
          <circle cx="50" cy="10" r="5" fill="black" />
            <svg viewBox="15 -15 125 125" width="130" height="130">
              <g>
                <text x="50%" y='55px'  fontSize={16} textAnchor="middle">{props.text.line1}</text>     
                <text x="50%" y='70px'  fontSize={16} textAnchor="middle" >{props.text.line2}</text>      
                <text x="50%" y='105px' fontSize={42} fontWeight="bold" textAnchor="middle">{props.text.line3}</text>      
              </g>
            </svg>
          </g>
      </svg>
    </Box>
  )
}