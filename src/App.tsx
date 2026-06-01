/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TimetableApp from './components/TimetableApp';
import GrowthRecordApp from './components/GrowthRecordApp';
import SyllabusApp from './components/SyllabusApp';
import EvaluationApp from './components/EvaluationApp';
import { ViewType } from './types';

function PlaceholderView({ title }: { title: string }) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 h-full flex flex-col items-center justify-center text-center">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 max-w-lg w-full">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚧</span>
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">{title}</h2>
                <p className="text-slate-500">현재 해당 기능을 준비 중입니다.</p>
            </div>
        </div>
    );
}

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'timetable': return <TimetableApp />;
      case 'growth': return <GrowthRecordApp />;
      case 'syllabus': return <SyllabusApp />;
      case 'evaluation': return <EvaluationApp />;
      case 'attendance': return <PlaceholderView title="출석 현황 관리" />;
      case 'portfolio': return <PlaceholderView title="배움장터(결과물) 관리" />;
      case 'meeting': return <PlaceholderView title="창체/모두모임 기록" />;
      case 'mentoring': return <PlaceholderView title="짝쌤 진로/학습 상담" />;
      case 'course_open': return <PlaceholderView title="과목 개설/교과 관리" />;
      case 'admin_users': return <PlaceholderView title="학교 교직원/학생 관리" />;
      case 'admin_spaces': return <PlaceholderView title="공간 예약 관리" />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans text-slate-900">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="flex-1 p-8 overflow-y-auto h-screen relative">
        {renderView()}
      </main>
    </div>
  );
}
