import type { NavItem } from "@lib/types";
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import ExploreIcon from '@mui/icons-material/Explore';
import GrassIcon from '@mui/icons-material/Grass';
import FenceIcon from '@mui/icons-material/Fence';



export const navigation: NavItem[] = [
  { label: "HOME", path: "../home/", Icon: HomeIcon},
  { label: "FARM", path: "../farm/", Icon: AgricultureIcon},
  { label: "PASTURE", path: "../pasture/", Icon: FenceIcon},
  { label: "LIVESTOCK", path: "../livestock/", Icon: GrassIcon },
  { label: "NAVIGATION", path: "../navigation/", Icon: ExploreIcon },
];

export const adminNavigation: NavItem[] = [
  { label: "ADMIN", path: "../admin/", Icon: AdminPanelSettingsIcon},
];
