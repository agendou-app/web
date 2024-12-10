import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function LandingPage() {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col space-y-4">
      <h2>Agendou</h2>
      <Button asChild>
        <Link to="/sign-in">Entrar</Link>
      </Button>
    </div>
  )
}