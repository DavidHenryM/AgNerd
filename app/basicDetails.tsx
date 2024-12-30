"use client"
import { Icons } from "./lib/Icons"
import { EarTagGraphic } from "./components/EarTag";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
} from "@/components/ui/drawer"
import { Checkbox } from "@/components/ui/checkbox"
import { Radio, RadioGroup } from "@/components/ui/radio"


import {
  Accordion,
  Box,
  Card,
  HStack, 
  Text, 
  useDisclosure, 
  Group,
  IconButton, 
  VStack,
  Button,
  Input,
  CheckboxGroup,
  Link,
  Icon,
} from '@chakra-ui/react';
import { $Enums, LivestockUnit, Prisma } from '@prisma/client'
import prisma from "./lib/prisma"
import { BeastView } from './beastView';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import React from 'react';
import AddWeightDrawer from './components/AddWeightDrawer';
import Loading from './loading';
import { getLivestock } from './queries';
import { getAge, parseColour, sortWeightsByDate } from "./utils/utils";
import { WeightStats } from "./components/Stats";
import { CommercialClassTag, DesexedTag, SexTag, StockClassTag } from "./components/Tags";
import { DesexButton } from "./components/Buttons";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function StockPreviewCard(props: {stock: LivestockUnit, index: Number, onClick: ()=>{}}) {
  const weightDisclosure = useDisclosure()
  const pregDisclosure = useDisclosure()
  const treatDisclosure = useDisclosure()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [stock, setStock] = useState<any>(props.stock)
  const age = getAge(props.stock.birthDate)
  let weightNumber
  let weightString = "?"
  let sortedWeights 
  if (stock.weights) { 
    sortedWeights = sortWeightsByDate(stock.weights)
    if (sortedWeights.at(-1)) {
      weightNumber = sortedWeights.at(-1)?.weight
      weightString = `${weightNumber}`
    }
  return (  
    <>
    <Card.Root key={"stockCard" + props.index}>
      <DialogRoot>
        <Group gap='2' justifyContent={'right'}>
          <DialogTrigger>
            {/* <IconButton
              // onClick={props.onClick}
              aria-label='Open details'
            > */}
              <Icons.GiCardboardBox/>
            {/* </IconButton> */}
          </DialogTrigger>
        </Group>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Beast Details</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <BeastView stock={stock} close={function (): void {
                throw new Error("Function not implemented.");
              } } edit={function (): void {
                throw new Error("Function not implemented.");
              } }/>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button>Save</Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
      <Card.Body>
        <HStack>
          <EarTagGraphic 
            tagColour={parseColour(stock.visualIdBackgroundColour)} 
            text={
              {
                colour: stock.visualIdTextColour,
                line1: stock.visualIdLine1, 
                line2: stock.visualIdLine2, 
                line3: stock.visualIdLine3
              }
            }
          />
            <VStack>
              <Text fontSize='2xl'>{stock.name}</Text>
              <Link href={`https://angus.tech/enquiry/animal/result?page=1&tql=id%20is%20%27${props.stock.angusTechId}%27&title=`}>
                <Text>{stock.angusTechId}</Text>
              </Link>
              <Text>{stock.nlisId}</Text>
              <Text>{`${age.ageYears} ${age.yearSuffix} ${age.ageMonths} ${age.monthSuffix}`}</Text>
              <WeightStats weights={stock.weights}/>
            </VStack>
        </HStack>
      </Card.Body>
      <Card.Footer>
        <VStack>
          <HStack>
            <StockClassTag stockClass={stock.class}/>
            <SexTag sex={stock.sex}/>
            <DesexedTag desexed={stock.desexed} sex={stock.sex}/>
            <CommercialClassTag commercialClass={stock.commercialClass!}/>
          </HStack>
          <Accordion.Root multiple={false}>
            <Accordion.Item key={"opsAccordian" + props.index} value="opsAccordian">
              <h2>
                <Accordion.ItemTrigger>
                  <Box as="span" flex='1' textAlign='left'>
                    Operations
                  </Box>                  
                </Accordion.ItemTrigger>
              </h2>
              {/* <Accordion.Panel pb={4}> */}
                <Group gap='2' justifyContent={'right'}>
                  <Button onClick={treatDisclosure.onOpen} style={{width:70, height:90}}>
                    <VStack>
                      <Icons.GiSyringe style={{width:50, height:50}}/>  
                      <Text>Treat</Text>
                    </VStack>
                  </Button>
                  <DesexButton desexed={props.stock.desexed} sex={props.stock.sex}/>
                  <Button onClick={pregDisclosure.onOpen}  style={{width:70, height:90}}>
                    <VStack>
                      <Icons.GiEmbryo style={{width:50, height:50}}/>
                      <Text>Preg</Text>
                    </VStack>
                  </Button>                  
                  <Button onClick={weightDisclosure.onOpen}  style={{width:70, height:90}}>
                    <VStack>
                      <Icons.GiWeight style={{width:50, height:50}}/>
                      <Text>Weigh</Text>
                    </VStack>
                  </Button>
                </Group>
              {/* </AccordionPanel> */}
            </Accordion.Item>
            <Accordion.Item key={"adminAccordian" + props.index} value="adminAccordian">
              <h2>
                <Button>
                  <Box as="span" flex='1' textAlign='left'>
                    Admin
                  </Box>
                </Button>
              </h2>
              {/* <AccordionPanel pb={4}> */}
                <Button onClick={() => {setConfirmOpen(true)}}>
                  Deactivate
                </Button>
              {/* </AccordionPanel> */}
            </Accordion.Item>
          </Accordion.Root>
        </VStack>
      </Card.Footer>
    </Card.Root>
      <AddWeightDrawer stock={stock} setStock={setStock} open={weightDisclosure.open} onOpenChange={weightDisclosure.onClose}/>
      <DrawerRoot
        open={treatDisclosure.open}
        onOpenChange ={treatDisclosure.onClose}
        >
          <DrawerBackdrop/>
          <DrawerContent bg='blackAlpha.900'>
            <DrawerCloseTrigger />
            <DrawerHeader>Record treatment</DrawerHeader>
            <DrawerBody>
            </DrawerBody>
          </DrawerContent>
      </DrawerRoot>
      <DrawerRoot
        open={pregDisclosure.open}
        onOpenChange ={pregDisclosure.onClose}
        >
          <DrawerBackdrop/>
          <DrawerContent bg='blackAlpha.900'>
            <DrawerCloseTrigger />
            <DrawerHeader>Record reproductive event</DrawerHeader>
            <DrawerBody>
            </DrawerBody>
          </DrawerContent>
      </DrawerRoot>
    </>
  )
} else {
  return (<Loading/>)
}
}

// function SavingData(props: any) {
//   const [save, { loading, error, data }] =  useMutation(props.mutation, {variables: props.variables})
//   if (data) {
//     return (
//       <Alert
//         status='success'
//         variant='subtle'
//         flexDirection='column'
//         alignItems='center'
//         justifyContent='center'
//         textAlign='center'
//         height='200px'
//       >
//         <AlertIcon boxSize='40px' mr={0} />
//         <AlertTitle mt={4} mb={1} fontSize='lg'>New beast added</AlertTitle>
//         <AlertDescription maxWidth='sm'>
//           Thanks for submitting your application. Our team will get back to you soon.
//         </AlertDescription>
//       </Alert>
//     )
//   } else if (loading) {
//     return (
//       <Alert
//         status='loading'
//         variant='subtle'
//         flexDirection='column'
//         alignItems='center'
//         justifyContent='center'
//         textAlign='center'
//         height='200px'
//       >
//         <AlertIcon boxSize='40px' mr={0} />
//         <AlertTitle mt={4} mb={1} fontSize='lg'>Saving</AlertTitle>
//         <AlertDescription maxWidth='sm'>
//           <CircularProgress isIndeterminate/>
//         </AlertDescription>
//       </Alert>
//     )
//   } else if (error) {
//     return (
//       <Alert
//         status='error'
//         variant='subtle'
//         flexDirection='column'
//         alignItems='center'
//         justifyContent='center'
//         textAlign='center'
//         height='200px'
//       >
//         <AlertIcon boxSize='40px' mr={0} />
//         <AlertTitle mt={4} mb={1} fontSize='lg'>New beast NOT added</AlertTitle>
//         <AlertDescription maxWidth='sm'>
//           Thanks for submitting your application. Our team will get back to you soon.
//         </AlertDescription>
//       </Alert>
//     )
//   }
  
// }

export function ControlBar(props: {setFilter: Dispatch<SetStateAction<string>>}) {
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
  // const mutation = gql`
  //   mutation Mutation($data: LivestockUnitCreateInput!) {
  //     createOneLivestockUnit(data: $data) {
  //       name
  //       angusTechId
  //       nlisId
  //     }
  //   }`
  // const variables = {
  //   "data": {
  //     "active": true,
  //     "birthDate": birthDate,
  //     "angusTechId": angusId,
  //     "class": "CATTLE",
  //     "desexed": desexed,
  //     "sex": sex,
  //     "visualIdLine1": row1,
  //     "visualIdLine2": row2,
  //     "visualIdLine3": row3,
  //     "visualIdTextColour": visualIdTextColour,
  //     "visualIdBackgroundColour": visualIdBackgroundColour,
  //     "nlisId": nlis,
  //     "name": name,
  //     }
  // }
  // let [addBeast, { loading, error, data }] =  useMutation(mutation, {variables}) 
  // const beastCount = getActiveCount()

  return (
    <>
      <Card.Root>
        <Group gap={'20px'}>
          <Button onClick={createNew.onOpen}>
            <Icons.HiPlus/>
          </Button>
          <Button onClick={filter.onOpen}>
            <Icons.HiFilter/>
          </Button>
          <Button onClick={sort.onOpen}>
            <Icons.HiSwitchVertical/>
          </Button>
        </Group>
      </Card.Root>
      <DrawerRoot
        open={sort.open}
        onOpenChange ={sort.onClose}
        placement='top'>
          <DrawerBackdrop/>
          <DrawerContent bg='blackAlpha.900'>
            <DrawerCloseTrigger />
            <DrawerHeader>Sort</DrawerHeader>
            <DrawerBody>
            </DrawerBody>
          </DrawerContent>
      </DrawerRoot>
      <DrawerRoot
        open={filter.open}
        onOpenChange={filter.onClose}
        placement='top'>
          <DrawerBackdrop/>
          <DrawerContent bg='blackAlpha.900'>
            <DrawerCloseTrigger />
            <DrawerHeader>Filter</DrawerHeader>
            <DrawerBody>
            <CheckboxGroup colorScheme='green'>
              <HStack wrap={"wrap"}>
                {
                  Object.keys($Enums.CommercialClass).map((key: any)=>{
                    return (
                      <Checkbox key={key} value='key'>{key} onChange(()={})</Checkbox>
                    )
                  })
                }
              </HStack>
            </CheckboxGroup>
            </DrawerBody>
          </DrawerContent>
      </DrawerRoot>
      <DrawerRoot
        open={createNew.open}
        placement='top'
        onOpenChange={createNew.onClose}
      >
        <DrawerBackdrop/>
        <DrawerContent bg='blackAlpha.900'>
          <DrawerCloseTrigger />
          <DrawerHeader>Add a beast...</DrawerHeader>

          <DrawerBody>
          {/* <SuccessAlert operation={`Adding a beast`} loading={loading} data={data} error={error}/> */}
            <HStack wrap={"wrap"} gap={'50px'}>
              <Card.Root padding={'20px'}>
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
                <RadioGroup defaultValue='FEMALE' value={sex} onValueChange={(event: any) => setSex(event.value)}>
                  <HStack gap={5} direction='row'>
                    <Radio colorScheme='pink' value='FEMALE'>
                      Female
                    </Radio>
                    <Radio colorScheme='blue' value='MALE'>
                      Male
                    </Radio>
                  </HStack>
                </RadioGroup>
                <Checkbox checked={desexed} onChange={(event: any) => setDesexed(event.target.checked)}>Desexed</Checkbox>
                </VStack>
              </Card.Root>
              <Card.Root padding={'20px'}>
              <VStack>
                <Text fontSize={'lg'}>Visual tag</Text>
                <Text>Background colour</Text>
                <RadioGroup defaultValue='YELLOW' value={visualIdBackgroundColour} onValueChange={(event: any) => setVisualIdBackgroundColour(event.value)}>
                  <HStack gap={5} direction='row'>
                    <Radio colorScheme='yellow' value='YELLOW'>
                      Yellow
                    </Radio>
                    <Radio colorScheme='blue' value='SKY_BLUE'>
                      Blue
                    </Radio>
                  </HStack>
                </RadioGroup>
                <Text>Text colour</Text>
                <RadioGroup defaultValue='BLACK' value={visualIdTextColour} onValueChange={(event: any) => setVisualIdBackgroundColour(event.value)}>
                  <HStack gap={5} direction='row'>
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
              </Card.Root>
            </HStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={createNew.onClose}>
              Cancel
            </Button>
            <Button 
              colorScheme='blue' 
              onClick={
                ()=> {
                  setAngusId('')
                  setBirthDate(undefined)
                  setDesexed(false)
                  setName('')
                  setRow1('')
                  setRow2('')
                  setSex('FEMALE')
                }
              }
            >Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerRoot>
    </>
  )
}

export function ActiveLivestock() {
  let livestockUnits = useRef<LivestockUnit[]>([])
  let [stockFocus, setStockFocus] = useState<LivestockUnit>()
  let [loading, setLoading] = useState(true)
  let [whereFilter, setWhereFilter] = useState({active: {equals: true}})
  useEffect(() => {
    getLivestock(whereFilter)
      .then((livestock: LivestockUnit[]) => {
        console.log(livestock)
        livestockUnits.current = livestock
        setLoading(false)
      })
  }, [whereFilter])

  if (loading){
    return (<Loading/>)
  } else {
    if (!stockFocus){
      return (
        <VStack>
          <HStack wrap={"wrap"}>
            {
              livestockUnits.current.map(
                function(stock: LivestockUnit, index: number){
                  return (
                    <div key={index}>
                      <StockPreviewCard stock={stock} index={index} onClick={async () => setStockFocus(stock)}/>
                    </div>
                  )
                }
              )
            }
          </HStack>
        </VStack>
      )
    } else {
      return (
        <BeastView 
          stock={stockFocus}
          close={() => setStockFocus(undefined)} edit={function (): void {
            throw new Error("Function not implemented.");
          } } />
      )
    }
  }
}