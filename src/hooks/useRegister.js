import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

// Hook personalizado para el registro con validaciones avanzadas
export const useRegister = () => {
  const { register, isLoading } = useAuth();
  const [errors, setErrors] = useState({});

  // Validaciones específicas para cada campo
  const validateField = (name, value, formData = {}) => {
    const fieldErrors = {};

    switch (name) {
      case "firstName":
        if (!value.trim()) {
          fieldErrors.firstName = "El nombre es requerido";
        } else if (value.trim().length < 2) {
          fieldErrors.firstName = "El nombre debe tener al menos 2 caracteres";
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          fieldErrors.firstName = "El nombre solo puede contener letras";
        }
        break;

      case "lastName":
        if (!value.trim()) {
          fieldErrors.lastName = "El apellido es requerido";
        } else if (value.trim().length < 2) {
          fieldErrors.lastName = "El apellido debe tener al menos 2 caracteres";
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          fieldErrors.lastName = "El apellido solo puede contener letras";
        }
        break;

      case "email":
        if (!value.trim()) {
          fieldErrors.email = "El email es requerido";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          fieldErrors.email = "Por favor ingresa un email válido";
        }
        break;

      case "password":
        if (!value) {
          fieldErrors.password = "La contraseña es requerida";
        } else if (value.length < 6) {
          fieldErrors.password = "La contraseña debe tener al menos 6 caracteres";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          fieldErrors.password = "La contraseña debe contener al menos una mayúscula, una minúscula y un número";
        }
        break;

      case "confirmPassword":
        if (!value) {
          fieldErrors.confirmPassword = "Confirma tu contraseña";
        } else if (value !== formData.password) {
          fieldErrors.confirmPassword = "Las contraseñas no coinciden";
        }
        break;

      default:
        break;
    }

    return fieldErrors;
  };

  // Validar todo el formulario
  const validateForm = (formData) => {
    const allErrors = {};

    // Validar cada campo
    Object.keys(formData).forEach((field) => {
      const fieldErrors = validateField(field, formData[field], formData);
      Object.assign(allErrors, fieldErrors);
    });

    setErrors(allErrors);
    return Object.keys(allErrors).length === 0;
  };

  // Validar un campo específico (para validación en tiempo real)
  const validateSingleField = (name, value, formData = {}) => {
    const fieldErrors = validateField(name, value, formData);

    setErrors((prev) => ({
      ...prev,
      ...fieldErrors,
      // Limpiar el error del campo si no hay errores
      ...(Object.keys(fieldErrors).length === 0 && { [name]: undefined }),
    }));

    return Object.keys(fieldErrors).length === 0;
  };

  // Función para registrar usuario con validaciones
  const registerUser = async (formData) => {
    // Validar formulario completo
    if (!validateForm(formData)) {
      return {
        success: false,
        message: "Por favor corrige los errores en el formulario",
      };
    }

    try {
      // Preparar datos (remover confirmPassword)
      const { confirmPassword, ...registerData } = formData;

      // Limpiar espacios en blanco
      const cleanData = {
        firstName: registerData.firstName.trim(),
        lastName: registerData.lastName.trim(),
        email: registerData.email.trim().toLowerCase(),
        password: registerData.password,
      };

      const result = await register(cleanData);

      if (result.success) {
        // Limpiar errores en caso de éxito
        setErrors({});
      }

      return result;
    } catch (error) {
      return {
        success: false,
        message: "Error de conexión. Intenta nuevamente.",
      };
    }
  };

  // Limpiar errores
  const clearErrors = () => {
    setErrors({});
  };

  // Limpiar error de un campo específico
  const clearFieldError = (fieldName) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: undefined,
    }));
  };

  return {
    registerUser,
    validateSingleField,
    validateForm,
    clearErrors,
    clearFieldError,
    errors,
    isLoading,
  };
};

// Utilidades para validación de contraseñas
export const passwordStrength = (password) => {
  if (!password) return { strength: 0, label: "Sin contraseña" };

  let strength = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  strength = Object.values(checks).filter(Boolean).length;

  const labels = {
    0: "Muy débil",
    1: "Muy débil",
    2: "Débil",
    3: "Regular",
    4: "Fuerte",
    5: "Muy fuerte",
  };

  const colors = {
    0: "text-destructive",
    1: "text-destructive",
    2: "text-orange-500",
    3: "text-yellow-500",
    4: "text-secondary",
    5: "text-secondary",
  };

  return {
    strength,
    label: labels[strength],
    color: colors[strength],
    checks,
  };
};
