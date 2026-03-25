import { createContext, useContext, useState, useMemo } from 'react';
import { departments, firefighters, allGear } from './dataProcessor';

const TerritoryContext = createContext(null);

export function TerritoryProvider({ children }) {
  const [territory, setTerritory] = useState(null); // null = pick screen, 'North Texas' or 'Colorado'

  // Compute filtered data based on selected territory
  const filtered = useMemo(() => {
    if (!territory) return null;

    const filteredDepts = departments.filter(d => d.franchise === territory);
    const deptIds = new Set(filteredDepts.map(d => d.id));
    const filteredFF = firefighters.filter(f => deptIds.has(f.departmentId));
    const filteredGear = allGear.filter(g => deptIds.has(g.departmentId));

    const pass = filteredGear.filter(g => g.status === 'PASS').length;
    const repair = filteredGear.filter(g => g.status === 'REPAIR').length;
    const oos = filteredGear.length - pass - repair;

    return {
      departments: filteredDepts,
      firefighters: filteredFF,
      allGear: filteredGear,
      totals: {
        departments: filteredDepts.length,
        firefighters: filteredFF.length,
        gear: filteredGear.length,
        pass,
        repair,
        oos,
      },
      passRate: filteredGear.length > 0 ? ((pass / filteredGear.length) * 100).toFixed(1) : '0.0',
    };
  }, [territory]);

  // Territory stats for the picker
  const territoryStats = useMemo(() => {
    const stats = {};
    ['North Texas', 'Colorado'].forEach(name => {
      const depts = departments.filter(d => d.franchise === name);
      const deptIds = new Set(depts.map(d => d.id));
      const ff = firefighters.filter(f => deptIds.has(f.departmentId));
      const gear = allGear.filter(g => deptIds.has(g.departmentId));
      const pass = gear.filter(g => g.status === 'PASS').length;
      const repair = gear.filter(g => g.status === 'REPAIR').length;
      const oos = gear.length - pass - repair;
      stats[name] = { depts: depts.length, ff: ff.length, gear: gear.length, pass, repair, oos };
    });
    return stats;
  }, []);

  return (
    <TerritoryContext.Provider value={{ territory, setTerritory, filtered, territoryStats }}>
      {children}
    </TerritoryContext.Provider>
  );
}

export function useTerritory() {
  return useContext(TerritoryContext);
}
