'use client'

import {
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { Dispatch, SetStateAction, useState } from "react"

export default function CreateNewBeastDialogue(props: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [name, setName] = useState('')
  const [angusId, setAngusId] = useState('')
  const [row1, setRow1] = useState('')
  const [row2, setRow2] = useState('')
  const [row3, setRow3] = useState('')
  const [nlis, setNlis] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [sex, setSex] = useState('FEMALE')
  const [desexed, setDesexed] = useState(false)
  const [visualIdBackgroundColour, setVisualIdBackgroundColour] = useState('YELLOW')
  const [visualIdTextColour, setVisualIdTextColour] = useState('BLACK')

  return (
    <Dialog
      open={props.open}
      onClose={() => props.setOpen(false)}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Add a beast</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2.5}>
          <Card variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Typography variant="subtitle1">Details</Typography>
              <TextField label="Name" value={name} onChange={(event) => setName(event.target.value)} />
              <TextField
                label="Angus Australia ID"
                value={angusId}
                onChange={(event) => setAngusId(event.target.value)}
              />
              <TextField label="NLIS ID" value={nlis} onChange={(event) => setNlis(event.target.value)} />
              <TextField
                required
                label="Birthdate"
                type="date"
                value={birthDate}
                InputLabelProps={{ shrink: true }}
                onChange={(event) => setBirthDate(event.target.value)}
              />
              <FormControl>
                <FormLabel>Sex</FormLabel>
                <RadioGroup
                  row
                  value={sex}
                  onChange={(event) => setSex(event.target.value)}
                >
                  <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                  <FormControlLabel value="MALE" control={<Radio />} label="Male" />
                </RadioGroup>
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={desexed}
                    onChange={(event) => setDesexed(event.target.checked)}
                  />
                }
                label="Desexed"
              />
            </Stack>
          </Card>
          <Card variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Typography variant="subtitle1">Visual tag</Typography>
              <Divider />
              <FormControl>
                <FormLabel>Background colour</FormLabel>
                <RadioGroup
                  row
                  value={visualIdBackgroundColour}
                  onChange={(event) => setVisualIdBackgroundColour(event.target.value)}
                >
                  <FormControlLabel value="YELLOW" control={<Radio />} label="Yellow" />
                  <FormControlLabel value="SKY_BLUE" control={<Radio />} label="Blue" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Text colour</FormLabel>
                <RadioGroup
                  row
                  value={visualIdTextColour}
                  onChange={(event) => setVisualIdTextColour(event.target.value)}
                >
                  <FormControlLabel value="BLACK" control={<Radio />} label="Black" />
                  <FormControlLabel value="WHITE" control={<Radio />} label="White" />
                </RadioGroup>
              </FormControl>
              <TextField label="Row 1 text" value={row1} onChange={(event) => setRow1(event.target.value)} />
              <TextField label="Row 2 text" value={row2} onChange={(event) => setRow2(event.target.value)} />
              <TextField label="Row 3 text" value={row3} onChange={(event) => setRow3(event.target.value)} />
            </Stack>
          </Card>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={() => props.setOpen(false)}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setAngusId('')
            setBirthDate('')
            setDesexed(false)
            setName('')
            setRow1('')
            setRow2('')
            setRow3('')
            setSex('FEMALE')
            setVisualIdBackgroundColour('YELLOW')
            setVisualIdTextColour('BLACK')
            setNlis('')
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
    )
}