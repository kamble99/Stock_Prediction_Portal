import {children, useContext} from 'react'
import { AuthContext } from './authProvider';
import {Navigate} from 'react-router-dom'

export const PublicRoute = ({children}) => {
      const {isloggedin}=useContext(AuthContext)
  return  !isloggedin ? (
    children
  ):(
    <Navigate to="/dashboard" />
  )
    
  
}

export default PublicRoute
