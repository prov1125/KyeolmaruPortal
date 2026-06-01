import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Download, UserCheck, PieChart } from 'lucide-react';
import { cn } from '../lib/utils';

const radarData = [
  { subject: '자기주도적 역량', A: 85, fullMark: 100 },
  { subject: '공동체 역량', A: 90, fullMark: 100 },
  { subject: '창의융합탐구역량', A: 75, fullMark: 100 },
  { subject: '정보문해역량', A: 88, fullMark: 100 },
  { subject: '글로벌 사회문화 역량', A: 82, fullMark: 100 },
];

export default function GrowthRecordApp() {
    const [activeTab, setActiveTab] = useState<'theme' | 'team' | 'personal'>('theme');

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-5xl mx-auto">
            <div className="bg-slate-800 text-white rounded-3xl p-8 mb-6 shadow-lg flex flex-col md:flex-row justify-between items-center">
                <div>
                    <div className="flex gap-2 mb-2">
                        <span className="bg-sky-500/20 text-sky-300 px-3 py-1 rounded-full text-xs font-bold border border-sky-500/30">
                            1학년 1학기 (2마디)
                        </span>
                    </div>
                    <h1 className="text-3xl font-extrabold mb-1">
                        김결마루 <span className="text-xl font-medium text-slate-300">성장기록부</span>
                    </h1>
                </div>
                <button className="mt-4 md:mt-0 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-colors cursor-pointer">
                    <Download className="w-5 h-5" /> 
                    PDF 다운로드
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                    <h2 className="text-sm font-bold text-slate-500 mb-4 flex items-center gap-2">
                        <UserCheck className="w-5 h-5" /> 
                        코칭 교사 종합 의견
                    </h2>
                    <p className="text-sm text-slate-700 leading-relaxed">
                        매사에 묵묵히 자신의 역할을 완수하며, 팀 갈등 상황에서 중립을 지키고 이성적으로 조율하는 튼튼한 기둥 역할을 함. 발표의 두려움을 극복하고자 동아리에 가입하는 등 성장 마인드셋이 매우 돋보임.
                    </p>
                </div>
                <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-sm font-bold text-slate-500 mb-4 flex items-center gap-2">
                            <PieChart className="w-5 h-5" /> 
                            결마루 5대 역량 성취도
                        </h2>
                        <p className="text-xs text-slate-500">
                            Firebase DB에서 누적된 학생의 평가 루브릭 점수를 차트로 렌더링합니다.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 h-48 relative -ml-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Student" dataKey="A" stroke="#0ea5e9" strokeWidth={2} fill="#bae6fd" fillOpacity={0.5} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 mb-6 bg-slate-200/50 p-1.5 rounded-2xl overflow-x-auto hidden-scrollbar">
                {(['theme', 'team', 'personal'] as const).map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)} 
                        className={cn(
                            "flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer",
                            activeTab === tab 
                                ? "bg-white shadow-sm text-slate-800" 
                                : "text-slate-500 hover:bg-slate-200/50"
                        )}
                    >
                        {tab === 'theme' ? '주제중심교과' : tab === 'team' ? '팀 프로젝트' : '개인 프로젝트'}
                    </button>
                ))}
            </div>

            <div className="min-h-[200px]">
                {activeTab === 'theme' && (
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
                        <h2 className="text-xl font-bold border-b pb-4">주제중심 (정치와 선거)</h2>
                        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
                            <h3 className="text-sm font-bold text-amber-800 mb-2">학생 성찰 기록 (Firebase 저장 데이터)</h3>
                            <p className="text-sm text-slate-700">사회 시간에서 정치를 바라보는 비판적인 사고를 기를 수 있었습니다. 보수와 진보를 명확하게 나누면 안 된다는 사실을 깨달았습니다.</p>
                        </div>
                        <div className="bg-sky-50 rounded-2xl p-5 border border-sky-100">
                            <h3 className="text-sm font-bold text-sky-800 mb-2">교사 피드백 (Firestore 연동 데이터)</h3>
                            <p className="text-sm text-slate-700"><strong>[사회 교사]</strong> 22대 총선을 활용하여 지역 후보자들을 분석하고, 확증 편향 등을 학습하며 생각과 관점이 크게 확장되었음.</p>
                        </div>
                    </div>
                )}
                {activeTab === 'team' && (
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <h2 className="text-xl font-bold">학생주도 팀 프로젝트 기록 영역</h2>
                        <p className="mt-2 text-slate-500">Firebase에서 프로젝트 산출물과 동료 평가 데이터를 불러옵니다.</p>
                    </div>
                )}
                {activeTab === 'personal' && (
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <h2 className="text-xl font-bold">개인 프로젝트 기록 영역</h2>
                        <p className="mt-2 text-slate-500">Firebase에서 개인 멘토 교사의 코칭 일지를 불러옵니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
