import { Course, CourseCategory, DayOfWeek } from './types';

export const MOCK_COURSES: Course[] = [
    { id: 'art1', category: '문화예술교과', name: '바리스타 기초', times: [{day: '월', period: 5}, {day: '월', period: 6}], color: 'bg-rose-100 text-rose-700 border-rose-300 ring-rose-400' },
    { id: 'art2', category: '문화예술교과', name: '통기타 앙상블', times: [{day: '월', period: 5}, {day: '월', period: 6}], color: 'bg-rose-100 text-rose-700 border-rose-300 ring-rose-400' },
    { id: 'dodum1', category: '돋움교과', name: '심화 수학 탐구', times: [{day: '화', period: 2}, {day: '화', period: 3}], color: 'bg-sky-100 text-sky-700 border-sky-300 ring-sky-400' },
    { id: 'saegim1', category: '새김교과', name: '글로벌 영어 회화', times: [{day: '화', period: 5}, {day: '화', period: 6}], color: 'bg-emerald-100 text-emerald-700 border-emerald-300 ring-emerald-400' },
    { id: 'digi1', category: '디지프로랩', name: '파이썬 데이터분석', times: [{day: '금', period: 2}, {day: '금', period: 3}], color: 'bg-violet-100 text-violet-700 border-violet-300 ring-violet-400' },
];

export const CATEGORY_INFO: Record<CourseCategory, { title: string, color: string }> = {
    '문화예술교과': { title: '문화예술교과', color: 'text-rose-600' },
    '돋움교과': { title: '돋움교과', color: 'text-sky-600' },
    '새김교과': { title: '새김교과', color: 'text-emerald-600' },
    '디지프로랩': { title: '디지프로랩', color: 'text-violet-600' }
};

export const DAYS: DayOfWeek[] = ['월', '화', '수', '목', '금'];
export const PERIODS = [1, 2, 3, 4, 5, 6, 7];
