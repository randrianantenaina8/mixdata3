import { createContext, useMemo, useState } from "react"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("")
  const [details, setDetails] = useState(0)
  const memoizedContext = useMemo(() => ({
    user,
    setUser,
    details,
    setDetails
  }), [
    user,
    setUser,
    details,
    setDetails
  ])
  return (
    <AuthContext.Provider value={memoizedContext}>
      {children}
    </AuthContext.Provider>
  )
}
