import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function ProfileScreen() {
  const {
    profiles,
    activeProfileId,
    selectProfile,
    updateProfileName,
    completedDays,
  } = useApp();
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");

  const totalDays = Object.values(completedDays).filter(Boolean).length;

  function startEdit(p) {
    setEditing(p.id);
    setEditValue(p.name);
  }

  function confirmEdit(id) {
    if (editValue.trim()) updateProfileName(id, editValue.trim());
    setEditing(null);
  }

  return (
    <div className="pb-24">
      <div className="bg-gray-800 text-white px-4 pt-10 pb-5">
        <h1 className="text-xl font-bold">Perfiles</h1>
        <p className="text-sm opacity-70 mt-0.5">
          Selecciona o edita tu perfil
        </p>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {profiles.map((p) => {
          const isActive = p.id === activeProfileId;
          return (
            <div
              key={p.id}
              className={`bg-white rounded-2xl border-2 shadow-sm overflow-hidden ${
                isActive ? "border-gray-800" : "border-gray-200"
              }`}
            >
              {editing === p.id ? (
                <div className="flex items-center gap-2 p-4">
                  <input
                    autoFocus
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-500"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && confirmEdit(p.id)}
                  />
                  <button
                    onClick={() => confirmEdit(p.id)}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    OK
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <button
                    onClick={() => selectProfile(p.id)}
                    className="flex-1 text-left p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                          isActive ? "bg-gray-800" : "bg-gray-100"
                        }`}
                      >
                        {isActive ? "👤" : "👤"}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{p.name}</p>
                        {isActive && (
                          <p className="text-xs text-gray-500">
                            {totalDays} días completados
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => startEdit(p)}
                    className="p-4 text-gray-400"
                  >
                    ✏️
                  </button>
                  {isActive && (
                    <div className="pr-4">
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="px-4 mt-6">
        <div className="bg-gray-50 rounded-2xl p-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Sobre la app - por Israel Ortiz
          </p>
          <p className="text-xs text-gray-500">Plan Hyrox Roma 2026</p>
          <p className="text-xs text-gray-500">Dobles Mixtos · Cat 30–39</p>
          <p className="text-xs text-gray-500 mt-1">26 de Septiembre 2026</p>
        </div>
      </div>
    </div>
  );
}
