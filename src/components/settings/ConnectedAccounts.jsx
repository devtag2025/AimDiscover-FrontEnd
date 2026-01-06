"use client"
import { CheckCircle2, XCircle, Mail, Globe } from "lucide-react";

export function AccountRow({ icon: Icon, title, subtitle, active, isGoogle = false }) {
  return (
    <div className="px-6 py-5 flex items-center justify-between hover:bg-gray-800/30 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center">
          {isGoogle ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.347.533 12S5.867 24 12.48 24c3.44 0 6.013-1.133 8.053-3.227 2.107-2.08 2.707-5.027 2.707-7.427 0-.747-.053-1.467-.16-2.147H12.48z" />
            </svg>
          ) : (
            <Icon className="w-5 h-5 text-gray-400" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
      </div>
      
      <StatusBadge active={active} />
    </div>
  );
}

function StatusBadge({ active }) {
  if (active) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Active
      </span>
    );
  }
  
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-500 bg-gray-800 border border-gray-700 rounded-md">
      <XCircle className="w-3.5 h-3.5" />
      Inactive
    </span>
  );
}

function ConnectedAccounts({ user }) {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-white">Connected Accounts</h2>
        <p className="mt-1 text-sm text-gray-400">Manage your connected authentication methods</p>
      </div>
      
      <div className="divide-y divide-gray-800">
        <AccountRow 
          icon={Mail} 
          title="Email" 
          subtitle={user?.email || "Not set"} 
          active={user?.is_email_verified} 
        />
        <AccountRow 
          isGoogle 
          title="Google" 
          subtitle={user?.google_id ? "Connected" : "Not connected"} 
          active={!!user?.google_id} 
        />
      </div>
    </div>
  );
}

export default ConnectedAccounts