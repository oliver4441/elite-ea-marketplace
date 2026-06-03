"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight,
  BarChart3
} from "lucide-react";

const AdminSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-elite-surface border-r border-elite-border pt-24 hidden lg:flex flex-col">
      <div className="px-6 mb-8">
        <p className="text-[10px] font-bold text-elite-gold uppercase tracking-[0.2em]">Administration</p>
      </div>

      <div className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all group ${
                isActive 
                ? "bg-gold-gradient text-black font-bold shadow-lg shadow-elite-gold/10" 
                : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon size={20} className={isActive ? "text-black" : "group-hover:text-elite-gold"} />
                <span>{item.name}</span>
              </div>
              {isActive && <ChevronRight size={16} />}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-elite-border">
        <Link href="/" className="flex items-center space-x-3 px-4 py-3 w-full text-gray-400 hover:bg-white/5 rounded-lg transition-colors mb-2">
          <LogOut size={20} className="rotate-180" />
          <span>Exit Admin</span>
        </Link>
        <button className="flex items-center space-x-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
