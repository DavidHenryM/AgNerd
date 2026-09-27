export type FarmWorkspacePoint = {
  id: string
  latitude: number
  longitude: number
  sortOrder: number
}

export type FarmWorkspaceLivestock = {
  id: string
  name: string | null
  drySheepEquivalent: number
  mobRef?: string | null
  active?: boolean
}

export type FarmWorkspaceFeedRecord = {
  id: string
  recordedAt: Date | string
  feedKgDmPerHa: number
  sourceType: string
  estimateMethod: string | null
  confidencePct: number | null
  note: string | null
}

export type FarmWorkspaceWorkEvent = {
  id: string
  workType: string
  startedAt: Date | string
  completedAt: Date | string | null
  productName: string | null
  rate: number | null
  rateUnit: string | null
  totalQuantity: number | null
  totalQuantityUnit: string | null
  cost: number | null
  operatorName: string | null
  notes: string | null
}

export type FarmWorkspacePaddock = {
  id: string
  name: string
  description: string | null
  areaHa: number
  polygon: FarmWorkspacePoint[]
  feedRecords: FarmWorkspaceFeedRecord[]
  workEvents: FarmWorkspaceWorkEvent[]
}

export type FarmWorkspaceGateStateChange = {
  id: string
  state: string
  recordedAt: Date | string
  note: string | null
}

export type FarmWorkspaceGate = {
  id: string
  name: string | null
  latitude: number
  longitude: number
  notes: string | null
  fromPaddock: { id: string; name: string }
  toPaddock: { id: string; name: string }
  stateChanges: FarmWorkspaceGateStateChange[]
}

export type FarmWorkspaceMembership = {
  id: string
  startDate: Date | string
  endDate: Date | string | null
  note: string | null
  livestockUnit: FarmWorkspaceLivestock
}

export type FarmWorkspaceMovement = {
  id: string
  movedAt: Date | string
  note: string | null
  fromPaddock: { id: string; name: string } | null
  toPaddock: { id: string; name: string }
  toPaddockId: string
  fromPaddockId?: string | null
}

export type FarmWorkspaceMob = {
  id: string
  name: string | null
  comment: string | null
  members: FarmWorkspaceLivestock[]
  memberships: FarmWorkspaceMembership[]
  movements: FarmWorkspaceMovement[]
}

export type FarmWorkspaceFarm = {
  id: string
  name: string
  slug: string | null
  businessName: string | null
  pic: string | null
  abn: string | null
  acn: string | null
  areaHa: number | null
  locationCentre: { latitude: number; longitude: number } | null
  boundaryPoints: FarmWorkspacePoint[]
  paddocks: FarmWorkspacePaddock[]
  gates: FarmWorkspaceGate[]
  mobs: FarmWorkspaceMob[]
  onFarms: { livestockUnit: FarmWorkspaceLivestock }[]
}
