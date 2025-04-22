"use client"

import { Department } from "@/lib/types";
import React, { createContext, useContext } from "react"

const DataContext = createContext<any>(null)

export const DataProvider = ({ departments, children }: { departments: Department[]; children: React.ReactNode }) => {
  return <DataContext.Provider value={departments}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext)