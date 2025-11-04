"use client";

import { cn } from "@/lib/utils";
import { passwordStrength } from "@/hooks/useRegister";
import { Check, X } from "lucide-react";

export function PasswordStrength({ password, className }) {
  const { strength, label, color, checks } = passwordStrength(password);

  if (!password) return null;

  return (
    <div className={cn("space-y-2", className)}>
      {/* Barra de fortaleza */}
      <div className="flex items-center space-x-2">
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-300 rounded-full",
              {
                "bg-destructive": strength <= 2,
                "bg-orange-500": strength === 3,
                "bg-yellow-500": strength === 4,
                "bg-secondary": strength === 5,
              }
            )}
            style={{ width: `${(strength / 5) * 100}%` }}
          />
        </div>
        <span className={cn("text-xs font-medium", color)}>{label}</span>
      </div>

      {/* Lista de requisitos */}
      <div className="space-y-1">
        <div className="flex items-center space-x-2 text-xs">
          {checks.length ? (
            <Check className="h-3 w-3 text-secondary" />
          ) : (
            <X className="h-3 w-3 text-muted-foreground" />
          )}
          <span
            className={
              checks.length ? "text-secondary" : "text-muted-foreground"
            }
          >
            Al menos 8 caracteres
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          {checks.lowercase ? (
            <Check className="h-3 w-3 text-secondary" />
          ) : (
            <X className="h-3 w-3 text-muted-foreground" />
          )}
          <span
            className={
              checks.lowercase ? "text-secondary" : "text-muted-foreground"
            }
          >
            Una letra minúscula
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          {checks.uppercase ? (
            <Check className="h-3 w-3 text-secondary" />
          ) : (
            <X className="h-3 w-3 text-muted-foreground" />
          )}
          <span
            className={
              checks.uppercase ? "text-secondary" : "text-muted-foreground"
            }
          >
            Una letra mayúscula
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          {checks.number ? (
            <Check className="h-3 w-3 text-secondary" />
          ) : (
            <X className="h-3 w-3 text-muted-foreground" />
          )}
          <span
            className={checks.number ? "text-secondary" : "text-muted-foreground"}
          >
            Un número
          </span>
        </div>
      </div>
    </div>
  );
}
