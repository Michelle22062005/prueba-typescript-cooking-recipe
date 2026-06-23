import { Star } from "@gravity-ui/icons";
import { Button, Card, ToggleButton } from "@heroui/react";
import { IRecipeCard } from "../types/recipe";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
//import { useCard } from "../context/CardContext";
import { useSession } from "next-auth/react";

export const RecipeCard = ({ _id, name, imageUrl, preparationTime, difficulty }: IRecipeCard) => {
  const router = useRouter();
  const { data:session } = useSession();
  const {isFavorite, toggleFavorite, authMessage } = useAuth();
  //const { addToCart } = useCart();


  const ver = () => {
    router.push(`/recipes/${_id}`);
  };


  return (
    <div>
      <Card
        className="w-[200px] gap-2"
        style={{
          background: "#fdf6f0",
          borderRadius: "20px",
          border: "0.5px solid #f0d9cc",
          padding: "14px",
        }}
      >
              {authMessage && (
  <p className="text-xs text-center mt-1 text-[#e12d2d]" >
    {authMessage}
  </p>
)}
        {/* Imagen + estrella */}
        <div className="relative">
          <img
            alt={name}
            className="w-full h-[150px] rounded-[14px] object-cover pointer-events-none select-none"
            loading="lazy"
            src={imageUrl}
          />
          <div className="absolute top-2 right-2">
            <ToggleButton
              isIconOnly
              isSelected={isFavorite(_id)}
              onChange={()=>toggleFavorite(_id)}
              aria-label="Agregar a favoritos"
              className="w-8 h-8 rounded-full border-none"
              style={{ background: "rgba(255,255,255,0.85)" }}
            >
              {({ isSelected }) => (
                <Star
                  className="w-[18px] h-[18px]"
                  style={{ color: isSelected ? "#F5E027" : "#c4a98a" }}
                />
              )}
            </ToggleButton>
      
          </div>
        </div>

        {/* Info */}
        <Card.Header className="px-0.5 py-0 flex flex-col items-start gap-0.5">
          <Card.Title style={{ fontSize: "15px", color: "#6b4f3a" }}>
            {name}
          </Card.Title>
          <Card.Description style={{ fontSize: "13px", color: "#b07850" }}>
           
            {preparationTime}
          </Card.Description>
        </Card.Header>

        <Button className="bg-[#9c7350]"
        onPress={ver}>Ver</Button>
      </Card>
    </div>
  );
};