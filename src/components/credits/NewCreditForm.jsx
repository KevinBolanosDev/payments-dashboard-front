"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calculator, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock clients data
const mockClients = [
  { id: 1, name: "María González", identification: "12345678" },
  { id: 2, name: "Carlos Rodríguez", identification: "23456789" },
  { id: 3, name: "Ana Martínez", identification: "34567890" },
  { id: 4, name: "Luis Fernández", identification: "45678901" },
  { id: 5, name: "Carmen López", identification: "56789012" },
];

export function NewCreditForm() {
  const [formData, setFormData] = useState({
    client_id: "",
    amount: "",
    interest_rate: "",
    term_months: "",
    start_date: "",
    description: "",
  });

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Calculate monthly payment when relevant fields change
    if (
      name === "amount" ||
      name === "interest_rate" ||
      name === "term_months"
    ) {
      calculateMonthlyPayment({ ...formData, [name]: value });
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateMonthlyPayment = (data) => {
    const principal = Number.parseFloat(data.amount) || 0;
    const monthlyRate = (Number.parseFloat(data.interest_rate) || 0) / 100 / 12;
    const numPayments = Number.parseInt(data.term_months) || 0;

    if (principal > 0 && monthlyRate > 0 && numPayments > 0) {
      const payment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
      setMonthlyPayment(payment);
    } else if (principal > 0 && numPayments > 0) {
      // Simple division if no interest
      setMonthlyPayment(principal / numPayments);
    } else {
      setMonthlyPayment(0);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const creditData = {
      ...formData,
      monthly_payment: monthlyPayment,
      end_date: calculateEndDate(
        formData.start_date,
        Number.parseInt(formData.term_months)
      ),
    };

    console.log("Crédito creado:", creditData);
    setIsSubmitting(false);

    // Reset form
    setFormData({
      client_id: "",
      amount: "",
      interest_rate: "",
      term_months: "",
      start_date: "",
      description: "",
    });
    setMonthlyPayment(0);
  };

  const calculateEndDate = (startDate, termMonths) => {
    if (!startDate || !termMonths) return "";
    const start = new Date(startDate);
    start.setMonth(start.getMonth() + termMonths);
    return start.toISOString().split("T")[0];
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Información del Crédito</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="client_id">Cliente *</Label>
                <Select
                  value={formData.client_id}
                  onValueChange={(value) =>
                    handleSelectChange("client_id", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClients.map((client) => (
                      <SelectItem key={client.id} value={client.id.toString()}>
                        {client.name} - {client.identification}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Monto del Crédito *</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="Ej: 50000000"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interest_rate">
                    Tasa de Interés (% anual)
                  </Label>
                  <Input
                    id="interest_rate"
                    name="interest_rate"
                    type="number"
                    step="0.1"
                    value={formData.interest_rate}
                    onChange={handleInputChange}
                    placeholder="Ej: 12.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="term_months">Plazo (meses) *</Label>
                  <Input
                    id="term_months"
                    name="term_months"
                    type="number"
                    value={formData.term_months}
                    onChange={handleInputChange}
                    placeholder="Ej: 24"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="start_date">Fecha de Inicio *</Label>
                  <Input
                    id="start_date"
                    name="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Ej: Crédito personal para mejoras del hogar"
                  rows={3}
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 md:flex-none"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Guardando..." : "Crear Crédito"}
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/credits">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Cancelar
                  </Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Calculation Summary */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Resumen de Cálculos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Monto del crédito:
                </span>
                <span className="font-medium">
                  {formData.amount
                    ? formatCurrency(Number.parseFloat(formData.amount))
                    : "$0"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Tasa de interés:</span>
                <span className="font-medium">
                  {formData.interest_rate ? `${formData.interest_rate}%` : "0%"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Plazo:</span>
                <span className="font-medium">
                  {formData.term_months
                    ? `${formData.term_months} meses`
                    : "0 meses"}
                </span>
              </div>

              <hr className="border-border" />

              <div className="flex justify-between">
                <span className="text-muted-foreground">Cuota mensual:</span>
                <span className="font-bold text-lg text-primary">
                  {formatCurrency(monthlyPayment)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Total a pagar:</span>
                <span className="font-medium">
                  {formData.term_months
                    ? formatCurrency(
                        monthlyPayment * Number.parseInt(formData.term_months)
                      )
                    : "$0"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Total intereses:</span>
                <span className="font-medium">
                  {formData.amount && formData.term_months
                    ? formatCurrency(
                        monthlyPayment * Number.parseInt(formData.term_months) -
                          Number.parseFloat(formData.amount)
                      )
                    : "$0"}
                </span>
              </div>
            </div>

            {formData.start_date && formData.term_months && (
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Fecha de finalización:
                  </span>
                  <span className="font-medium">
                    {new Date(
                      calculateEndDate(
                        formData.start_date,
                        Number.parseInt(formData.term_months)
                      )
                    ).toLocaleDateString("es-CO")}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
