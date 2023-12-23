"use client"

import React, { createContext, useState, useContext } from "react"
import themes from "./themes"

export const GlobalContext = createContext()
export const GlobalUpdateContext = createContext();
export const GlobalProvider = ({ children }) => {

	const [selectedTheme, setSelectedTheme] = useState(0)
	const theme = themes[selectedTheme]

	return (
		<GlobalContext.Provider value={globalState}>
			<GlobalUpdateContext.Provider value={{
				theme,
			}}>
				{children}
			</GlobalUpdateContext.Provider>
		</GlobalContext.Provider>
	)
}
