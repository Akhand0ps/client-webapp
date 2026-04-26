import React, { useEffect, useMemo, useState } from 'react';

const SIDEBAR_EVENTS = [
  { type: 'Task', message: 'Indexed employee dashboard widgets' },
  { type: 'Ops', message: 'Synced desktop window registry' },
  { type: 'Health', message: 'Elias API heartbeat accepted' },
  { type: 'CPU', message: 'Load balanced across active panels' },
  { type: 'Agent', message: 'Background worker completed queue sweep' },
  { type: 'Log', message: 'Telemetry buffer flushed' },
];

const formatTime = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const glowTone = {
  emerald: 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.85)]',
  sky: 'bg-sky-300 shadow-[0_0_8px_rgba(125,211,252,0.85)]',
  violet: 'bg-violet-300 shadow-[0_0_8px_rgba(196,181,253,0.85)]',
  amber: 'bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.85)]',
};

const MetricCard = ({ label, value, detail, tone }) => (
  <div className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-md backdrop-blur-md">
    <div className="flex items-center justify-between gap-3">
      <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/55">{label}</span>
      <span className={`h-2 w-2 rounded-full ${tone}`} />
    </div>
    <div className="mt-2 text-xl font-bold text-white">{value}</div>
    <div className="mt-1 text-xs font-medium text-white/60">{detail}</div>
  </div>
);

const LiveActivitySidebar = () => {
  const [cpu, setCpu] = useState(34);
  const [ops, setOps] = useState(128);
  const [health, setHealth] = useState(99);
  const [feed, setFeed] = useState(() =>
    SIDEBAR_EVENTS.slice(0, 4).map((event, index) => ({
      ...event,
      id: `${Date.now()}-${index}`,
      time: formatTime(),
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu((value) => clamp(value + Math.round(Math.random() * 16 - 8), 18, 86));
      setOps((value) => clamp(value + Math.round(Math.random() * 18 - 5), 80, 240));
      setHealth((value) => clamp(value + Math.round(Math.random() * 4 - 2), 94, 100));

      const event = SIDEBAR_EVENTS[Math.floor(Math.random() * SIDEBAR_EVENTS.length)];
      setFeed((items) => [
        {
          ...event,
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          time: formatTime(),
        },
        ...items,
      ].slice(0, 12));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const agentRows = useMemo(() => [
    { name: 'Window Manager', status: 'Ready', tone: glowTone.emerald },
    { name: 'Activity Stream', status: 'Live', tone: glowTone.sky },
    { name: 'API Bridge', status: 'Online', tone: health > 96 ? glowTone.emerald : glowTone.amber },
  ], [health]);

  return (
    <aside className="fixed top-0 right-0 z-40 h-screen w-[320px] border-l border-white/20 bg-white/10 bg-gradient-to-b from-white/10 to-transparent shadow-2xl backdrop-blur-xl transition-all duration-300 ease-out translate-x-0 opacity-100">
      <div className="h-full space-y-4 overflow-y-auto p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Live Activity</h2>
            <p className="mt-1 text-sm font-medium text-white/60">System monitor</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-white/80 shadow-md backdrop-blur-md">
            <span className={`h-2 w-2 animate-pulse rounded-full ${glowTone.emerald}`} />
            Live
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <MetricCard label="CPU" value={`${cpu}%`} detail="Desktop runtime load" tone={glowTone.sky} />
          <MetricCard label="OPS" value={ops} detail="Events processed today" tone={glowTone.violet} />
          <MetricCard label="Health" value={`${health}%`} detail="Agent availability" tone={glowTone.emerald} />
        </div>

        <section className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-md backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Agent Health</h3>
            <span className="rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[11px] font-bold text-white/60">Ready</span>
          </div>
          <div className="mt-3 border-t border-white/10 pt-3 space-y-3">
            {agentRows.map((agent) => (
              <div key={agent.name} className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className={`h-2.5 w-2.5 flex-none rounded-full ${agent.tone}`} />
                  <span className="truncate text-sm font-medium text-white/80">{agent.name}</span>
                </div>
                <span className="text-xs font-bold text-white/55">{agent.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between border-t border-white/10 pt-3">
            <h3 className="text-sm font-semibold text-white">Real-Time Feed</h3>
            <span className="text-xs font-bold text-white/45">{feed.length}</span>
          </div>
          <div className="space-y-2">
            {feed.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/20 bg-white/10 p-3 shadow-md backdrop-blur-md">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/50">{item.type}</span>
                  <span className="text-[11px] font-semibold text-white/40">{item.time}</span>
                </div>
                <p className="mt-1 text-sm font-medium leading-5 text-white/75">{item.message}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
};

export default LiveActivitySidebar;
