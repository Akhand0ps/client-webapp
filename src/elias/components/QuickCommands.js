import React from 'react';

const commands = [
  { icon: '📊', text: 'Run Headcount Report', action: 'headcount' },
  { icon: '📉', text: 'Run Attrition Analysis', action: 'attrition' },
  { icon: '🎯', text: 'Run Hiring Funnel Report', action: 'hiring' },
  { icon: '💼', text: 'View Open Positions', action: 'positions' },
];

function QuickCommands({ onCommand }) {
  return (
    <div className="card">
      <div className="card-head">
        <div className="card-title">⚡ Quick Commands</div>
      </div>
      <div className="card-body">
        {commands.map((cmd, i) => (
          <div className="cmd-item" key={i} onClick={() => onCommand(cmd.action)}>
            <span className="cmd-ico">{cmd.icon}</span>
            <span className="cmd-txt">{cmd.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickCommands;
