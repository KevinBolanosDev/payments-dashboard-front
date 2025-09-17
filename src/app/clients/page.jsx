import { ClientsHeader } from "@/components/clients/ClientsHeader";
import { ClientsStats } from "@/components/clients/ClientsStats";
import { ClientsTable } from "@/components/clients/ClientsTable";
import { Suspense } from "react";

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-background">
      <ClientsHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col gap-8">
          {/* Client Statistics */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Estadísticas de Clientes
            </h2>
            <Suspense fallback={<div>Cargando estadísticas...</div>}>
              <ClientsStats />
            </Suspense>
          </section>

          {/* Clients Table */}
          <section>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Lista de Clientes
            </h3>
            <Suspense fallback={<div>Cargando clientes...</div>}>
              <ClientsTable />
            </Suspense>
          </section>
        </div>
      </main>
    </div>
  );
}
