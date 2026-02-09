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
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Snack } from "@components/Alert"
import { createLivestockUnit, getLivestock, getUsersFarm } from "@lib/queries"
import { CommercialClass, LivestockUnit, Sex, StockClass, VisualIdColour } from "@generated/browser"
import { EarTagGraphic } from "@components/EarTag"
import { parseColour } from "@app/utils/utils"
import { authClient } from "@lib/auth-client"

export default function CreateNewBeastDialogue(props: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onCreated?: (created: LivestockUnit) => void
}) {
  const sessionData = authClient.useSession()
  const [name, setName] = useState('')
  const [angusId, setAngusId] = useState('')
  const [row1, setRow1] = useState('')
  const [row2, setRow2] = useState('')
  const [row3, setRow3] = useState('')
  const [nlis, setNlis] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [sex, setSex] = useState<Sex>('FEMALE')
  const [desexed, setDesexed] = useState(false)
  const [stockClass, setStockClass] = useState<StockClass>('CATTLE')
  const [commercialClass, setCommercialClass] = useState<CommercialClass>('COMMERCIAL')
  const [sireId, setSireId] = useState('')
  const [damId, setDamId] = useState('')
  const [availableSires, setAvailableSires] = useState<LivestockUnit[]>([])
  const [availableDams, setAvailableDams] = useState<LivestockUnit[]>([])
  const [parentsLoading, setParentsLoading] = useState(false)
  const [currentFarmId, setCurrentFarmId] = useState<string | null>(null)
  const [visualIdBackgroundColour, setVisualIdBackgroundColour] = useState<VisualIdColour>('YELLOW')
  const [visualIdTextColour, setVisualIdTextColour] = useState<VisualIdColour>('BLACK')
  const [saving, setSaving] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error" | "info" | "warning">("success")
  const tagPreviewText = {
    colour: visualIdTextColour,
    line1: row1.trim() || null,
    line2: row2.trim() || null,
    line3: row3.trim() || null,
  }

  const resetForm = () => {
    setAngusId('')
    setBirthDate('')
    setDesexed(false)
    setName('')
    setRow1('')
    setRow2('')
    setRow3('')
    setSex('FEMALE')
    setStockClass('CATTLE')
    setCommercialClass('COMMERCIAL')
    setSireId('')
    setDamId('')
    setVisualIdBackgroundColour('YELLOW')
    setVisualIdTextColour('BLACK')
    setNlis('')
  }

  useEffect(() => {
    if (!props.open) {
      return
    }
    if (!birthDate) {
      setAvailableSires([])
      setAvailableDams([])
      return
    }
    const selectedDate = new Date(birthDate)
    if (Number.isNaN(selectedDate.getTime())) {
      return
    }
    setParentsLoading(true)
    Promise.all([
      getLivestock({ sex: { equals: "MALE" }, birthDate: { lt: selectedDate } }),
      getLivestock({ sex: { equals: "FEMALE" }, birthDate: { lt: selectedDate } }),
    ])
      .then(([sires, dams]) => {
        setAvailableSires(sires)
        setAvailableDams(dams)
      })
      .catch((error) => {
        setAlertMessage(error instanceof Error ? error.message : "Failed to load sire/dam options.")
        setAlertSeverity("error")
        setOpenAlert(true)
      })
      .finally(() => {
        setParentsLoading(false)
      })
  }, [props.open, birthDate])

  useEffect(() => {
    if (!props.open) {
      return
    }
    const userId = sessionData.data?.user?.id
    if (!userId) {
      setCurrentFarmId(null)
      return
    }
    getUsersFarm(userId)
      .then((farm) => {
        setCurrentFarmId(farm?.id ?? null)
      })
      .catch((error) => {
        setAlertMessage(error instanceof Error ? error.message : "Failed to load current farm.")
        setAlertSeverity("error")
        setOpenAlert(true)
      })
  }, [props.open, sessionData.data?.user?.id])

  useEffect(() => {
    if (sireId && !availableSires.some((sire) => sire.id === sireId)) {
      setSireId('')
    }
    if (damId && !availableDams.some((dam) => dam.id === damId)) {
      setDamId('')
    }
  }, [availableSires, availableDams, sireId, damId])

  const handleSave = async () => {
    if (!birthDate) {
      setAlertMessage("Birthdate is required.")
      setAlertSeverity("error")
      setOpenAlert(true)
      return
    }
    setSaving(true)
    setOpenAlert(false)
    try {
      const cleanedName = name.trim()
      const cleanedAngusId = angusId.trim()
      const cleanedNlis = nlis.trim()
      const cleanedRow1 = row1.trim()
      const cleanedRow2 = row2.trim()
      const cleanedRow3 = row3.trim()

      const created = await createLivestockUnit({
        name: cleanedName.length > 0 ? cleanedName : null,
        angusTechId: cleanedAngusId.length > 0 ? cleanedAngusId : null,
        nlisId: cleanedNlis.length > 0 ? cleanedNlis : null,
        birthDate: new Date(birthDate),
        sex: sex,
        desexed: desexed,
        class: stockClass,
        commercialClass: commercialClass,
        sireId: sireId || null,
        damId: damId || null,
        farmId: currentFarmId,
        visualIdLine1: cleanedRow1.length > 0 ? cleanedRow1 : null,
        visualIdLine2: cleanedRow2.length > 0 ? cleanedRow2 : null,
        visualIdLine3: cleanedRow3.length > 0 ? cleanedRow3 : null,
        visualIdBackgroundColour: visualIdBackgroundColour,
        visualIdTextColour: visualIdTextColour,
      })

      setAlertMessage(`Created ${created.name || created.angusTechId || "livestock"}.`)
      setAlertSeverity("success")
      setOpenAlert(true)
      props.onCreated?.(created)
      resetForm()
      props.setOpen(false)
    } catch (error) {
      setAlertMessage(error instanceof Error ? error.message : "Failed to create livestock.")
      setAlertSeverity("error")
      setOpenAlert(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
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
                <FormControl fullWidth>
                  <InputLabel id="stock-class-label">Stock class</InputLabel>
                  <Select
                    labelId="stock-class-label"
                    label="Stock class"
                    value={stockClass}
                    onChange={(event) => setStockClass(event.target.value as StockClass)}
                  >
                    {Object.values(StockClass).map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="commercial-class-label">Commercial class</InputLabel>
                  <Select
                    labelId="commercial-class-label"
                    label="Commercial class"
                    value={commercialClass}
                    onChange={(event) => setCommercialClass(event.target.value as CommercialClass)}
                  >
                    {Object.values(CommercialClass).map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Sex</FormLabel>
                  <RadioGroup
                    row
                    value={sex}
                    onChange={(event) => {
                      const nextSex = event.target.value as Sex
                      setSex(nextSex)
                      if (nextSex === "FEMALE") {
                        setDesexed(false)
                      }
                    }}
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
                <Typography variant="subtitle1">Relations</Typography>
                <Divider />
                <FormControl fullWidth>
                  <InputLabel id="sire-label">Sire</InputLabel>
                  <Select
                    labelId="sire-label"
                    label="Sire"
                    value={sireId}
                    onChange={(event) => setSireId(event.target.value)}
                    disabled={!birthDate || parentsLoading}
                  >
                    <MenuItem value="">
                      None
                    </MenuItem>
                    {availableSires.map((sire) => (
                      <MenuItem key={sire.id} value={sire.id}>
                        {sire.name || sire.angusTechId || sire.id}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="dam-label">Dam</InputLabel>
                  <Select
                    labelId="dam-label"
                    label="Dam"
                    value={damId}
                    onChange={(event) => setDamId(event.target.value)}
                    disabled={!birthDate || parentsLoading}
                  >
                    <MenuItem value="">
                      None
                    </MenuItem>
                    {availableDams.map((dam) => (
                      <MenuItem key={dam.id} value={dam.id}>
                        {dam.name || dam.angusTechId || dam.id}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Card>
            <Card variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Typography variant="subtitle1">Visual tag</Typography>
                <Divider />
                <Stack direction="row" justifyContent="center" alignItems="center">
                  <EarTagGraphic tagColour={parseColour(visualIdBackgroundColour)} text={tagPreviewText} />
                </Stack>
                <FormControl>
                  <FormLabel>Background colour</FormLabel>
                  <RadioGroup
                    row
                    value={visualIdBackgroundColour}
                    onChange={(event) => setVisualIdBackgroundColour(event.target.value as VisualIdColour)}
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
                    onChange={(event) => setVisualIdTextColour(event.target.value as VisualIdColour)}
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
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
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