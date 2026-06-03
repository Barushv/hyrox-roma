import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function ProfileSelector() {
  const { profiles, selectProfile, updateProfileName } = useApp();
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");

  function startEdit(p) {
    setEditing(p.id);
    setEditValue(p.name);
  }

  function confirmEdit(id) {
    if (editValue.trim()) updateProfileName(id, editValue.trim());
    setEditing(null);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🏃</div>
          <h1 className="text-2xl font-bold text-gray-900">Hyrox Roma 2026</h1>
          <p className="text-gray-500 mt-1">
            Dobles Mixtos · Cat 30–39 · 26 Sep
          </p>
        </div>

        <p className="text-center text-sm text-gray-500 mb-4">
          ¿Quién entrena hoy?
        </p>

        <div className="space-y-3">
          {profiles.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              {editing === p.id ? (
                <div className="flex items-center gap-2 p-4">
                  <input
                    autoFocus
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && confirmEdit(p.id)}
                  />
                  <button
                    onClick={() => confirmEdit(p.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    OK
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <button
                    onClick={() => selectProfile(p.id)}
                    className="flex-1 text-left p-4 text-lg font-semibold text-gray-800 active:bg-gray-50"
                  >
                    {p.name}
                  </button>
                  <button
                    onClick={() => startEdit(p)}
                    className="p-4 text-gray-400 active:bg-gray-50"
                  >
                    ✏️
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Toca ✏️ para cambiar el nombre
        </p>
      </div>
    </div>
  );
}
