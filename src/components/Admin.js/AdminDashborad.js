// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AdminDashboard = () => {
//     const apiurl = process.env.REACT_APP_API_URL;
//     const [editMode, setEditMode] = useState(false);
//     const [waterLiter, setWaterLiter] = useState(100);
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [thingSpeakData, setThingSpeakData] = useState({});
//     const navigate = useNavigate();

//     const apiKey = "8X0VTW5CSUSHMVWA";

//     // Update ThingSpeak Water Limit
//     const handleLimitUpdate = async () => {
//         if (waterLiter <= 0) {
//             alert("Please enter a valid positive limit.");
//             return;
//         }
//         try {
//             const response = await fetch(`https://api.thingspeak.com/update?api_key=${apiKey}&field1=${waterLiter}`, {
//                 method: "GET",
//             });
//             const data = await response.text();
//             if (data === "0") {
//                 alert("Failed to update. Please try again.");
//             } else {
//                 alert("Limit Updated Successfully!");
//                 setEditMode(false);
//             }
//         } catch (error) {
//             console.error("Error updating ThingSpeak:", error);
//             alert("An error occurred while updating. Please try again later.");
//         }
//     };

//     // Navigate to Create User Page
//     const handleCreateUser = () => {
//         navigate('/CreateUser');
//     };

//     // Fetch Users Data
//     const fetchUsers = async () => {
//         try {
//             const response = await fetch(`${apiurl}/fetch-User`);
//             const data = await response.json();
//             if (data.success === true) {
//                 setUsers(data.user);
//             } else {
//                 setError('Failed to fetch users.');
//             }
//         } catch (err) {
//             console.error('Error fetching users:', err);
//             setError('An error occurred while fetching data.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Fetch ThingSpeak Data and get the latest non-null value for each field (2-5)
//     const fetchThingSpeakData = async () => {
//         try {
//             const response = await fetch('https://api.thingspeak.com/channels/2875356/feeds.json?api_key=87KKZ5Z6QRV2ZMVG');
//             const data = await response.json();
//             const feeds = data.feeds;
            
//             // Helper: iterate backward through feeds to find the latest non-null value
//             const getLatestValue = (fieldKey) => {
//                 for (let i = feeds.length - 1; i >= 0; i--) {
//                     const value = feeds[i][fieldKey];
//                     if (value !== null && value !== '' && value !== undefined) {
//                         return value;
//                     }
//                 }
//                 return null;
//             };

//             const updatedThingSpeakData = {
//                 2: getLatestValue('field2'),
//                 3: getLatestValue('field3'),
//                 4: getLatestValue('field4'),
//                 5: getLatestValue('field5'),
//             };

//             setThingSpeakData(updatedThingSpeakData);
//         } catch (error) {
//             console.error('Error fetching ThingSpeak data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//         fetchThingSpeakData();
//     }, []);

//     // Navigate to User Detail Page
//     const handleViewUser = (userId) => {
//         navigate(`/user/${userId}`);
//     };

//     return (
//         <div className="p-4">
//             {/* Water Limit Section */}
//             <div className="flex gap-4 items-center mb-6">
//                 <div className="flex flex-col gap-2">
//                     <label className="font-semibold">Water Setting Limit (Liters)</label>
//                     <input 
//                         type='number' 
//                         value={waterLiter} 
//                         onChange={(e) => setWaterLiter(Number(e.target.value))} 
//                         readOnly={!editMode} 
//                         className="border rounded p-2 w-32"
//                         min="1"
//                     />
//                     {editMode ? (
//                         <button 
//                             onClick={handleLimitUpdate} 
//                             className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
//                             Update
//                         </button>
//                     ) : (
//                         <button 
//                             onClick={() => setEditMode(true)} 
//                             className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
//                             Edit
//                         </button>
//                     )}
//                 </div>

//                 <div 
//                     onClick={handleCreateUser}
//                     className="cursor-pointer bg-gray-200 p-2 rounded hover:bg-gray-300">
//                     <p>Create User</p>
//                 </div>
//             </div>

//             {/* User Table Section */}
//             <h2 className="text-xl font-bold mb-4">User Data</h2>

//             {loading && <p>Loading users...</p>}
//             {error && <p className="text-red-500">{error}</p>}

//             {!loading && !error && (
//                 <table className="border w-full">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="border p-2">S.No</th>
//                             <th className="border p-2">User ID</th>
//                             <th className="border p-2">Water Usage (Liters)</th>
//                             <th className="border p-2">Email</th>
//                             <th className="border p-2">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.length > 0 ? (
//                             users.map((user, index) => {
//                                 if (user.role !== "admin") {
//                                     // Convert the user id to a number to match our ThingSpeak keys (2-5)
//                                     const userIdNumber = Number(user.id);
//                                     const waterUsage = thingSpeakData[userIdNumber] || 'N/A';
//                                     return (
//                                         <tr key={user._id}>
//                                             <td className="border p-2 text-center">{index}</td>
//                                             <td className="border p-2">{user.id}</td>
//                                             <td className="border p-2">{waterUsage}</td>
//                                             <td className="border p-2">{user.email}</td>
//                                             <td className="border p-2 text-center">
//                                                 <button
//                                                     onClick={() => handleViewUser(user.id)}
//                                                     className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
//                                                     View
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     );
//                                 }
//                                 return null;
//                             })
//                         ) : (
//                             <tr>
//                                 <td className="border p-2 text-center" colSpan="5">
//                                     No users found.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default AdminDashboard;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import emailjs from 'emailjs-com';

const AdminDashboard = () => {
    const apiurl = process.env.REACT_APP_API_URL;
    const [editMode, setEditMode] = useState(false);
    const [waterLiter, setWaterLiter] = useState(100); // This will be updated with ThingSpeak field1 value
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [thingSpeakData, setThingSpeakData] = useState({});
    const [showChart, setShowChart] = useState(false);
    const [chartData, setChartData] = useState({ options: {}, series: [] });
    const [lastEmailUsage, setLastEmailUsage] = useState({});
    const navigate = useNavigate();

    const apiKey = "8X0VTW5CSUSHMVWA";

    // Function to send email alert via EmailJS.
    const sendEmailAlert = (email, userId, usage, limit) => {
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            to_email: email,
            message: `Alert! User ID ${userId}'s water usage (${usage} liters) has exceeded the limit of ${limit} liters.`,
        }, 'YOUR_USER_ID')
        .then(() => {
            console.log(`Email sent successfully for user ${userId}`);
        }).catch((error) => {
            console.error('Email sending failed:', error);
        });
    };

    // Allow admin to update the water limit. This also sends an update request to ThingSpeak.
    const handleLimitUpdate = async () => {
        if (waterLiter <= 0) {
            alert("Please enter a valid positive limit.");
            return;
        }
        try {
            const response = await fetch(`https://api.thingspeak.com/update?api_key=${apiKey}&field1=${waterLiter}`, {
                method: "GET",
            });
            const data = await response.text();
            if (data === "0") {
                alert("Failed to update. Please try again.");
            } else {
                alert("Limit Updated Successfully!");
                setEditMode(false);
            }
        } catch (error) {
            console.error("Error updating ThingSpeak:", error);
            alert("An error occurred while updating. Please try again later.");
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
                setError('Failed to fetch users.');
            }
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch ThingSpeak data. Use field1 as the water limit and fields 2-5 for water usage.
    const fetchThingSpeakData = async () => {
        try {
            const response = await fetch('https://api.thingspeak.com/channels/2875356/feeds.json?api_key=87KKZ5Z6QRV2ZMVG');
            const data = await response.json();
            const feeds = data.feeds;

            const getLatestValue = (fieldKey) => {
                for (let i = feeds.length - 1; i >= 0; i--) {
                    const value = feeds[i][fieldKey];
                    if (value !== null && value !== '' && value !== undefined) {
                        return parseFloat(value);
                    }
                }
                return 0;
            };

            // Get the limit from field1 and update the state.
            const limit = getLatestValue('field1');
            setWaterLiter(limit);

            const updatedThingSpeakData = {
                2: getLatestValue('field2'),
                3: getLatestValue('field3'),
                4: getLatestValue('field4'),
                5: getLatestValue('field5'),
            };

            setThingSpeakData(updatedThingSpeakData);

            // Check each user (excluding admins) and send an email alert only if usage exceeds limit and is a new update.
            users.forEach((user) => {
                if (user.role === 'admin') return;
                const usage = updatedThingSpeakData[user.id];
                if (usage > limit) {
                    if (!lastEmailUsage[user.id] || usage > lastEmailUsage[user.id]) {
                        sendEmailAlert(user.email, user.id, usage, limit);
                        setLastEmailUsage(prev => ({ ...prev, [user.id]: usage }));
                    }
                }
            });
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
    const handleViewChart = (userId) => {
        const usage = thingSpeakData[userId];
        setChartData({
            options: { chart: { id: "water-usage-chart" }, xaxis: { categories: ["Usage"] } },
            series: [{ name: "Water Usage", data: [usage] }]
        });
        setShowChart(true);
    };

    return (
        <div className="p-4">
            <div className="flex gap-4 items-center mb-6">
                <div className="flex flex-col gap-2">
                    <label className="font-semibold">Water Setting Limit (Liters)</label>
                    <input 
                        type="number" 
                        value={waterLiter} 
                        onChange={(e) => setWaterLiter(Number(e.target.value))} 
                        readOnly={!editMode} 
                        className="border rounded p-2 w-32"
                        min="1"
                    />
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
                <div 
                    onClick={handleCreateUser}
                    className="cursor-pointer bg-gray-200 p-2 rounded hover:bg-gray-300">
                    <p>Create User</p>
                </div>
            </div>

            <h2 className="text-xl font-bold mb-4">User Data</h2>
            {loading && <p>Loading users...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <table className="border w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">S.No</th>
                            <th className="border p-2">User ID</th>
                            <th className="border p-2">Water Usage (Liters)</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => {
                                if (user.role !== "admin") {
                                    const waterUsage = thingSpeakData[user.id] || 'N/A';
                                    return (
                                        <tr key={user._id}>
                                            <td className="border p-2 text-center">{index }</td>
                                            <td className="border p-2">{user.id}</td>
                                            <td className="border p-2">{waterUsage}</td>
                                            <td className="border p-2">{user.email}</td>
                                            <td className="border p-2 text-center">
                                                <button
                                                    onClick={() => handleViewChart(user.id)}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                                    View Chart
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }
                                return null;
                            })
                        ) : (
                            <tr>
                                <td className="border p-2 text-center" colSpan="5">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
            {showChart && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-3/4">
                        <h2 className="text-lg font-semibold mb-4">Water Usage Graph</h2>
                        <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
                        <button
                            onClick={() => setShowChart(false)}
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
