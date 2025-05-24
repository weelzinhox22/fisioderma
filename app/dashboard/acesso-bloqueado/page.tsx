import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import Link from "next/link"

export default function AcessoBloqueadoPage({
  searchParams,
}: {
  searchParams: { feature?: string }
}) {
  const feature = searchParams.feature || "este recurso"

  return (
    <div className="md:ml-64">
      <DashboardHeader title="Acesso Bloqueado" description="Você não tem permissão para acessar esta página" />

      <div className="mt-8 max-w-md mx-auto">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-red-500" />
            </div>

            <h2 className="text-2xl font-bold mb-2">Acesso Restrito</h2>
            <p className="text-gray-600 mb-6">
              O acesso a {feature} está disponível apenas para usuários com plano Premium. Faça upgrade do seu plano
              para desbloquear todos os recursos.
            </p>

            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600">Fazer Upgrade para Premium</Button>
              <Link href="/dashboard">
                <Button variant="outline" className="w-full">
                  Voltar para o Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
