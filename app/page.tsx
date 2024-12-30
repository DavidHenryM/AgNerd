import SidebarWithHeader from "./components/SideBar";
import { LoadingBar } from "./loading";

export default function Home() {
  return (
    <SidebarWithHeader Content={LoadingBar}></SidebarWithHeader>
  );
}
