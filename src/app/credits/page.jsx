import { CreditsHeader } from "@/components/credits/CreditsHeader";
import { CreditsStats } from "@/components/credits/CreditsStats";
import { CreditsTable } from "@/components/credits/CreditsTable";
import { Suspense } from "react";

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-background">
      <CreditsHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col gap-8">
          {/* Credit Statistics */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Estadísticas de Créditos
            </h2>
            <Suspense fallback={<div>Cargando estadísticas...</div>}>
              <CreditsStats />
            </Suspense>
          </section>

          {/* Credits Table */}
          <section>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Lista de Créditos
            </h3>
            <Suspense fallback={<div>Cargando créditos...</div>}>
              <CreditsTable />
            </Suspense>
          </section>
        </div>
      </main>
    </div>
  );
}
