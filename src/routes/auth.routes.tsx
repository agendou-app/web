import { Route, Routes } from "react-router"

import { LandingPage } from "@/pages/landing"
import { NoMatchPage } from "@/pages/no-match"

import { AuthLayout } from "@/pages/auth/auth-layout"

import { SignInPage } from "@/pages/auth/sign-in"
import { SignUpPage } from "@/pages/auth/sign-up"

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="" element={<LandingPage />} />

      <Route element={<AuthLayout />}>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>

      <Route path="*" element={<NoMatchPage />} />
    </Routes>
  )
}