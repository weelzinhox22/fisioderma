import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ExamViewer } from "@/components/dashboard/exam-viewer"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function ExamPage({
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
      <DashboardHeader title="Realizando Prova" description="Responda todas as questões dentro do tempo estabelecido" />

      <div className="mt-8">
        <ExamViewer id={params.id} />
      </div>
    </div>
  )
}
