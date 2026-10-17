"use client";
import { useState } from "react";
import {
  Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, List, ListItemButton, ListItemText, Stack, Typography,
} from "@mui/material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { requestSprayTracks } from "@lib/hooks/spray-tracks";
import { parseTrackPage, type SavedSprayTrack } from "@lib/spray-tracks";

export interface NavigationTrackProps {
  trackState: {
    track: SavedSprayTrack | null; busy: boolean; saving: boolean; dirty: boolean;
    error: string | null; conflict: boolean; totalAreaSqMeters: number;
  };
  onPause: () => void;
  onNewTrack: () => Promise<boolean>;
  onResumeTrack: (id: string, discard?: boolean) => Promise<boolean>;
  onDeleteTrack: () => Promise<boolean>;
  onRetrySave: () => void;
}

export function trackLabel(track: Pick<SavedSprayTrack, "startedAt" | "totalAreaSqMeters">) {
  return `${new Date(track.startedAt).toLocaleString()} · ${(track.totalAreaSqMeters / 10_000).toFixed(3)} ha / ${(track.totalAreaSqMeters / 4046.86).toFixed(3)} ac`;
}

export default function NavigationTrackActions(props: NavigationTrackProps) {
  const { trackState: state } = props;
  const [chooser, setChooser] = useState(false);
  const [confirmation, setConfirmation] = useState<"delete" | "reload" | null>(null);
  const [tracks, setTracks] = useState<SavedSprayTrack[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  async function load(cursor: string | null = null) {
    setLoading(true);
    setListError(null);
    try {
      const page = parseTrackPage(await requestSprayTracks(`/api/spray-tracks${cursor ? `?cursor=${cursor}` : ""}`));
      setTracks(previous => cursor ? [...previous, ...page.tracks] : page.tracks);
      setCursor(page.nextCursor);
    } catch (error) {
      console.error("Saved spray track listing failed:", error);
      setListError(error instanceof Error ? error.message : String(error));
    } finally { setLoading(false); }
  }

  const disabled = state.busy || state.saving;
  const actionSx = { minHeight: 56, fontSize: 18, justifyContent: "flex-start" };
  return (
    <Box>
      <Typography variant="h6">Spray tracks</Typography>
      <Stack spacing={1}>
        <Button variant="outlined" sx={actionSx} disabled={disabled || !!state.error}
          onClick={() => { void props.onNewTrack(); }}>New spray track</Button>
        <Button variant="outlined" sx={actionSx} disabled={disabled || !!state.error}
          onClick={() => { props.onPause(); setChooser(true); void load(); }}>Resume saved track</Button>
        {state.conflict && state.track && (
          <Button variant="outlined" sx={actionSx} disabled={disabled}
            onClick={() => { props.onPause(); setConfirmation("reload"); }}>Reload saved version</Button>
        )}
        <Button color="error" variant="outlined" sx={actionSx} startIcon={<DeleteSweepIcon />}
          disabled={disabled || (!state.track && !state.error)}
          onClick={() => { props.onPause(); setConfirmation("delete"); }}>Delete current spray track</Button>
      </Stack>
      <Dialog open={chooser} onClose={() => { if (!disabled) setChooser(false); }} fullWidth maxWidth="sm"
        aria-labelledby="saved-spray-tracks-title">
        <DialogTitle id="saved-spray-tracks-title">Resume saved spray track</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>Tracks are shown by start date and sprayed area. Resuming restores coverage and stays paused.</DialogContentText>
          {loading && <Typography component="output" aria-live="polite">Loading saved tracks...</Typography>}
          {!loading && !listError && tracks.length === 0 && <Typography>No saved spray tracks yet.</Typography>}
          {listError && <Alert severity="error">{listError}<Button onClick={() => { void load(); }}>Retry list</Button></Alert>}
          {state.error && <Alert severity="error">{state.error}</Alert>}
          <List aria-label="Saved spray tracks">
            {tracks.map(track => (
              <ListItemButton key={track.id} disabled={disabled || loading}
                sx={{ minHeight: 72 }}
                onClick={() => { void props.onResumeTrack(track.id).then(ok => { if (ok) setChooser(false); }); }}>
                <ListItemText primary={new Date(track.startedAt).toLocaleString()}
                  secondary={`${(track.totalAreaSqMeters / 10_000).toFixed(3)} ha / ${(track.totalAreaSqMeters / 4046.86).toFixed(3)} ac${track.id === state.track?.id ? " (current)" : ""}`} />
              </ListItemButton>
            ))}
          </List>
          {cursor && !listError && <Button sx={actionSx} disabled={loading || disabled}
            onClick={() => { void load(cursor); }}>Load more tracks</Button>}
        </DialogContent>
        <DialogActions><Button sx={actionSx} disabled={disabled} onClick={() => setChooser(false)}>Close</Button></DialogActions>
      </Dialog>
      <Dialog open={confirmation !== null} onClose={() => { if (!disabled) setConfirmation(null); }}
        aria-labelledby="spray-track-confirm-title" aria-describedby="spray-track-confirm-description">
        <DialogTitle id="spray-track-confirm-title">
          {confirmation === "reload" ? "Discard unsaved changes and reload?" : "Delete current spray track?"}
        </DialogTitle>
        <DialogContent>
          {state.track && <Typography>{trackLabel({ ...state.track, totalAreaSqMeters: state.totalAreaSqMeters })}</Typography>}
          <DialogContentText id="spray-track-confirm-description">
            {confirmation === "reload"
              ? "Unsaved coverage on this device will be discarded. The saved version will be restored, paused."
              : "This permanently deletes this spray track and its saved coverage. Other tracks and GPS history are not deleted."}
          </DialogContentText>
          {state.error && <Alert severity="error">{state.error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button sx={actionSx} disabled={disabled} onClick={() => setConfirmation(null)}>Cancel</Button>
          <Button color="error" sx={actionSx} disabled={disabled} onClick={() => {
            const operation = confirmation === "reload" && state.track
              ? props.onResumeTrack(state.track.id, true) : props.onDeleteTrack();
            void operation.then(ok => { if (ok) setConfirmation(null); });
          }}>{confirmation === "reload" ? "Discard and reload" : "Delete"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
