"use client"

import { ActiveLivestock } from '../basicDetails'
import { GiBull, GiCow, GiFemale, GiHelp, GiMale } from 'react-icons/gi'
import { HiScissors } from 'react-icons/hi'
import { 
    Card, 
    CardHeader, 
    CardBody, 
    Text, 
    Divider, 
    Tag, 
    TagLabel, 
    Stat,
    StatArrow,
    StatHelpText,
    StatLabel,
    StatNumber, 
    TagLeftIcon,
    HStack,
    VStack,
    Stack,
    WrapItem,
    Wrap
} from '../chakraShim'
import { IconType } from 'react-icons/lib'

export function WeightStats(props: any){
    if (props.length > 0){
        let statArrow: "increase" | "decrease" | undefined
        if (props.length > 1){
            console.log("more than one weight found")
            const statChange = Number(props[-2].weight) - Number(props[-1].weight) 
            if (statChange >= 0){
                statArrow = "increase"
            } else {
                statArrow = "decrease"
            }
            return (
                <Stat>
                    <StatLabel>Live weight multi</StatLabel>
                    <StatNumber>{props[0].weight + "kg"}</StatNumber>
                    <StatHelpText>
                        <StatArrow type={statArrow} />
                        {String(statChange) + "kg"}
                    </StatHelpText>
                </Stat> 
            )
        } else {
            return (
                <Stat>
                    <StatLabel>Live weight only one</StatLabel>
                    <StatNumber>{props[0].weight + "kg"}</StatNumber>
                </Stat>
                )
        }
    } 
}

function sexTag(sex: string) {
    let SexIcon: IconType
    let sexColour: string
    if(sex == 'FEMALE'){
        SexIcon = GiFemale
        sexColour = 'pink'
    } else if (sex == 'MALE') {
        SexIcon = GiMale
        sexColour = 'blue'
    } else {
        SexIcon = GiHelp
        sexColour = 'white'
    }
    return (
        <Tag colorScheme={sexColour}>
            <HStack spacing='6px'>
                <SexIcon />
                <TagLabel>{sex}</TagLabel>
            </HStack>
        </Tag>
    )
}

function desexedTag(desexed: boolean, sex: string) {
    let DesexedIcon: IconType
    let desexedText: String
    if(desexed){
        DesexedIcon = HiScissors
        desexedText = "DESEXED"
    } else {
        if (sex == 'MALE'){
            DesexedIcon = GiBull
            desexedText = "INTACT"
        } else {
            return
        }
    }
    return (
        <Tag colorScheme='green'>
            <HStack>
                <DesexedIcon />
                <TagLabel>{desexedText}</TagLabel>
            </HStack>
        </Tag>
    )
}

function stockClassTag(stockClass: String) {
    if(stockClass == "CATTLE"){
        return (   
            <Tag color='burlywood'>
                <HStack spacing='6px'>
                    <GiCow />
                    <TagLabel>{stockClass}</TagLabel>
                </HStack>
            </Tag> 
        )
    } else {
        return (
            <Tag>
                <TagLabel>{stockClass}</TagLabel>
            </Tag>
        )
    }
}

// export async function LivestockCards() {
//     const livestocks = ActiveLivestock()

//     return (
//         <Wrap>
//         {livestocks.map(function(stock, index){
//             return (
//                 <WrapItem key={index}>
//                     <Card key={"stockCard" + index}>
//                         <CardHeader>
//                             <Text>{stock.name}</Text>
//                             <Text>{stock.nlisId}</Text>
//                         </CardHeader>
//                         <CardBody>
                            
//                             <HStack>
//                                 {stockClassTag(stock.class)}
//                                 {sexTag(stock.sex)}
//                                 {desexedTag(stock.desexed, stock.sex)}
//                             </HStack>
//                             {weightStats(stock.weights)}

//                         </CardBody>
//                     </Card>
//                     {/* <Divider orientation='horizontal'/> */}
//                 </WrapItem>
//             )
//         })}
//         </Wrap>    
//     )
// } 