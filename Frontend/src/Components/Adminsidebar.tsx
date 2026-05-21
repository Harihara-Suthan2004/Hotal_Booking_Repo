import React, { useState } from 'react'
import { ShoppingCart, BarChart2, Users, LogOut } from 'lucide-react'


export type AdminPage = 'Order' | 'Sales' | 'Users';

interface SidebarProps {
  onPageChange: (page: AdminPage) => void;
  onLogout: () => void;
}

const Adminsidebar: React.FC<SidebarProps> = ({ onPageChange,onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminPage>('Order');

  const menuItems = [
    { name: 'Order' as AdminPage, icon: <ShoppingCart size={20} /> },
    { name: 'Sales' as AdminPage, icon: <BarChart2 size={20} /> },
    { name: 'Users' as AdminPage, icon: <Users size={20} /> },
  ];

  const handleBtnClick = (page: AdminPage) => {
    setActiveTab(page);
    onPageChange(page); 
  };

  return (
    <div className='w-64 h-screen bg-slate-900 text-white flex flex-col'>
      <div className='p-6 font-bold text-xl border-b border-slate-800'>Admin Panel</div>
      <div className='flex-1 py-4 px-3 space-y-2'>
        {menuItems.map((item) => (
          <button 
            key={item.name}
            onClick={() => handleBtnClick(item.name)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
              activeTab === item.name ? 'bg-orange-500' : 'hover:bg-slate-800'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      <div className='p-4 border-t border-slate-800'>
        <button 
          onClick={onLogout}
          className='w-full flex items-center gap-4 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all'
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

    </div>
  )
}

export default Adminsidebar