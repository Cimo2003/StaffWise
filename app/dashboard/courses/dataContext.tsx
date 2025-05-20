"use client"

import { Group, Subject, User } from "@/lib/types";
import React, { createContext, useContext } from "react"

const DataContext = createContext<any>(null)

export const DataProvider = ({ semesterId, teachers, groups, subjects, children }: { semesterId: number, teachers: User[], groups: Group[], subjects: Subject[], children: React.ReactNode }) => {
  return <DataContext.Provider value={{ semesterId, teachers, groups, subjects }}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext)