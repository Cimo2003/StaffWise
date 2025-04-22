"use client"

import { Department, Section } from "@/lib/types";
import React, { createContext, useContext } from "react"

const DataContext = createContext<any>(null)

export const DataProvider = ({ sections, children }: { sections: Section[]; children: React.ReactNode }) => {
  return <DataContext.Provider value={sections}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext)