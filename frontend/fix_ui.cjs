const fs = require('fs');

// 1. Update index.css
const css = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
@import "tailwindcss";

body {
  background-color: #0B0E14;
  background-image: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59, 130, 246, 0.08), transparent);
  background-attachment: fixed;
  color: #f8fafc;
}

.gw-card {
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
}

.gw-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
  color: #e2e8f0;
}

.gw-label {
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: #94a3b8;
}

.gw-pill-stable {
  background: rgba(52, 211, 153, 0.1);
  border: 1px solid rgba(52, 211, 153, 0.25);
  color: #34d399;
}

.gw-dot-stable {
  box-shadow: 0 0 8px rgba(52, 211, 153, 0.7);
  background-color: #34d399;
}

.gw-pill-unstable {
  background: rgba(244, 63, 94, 0.1);
  border: 1px solid rgba(244, 63, 94, 0.25);
  color: #f43f5e;
}

.gw-dot-unstable {
  box-shadow: 0 0 8px rgba(244, 63, 94, 0.7);
  background-color: #f43f5e;
}

.gw-pill-recovering {
  background: rgba(251, 191, 36, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.25);
  color: #fbbf24;
}

.gw-dot-recovering {
  box-shadow: 0 0 8px rgba(251, 191, 36, 0.7);
  background-color: #fbbf24;
}
`;
fs.writeFileSync('src/index.css', css);

// 2. Sidebar.jsx
let sidebar = fs.readFileSync('src/components/layout/Sidebar.jsx', 'utf8');
sidebar = sidebar.replace('bg-slate-900 border-r border-slate-800', 'bg-black/30 border-r border-white/[0.04]');
fs.writeFileSync('src/components/layout/Sidebar.jsx', sidebar);

// 3. StatCard.tsx
let statCard = fs.readFileSync('src/components/dashboard/StatCard.tsx', 'utf8');
statCard = statCard.replace('bg-slate-900 border border-slate-800 rounded-xl p-5', 'gw-card p-5');
statCard = statCard.replace('text-xs font-semibold text-slate-400 uppercase tracking-wider', 'gw-label');
statCard = statCard.replace('text-3xl font-bold text-slate-100 mb-5 tracking-tight', 'gw-value mb-5 block');
fs.writeFileSync('src/components/dashboard/StatCard.tsx', statCard);

// 4. GridStatus.tsx
let gridStatus = fs.readFileSync('src/components/dashboard/GridStatus.tsx', 'utf8');
gridStatus = gridStatus.replace(/const statusConfig = \{[\s\S]*?\};\n\nexport default function/m, 
`const statusConfig = {
  STABLE: {
    pill: 'gw-pill-stable',
    dot: 'gw-dot-stable',
    icon: ShieldCheck,
    label: 'GRID STABLE'
  },
  UNSTABLE: {
    pill: 'gw-pill-unstable',
    dot: 'gw-dot-unstable',
    icon: AlertTriangle,
    label: 'GRID UNSTABLE'
  },
  RECOVERING: {
    pill: 'gw-pill-recovering',
    dot: 'gw-dot-recovering',
    icon: Activity,
    label: 'RECOVERING'
  }
};

export default function`);

gridStatus = gridStatus.replace(
  /className=\{\`border rounded-xl p-6 flex flex-col h-full bg-slate-900 shadow-sm relative overflow-hidden \$\{config\.border\}\`\}/,
  'className="gw-card p-5 flex flex-col h-full relative overflow-hidden"'
);
gridStatus = gridStatus.replace(/<div className=\{\`absolute top-0 left-0 w-1 h-full \$\{config\.indicator\}\`\}><\/div>/, '');

gridStatus = gridStatus.replace(
  /<div className="flex items-center gap-4 mb-8">[\s\S]*?<\/div>\n      <\/div>/,
  `<div className="flex items-center gap-4 mb-8">
        <div className={\`px-4 py-2 rounded-full flex items-center gap-3 \${config.pill}\`}>
          <div className={\`w-2 h-2 rounded-full \${config.dot} animate-pulse\`}></div>
          <Icon className="w-4 h-4" />
          <span className="text-xs font-semibold tracking-wider uppercase">{config.label}</span>
        </div>
      </div>`
);
gridStatus = gridStatus.replace(/bg-slate-950\/50 border border-slate-800\/80 rounded-lg p-4/g, 'gw-card p-5');
gridStatus = gridStatus.replace(/text-xs font-medium text-slate-400 uppercase tracking-wider mb-1/g, 'gw-label block mb-2');
gridStatus = gridStatus.replace(/text-2xl font-semibold text-slate-100/g, 'gw-value block');
gridStatus = gridStatus.replace(/text-2xl font-semibold/g, 'gw-value block');
fs.writeFileSync('src/components/dashboard/GridStatus.tsx', gridStatus);
