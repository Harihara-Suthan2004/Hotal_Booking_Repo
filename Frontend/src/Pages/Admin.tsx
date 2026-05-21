import React, { useState, useEffect, useCallback } from 'react';
import Adminsidebar from '../Components/Adminsidebar';

type AdminPage = 'Order' | 'Sales' | 'Users';

const Admin: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [activePage, setActivePage] = useState<AdminPage>('Order');
  const [orders, setOrders] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const API_BASE = "http://localhost:3000/api";
  const token = localStorage.getItem('token');

  const fetchData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    
    try {
      // Logic to determine the correct URL based on the active tab
      let url = "";
      if (activePage === 'Order') url = `${API_BASE}/admin/all-orders`;
      else if (activePage === 'Sales') url = `${API_BASE}/admin/sales-history`;
      else if (activePage === 'Users') url = `${API_BASE}/users`; // Hits your user controller

      const res = await fetch(url, {
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Server Error");

      // Set data based on active page
      if (activePage === 'Order') setOrders(result.data || []);
      if (activePage === 'Sales') setSales(result.data || []);
      if (activePage === 'Users') setUsers(Array.isArray(result) ? result : result.data || []);
      
    } catch (error: any) {
      console.error("Fetch error:", error.message);
    } finally {
      setLoading(false);
    }
  }, [activePage, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className='flex w-full min-h-screen bg-slate-50'>
      <Adminsidebar onPageChange={(page: AdminPage) => setActivePage(page)} onLogout={onLogout} />

      <div className='flex-1 p-8'>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800">{activePage} Management</h1>
          <button onClick={fetchData} className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400 italic">Updating records...</div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            
            {/* ORDERS TABLE */}
            {activePage === 'Order' && (
              <table className="w-full text-left">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Items</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-slate-50">
                      <td className="p-4 font-mono text-xs text-blue-600 font-bold">{order.order_no}</td>
                      <td className="p-4 text-black">
                        <div className="font-bold">{order.customer?.name || "Unknown"}</div>
                        <div className="text-xs text-slate-500">{order.customer?.email}</div>
                      </td>
                      <td className="p-4 text-sm text-black">
                        {order.items?.map((item: any, i: number) => (
                          <div key={i}>{item.food_item?.name} (x{item.quantity})</div>
                        ))}
                      </td>
                      <td className="p-4 font-bold text-black">${Number(order.total_amount).toFixed(2)}</td>
                      <td className="p-4">
                        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase">{order.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* SALES TABLE */}
            {activePage === 'Sales' && (
              <table className="w-full text-left">
                <thead className="bg-emerald-800 text-white">
                  <tr>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Food Item</th>
                    <th className="p-4 text-center">Qty</th>
                    <th className="p-4 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <tr key={sale.id} className="border-b">
                      <td className="p-4 font-medium text-black">{sale.username}</td>
                      <td className="p-4 text-black">{sale.item_name}</td>
                      <td className="p-4 text-center text-black">{sale.quantity}</td>
                      <td className="p-4 text-right font-bold text-emerald-600">${sale.total_price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* USERS TABLE */}
            {activePage === 'Users' && (
              <table className="w-full text-left">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Joined Date</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr><td colSpan={4} className="p-10 text-center text-slate-400">No users found.</td></tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-slate-50">
                        <td className="p-4 font-bold text-black">{user.name}</td>
                        <td className="p-4 text-black">{user.email}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500 text-sm">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;