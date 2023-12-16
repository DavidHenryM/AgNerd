"use client"
import {getClient} from './lib/apolloClient';
import {useQuery} from "@apollo/experimental-nextjs-app-support/ssr"
import { gql } from '@apollo/client';
import { 
  Card, 
  CardBody, 
  CardHeader,
  CardFooter,
  HStack, 
  Wrap, 
  WrapItem, 
  Text, 
  Stat, 
  StatArrow, 
  StatHelpText, 
  StatLabel, 
  StatNumber, 
  Tag, 
  TagLabel, 
  LinkBox, 
  LinkOverlay, 
  useDisclosure, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter,
  ButtonGroup,
  IconButton, 
  ScaleFade,
  Table,
  Tr,
  Td,
  Tbody
} from '@chakra-ui/react';
import { 
  Stack, 
  Paper, 
  Box, 
  Button, 
  Snackbar, 
  Alert
 } from '@mui/material';
import { GiBull, GiCow, GiFemale, GiHelp, GiMale, GiCardboardBox } from 'react-icons/gi';
import { IconType } from 'react-icons';
import { HiScissors } from 'react-icons/hi';
import { BeastView } from './beastView';
import { useState } from 'react';
import { LivestockUnit } from './prisma/generated';
import { DateTime } from 'graphql-scalars/typings/typeDefs';
import { VariableDefinitionNode, DocumentNode, Kind } from 'graphql';
import React from 'react';
import { getActiveLivestockQuery } from './lib/queries';


function getAge(birth: typeof DateTime): {
  ageYears: number,
  ageMonths: number
  yearSuffix: string,
  monthSuffix: string
}{
  const yearMilliseconds = 3.154e+10
  const monthMilliseconds = yearMilliseconds/12.0
  console.log(yearMilliseconds)
  const now = new Date()
  const birthDate = Date.parse(birth)
  const ageMilliseconds = now.valueOf() - birthDate.valueOf()
  const ageMonthsTotal = Math.floor(ageMilliseconds / monthMilliseconds);
  const ageYears = Math.floor(ageMonthsTotal / 12.0)
  const ageMonthsRemainder = Math.floor(ageMonthsTotal % 12)
  let monthSuffix = 'months'
  if (ageMonthsRemainder == 1) {
    monthSuffix = 'month'
  }
  let yearSuffix = 'years'
  if (ageYears == 1) {
    yearSuffix = 'year'
  }
  console.log(`Age ms: ${ageMilliseconds}, age months total: ${ageMonthsTotal}`)
  return { 
    ageYears: ageYears,
    ageMonths: ageMonthsRemainder, 
    yearSuffix: yearSuffix,
    monthSuffix: monthSuffix
  }
}

function TagGraphic(props: any){
  return (
    <>
    <Box>
      <svg xmlns="http://www.w3.org/2000/svg"  width="140" height="140">
        <g transform="translate(5,5)">
          <polygon points="5,130 1,128 0,125 0,70 1,65 4,60 35,45 38,43 40,40 40,10 42,4 45,2 50,1 55,2 58,4 60,10 60,40 62,43 65,45 95,60 99,65 100,70 100,125 99,128 95,130 " 
            fill='yellow'/>
          <circle cx="50" cy="10" r="5" fill="black" />
          <g transform="translate(-15,15)">
            <svg width="130" height="130">
              <g>
                <text x="50%" y='55px'  fontSize={16} text-anchor="middle">{props.textLine1}</text>     
                <text x="50%" y='70px'  fontSize={16} text-anchor="middle" >{props.textLine2}</text>      
                <text x="50%" y='105px' fontSize={42} text-anchor="middle">{props.textLine3}</text>      
              </g>
          </svg>
</g>
        </g>
      </svg>
    </Box>
    </>
  )
}

function WeightStats(props: any){
  if (props.weights.length > 0){
    let statArrow: "increase" | "decrease" | undefined
    if (props.weights.length > 1) {
      const statChange = props.weights.at(-1).weight - props.weights.at(-2).weight 
      if (statChange >= 0){
        statArrow = "increase"
      } else {
        statArrow = "decrease"
      }
      return (
        <Stat>
          <StatNumber>{props.weights.at(-1).weight + "kg"}</StatNumber>
          <StatHelpText>
              <StatArrow type={statArrow} />
            {String(statChange) + "kg"}
          </StatHelpText>
        </Stat> 
      )
    } else {
      return (
        <Stat>
          <StatNumber>{props.weights.at(-1).weight + "kg"}</StatNumber>
        </Stat>
        )
    }
  } 
}

function SexTag(props: {sex: string}) {
  let SexIcon: IconType
  let sexColour: string
  if(props.sex == 'FEMALE'){
      SexIcon = GiFemale
      sexColour = 'pink'
  } else if (props.sex == 'MALE') {
      SexIcon = GiMale
      sexColour = 'blue'
  } else {
      SexIcon = GiHelp
      sexColour = 'white'
  }
  return (
      <Tag colorScheme={sexColour}>
          <HStack spacing='6px'>
              <SexIcon />
              <TagLabel>{props.sex}</TagLabel>
          </HStack>
      </Tag>
  )
}

function desexedTag(desexed: boolean, sex: string) {
  let DesexedIcon: IconType
  let desexedText: String
  if(desexed){
      DesexedIcon = HiScissors
      desexedText = "DESEXED"
  } else {
      if (sex == 'MALE'){
          DesexedIcon = GiBull
          desexedText = "INTACT"
      } else {
          return
      }
  }
  return (
      <Tag colorScheme='green'>
          <HStack>
              <DesexedIcon />
              <TagLabel>{desexedText}</TagLabel>
          </HStack>
      </Tag>
  )
}

function StockClassTag(props: any) {
  if(props.stockClass == "CATTLE"){
      return (   
        <Tag color='burlywood'>
          <HStack spacing='6px'>
            <GiCow />
            <TagLabel>{props.stockClass}</TagLabel>
          </HStack>
        </Tag> 
      )
  } else {
      return (
          <Tag>
              <TagLabel>{props.stockClass}</TagLabel>
          </Tag>
      )
  }
}

export function LivestockCount(): Promise<String> {
  const query = gql`
  query Query($where: LivestockUnitWhereInput) {
    aggregateLivestockUnit(where: $where) {
      _count {
        _all
      }
    }
  }`;

  const variables = {
    "where": {
      "active": {
        "equals": true
      }
    }
  }
  const { data } = useQuery(query, {variables})
  // const { data } = await getClient().query({ query: query, variables: variables });
  
  return data.aggregateLivestockUnit._count._all
}

export async function FarmName(): Promise<String> {
  const query = gql`
  query FindFirstFarm {
    findFirstFarm {
      name
    }
  }` 
  const { data } = useQuery(query)

  // const { data } = await getClient().query({ query: query });
  
  return data.findFirstFarm.name
    
}



export function StockPreviewCard(props: {stock: LivestockUnit, index: Number, onClick: ()=>{}}) {
  const age = getAge(props.stock.birthDate)
  let statChange
  let statArrow: "increase" | "decrease" | undefined
  let weightString = "?"
  if (props.stock.weights) {
    if (props.stock.weights.length > 0) {
      weightString = `${props.stock.weights[0].weight}`
      if (props.stock.weights.length > 1){
        statChange = props.stock.weights[0].weight - props.stock.weights[1].weight
        if (statChange) {
          if (statChange >= 0){
            statArrow = "increase"
          } else {
            statArrow = "decrease"
          }
        }
      }
    }
  }
  return (  
    // <Paper>
      <Card key={"stockCard" + props.index}>
        <ButtonGroup spacing='2' justifyContent={'right'}>
          <IconButton
            onClick={props.onClick}
            aria-label='Open details'
            icon={<GiCardboardBox />} />
        </ButtonGroup>
        <CardBody>
          <Stack direction='row'>
            <TagGraphic 
              tagColour={props.stock.visualIdBackgroundColour} 
              textColour={props.stock.visualIdTextColour} 
              textLine1={props.stock.visualIdLine1} 
              textLine2={props.stock.visualIdLine2} 
              textLine3={props.stock.visualIdLine3}
            />
              <Stack direction='column'>
                <Text>{props.stock.name}</Text>
                <Text>{props.stock.angusTechId}</Text>
                <Text>{props.stock.nlisId}</Text>
                <Text>{`${age.ageYears} ${age.yearSuffix} ${age.ageMonths} ${age.monthSuffix}`}</Text>
                <WeightStats weights={props.stock.weights}/>
              </Stack>
          </Stack>
        </CardBody>
      <CardFooter>
        <HStack>
          <StockClassTag stockClass={props.stock.class}/>
          <SexTag sex={props.stock.sex}/>
          {desexedTag(props.stock.desexed, props.stock.sex)}
        </HStack>
      </CardFooter>
      </Card>
  )
}




export function ActiveLivestock(props: any) {
  const {query, variables} = getActiveLivestockQuery()
  const { loading, error, data } = useQuery(query, {variables})
  let [stockFocus, setStockFocus] = useState(null)

  if (loading) {
    // return <CircularProgress/>
    return ('Loading')
  } else if(error) {
    console.log(error)
    return (
      <>
        <p>{error.stack}</p>
      </>
    )
  } else if(data) {
    if (!stockFocus){
      return (
        <Wrap>
          {
            data.livestockUnits.map(
              function(stock: any, index: number){
                return (
                  <WrapItem key={index}>
                    <StockPreviewCard stock={stock} index={index} onClick={async () => setStockFocus(stock)}/>
                  </WrapItem>
                )
              }
            )
          }
        </Wrap>
      )
    } else {
      return (
        <BeastView 
          stock={stockFocus}
          close={() => setStockFocus(null)} />
      )
    }
  }
}


export async function ActiveDrySheepEquivalent() {
  const query = gql`
    query AggregateLivestockUnit($where: LivestockUnitWhereInput) {
      aggregateLivestockUnit(where: $where) {
        _sum {
          drySheepEquivalent
        }
      }
    }`

    const variables = {
      "where": {
        "active": {
          "equals": true
        }
      }
    }
    const { data } = useQuery(query, {variables})

    // const { data } = await getClient().query({ query: query, variables: variables });
    return data.aggregateLivestockUnit._sum.drySheepEquivalent
}
