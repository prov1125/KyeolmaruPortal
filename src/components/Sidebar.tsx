import React from 'react';
import { ViewType } from '../types';
import { 
    LayoutDashboard, 
    CalendarPlus, 
    CalendarCheck,
    ScrollText,
    FolderOpen,
    MessageSquareShare,
    BookOpen,
    Users,
    HeartHandshake,
    LibraryBig,
    UsersRound,
    Map
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
    currentView: ViewType;
    setCurrentView: (view: ViewType) => void;
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
    const menus = [
        {
            title: "내 배움 설계",
            items: [
                { id: 'dashboard' as const, label: '대시보드', icon: LayoutDashboard },
                { id: 'timetable' as const, label: '마디 수강신청', icon: CalendarPlus },
                { id: 'attendance' as const, label: '출석 현황', icon: CalendarCheck },
            ]
        },
        {
            title: "학습 및 성장 기록",
            items: [
                { id: 'syllabus' as const, label: '학습 계획서(루브릭)', icon: ScrollText },
                { id: 'portfolio' as const, label: '배움장터 (결과물)', icon: FolderOpen },
                { id: 'evaluation' as const, label: '성장나눔 다면평가', icon: MessageSquareShare },
                { id: 'growth' as const, label: '성장기록부 (성적/역량)', icon: BookOpen },
            ]
        },
        {
            title: "학교 생활 및 상담",
            items: [
                { id: 'meeting' as const, label: '창체/모두모임', icon: Users },
                { id: 'mentoring' as const, label: '짝쌤 진로/학습 상담', icon: HeartHandshake },
            ]
        },
        {
            title: "시스템 관리 (교사/관리자)",
            items: [
                { id: 'course_open' as const, label: '과목 개설/교과 관리', icon: LibraryBig },
                { id: 'admin_users' as const, label: '학교 교사/학생 관리', icon: UsersRound },
                { id: 'admin_spaces' as const, label: '공간 예약 관리', icon: Map },
            ]
        }
    ];

    return (
        <nav className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-white text-lg font-bold tracking-wider">
                    결마루<span className="text-emerald-400">포털</span>
                </h1>
            </div>
            
            <div className="flex-1 py-6 px-4 space-y-6 overflow-y-auto hidden-scrollbar">
                {menus.map((group, idx) => (
                    <div key={idx} className="space-y-1">
                        <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                            {group.title}
                        </p>
                        {group.items.map(item => {
                            const Icon = item.icon;
                            const isActive = currentView === item.id;
                            return (
                                <button 
                                    key={item.id}
                                    onClick={() => setCurrentView(item.id)} 
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all cursor-pointer text-sm",
                                        isActive 
                                            ? "bg-emerald-500 text-white shadow-md font-medium" 
                                            : "hover:bg-slate-800 hover:text-white"
                                    )}
                                >
                                    <Icon className={cn("w-4 h-4", isActive ? "text-emerald-100" : "text-slate-400")} />
                                    {item.label}
                                </button>
                            )
                        })}
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30">
                        결
                    </div>
                    <div>
                        <p className="text-white text-sm font-semibold">김결마루 학생</p>
                        <p className="text-xs text-slate-400 text-left">Firebase Auth 연동예정</p>
                    </div>
                </div>
            </div>
        </nav>
    );
}
