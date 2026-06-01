import React from 'react';
import { Rocket } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 h-full flex flex-col items-center justify-center text-center">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 max-w-md">
                <Rocket className="w-16 h-16 text-emerald-500 mb-4 inline-block" />
                <h2 className="text-2xl font-bold text-slate-800 mb-2">환영합니다!</h2>
                <p className="text-slate-500 mb-6">
                    좌측 메뉴를 클릭하여 React와 Firebase 기반으로 구축될 시스템을 미리 체험해 보세요.
                </p>
                <div className="bg-slate-100 p-4 rounded-xl text-left text-sm text-slate-600">
                    <p className="font-semibold mb-2 border-b border-slate-200 pb-2">🚀 개발 착수 핵심 포인트</p>
                    <ul className="list-disc list-inside pl-2 space-y-1.5 mt-2">
                        <li>단일 페이지 애플리케이션(SPA) 뼈대 완성</li>
                        <li>각 컴포넌트(수강신청, 성장기록) 통합</li>
                        <li>Firestore 연동을 위한 함수 구조 설계</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
