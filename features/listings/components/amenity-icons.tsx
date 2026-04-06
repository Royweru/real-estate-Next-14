import { Home, Tag } from "lucide-react";
import React from "react";

const amenityIconMap: Record<string, React.ReactNode> = {
  parking: <Home className="h-4 w-4" />,
  pool: <Home className="h-4 w-4" />,
  gym: <Home className="h-4 w-4" />,
  garden: <Home className="h-4 w-4" />,
  security: <Home className="h-4 w-4" />,
  elevator: <Home className="h-4 w-4" />,
  wifi: <Home className="h-4 w-4" />,
  "air conditioning": <Home className="h-4 w-4" />,
  heating: <Home className="h-4 w-4" />,
  balcony: <Home className="h-4 w-4" />,
  terrace: <Home className="h-4 w-4" />,
  laundry: <Home className="h-4 w-4" />,
  dishwasher: <Home className="h-4 w-4" />,
  fireplace: <Home className="h-4 w-4" />,
  storage: <Home className="h-4 w-4" />,
  "pet friendly": <Home className="h-4 w-4" />,
};

export function getAmenityIcon(name: string) {
  const key = name.toLowerCase();
  return amenityIconMap[key] || <Tag className="h-4 w-4" />;
}
