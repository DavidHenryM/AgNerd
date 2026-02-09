import { IconType } from "react-icons"
import { Icons } from "../lib/Icons"
import { Chip } from "@mui/material"
import { CommercialClass, Sex, StockClass } from "@generated/browser"


export function SexChip(props: {sex: Sex}) {
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
    <Chip 
      sx={{backgroundColor: sexColour}}
      icon={<SexIcon />}
      label={props.sex}>
    </Chip>
  )
}

export function DesexedChip(props: {desexed: boolean, sex: Sex}) {
  let DesexedIcon: IconType
  let desexedText: string
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
    <Chip 
      sx={{backgroundColor: 'purple.400'}}  
      icon={<DesexedIcon />}
      label={desexedText}
    />
  )
}

export function StockClassChip(props: {stockClass: StockClass}) {
  if(props.stockClass == "CATTLE"){
    return (   
      <Chip 
        icon={<Icons.GiCow />}
        label={props.stockClass}
      />
    )
  } else {
    return (
      <Chip
        label={props.stockClass}
      />
    )
  }
}

export function CommercialClassChip(props: {commercialClass: CommercialClass}) {
  if(props.commercialClass == "COMMERCIAL"){
    return (
      <Chip 
        icon={<Icons.GiMoneyStack/>}
        label={props.commercialClass}
      />
    )
  } else if(props.commercialClass == "SEEDSTOCK"){
    return (
      <Chip 
        icon={<Icons.GiSeedling/>}
          label={props.commercialClass}
        ></Chip>
    )
  } else if(props.commercialClass == "PET"){
    return (
      <Chip 
        icon={<Icons.GiPawHeart/>}
        label={props.commercialClass}
      ></Chip>
    )
  } else {
    return (<></>)
  }
}