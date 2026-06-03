"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Key, 
  Download, 
  User, 
  Settings, 
  LogOut,
  ChevronRight,
  TrendingUp
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Licenses", href: "/licenses", icon: Key },
    { name: "Downloads", href: "/downloads", icon: Download },
    { name: "Performance", href: "/my-performance", icon: TrendingUp },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-elite-surface border-r border-elite-border pt-24 hidden lg:flex flex-col">
      <div className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all group ${
                isActive 
                ? "bg-gold-gradient text-black font-bold" 
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
        <button className="flex items-center space-x-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
