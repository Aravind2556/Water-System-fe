import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DContext } from '../../context/Datacontext';
import LiveChart from '../Livedata/LiveChart'

const AdminDashboard = () => {
    const apiurl = process.env.REACT_APP_API_URL;
    const { lastUserData, graphData } = useContext(DContext)
    const [editMode, setEditMode] = useState(false);
    const [waterLiter, setWaterLiter] = useState(100); // This will be updated with ThingSpeak field1 value
    const [users, setUsers] = useState([]);
    const [showChart, setShowChart] = useState(false);
    const [waterUsage, setwaterUsage] = useState(null)
    const navigate = useNavigate();
  


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
    };




    // Allow admin to update the water limit. This also sends an update request to ThingSpeak.
    const handleLimitUpdate = async () => {
        if (waterLiter <= 0) {
            alert("Please enter a valid positive limit.");
            return;
        }
        try {
           
            const response = await fetch(`https://api.thingspeak.com/update?api_key=MZX81GTXD8M9V40P&field1=${waterLiter}`, {
                method: "GET",
            });
            const data = await response.text();
            if (data === "0") {
                alert("Failed to update. Please try again.");
            } else {
               
                setEditMode(false);
            }
        } catch (error) {
            console.error("Error updating ThingSpeak:", error);
           
        }
    };

    // Navigate to create user page.
    const handleCreateUser = () => {
        navigate('/CreateUser');
    };

    // Fetch users data from backend.
    const fetchUsers = async () => {
        try {
            const response = await fetch(`${apiurl}/fetch-User`);
            const data = await response.json();
            if (data.success === true) {
                setUsers(data.user);
            } else {
                alert('Failed to fetch users.');
            }
        } catch (err) {
            console.error('Error fetching users:', err);
           
        }
    };

    // Fetch ThingSpeak data. Use field1 as the water limit and fields 2-5 for water usage.
    const fetchThingSpeakData = async () => {
        try {
            const response = await fetch('https://api.thingspeak.com/channels/2883850/feeds.json?api_key=0QE05COK0Z2XRWHK');
            const data = await response.json();
           


        } catch (error) {
            console.error('Error fetching ThingSpeak data:', error);
        }
    };

    // Fetch data once on mount.
    useEffect(() => {
        fetchUsers();
        fetchThingSpeakData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Open chart popup to display a user's water usage.
    const handleViewChart = (index) => {
        setShowChart(true)
        setwaterUsage(graphData[index])
    };


    const pricePerLiter = 10; // Set price per liter

    if(!lastUserData){
        return <div>Loading....</div>
    }

    return (
        <div className="p-4 text-center">
            <div className="  my-2  ">
                <div className="d-flex justify-content-center align-items-center gap-2">
                    <div>
                        <label className="font-semibold">Water Setting Limit (Liters)</label>
                        <input
                            type="number"
                            value={waterLiter}
                            onChange={(e) => setWaterLiter(Number(e.target.value))}
                            readOnly={!editMode}
                            className="border rounded p-2 m-2 w-32"
                            min="1"
                        />
                    </div>
                    {editMode ? (
                        <button
                            onClick={handleLimitUpdate}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                            Update
                        </button>
                    ) : (
                        <button
                            onClick={() => setEditMode(true)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                            Edit
                        </button>
                    )}
                </div>
                <button
                    onClick={handleCreateUser}
                    className="cursor-pointer bg-gray-200 p-2 m-3 rounded hover:bg-gray-300">
                    Create User
                </button>
            </div>

            <h2 className="text-xl font-bold mb-4">User Data</h2>

            <div className='table-responsive mx-auto col-11 col-md-8 col-lg-6'> 
                <table className="border table">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">S.No</th>
                            <th className="border p-2">User ID</th>
                            <th className="border p-2">Water Usage (Liters)</th>
                            <th className='border p-2'>price</th>
                           
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.length > 0 ? (
                            users.map((item, index) => {
                                if (item.role === 'user') {
                                    return <tr key={index}>
                                        <td className="border p-2 text-center">{index}</td>
                                        <td className="border p-2">{item.id}</td>
                                        <td className="border p-2">
  {index > 0 && lastUserData[index - 1] ? lastUserData[index - 1].usage : "N/A"}
</td>
<td className="border p-2">
  {index > 0 && lastUserData[index - 1] ? `₹${(lastUserData[index - 1].usage * pricePerLiter).toFixed(2)}` : "N/A"}
</td>


                                        <td className="border p-2">{item.email}</td>
                                        <td className="border p-2 text-center">
                                            <button
                                                onClick={() => handleViewChart(index - 1)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                                View Chart
                                            </button>
                                        </td>
                                    </tr>

                                }
                            })

                        ) : (<div>No user</div>)
                        }
                    </tbody>
                </table>
            </div>



            {showChart && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-3/4">
                        <h2 className="text-lg font-semibold mb-4">Water Usage Graph</h2>
                        {waterUsage ? <LiveChart
                            data={[waterUsage]}
                            title="Combined Chart"
                            lineStyle="straight"
                            lineWidth={1}
                            chartType="line"
                            controls={controls}
                        /> : "Loading..."}
                        <button
                            onClick={() => { setShowChart(false); setwaterUsage(null) }}
                            className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
