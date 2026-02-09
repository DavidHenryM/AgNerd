"use client"

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
  Paper,
} from "@mui/material"
import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { CommercialClass } from "@/app/generated/prisma/browser"

export default function FilterBeastsDialogue(props: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  checked: Array<boolean>
  setChecked: Dispatch<SetStateAction<Array<boolean>>>
  onFarmOnly: boolean
  setOnFarmOnly: Dispatch<SetStateAction<boolean>>
}) {
  const commercialClasses = Object.keys(CommercialClass)

  return (
    <Dialog
      open={props.open}
      onClose={() => props.setOpen(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Filter</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <FormControlLabel
            control={
              <Switch
                checked={props.onFarmOnly}
                onChange={(event) => props.setOnFarmOnly(event.target.checked)}
              />
            }
            label="Only show livestock on farm"
          />
          <Typography variant="body2" fontWeight="medium">
            Select Stock Class(es)
          </Typography>
          <Stack spacing={1.5}>
            {commercialClasses.map((commercialClass: string, index: number) => (
              <Paper key={commercialClass} variant="outlined" sx={{ p: 1.25 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Checkbox
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const newChecked = [...props.checked]
                      newChecked[index] = event.target.checked
                      props.setChecked(newChecked)
                    }}
                    checked={props.checked.at(index) ?? false}
                  />
                  <Typography>{commercialClass}</Typography>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setOpen(false)} variant="contained">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}