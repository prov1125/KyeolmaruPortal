import React, { useState } from 'react';
import { Course, CourseCategory, DayOfWeek } from '../types';
import { MOCK_COURSES, CATEGORY_INFO, DAYS, PERIODS } from '../data';
import { cn } from '../lib/utils';
import { 
    CheckCircle2, 
    Plus, 
    AlertCircle, 
    Calendar, 
    Save,
    Palette,
    BookOpen,
    Leaf,
    Monitor
} from 'lucide-react';

const icons: Record<CourseCategory, React.ElementType> = {
    '문화예술교과': Palette,
    '돋움교과': BookOpen,
    '새김교과': Leaf,
    '디지프로랩': Monitor
};

export default function TimetableApp() {
    const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    const showToast = (message: string, type = 'error') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
    };

    const handleCourseClick = (course: Course) => {
        if (selectedCourses.some(c => c.id === course.id)) {
            setSelectedCourses(selectedCourses.filter(c => c.id !== course.id));
            return;
        }
        
        let conflict = false;
        let conflictName = '';
        
        course.times.forEach(newTime => {
            selectedCourses.forEach(selected => {
                selected.times.forEach(selectedTime => {
                    if (newTime.day === selectedTime.day && newTime.period === selectedTime.period) {
                        conflict = true; 
                        conflictName = selected.name;
                    }
                });
            });
        });
        
        if (conflict) {
            showToast(`[시간 중복] 이미 '${conflictName}' 과목이 있습니다.`);
            return;
        }
        
        setSelectedCourses([...selectedCourses, course]);
    };

    const handleSaveTimetable = async () => {
        showToast('DB에 수강신청 내역이 저장되었습니다!', 'success');
        // Firebase integration goes here later
    };

    const getCourseForSlot = (day: DayOfWeek, period: number) => {
        return selectedCourses.find(c => c.times.some(t => t.day === day && t.period === period));
    };

    const renderCourseList = (category: CourseCategory) => {
        const info = CATEGORY_INFO[category];
        const courses = MOCK_COURSES.filter(c => c.category === category);
        const Icon = icons[category];
        const CURRENT_GRADE = 1; // 1학년 학생으로 가정

        return (
            <div key={category} className="mb-6">
                <h3 className={cn("text-sm font-bold flex items-center gap-2 mb-3", info.color)}>
                    <Icon className="w-4 h-4" /> 
                    {info.title}
                </h3>
                <div className="flex flex-col gap-2">
                    {courses.map(course => {
                        const isSelected = selectedCourses.some(c => c.id === course.id);
                        const isAllowed = course.allowedGrades.includes(CURRENT_GRADE);

                        return (
                            <button 
                                key={course.id} 
                                onClick={() => isAllowed && handleCourseClick(course)}
                                disabled={!isAllowed}
                                className={cn(
                                    "text-left p-3 rounded-xl border transition-all duration-200 flex justify-between items-center group relative overflow-hidden",
                                    isSelected 
                                        ? `${course.color} shadow-sm ring-2 ring-offset-1` 
                                        : isAllowed
                                            ? "bg-white border-slate-200 hover:border-slate-400 hover:shadow-md"
                                            : "bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed grayscale-[50%]"
                                )}
                            >
                                <div className="flex-1">
                                    <p className={cn("font-semibold flex items-center gap-2", !isSelected && "text-slate-800")}>
                                        {course.name}
                                        {!isAllowed && (
                                            <span className="inline-block px-1.5 py-0.5 bg-slate-200/80 text-slate-600 rounded text-[10px] font-bold">
                                                {course.allowedGrades.join(',')}학년 전용
                                            </span>
                                        )}
                                    </p>
                                    <p className={cn("text-xs mt-1", isSelected ? "opacity-80" : "text-slate-500")}>
                                        {course.times.map(t => `${t.day}${t.period}`).join(', ')}교시
                                    </p>
                                </div>
                                <div>
                                    {isSelected 
                                        ? <CheckCircle2 className="w-5 h-5" /> 
                                        : isAllowed 
                                            ? <Plus className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                                            : <div />
                                    }
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col xl:flex-row gap-6">
            {toast.show && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
                    <div className={cn(
                        "px-6 py-3 rounded-full shadow-lg flex items-center gap-3 animate-bounce",
                        toast.type === 'success' ? "bg-emerald-600 text-white" : "bg-slate-800 text-white"
                    )}>
                        {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <span className="font-medium">{toast.message}</span>
                    </div>
                </div>
            )}
            
            <div className="w-full xl:w-1/3 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 h-[calc(100vh-8rem)] overflow-y-auto hidden-scrollbar">
                <h2 className="text-xl font-bold mb-4">개설 과목 목록</h2>
                {(Object.keys(CATEGORY_INFO) as CourseCategory[]).map(category => renderCourseList(category))}
            </div>
            
            <div className="w-full xl:w-2/3 bg-white rounded-3xl shadow-sm border border-slate-200 p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-slate-400" />
                        나의 시간표
                    </h2>
                    <span className="bg-slate-100 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700">
                        선택: {selectedCourses.length}과목
                    </span>
                </div>
                
                <div className="flex-1 overflow-x-auto">
                    <table className="w-full min-w-[500px] border-collapse h-full">
                        <thead>
                            <tr>
                                <th className="w-12 pb-3"></th>
                                {DAYS.map(day => (
                                    <th key={day} className="border-b-2 border-slate-200 pb-3 text-slate-500 font-semibold">{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {PERIODS.map(period => (
                                <tr key={period}>
                                    <td className="text-center py-4 border-b border-slate-100 text-slate-400 font-medium text-sm">
                                        {period}
                                    </td>
                                    {DAYS.map(day => {
                                        const course = getCourseForSlot(day, period);
                                        return (
                                            <td key={`${day}-${period}`} className="border border-slate-100 p-1 h-16 w-32">
                                                {course ? (
                                                    <div className={cn("h-full w-full rounded-xl p-2 flex flex-col justify-center items-center text-center shadow-sm border", course.color)}>
                                                        <span className="font-semibold text-xs leading-tight">
                                                            {course.name}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="w-full h-full rounded-xl bg-slate-50/50 border border-dashed border-transparent hover:border-slate-300 transition-colors" />
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="mt-6 flex justify-end">
                    <button 
                        onClick={handleSaveTimetable} 
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
                    >
                        <Save className="w-5 h-5" />
                        수강신청 완료하기
                    </button>
                </div>
            </div>
        </div>
    );
}
