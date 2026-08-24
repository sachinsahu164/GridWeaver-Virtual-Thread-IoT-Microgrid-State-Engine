const fs = require('fs');

const filesToFix = [
  'src/components/dashboard/PowerChart.jsx',
  'src/components/dashboard/EventList.jsx',
  'src/components/dashboard/SimulationControl.jsx',
  'src/pages/GridMapPage.jsx',
  'src/pages/SolarNodes.jsx',
  'src/pages/Batteries.jsx',
  'src/pages/Simulation.jsx'
];

for (const file of filesToFix) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the main card wrapper
    content = content.replace(/bg-slate-900 border border-slate-800(?: rounded-xl)?(?: p-\d+)?/g, 'gw-card p-5');
    
    // Replace old uppercase headers with gw-label
    content = content.replace(/text-sm font-semibold text-slate-400 uppercase tracking-wider/g, 'gw-label');
    content = content.replace(/text-xs font-semibold text-slate-400 uppercase tracking-wider/g, 'gw-label');
    
    fs.writeFileSync(file, content);
  }
}
