import { Navbar } from "@/components/navbar";
import { Outlet } from "react-router";

export function AdminLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}