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
import { getLivestock, getOnFarmStatus, getUsersFarm, setOnFarmStatus, updateLivestockUnit } from "@lib/queries"
import {
  CommercialClass,
  LivestockUnit,
  Sex,
  StockClass,
  VisualIdColour,
} from "@generated/browser"
import { EarTagGraphic } from "@components/EarTag"
import { formatAsInputFieldDate, parseColour } from "@app/utils/utils"
import { authClient } from "@lib/auth-client"

export default function EditLivestockDialogue(props: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  stock: LivestockUnit
  setStock: Dispatch<SetStateAction<LivestockUnit>>
}) {
  const sessionData = authClient.useSession()
  const [editingEnabled, setEditingEnabled] = useState(false)
  const [saving, setSaving] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error" | "info" | "warning">("success")

  const [name, setName] = useState("")
  const [angusId, setAngusId] = useState("")
  const [nlis, setNlis] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [sex, setSex] = useState<Sex>("FEMALE")
  const [desexed, setDesexed] = useState(false)
  const [stockClass, setStockClass] = useState<StockClass>("CATTLE")
  const [commercialClass, setCommercialClass] = useState<CommercialClass>("COMMERCIAL")
  const [sireId, setSireId] = useState("")
  const [damId, setDamId] = useState("")
  const [availableSires, setAvailableSires] = useState<LivestockUnit[]>([])
  const [availableDams, setAvailableDams] = useState<LivestockUnit[]>([])
  const [parentsLoading, setParentsLoading] = useState(false)

  const [row1, setRow1] = useState("")
  const [row2, setRow2] = useState("")
  const [row3, setRow3] = useState("")
  const [visualIdBackgroundColour, setVisualIdBackgroundColour] = useState<VisualIdColour>("YELLOW")
  const [visualIdTextColour, setVisualIdTextColour] = useState<VisualIdColour>("BLACK")

  const [comment, setComment] = useState("")
  const [purchasePrice, setPurchasePrice] = useState("")
  const [purchaseDate, setPurchaseDate] = useState("")
  const [drySheepEquivalent, setDrySheepEquivalent] = useState("")
  const [active, setActive] = useState(true)
  const [onFarm, setOnFarm] = useState(false)
  const [onFarmSince, setOnFarmSince] = useState("")
  const [currentFarmId, setCurrentFarmId] = useState<string | null>(null)

  const tagPreviewText = {
    colour: visualIdTextColour,
    line1: row1.trim() || null,
    line2: row2.trim() || null,
    line3: row3.trim() || null,
  }

  useEffect(() => {
    if (!props.open) {
      return
    }
    const birthDateValue = props.stock.birthDate ? new Date(props.stock.birthDate) : null
    const purchaseDateValue = props.stock.purchaseDate ? new Date(props.stock.purchaseDate) : null

    setEditingEnabled(false)
    setName(props.stock.name ?? "")
    setAngusId(props.stock.angusTechId ?? "")
    setNlis(props.stock.nlisId ?? "")
    setBirthDate(birthDateValue ? formatAsInputFieldDate(birthDateValue) : "")
    setSex(props.stock.sex ?? "FEMALE")
    setDesexed(props.stock.desexed ?? false)
    setStockClass(props.stock.class ?? "CATTLE")
    setCommercialClass(props.stock.commercialClass ?? "COMMERCIAL")
    setSireId(props.stock.sireId ?? "")
    setDamId(props.stock.damId ?? "")
    setRow1(props.stock.visualIdLine1 ?? "")
    setRow2(props.stock.visualIdLine2 ?? "")
    setRow3(props.stock.visualIdLine3 ?? "")
    setVisualIdBackgroundColour(props.stock.visualIdBackgroundColour ?? "YELLOW")
    setVisualIdTextColour(props.stock.visualIdTextColour ?? "BLACK")
    setComment(props.stock.comment ?? "")
    setPurchasePrice(props.stock.purchasePrice !== null && props.stock.purchasePrice !== undefined ? String(props.stock.purchasePrice) : "")
    setPurchaseDate(purchaseDateValue ? formatAsInputFieldDate(purchaseDateValue) : "")
    setDrySheepEquivalent(props.stock.drySheepEquivalent !== null && props.stock.drySheepEquivalent !== undefined ? String(props.stock.drySheepEquivalent) : "")
    setActive(props.stock.active ?? true)
  }, [props.open, props.stock])

  useEffect(() => {
    if (!props.open) {
      return
    }
    const userId = sessionData.data?.user?.id
    if (!userId) {
      setCurrentFarmId(null)
      setOnFarm(false)
      setOnFarmSince("")
      return
    }
    getUsersFarm(userId)
      .then((farm) => {
        const farmId = farm?.id ?? null
        setCurrentFarmId(farmId)
        if (!farmId) {
          setOnFarm(false)
          setOnFarmSince("")
          return
        }
        getOnFarmStatus(props.stock.id, farmId)
          .then((record) => {
            setOnFarm(!!record)
            setOnFarmSince(record?.startDate ? formatAsInputFieldDate(new Date(record.startDate)) : "")
          })
          .catch((error) => {
            setAlertMessage(error instanceof Error ? error.message : "Failed to load on-farm status.")
            setAlertSeverity("error")
            setOpenAlert(true)
          })
      })
      .catch((error) => {
        setAlertMessage(error instanceof Error ? error.message : "Failed to load current farm.")
        setAlertSeverity("error")
        setOpenAlert(true)
      })
  }, [props.open, props.stock.id, sessionData.data?.user?.id])

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
    if (sireId && !availableSires.some((sire) => sire.id === sireId)) {
      setSireId("")
    }
    if (damId && !availableDams.some((dam) => dam.id === damId)) {
      setDamId("")
    }
  }, [availableSires, availableDams, sireId, damId])

  const handleSave = async () => {
    if (!editingEnabled) {
      return
    }
    if (!birthDate) {
      setAlertMessage("Birthdate is required.")
      setAlertSeverity("error")
      setOpenAlert(true)
      return
    }

    const purchasePriceValue = purchasePrice.trim()
    const drySheepValue = drySheepEquivalent.trim()
    const parsedPurchasePrice = purchasePriceValue.length > 0 ? Number(purchasePriceValue) : null
    const parsedDrySheepEquivalent = drySheepValue.length > 0 ? Number(drySheepValue) : undefined

    if (purchasePriceValue.length > 0 && Number.isNaN(parsedPurchasePrice)) {
      setAlertMessage("Purchase price must be a number.")
      setAlertSeverity("error")
      setOpenAlert(true)
      return
    }
    if (drySheepValue.length > 0 && Number.isNaN(parsedDrySheepEquivalent)) {
      setAlertMessage("DSE must be a number.")
      setAlertSeverity("error")
      setOpenAlert(true)
      return
    }
    if (onFarm && onFarmSince && Number.isNaN(new Date(onFarmSince).getTime())) {
      setAlertMessage("On farm since date is invalid.")
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
      const cleanedComment = comment.trim()

      const updated = await updateLivestockUnit(props.stock.id, {
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
        visualIdLine1: cleanedRow1.length > 0 ? cleanedRow1 : null,
        visualIdLine2: cleanedRow2.length > 0 ? cleanedRow2 : null,
        visualIdLine3: cleanedRow3.length > 0 ? cleanedRow3 : null,
        visualIdBackgroundColour: visualIdBackgroundColour,
        visualIdTextColour: visualIdTextColour,
        comment: cleanedComment.length > 0 ? cleanedComment : null,
        purchasePrice: parsedPurchasePrice,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
        drySheepEquivalent: parsedDrySheepEquivalent,
        active: active,
      })

      if (currentFarmId) {
        const onFarmStartDate = onFarm
          ? (onFarmSince ? new Date(onFarmSince) : new Date(birthDate))
          : undefined
        await setOnFarmStatus({
          livestockUnitId: props.stock.id,
          farmId: currentFarmId,
          onFarm: onFarm,
          startDate: onFarmStartDate,
        })
      }

      props.setStock((prev) => ({
        ...prev,
        ...updated,
      }))
      setAlertMessage(`Updated ${updated.name || updated.angusTechId || "livestock"}.`)
      setAlertSeverity("success")
      setOpenAlert(true)
      props.setOpen(false)
    } catch (error) {
      setAlertMessage(error instanceof Error ? error.message : "Failed to update livestock.")
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
        <DialogTitle>Edit livestock</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2.5}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={editingEnabled}
                  onChange={(event) => setEditingEnabled(event.target.checked)}
                />
              }
              label="Unlock editing"
            />
            <Card variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Typography variant="subtitle1">Details</Typography>
                <TextField
                  label="Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  disabled={!editingEnabled}
                />
                <TextField
                  label="Angus Australia ID"
                  value={angusId}
                  onChange={(event) => setAngusId(event.target.value)}
                  disabled={!editingEnabled}
                />
                <TextField
                  label="NLIS ID"
                  value={nlis}
                  onChange={(event) => setNlis(event.target.value)}
                  disabled={!editingEnabled}
                />
                <TextField
                  required
                  label="Birthdate"
                  type="date"
                  value={birthDate}
                  InputLabelProps={{ shrink: true }}
                  onChange={(event) => setBirthDate(event.target.value)}
                  disabled={!editingEnabled}
                />
                <FormControl fullWidth disabled={!editingEnabled}>
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
                <FormControl fullWidth disabled={!editingEnabled}>
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
                <FormControl disabled={!editingEnabled}>
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
                      disabled={!editingEnabled}
                    />
                  }
                  label="Desexed"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={active}
                      onChange={(event) => setActive(event.target.checked)}
                      disabled={!editingEnabled}
                    />
                  }
                  label="Active"
                />
              </Stack>
            </Card>
            <Card variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Typography variant="subtitle1">Relations</Typography>
                <Divider />
                <FormControl fullWidth disabled={!editingEnabled || !birthDate || parentsLoading}>
                  <InputLabel id="sire-label">Sire</InputLabel>
                  <Select
                    labelId="sire-label"
                    label="Sire"
                    value={sireId}
                    onChange={(event) => setSireId(event.target.value)}
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
                <FormControl fullWidth disabled={!editingEnabled || !birthDate || parentsLoading}>
                  <InputLabel id="dam-label">Dam</InputLabel>
                  <Select
                    labelId="dam-label"
                    label="Dam"
                    value={damId}
                    onChange={(event) => setDamId(event.target.value)}
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
                <FormControl disabled={!editingEnabled}>
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
                <FormControl disabled={!editingEnabled}>
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
                <TextField
                  label="Row 1 text"
                  value={row1}
                  onChange={(event) => setRow1(event.target.value)}
                  disabled={!editingEnabled}
                />
                <TextField
                  label="Row 2 text"
                  value={row2}
                  onChange={(event) => setRow2(event.target.value)}
                  disabled={!editingEnabled}
                />
                <TextField
                  label="Row 3 text"
                  value={row3}
                  onChange={(event) => setRow3(event.target.value)}
                  disabled={!editingEnabled}
                />
              </Stack>
            </Card>
            <Card variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Typography variant="subtitle1">Management</Typography>
                <Divider />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={onFarm}
                      onChange={(event) => setOnFarm(event.target.checked)}
                      disabled={!editingEnabled || !currentFarmId}
                    />
                  }
                  label="On farm"
                />
                <TextField
                  label="On farm since"
                  type="date"
                  value={onFarmSince}
                  InputLabelProps={{ shrink: true }}
                  onChange={(event) => setOnFarmSince(event.target.value)}
                  disabled={!editingEnabled || !currentFarmId || !onFarm}
                />
                <TextField
                  label="Comment"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  multiline
                  minRows={2}
                  disabled={!editingEnabled}
                />
                <TextField
                  label="Purchase price"
                  type="number"
                  value={purchasePrice}
                  onChange={(event) => setPurchasePrice(event.target.value)}
                  disabled={!editingEnabled}
                />
                <TextField
                  label="Purchase date"
                  type="date"
                  value={purchaseDate}
                  InputLabelProps={{ shrink: true }}
                  onChange={(event) => setPurchaseDate(event.target.value)}
                  disabled={!editingEnabled}
                />
                <TextField
                  label="Dry sheep equivalent"
                  type="number"
                  value={drySheepEquivalent}
                  onChange={(event) => setDrySheepEquivalent(event.target.value)}
                  disabled={!editingEnabled}
                />
              </Stack>
            </Card>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => props.setOpen(false)}>
            Close
          </Button>
          <Button variant="contained" onClick={handleSave} disabled={!editingEnabled || saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snack message={alertMessage} severity={alertSeverity} open={openAlert} setOpen={setOpenAlert}></Snack>
    </>
  )
}
