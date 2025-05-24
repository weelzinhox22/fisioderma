import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ExamResult } from "@/components/dashboard/exam-result"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function ExamResultPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createServerComponentClient({ cookies })

  // Verificar se o usuário está autenticado
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="md:ml-64">
      <DashboardHeader title="Resultado da Prova" description="Veja seu desempenho e as respostas corretas" />

      <div className="mt-8">
        <ExamResult id={params.id} />
      </div>
    </div>
  )
}
