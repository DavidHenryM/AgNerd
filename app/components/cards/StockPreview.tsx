import { Icons } from "@app/lib/Icons"
import { daysBetween, getAge, parseColour } from "@app/utils/utils"
import { LivestockUnit, WeightRecord } from "@generated/browser"
import Link from "next/link"
import { useState } from "react"
import AddWeightDialogue from "@components/dialogues/AddWeightDialogue"
import PregDialogue from "@components/dialogues/PregDialogue"
import TreatmentDialogue from "@components/dialogues/TreatmentDialogue"
import { EarTagGraphic } from "@components/EarTag"
import { WeightStats } from "@components/Stats"
import { StockClassChip, SexChip, DesexedChip, CommercialClassChip } from "@components/Chips"
import { Card, CardContent, CardHeader, IconButton, CardMedia, CardActions, Collapse, Dialog, DialogContent, DialogTitle, Divider, IconButtonProps, List, ListItem, ListItemButton, ListItemText, styled} from "@mui/material"
import { Stack, Typography, Button } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type LivestockRelationSummary = {
  id: string
  name: string | null
  angusTechId: string | null
  birthDate?: Date
}

export type LivestockWithRelations = LivestockUnit & {
  sire?: LivestockRelationSummary | null
  dam?: LivestockRelationSummary | null
  birthed?: LivestockRelationSummary[]
  sired?: LivestockRelationSummary[]
}

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

export default function StockPreviewCard(props: {
  stock: LivestockWithRelations,
  index: number,
  onClick: () => void,
  onFocusById: (id: string) => void
}) {
  const [openWeight, setOpenWeight] = useState(false)
  const [openPreg, setOpenPreg] = useState(false)
  const [openTreat, setOpenTreat] = useState(false)
  const [openProgeny, setOpenProgeny] = useState(false)
  const [stock, setStock] = useState<LivestockWithRelations & {weights?: WeightRecord[]}>(props.stock)
  const [openMenu, setOpenMenu] = useState(false)
  const [expanded, setExpanded] = useState(false);
  const age = getAge(props.stock.birthDate)
  const progeny = stock.sex === "MALE" ? stock.sired ?? [] : stock.birthed ?? []
  const progenyCount = progeny.length
  const latestProgeny = [...progeny].sort((a, b) => {
    const aDate = a.birthDate ? new Date(a.birthDate).getTime() : 0
    const bDate = b.birthDate ? new Date(b.birthDate).getTime() : 0
    return bDate - aDate
  })[0]
  const lastCalfDays = latestProgeny?.birthDate
    ? daysBetween(latestProgeny.birthDate, new Date())
    : undefined
  const lastCalfYears = lastCalfDays ? Math.floor(lastCalfDays / 365) : 0
  const lastCalfMonths = lastCalfDays ? Math.floor((lastCalfDays % 365) / 30) : 0
  const lastCalfText = lastCalfDays !== undefined
    ? `${lastCalfYears}y ${lastCalfMonths}m ago`
    : "No calves recorded"
  const sireLabel = stock.sire?.name || stock.sire?.angusTechId || stock.sire?.id
  const damLabel = stock.dam?.name || stock.dam?.angusTechId || stock.dam?.id
  const progenySorted = [...progeny].sort((a, b) => {
    const aDate = a.birthDate ? new Date(a.birthDate).getTime() : 0
    const bDate = b.birthDate ? new Date(b.birthDate).getTime() : 0
    return bDate - aDate
  })

  const handleFocusProgeny = (id: string) => {
    props.onFocusById(id)
    setOpenProgeny(false)
  }

  return (  
    <>
      <Card key={"stockCard" + props.index}>  
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={()=>(setOpenMenu(true))}>
               <Icons.GiCardboardBox/>
            </IconButton>
          }
          title={stock.name}
          subheader={
            <Link
              href={`https://angus.tech/enquiry/animal/result?page=1&tql=id%20is%20%27${stock.angusTechId}%27&title=`}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Button variant="text" size="small">
                <Typography>{stock.angusTechId}</Typography>
              </Button>
            </Link>
            }
        />
        
        <CardMedia sx={{justifyContent: "center", display: "flex", py: 1}}>
          <Stack direction="row" spacing={2} alignItems="center" paddingX={2}>
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
          <Stack direction="column" spacing={1} flexWrap="wrap" alignItems="center">
            <StockClassChip stockClass={stock.class}/>
            <SexChip sex={stock.sex}/>
            <DesexedChip desexed={stock.desexed} sex={stock.sex}/>
            <CommercialClassChip commercialClass={stock.commercialClass!}/>
          </Stack>
          </Stack>
        </CardMedia>
        <CardContent>
          <Stack direction="column" spacing={1.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
              <Stack direction="column" spacing={0.25}>
                <Typography variant="body2" color="text.secondary">
                  NLIS: {stock.nlisId || "—"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Age: {`${age.ageYears} ${age.yearSuffix} ${age.ageMonths} ${age.monthSuffix}`}
                </Typography>
              </Stack>
            
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
              <Typography variant="caption" color="text.secondary">Lineage</Typography>
              {sireLabel ? (
                <Button
                  variant="text"
                  size="small"
                  onClick={() => stock.sire?.id && props.onFocusById(stock.sire.id)}
                >
                  <Typography>Sire: {sireLabel}</Typography>
                </Button>
              ) : null}
              {damLabel ? (
                <Button
                  variant="text"
                  size="small"
                  onClick={() => stock.dam?.id && props.onFocusById(stock.dam.id)}
                >
                  <Typography>Dam: {damLabel}</Typography>
                </Button>
              ) : null}
              {progenyCount > 0 ? (
                <Button
                  variant="text"
                  size="small"
                  onClick={() => setOpenProgeny(true)}
                >
                  <Typography>Progeny ({progenyCount})</Typography>
                </Button>
              ) : null}
            </Stack>
            {!stock.desexed ? (
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Typography variant="caption">Calves: {progenyCount}</Typography>
                <Typography variant="caption">Last calf: {lastCalfText}</Typography>
              </Stack>
            ) : (
              <Typography variant="caption">Calves: N/A (desexed)</Typography>
            )}
            {stock.weights? <WeightStats weights={stock.weights}/> : null}
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
      <Dialog open={openProgeny} onClose={() => setOpenProgeny(false)} fullWidth maxWidth="sm">
        <DialogTitle>Progeny</DialogTitle>
        <DialogContent dividers>
          {progenyCount === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No progeny recorded.
            </Typography>
          ) : (
            <List disablePadding>
              {progenySorted.map((calf, index) => (
                <ListItem key={calf.id} disablePadding divider={index < progenySorted.length - 1}>
                  <ListItemButton onClick={() => handleFocusProgeny(calf.id)}>
                    <ListItemText
                      primary={calf.name || calf.angusTechId || calf.id}
                      secondary={calf.birthDate ? calf.birthDate.toLocaleDateString() : "Birth date unknown"}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <Divider />
        <CardActions>
          <Button onClick={() => setOpenProgeny(false)} variant="contained">
            Close
          </Button>
        </CardActions>
      </Dialog>
    </>
  )
}