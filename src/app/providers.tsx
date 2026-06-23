"use client"

import { AuthProvider } from "@/src/context/AuthContext";
//import { CardProvider } from "@/src/context/CardContext";
//import { I18nProvider } from "@/src/context/i18nContext";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
   
        <AuthProvider>
         {children}
        </AuthProvider>
      
    </SessionProvider>
  );
}