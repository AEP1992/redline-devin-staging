import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { departments, firefighters, allGear, totals, passRate, statusBreakdown, expiredCount } from '../dataProcessor';

export default function Dashboard() {
  const navigate = useNavigate();

  // Split data by franchise/territory
  const territories = useMemo(() => {
    const result = {};
    departments.forEach(d => {
      const fr = d.franchise || 'Unknown';
      if (!result[fr]) result[fr] = { name: fr, depts: 0, ff: 0, gear: 0, pass: 0, repair: 0, oos: 0, deptIds: new Set() };
      result[fr].depts++;
      result[fr].deptIds.add(d.id);
    });

    firefighters.forEach(f => {
      for (const fr of Object.values(result)) {
        if (fr.deptIds.has(f.departmentId)) { fr.ff++; break; }
      }
    });

    allGear.forEach(g => {
      for (const fr of Object.values(result)) {
        if (fr.deptIds.has(g.departmentId)) {
          fr.gear++;
          if (g.status === 'PASS') fr.pass++;
          else if (g.status === 'REPAIR') fr.repair++;
          else fr.oos++;
          break;
        }
      }
    });

    return Object.values(result);
  }, []);

  const ntx = territories.find(t => t.name === 'North Texas') || { name: 'North Texas', depts: 0, ff: 0, gear: 0, pass: 0, repair: 0, oos: 0 };
  const co = territories.find(t => t.name === 'Colorado') || { name: 'Colorado', depts: 0, ff: 0, gear: 0, pass: 0, repair: 0, oos: 0 };

  const ntxPassRate = ntx.gear > 0 ? ((ntx.pass / ntx.gear) * 100).toFixed(1) : '0.0';
  const coPassRate = co.gear > 0 ? ((co.pass / co.gear) * 100).toFixed(1) : '0.0';

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard' }]} />
      <h1 className="text-2xl font-bold text-gray-900 mt-2">Welcome back, Devin</h1>
      <p className="text-gray-500 text-sm mb-6">Your territories at a glance — {totals.departments} departments across {territories.length} regions</p>

      {/* Territory Cards - Side by Side */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* North Texas */}
        <div
          className="bg-white rounded-xl border-2 border-surface-border hover:border-[#e11d48] transition-colors cursor-pointer p-6 relative overflow-hidden group"
          onClick={() => navigate('/departments')}
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#e11d48] to-[#f43f5e]"></div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">North Texas</h2>
              <p className="text-xs text-gray-500 mt-0.5">Texas & surrounding states</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${parseFloat(ntxPassRate) >= 90 ? 'bg-green-100 text-green-700' : parseFloat(ntxPassRate) >= 80 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
              {ntxPassRate}% Pass
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900">{ntx.depts}</div>
              <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Departments</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900">{ntx.ff.toLocaleString()}</div>
              <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Personnel</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900">{ntx.gear.toLocaleString()}</div>
              <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Gear Items</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900">{ntx.repair.toLocaleString()}</div>
              <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Repairs</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span>Pass: {ntx.pass.toLocaleString()}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Repair: {ntx.repair.toLocaleString()}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span>OOS: {ntx.oos.toLocaleString()}</span>
          </div>

          <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400" style={{ width: `${ntxPassRate}%` }}></div>
          </div>

          <div className="absolute bottom-3 right-4 text-gray-300 group-hover:text-[#e11d48] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </div>
        </div>

        {/* Colorado */}
        <div
          className="bg-white rounded-xl border-2 border-surface-border hover:border-[#0891b2] transition-colors cursor-pointer p-6 relative overflow-hidden group"
          onClick={() => navigate('/departments')}
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0891b2] to-[#06b6d4]"></div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Colorado</h2>
              <p className="text-xs text-gray-500 mt-0.5">Colorado & surrounding states</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${parseFloat(coPassRate) >= 90 ? 'bg-green-100 text-green-700' : parseFloat(coPassRate) >= 80 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
              {coPassRate}% Pass
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900">{co.depts}</div>
              <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Departments</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900">{co.ff.toLocaleString()}</div>
              <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Personnel</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900">{co.gear.toLocaleString()}</div>
              <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Gear Items</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900">{co.repair.toLocaleString()}</div>
              <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Repairs</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span>Pass: {co.pass.toLocaleString()}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Repair: {co.repair.toLocaleString()}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span>OOS: {co.oos.toLocaleString()}</span>
          </div>

          <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400" style={{ width: `${coPassRate}%` }}></div>
          </div>

          <div className="absolute bottom-3 right-4 text-gray-300 group-hover:text-[#0891b2] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </div>
        </div>
      </div>

      {/* Combined Totals Bar */}
      <div className="bg-gradient-to-r from-[#0f1a30] via-[#1a2a4a] to-[#2a3f6a] rounded-xl p-5 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white/50 text-[10px] uppercase tracking-widest font-semibold">Combined Totals</div>
            <div className="text-xl font-bold mt-1">{totals.departments} Departments · {totals.firefighters.toLocaleString()} Personnel · {totals.gear.toLocaleString()} Gear Items</div>
          </div>
          <div className="text-right">
            <div className="text-white/50 text-[10px] uppercase tracking-widest font-semibold">Overall Pass Rate</div>
            <div className="text-xl font-bold mt-1">{passRate}%</div>
          </div>
        </div>
      </div>

      {/* Urgent Items */}
      <div className="grid grid-cols-3 gap-4">
        <UrgentCard
          color="red"
          icon={<svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>}
          label="Expired Gear"
          count={expiredCount}
          desc="Past NFPA 10-year limit — requires immediate replacement"
          onClick={() => navigate('/gear?filter=expired')}
        />
        <UrgentCard
          color="amber"
          icon={<svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>}
          label="Out of Service"
          count={statusBreakdown.OOS}
          desc="Equipment currently pulled from active duty"
          onClick={() => navigate('/gear?filter=oos')}
        />
        <UrgentCard
          color="orange"
          icon={<svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>}
          label="Repairs Needed"
          count={statusBreakdown.REPAIR}
          desc="Items flagged for follow-up or maintenance"
          onClick={() => navigate('/gear?filter=repair')}
        />
      </div>
    </div>
  );
}

function UrgentCard({ color, icon, label, count, desc, onClick }) {
  const borderColor = color === 'red' ? 'hover:border-red-300' : color === 'amber' ? 'hover:border-amber-300' : 'hover:border-orange-300';
  return (
    <div
      className={`bg-white rounded-lg border border-surface-border ${borderColor} transition-colors cursor-pointer p-5`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <div>
          <div className="text-sm font-semibold text-gray-900">{label}</div>
          <div className="text-xs text-gray-500">{desc}</div>
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900">{count.toLocaleString()}</div>
    </div>
  );
}
