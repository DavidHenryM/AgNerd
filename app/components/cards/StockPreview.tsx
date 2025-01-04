import { BeastView } from "@/app/beastView"
import { Icons } from "@/app/lib/Icons"
import Loading from "@/app/loading"
import { getAge, sortWeightsByDate, parseColour } from "@/app/utils/utils"
import { Card, Group,  Box, Button, HStack, VStack, Flex, Text, } from "@chakra-ui/react"
import { LivestockUnit } from "@prisma/client"
import Link from "next/link"
import { useState } from "react"
import { DesexButton } from "../Buttons"
import AddWeightDrawer from "../drawers/AddWeightDrawer"
import PregDrawer from "../drawers/PregDrawer"
import TreatmentDrawer from "../drawers/TreatmentDrawer"
import { EarTagGraphic } from "../EarTag"
import { WeightStats } from "../Stats"
import { StockClassTag, SexTag, DesexedTag, CommercialClassTag } from "../Tags"
import { Toaster, toaster } from "@/components/ui/toaster"
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion"
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

export default function StockPreviewCard(props: {stock: LivestockUnit, index: Number, onClick: ()=>{}}) {
  const [openWeight, setOpenWeight] = useState(false)
  const [openPreg, setOpenPreg] = useState(false)
  const [openTreat, setOpenTreat] = useState(false)
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
          <Group justifyContent={'right'} padding="2">
            <DialogTrigger>
              <Box outline="Menu" padding="2" outlineStyle={"solid"} bg={"teal.900"} borderRadius={"md"}>
                <Icons.GiCardboardBox/>
              </Box>
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
        <Card.Body minHeight={"275px"}>
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
            <AccordionRoot collapsible>
              <AccordionItem key={"opsAccordian" + props.index} value="opsAccordian">
                <AccordionItemTrigger>Operations</AccordionItemTrigger>
                <AccordionItemContent>
                  <Group gap='2' justifyContent={'right'}>
                    <Button onClick={()=>setOpenTreat(true)} style={{width:70, height:90}}>
                      <VStack>
                        <Icons.GiSyringe style={{width:50, height:50}}/>  
                        <Text>Treat</Text>
                      </VStack>
                    </Button>
                    <DesexButton desexed={props.stock.desexed} sex={props.stock.sex}/>
                    <Button onClick={()=>setOpenPreg(true)}  style={{width:70, height:90}}>
                      <VStack>
                        <Icons.GiEmbryo style={{width:50, height:50}}/>
                        <Text>Preg</Text>
                      </VStack>
                    </Button>                  
                    <Button onClick={()=>(setOpenWeight(true))}  style={{width:70, height:90}}>
                      <VStack>
                        <Icons.GiWeight style={{width:50, height:50}}/>
                        <Text>Weigh</Text>
                      </VStack>
                    </Button>
                  </Group>
                </AccordionItemContent>
              </AccordionItem>
              <AccordionItem key={"adminAccordian" + props.index} value="adminAccordian">
                <AccordionItemTrigger>Admin</AccordionItemTrigger>
                <AccordionItemContent>
                  <Flex justify="center">
                    <Button padding={4} color="fg.error" variant="surface" onClick={() => {setConfirmOpen(true)}}>
                      <Icons.GiCancel/>
                      Deactivate
                    </Button>
                  </Flex>
                </AccordionItemContent>
              </AccordionItem>
            </AccordionRoot>
          </VStack>
        </Card.Footer>
      </Card.Root>
      <Toaster/>
      <AddWeightDrawer stock={stock} setStock={setStock} open={openWeight} setOpen={setOpenWeight}/>
      <TreatmentDrawer open={openTreat} setOpen={setOpenTreat}/>
      <PregDrawer open={openPreg} setOpen={setOpenPreg}/>
    </>
  )
} else {
  return (<Loading/>)
}
}