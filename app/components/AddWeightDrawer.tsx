'use client'

import { 
  Drawer, 
  DrawerOverlay, 
  DrawerContent, 
  DrawerCloseButton, 
  DrawerHeader, 
  DrawerBody, 
  VStack, 
  NumberInput, 
  NumberInputField, 
  NumberInputStepper, 
  NumberIncrementStepper, 
  NumberDecrementStepper, 
  Input, 
  Button, 
  useToast
} from "@chakra-ui/react";
import SuccessAlert from "./SuccessAlert";
import { WeighMethod, LivestockUnit } from '@prisma/client'
import { SetStateAction, useEffect, useState } from "react";
import { addWeightRecord, getLivestockUnit, setLivestockUnitActive } from "../queries";
import { MdSettingsInputComponent } from "react-icons/md";
// import { useMutation, gql } from "@apollo/client";
// import { createWeightRecordMutation } from "../lib/mutations";
  


export default function AddWeightDrawer(props: {stock: LivestockUnit, setStock: SetStateAction<any>, isOpen: boolean, onClose: ()=>void}){
  const [weighDateString, setWeighDateString] = useState('')
  const [weighMethod, setWeighMethod] = useState(WeighMethod.SCALES)
  const [newWeight, setNewWeight] = useState(0)
  const [loading, setLoading] = useState(false)
  const [invalidDate, setInvalidDate] = useState(false)


  const toast = useToast()
  
  function handleSubmit(){
    setLoading(true)
    const weighDate = new Date(weighDateString)
    addWeightRecord(
      props.stock.id, 
      newWeight,
      weighMethod,
      weighDate
      )
      .then(()=>getLivestockUnit(props.stock.id)).then((livestockUnit)=>props.setStock(livestockUnit))
      .catch(e => {
        toast({
          title: 'Weight record error',
          description: e,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        console.error(`Error whilst writing weight record: `, e)
      })
      .then(()=> {
        setLoading(false)
        toast({
          title: 'Weight record added',
          description: `Recorded new weight of ${newWeight}kg for ${props.stock.visualIdLine1} ${props.stock.visualIdLine2}${props.stock.visualIdLine3}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      })
      .catch(e => {
        toast({
          title: 'Weight record error',
          description: e,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        console.error(`Error whilst writing weight record: `, e)
      })
      .finally(()=>{
        props.onClose()
      })
  }
  let lastWeight = null
  if (props.stock.weights) {
    const sortedWeights = props.stock.weights.sort((a,b) => a.dateMeasured - b.dateMeasured)
    if (sortedWeights.at(-1)) {
      lastWeight = sortedWeights.at(-1)?.weight
    }
  }
  // const [weightMutation, setWeightMutation] = useState(
  //   {
  //     mutation: gql`mutation Mutation($data: LivestockUnitUpdateInput!, $where: LivestockUnitWhereUniqueInput!) {
  //     updateOneLivestockUnit(data: $data, where: $where) {
  //       class
  //       id
  //     }
  //   }`, 
  //     variables: {
  //       "data": {
  //         "class": {
  //           "set": "CATTLE"
  //         }
  //       },
  //       "where": {
  //         "id": props.stock.id
  //       },
  //   }})
  return (
    <Drawer
      isOpen={props.isOpen}
      onClose={props.onClose}
      placement='right'>
      <DrawerOverlay/>
      <DrawerContent bg='blackAlpha.900'>
        <DrawerCloseButton />
        <DrawerHeader>Record weight</DrawerHeader>
        <DrawerBody>
          <VStack>
            <NumberInput 
              defaultValue={lastWeight?.weight} 
              min={10} 
              max={5000} 
              onChange={(newWeightString) => setNewWeight(Number(newWeightString))}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Input
              required={true}
              type="date"
              defaultValue={lastWeight?.dateMeasured}
              value={weighDateString}
              isInvalid={invalidDate}
              onChange={(event: any) => {
                console.log(event.target.value)
                const enteredDate = new Date(event.target.value)
                const now = new Date()
                console.log(enteredDate)
                if(enteredDate > now) {
                  setInvalidDate(true)
                } else {
                  setInvalidDate(false)
                }
                setWeighDateString(event.target.value)
                }}
              />
            <Button 
              onClick={()=>{
                if (!invalidDate){
                  handleSubmit()
                }
              }}
              isDisabled={invalidDate}>
              Save
            </Button>
          </VStack>
          {/* <SuccessAlert operation={`Adding a weight record`} loading={loading} data={data} error={error}/> */}
        </DrawerBody>
      </DrawerContent>
  </Drawer>)
}