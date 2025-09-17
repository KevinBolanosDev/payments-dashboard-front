import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocumentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Documentos</h1>
        <p className="text-muted-foreground">
          Gestión de contratos y documentos del sistema
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contratos de Crédito</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p>Gestión de contratos próximamente</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documentos de Identidad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p>Archivo de documentos próximamente</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
