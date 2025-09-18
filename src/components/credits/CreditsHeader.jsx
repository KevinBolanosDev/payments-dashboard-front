import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Filter, Plus, Search } from "lucide-react";
import Link from "next/link";

export function CreditsHeader() {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Gestión de Créditos
            </h1>
            <p className="text-muted-foreground text-sm">
              Administra los créditos y préstamos
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar créditos..." className="pl-10 w-64" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button asChild>
              <Link href="/credits/new">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Crédito
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
