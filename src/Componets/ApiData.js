import { Button } from '@mui/material'
import axios from 'axios'
import React from 'react'

const ApiData = () => {
    const clickhandler = () => {
        axios.get("https://octalogic-test-frontend.vercel.app/api/v1/vehicleTypes").then(resp=>{
            console.log(resp.data.data)
        })
    }
  return (
    <div>
     <Button onClick={clickhandler}>click</Button>
    </div>
  )
}

export default ApiData
