import SidebarWithHeader from "../components/SideBar";
import { LoadingBar } from "../loading";

export default function Pasture(){
  return (
    <SidebarWithHeader Content={LoadingBar}></SidebarWithHeader>
  )
}