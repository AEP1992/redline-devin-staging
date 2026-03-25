/**
 * Hook that returns territory-filtered data.
 * All pages should use this instead of importing directly from dataProcessor.
 */
import { useMemo } from 'react';
import { useTerritory } from './TerritoryContext';
import {
  departments as allDepartments,
  firefighters as allFirefighters,
  allGear as allGearItems,
  isExpired,
  categorizeGear,
} from './dataProcessor';

export function useData() {
  const { territory } = useTerritory();

  return useMemo(() => {
    // Filter by franchise
    const departments = territory
      ? allDepartments.filter(d => d.franchise === territory)
      : allDepartments;

    const deptIds = new Set(departments.map(d => d.id));

    const firefighters = territory
      ? allFirefighters.filter(f => deptIds.has(f.departmentId))
      : allFirefighters;

    const allGear = territory
      ? allGearItems.filter(g => deptIds.has(g.departmentId))
      : allGearItems;

    // Compute derived data
    const pass = allGear.filter(g => g.status === 'PASS').length;
    const repair = allGear.filter(g => g.status === 'REPAIR').length;
    const oos = allGear.length - pass - repair;

    const totals = {
      departments: departments.length,
      firefighters: firefighters.length,
      gear: allGear.length,
      pass,
      repair,
      oos,
    };

    const passRate = totals.gear > 0 ? ((pass / totals.gear) * 100).toFixed(1) : '0.0';

    const statusBreakdown = { PASS: pass, REPAIR: repair, OOS: oos, EXPIRED: 0, UNKNOWN: 0 };
    allGear.forEach(g => {
      if (!['PASS', 'REPAIR', 'OOS'].includes(g.status)) {
        if (g.status === 'EXPIRED') statusBreakdown.EXPIRED++;
        else statusBreakdown.UNKNOWN++;
      }
    });

    const expiredCount = allGear.filter(g => isExpired(g.mfgDate)).length;

    const gearByType = {};
    const gearByMfr = {};
    allGear.forEach(g => {
      gearByType[g.type] = (gearByType[g.type] || 0) + 1;
      const mfr = g.manufacturer || 'Unknown';
      gearByMfr[mfr] = (gearByMfr[mfr] || 0) + 1;
    });

    const uniqueMfrs = new Set(allGear.map(g => g.manufacturer).filter(m => m && m !== 'Unknown'));

    // Avg gear age
    const now = new Date();
    let totalMonths = 0, ageCount = 0;
    allGear.forEach(g => {
      if (!g.mfgDate) return;
      const match = g.mfgDate.match(/(\d{1,2})\s*[-\/]\s*(\d{4})/);
      if (!match) return;
      const year = parseInt(match[2]);
      const month = parseInt(match[1]);
      if (year < 1990 || year > 2030) return;
      const mfgD = new Date(year, month - 1);
      const diffMonths = (now - mfgD) / (1000 * 60 * 60 * 24 * 30.44);
      if (diffMonths > 0 && diffMonths < 600) { totalMonths += diffMonths; ageCount++; }
    });
    const globalAvgGearAge = ageCount > 0 ? (totalMonths / ageCount / 12).toFixed(1) : '0.0';

    return {
      departments,
      firefighters,
      allGear,
      totals,
      passRate,
      statusBreakdown,
      expiredCount,
      gearByType,
      gearByMfr,
      uniqueMfrs,
      globalAvgGearAge,
      isExpired,
      categorizeGear,
    };
  }, [territory]);
}
