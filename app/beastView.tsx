"use-client"

// import { DocumentNode, gql, useMutation } from "@apollo/client";
import { Spacer, Card, Button, Text, Table, Group, Editable, HStack, Flex, IconButton } from "@chakra-ui/react"
import { Switch } from "@/components/ui/switch"
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { setLivestockUnitInactive } from "./queries";
import { LivestockUnit } from "@prisma/client";
import { Icons } from "./lib/Icons";

function placeHolder(text: string | undefined | null, editable: boolean): string {
  if (text){
    if (text.length > 0){
      return text
    }
  }
  if (editable){
    return '-'
  } else {
    return ''
  }
}


function EditableRowItem(props: {title: string, value: any | undefined, editable: boolean}){
  if(props.value || props.editable) {
    return (
      <Table.Row>
        <Table.Cell>{props.title}</Table.Cell>
        <Table.Cell>
          <Editable.Root
             defaultValue={props.value ? props.value : ''} 
             disabled={!props.editable}>
            <Editable.Preview />
            <Editable.Input />
            <Editable.Control>
              <Editable.CancelTrigger asChild>
                <IconButton variant="outline" size="xs">
                  <Icons.LuX />
                </IconButton>
              </Editable.CancelTrigger>
              <Editable.SubmitTrigger asChild>
                <IconButton variant="outline" size="xs">
                  <Icons.LuCheck />
                </IconButton>
              </Editable.SubmitTrigger>
            </Editable.Control>
          </Editable.Root>
        </Table.Cell>
      </Table.Row>
    )
  } else {
    return (<></>)
  }
}

export function BeastView(props: {stock: LivestockUnit}){
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deactivateOk, setDeactivateOk] = useState(false)
  const [deactivateError, setDeactivateError] = useState<null | any>()
  const [editable, setEditable] = useState(false)


  let severity: any = 'info'
  let message: string = ''
 
  const handleYes = () => {
    setConfirmOpen(false)
      // props.close()
      try {
        setLivestockUnitInactive(props.stock.id)
        setDeactivateOk(true)
      } catch(error: any){
        setDeactivateError(error)
      }
  }

  const handleNo = () => {
    setConfirmOpen(false)
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  if (deactivateOk) {
    severity = 'success'
    message = 'Succesfully marked beast as inactive'
    setOpen(true)
  } else if (deactivateError) {
    severity = 'error'
    message = 'Failed to mark beast as inactive'
    setOpen(true)
  }

  return (
    <>
      <Card.Root>
        <Card.Header>
          <Flex>
            <HStack>
              <Icons.GiPadlockOpen/>
              <Switch checked={editable} onCheckedChange={(event) => {setEditable(event.checked)}}/>
            </HStack>
            <Spacer/>
          </Flex>
        </Card.Header>
        <Table.Root size={'sm'} showColumnBorder={true} striped={true} variant={"outline"}>
          <Table.Body >
            <EditableRowItem title={'Name'} value={placeHolder(props.stock.name, editable)} editable={editable}/>
            <EditableRowItem title={'Angus Tech Id'} value={placeHolder(props.stock.angusTechId, editable)} editable={editable}/>
            <EditableRowItem title={'NLIS#'} value={placeHolder(props.stock.nlisId, editable)} editable={editable}/>
            <EditableRowItem title={'Birth Date'} value={placeHolder(props.stock.birthDate ? props.stock.birthDate.toLocaleDateString() : null, editable)} editable={editable}/>
            <EditableRowItem title={'DSE'} value={placeHolder(`${props.stock.drySheepEquivalent}`, editable)} editable={editable}/>
            <EditableRowItem title={'Desexed'} value={placeHolder(`${props.stock.desexed}`, editable)} editable={editable}/>
            <EditableRowItem title={'Purchase date'} value={props.stock.purchaseDate ? props.stock.purchaseDate.toLocaleDateString() : null} editable={editable}/>
          </Table.Body>
        </Table.Root>
        <Group gap='2' justifyContent={'center'}>
          <HStack wrap={"wrap"}>
            <Button onClick={() => {}} >
              <HStack>
                <Icons.GiMedicines size={30}/>  
                <Text>Treat</Text>
              </HStack>
            </Button>
            <Button onClick={() => {}}>
              <HStack>
                <Icons.GiReceiveMoney size={30}/>
                <Text>Sell</Text>
              </HStack>
            </Button>
            <Button onClick={() => {}}>
              <HStack>
                <Icons.GiCorkedTube size={30}/>
                <Text>Sample</Text>
              </HStack>
            </Button>
            <Button onClick={() => {}}>
              <HStack>
                <Icons.GiIceCube size={30}/>
                <Text>A.I.</Text>
              </HStack>
            </Button>
            <Button onClick={() => {}}>
              <HStack>
                <Icons.GiWeight size={30}/>
                <Text>Weigh</Text>
              </HStack>
            </Button>
            <Button onClick={() => {setConfirmOpen(true)}}>
              <HStack>
                <Icons.GiCancel size={30}/>
                <Text>Deactivate</Text>
            </HStack>
            </Button>
          </HStack>
        </Group>

      </Card.Root>
      <ConfirmDialog 
        open={confirmOpen} 
        handleYes={handleYes}
        handleNo={handleNo}
        text='Do you want to mark this beast as NOT active?'/>
    </>
  )
}

function ConfirmDialog(props: any) {
  return(
    <DialogRoot
      open={props.open}
      onOpenChange={props.handleNo}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogBackdrop/>
      <DialogTrigger/>
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader id="alert-dialog-title">
          <DialogTitle>{props.question}</DialogTitle>
        </DialogHeader>
        <DialogBody id="alert-dialog-description">
          {props.text}
        </DialogBody>
        <DialogFooter>
          <HStack gap={2}>
            <Button onClick={props.handleYes} autoFocus>
              Yes
            </Button>
            <Button onClick={props.handleNo}>
              No
            </Button>
          </HStack>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}


// function DeactivateLivestockUnit(props: {stock: any} ) {  

//   const [open, setOpen] = useState(false);

//   let severity: any = 'info'
//   let message: string = ''
 

//   const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpen(false);
//   };

  
//   if (data) {
//     severity = 'success'
//     message = 'Succesfully marked beast as inactive'
//     setOpen(true)
//   } else if (error) {
//     severity = 'error'
//     message = 'Failed to mark beast as inactive'
//     setOpen(true)
//   } else if(loading) {
//     return (<CircularProgress/>)
//   }
//     return (
//       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//         <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
//           {message}
//         </Alert>
//     </Snackbar>
//     )
// }


