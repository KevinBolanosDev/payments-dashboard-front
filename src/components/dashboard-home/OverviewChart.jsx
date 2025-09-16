"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for the chart
const chartData = [
  { month: "Ene", cobros: 145000, prestamos: 200000 },
  { month: "Feb", cobros: 165000, prestamos: 180000 },
  { month: "Mar", cobros: 185000, prestamos: 220000 },
  { month: "Abr", cobros: 175000, prestamos: 190000 },
  { month: "May", cobros: 195000, prestamos: 250000 },
  { month: "Jun", cobros: 205000, prestamos: 210000 },
];

export function OverviewChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Cobros vs Préstamos (Últimos 6 meses)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="month"
                className="text-muted-foreground"
                fontSize={12}
              />
              <YAxis
                className="text-muted-foreground"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                formatter={(value) => [
                  new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                  }).format(value),
                  value === chartData[0]?.cobros ? "Cobros" : "Préstamos",
                ]}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="cobros"
                fill="hsl(var(--secondary))"
                radius={[4, 4, 0, 0]}
                name="Cobros"
              />
              <Bar
                dataKey="prestamos"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                name="Préstamos"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
