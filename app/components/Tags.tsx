import { IconType } from "react-icons"
import { Icons } from "../lib/Icons"
import { Tag } from "@/components/ui/tag"
import { CommercialClass, Sex, StockClass } from "@prisma/client"


export function SexTag(props: {sex: Sex}) {
  let SexIcon: IconType
  let sexColour: string
  if(props.sex == 'FEMALE'){
      SexIcon = Icons.GiFemale
      sexColour = 'pink.300'
  } else if (props.sex == 'MALE') {
      SexIcon = Icons.GiMale
      sexColour = 'blue.400'
  } else {
      SexIcon = Icons.GiHelp
      sexColour = 'gray.50'
  }
  return (
    <Tag 
      color={sexColour}
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
      color='purple.400'
      startElement={<DesexedIcon />}>
        {desexedText}
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
        color='yellow.200' 
        startElement={<Icons.GiMoneyStack/>}
      >
        {props.commercialClass} 
      </Tag>
    )
  } else if(props.commercialClass == "SEEDSTOCK"){
    return (
      <Tag 
        color={'green.300'} 
        startElement={<Icons.GiSeedling/>}
      >
        {props.commercialClass} 
      </Tag>
    )
  } else if(props.commercialClass == "PET"){
    return (
      <Tag 
        color={'red'} 
        startElement={<Icons.GiPawHeart/>}
      >
        {props.commercialClass}
      </Tag>
    )
  } else {
    return (<></>)
  }
}