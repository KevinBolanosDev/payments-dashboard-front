import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateClient } from "@/hooks/useClients";
import { Edit, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function UpdateClientsModal({ show, onClose, client }) {
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    observations: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: updateClient, isPending } = useUpdateClient();

  // Cargar datos del cliente cuando se abre el modal
  useEffect(() => {
    if (client && show) {
      setFormData({
        phone: client.phone || "",
        address: client.address || "",
        observations: client.observations || "",
      });
    }
  }, [client, show]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateClient = async () => {
    if (!client) return;

    try {
      setIsSubmitting(true);

      await updateClient({
        id: client._id || client.id,
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        observations: formData.observations.trim(),
      });

      console.log("✅ Cliente actualizado exitosamente");
      onClose();
    } catch (error) {
      console.error("❌ Error actualizando cliente:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      phone: "",
      address: "",
      observations: "",
    });
    onClose();
  };

  return (
    <Dialog open={show} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Actualizar Información del Cliente
          </DialogTitle>
          {client && (
            <p className="text-sm text-muted-foreground">
              Cliente: {client.firstName} {client.lastName}
            </p>
          )}
        </DialogHeader>

        <div className="space-y-4 py-4 max-h-96 overflow-y-auto">
          {/* Campo Teléfono */}
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Ej: +57 300 123 4567"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              disabled={isSubmitting || isPending}
              maxLength={20}
            />
          </div>

          {/* Campo Dirección */}
          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Textarea
              id="address"
              placeholder="Ej: Calle 123 #45-67, Barrio Centro, Ciudad"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              rows={3}
              maxLength={200}
              disabled={isSubmitting || isPending}
            />
            <p className="text-xs text-muted-foreground">
              {(formData.address || "").length}/200 caracteres
            </p>
          </div>

          {/* Campo Observaciones */}
          <div className="space-y-2">
            <Label htmlFor="observations">Observaciones</Label>
            <Textarea
              id="observations"
              placeholder="Observaciones sobre el cliente..."
              value={formData.observations}
              onChange={(e) =>
                handleInputChange("observations", e.target.value)
              }
              rows={4}
              maxLength={500}
              disabled={isSubmitting || isPending}
            />
            <p className="text-xs text-muted-foreground">
              {(formData.observations || "").length}/500 caracteres
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting || isPending}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleUpdateClient}
            disabled={
              (!formData.phone?.trim() &&
                !formData.address?.trim() &&
                !formData.observations?.trim()) ||
              isSubmitting ||
              isPending
            }
          >
            {isSubmitting || isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Actualizando...
              </>
            ) : (
              "Actualizar Cliente"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
