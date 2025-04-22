"use client"

import React, { createContext, useContext } from "react"

const UserContext = createContext<any>(null)

export const UserProvider = ({ user, children }: { user: any; children: React.ReactNode }) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext)
