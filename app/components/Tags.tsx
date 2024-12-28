import { IconType } from "react-icons"
import { Icons } from "../lib/Icons"
import { Tag } from "@/components/ui/tag"
import { CommercialClass, Sex, StockClass } from "@prisma/client"


export function SexTag(props: {sex: Sex}) {
  let SexIcon: IconType
  let sexColour: string
  if(props.sex == 'FEMALE'){
      SexIcon = Icons.GiFemale
      sexColour = 'pink'
  } else if (props.sex == 'MALE') {
      SexIcon = Icons.GiMale
      sexColour = 'blue'
  } else {
      SexIcon = Icons.GiHelp
      sexColour = 'white'
  }
  return (
    <Tag 
      colorScheme={sexColour}
      startElement={<SexIcon />}>
        {props.sex}
    </Tag>
  )
}

export function DesexedTag(props: {desexed: boolean, sex: Sex}) {
  let DesexedIcon: IconType
  let desexedText: String
  if(props.desexed){
      DesexedIcon = Icons.HiScissors
      desexedText = "DESEXED"
  } else {
      if (props.sex == 'MALE'){
          DesexedIcon = Icons.GiBull
          desexedText = "INTACT"
      } else {
          return
      }
  }
  return (
    <Tag 
      colorScheme='green'
      startElement={<DesexedIcon />}>
    </Tag>
  )
}

export function StockClassTag(props: {stockClass: StockClass}) {
  if(props.stockClass == "CATTLE"){
    return (   
      <Tag 
        color='burlywood'
        startElement={<Icons.GiCow />}>
          {props.stockClass}
      </Tag>
    )
  } else {
    return (
      <Tag>
        {props.stockClass}
      </Tag>
    )
  }
}

export function CommercialClassTag(props: {commercialClass: CommercialClass}) {
  if(props.commercialClass == "COMMERCIAL"){
    return (
      <Tag 
        colorScheme={'yellow'} 
        startElement={<Icons.GiMoneyStack/>}
      >
        {props.commercialClass} 
      </Tag>
    )
  } else if(props.commercialClass == "SEEDSTOCK"){
    return (
      <Tag 
        colorScheme={'teal'} 
        startElement={<Icons.GiSeedling/>}
      >
        {props.commercialClass} 
      </Tag>
    )
  } else if(props.commercialClass == "PET"){
    return (
      <Tag 
        colorScheme={'red'} 
        startElement={<Icons.GiPawHeart/>}
      >
        {props.commercialClass}
      </Tag>
    )
  } else {
    return (<></>)
  }
}