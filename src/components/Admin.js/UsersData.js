import React, { useContext, useEffect, useState } from 'react'
import { DContext } from '../../context/Datacontext'
import LiveChart from '../Livedata/LiveChart'
import Loading from '../Loading'

const UsersData = () => {

    const { Auth, thinkSpeakData, lastUserData, graphData } =  useContext(DContext)
    const [id, setId] = useState(null)

    useEffect(()=>{
        if(Auth){
            console.log("called:",Auth)
            setId(Auth.id)
        }else{
            setId(0)
        }
    },[Auth])

    console.log("data",Auth, thinkSpeakData, lastUserData, graphData)


     
const controls = {
        show: true,
        download: true,
        selection: false,
        zoom: false,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
        zoomEnabled: true,
        autoSelected: "zoom",
      }

      console.log("id:",id)
      console.log("lastUserData:",lastUserData)
      if(id){
        console.log("id-1:",id-1)
      }
      if(lastUserData){
        console.log("id:",lastUserData[3])
      }




      if(!id || !lastUserData || !graphData){
        return <div>Loading....</div>
      }

      if(!lastUserData[id-2]){
        return <div><Loading/></div>
      }

    return (
        <div className="p-4 bg-white text-center">
        <h2 className="text-2xl font-bold text-primary mb-4 capitalize">Water Usage Monitoring</h2>
        <ul className="space-y-2">
          <li className="text-gray-700 text-base">
            <span className="font-semibold text-gray-900">Usage:</span> {lastUserData[id-2].usage}
          </li>
          <li className="text-gray-700 text-base">
            <span className="font-semibold text-gray-900">Updated At:</span> {new Date(lastUserData[id - 2].updatedAt).toLocaleString()}
          </li>
        </ul>

        <div className="mx-auto col-11 col-md-8 col-lg-6">
          <LiveChart
            data={[graphData[Number(id)-2]]}
            title={`H${id}`}
            lineStyle="straight"
            lineWidth={1}
            chartType="line"
            controls={controls}
          />
        </div>
      

      </div>
      
    )
}

export default UsersData
