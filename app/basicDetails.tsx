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
  CircularProgress,
  ScaleFade,
  Table,
  Tr,
  Td,
  Tbody
} from '@chakra-ui/react';
import { GiBull, GiCow, GiFemale, GiHelp, GiMale, GiCardboardBox } from 'react-icons/gi';
import { IconType } from 'react-icons';
import { HiScissors } from 'react-icons/hi';
import { BeastView } from './beastView';
import { useState } from 'react';


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
          <StatLabel>Live weight</StatLabel>
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
          <StatLabel>Live weight</StatLabel>
          <StatNumber>{props.weights.at(-1).weight + "kg"}</StatNumber>
        </Stat>
        )
    }
  } 
}

function sexTag(sex: string) {
  let SexIcon: IconType
  let sexColour: string
  if(sex == 'FEMALE'){
      SexIcon = GiFemale
      sexColour = 'pink'
  } else if (sex == 'MALE') {
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
              <TagLabel>{sex}</TagLabel>
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

function stockClassTag(stockClass: String) {
  if(stockClass == "CATTLE"){
      return (   
        <Tag color='burlywood'>
          <HStack spacing='6px'>
            <GiCow />
            <TagLabel>{stockClass}</TagLabel>
          </HStack>
        </Tag> 
      )
  } else {
      return (
          <Tag>
              <TagLabel>{stockClass}</TagLabel>
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



export function StockPreviewCard(props: any) {
  let statChange
  let statArrow: "increase" | "decrease" | undefined
  let weight = "?"
  if (props.stock.weights.length > 0) {
    weight = props.stock.weights[0].weight
    if (props.stock.weights.length > 1){
      statChange = props.stock.weights[0] - props.stock.weights[1]
      if (statChange) {
        if (statChange >= 0){
          statArrow = "increase"
        } else {
          statArrow = "decrease"
        }
      }
    }
  }
  return (  
    <>
      <Card key={"stockCard" + props.index}>
        <ButtonGroup spacing='2' justifyContent={'right'}>
          <IconButton
            onClick={props.onClick}
            aria-label='Open details'
            icon={<GiCardboardBox />} />
        </ButtonGroup>
        <CardHeader>
          <Text>{props.stock.name}</Text>
          <Text>{props.stock.angusTechId}</Text>
        </CardHeader>
        <CardBody>
          <Text>{props.stock.nlisId}</Text>
          <WeightStats weights={props.stock.weights}/>
          {/* <Stat>
          <StatLabel>Live weight</StatLabel>
          <StatNumber>{weight + 'kg'}</StatNumber>
          <StatHelpText>
              <StatArrow type={statArrow} />
          {String(statChange) + "kg"}
          </StatHelpText>
        </Stat>  */}
      </CardBody>
      <CardFooter>
        <HStack>
          {stockClassTag(props.stock.class)}
          {sexTag(props.stock.sex)}
          {desexedTag(props.stock.desexed, props.stock.sex)}
        </HStack>
        </CardFooter>
      </Card>
    </>
  )
}

export function ActiveLivestock() {
  const query = gql`
  query LivestockUnits($where: LivestockUnitWhereInput, $orderBy: [WeightRecordOrderByWithRelationInput!]) {
    livestockUnits(where: $where) {
      id
      name
      class
      sex
      visualIdNumber
      visualIdColour
      nlisId
      birthDate
      angusTechId
      active
      weights(orderBy: $orderBy) {
        weight
        dateMeasured
        method
      }
    }
  }`
  const variables = {
    "where": {
      "active": {
        "equals": true
      }
    },
    "orderBy": [
      {
        "dateMeasured": "desc"
      }
    ]
  }
  const { loading, error, data } = useQuery(query, {variables})
  const { isOpen, onToggle, getDisclosureProps } = useDisclosure()
  var [stockFocus, setStockFocus] = useState(null)

  if (loading) {
    return <CircularProgress isIndeterminate/>
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
                    <StockPreviewCard stock={stock} index={index} onClick={() => setStockFocus(stock)}/>
                  </WrapItem>
                )
              }
            )
          }
        </Wrap>
      )
    } else {
      return (
        <BeastView stock={stockFocus} close={() => setStockFocus(null)}/>
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
