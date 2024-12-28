import { Button } from "@/components/ui/button"
import { VStack, Text } from "@chakra-ui/react"
import { Icons } from "../lib/Icons"


export function DesexButton(props: any) {
  if (!props.desexed && props.sex == "MALE") {
    return (
      <Button onClick={() => {}}  style={{width:70, height:90}}>
        <VStack>
          <Icons.GiScissors style={{width:50, height:50}}/>  
          <Text>Desex</Text>
        </VStack>
      </Button>
    )
  } else {
    return (<></>)
  }
}

export function PregButton(props: any) {
  if (props.sex == "FEMALE") {
    return (
      <Button onClick={props.onOpen}  style={{width:70, height:90}}>
        <VStack>
          <Icons.GiEmbryo style={{width:50, height:50}}/>
          <Text>Preg</Text>
        </VStack>
      </Button>
    )
  } else {
    return (<></>)
  }
}