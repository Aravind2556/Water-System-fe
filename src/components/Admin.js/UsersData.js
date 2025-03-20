// import React, { useContext, useEffect, useState } from 'react'
// import { DContext } from '../../context/Datacontext'
// import LiveChart from '../Livedata/LiveChart'
// import Loading from '../Loading'

// const UsersData = () => {

//     const { Auth, thinkSpeakData, lastUserData, graphData } =  useContext(DContext)
//     const [id, setId] = useState(null)

//     useEffect(()=>{
//         if(Auth){
//             console.log("called:",Auth)
//             setId(Auth.id)
//         }else{
//             setId(0)
//         }
//     },[Auth])

//     console.log("data",Auth, thinkSpeakData, lastUserData, graphData)


     
// const controls = {
//         show: true,
//         download: true,
//         selection: false,
//         zoom: false,
//         zoomin: true,
//         zoomout: true,
//         pan: true,
//         reset: true,
//         zoomEnabled: true,
//         autoSelected: "zoom",
//       }

//       console.log("id:",id)
//       console.log("lastUserData:",lastUserData)
//       if(id){
//         console.log("id-1:",id-1)
//       }
//       if(lastUserData){
//         console.log("id:",lastUserData[3])
//       }




//       if(!id || !lastUserData || !graphData){
//         return <div>Loading....</div>
//       }

//       if(!lastUserData[id-2]){
//         return <div><Loading/></div>
//       }

//     return (
//         <div className="p-4 bg-white text-center">
//         <h2 className="text-2xl font-bold text-primary mb-4 capitalize">Water Usage Monitoring</h2>
//         <ul className="space-y-2">
//           <li className="text-gray-700 text-base">
//             <span className="font-semibold text-gray-900">Usage:</span> {lastUserData[id-2].usage}
//           </li>
//           <li className="text-gray-700 text-base">
//             <span className="font-semibold text-gray-900">Updated At:</span> {new Date(lastUserData[id - 2].updatedAt).toLocaleString()}
//           </li>
//         </ul>

//         <div className="mx-auto col-11 col-md-8 col-lg-6">
//           <LiveChart
//             data={[graphData[Number(id)-2]]}
//             title={`H${id}`}
//             lineStyle="straight"
//             lineWidth={1}
//             chartType="line"
//             controls={controls}
//           />
//         </div>
      

//       </div>
      
//     )
// }

// export default UsersData



import React, { useContext, useEffect, useState } from 'react';
import { DContext } from '../../context/Datacontext';
import LiveChart from '../Livedata/LiveChart';
import Loading from '../Loading';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const UsersData = () => {
  const { Auth, lastUserData, graphData } = useContext(DContext);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (Auth) {
      setId(Auth.id);
    } else {
      setId(0);
    }
  }, [Auth]);

  if (!id || !lastUserData || !graphData) {
    return <div>Loading....</div>;
  }

  if (!lastUserData[id - 2]) {
    return <div><Loading /></div>;
  }

  // Calculation
  const usage = lastUserData[id - 2].usage;
  const amountPerLiter = 10; // ₹10 per liter
  const totalAmount = usage * amountPerLiter;
  const updatedAt = new Date(lastUserData[id - 2].updatedAt).toLocaleString();

  // PDF Styles
  const styles = StyleSheet.create({
    page: { padding: 20, fontSize: 12 },
    header: { textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    section: { marginBottom: 10 },
    table: { display: 'flex', flexDirection: 'row', borderBottom: '1 solid black', paddingBottom: 5, marginBottom: 5 },
    tableRow: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
    tableCell: { flex: 1, textAlign: 'center', fontSize: 12 },
    boldText: { fontSize: 14, fontWeight: 'bold' },
    footer: { marginTop: 20, textAlign: 'center', fontSize: 10, fontStyle: 'italic' }
  });

  // Invoice PDF Document
  const MyInvoice = (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text>Water Usage Billing</Text>
        </View>

        {/* User Details */}
        <View style={styles.section}>
          <Text style={styles.boldText}>Invoice To:</Text>
          <Text>House ID: H{id}</Text>
          <Text>Date: {updatedAt}</Text>
        </View>

        {/* Table Header */}
        <View style={styles.table}>
          <Text style={[styles.tableCell, styles.boldText]}>Description</Text>
          <Text style={[styles.tableCell, styles.boldText]}>Quantity (Liters)</Text>
          <Text style={[styles.tableCell, styles.boldText]}>Rate (₹/L)</Text>
          <Text style={[styles.tableCell, styles.boldText]}>Total (₹)</Text>
        </View>

        {/* Table Data */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Water Usage</Text>
          <Text style={styles.tableCell}>{usage}</Text>
          <Text style={styles.tableCell}>₹{amountPerLiter}</Text>
          <Text style={styles.tableCell}>₹{totalAmount}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Thank you for using our water service!</Text>
          <Text>For any inquiries, contact support@waterservice.com</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="p-4 bg-white text-center">
      <h2 className="text-2xl font-bold text-primary mb-4 capitalize">Water Usage Monitoring</h2>
      <ul className="space-y-2">
        <li className="text-gray-700 text-base">
          <span className="font-semibold text-gray-900">Usage:</span> {usage} Liters
        </li>
        <li className="text-gray-700 text-base">
          <span className="font-semibold text-gray-900">Amount:</span> ₹{totalAmount}
        </li>
        <li className="text-gray-700 text-base">
          <span className="font-semibold text-gray-900">Updated At:</span> {updatedAt}
        </li>
      </ul>

      <div className="my-4">
        <PDFDownloadLink document={MyInvoice} fileName="Water_Invoice.pdf">
          {({ loading }) => (
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              {loading ? 'Generating Invoice...' : 'Download Invoice'}
            </button>
          )}
        </PDFDownloadLink>
      </div>

      <div className="mx-auto col-11 col-md-8 col-lg-6">
        <LiveChart
          data={[graphData[Number(id) - 2]]}
          title={`H${id}`}
          lineStyle="straight"
          lineWidth={1}
          chartType="line"
        />
      </div>
    </div>
  );
};

export default UsersData;