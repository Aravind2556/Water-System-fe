import React, { createContext, useEffect, useState } from 'react'

export const DContext = createContext()
function Datacontext(props) {
  const apiurl = process.env.REACT_APP_API_URL;

  const [Auth, setAuth] = useState(false)
  const [User, setUser] = useState(null)
  const [Buses, setBuses] = useState([]);
  const [thinkSpeakData, setThinkSpeakData] = useState(null)
const [lastUserData,setLastUserData]=useState(null)
  const [graphData,setGraphData]=useState(null)


  useEffect(() => {

    fetch(`${apiurl}/checkauth`, {
      method: "GET",
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === true) {
          setAuth(data.user)


        }
        else {
          setAuth(false)
        }
      })
      .catch(err => {
        console.log("error fetching to username", err)
      })


  }, [apiurl])

  useEffect(() => {
    fetch(`${apiurl}/fetch-user`, {
      method: "GET",
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === true) {
          setUser(data.user)


        }
        else {
          console.log(data.messsage)
        }
      })
      .catch(err => {
        console.log("error fetching to username", err)
      })


  }, [apiurl])






  useEffect(() => {
    if (apiurl) {
      fetch(`${apiurl}/fetch-bus`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            setBuses(data.Bus);
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [apiurl]);




  // Fetch ThingSpeak data. Use field1 as the water limit and fields 2-5 for water usage.
  const fetchThingSpeakData = async () => {
    try {
      const response = await fetch('https://api.thingspeak.com/channels/2883850/feeds.json?api_key=0QE05COK0Z2XRWHK');
      const data = await response.json();
      const feeds = data.feeds;
      setThinkSpeakData(feeds)

      // {
      //   "x-axis": xAxis,
      //   "y-axis": data.feeds.map((feed) => feed.field3),
      //   color: "#ff4f4f",
      //   seriesName: "Sound",
      // }

      const tempUserGraph1 = feeds.filter(feed=>feed.field2)
      const xAxisUser1 = tempUserGraph1.map(item => new Date(item.created_at).getTime());
      const yAxisUser1 = tempUserGraph1.map(item => item.field2);

      const tempUserGraph2 = feeds.filter(feed=>feed.field3)
      const xAxisUser2 = tempUserGraph2.map(item => new Date(item.created_at).getTime());
      const yAxisUser2 = tempUserGraph2.map(item => item.field3);

      
      const tempUserGraph3 = feeds.filter(feed=>feed.field5)
      const xAxisUser3 = tempUserGraph3.map(item => new Date(item.created_at).getTime());
      const yAxisUser3 = tempUserGraph3.map(item => item.field5)

      
      const tempUserGraph4 = feeds.filter(feed=>feed.field5)
      const xAxisUser4 = tempUserGraph4.map(item => new Date(item.created_at).getTime());
      const yAxisUser4 = tempUserGraph4.map(item => item.field5)

      setGraphData([
        {
          "x-axis": xAxisUser1,
          "y-axis": yAxisUser1,
          color: "#ff4f4f",
          seriesName: "H1",
        },
        {
          "x-axis": xAxisUser2,
          "y-axis": yAxisUser2,
          color: "#ff4f4f",
          seriesName: "H2",
        },
        {
          "x-axis": xAxisUser3,
          "y-axis": yAxisUser3,
          color: "#ff4f4f",
          seriesName: "H3",
        },
        {
          "x-axis": xAxisUser4,
          "y-axis": yAxisUser4,
          color: "#ff4f4f",
          seriesName: "H4",
        }
      ])


      let tempUser = []
      feeds.reverse().forEach(item => {


        if(item.field2 && !tempUser[0]){
          tempUser[0]={
            usage: item.field2,
            updatedAt: item.created_at
          }
        }

        if(item.field3 && !tempUser[1]){
          tempUser[1]={
            usage: item.field3,
            updatedAt: item.created_at
          }
        }

        
        if(item.field4 && !tempUser[2]){
          tempUser[2]={
            usage: item.field4,
            updatedAt: item.created_at
          }
        }

        
        if(item.field5 && !tempUser[3]){
          tempUser[3]={
            usage: item.field5,
            updatedAt: item.created_at
          }
        }
        
      });


      setLastUserData(tempUser)
      


      // setLatestData()

    } catch (error) {
      console.error('Error fetching ThingSpeak data:', error);
    }
  };


  useEffect(() => {

    fetchThingSpeakData()

    const intervalData = setInterval(() => {
      fetchThingSpeakData()
    }, 5000);

    return () => clearInterval(intervalData)

  }, [])














  const data = { Auth, setAuth, User, Buses, thinkSpeakData,lastUserData,graphData }
  return (



    <DContext.Provider value={data}>
      {props.children}
    </DContext.Provider>
  )
}

export default Datacontext
