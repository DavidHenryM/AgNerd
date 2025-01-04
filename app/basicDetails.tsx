"use client"

import {
  HStack, 
  VStack,
} from '@chakra-ui/react';

import { LivestockUnit } from '@prisma/client'
import { BeastView } from './beastView';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import Loading from './loading';
import { getLivestock } from './queries';
import ControlBar from "./components/ControlBar";
import StockPreviewCard from "./components/cards/StockPreview";



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
          <ControlBar/>
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