"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@heroui/react"; // Limpieza de imports no utilizados
import { IRecipeDetail } from "@/src/types/recipe";

const DetailsRecipes = () => {
  const [todo, setTodo] = useState<IRecipeDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga defensivo
  const { _id } = useParams();
  const router = useRouter();
   
  const backTo = () => {
    router.push("/");
  };

  useEffect(() => {
    if (!_id) return;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/recipes/${_id}`);
        
        console.log("status", res.status);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("error", errorText);
          return;
        }
        const data = await res.json();
        console.log("data", data.data);

        setTodo(data.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [_id]);

  console.log("muestra", todo);

  // Si está cargando o no hay datos, evitamos que intente renderizar la Card incompleta
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p style={{ color: "#6b4f3a" }} className="text-sm font-medium animate-pulse">Cargando receta...</p>
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="text-center p-5">
        <p style={{ color: "#b07850" }}>No se pudo encontrar la receta.</p>
        <button onClick={backTo} className="mt-3 text-sm px-4 py-2 rounded-xl bg-[#f7c5a0] text-[#7a3e1e]">Volver</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 m-5 max-w-3xl mx-auto">

      {/* Botón volver */}
      <button
        onClick={backTo}
        className="self-start text-sm font-medium px-4 py-2 rounded-xl transition-transform active:scale-[0.97]"
        style={{ background: "#f7c5a0", color: "#7a3e1e", border: "none" }}
      >
        ← Volver
      </button>
      <h1 className="text-4xl text-center" style={{ color: "#6b4f3a" }}>Detalle de la receta</h1>

      <Card
        style={{
          background: "#fdf6f0",
          borderRadius: "20px",
          border: "0.5px solid #f0d9cc",
          padding: "24px",
          gap: "20px",
        }}
      >
        {/* Imagen grande */}
        {todo.imageUrl && (
          <div className="relative w-full h-[320px] rounded-[16px] overflow-hidden">
            <img
              alt={todo.name}
              className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
              loading="lazy"
              src={todo.imageUrl}
            />
          </div>
        )}

        {/* Info principal */}
        <Card.Header className="px-0 py-0 flex flex-col gap-1">
          <Card.Title style={{ fontSize: "26px", color: "#6b4f3a" }}>
            {todo.name}
          </Card.Title>
          <p style={{ fontSize: "13px", color: "#c4a98a" }}>{todo.preparationTime}</p>
          <p style={{ fontSize: "22px", fontWeight: "600", color: "#b07850" }}>
            {todo.difficulty}
          </p>
        </Card.Header>

        {/* Descripción larga */}
        <div className="flex flex-col gap-1">
          <p style={{ fontSize: "13px", fontWeight: "600", color: "#6b4f3a" }}>
            Detalles
          </p>
          <p style={{ fontSize: "13px", color: "#b07850", lineHeight: "1.6" }}>
            {todo.longDescription}
          </p>
        </div>
        {/* Divider */}
        <div style={{ borderTop: "1px solid #f0d9cc" }} />

        {/* Descripción corta / Ingredientes */}
        <div className="flex flex-col gap-1">
          <p style={{ fontSize: "13px", fontWeight: "600", color: "#6b4f3a" }}>
            Ingredientes
          </p>
          
          {todo.ingredients && typeof todo.ingredients === "object" ? (
            <ul className="list-disc pl-5 flex flex-col gap-1">
              {Object.values(todo.ingredients).map((elemento, index) => (
                <li key={index} style={{ fontSize: "13px", color: "#b07850" }}>
                  {elemento}
                </li>
              ))}
            </ul>
          ) : typeof todo.ingredients === "string" ? (
            <p style={{ fontSize: "13px", color: "#b07850", lineHeight: "1.6" }}>
              {todo.ingredients}
            </p>
          ) : (
            <p style={{ fontSize: "13px", color: "#b07850" }}>No hay ingredientes registrados.</p>
          )}
        </div>


        {/* Divider */}
        <div style={{ borderTop: "1px solid #f0d9cc" }} />

        {/* Specs (Especificaciones protegidas contra objetos) */}
        <div className="flex flex-col gap-2">
          <p style={{ fontSize: "13px", fontWeight: "600", color: "#6b4f3a" }}>
            Especificaciones
          </p>
          {todo.preparationsteps && typeof todo.preparationsteps === "object" ? (
            Object.entries(todo.preparationsteps).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span style={{ color: "#6b4f3a", textTransform: "capitalize" }}>
                  {key.replace(/_/g, " ")}
                </span>
                <span style={{ color: "#b07850" }}>
                  {/* Solución: Si el 'value' interno del paso es otro objeto plano, lo unimos con texto */}
                  {value && typeof value === "object" ? Object.values(value).join(" ") : String(value)}
                </span>
              </div>
            ))
          ) : (
            <p style={{ fontSize: "13px", color: "#b07850" }}>{String(todo.preparationsteps)}</p>
          )}
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid #f0d9cc" }} />

        {/* Footer: porciones (Portions protegido contra objetos de 2 llaves) */}
        <div className="flex items-center justify-between">
          <span style={{ fontSize: "13px", color: "#c4a98a" }}>
            Porciones:{" "}
            <strong style={{ color: "#6b4f3a" }}>
              {todo.portions && typeof todo.portions === "object" ? (
                Object.values(todo.portions).join(" ")
              ) : (
                String(todo.portions)
              )}
            </strong>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default DetailsRecipes;