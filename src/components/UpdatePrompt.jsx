export default function UpdatePrompt({ onUpdate }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3">
      <div className="w-full max-w-lg bg-gray-900 text-white rounded-2xl shadow-xl flex items-center justify-between px-4 py-3 gap-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔄</span>
          <p className="text-sm font-medium">Nueva versión disponible</p>
        </div>
        <button
          onClick={onUpdate}
          className="flex-shrink-0 bg-white text-gray-900 text-sm font-bold px-4 py-1.5 rounded-xl active:opacity-80"
        >
          Actualizar
        </button>
      </div>
    </div>
  )
}
