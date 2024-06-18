import Sidebar from "../component/Sidebar"
import Header from '../component/Header'
import { useState } from "react"

export const MainContainer = ({ children }) => {
  const [open, setOpen] = useState(true)
  const handleViewSidebar = () => {
    setOpen(!open)
  }
  return (
    <>
      <Sidebar isOpen={open}/>
      <Header isOpen={open} onClick={handleViewSidebar}>
        {children}
      </Header>
    </>
  )
}
