"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Shield, 
  ShieldCheck,
  Loader2,
  Users
} from "lucide-react";
import { createClient } from "@/lib/supabase/browser";

interface UserRow {
  id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formatted: UserRow[] = (data || []).map((profile: any) => ({
        id: profile.id,
        full_name: profile.full_name || 'Unknown',
        email: profile.email || 'N/A',
        role: profile.role || 'customer',
        created_at: new Date(profile.created_at).toLocaleDateString(),
      }));

      setUsers(formatted);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-black text-white">
      <AdminSidebar />

      <div className="flex-1 lg:ml-64 flex flex-col">
        <header className="h-20 border-b border-elite-border flex items-center justify-between px-8 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
          <h1 className="text-xl font-bold">User <span className="gold-text">Management</span></h1>
        </header>

        <main className="p-8 space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">All <span className="gold-text">Users</span></h2>
            <p className="text-gray-500 text-sm">Manage customer accounts, roles, and permissions.</p>
          </div>

          {/* Filter Bar */}
          <div className="glass-card p-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-elite-border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-elite-gold transition-all"
              />
            </div>
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-white/5 border border-elite-border rounded-lg px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Filter size={18} />
                <span>Filter by Role</span>
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="glass-card overflow-hidden min-h-[400px] flex flex-col">
            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="text-elite-gold animate-spin" size={40} />
                <p className="text-gray-500 font-medium">Loading users...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <Users className="text-gray-600" size={48} />
                <p className="text-gray-500 font-medium">No users found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-elite-border bg-white/5">
                      <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Role</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Joined</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-elite-border/50">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gold-gradient/10 border border-elite-gold/20 rounded-full flex items-center justify-center font-bold text-elite-gold text-sm">
                              {user.full_name.charAt(0).toUpperCase()}
                            </div>
                            <p className="font-bold text-white group-hover:text-elite-gold transition-colors">{user.full_name}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            {user.role === 'admin' ? (
                              <div className="flex items-center space-x-2 bg-elite-gold/10 border border-elite-gold/20 px-3 py-1 rounded-full">
                                <ShieldCheck size={12} className="text-elite-gold" />
                                <span className="text-[10px] text-elite-gold font-bold uppercase">Admin</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2 bg-white/5 border border-elite-border px-3 py-1 rounded-full">
                                <Shield size={12} className="text-gray-500" />
                                <span className="text-[10px] text-gray-500 font-bold uppercase">Customer</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <p className="text-sm text-gray-400">{user.created_at}</p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 text-gray-400 hover:text-elite-gold hover:bg-white/5 rounded-lg transition-all" title="More Actions">
                            <MoreHorizontal size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!loading && filteredUsers.length > 0 && (
              <div className="px-6 py-4 border-t border-elite-border flex items-center justify-between">
                <p className="text-xs text-gray-500">Showing {filteredUsers.length} of {users.length} users</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
