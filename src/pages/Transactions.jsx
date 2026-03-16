// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import Sidebar from "../components/Sidebar";

// export default function Transactions() {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fetchTransactions = async () => {
//     const { data } = await api.get("/transactions");
//     setTransactions(data);
//   };

//   return (
//     <div className="flex">
//       <Sidebar />

//       <div className="p-8 w-full">
//         <h2 className="text-2xl font-bold mb-6">Transactions</h2>

//         {transactions.map((tx) => (
//           <div key={tx._id} className="border p-4 mb-4">
//             <h3 className="font-semibold">{tx.description}</h3>

//             {tx.journalLines.map((line, index) => (
//               <div key={index} className="flex justify-between">
//                 <span>{line.accountId.name}</span>
//                 <span>
//                   {line.type} - {line.amount}
//                 </span>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
