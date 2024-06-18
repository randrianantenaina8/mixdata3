import { Box } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useApplication } from "../hooks/UseApplication";
import { useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";

export const Landing = () => {
  const { authorized } = useApplication()
  const navigate = useNavigate()
  const checkUser = useCallback(() => {
    if (authorized === "AUTHORIZED") {
      navigate("land")
    } else if (authorized === "UNAUTHORIZED") {
      navigate("login")
    }
  }, [navigate, authorized])

  useEffect(() => {
    checkUser()
  }, [checkUser])

  return (
    <Box sx={{
      display: "flex",
      width: "100%",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ mb: 3 }}>Chargement de MIXDATA</Box>
        <CircularProgress />
      </Box>
    </Box>
  )
}
