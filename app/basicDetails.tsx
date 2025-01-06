"use client"

import {
  For,
  HStack, 
  VStack,
} from '@chakra-ui/react';

import { $Enums, LivestockUnit } from '@prisma/client'
import { BeastView } from './beastView';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import Loading from './loading';
import { getLivestock } from './queries';
import ControlBar from "./components/ControlBar";
import StockPreviewCard from "./components/cards/StockPreview";
import { getArrayTrues } from './utils/utils';



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



export function ActiveLivestock() {
  const commercialClasses = Object.keys($Enums.CommercialClass)
  let livestockUnits = useRef<LivestockUnit[]>([])
  const [livestockDisplay, setLivestockDisplay] = useState<LivestockUnit[]>([])
  const [stockFocus, setStockFocus] = useState<LivestockUnit>()
  const [loading, setLoading] = useState(true)
  const [whereFilter, setWhereFilter] = useState<any>({active: {equals: true}, commercialClass: {in: commercialClasses}})
  const [filterChecked, setFilterChecked] = useState(new Array<boolean>(commercialClasses.length).fill(true))
  const [openFilter, setOpenFilter] = useState(false)

  useEffect(() => {
    const checkedClasses: Array<string> = getArrayTrues(commercialClasses, filterChecked)
    const livestockToDisplay: Array<LivestockUnit> = []
    livestockUnits.current.map((livestockUnit: LivestockUnit)=>{
      if(livestockUnit.commercialClass != null){
        if(checkedClasses.includes(livestockUnit.commercialClass)){
          livestockToDisplay.push(livestockUnit)
        }
      }
    })
    setLivestockDisplay(livestockToDisplay)
  }, [openFilter])

  useEffect(() => {
    setLoading(true)
    getLivestock(whereFilter)
      .then((livestock: LivestockUnit[]) => {
        livestockUnits.current = livestock
        setLivestockDisplay(livestockUnits.current)
        setLoading(false)
      })
  },[])

  if (loading){
    return (<Loading/>)
  } else {
    if (!stockFocus){
      return (
        <VStack>
          <ControlBar filterChecked={filterChecked} setFilterChecked={setFilterChecked} openFilter={openFilter} setOpenFilter={setOpenFilter}/>
          <HStack wrap={"wrap"}>
            <For each={livestockDisplay}>
              {
                (stock: LivestockUnit, index: number)=>(
                  <StockPreviewCard key={stock.id} stock={stock} index={index} onClick={() => setStockFocus(stock)}/>
                )
              }
            </For>
          </HStack>
        </VStack>
      )
    } else {
      return (
        <BeastView 
          stock={stockFocus}
        />
      )
    }
  }
}