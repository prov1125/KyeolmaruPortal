import React, { useState, useRef } from 'react';
import { 
    User, 
    BookOpen, 
    UploadCloud, 
    Award, 
    CheckCircle2, 
    MessageSquare, 
    FileText, 
    Send,
    Users
} from 'lucide-react';
import { cn } from '../lib/utils';

type Role = 'student' | 'teacher';

const COURSES = [
    "정보기술과 알고리즘 (알고리즘 설계)",
    "기후위기와 행동하는 시민",
    "철학과 삶의 윤리"
];

const STUDENTS = [
    { id: 1, name: "김결마루", grade: "1학년" },
    { id: 2, name: "이빛나", grade: "1학년" },
    { id: 3, name: "박슬기", grade: "2학년" },
];

const COMPETENCIES = [
    "자기주도적 역량",
    "정보문해 역량",
    "창의융합 탐구역량",
    "글로벌 사회문화 역량",
    "공동체 역량"
];

export default function EvaluationApp() {
    const [role, setRole] = useState<Role>('student');
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Student State
    const [studentCourse, setStudentCourse] = useState(COURSES[0]);
    const [selfEval, setSelfEval] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Teacher State
    const [teacherCourse, setTeacherCourse] = useState(COURSES[0]);
    const [selectedStudent, setSelectedStudent] = useState(STUDENTS[0]);
    const [observationFeedback, setObservationFeedback] = useState("");
    const [scores, setScores] = useState<Record<string, number>>(
        COMPETENCIES.reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {})
    );

    const triggerToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0]);
        }
    };

    const submitStudentEval = () => {
        if (!selfEval.trim()) {
            triggerToast("자기 평가 내용을 입력해주세요.");
            return;
        }
        triggerToast("자기 평가 및 과제물이 성공적으로 제출되었습니다.");
        setSelfEval("");
        setUploadedFile(null);
    };

    const submitTeacherEval = () => {
        if (!observationFeedback.trim()) {
            triggerToast("관찰 평가(피드백) 내용을 입력해주세요.");
            return;
        }
        triggerToast(`${selectedStudent.name} 학생의 관찰 평가 및 역량 점수가 저장되었습니다.`);
        setObservationFeedback("");
        // Reset scores
        setScores(COMPETENCIES.reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {}));
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-5xl mx-auto pb-10">
            {/* Toast */}
            {toastMessage && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
                    <div className="bg-slate-900 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl border border-slate-800">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span className="font-semibold text-sm">{toastMessage}</span>
                    </div>
                </div>
            )}

            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
                        <Award className="w-7 h-7 text-emerald-600" />
                        성장나눔 다면평가
                    </h1>
                    <p className="text-slate-500 mt-1 text-sm font-medium">
                        학생의 자기 성찰과 교사의 다면적 관찰 피드백을 기록합니다.
                    </p>
                </div>
                
                {/* Role Switcher (Mock) */}
                <div className="flex bg-slate-200 p-1 rounded-xl">
                    <button
                        onClick={() => setRole('student')}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 cursor-pointer",
                            role === 'student' ? "bg-white shadow-sm text-emerald-700" : "text-slate-500 hover:text-slate-800"
                        )}
                    >
                        <User className="w-4 h-4" /> 학생 모드
                    </button>
                    <button
                        onClick={() => setRole('teacher')}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 cursor-pointer",
                            role === 'teacher' ? "bg-white shadow-sm text-indigo-700" : "text-slate-500 hover:text-slate-800"
                        )}
                    >
                        <BookOpen className="w-4 h-4" /> 교사 모드
                    </button>
                </div>
            </div>

            {role === 'student' ? (
                /* ----------------- STUDENT VIEW ----------------- */
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                            <MessageSquare className="w-5 h-5 text-emerald-500" />
                            나의 자기 평가 및 과제 제출
                        </h2>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">교과목 선택</label>
                                <select 
                                    value={studentCourse}
                                    onChange={(e) => setStudentCourse(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-semibold"
                                >
                                    {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">자기 평가 (성찰)</label>
                                <textarea
                                    rows={6}
                                    placeholder="이번 과목의 학습 목표를 어떻게 달성했는지, 성취한 점과 아쉬웠던 점을 자세히 적어보세요."
                                    value={selfEval}
                                    onChange={(e) => setSelfEval(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">산출물(과제) 파일 업로드</label>
                                <div 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/50 transition-all flex flex-col items-center justify-center gap-2"
                                >
                                    <input 
                                        type="file" 
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden" 
                                    />
                                    <UploadCloud className="w-8 h-8 text-slate-400" />
                                    {uploadedFile ? (
                                        <p className="text-emerald-700 font-bold text-sm flex items-center gap-2">
                                            <FileText className="w-4 h-4" />
                                            {uploadedFile.name}
                                        </p>
                                    ) : (
                                        <>
                                            <p className="text-sm font-bold text-slate-700">여기를 클릭하여 과제 파일을 선택하세요.</p>
                                            <p className="text-xs text-slate-400">PDF, ZIP, 이미지 파일 등</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            
                            <div className="pt-2">
                                <button 
                                    onClick={submitStudentEval}
                                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <Send className="w-4 h-4" />
                                    자기 평가 및 과제 제출하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* ----------------- TEACHER VIEW ----------------- */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                            <h2 className="text-md font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-indigo-500" />
                                평가 설정
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">담당 교과목</label>
                                    <select 
                                        value={teacherCourse}
                                        onChange={(e) => setTeacherCourse(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-sm outline-none focus:border-indigo-500 font-semibold"
                                    >
                                        {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">평가 대상 학생</label>
                                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                                        {STUDENTS.map(student => (
                                            <div 
                                                key={student.id} 
                                                onClick={() => setSelectedStudent(student)}
                                                className={cn(
                                                    "p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all",
                                                    selectedStudent.id === student.id 
                                                        ? "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500" 
                                                        : "border-slate-200 bg-white hover:bg-slate-50"
                                                )}
                                            >
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-800">{student.name}</span>
                                                    <span className="text-[10px] text-slate-500">{student.grade}</span>
                                                </div>
                                                <Users className={cn("w-4 h-4", selectedStudent.id === student.id ? "text-indigo-600" : "text-slate-300")} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                            <div className="mb-6 border-b border-slate-100 pb-4">
                                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-indigo-500" />
                                    관찰 평가 작성
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">
                                    <strong className="text-indigo-600">{selectedStudent.name}</strong> 학생의 종합 관찰 의견 및 핵심 역량 수준을 입력합니다.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">종합 관찰 내용 (피드백)</label>
                                    <textarea
                                        rows={5}
                                        placeholder="학생의 프로젝트 수행 과정, 문제 해결 태도, 그리고 성취도에 대한 정성적 피드백을 기록해 주세요."
                                        value={observationFeedback}
                                        onChange={(e) => setObservationFeedback(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-4">5대 핵심 역량 평가 (0~100점)</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                        {COMPETENCIES.map(comp => (
                                            <div key={comp} className="flex flex-col gap-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="font-semibold text-slate-700">{comp}</span>
                                                    <span className="font-bold text-indigo-600">{scores[comp]}</span>
                                                </div>
                                                <input 
                                                    type="range" 
                                                    min="0" 
                                                    max="100" 
                                                    step="5"
                                                    value={scores[comp]}
                                                    onChange={(e) => setScores(prev => ({ ...prev, [comp]: parseInt(e.target.value) }))}
                                                    className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex justify-end">
                                    <button 
                                        onClick={submitTeacherEval}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <Send className="w-4 h-4" />
                                        평가 저장 및 공유
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
