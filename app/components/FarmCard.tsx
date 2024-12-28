import { LiveStockCountStat } from "./Stats"
import { LivestockCards } from "./LivestockCards"
import { Tabs, Card } from "@chakra-ui/react"
import { 
  StatLabel, 
  StatRoot, 
  StatValueText,
  StatValueUnit,
  StatHelpText,
  StatDownTrend,
  StatUpTrend
} from "@/components/ui/stat"
import { getActiveLivestockCount, getFarmName, getActiveLivestock } from "../queries"


export async function FarmCard(){
  const liveStockCount = Number(await getActiveLivestockCount())
  const farmName = await getFarmName()
  const activeLivestock = await getActiveLivestock()
  return (
    <Tabs.Root fitted variant='enclosed'>
      <Tabs.List mb='1em'>
        <Tabs.Trigger value="farm">Farm</Tabs.Trigger>
        <Tabs.Trigger value="livestock">Livestock</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="farm">
        <Card.Root>
          <Card.Header>
            {farmName} 
          </Card.Header>
          <Card.Body>
            <LiveStockCountStat currentCount={1} priorCount={undefined} trendLabel={undefined}/>
            <StatRoot>
              <StatLabel>Dry sheep equivalent</StatLabel>
              <StatValueText>{"547?"}</StatValueText>
            </StatRoot>
            <StatRoot>
              <StatLabel>Days to next birth</StatLabel>
              <StatValueText>2</StatValueText>
            </StatRoot>
            <StatRoot>
              <StatLabel>Livestock market value</StatLabel>
              <StatValueText value={99999} formatOptions={{style: "currency", currency: "AUD"}}></StatValueText>
              <StatUpTrend>"23.36%"</StatUpTrend>
              <StatHelpText>
              </StatHelpText>
            </StatRoot>
            <StatRoot>
              <StatLabel>Rainfall 30 days</StatLabel>
              <StatValueText>??? mm</StatValueText>
              <StatUpTrend>23.36%</StatUpTrend>
              <StatHelpText>
                from last the same period last year
              </StatHelpText>
            </StatRoot>
          </Card.Body>
          <Card.Footer>
            Farm Statistics
          </Card.Footer>
        </Card.Root>
      </Tabs.Content>
    <Tabs.Content value="livestock">
      <LivestockCards />
    </Tabs.Content>
    </Tabs.Root>
  )
}