import { useTerritory } from '../TerritoryContext';

export default function TerritoryPicker() {
  const { setTerritory, territoryStats } = useTerritory();
  const ntx = territoryStats['North Texas'];
  const co = territoryStats['Colorado'];

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#1a2a4a] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-[#c41e24]">REDLINE</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Hey Devin</h1>
          <div className="max-w-2xl mx-auto mt-3 mb-2 bg-navy/5 border border-navy/10 rounded-xl px-5 py-4 text-left">
            <p className="text-sm text-gray-700 leading-relaxed">This is your sandbox portal. Once you give a general spot check, we will migrate your data. The goal here is to eliminate all data problems prior to ingestion — <span className="font-semibold text-navy">please look at your territories and poke around, and let us know immediately if you see any major issues.</span> Enjoy!</p>
          </div>
          <p className="text-gray-500 text-sm mt-4">Select a territory to get started</p>
        </div>

        {/* Territory Cards */}
        <div className="grid grid-cols-2 gap-8">
          {/* North Texas */}
          <button
            onClick={() => setTerritory('North Texas')}
            className="bg-white rounded-2xl border-2 border-gray-200 hover:border-[#e11d48] hover:shadow-xl transition-all p-8 text-left group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#e11d48] to-[#f43f5e] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                <svg className="w-6 h-6 text-[#e11d48]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">North Texas</h2>
                <p className="text-xs text-gray-500">Texas & surrounding states</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <Stat label="Departments" value={ntx.depts} />
              <Stat label="Personnel" value={ntx.ff.toLocaleString()} />
              <Stat label="Gear Items" value={ntx.gear.toLocaleString()} />
              <Stat label="Pass Rate" value={`${ntx.gear > 0 ? ((ntx.pass / ntx.gear) * 100).toFixed(1) : 0}%`} />
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span>{ntx.pass.toLocaleString()} pass</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span>{ntx.repair.toLocaleString()} repair</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span>{ntx.oos.toLocaleString()} OOS</span>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-[#e11d48] opacity-0 group-hover:opacity-100 transition-opacity">
              Enter North Texas
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
            </div>
          </button>

          {/* Colorado */}
          <button
            onClick={() => setTerritory('Colorado')}
            className="bg-white rounded-2xl border-2 border-gray-200 hover:border-[#0891b2] hover:shadow-xl transition-all p-8 text-left group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0891b2] to-[#06b6d4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                <svg className="w-6 h-6 text-[#0891b2]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Colorado</h2>
                <p className="text-xs text-gray-500">Colorado & surrounding states</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <Stat label="Departments" value={co.depts} />
              <Stat label="Personnel" value={co.ff.toLocaleString()} />
              <Stat label="Gear Items" value={co.gear.toLocaleString()} />
              <Stat label="Pass Rate" value={`${co.gear > 0 ? ((co.pass / co.gear) * 100).toFixed(1) : 0}%`} />
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span>{co.pass.toLocaleString()} pass</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span>{co.repair.toLocaleString()} repair</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span>{co.oos.toLocaleString()} OOS</span>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-[#0891b2] opacity-0 group-hover:opacity-100 transition-opacity">
              Enter Colorado
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="text-lg font-bold text-gray-900">{value}</div>
      <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}
