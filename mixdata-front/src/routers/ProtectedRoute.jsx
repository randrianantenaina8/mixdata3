import { Navigate } from "react-router-dom";
import { useApplication } from "../hooks/UseApplication";
import { CircularProgress } from "@mui/material";

const ProtectedRoute = ({ children }) => {
  const { authorized } = useApplication()

  if (authorized === "WAITING") return <CircularProgress />

  if (authorized === "AUTHORIZED") return children

  return <Navigate to="/"></Navigate>;
};

export default ProtectedRoute;
