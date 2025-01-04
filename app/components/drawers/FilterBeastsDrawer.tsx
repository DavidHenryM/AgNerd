import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader, DrawerRoot } from "@/components/ui/drawer"
import { Radio, RadioGroup } from "@/components/ui/radio"
import { Card, HStack, VStack, Text, Input, Group, CheckboxGroup, Flex } from "@chakra-ui/react"
import { $Enums } from "@prisma/client"
import { Dispatch, SetStateAction, useState } from "react"
import { CheckboxCard } from "@/components/ui/checkbox-card"


export default function FilterBeastsDrawer(props: {open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}){
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
      <CheckboxGroup colorScheme='green' >
      <Text textStyle="sm" fontWeight="medium">
        Select Stock Class(es)
      </Text>
        <Flex gap={16}>
          {
            Object.keys($Enums.CommercialClass).map((key: any)=>{
              return (
                <CheckboxCard
                  label={key}
                  // description
                  key={key} 
                  value='key'
                />
              )
            })
          }
        </Flex>
      </CheckboxGroup>
      </DrawerBody>
    </DrawerContent>
  </DrawerRoot>
  )
}