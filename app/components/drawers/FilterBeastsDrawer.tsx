"use client"

import { Button } from "@/components/ui/button"
import { DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader, DrawerRoot } from "@/components/ui/drawer"
import { Radio, RadioGroup } from "@/components/ui/radio"
import { For, Text, Flex } from "@chakra-ui/react"
import { $Enums } from "@prisma/client"
import { Dispatch, SetStateAction, useState } from "react"
import { CheckboxCard } from "@/components/ui/checkbox-card"
import { Checkbox } from "@/components/ui/checkbox"



export default function FilterBeastsDrawer(
  props: {
    open: boolean, 
    setOpen: Dispatch<SetStateAction<boolean>>,
    checked: Array<boolean>,
    setChecked: Dispatch<SetStateAction<Array<boolean>>>,
  }
){
  const commercialClasses = Object.keys($Enums.CommercialClass)
  return (
    <DrawerRoot
      open={props.open}
      onOpenChange={(event: any)=>props.setOpen(event.open)}
      placement='top'>
      <DrawerBackdrop/>
      <DrawerContent bg='blackAlpha.900'>
        <DrawerCloseTrigger />
        <DrawerHeader>Filter</DrawerHeader>
        <DrawerBody>
          <Text textStyle="sm" fontWeight="medium">
            Select Stock Class(es)
          </Text>
            <Flex gap={16}>
              <For each={commercialClasses}>
                {(commercialClass: string, index: number)=>(
                  <CheckboxCard
                    onCheckedChange={(event: any) => {
                      let newChecked = new Array(...props.checked)
                      newChecked[index] = !!event.checked
                      props.setChecked(newChecked)
                    }}
                    checked={props.checked.at(index)}
                    maxWidth={"250px"}
                    bg={"teal.900"}
                    label={commercialClass}
                    // description
                    key={commercialClass} 
                    value='key'
                  >
                    </CheckboxCard>
                )}
              </For>
            </Flex>
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  )
}