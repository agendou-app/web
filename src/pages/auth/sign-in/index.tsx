import { Link } from "react-router";
import { SignInForm } from "./form";

export function SignInPage() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col justify-center px-4 py-8">
      <div>
        <Link to="/" className="block pb-8 sm:hidden">
          <img
            src="/agendou-logo-black.png"
            alt="Illustration"
            className="w-32"
          />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <SignInForm />
      </div>
    </div>
  )
}