import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function NoMatchPage() {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col space-y-4">
      <h2>Página Não Encontrada</h2>
      <Button asChild>
        <Link to="/">Início</Link>
      </Button>
    </div>
  )
}