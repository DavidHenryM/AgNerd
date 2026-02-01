'use client'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material"
// import { toaster } from "@/components/ui/toaster"
import { Snack } from "@components/Alert"
import { LivestockUnit, WeighMethod, WeightRecord } from "@/app/generated/prisma/browser"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { addWeightRecord, getLivestockUnit } from "@lib/queries"
import { formatAsInputFieldDate, sortWeightsByDate } from "../../utils/utils"


export default function AddWeightDialogue(
  props: {
    stock: LivestockUnit & {weights?: WeightRecord[]}, 
    setStock: Dispatch<SetStateAction<LivestockUnit & {weights?: WeightRecord[]}>>, 
    open: boolean, 
    setOpen: Dispatch<SetStateAction<boolean>>
  }
){
  let sortedWeights: WeightRecord[] = []
  let latestWeight: WeightRecord | undefined = undefined
  let weight: number | undefined = undefined

  if (props.stock.weights){
    sortedWeights = sortWeightsByDate(props.stock.weights)
    latestWeight = sortedWeights[sortedWeights.length -1]
  }
  
  if(latestWeight){
    weight = latestWeight.weight
  }
  const [weighMethod, setWeighMethod] = useState(WeighMethod.SCALES)
  const [invalidDate, setInvalidDate] = useState(false)
  const [weightEdit, setWeightEdit] = useState(String(weight))
  const [weightDateEdit, setWeightDateEdit] = useState(formatAsInputFieldDate(new Date))
  const [openAlert, setOpenAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error" | "info" | "warning">("success")
  const [loading, setLoading] = useState(false)
  
  function handleSubmit(){
    setLoading(true)
    addWeightRecord(
      props.stock.id, 
      Number(weightEdit),
      weighMethod,
      new Date(weightDateEdit).toISOString()
      )
      .then(()=>{
        const livestockUnit = getLivestockUnit(props.stock.id).then((unit) => {
          if (unit) {
            props.setStock(unit)
            return unit
          }
        })

        
        setAlertMessage(`Recorded new weight of ${Number(weightEdit)}kg for ${props.stock.angusTechId}`)
        setAlertSeverity("success")
        setOpenAlert(true)
        props.setOpen(false)
        setLoading(false)
      })
      .catch(e => {
        setAlertMessage(`Error whilst writing weight record: ${e}`)
        setAlertSeverity("error")
        setOpenAlert(true)
        console.error(`Error whilst writing weight record: `, e)
        setLoading(false)
      })
  }

  return (
    <>
      <Dialog
        open={props.open}
        onClose={() => props.setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Record weight</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="Weight (kg)"
              type="number"
              value={weightEdit}
              slotProps={{
                htmlInput: {
                  min: 10,
                  max: 5000
                }
              }}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setWeightEdit(event.target.value)
              }
              fullWidth
            />
            <TextField
              required
              label="Date"
              type="date"
              value={weightDateEdit}
              error={invalidDate}
              helperText={invalidDate ? "Date cannot be in the future" : ""}
              slotProps={{
                htmlInput: { shrink: "true" }
              }}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const enteredDate = new Date(event.target.value)
                const now = new Date()
                setInvalidDate(enteredDate > now)
                setWeightDateEdit(event.target.value)
              }}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => props.setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (!invalidDate) {
                handleSubmit()
              }
            }}
            disabled={invalidDate || loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snack
        message={alertMessage}
        severity={alertSeverity}  
        open={openAlert}
        setOpen={setOpenAlert}
      ></Snack>
    </>
  )
}