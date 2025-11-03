"use client";
import { motion } from "framer-motion";

function FramerMotion() {
  return (
    <div>
      {/* Pruebas de framer motion*/}
      <motion.div
        initial={{ opacity: 0, y: 100 }} // Estado inicial
        animate={{ opacity: 1, y: 0 }} // Estado final tras montar el componente
        transition={{ duration: 0.5 }} // Duración de la animación
      >
        <h1>Bienvenido a mi portafolio</h1>
      </motion.div>
    </div>
  );
}

export default FramerMotion;
