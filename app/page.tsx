import { ActiveLivestock } from "./basicDetails";
import SidebarWithHeader from "./components/SideBar";

export default function Home() {
  return (
    <SidebarWithHeader>
      <ActiveLivestock />
    </SidebarWithHeader>
  );
}
