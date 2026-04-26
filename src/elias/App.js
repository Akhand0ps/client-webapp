// import React, { useState, useEffect } from 'react';
// import './App.css';

// // Components
// import TopRow from './components/TopRow';
// import KpiRow from './components/KpiRow';
// import BarChart from './components/BarChart';
// import FunnelChart from './components/FunnelChart';
// import QuickCommands from './components/QuickCommands';
// import TaskList from './components/TaskList';
// import MeetingList from './components/MeetingList';
// import PresentationList from './components/PresentationList';
// import LiveFeed, { getNow } from './components/LiveFeed';
// import Toast from './components/Toast';

// // Drills
// import HeadcountDrill from './components/drills/HeadcountDrill';
// import AttritionDrill from './components/drills/AttritionDrill';
// import PositionsDrill from './components/drills/PositionsDrill';
// import TenureDrill from './components/drills/TenureDrill';
// import HiringDrill from './components/drills/HiringDrill';
// import MeetingDrill from './components/drills/MeetingDrill';
// import PresentationsDrill from './components/drills/PresentationsDrill';
// import PresentationDetailDrill from './components/drills/PresentationDetailDrill';

// function App() {
//   const [viewStack, setViewStack] = useState(['main']);
//   const [events, setEvents] = useState([]);
//   const [toast, setToast] = useState({ message: '', visible: false });
//   const [presDetail, setPresDetail] = useState(null);
//   const [meetingDetail, setMeetingDetail] = useState('');
//   const [kpis, setKpis] = useState(null);
//   const [barChartData, setBarChartData] = useState([]);

//   useEffect(() => {
//     fetch('/api/kpis')
//       .then(res => res.json())
//       .then(data => setKpis(data))
//       .catch(err => console.error(err));

//     fetch('/api/charts?type=bar')
//       .then(res => res.json())
//       .then(data => setBarChartData(data))
//       .catch(err => console.error(err));
//   }, []);

//   const currentView = viewStack[viewStack.length - 1];

//   const showToast = (message) => {
//     setToast({ message, visible: true });
//     setTimeout(() => setToast({ message: '', visible: false }), 2800);
//   };

//   const addEvent = (type, title, detail) => {
//     fetch('/api/events', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ type, title, detail, time: getNow() })
//     })
//       .then(res => res.json())
//       .then(newEvent => setEvents(prev => [newEvent, ...prev].slice(0, 80)))
//       .catch(err => console.error(err));
//   };

//   const pushView = (view) => setViewStack(prev => [...prev, view]);
//   const popView = () => setViewStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);

//   const handleCommand = (action) => {
//     if (action === 'headcount') {
//       pushView('headcount');
//       addEvent('detection', 'Headcount report opened', 'Viewing department breakdown');
//     } else if (action === 'attrition') {
//       pushView('attrition');
//       addEvent('alert', 'Attrition report accessed', 'Q2 2026 analysis loaded');
//     } else if (action === 'hiring') {
//       pushView('hiring');
//       addEvent('activity', 'Hiring funnel detail accessed', 'Q2 conversion: 2.7%');
//     } else if (action === 'positions') {
//       pushView('positions');
//       addEvent('activity', 'Open positions viewed', '34 active roles listed');
//     }
//   };

//   const handleTaskComplete = (taskText) => {
//     addEvent('activity', 'Task completed', taskText);
//   };

//   const handleDrillMeeting = (title) => {
//     setMeetingDetail(title);
//     pushView('meeting');
//     addEvent('info', 'Meeting detail opened', title);
//   };

//   const handlePresClick = (file, title, meta, tag) => {
//     setPresDetail({ title, meta, tag });
//     pushView('pres-detail');
//     addEvent('info', 'Presentation opened', title);
//   };

//   // Test API fetch from backend
//   useEffect(() => {
//     fetch('http://localhost:5000/api/status')
//       .then(res => res.json())
//       .then(data => console.log("Backend status:", data))
//       .catch(err => console.log("Backend not running yet", err));
//   }, []);

//   return (
//     <div className="app">
//       <div className="left" id="main-left">
//         {currentView === 'main' && (
//           <div id="view-main">
//             <TopRow onSearch={(q) => console.log('Searching', q)} />
//             {kpis && (
//               <KpiRow
//                 data={kpis}
//                 onDrillHeadcount={() => handleCommand('headcount')}
//                 onDrillAttrition={() => handleCommand('attrition')}
//                 onDrillPositions={() => handleCommand('positions')}
//                 onDrillTenure={() => {
//                   pushView('tenure');
//                   addEvent('detection', 'Tenure analysis opened', 'Distribution loaded');
//                 }}
//               />
//             )}
            
//             <div className="row2 fu fu2">
//               <BarChart 
//                 title="👥 Headcount by Department" 
//                 onViewAll={() => handleCommand('headcount')}
//                 data={barChartData}
//               />
//               <FunnelChart onDetails={() => handleCommand('hiring')} />
//             </div>

//             <div className="row2 fu fu3">
//               <QuickCommands onCommand={handleCommand} />
//               <TaskList onTaskComplete={handleTaskComplete} />
//             </div>

//             <MeetingList onDrillMeeting={handleDrillMeeting} />
            
//             <PresentationList 
//               onViewAll={() => {
//                 pushView('presentations');
//                 addEvent('activity', 'Presentation library opened', '5 documents listed');
//               }} 
//               onPresClick={handlePresClick} 
//             />
//           </div>
//         )}

//         {currentView === 'headcount' && <HeadcountDrill onBack={popView} />}
//         {currentView === 'attrition' && <AttritionDrill onBack={popView} />}
//         {currentView === 'positions' && <PositionsDrill onBack={popView} onToast={showToast} />}
//         {currentView === 'tenure' && <TenureDrill onBack={popView} />}
//         {currentView === 'hiring' && <HiringDrill onBack={popView} />}
//         {currentView === 'meeting' && <MeetingDrill title={meetingDetail} onBack={popView} onToast={showToast} />}
//         {currentView === 'presentations' && <PresentationsDrill onBack={popView} onPresClick={handlePresClick} onToast={showToast} />}
//         {currentView === 'pres-detail' && presDetail && (
//           <PresentationDetailDrill 
//             title={presDetail.title} 
//             meta={presDetail.meta} 
//             tag={presDetail.tag} 
//             onBack={popView} 
//             onToast={showToast} 
//           />
//         )}
//       </div>

//       <LiveFeed externalEvents={events} />
//       <Toast message={toast.message} visible={toast.visible} />
//     </div>
//   );
// }

// export default App;


// import EmployeeDashboard from './pages/EmployeeDashboard';
import Userdashboard from './pages/Userdashboard';

function App() {
  return <Userdashboard />;
}

export default App;