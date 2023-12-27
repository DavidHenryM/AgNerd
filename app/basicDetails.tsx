"use client"
import {getClient} from './lib/apolloClient';
import {useQuery} from "@apollo/experimental-nextjs-app-support/ssr"
import { gql, useMutation } from '@apollo/client';
import { 
  Box,
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
  Tbody,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  VStack,
  Button,
  Colors,
  Divider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  Input,
  NumberInput,
  RadioGroup,
  Radio,
  Checkbox,
  AlertTitle,
  Alert,
  AlertIcon,
  AlertDescription,
  CircularProgress,
  useToast,
  Center
} from '@chakra-ui/react';
import { GiBull, GiCow, GiFemale, GiHelp, GiMale, GiCardboardBox, GiCorkedTube, GiIceCube, GiMedicines, GiReceiveMoney, GiWeight, GiScissors, GiEmbryo, GiSyringe } from 'react-icons/gi';
import { IconType } from 'react-icons';
import { HiFilter, HiSwitchVertical, HiPlus, HiScissors } from 'react-icons/hi';
import { BeastView } from './beastView';
import { ChangeEventHandler, ReactNode, useState } from 'react';
import { LivestockUnit } from './prisma/generated';
import { DateTime } from 'graphql-scalars/typings/typeDefs';
import { VariableDefinitionNode, DocumentNode, Kind } from 'graphql';
import React from 'react';
import { getActiveLivestockQuery } from './lib/queries';
import { VisualIdColour } from '@prisma/client';
import { createLivestockUnitMutation } from './lib/mutations';


function getAge(birth: any): {
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
    <Box>
      <svg xmlns="http://www.w3.org/2000/svg"  width="140" height="140">
        <g transform="translate(5,5)">
          <polygon points="5,130 1,128 0,125 0,70 1,65 4,60 35,45 38,43 40,40 40,10 42,4 45,2 50,1 55,2 58,4 60,10 60,40 62,43 65,45 95,60 99,65 100,70 100,125 99,128 95,130 " 
            fill={props.tagColour}/>
          <circle cx="50" cy="10" r="5" fill="black" />
          <g transform="translate(-15,15)">
            <svg width="130" height="130">
              <g>
                <text x="50%" y='55px'  fontSize={16} text-anchor="middle">{props.textLine1}</text>     
                <text x="50%" y='70px'  fontSize={16} text-anchor="middle" >{props.textLine2}</text>      
                <text x="50%" y='105px' fontSize={42} fontWeight="bold" text-anchor="middle">{props.textLine3}</text>      
              </g>
            </svg>
          </g>
        </g>
      </svg>
    </Box>
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

function DesexedTag(props: {desexed: boolean, sex: string}) {
  console.log(`Desex status: ${props.desexed}`)
  let DesexedIcon: IconType
  let desexedText: String
  if(props.desexed){
      DesexedIcon = HiScissors
      desexedText = "DESEXED"
  } else {
      if (props.sex == 'MALE'){
          DesexedIcon = GiBull
          desexedText = "INTACT"
      } else {
          return (<></>)
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
  return data.findFirstFarm.name
}

function DesexButton(props: any) {
  if (!props.desexed && props.sex == "MALE") {
    return (
      <Button onClick={() => {}}  style={{width:70, height:90}}>
        <VStack>
          <GiScissors style={{width:50, height:50}}/>  
          <Text>Desex</Text>
        </VStack>
      </Button>
    )
  } else {
    return (<></>)
  }
}

function PregButton(props: any) {
  if (props.sex == "FEMALE") {
    return (
      <Button onClick={() => {}}  style={{width:70, height:90}}>
        <VStack>
          <GiEmbryo style={{width:50, height:50}}/>
          <Text>Preg</Text>
        </VStack>
      </Button>
    )
  } else {
    return (<></>)
  }
}

export function StockPreviewCard(props: {stock: LivestockUnit, index: Number, onClick: ()=>{}}) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  console.log(props.stock)
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
    <Card key={"stockCard" + props.index}>
      <ButtonGroup spacing='2' justifyContent={'right'}>
        <IconButton
          onClick={props.onClick}
          aria-label='Open details'
          icon={<GiCardboardBox />} />
      </ButtonGroup>
      <CardBody>
        <HStack>
          <TagGraphic 
            tagColour={parseColour(props.stock.visualIdBackgroundColour)} 
            textColour={props.stock.visualIdTextColour} 
            textLine1={props.stock.visualIdLine1} 
            textLine2={props.stock.visualIdLine2} 
            textLine3={props.stock.visualIdLine3}
          />
            <VStack>
              <Text fontSize='2xl'>{props.stock.name}</Text>
              <Text>{props.stock.angusTechId}</Text>
              <Text>{props.stock.nlisId}</Text>
              <Text>{`${age.ageYears} ${age.yearSuffix} ${age.ageMonths} ${age.monthSuffix}`}</Text>
              <WeightStats weights={props.stock.weights}/>
            </VStack>
        </HStack>
      </CardBody>
      <CardFooter>
        <VStack>
          <HStack>
            <StockClassTag stockClass={props.stock.class}/>
            <SexTag sex={props.stock.sex}/>
            <DesexedTag desexed={props.stock.desexed} sex={props.stock.sex}/>
          </HStack>
          <Accordion allowMultiple={false} allowToggle={true}>
            <AccordionItem key={"opsAccordian" + props.index}>
              <h2>
                <AccordionButton >
                  <Box as="span" flex='1' textAlign='left'>
                    Operations
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <ButtonGroup spacing='2' justifyContent={'right'}>
                  <Button onClick={() => {}}  style={{width:70, height:90}}>
                    <VStack>
                      <GiSyringe style={{width:50, height:50}}/>  
                      <Text>Treat</Text>
                    </VStack>
                  </Button>
                  <DesexButton desexed={props.stock.desexed} sex={props.stock.sex}/>
                  <PregButton sex={props.stock.sex}/>
                  {/* <Button onClick={() => {}}  style={{width:70, height:90}}>
                    <VStack>
                      <GiReceiveMoney  style={{width:50, height:50}}/>
                      <Text>Sell</Text>
                    </VStack>
                  </Button>
                  <Button onClick={() => {}}  style={{width:70, height:90}}>
                    <VStack>
                      <GiCorkedTube style={{width:50, height:50}}/>
                      <Text>Sample</Text>
                    </VStack>
                  </Button> */}

                  <Button onClick={() => {}}  style={{width:70, height:90}}>
                    <VStack>
                      <GiWeight style={{width:50, height:50}}/>
                      <Text>Weigh</Text>
                    </VStack>
                  </Button>
                </ButtonGroup>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem key={"adminAccordian" + props.index}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    Admin
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Button onClick={() => {setConfirmOpen(true)}}>
                  Deactivate
                </Button>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
      </CardFooter>
    </Card>
  )
}

function SavingData(props: any) {
  const [save, { loading, error, data }] =  useMutation(props.mutation, {variables: props.variables})
  if (data) {
    return (
      <Alert
        status='success'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='200px'
      >
        <AlertIcon boxSize='40px' mr={0} />
        <AlertTitle mt={4} mb={1} fontSize='lg'>New beast added</AlertTitle>
        <AlertDescription maxWidth='sm'>
          Thanks for submitting your application. Our team will get back to you soon.
        </AlertDescription>
      </Alert>
    )
  } else if (loading) {
    return (
      <Alert
        status='loading'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='200px'
      >
        <AlertIcon boxSize='40px' mr={0} />
        <AlertTitle mt={4} mb={1} fontSize='lg'>Saving</AlertTitle>
        <AlertDescription maxWidth='sm'>
          <CircularProgress/>
        </AlertDescription>
      </Alert>
    )
  } else if (error) {
    return (
      <Alert
        status='error'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='200px'
      >
        <AlertIcon boxSize='40px' mr={0} />
        <AlertTitle mt={4} mb={1} fontSize='lg'>New beast NOT added</AlertTitle>
        <AlertDescription maxWidth='sm'>
          Thanks for submitting your application. Our team will get back to you soon.
        </AlertDescription>
      </Alert>
    )
  }
  
}

function ControlBar(props: any) {
  const createNew = useDisclosure()
  const filter = useDisclosure()
  const sort = useDisclosure()
  const [name, setName] = useState('')
  const [angusId, setAngusId] = useState('')
  const [row1, setRow1] = useState('')
  const [row2, setRow2] = useState('')
  const [row3, setRow3] = useState('')
  const [nlis, setNlis] = useState('')
  const [birthDate, setBirthDate] = useState()
  const [sex, setSex] = useState('FEMALE')
  const [desexed, setDesexed] = useState(false)
  const [visualIdBackgroundColour, setVisualIdBackgroundColour] = useState('YELLOW')
  const [visualIdTextColour, setvisualIdTextColour] = useState('BLACK')
  const mutation = gql`
    mutation Mutation($data: LivestockUnitCreateInput!) {
      createOneLivestockUnit(data: $data) {
        name
        angusTechId
        nlisId
      }
    }`
  const variables = {
    "data": {
      "active": true,
      "birthDate": birthDate,
      "angusTechId": angusId,
      "class": "CATTLE",
      "desexed": desexed,
      "sex": sex,
      "visualIdLine1": row1,
      "visualIdLine2": row2,
      "visualIdLine3": row3,
      "visualIdTextColour": visualIdTextColour,
      "visualIdBackgroundColour": visualIdBackgroundColour,
      "nlisId": nlis,
      "name": name,
      }
  }
  const [addBeast, { loading, error, data }] =  useMutation(mutation, {variables}) 

  function SuccessAlert(props:any){
    const toast = useToast()
    if (props.data) {     
      toast.closeAll()
      return (
        toast(
          {
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          }
        )
      )
    } else if (props.loading) {
      toast.closeAll()

      return (
        toast(
          {
            title: 'Saving beast',
            description: "We've created your account for you.",
            status: 'loading',
            duration: 9000,
            isClosable: true,
          }
        )
      )
    } else if (props.error) {
      toast.closeAll()

      return (
        toast(
          {
            title: 'Error.',
            description: "Didn't work",
            status: 'error',
            duration: 9000,
            isClosable: true,
          }
        )
      )
    }
  }
  return (
    <>
      <Card>
        <ButtonGroup padding={'20px'}>
          <Button onClick={createNew.onOpen}>
            <HiPlus/>
          </Button>
          <Button onClick={filter.onOpen}>
            <HiFilter/>
          </Button>
          <Button onClick={sort.onOpen}>
            <HiSwitchVertical/>
          </Button>
        </ButtonGroup>
      </Card>
      <Drawer
        isOpen={sort.isOpen}
        onClose={sort.onClose}
        placement='top'>
          <DrawerOverlay/>
          <DrawerContent bg='blackAlpha.900'>
            <DrawerCloseButton />
            <DrawerHeader>Sort</DrawerHeader>
            <DrawerBody>
            </DrawerBody>
          </DrawerContent>
      </Drawer>
      <Drawer
        isOpen={filter.isOpen}
        onClose={filter.onClose}
        placement='top'>
          <DrawerOverlay/>
          <DrawerContent bg='blackAlpha.900'>
            <DrawerCloseButton />
            <DrawerHeader>Filter</DrawerHeader>
            <DrawerBody>
            </DrawerBody>
          </DrawerContent>
      </Drawer>
      <Drawer
        isOpen={createNew.isOpen}
        placement='top'
        onClose={createNew.onClose}
      >
        <DrawerOverlay/>
        <DrawerContent bg='blackAlpha.900'>
          <DrawerCloseButton />
          <DrawerHeader>Add a beast...</DrawerHeader>

          <DrawerBody>
          <SuccessAlert loading={loading} data={data} error={error}/>
            <Wrap spacing={'50px'}>
              <Card padding={'20px'}>
                <VStack>
                <Text>Name</Text>
                <Input value={name} onChange={(event: any) => setName(event.target.value)}/>
                <Text>Angus Australia ID</Text>
                <Input value={angusId} onChange={(event: any) => setAngusId(event.target.value)}/>
                <Text>NLIS ID</Text>
                <Input value={nlis} onChange={(event: any) => setNlis(event.target.value)}/>
                <Text>Birthdate</Text>
                <Input required={true} type="date" value={birthDate} onChange={(event: any) => setBirthDate(event.target.value)}/>
                <Text>Sex</Text>
                <RadioGroup defaultValue='FEMALE' value={sex} onChange={setSex}>
                  <HStack spacing={5} direction='row'>
                    <Radio colorScheme='pink' value='FEMALE'>
                      Female
                    </Radio>
                    <Radio colorScheme='blue' value='MALE'>
                      Male
                    </Radio>
                  </HStack>
                </RadioGroup>
                <Checkbox isChecked={desexed} onChange={(event: any) => setDesexed(event.target.checked)}>Desexed</Checkbox>
                </VStack>
              </Card>
              <Card padding={'20px'}>
              <VStack>
                <Text fontSize={'lg'}>Visual tag</Text>
                <Text>Background colour</Text>
                <RadioGroup defaultValue='YELLOW' value={visualIdBackgroundColour} onChange={setVisualIdBackgroundColour}>
                  <HStack spacing={5} direction='row'>
                    <Radio colorScheme='yellow' value='YELLOW'>
                      Yellow
                    </Radio>
                    <Radio colorScheme='blue' value='SKY_BLUE'>
                      Blue
                    </Radio>
                  </HStack>
                </RadioGroup>
                <Text>Text colour</Text>
                <RadioGroup defaultValue='BLACK' value={visualIdTextColour} onChange={setvisualIdTextColour}>
                  <HStack spacing={5} direction='row'>
                    <Radio colorScheme='black' value='BLACK'>
                      Black
                    </Radio>
                    <Radio colorScheme='white' value='WHITE'>
                      White
                    </Radio>
                  </HStack>
                </RadioGroup>
                <Text>Row 1 text</Text>
                <Input value={row1} onChange={(event: any) => setRow1(event.target.value)}/>
                <Text>Row 2 text</Text>
                <Input value={row2} onChange={(event: any) => setRow2(event.target.value)}/>
                <Text>Row 3 text</Text>
                <Input value={row3} onChange={(event: any) => setRow3(event.target.value)}/>
                </VStack>
              </Card>
            </Wrap>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={createNew.onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={()=> {addBeast()}}>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}



export function ActiveLivestock(props: any) {
  const {query, variables} = getActiveLivestockQuery()
  let { loading, error, data } = useQuery(query, {variables})
  let [stockFocus, setStockFocus] = useState(null)

  if (loading) {
    // return <CircularProgress/>
    return (
      <Center>
        <CircularProgress/>
      </Center>
    )
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
        <>
        <VStack>
        <ControlBar/>
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
        </VStack>
        </>
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


function parseColour(tagColour: LivestockUnit["visualIdBackgroundColour"] | undefined): string {
  if (tagColour == "SKY_BLUE"){
    return '#03d7fc'
  } else if (tagColour == "YELLOW"){
    return '#fcdf03'
  } else {
    return 'green'
  }

}