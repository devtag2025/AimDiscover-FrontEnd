"use client"
import { CheckCircle2, XCircle, Mail, Globe } from "lucide-react";

export default function ConnectedAccounts({ user }) {
  return (
    <section className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-neutral-800 bg-neutral-900/80">
        <h2 className="font-semibold text-lg flex items-center gap-2 text-white">
          <Globe className="w-4 h-4 text-neutral-400" />
          Connected Accounts
        </h2>
        <p className="text-sm text-neutral-400">Manage how you log in to your account.</p>
      </div>
      
      <div className="divide-y divide-neutral-800">
        {/* Email Row */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
              <Mail className="w-5 h-5 text-neutral-300" />
            </div>
            <div>
              <p className="font-medium text-neutral-200">Email Address</p>
              <p className="text-sm text-neutral-500">
                {user?.is_email_verified ? user.email : "Verification pending"}
              </p>
            </div>
          </div>
          <StatusBadge active={user?.is_email_verified} />
        </div>

        {/* Google Row */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
              {/* Simple Google G Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.347.533 12S5.867 24 12.48 24c3.44 0 6.013-1.133 8.053-3.227 2.107-2.08 2.707-5.027 2.707-7.427 0-.747-.053-1.467-.16-2.147H12.48z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-neutral-200">Google</p>
              <p className="text-sm text-neutral-500">
                {user?.google_id ? "Account connected" : "Not connected"}
              </p>
            </div>
          </div>
          <StatusBadge active={!!user?.google_id} />
        </div>
      </div>
    </section>
  );
}

function StatusBadge({ active  }) {
  if (active) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Connected
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-400 border border-neutral-700">
      <XCircle className="w-3.5 h-3.5" />
      Not Linked
    </span>
  );
}