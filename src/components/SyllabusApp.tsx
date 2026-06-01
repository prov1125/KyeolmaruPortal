import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { BookOpen, Target, CalendarDays, BarChart, CheckCircle2, Navigation, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function SyllabusApp() {
    const [activeTab, setActiveTab] = useState<'info' | 'plan' | 'rubric' | 'extra'>('info');

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-5xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-3xl p-8 mb-6 shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex gap-2 mb-3">
                        <span className="bg-sky-50 text-sky-600 px-3 py-1 rounded-md text-xs font-bold border border-sky-100">
                            2026학년도 1학기
                        </span>
                        <span className="bg-violet-50 text-violet-600 px-3 py-1 rounded-md text-xs font-bold border border-violet-100">
                            디지프로랩
                        </span>
                    </div>
                    <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                        [정보기술과 알고리즘]과 교수학습 및 평가 운영 계획
                    </h1>
                </div>
                <div className="text-right">
                    <p className="text-sm font-semibold text-slate-500">결마루미래학교</p>
                    <p className="text-xl font-bold text-slate-800">1학년 <span className="font-medium text-slate-400">| 2학점</span></p>
                    <p className="text-sm text-slate-600 mt-1">지도교사: <span className="font-semibold">김시윤</span></p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 bg-slate-200/50 p-1.5 rounded-2xl overflow-x-auto hidden-scrollbar">
                {[
                    { id: 'info', label: '과목 개요 및 목표', icon: Target },
                    { id: 'plan', label: '교수학습·평가 계획', icon: CalendarDays },
                    { id: 'rubric', label: '핵심역량 평가 루브릭', icon: BarChart },
                    { id: 'extra', label: '안전·디지털 교육', icon: ShieldCheck }
                ].map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)} 
                            className={cn(
                                "flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 min-w-max",
                                activeTab === tab.id 
                                    ? "bg-white shadow-sm text-slate-800" 
                                    : "text-slate-500 hover:bg-slate-200/50"
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    )
                })}
            </div>

            <div className="min-h-[400px]">
                {/* 1. 과목 개요 및 목표 */}
                {activeTab === 'info' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* 작성 원칙 Infobox */}
                        <div className="bg-slate-800 rounded-3xl p-6 text-white shadow-lg">
                            <h3 className="text-sm font-bold text-sky-400 mb-3 flex items-center gap-2">
                                <Navigation className="w-4 h-4" />
                                평가 및 기록 운영 철학 (작성 원칙)
                            </h3>
                            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-300 leading-relaxed marker:text-sky-400">
                                <li>단원명 대신 <strong className="text-white">학습경험(주제/프로젝트/모듈/활동)</strong>을 사용합니다.</li>
                                <li>지필/수행 구분 대신 <strong className="text-white">성장 증거(산출물, 과정, 참여/협업, 성찰 등)</strong>를 명시합니다.</li>
                                <li>평가 결과는 점수/등급이 아니라 <strong className="text-white">Pass/Fail 판단(또는 보류)과 서술 기록</strong>을 중심으로 남깁니다.</li>
                                <li>각 학습경험은 프로젝트 단계(탐색-정의-설계-제작-공유-성찰) 또는 마디 단위로 편성합니다.</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">1. 과목 성격</h2>
                            <p className="text-slate-700 leading-relaxed text-sm">
                                정보기술과 알고리즘은 결마루미래학교 1학년 일반교과 과정으로, 학생 개인의 관심사와 연계된 UN SDGs 의제를 탐구하고 이를 바탕으로 프로젝트를 수행하는 실천 중심의 과목이다. 교과서 중심의 지식 전달을 지양하고, 학생이 자신의 흥미 및 진로 키워드를 도출하여 AI(바이브 코딩)와 협력해 실생활의 문제를 해결하거나 자신의 가치관을 알리는 '웹 애플리케이션(데이터베이스 연동)'을 직접 설계하고 구현한다. 이 과정을 통해 학생은 프로그래밍 문법 암기가 아닌, 논리적 구조화 역량(프롬프트 엔지니어링), 프론트엔드와 백엔드 데이터의 흐름을 이해하는 정보 문해 역량, 그리고 시행착오(오류)를 극복하는 자기주도적 문제해결 역량을 기른다.
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">2. 과목 목표</h2>
                            <ul className="space-y-4">
                                {[
                                    "UN SDGs의 다양한 가치를 이해하고, 자신의 일상 및 진로 관심사와 연계하여 나만의 탐구 주제와 지표를 도출한다.",
                                    "AI와의 협력적 소통(프롬프트 작성)을 통해 자신의 철학과 아이디어를 웹의 구조로 기획하고 구현할 수 있다.",
                                    "관심 분야의 데이터를 지속적으로 수집·관리하기 위한 데이터베이스 구조를 설계하고, 동적 웹 애플리케이션을 완성한다.",
                                    "프로젝트 수행 중 발생하는 오류(버그)를 분석 및 해결(디버깅)하고, 동료와의 피드백을 통해 결과물을 개선하는 태도를 기른다."
                                ].map((goal, idx) => (
                                    <li key={idx} className="flex gap-4 items-start">
                                        <div className="w-6 h-6 shrink-0 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold mt-0.5">
                                            {idx + 1}
                                        </div>
                                        <p className="text-slate-700 text-sm leading-relaxed">{goal}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* 2. 교수학습 평가 계획 */}
                {activeTab === 'plan' && (
                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="p-8 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-900">정보기술과 알고리즘 교수학습-평가 계획 및 방법</h2>
                        </div>
                        <div className="overflow-x-auto p-4">
                            <table className="w-full text-sm text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-slate-50 text-slate-600 font-bold border-y border-slate-200">
                                        <th className="p-4 w-48">학습경험 (주제명)</th>
                                        <th className="p-4 w-20 text-center">시기/시수</th>
                                        <th className="p-4 w-48">평가 요소</th>
                                        <th className="p-4">주요학습활동 (수업 흐름)</th>
                                        <th className="p-4 w-28">평가방법</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-slate-100">
                                        <td className="p-4">
                                            <p className="font-bold text-slate-800">나의 관심사와 가치가 담긴 웹사이트 구축</p>
                                            <p className="text-xs text-slate-500 mt-1">(나를 코딩하다)</p>
                                        </td>
                                        <td className="p-4 text-center">
                                            <p className="font-semibold text-slate-700">1~9주</p>
                                            <p className="text-xs text-slate-500">16시수</p>
                                        </td>
                                        <td className="p-4 text-slate-600 space-y-1 text-xs">
                                            <p>• 자기 이해 및 콘텐츠 기획력</p>
                                            <p>• AI 활용 프롬프트 설계 능력</p>
                                            <p>• 자연어 알고리즘 표현 능력</p>
                                            <p>• 오류 해결 능력</p>
                                        </td>
                                        <td className="p-4 text-slate-600 leading-relaxed">
                                            탐색/설계(와이어프레임 스케치) - 제작(AI 대화 기반 HTML/CSS 작성 및 디자인 요소 추가) - 디버깅(오류 원인 분석 및 UX 다듬기) - 공유/성찰
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-block px-2 py-1 bg-sky-50 text-sky-700 rounded text-xs font-semibold mb-1 w-full text-center">실습과정평가</span>
                                            <span className="inline-block px-2 py-1 bg-violet-50 text-violet-700 rounded text-xs font-semibold mb-1 w-full text-center">자기평가</span>
                                            <span className="inline-block px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-semibold w-full text-center">동료평가</span>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="p-4">
                                            <p className="font-bold text-slate-800">나의 관심사 아카이빙 DB 웹앱 구축 및 연동</p>
                                            <p className="text-xs text-slate-500 mt-1">(나를 기록하다)</p>
                                        </td>
                                        <td className="p-4 text-center">
                                            <p className="font-semibold text-slate-700">10~17주</p>
                                            <p className="text-xs text-slate-500">18시수</p>
                                        </td>
                                        <td className="p-4 text-slate-600 space-y-1 text-xs">
                                            <p>• DB 구조 논리적 설계 능력</p>
                                            <p>• 프론트엔드·백엔드 연동 능력</p>
                                            <p>• 데이터 유효성 검사/QA</p>
                                        </td>
                                        <td className="p-4 text-slate-600 leading-relaxed">
                                            탐색/기획(DB 지표 선정 및 구조 설계) - 설계/제작(입력 폼 제작 및 DB 연동) - 고도화(유효성 검사 및 무한 QA) - 공유/성찰(베타테스트)
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-block px-2 py-1 bg-sky-50 text-sky-700 rounded text-xs font-semibold mb-1 w-full text-center">실습과정평가</span>
                                            <span className="inline-block px-2 py-1 bg-violet-50 text-violet-700 rounded text-xs font-semibold mb-1 w-full text-center">자기평가</span>
                                            <span className="inline-block px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-semibold w-full text-center">동료평가</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* 3. 평가 루브릭 */}
                {activeTab === 'rubric' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                            <div className="bg-slate-50 p-6 border-b border-slate-100">
                                <h2 className="text-lg font-bold text-slate-900 inline-flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                    프로젝트 1: 웹사이트(정기적 웹사이트) 기획 및 제작
                                </h2>
                                <p className="text-xs font-semibold text-slate-400 mt-2">* 채점기준 B이상 성취 인정, 결과, 불성실한 수업 참여 등은 C</p>
                            </div>
                            <div className="overflow-x-auto p-4">
                                <table className="w-full text-sm text-left border-collapse min-w-[700px]">
                                    <thead>
                                        <tr className="text-center font-bold text-slate-700 border-b-2 border-slate-200">
                                            <th className="p-4 w-36">교과역량</th>
                                            <th className="p-4 bg-emerald-50/50 w-1/3 text-emerald-800">A (우수)</th>
                                            <th className="p-4 bg-sky-50/50 w-1/3 text-sky-800">B (기본)</th>
                                            <th className="p-4 bg-rose-50/50 w-1/3 text-rose-800">C (보완)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr>
                                            <td className="p-4 text-center font-bold text-slate-800 bg-slate-50/50">자기주도적 역량</td>
                                            <td className="p-4 text-slate-600 leading-relaxed hover:bg-emerald-50/30 transition-colors">자신의 '건강한 삶' 키워드를 명확히 정의하고, 기술적 한계에 부딪혔을 때 스스로 해결책을 찾아 책임감 있게 웹사이트를 완성함.</td>
                                            <td className="p-4 text-slate-600 leading-relaxed hover:bg-sky-50/30 transition-colors">가이드에 맞추어 와이어프레임 스케치 및 제작 절차에 성실히 참여하며, 기한 내에 웹사이트를 완성함.</td>
                                            <td className="p-4 text-slate-600 leading-relaxed hover:bg-rose-50/30 transition-colors">자기 관리 및 추진력이 부족하여 타인의 도움에 크게 의존하거나, 실천적 단계에서 책임을 다하지 못함.</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 text-center font-bold text-slate-800 bg-slate-50/50">정보문해 역량</td>
                                            <td className="p-4 text-slate-600 leading-relaxed hover:bg-emerald-50/30 transition-colors">AI에게 구체적인 조건과 맥락을 부여한 프롬프트를 작성하며, 화면이 깨지거나 오류가 날 경우 AI와 함께 원인을 정확히 분석(디버깅)함.</td>
                                            <td className="p-4 text-slate-600 leading-relaxed hover:bg-sky-50/30 transition-colors">AI가 생성한 HTML/CSS 뼈대 코드를 이해하여 프로젝트에 반영하고, 기본적인 인터랙션 요소를 구현함.</td>
                                            <td className="p-4 text-slate-600 leading-relaxed hover:bg-rose-50/30 transition-colors">AI 생성 결과물에 대한 비판적 판단이 없거나 지시가 불명확하여, 웹사이트 뼈대 코드를 제대로 구현하지 못함.</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 text-center font-bold text-slate-800 bg-slate-50/50">창의융합 탐구역량</td>
                                            <td className="p-4 text-slate-600 leading-relaxed hover:bg-emerald-50/30 transition-colors">자신의 가치관을 창의적 UI/UX(색상, 폰트 등)와 결합하고, 가상의 페르소나를 세심하게 배려한 우수한 결과물을 창출함.</td>
                                            <td className="p-4 text-slate-600 leading-relaxed hover:bg-sky-50/30 transition-colors">자신의 관심사를 웹사이트의 주제로 설정하고, 배운 바이브 코딩 기법을 적용하여 내 생각이 담긴 결과물을 제작함.</td>
                                            <td className="p-4 text-slate-600 leading-relaxed hover:bg-rose-50/30 transition-colors">기존 웹사이트 사례를 단순 복제하거나, 건강한 삶이라는 콘텐츠와 웹 기술이 유의미하게 결합되지 않음.</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 text-center font-bold text-slate-800 bg-slate-50/50">글로벌 사회문화 역량</td>
                                            <td className="p-4 text-slate-600 leading-relaxed hover:bg-emerald-50/30 transition-colors">자신의 웰빙을 인류 보편적 지속가능성과 연결하여 깊이 있게 성찰하고, 방문하는 모두를 포용하고 배려하는 따뜻한 콘텐츠를 훌륭하게 구현함.</td>
                                            <td className="p-4 text-slate-600 leading-relaxed hover:bg-sky-50/30 transition-colors">보편적인 건강한 삶의 가치를 이해하고, 타인을 존중하는 기본적인 태도를 웹사이트 콘텐츠와 디자인에 반영함.</td>
                                            <td className="p-4 text-slate-600 leading-relaxed hover:bg-rose-50/30 transition-colors">웰빙의 의미를 협소하게 이해하거나 사회적 연결성을 인식하지 못하며, 다양성을 존중하고 포용하는 콘텐츠 구성이 미흡함.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                            <div className="bg-slate-50 p-6 border-b border-slate-100">
                                <h2 className="text-lg font-bold text-slate-900 inline-flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-sky-500" />
                                    프로젝트 2: 건강한 생활 데이터베이스가 연동된 동적 웹 앱
                                </h2>
                            </div>
                            <div className="overflow-x-auto p-4">
                                <table className="w-full text-sm text-left border-collapse min-w-[700px]">
                                    <thead>
                                        <tr className="text-center font-bold text-slate-700 border-b-2 border-slate-200">
                                            <th className="p-4 w-36">교과역량</th>
                                            <th className="p-4 bg-emerald-50/50 w-1/3 text-emerald-800">A (우수)</th>
                                            <th className="p-4 bg-sky-50/50 w-1/3 text-sky-800">B (기본)</th>
                                            <th className="p-4 bg-rose-50/50 w-1/3 text-rose-800">C (보완)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr>
                                            <td className="p-4 text-center font-bold text-slate-800 bg-slate-50/50">자기주도적 역량</td>
                                            <td className="p-4 text-slate-600 leading-relaxed">에러 메시지를 AI에게 정확히 전달하여 주도적으로 해결책을 찾고(무한 QA), 전 과정을 관통하는 종합 성찰을 깊이 있게 수행함.</td>
                                            <td className="p-4 text-slate-600 leading-relaxed">가이드에 따라 기한 내에 산출물을 완성하며, 발생한 오류를 교사나 동료의 도움을 받아 수정함.</td>
                                            <td className="p-4 text-slate-600 leading-relaxed">에러 발생 시 끈기 있게 해결하려 하지 않고 코드를 완성하지 못하거나, 성찰 질문에 대한 답을 회피함.</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 text-center font-bold text-slate-800 bg-slate-50/50">정보문해 역량</td>
                                            <td className="p-4 text-slate-600 leading-relaxed">적절한 입력 폼을 선택하여 UI를 설계하고, 백엔드 연동뿐만 아니라 데이터 유효성 검사까지 방어적 코딩을 구현함.</td>
                                            <td className="p-4 text-slate-600 leading-relaxed">AI를 활용하여 입력 폼 코드를 작성하고, 웹 앱을 배포하여 기본적으로 데이터가 백엔드에 전송되는 기능을 구현함.</td>
                                            <td className="p-4 text-slate-600 leading-relaxed">웹과 DB의 논리적 연결 구조를 구축하지 못하여, 데이터 저장 기능(전송)을 성공적으로 구현하지 못함.</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 text-center font-bold text-slate-800 bg-slate-50/50">공동체 역량</td>
                                            <td className="p-4 text-slate-600 leading-relaxed">동료 베타 테스트에 주도적으로 참여하여 풍부한 데이터를 제공하고, 발견한 아이디어를 공유하여 공동체의 성장에 실질적으로 기여함.</td>
                                            <td className="p-4 text-slate-600 leading-relaxed">동료 베타 테스트 및 데이터 입력 활동에 필수적인 범위 내에서 참여하고 의견을 나눔.</td>
                                            <td className="p-4 text-slate-600 leading-relaxed">베타 테스트 활동에 대한 참여가 저조하고 데이터 입력이 부실하며, 협력적 문제 해결에 기여하지 않음.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. 안전 및 기타 교육 */}
                {activeTab === 'extra' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-amber-500" />
                                안전 교육 계획 (3시간)
                            </h2>
                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 rounded-2xl">
                                    <h3 className="font-bold text-slate-800 mb-1">약물 및 사이버중독 예방 (사이버 중독 예방교육)</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        건강한 생활 데이터베이스 기록 프로젝트와 연계하여, 
                                        디지털 기기 의존도를 낮추고 실제 삶의 질을 높이는 건강 습관들을 체계적인 데이터베이스로 구축하며 관리합니다.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                디지털 역량 교육 계획 (34시간)
                            </h2>
                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 rounded-2xl">
                                    <h3 className="font-bold text-slate-800 mb-1">노트북 활용 수업 (34시간)</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-3">AI를 활용한 프롬프트 엔지니어링 및 나만의 웹 앱 개발 프로젝트 진행.</p>

                                    <h3 className="font-bold text-slate-800 mb-1">디지털 과의존 예방교육 (2시간 / 실습 포함)</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">AI 기술의 안전한 활용과 디지털 발자국에 대해 이해하고, AI 활용 시 나만의 보안 가이드라인 만들기.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
