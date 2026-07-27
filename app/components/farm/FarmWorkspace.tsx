"use client"

import dynamic from "next/dynamic"
import { useMemo, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material"
import { LineChart } from "@mui/x-charts/LineChart"
import { FeedSourceType, GateState, PaddockWorkType } from "@generated/browser"
import {
  createGate,
  createMob,
  createPaddock,
  createPaddockFeedRecord,
  createPaddockWorkEvent,
  recordMobMovement,
  updateFarmBoundary,
  updateGateState,
} from "@lib/mutations"
import {
  formatCoordinateText,
  formatDateTime,
  parseCoordinateText,
} from "@lib/farmUtils"
import {
  getCurrentMobSummaries,
  getFarmGrazingPressureTotal,
  getFeedHistorySeries,
  getGrazingPressureSummaries,
} from "@lib/farmAnalytics"
import type { FarmWorkspaceFarm } from "@lib/types/farmWorkspace"

const FarmMap = dynamic(() => import("./FarmMap"), { ssr: false })

type WorkspaceTab = "map" | "paddocks" | "mobs" | "feed" | "work" | "analytics" | "history"

function nowInputValue() {
  return new Date().toISOString().slice(0, 16)
}

export default function FarmWorkspace({ farm }: { farm: FarmWorkspaceFarm }) {
  const router = useRouter()
  const [tab, setTab] = useState<WorkspaceTab>("map")
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [boundaryText, setBoundaryText] = useState(formatCoordinateText(farm.boundaryPoints))
  const [boundaryAreaHa, setBoundaryAreaHa] = useState(farm.areaHa?.toString() ?? "")

  const [paddockName, setPaddockName] = useState("")
  const [paddockDescription, setPaddockDescription] = useState("")
  const [paddockBoundaryText, setPaddockBoundaryText] = useState("")
  const [paddockAreaHa, setPaddockAreaHa] = useState("")

  const [gateName, setGateName] = useState("")
  const [gateFromPaddockId, setGateFromPaddockId] = useState(farm.paddocks[0]?.id ?? "")
  const [gateToPaddockId, setGateToPaddockId] = useState(farm.paddocks[1]?.id ?? farm.paddocks[0]?.id ?? "")
  const [gateLatitude, setGateLatitude] = useState("")
  const [gateLongitude, setGateLongitude] = useState("")
  const [gateState, setGateState] = useState<GateState>(GateState.CLOSED)
  const [gateRecordedAt, setGateRecordedAt] = useState(nowInputValue())
  const [gateNote, setGateNote] = useState("")

  const [selectedGateId, setSelectedGateId] = useState(farm.gates[0]?.id ?? "")
  const [gateUpdateState, setGateUpdateState] = useState<GateState>(GateState.OPEN)
  const [gateUpdateRecordedAt, setGateUpdateRecordedAt] = useState(nowInputValue())
  const [gateUpdateNote, setGateUpdateNote] = useState("")

  const [mobName, setMobName] = useState("")
  const [mobComment, setMobComment] = useState("")
  const [mobStartedAt, setMobStartedAt] = useState(nowInputValue())
  const [mobMemberIds, setMobMemberIds] = useState<string[]>([])

  const [movementMobId, setMovementMobId] = useState(farm.mobs[0]?.id ?? "")
  const [movementFromPaddockId, setMovementFromPaddockId] = useState(farm.paddocks[0]?.id ?? "")
  const [movementToPaddockId, setMovementToPaddockId] = useState(farm.paddocks[0]?.id ?? "")
  const [movementMovedAt, setMovementMovedAt] = useState(nowInputValue())
  const [movementNote, setMovementNote] = useState("")

  const [feedPaddockId, setFeedPaddockId] = useState(farm.paddocks[0]?.id ?? "")
  const [feedRecordedAt, setFeedRecordedAt] = useState(nowInputValue())
  const [feedKgDmPerHa, setFeedKgDmPerHa] = useState("")
  const [feedSourceType, setFeedSourceType] = useState<FeedSourceType>(FeedSourceType.MANUAL)
  const [feedEstimateMethod, setFeedEstimateMethod] = useState("")
  const [feedConfidencePct, setFeedConfidencePct] = useState("")
  const [feedNote, setFeedNote] = useState("")

  const [workPaddockId, setWorkPaddockId] = useState(farm.paddocks[0]?.id ?? "")
  const [workType, setWorkType] = useState<PaddockWorkType>(PaddockWorkType.CHEMICAL_TREATMENT)
  const [workStartedAt, setWorkStartedAt] = useState(nowInputValue())
  const [workCompletedAt, setWorkCompletedAt] = useState("")
  const [workProductName, setWorkProductName] = useState("")
  const [workRate, setWorkRate] = useState("")
  const [workRateUnit, setWorkRateUnit] = useState("")
  const [workTotalQuantity, setWorkTotalQuantity] = useState("")
  const [workTotalQuantityUnit, setWorkTotalQuantityUnit] = useState("")
  const [workCost, setWorkCost] = useState("")
  const [workOperatorName, setWorkOperatorName] = useState("")
  const [workNotes, setWorkNotes] = useState("")

  const mobSummaries = useMemo(() => getCurrentMobSummaries(farm.mobs), [farm.mobs])
  const grazingPressureSummaries = useMemo(
    () => getGrazingPressureSummaries(farm.paddocks, farm.mobs),
    [farm.mobs, farm.paddocks]
  )
  const totalFarmDseDays = useMemo(
    () => getFarmGrazingPressureTotal(grazingPressureSummaries),
    [grazingPressureSummaries]
  )
  const feedHistorySeries = useMemo(() => getFeedHistorySeries(farm.paddocks), [farm.paddocks])

  const allFeedRecords = useMemo(
    () => farm.paddocks.flatMap((paddock) => paddock.feedRecords.map((record) => ({ paddockName: paddock.name, ...record }))),
    [farm.paddocks]
  )
  const allWorkEvents = useMemo(
    () => farm.paddocks.flatMap((paddock) => paddock.workEvents.map((event) => ({ paddockName: paddock.name, ...event }))),
    [farm.paddocks]
  )
  const allMovements = useMemo(
    () => farm.mobs.flatMap((mob) => mob.movements.map((movement) => ({ mobName: mob.name, ...movement }))),
    [farm.mobs]
  )
  const allGateChanges = useMemo(
    () => farm.gates.flatMap((gate) => gate.stateChanges.map((change) => ({ gateName: gate.name ?? "Gate", ...change }))),
    [farm.gates]
  )

  async function runAction(label: string, action: () => Promise<unknown>) {
    setBusy(label)
    setError(null)
    setSuccess(null)
    try {
      await action()
      setSuccess(`${label} saved.`)
      router.refresh()
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : `Unable to ${label.toLowerCase()}.`)
    } finally {
      setBusy(null)
    }
  }

  async function handleFarmBoundarySubmit(event: FormEvent) {
    event.preventDefault()
    await runAction("Farm boundary", async () => {
      const points = parseCoordinateText(boundaryText)
      await updateFarmBoundary(farm.id, points, boundaryAreaHa ? Number(boundaryAreaHa) : null)
    })
  }

  async function handlePaddockSubmit(event: FormEvent) {
    event.preventDefault()
    await runAction("Paddock", async () => {
      const points = parseCoordinateText(paddockBoundaryText)
      await createPaddock({
        farmId: farm.id,
        name: paddockName,
        description: paddockDescription || null,
        areaHa: paddockAreaHa ? Number(paddockAreaHa) : null,
        boundaryPoints: points,
      })
      setPaddockName("")
      setPaddockDescription("")
      setPaddockBoundaryText("")
      setPaddockAreaHa("")
    })
  }

  async function handleGateSubmit(event: FormEvent) {
    event.preventDefault()
    await runAction("Gate", async () => {
      await createGate({
        farmId: farm.id,
        fromPaddockId: gateFromPaddockId,
        toPaddockId: gateToPaddockId,
        latitude: Number(gateLatitude),
        longitude: Number(gateLongitude),
        name: gateName || null,
        notes: gateNote || null,
        initialState: gateState,
        recordedAt: new Date(gateRecordedAt),
        note: gateNote || null,
      })
      setGateName("")
      setGateLatitude("")
      setGateLongitude("")
      setGateNote("")
    })
  }

  async function handleGateStateSubmit(event: FormEvent) {
    event.preventDefault()
    await runAction("Gate state", async () => {
      await updateGateState({
        gateId: selectedGateId,
        state: gateUpdateState,
        recordedAt: new Date(gateUpdateRecordedAt),
        note: gateUpdateNote || null,
      })
      setGateUpdateNote("")
    })
  }

  async function handleMobSubmit(event: FormEvent) {
    event.preventDefault()
    await runAction("Mob", async () => {
      await createMob({
        farmId: farm.id,
        name: mobName,
        comment: mobComment || null,
        livestockUnitIds: mobMemberIds,
        startedAt: new Date(mobStartedAt),
        note: mobComment || null,
      })
      setMobName("")
      setMobComment("")
      setMobMemberIds([])
    })
  }

  async function handleMovementSubmit(event: FormEvent) {
    event.preventDefault()
    await runAction("Mob movement", async () => {
      await recordMobMovement({
        mobId: movementMobId,
        fromPaddockId: movementFromPaddockId || null,
        toPaddockId: movementToPaddockId,
        movedAt: new Date(movementMovedAt),
        note: movementNote || null,
      })
      setMovementNote("")
    })
  }

  async function handleFeedSubmit(event: FormEvent) {
    event.preventDefault()
    await runAction("Feed record", async () => {
      await createPaddockFeedRecord({
        paddockId: feedPaddockId,
        recordedAt: new Date(feedRecordedAt),
        feedKgDmPerHa: Number(feedKgDmPerHa),
        sourceType: feedSourceType,
        estimateMethod: feedEstimateMethod || null,
        confidencePct: feedConfidencePct ? Number(feedConfidencePct) : null,
        note: feedNote || null,
      })
      setFeedKgDmPerHa("")
      setFeedEstimateMethod("")
      setFeedConfidencePct("")
      setFeedNote("")
    })
  }

  async function handleWorkSubmit(event: FormEvent) {
    event.preventDefault()
    await runAction("Paddock work", async () => {
      await createPaddockWorkEvent({
        paddockId: workPaddockId,
        workType,
        startedAt: new Date(workStartedAt),
        completedAt: workCompletedAt ? new Date(workCompletedAt) : null,
        productName: workProductName || null,
        rate: workRate ? Number(workRate) : null,
        rateUnit: workRateUnit || null,
        totalQuantity: workTotalQuantity ? Number(workTotalQuantity) : null,
        totalQuantityUnit: workTotalQuantityUnit || null,
        cost: workCost ? Number(workCost) : null,
        operatorName: workOperatorName || null,
        notes: workNotes || null,
      })
      setWorkProductName("")
      setWorkRate("")
      setWorkRateUnit("")
      setWorkTotalQuantity("")
      setWorkTotalQuantityUnit("")
      setWorkCost("")
      setWorkOperatorName("")
      setWorkNotes("")
    })
  }

  return (
    <Stack spacing={3} width="100%">
      {error ? <Alert severity="error">{error}</Alert> : null}
      {success ? <Alert severity="success">{success}</Alert> : null}

      <Card>
        <CardHeader title={farm.name} subheader={farm.businessName ?? "Farm workspace"} />
        <CardContent>
          <Stack direction={{ xs: "column", md: "row" }} spacing={1} useFlexGap flexWrap="wrap">
            <Chip label={`Farm area ${farm.areaHa?.toFixed(2) ?? "0.00"} ha`} />
            <Chip label={`${farm.paddocks.length} paddocks`} />
            <Chip label={`${farm.mobs.length} mobs`} />
            <Chip label={`${farm.gates.length} gates`} />
            <Chip label={`${farm.onFarms.length} livestock on farm`} />
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <Tabs value={tab} onChange={(_, nextValue: WorkspaceTab) => setTab(nextValue)} variant="scrollable" scrollButtons="auto">
          <Tab label="Map" value="map" />
          <Tab label="Paddocks" value="paddocks" />
          <Tab label="Mobs" value="mobs" />
          <Tab label="Feed" value="feed" />
          <Tab label="Work" value="work" />
          <Tab label="Analytics" value="analytics" />
          <Tab label="History" value="history" />
        </Tabs>
      </Card>

      {tab === "map" ? (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Card>
              <CardHeader title="Farm map" subheader="Boundary, paddocks, gates, and current mob locations" />
              <CardContent>
                <FarmMap farm={farm} />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack spacing={2}>
              <Card>
                <CardHeader title="Current mobs" />
                <CardContent>
                  <Stack spacing={1}>
                    {mobSummaries.map((mob) => {
                      const paddock = farm.paddocks.find((candidate) => candidate.id === mob.currentPaddockId)
                      return (
                        <Box key={mob.mobId}>
                          <Typography fontWeight={600}>{mob.mobName}</Typography>
                          <Typography variant="body2">{mob.currentDse} DSE · {paddock?.name ?? "No paddock recorded"}</Typography>
                        </Box>
                      )
                    })}
                  </Stack>
                </CardContent>
              </Card>
              <Card component="form" onSubmit={handleGateStateSubmit}>
                <CardHeader title="Update gate state" />
                <CardContent>
                  <Stack spacing={2}>
                    <TextField select label="Gate" value={selectedGateId} onChange={(event) => setSelectedGateId(event.target.value)}>
                      {farm.gates.map((gate) => (
                        <MenuItem key={gate.id} value={gate.id}>{gate.name ?? `${gate.fromPaddock.name} → ${gate.toPaddock.name}`}</MenuItem>
                      ))}
                    </TextField>
                    <TextField select label="State" value={gateUpdateState} onChange={(event) => setGateUpdateState(event.target.value as GateState)}>
                      {Object.values(GateState).map((value) => (
                        <MenuItem key={value} value={value}>{value}</MenuItem>
                      ))}
                    </TextField>
                    <TextField label="Recorded at" type="datetime-local" value={gateUpdateRecordedAt} onChange={(event) => setGateUpdateRecordedAt(event.target.value)} InputLabelProps={{ shrink: true }} />
                    <TextField label="Note" value={gateUpdateNote} onChange={(event) => setGateUpdateNote(event.target.value)} multiline minRows={2} />
                    <Button type="submit" variant="contained" disabled={busy !== null || !selectedGateId}>Save gate change</Button>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      ) : null}

      {tab === "paddocks" ? (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card component="form" onSubmit={handleFarmBoundarySubmit}>
              <CardHeader title="Farm boundary" subheader="Enter one latitude, longitude pair per line" />
              <CardContent>
                <Stack spacing={2}>
                  <TextField label="Boundary coordinates" value={boundaryText} onChange={(event) => setBoundaryText(event.target.value)} multiline minRows={8} fullWidth />
                  <TextField label="Area (ha)" value={boundaryAreaHa} onChange={(event) => setBoundaryAreaHa(event.target.value)} helperText={undefined} />
                  <Button type="submit" variant="contained" disabled={busy !== null}>Save farm boundary</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card component="form" onSubmit={handlePaddockSubmit}>
              <CardHeader title="Add paddock" />
              <CardContent>
                <Stack spacing={2}>
                  <TextField label="Name" value={paddockName} onChange={(event) => setPaddockName(event.target.value)} required />
                  <TextField label="Description" value={paddockDescription} onChange={(event) => setPaddockDescription(event.target.value)} multiline minRows={2} />
                  <TextField label="Boundary coordinates" value={paddockBoundaryText} onChange={(event) => setPaddockBoundaryText(event.target.value)} multiline minRows={8} required />
                  <TextField label="Area (ha)" value={paddockAreaHa} onChange={(event) => setPaddockAreaHa(event.target.value)} />
                  <Button type="submit" variant="contained" disabled={busy !== null}>Create paddock</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardHeader title="Paddocks" />
              <CardContent>
                <Stack spacing={2}>
                  {farm.paddocks.map((paddock) => (
                    <Box key={paddock.id}>
                      <Typography fontWeight={600}>{paddock.name}</Typography>
                      <Typography variant="body2">{paddock.areaHa.toFixed(2)} ha · {paddock.description ?? "No description"}</Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card component="form" onSubmit={handleGateSubmit}>
              <CardHeader title="Add gate" />
              <CardContent>
                <Stack spacing={2}>
                  <TextField label="Gate name" value={gateName} onChange={(event) => setGateName(event.target.value)} />
                  <TextField select label="From paddock" value={gateFromPaddockId} onChange={(event) => setGateFromPaddockId(event.target.value)} required>
                    {farm.paddocks.map((paddock) => <MenuItem key={paddock.id} value={paddock.id}>{paddock.name}</MenuItem>)}
                  </TextField>
                  <TextField select label="To paddock" value={gateToPaddockId} onChange={(event) => setGateToPaddockId(event.target.value)} required>
                    {farm.paddocks.map((paddock) => <MenuItem key={paddock.id} value={paddock.id}>{paddock.name}</MenuItem>)}
                  </TextField>
                  <TextField label="Latitude" value={gateLatitude} onChange={(event) => setGateLatitude(event.target.value)} required />
                  <TextField label="Longitude" value={gateLongitude} onChange={(event) => setGateLongitude(event.target.value)} required />
                  <TextField select label="Initial state" value={gateState} onChange={(event) => setGateState(event.target.value as GateState)}>
                    {Object.values(GateState).map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)}
                  </TextField>
                  <TextField label="Recorded at" type="datetime-local" value={gateRecordedAt} onChange={(event) => setGateRecordedAt(event.target.value)} InputLabelProps={{ shrink: true }} />
                  <TextField label="Notes" value={gateNote} onChange={(event) => setGateNote(event.target.value)} multiline minRows={2} />
                  <Button type="submit" variant="contained" disabled={busy !== null}>Create gate</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : null}

      {tab === "mobs" ? (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card component="form" onSubmit={handleMobSubmit}>
              <CardHeader title="Create mob" />
              <CardContent>
                <Stack spacing={2}>
                  <TextField label="Mob name" value={mobName} onChange={(event) => setMobName(event.target.value)} required />
                  <TextField label="Comment" value={mobComment} onChange={(event) => setMobComment(event.target.value)} multiline minRows={2} />
                  <TextField label="Started at" type="datetime-local" value={mobStartedAt} onChange={(event) => setMobStartedAt(event.target.value)} InputLabelProps={{ shrink: true }} />
                  <TextField
                    select
                    label="Members"
                    value={mobMemberIds}
                    onChange={(event) => setMobMemberIds(typeof event.target.value === "string" ? event.target.value.split(",") : event.target.value)}
                    SelectProps={{ multiple: true }}
                    helperText="Select beasts to define the mob"
                  >
                    {farm.onFarms.map(({ livestockUnit }) => (
                      <MenuItem key={livestockUnit.id} value={livestockUnit.id}>
                        {(livestockUnit.name ?? livestockUnit.id)} · {livestockUnit.drySheepEquivalent} DSE
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button type="submit" variant="contained" disabled={busy !== null}>Create mob</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card component="form" onSubmit={handleMovementSubmit}>
              <CardHeader title="Record mob movement" />
              <CardContent>
                <Stack spacing={2}>
                  <TextField select label="Mob" value={movementMobId} onChange={(event) => setMovementMobId(event.target.value)} required>
                    {farm.mobs.map((mob) => <MenuItem key={mob.id} value={mob.id}>{mob.name ?? "Unnamed mob"}</MenuItem>)}
                  </TextField>
                  <TextField select label="From paddock" value={movementFromPaddockId} onChange={(event) => setMovementFromPaddockId(event.target.value)}>
                    {farm.paddocks.map((paddock) => <MenuItem key={paddock.id} value={paddock.id}>{paddock.name}</MenuItem>)}
                  </TextField>
                  <TextField select label="To paddock" value={movementToPaddockId} onChange={(event) => setMovementToPaddockId(event.target.value)} required>
                    {farm.paddocks.map((paddock) => <MenuItem key={paddock.id} value={paddock.id}>{paddock.name}</MenuItem>)}
                  </TextField>
                  <TextField label="Moved at" type="datetime-local" value={movementMovedAt} onChange={(event) => setMovementMovedAt(event.target.value)} InputLabelProps={{ shrink: true }} />
                  <TextField label="Note" value={movementNote} onChange={(event) => setMovementNote(event.target.value)} multiline minRows={2} />
                  <Button type="submit" variant="contained" disabled={busy !== null}>Save movement</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardHeader title="Mob summaries" />
              <CardContent>
                <Stack spacing={2}>
                  {farm.mobs.map((mob) => (
                    <Box key={mob.id}>
                      <Typography fontWeight={600}>{mob.name ?? "Unnamed mob"}</Typography>
                      <Typography variant="body2">{mob.members.length} beasts · {mob.members.reduce((sum, member) => sum + member.drySheepEquivalent, 0)} DSE</Typography>
                      <Typography variant="body2">Latest move: {mob.movements[mob.movements.length - 1]?.toPaddock.name ?? "No movement recorded"}</Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : null}

      {tab === "feed" ? (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 5 }}>
            <Card component="form" onSubmit={handleFeedSubmit}>
              <CardHeader title="Record feed availability" />
              <CardContent>
                <Stack spacing={2}>
                  <TextField select label="Paddock" value={feedPaddockId} onChange={(event) => setFeedPaddockId(event.target.value)} required>
                    {farm.paddocks.map((paddock) => <MenuItem key={paddock.id} value={paddock.id}>{paddock.name}</MenuItem>)}
                  </TextField>
                  <TextField label="Recorded at" type="datetime-local" value={feedRecordedAt} onChange={(event) => setFeedRecordedAt(event.target.value)} InputLabelProps={{ shrink: true }} />
                  <TextField label="Feed availability (kg DM/ha)" value={feedKgDmPerHa} onChange={(event) => setFeedKgDmPerHa(event.target.value)} required />
                  <TextField select label="Source" value={feedSourceType} onChange={(event) => setFeedSourceType(event.target.value as FeedSourceType)}>
                    {Object.values(FeedSourceType).map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)}
                  </TextField>
                  <TextField label="Estimate method" value={feedEstimateMethod} onChange={(event) => setFeedEstimateMethod(event.target.value)} />
                  <TextField label="Confidence %" value={feedConfidencePct} onChange={(event) => setFeedConfidencePct(event.target.value)} />
                  <TextField label="Note" value={feedNote} onChange={(event) => setFeedNote(event.target.value)} multiline minRows={2} />
                  <Button type="submit" variant="contained" disabled={busy !== null}>Save feed record</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Card>
              <CardHeader title="Feed history" />
              <CardContent>
                {feedHistorySeries.length > 0 ? (
                  <LineChart
                    height={280}
                    xAxis={[{ scaleType: "point", data: feedHistorySeries.map((point) => point.label) }]}
                    series={[{ data: feedHistorySeries.map((point) => point.value), label: "kg DM/ha" }]}
                  />
                ) : (
                  <Typography variant="body2">No feed records yet.</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : null}

      {tab === "work" ? (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 5 }}>
            <Card component="form" onSubmit={handleWorkSubmit}>
              <CardHeader title="Record paddock work" />
              <CardContent>
                <Stack spacing={2}>
                  <TextField select label="Paddock" value={workPaddockId} onChange={(event) => setWorkPaddockId(event.target.value)} required>
                    {farm.paddocks.map((paddock) => <MenuItem key={paddock.id} value={paddock.id}>{paddock.name}</MenuItem>)}
                  </TextField>
                  <TextField select label="Work type" value={workType} onChange={(event) => setWorkType(event.target.value as PaddockWorkType)}>
                    {Object.values(PaddockWorkType).map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)}
                  </TextField>
                  <TextField label="Started at" type="datetime-local" value={workStartedAt} onChange={(event) => setWorkStartedAt(event.target.value)} InputLabelProps={{ shrink: true }} />
                  <TextField label="Completed at" type="datetime-local" value={workCompletedAt} onChange={(event) => setWorkCompletedAt(event.target.value)} InputLabelProps={{ shrink: true }} />
                  <TextField label="Product or input" value={workProductName} onChange={(event) => setWorkProductName(event.target.value)} />
                  <TextField label="Rate" value={workRate} onChange={(event) => setWorkRate(event.target.value)} />
                  <TextField label="Rate unit" value={workRateUnit} onChange={(event) => setWorkRateUnit(event.target.value)} />
                  <TextField label="Total quantity" value={workTotalQuantity} onChange={(event) => setWorkTotalQuantity(event.target.value)} />
                  <TextField label="Quantity unit" value={workTotalQuantityUnit} onChange={(event) => setWorkTotalQuantityUnit(event.target.value)} />
                  <TextField label="Cost" value={workCost} onChange={(event) => setWorkCost(event.target.value)} />
                  <TextField label="Operator" value={workOperatorName} onChange={(event) => setWorkOperatorName(event.target.value)} />
                  <TextField label="Notes" value={workNotes} onChange={(event) => setWorkNotes(event.target.value)} multiline minRows={2} />
                  <Button type="submit" variant="contained" disabled={busy !== null}>Save work record</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Card>
              <CardHeader title="Recent work" />
              <CardContent>
                <Stack spacing={2}>
                  {allWorkEvents.length > 0 ? allWorkEvents.map((event) => (
                    <Box key={event.id}>
                      <Typography fontWeight={600}>{event.paddockName} · {event.workType}</Typography>
                      <Typography variant="body2">{formatDateTime(event.startedAt)} · {event.productName ?? "No product"}</Typography>
                      <Typography variant="body2">{event.operatorName ?? "No operator"} · {event.cost ? `$${event.cost.toFixed(2)}` : "No cost"}</Typography>
                    </Box>
                  )) : <Typography variant="body2">No work events yet.</Typography>}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : null}

      {tab === "analytics" ? (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardHeader title="Current mob DSE" />
              <CardContent>
                <Typography variant="h4">{mobSummaries.reduce((sum, mob) => sum + mob.currentDse, 0)}</Typography>
                <Typography variant="body2">Across {mobSummaries.length} mobs</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardHeader title="Farm grazing pressure" />
              <CardContent>
                <Typography variant="h4">{totalFarmDseDays}</Typography>
                <Typography variant="body2">DSE-days across farm history</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardHeader title="Paddock coverage" />
              <CardContent>
                <Typography variant="h4">{farm.paddocks.reduce((sum, paddock) => sum + paddock.areaHa, 0).toFixed(2)} ha</Typography>
                <Typography variant="body2">Total mapped paddock area</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardHeader title="Grazing pressure by paddock" />
              <CardContent>
                <Stack spacing={1}>
                  {grazingPressureSummaries.map((summary) => (
                    <Box key={summary.paddockId}>
                      <Typography fontWeight={600}>{summary.paddockName}</Typography>
                      <Typography variant="body2">{summary.totalDseDays} DSE-days · {summary.dseDaysPerHa} DSE-days/ha</Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : null}

      {tab === "history" ? (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader title="Mob movements" />
              <CardContent>
                <Stack spacing={1}>
                  {allMovements.length > 0 ? allMovements.map((movement) => (
                    <Box key={movement.id}>
                      <Typography fontWeight={600}>{movement.mobName ?? "Unnamed mob"}</Typography>
                      <Typography variant="body2">{movement.fromPaddock?.name ?? "Outside"} → {movement.toPaddock.name}</Typography>
                      <Typography variant="body2">{formatDateTime(movement.movedAt)}</Typography>
                    </Box>
                  )) : <Typography variant="body2">No movements yet.</Typography>}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader title="Gate history" />
              <CardContent>
                <Stack spacing={1}>
                  {allGateChanges.length > 0 ? allGateChanges.map((change) => (
                    <Box key={change.id}>
                      <Typography fontWeight={600}>{change.gateName}</Typography>
                      <Typography variant="body2">{change.state} · {formatDateTime(change.recordedAt)}</Typography>
                    </Box>
                  )) : <Typography variant="body2">No gate changes yet.</Typography>}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader title="Feed history" />
              <CardContent>
                <Stack spacing={1}>
                  {allFeedRecords.length > 0 ? allFeedRecords.map((record) => (
                    <Box key={record.id}>
                      <Typography fontWeight={600}>{record.paddockName}</Typography>
                      <Typography variant="body2">{record.feedKgDmPerHa} kg DM/ha · {record.sourceType}</Typography>
                      <Typography variant="body2">{formatDateTime(record.recordedAt)}</Typography>
                    </Box>
                  )) : <Typography variant="body2">No feed records yet.</Typography>}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card>
              <CardHeader title="Work history" />
              <CardContent>
                <Stack spacing={1}>
                  {allWorkEvents.length > 0 ? allWorkEvents.map((event) => (
                    <Box key={event.id}>
                      <Typography fontWeight={600}>{event.paddockName}</Typography>
                      <Typography variant="body2">{event.workType} · {event.productName ?? "No product"}</Typography>
                      <Typography variant="body2">{formatDateTime(event.startedAt)}</Typography>
                    </Box>
                  )) : <Typography variant="body2">No work events yet.</Typography>}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : null}
    </Stack>
  )
}
