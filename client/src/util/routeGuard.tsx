import React, { ReactNode } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { RootState } from "../store"

interface RouteGuardProps {
  children: ReactNode
  nextPath: string
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children, nextPath }) => {
  const userData = useSelector((state: RootState) => state.clientFlow.userData)

  // Check if required fields are filled
  const canProceed = userData.preferredName !== "" && userData.email !== ""

  return canProceed ? children : <Navigate to={nextPath} replace />
}

export default RouteGuard
