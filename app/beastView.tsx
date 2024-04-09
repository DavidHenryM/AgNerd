"use-client"

// import { DocumentNode, gql, useMutation } from "@apollo/client";
import { Spacer, Card, Button, Text, Table, Tbody, Td, Tr, ButtonGroup, Editable, EditablePreview, EditableInput, Modal, ModalOverlay, ModalHeader, ModalBody, ModalContent, ModalFooter, VStack, HStack, Wrap, WrapItem, Switch, CardHeader, CloseButton, Flex } from "@chakra-ui/react"
import { useState } from "react";
import { GiCancel, GiCorkedTube, GiIceCube, GiMedicines, GiPadlockOpen, GiPencil, GiReceiveMoney, GiWeight } from "react-icons/gi";
import { setLivestockUnitInactive } from "./queries";
import { LivestockUnit } from "@prisma/client";


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
      <Tr>
        <Td>{props.title}</Td>
        <Td>
          <Editable
            defaultValue={props.value ? props.value : ''}
            isPreviewFocusable={props.editable}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Td>
      </Tr>
    )
  } else {
    return (<></>)
  }
}

export function BeastView(props: {stock: LivestockUnit, close: ()=>void, edit: ()=>void}){
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deactivateOk, setDeactivateOk] = useState(false)
  const [deactivateError, setDeactivateError] = useState<null | any>()
  const [editable, setEditable] = useState(false)


  let severity: any = 'info'
  let message: string = ''
 
  const handleYes = () => {
    setConfirmOpen(false)
      props.close()
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
      <Card>
        <CardHeader>
          <Flex>
            <HStack>
              <GiPadlockOpen/>
              <Switch onChange={(event) => {setEditable(event.target.checked)}}/>
            </HStack>
            <Spacer/>
            <CloseButton onClick={props.close}/>
          </Flex>
        </CardHeader>
        <Table size={'sm'}>
          <Tbody >
            <EditableRowItem title={'Name'} value={placeHolder(props.stock.name, editable)} editable={editable}/>
            <EditableRowItem title={'Angus Tech Id'} value={placeHolder(props.stock.angusTechId, editable)} editable={editable}/>
            <EditableRowItem title={'NLIS#'} value={placeHolder(props.stock.nlisId, editable)} editable={editable}/>
            <EditableRowItem title={'Birth Date'} value={placeHolder(props.stock.birthDate ? props.stock.birthDate.toLocaleDateString() : null, editable)} editable={editable}/>
            <EditableRowItem title={'DSE'} value={placeHolder(`${props.stock.drySheepEquivalent}`, editable)} editable={editable}/>
            <EditableRowItem title={'Desexed'} value={placeHolder(`${props.stock.desexed}`, editable)} editable={editable}/>
            <EditableRowItem title={'Purchase date'} value={props.stock.purchaseDate ? props.stock.purchaseDate.toLocaleDateString() : null} editable={editable}/>
          </Tbody>
        </Table>
        <ButtonGroup spacing='2' justifyContent={'center'} size={'lg'}>

        <Wrap>
          <WrapItem>
          <Button onClick={() => {}} >
            <HStack>
              <GiMedicines size={30}/>  
              <Text>Treat</Text>
            </HStack>
          </Button>
          </WrapItem>
          <WrapItem>
          <Button onClick={() => {}}>
            <HStack>
              <GiReceiveMoney size={30}/>
              <Text>Sell</Text>
            </HStack>
          </Button>
          </WrapItem>
          <WrapItem>
          <Button onClick={() => {}}>
            <HStack>
              <GiCorkedTube size={30}/>
              <Text>Sample</Text>
            </HStack>
          </Button>
          </WrapItem>
          <WrapItem>
          <Button onClick={() => {}}>
            <HStack>
              <GiIceCube size={30}/>
              <Text>A.I.</Text>
            </HStack>
          </Button>
          </WrapItem>
          <WrapItem>
          <Button onClick={() => {}}>
            <HStack>
              <GiWeight size={30}/>
              <Text>Weigh</Text>
            </HStack>
          </Button>
          </WrapItem>
          <WrapItem>
          <Button onClick={() => {setConfirmOpen(true)}}>
            <HStack>
              <GiCancel size={30}/>
              <Text>Deactivate</Text>
          </HStack>
          </Button>
          </WrapItem>
        </Wrap>
        </ButtonGroup>

      </Card>
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
      <Modal
        isOpen={props.open}
        onClose={props.handleNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ModalOverlay />
        <ModalContent>

      <ModalHeader id="alert-dialog-title">
        {props.question}
      </ModalHeader>
        <ModalBody id="alert-dialog-description">
          {props.text}
        </ModalBody>
      <ModalFooter>
        <HStack spacing={2}>
          <Button onClick={props.handleYes} autoFocus>
            Yes
          </Button>
          <Button onClick={props.handleNo}>No</Button>
        </HStack>
      </ModalFooter>
      </ModalContent>
    </Modal>
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


