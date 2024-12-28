"use client"

import { getActiveLivestock } from '../queries'
import { 
  HStack,
  Text,
  Card
} from "@chakra-ui/react"
import { DesexedTag, SexTag, StockClassTag } from './Tags'
import { WeightStats } from './Stats'
import { LivestockUnit } from '@prisma/client'






export async function LivestockCards() {
  const livestocks: LivestockUnit[] = await getActiveLivestock()
  return (
    <HStack wrap={"wrap"}>
      {livestocks.map(function(stock: any, index){
        return (
          <div key={index}>
            <Card.Root key={"stockCard" + index}>
              <Card.Header>
                <Text>{stock.name}</Text>
                <Text>{stock.nlisId}</Text>
              </Card.Header>
              <Card.Body>
                <HStack>
                  {StockClassTag({stockClass: stock.class})}
                  {SexTag({sex: stock.sex})}
                  {DesexedTag({desexed: stock.desexed, sex: stock.sex})}
                </HStack>
                  {WeightStats({weights: stock.weights})}
              </Card.Body>
            </Card.Root>
          </div>
        )
      })}
    </HStack>    
  )
} 