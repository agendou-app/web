import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div className="flex">
      <div className="hidden flex-1 items-center justify-center border-r bg-zinc-50 sm:flex">
        <img
          src="/auth-illustration.svg"
          alt="Illustration"
          className="w-[55%] pb-1"
        />
      </div>
      <main className="min-h-screen flex-1">
        <Outlet />
      </main>
    </div>
  )
}