import { useEffect } from "react"
import React from 'react'
import axios from 'axios'
import api from '../../axioInstance'

const Dashboard = () => {
  
  useEffect(()=>{
    const fetchProtectedData= async ()=>{
      try{
          const response=await api.get('/protected-view')
          console.log('success',response.data)
      }catch(error){
        console.error("Error to fetch data",error)
      }
    }
    fetchProtectedData()
  },[])
  return (
    <div className='text-light container'>Dashbaord</div>
  )
}

export default Dashboard
