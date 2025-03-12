import React from 'react'
import { useParams } from 'react-router-dom'

const WaterLimit = () => {
    const {id}= useParams()
    console.log("user id",id)
  return (
    <div className="h-screen w-full items-center">
      <p>Chart</p>
    </div>
  )
}

export default WaterLimit
