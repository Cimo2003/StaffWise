"use client"

import { Group, Room, Subject, User } from "@/lib/types";
import React, { createContext, useContext } from "react"

const DataContext = createContext<any>(null)

export const DataProvider = ({ semesterId, rooms, teachers, groups, subjects, children }: { semesterId: number, rooms?: Room[], teachers: User[], groups: Group[], subjects: Subject[], children: React.ReactNode }) => {
  return <DataContext.Provider value={{ semesterId, rooms, teachers, groups, subjects }}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext)