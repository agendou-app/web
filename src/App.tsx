import { Route, Routes } from "react-router"

import { LandingPage } from "./pages/landing"
import { NoMatchPage } from "./pages/no-match"

import { AuthLayout } from "./pages/auth/auth-layout"
import { AdminLayout } from "./pages/admin/admin-layout"

import { SignInPage } from "./pages/auth/sign-in"
import { SignUpPage } from "./pages/auth/sign-up"
import { SchedulesListPage } from "./pages/admin/schedules-list"
import { SchedulePage } from "./pages/admin/schedule"
import { ScheduleSettingsPage } from "./pages/admin/schedule/settings"

function App() {
  return (
    <Routes>
      <Route path="" element={<LandingPage />} />

      <Route element={<AuthLayout />}>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="schedules" element={<SchedulesListPage />} />
        <Route path="schedules/:slug" element={<SchedulePage />} />
        <Route path="schedules/:slug/settings" element={<ScheduleSettingsPage />} />
      </Route>

      <Route path="*" element={<NoMatchPage />} />
    </Routes>
  )
}

export default App
