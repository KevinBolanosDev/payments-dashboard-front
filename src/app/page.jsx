import { Suspense } from "react";
import { DashboardHeader } from "@/components/dashboard-home/DashboardHeader";
import { MetricsCards } from "@/components/dashboard-home/MetricsCards";
import { OverviewChart } from "@/components/dashboard-home/OverviewChart";
import { QuickActions } from "@/components/dashboard-home/QuickActions";
import { RecentActivity } from "@/components/dashboard-home/RecentActivity";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col gap-8">
          {/* Metrics Overview */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Resumen General
            </h2>
            <Suspense fallback={<div>Cargando métricas...</div>}>
              <MetricsCards />
            </Suspense>
          </section>

          {/* Charts and Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Análisis de Cobros
              </h3>
              <Suspense fallback={<div>Cargando gráfico...</div>}>
                <OverviewChart />
              </Suspense>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Acciones Rápidas
              </h3>
              <QuickActions />
            </div>
          </div>

          {/* Recent Activity */}
          <section>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Actividad Reciente
            </h3>
            <Suspense fallback={<div>Cargando actividad...</div>}>
              <RecentActivity />
            </Suspense>
          </section>
        </div>
      </main>
    </div>
  );
}
