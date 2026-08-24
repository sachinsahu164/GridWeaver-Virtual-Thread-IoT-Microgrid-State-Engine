const fs = require('fs');

let apiCode = fs.readFileSync('src/services/api.js', 'utf8');

// Replace mockNodes coordinates
apiCode = apiCode.replace(/40\.7128/g, '23.2500').replace(/-74\.0060/g, '77.4100')
apiCode = apiCode.replace(/40\.7228/g, '23.2550').replace(/-73\.9960/g, '77.4150')
apiCode = apiCode.replace(/40\.7150/g, '23.2450').replace(/-73\.9800/g, '77.4050')
apiCode = apiCode.replace(/40\.7050/g, '23.2400').replace(/-74\.0150/g, '77.3900')
apiCode = apiCode.replace(/40\.7300/g, '23.2600').replace(/-74\.0000/g, '77.4200')

// Replace mockBatteries coordinates
apiCode = apiCode.replace(/40\.7158/g, '23.2520').replace(/-74\.0160/g, '77.4120')
apiCode = apiCode.replace(/40\.7028/g, '23.2380').replace(/-74\.0100/g, '77.4080')
apiCode = apiCode.replace(/40\.7258/g, '23.2580').replace(/-73\.9850/g, '77.4180')
apiCode = apiCode.replace(/40\.7350/g, '23.2620').replace(/-73\.9900/g, '77.4220')
apiCode = apiCode.replace(/40\.7100/g, '23.2420').replace(/-73\.9950/g, '77.4020')

// Add mockEvents
const eventsCode = `
let mockEvents = [
  { id: 1, time: '12:00 PM', type: 'info', title: 'System booted', icon: 'CheckCircle', color: 'text-emerald-400' },
  { id: 2, time: '12:05 PM', type: 'info', title: 'Grid stable', icon: 'Activity', color: 'text-emerald-400' },
  { id: 3, time: '12:10 PM', type: 'info', title: 'Solar output nominal', icon: 'Zap', color: 'text-blue-400' },
  { id: 4, time: '12:15 PM', type: 'info', title: 'Battery fully charged', icon: 'Battery', color: 'text-emerald-400' },
];
`;

apiCode = apiCode.replace('const getMockResponse', eventsCode + '\nconst getMockResponse');

// Add endpoint to interceptor
const eventEndpoint = `
    if (endpoint === '/api/events') return mockEvents;
`;

apiCode = apiCode.replace("if (endpoint === '/api/grid/summary')", "if (endpoint === '/api/events') return mockEvents;\n    if (endpoint === '/api/grid/summary')");

// Add events to simulation/storm
const stormEvents = `
      mockEvents = [
        { id: 5, time: 'Now', type: 'alert', title: 'Grid became unstable', icon: 'AlertTriangle', color: 'text-rose-400' },
        { id: 6, time: 'Now', type: 'warning', title: 'Solar generation dropped', icon: 'Zap', color: 'text-amber-400' },
        { id: 7, time: 'Now', type: 'alert', title: 'Batteries started discharging', icon: 'Battery', color: 'text-rose-400' },
        ...mockEvents.slice(0, 1)
      ];
`;
apiCode = apiCode.replace("mockBatteries = mockBatteries.map(b => ({ ...b, state: 'DISCHARGING', power: -5.2 }));", "mockBatteries = mockBatteries.map(b => ({ ...b, state: 'DISCHARGING', power: -5.2 }));\n" + stormEvents);

const resetEvents = `
      mockEvents = [
        { id: 8, time: 'Now', type: 'info', title: 'System booted / Reset', icon: 'CheckCircle', color: 'text-emerald-400' },
        { id: 9, time: 'Now', type: 'info', title: 'Grid stable', icon: 'Activity', color: 'text-emerald-400' },
        ...mockEvents.slice(0, 2)
      ];
`;
apiCode = apiCode.replace(/mockBatteries = mockBatteries\.map\(b => \(\{ \.\.\.b, state: 'IDLE', power: 0 \}\)\);/g, "mockBatteries = mockBatteries.map(b => ({ ...b, state: 'IDLE', power: 0 }));\n" + resetEvents);

fs.writeFileSync('src/services/api.js', apiCode);
