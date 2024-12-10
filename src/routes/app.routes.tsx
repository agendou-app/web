import { Route, Routes } from "react-router"

import { LandingPage } from "@/pages/landing"
import { NoMatchPage } from "@/pages/no-match"

import { AdminLayout } from "@/pages/admin/admin-layout"

import { SchedulesListPage } from "@/pages/admin/schedules-list"
import { SchedulePage } from "@/pages/admin/schedule"
import { ScheduleSettingsPage } from "@/pages/admin/schedule/settings"

export function AppRoutes() {
  return (
    <Routes>
      <Route path="" element={<LandingPage />} />

      <Route element={<AdminLayout />}>
        <Route path="schedules" element={<SchedulesListPage />} />
        <Route path="schedules/:slug" element={<SchedulePage />} />
        <Route path="schedules/:slug/settings" element={<ScheduleSettingsPage />} />
      </Route>

      <Route path="*" element={<NoMatchPage />} />
    </Routes>
  )
}