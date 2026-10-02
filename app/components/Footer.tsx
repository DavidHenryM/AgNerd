import { AppBar, Grid, Paper, Typography } from "@mui/material";
import { footerHeight } from "@app/settings";

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ maxHeight: footerHeight, top:"auto", bottom: 0, display: { xs: 'none', md: 'block' } }}>
      <Grid
        container
        direction="row"
        sx={{
          justifyContent: "center",
          p: 2
        }}
      >
        <Paper elevation={1} color="secondary" sx={{p: 2}} >
          <Typography color="primary">
            AgNerd {currentYear}
          </Typography>
        </Paper>
      </Grid>
    </AppBar>
  );
};

export default Footer;
