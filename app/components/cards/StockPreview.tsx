import { Icons } from "@app/lib/Icons"
import { getAge,  parseColour } from "@app/utils/utils"
import { LivestockUnit, WeightRecord } from "@generated/browser"
import Link from "next/link"
import { useState } from "react"
import AddWeightDialogue from "@components/dialogues/AddWeightDialogue"
import PregDialogue from "@components/dialogues/PregDialogue"
import TreatmentDialogue from "@components/dialogues/TreatmentDialogue"
import { EarTagGraphic } from "@components/EarTag"
import { WeightStats } from "@components/Stats"
import { StockClassChip, SexChip, DesexedChip, CommercialClassChip } from "@components/Chips"
import { Card, CardContent, CardHeader, IconButton, CardMedia, CardActions, Collapse, IconButtonProps, styled} from "@mui/material"
import { Stack, Typography, Button } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function StockPreviewCard(props: {stock: LivestockUnit, index: number, onClick: () => void}) {
  const [openWeight, setOpenWeight] = useState(false)
  const [openPreg, setOpenPreg] = useState(false)
  const [openTreat, setOpenTreat] = useState(false)
  const [stock, setStock] = useState<LivestockUnit & {weights?: WeightRecord[]}>(props.stock)
  const [openMenu, setOpenMenu] = useState(false)
  const [expanded, setExpanded] = useState(false);
  const age = getAge(props.stock.birthDate)

  return (  
    <>
      <Card key={"stockCard" + props.index}>  
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={()=>(setOpenMenu(true))}>
               <Icons.GiCardboardBox/>
            </IconButton>
          }
          title={stock.angusTechId}
          subheader={stock.name}
        />
        <CardMedia sx={{minHeight:"275px"}}>
          <EarTagGraphic 
            tagColour={parseColour(stock.visualIdBackgroundColour)} 
            text={
              {
                colour: stock.visualIdTextColour,
                line1: stock.visualIdLine1, 
                line2: stock.visualIdLine2, 
                line3: stock.visualIdLine3
              }
            }
          />
        </CardMedia>
        <CardContent>
          <Stack direction="row" spacing={2}>
            <Stack direction="column" spacing={1}>
              <Typography fontSize='2xl'>{stock.name}</Typography>
              <Link href={`https://angus.tech/enquiry/animal/result?page=1&tql=id%20is%20%27${props.stock.angusTechId}%27&title=`}>
                <Typography>{stock.angusTechId}</Typography>
              </Link>
              <Typography>{stock.nlisId}</Typography>
              <Typography>{`${age.ageYears} ${age.yearSuffix} ${age.ageMonths} ${age.monthSuffix}`}</Typography>
              {stock.weights? <WeightStats weights={stock.weights}/> : null}
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1} mt={2}>
            <StockClassChip stockClass={stock.class}/>
            <SexChip sex={stock.sex}/>
            <DesexedChip desexed={stock.desexed} sex={stock.sex}/>
            <CommercialClassChip commercialClass={stock.commercialClass!}/>
          </Stack>
        </CardContent>
        <CardActions>
          <ExpandMore
            expand={expanded}
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label="show operations"
          >
          <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardActions>
            <Button variant="contained" endIcon={<Icons.GiSyringe/>} onClick={()=>setOpenTreat(true)}>
              <Typography>Treat</Typography>
            </Button>
            <Button variant="contained" endIcon={<Icons.GiEmbryo/>} onClick={()=>setOpenPreg(true)}>
              <Typography>Preg</Typography>
            </Button>
            <Button variant="contained" endIcon={<Icons.GiWeight/>} onClick={()=>setOpenWeight(true)}>
              <Typography>Weigh</Typography>
            </Button>
          </CardActions>
        </Collapse>
      </Card>
      <AddWeightDialogue stock={stock} setStock={setStock} open={openWeight} setOpen={setOpenWeight}/>
      <TreatmentDialogue open={openTreat} setOpen={setOpenTreat}/>
      <PregDialogue open={openPreg} setOpen={setOpenPreg}/>
    </>
  )
}