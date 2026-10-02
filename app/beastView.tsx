"use-client"

import { Divider, Card, Button, Typography, Table,  Stack, IconButton, Switch, TableContainer, TableBody, CardHeader, Paper, TableCell, Input, TableRow } from "@mui/material"
import { useState } from "react";
import { setLivestockUnitInactive } from "@lib/queries";
import { LivestockUnit } from "@generated/browser";
import { Icons } from "./lib/Icons";
import { ConfirmDialog } from "./components/dialogues/ConfirmDialogue";
import { Snack } from "./components/Alert";

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


function EditableRowItem(props: {title: string, value: unknown, editable: boolean}){
  if(props.value || props.editable) {
    return (
      <TableContainer>
        <Table>
          <TableRow>
            <TableCell>{props.title}</TableCell>
            <TableCell>
              <Input
                defaultValue={props.value ? props.value : ''} 
                disabled={!props.editable}/>
                    <IconButton>
                      <Icons.LuX />
                    </IconButton>
                    <IconButton>
                      <Icons.LuCheck />
                    </IconButton>
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    )
  } else {
    return (<></>)
  }
}

export function BeastView(props: {stock: LivestockUnit}){
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success")
  const [editable, setEditable] = useState(false)

  const handleYes = async () => {
    setConfirmOpen(false)
    try {
      await setLivestockUnitInactive(props.stock.id)
      setAlertMessage('Successfully marked beast as inactive')
      setAlertSeverity("success")
    } catch (error: unknown) {
      console.error("Failed to mark beast as inactive:", error)
      setAlertMessage(error instanceof Error ? error.message : 'Failed to mark beast as inactive')
      setAlertSeverity("error")
    } finally {
      setOpen(true)
    }
  }

  const handleNo = () => {
    setConfirmOpen(false)
  }

  return (
    <>
      <Card>
        <CardHeader>
            <Stack direction="row">
              <Icons.GiPadlockOpen/>
              <Switch checked={editable} onChange={(event) => {setEditable(event.target.checked)}}/>
            </Stack>
            <Divider/>
        </CardHeader>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <EditableRowItem title={'Name'} value={placeHolder(props.stock.name, editable)} editable={editable}/>
              <EditableRowItem title={'Angus Tech Id'} value={placeHolder(props.stock.angusTechId, editable)} editable={editable}/>
              <EditableRowItem title={'NLIS#'} value={placeHolder(props.stock.nlisId, editable)} editable={editable}/>
              <EditableRowItem title={'Birth Date'} value={placeHolder(props.stock.birthDate ? props.stock.birthDate.toLocaleDateString() : null, editable)} editable={editable}/>
              <EditableRowItem title={'DSE'} value={placeHolder(`${props.stock.drySheepEquivalent}`, editable)} editable={editable}/>
              <EditableRowItem title={'Desexed'} value={placeHolder(`${props.stock.desexed}`, editable)} editable={editable}/>
              <EditableRowItem title={'Purchase date'} value={props.stock.purchaseDate ? props.stock.purchaseDate.toLocaleDateString() : null} editable={editable}/>
            </TableBody>
          </Table>
        </TableContainer>
          <Stack direction="row">
            <Button onClick={() => {}} >
              <Stack direction="row">
                <Icons.GiMedicines size={30}/>  
                <Typography>Treat</Typography>
              </Stack>
            </Button>
            <Button onClick={() => {}}>
              <Stack direction="row">
                <Icons.GiReceiveMoney size={30}/>
                <Typography>Sell</Typography>
              </Stack>
            </Button>
            <Button onClick={() => {}}>
              <Stack direction="row">
                <Icons.GiCorkedTube size={30}/>
                <Typography>Sample</Typography>
              </Stack>
            </Button>
            <Button onClick={() => {}}>
              <Stack direction="row">
                <Icons.GiIceCube size={30}/>
                <Typography>A.I.</Typography>
              </Stack>
            </Button>
            <Button onClick={() => {}}>
              <Stack direction="row">
                <Icons.GiWeight size={30}/>
                <Typography>Weigh</Typography>
              </Stack>
            </Button>
            <Button onClick={() => {setConfirmOpen(true)}}>
              <Stack direction="row">
                <Icons.GiCancel size={30}/>
                <Typography>Deactivate</Typography>
            </Stack>
            </Button>
          </Stack>

      </Card>
      <ConfirmDialog 
        open={confirmOpen} 
        handleYes={handleYes}
        handleNo={handleNo}
        question='Do you want to mark this beast as NOT active?' 
        text='This action will mark the beast as inactive. Are you sure you want to proceed?'/>
      <Snack
        message={alertMessage}
        severity={alertSeverity}
        open={open}
        setOpen={setOpen}
      />
    </>
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
