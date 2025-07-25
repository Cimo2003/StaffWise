import SecuritySettings from "./password-reset"

export default function SettingsPage() {
  return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
          <p className="text-slate-500 mt-1">Manage your account settings and preferences</p>
        </div>

        <SecuritySettings/>
      </div>
  )
}
