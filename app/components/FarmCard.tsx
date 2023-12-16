import { LivestockCount, FarmName, ActiveLivestock, ActiveDrySheepEquivalent } from "../basicDetails"
import { GiCow } from 'react-icons/gi';
import { LivestockCards } from "./LivestockCards"
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  Text,  
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber, 
  StatGroup,
  HStack
 } from '../chakraShim'

const livestocks = await ActiveLivestock()

export function FarmCard(){
  return (
    <Tabs isFitted variant='enclosed'>
      <TabList mb='1em'>
        <Tab>Farm</Tab>
        <Tab>Livestock</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Card>
            <CardHeader>
              <Text>{FarmName()}</Text> 
            </CardHeader>
            <CardBody>
            <StatGroup>
              <Stat>
                <StatLabel>Livestock</StatLabel>
                <StatNumber>{LivestockCount()}</StatNumber>
              </Stat>

              <Stat>
                <StatLabel>Dry sheep equivalent</StatLabel>
                <StatNumber>{ActiveDrySheepEquivalent()}</StatNumber>
              </Stat>

              <Stat>
                <StatLabel>Days to next birth</StatLabel>
                <StatNumber>2</StatNumber>
              </Stat>

              <Stat>
                <StatLabel>Livestock market value</StatLabel>
                <StatNumber>$???</StatNumber>
                <StatHelpText>
                  <StatArrow type='increase' />
                  23.36%
                </StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Rainfall 30 days</StatLabel>
                <StatNumber>$???</StatNumber>
                <StatHelpText>
                  <StatArrow type='increase' />
                  23.36% from last year
                </StatHelpText>
              </Stat>
            </StatGroup>
          </CardBody>
          <CardFooter>
            <Text>
              Farm Statistics
            </Text>
          </CardFooter>
        </Card>
        </TabPanel>
        <TabPanel>
           <LivestockCards />
         </TabPanel>
      </TabPanels>
    </Tabs>
  )
}