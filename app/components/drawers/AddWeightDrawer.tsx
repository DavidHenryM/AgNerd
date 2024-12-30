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
import SuccessAlert from "../SuccessAlert";
import { WeighMethod, LivestockUnit } from '@prisma/client'
import { Dispatch, SetStateAction, useState, ChangeEvent, DialogHTMLAttributes } from "react";
import { addWeightRecord, getLivestockUnit, setLivestockUnitActive } from "../../queries";
import { Field } from "@/components/ui/field";
import { formatAsInputFieldDate, sortWeightsByDate } from "../../utils/utils"


export default function AddWeightDrawer(
  props: {
    stock: any, 
    setStock: Dispatch<SetStateAction<any>>, 
    open: boolean, 
    setOpen: Dispatch<SetStateAction<boolean>>
  }
){
  const sortedWeights = sortWeightsByDate(props.stock.weights)
  const latestWeight = sortedWeights[sortedWeights.length -1]
  const [weighMethod, setWeighMethod] = useState(WeighMethod.SCALES)
  const [newWeight, setNewWeight] = useState(0)
  const [invalidDate, setInvalidDate] = useState(false)
  const [weightEdit, setWeightEdit] = useState(String(latestWeight.weight))
  const [weightDateEdit, setWeightDateEdit] = useState(formatAsInputFieldDate(new Date))
  
  function handleSubmit(){
    // setLoading(true)
    
    addWeightRecord(
      props.stock.id, 
      Number(weightEdit),
      weighMethod,
      new Date(weightDateEdit).toISOString()
      )
      .then(()=>{
        const livestockUnit = getLivestockUnit(props.stock.id)
        props.setStock(livestockUnit)
        // toaster.dismiss()
        // setLoading(false)
        toaster.create({
          title: 'Weight record added',
          description: `Recorded new weight of ${newWeight}kg for ${props.stock.visualIdLine1} ${props.stock.visualIdLine2}${props.stock.visualIdLine3}`,
          type: 'success',
          duration: 5000,
        })
      })
      .catch(e => {
        // toaster.dismiss()
        toaster.create({
          title: 'Weight record error',
          description: e,
          type: 'error',
          duration: 5000,
        })
        console.error(`Error whilst writing weight record: `, e)
      })
      // .finally(()=>{
      //   props.onOpenChange()
      // })
  }

  return (
    <DrawerRoot
      open={props.open}
      onOpenChange={(event: any) => props.setOpen(event.open)}
      placement='end'>
      <DrawerBackdrop/>
      <DrawerContent bg='blackAlpha.900'>
        
        <DrawerHeader>Record weight</DrawerHeader>
        <DrawerBody>
          <VStack>
            <NumberInputRoot 
              value={weightEdit} 
              min={10} 
              max={5000} 
              onValueChange={(event: any) => setWeightEdit(event.value)}
            >
              <NumberInputField />
            </NumberInputRoot>
            <Field invalid={invalidDate}>
              <Input
                required={true}
                type="date"
                value={weightDateEdit}
                onChange={(event: any) => {
                  const enteredDate = new Date(event.target.value)
                  const now = new Date()
                  if(enteredDate > now) {
                    setInvalidDate(true)
                  } else {
                    setInvalidDate(false)
                  }
                  setWeightDateEdit(event.target.value)
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
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  )
}