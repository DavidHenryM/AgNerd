const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24

type MobMember = {
  drySheepEquivalent: number
}

type MobMovement = {
  movedAt: Date | string
  toPaddockId: string
}

type MobAnalyticsInput = {
  id: string
  name: string | null
  members: MobMember[]
  movements: MobMovement[]
}

type FeedRecord = {
  recordedAt: Date | string
  feedKgDmPerHa: number
}

type PaddockAnalyticsInput = {
  id: string
  name: string
  areaHa: number
  feedRecords: FeedRecord[]
}

export type CurrentMobSummary = {
  mobId: string
  mobName: string
  currentDse: number
  currentPaddockId: string | null
}

export type GrazingPressureSummary = {
  paddockId: string
  paddockName: string
  totalDseDays: number
  dseDaysPerHa: number
}

export type FeedHistoryPoint = {
  label: string
  value: number
}

function asDate(value: Date | string): Date {
  return value instanceof Date ? value : new Date(value)
}

export function getCurrentMobSummaries(mobs: MobAnalyticsInput[]): CurrentMobSummary[] {
  return mobs.map((mob) => {
    const sortedMovements = mob.movements
      .slice()
      .sort((left, right) => asDate(left.movedAt).getTime() - asDate(right.movedAt).getTime())
    const latestMovement = sortedMovements[sortedMovements.length - 1]

    return {
      mobId: mob.id,
      mobName: mob.name ?? "Unnamed mob",
      currentDse: mob.members.reduce((sum, member) => sum + member.drySheepEquivalent, 0),
      currentPaddockId: latestMovement?.toPaddockId ?? null,
    }
  })
}

export function getGrazingPressureSummaries(
  paddocks: PaddockAnalyticsInput[],
  mobs: MobAnalyticsInput[],
  now = new Date()
): GrazingPressureSummary[] {
  const paddockMap = new Map(
    paddocks.map((paddock) => [
      paddock.id,
      {
        paddockId: paddock.id,
        paddockName: paddock.name,
        areaHa: paddock.areaHa,
        totalDseDays: 0,
      },
    ])
  )

  for (const mob of mobs) {
    const currentDse = mob.members.reduce((sum, member) => sum + member.drySheepEquivalent, 0)
    const sortedMovements = mob.movements
      .slice()
      .sort((left, right) => asDate(left.movedAt).getTime() - asDate(right.movedAt).getTime())

    for (let index = 0; index < sortedMovements.length; index += 1) {
      const movement = sortedMovements[index]
      const intervalStart = asDate(movement.movedAt)
      const intervalEnd = sortedMovements[index + 1]
        ? asDate(sortedMovements[index + 1].movedAt)
        : now
      const durationDays = Math.max(0, intervalEnd.getTime() - intervalStart.getTime()) / MILLISECONDS_PER_DAY
      const paddock = paddockMap.get(movement.toPaddockId)

      if (!paddock || durationDays <= 0) {
        continue
      }

      paddock.totalDseDays += currentDse * durationDays
    }
  }

  return Array.from(paddockMap.values()).map((paddock) => ({
    paddockId: paddock.paddockId,
    paddockName: paddock.paddockName,
    totalDseDays: Number(paddock.totalDseDays.toFixed(2)),
    dseDaysPerHa:
      paddock.areaHa > 0 ? Number((paddock.totalDseDays / paddock.areaHa).toFixed(2)) : 0,
  }))
}

export function getFarmGrazingPressureTotal(summaries: GrazingPressureSummary[]): number {
  return Number(summaries.reduce((sum, summary) => sum + summary.totalDseDays, 0).toFixed(2))
}

export function getFeedHistorySeries(paddocks: PaddockAnalyticsInput[]): FeedHistoryPoint[] {
  return paddocks.flatMap((paddock) =>
    paddock.feedRecords
      .slice()
      .sort((left, right) => asDate(left.recordedAt).getTime() - asDate(right.recordedAt).getTime())
      .map((record) => ({
        label: `${paddock.name} ${asDate(record.recordedAt).toLocaleDateString()}`,
        value: record.feedKgDmPerHa,
      }))
  )
}
