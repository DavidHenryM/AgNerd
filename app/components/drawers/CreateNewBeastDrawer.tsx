import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader, DrawerRoot } from "@/components/ui/drawer"
import { Radio, RadioGroup } from "@/components/ui/radio"
import { Card, HStack, VStack, Text, Input } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useState } from "react"

export default function CreateNewBeastDrawer(props: {open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}){
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

  return (
    <DrawerRoot
      open={props.open}
      placement='top'
      onOpenChange={(event: any) => props.setOpen(event.open)}
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
          <Button variant='outline' mr={3} onClick={()=>props.setOpen(false)}>
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
    )
}