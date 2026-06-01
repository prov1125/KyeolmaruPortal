import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Download, UserCheck, PieChart, GraduationCap } from 'lucide-react';
import { cn } from '../lib/utils';

const radarData = [
  { subject: '자기주도적 역량', A: 85, fullMark: 100 },
  { subject: '공동체 역량', A: 90, fullMark: 100 },
  { subject: '창의융합탐구역량', A: 75, fullMark: 100 },
  { subject: '정보문해역량', A: 88, fullMark: 100 },
  { subject: '글로벌 사회문화 역량', A: 82, fullMark: 100 },
];

const GRADE_1_AREAS = [
    { id: 'theme', label: '주제중심교과' },
    { id: 'culture', label: '문화예술교과' },
    { id: 'dodum', label: '돋움교과' },
    { id: 'digipro', label: '디지프로랩' },
    { id: 'team', label: '팀 프로젝트' },
    { id: 'personal', label: '개인 프로젝트' },
];

const GRADE_1_THEME_SUBJECTS = ["국어", "영어", "과학", "정보", "음악", "진로"];

const GRADE_2_AREAS = [
    { id: 'theme', label: '주제중심교과' },
    { id: 'culture', label: '문화예술교과' },
    { id: 'saegim', label: '새김교과' },
    { id: 'digipro', label: '디지프로랩' },
    { id: 'career', label: '진로탐구 프로젝트' },
    { id: 'team', label: '팀 프로젝트' },
    { id: 'personal', label: '개인 프로젝트' },
];

const GRADE_2_THEME_SUBJECTS = ["국어", "음악", "미술", "체육"];

export default function GrowthRecordApp() {
    const [grade, setGrade] = useState<'1' | '2'>('1');
    const [activeTab, setActiveTab] = useState<string>('theme');

    const currentAreas = grade === '1' ? GRADE_1_AREAS : GRADE_2_AREAS;
    const currentThemeSubjects = grade === '1' ? GRADE_1_THEME_SUBJECTS : GRADE_2_THEME_SUBJECTS;

    // 학년 변경 시 탭 초기화
    const handleGradeChange = (newGrade: '1'|'2') => {
        setGrade(newGrade);
        setActiveTab('theme');
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-5xl mx-auto pb-10">
            <div className="bg-slate-800 text-white rounded-3xl p-8 mb-6 shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <div className="flex gap-2 mb-3">
                        <span className="bg-sky-500/20 text-sky-300 px-3 py-1 rounded-full text-xs font-bold border border-sky-500/30 flex items-center gap-1">
                            <GraduationCap className="w-4 h-4" />
                            학년 선택
                        </span>
                        <div className="flex bg-slate-700/50 p-0.5 rounded-full border border-slate-600">
                            <button 
                                onClick={() => handleGradeChange('1')}
                                className={cn("px-4 py-1 text-xs font-bold rounded-full transition-colors", grade === '1' ? "bg-sky-500 text-white" : "text-slate-300 hover:text-white")}
                            >
                                1학년
                            </button>
                            <button 
                                onClick={() => handleGradeChange('2')}
                                className={cn("px-4 py-1 text-xs font-bold rounded-full transition-colors", grade === '2' ? "bg-sky-500 text-white" : "text-slate-300 hover:text-white")}
                            >
                                2학년
                            </button>
                        </div>
                    </div>
                    <h1 className="text-3xl font-extrabold mb-1">
                        김결마루 <span className="text-xl font-medium text-slate-300">성장기록부</span>
                    </h1>
                </div>
                <button className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-colors cursor-pointer shrink-0">
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
                            학생의 다면평가 및 프로젝트를 통해 누적된 역량 점수입니다.
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
                {currentAreas.map(tab => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)} 
                        className={cn(
                            "py-2.5 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap",
                            activeTab === tab.id 
                                ? "bg-white shadow-sm text-slate-800" 
                                : "text-slate-500 hover:bg-slate-200/50"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="min-h-[200px]">
                {activeTab === 'theme' && (
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <h2 className="text-xl font-bold border-b pb-4 mb-6">주제중심교과 기록</h2>
                        
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-slate-500 mb-3">{grade}학년 주제중심 과목 목록</h3>
                            <div className="flex flex-wrap gap-2">
                                {currentThemeSubjects.map(sub => (
                                    <span key={sub} className="px-4 py-1.5 bg-slate-100 text-slate-700 font-semibold rounded-lg text-sm border border-slate-200">
                                        {sub}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                                <h3 className="text-sm font-bold text-amber-800 mb-2">학생 자기 성찰 (다면평가 데이터)</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    <strong>[{currentThemeSubjects[0]}]</strong> 수업에서 다양한 관점을 배우고 비판적인 사고를 기를 수 있었습니다. 
                                    특히 여러 의견을 수용하는 과정에서 어떻게 소통해야 하는지 배울 수 있었습니다.
                                </p>
                            </div>
                            <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100">
                                <h3 className="text-sm font-bold text-sky-800 mb-2">교사 관찰 피드백 (다면평가 데이터)</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    <strong>[{currentThemeSubjects[0]} 교사]</strong> 주어진 주제를 깊이 있게 분석하고, 
                                    확증 편향에 빠지지 않도록 노력하며 자신의 관점을 확장해가는 태도가 매우 훌륭함.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                
                {['culture', 'dodum', 'saegim', 'digipro', 'career'].includes(activeTab) && (
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <h2 className="text-xl font-bold border-b pb-4 mb-6">{currentAreas.find(a => a.id === activeTab)?.label} 기록</h2>
                        <div className="text-slate-500 bg-slate-50 rounded-2xl p-8 text-center border border-slate-100 italic">
                            선택한 교과 영역의 다면평가 및 프로젝트 성찰 기록이 여기에 표시됩니다.
                        </div>
                    </div>
                )}

                {activeTab === 'team' && (
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <h2 className="text-xl font-bold border-b pb-4 mb-6">학생주도 팀 프로젝트 기록</h2>
                        <p className="text-slate-500">프로젝트 산출물과 동료 평가 데이터에 기반한 성취도를 표시합니다.</p>
                    </div>
                )}
                
                {activeTab === 'personal' && (
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <h2 className="text-xl font-bold border-b pb-4 mb-6">개인 프로젝트 기록</h2>
                        <p className="text-slate-500">개별 멘토링 교사의 맞춤형 코칭 일지와 목표 달성 과정을 표시합니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
