// TODO: Reemplazar /src/app/register/page.jsx con este archivo mejorado
// Este archivo incluye validaciones avanzadas y indicador de fortaleza de contraseña

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordStrength } from "@/components/ui/password-strength";
import { useRegister } from "@/hooks/useRegister";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
  UserPlus,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function EnhancedRegisterPage() {
  const {
    registerUser,
    validateSingleField,
    clearFieldError,
    errors,
    isLoading,
  } = useRegister();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);

    // Limpiar error general cuando el usuario empiece a escribir
    if (generalError) setGeneralError("");

    // Validar campo en tiempo real (con debounce implícito)
    setTimeout(() => {
      validateSingleField(name, value, newFormData);
    }, 300);
  };

  const handleFocus = (fieldName) => {
    // Limpiar error del campo cuando recibe foco
    clearFieldError(fieldName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    try {
      const result = await registerUser(formData);

      if (!result.success) {
        setGeneralError(result.message);
      }
      // Si es exitoso, el contexto se encarga de la redirección
    } catch (error) {
      setGeneralError("Error de conexión. Intenta nuevamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/95">
          <CardHeader className="space-y-4 pb-8">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-2xl">
                  CM
                </span>
              </div>
            </div>
            <div className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold text-foreground">
                Crear Cuenta
              </CardTitle>
              <p className="text-muted-foreground">
                Regístrate en el sistema de gestión de cobros
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campos Nombre y Apellido */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    Nombre
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Juan"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("firstName")}
                      className={`pl-10 h-11 ${
                        errors.firstName ? "border-destructive" : ""
                      }`}
                      disabled={isLoading}
                      autoComplete="given-name"
                      required
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-xs text-destructive flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Apellido
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Pérez"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("lastName")}
                      className={`pl-10 h-11 ${
                        errors.lastName ? "border-destructive" : ""
                      }`}
                      disabled={isLoading}
                      autoComplete="family-name"
                      required
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-xs text-destructive flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Campo Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="juan@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("email")}
                    className={`pl-10 h-11 ${
                      errors.email ? "border-destructive" : ""
                    }`}
                    disabled={isLoading}
                    autoComplete="email"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Campo Contraseña */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("password")}
                    className={`pl-10 pr-10 h-11 ${
                      errors.password ? "border-destructive" : ""
                    }`}
                    disabled={isLoading}
                    autoComplete="new-password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-11 w-11 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.password}
                  </p>
                )}
                {/* Indicador de fortaleza de contraseña */}
                <PasswordStrength password={formData.password} />
              </div>

              {/* Campo Confirmar Contraseña */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirmar Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("confirmPassword")}
                    className={`pl-10 pr-10 h-11 ${
                      errors.confirmPassword ? "border-destructive" : ""
                    }`}
                    disabled={isLoading}
                    autoComplete="new-password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-11 w-11 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-destructive flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Mensaje de Error General */}
              {generalError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                >
                  <p className="text-sm text-destructive font-medium flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {generalError}
                  </p>
                </motion.div>
              )}

              {/* Botón de Registro */}
              <Button
                type="submit"
                className="w-full h-11 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando cuenta...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Crear Cuenta
                  </>
                )}
              </Button>
            </form>

            {/* Enlace a Login */}
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    ¿Ya tienes cuenta?
                  </span>
                </div>
              </div>

              <Link href="/login">
                <Button
                  variant="ghost"
                  className="w-full h-11 text-base font-medium"
                  disabled={isLoading}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Iniciar Sesión
                </Button>
              </Link>
            </div>

            {/* Información de seguridad */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Al registrarte, aceptas nuestros términos de servicio y política
                de privacidad
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground">
            Credit Manager © 2024 - Sistema de Gestión de Cobros
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
