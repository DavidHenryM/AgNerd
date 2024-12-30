'use client'

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
} from "@/components/ui/drawer"

import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input"

import { Toaster, toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"

import { 
  VStack, 
  Input, 
} from "@chakra-ui/react";
import SuccessAlert from "./SuccessAlert";
import { WeighMethod, LivestockUnit } from '@prisma/client'
import { SetStateAction, useState } from "react";
import { addWeightRecord, getLivestockUnit, setLivestockUnitActive } from "../queries";
import { Field } from "@/components/ui/field";
import { sortWeightsByDate } from "../utils/utils"
// import { useMutation, gql } from "@apollo/client";
// import { createWeightRecordMutation } from "../lib/mutations";
  


export default function AddWeightDrawer(props: {stock: any, setStock: SetStateAction<any>, open: boolean, onOpenChange: ()=>void}){
  const [weighDateString, setWeighDateString] = useState('')
  const [weighMethod, setWeighMethod] = useState(WeighMethod.SCALES)
  const [newWeight, setNewWeight] = useState(0)
  const [loading, setLoading] = useState(false)
  const [invalidDate, setInvalidDate] = useState(false)


  
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
        toaster.create({
          title: 'Weight record error',
          description: e,
          type: 'error',
          duration: 5000,
        })
        console.error(`Error whilst writing weight record: `, e)
      })
      .then(()=> {
        setLoading(false)
        toaster.create({
          title: 'Weight record added',
          description: `Recorded new weight of ${newWeight}kg for ${props.stock.visualIdLine1} ${props.stock.visualIdLine2}${props.stock.visualIdLine3}`,
          type: 'success',
          duration: 5000,
        })
      })
      .catch(e => {
        toaster.create({
          title: 'Weight record error',
          description: e,
          type: 'error',
          duration: 5000,
        })
        console.error(`Error whilst writing weight record: `, e)
      })
      .finally(()=>{
        props.onOpenChange()
      })
  }
  let lastWeight = null
  if (props.stock.weights) {
    const sortedWeights = sortWeightsByDate(props.stock.weights)
    if (sortedWeights.at(-1)) {
      lastWeight = sortedWeights.at(-1)?.weight
    }
  }

  return (
    <DrawerRoot
      open={props.open}
      onOpenChange={props.onOpenChange}
      placement='end'>
      <DrawerBackdrop/>
      <DrawerContent bg='blackAlpha.900'>
        <DrawerCloseTrigger />
        <DrawerHeader>Record weight</DrawerHeader>
        <DrawerBody>
          <VStack>
            <NumberInputRoot 
              defaultValue={String(lastWeight)} 
              min={10} 
              max={5000} 
              onChange={(newWeightString) => setNewWeight(Number(newWeightString))}
            >
              <NumberInputField />
            </NumberInputRoot>
            <Field invalid={invalidDate}>
              <Input
                required={true}
                type="date"
                defaultValue={String(lastWeight)}
                value={weighDateString}
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
              </Field>
            <Button 
              onClick={()=>{
                if (!invalidDate){
                  handleSubmit()
                }
              }}
              disabled={invalidDate}>
              Save
            </Button>
          </VStack>
          {/* <SuccessAlert operation={`Adding a weight record`} loading={loading} data={data} error={error}/> */}
        </DrawerBody>
      </DrawerContent>
  </DrawerRoot>
  )
}