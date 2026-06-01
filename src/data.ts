import { Course, CourseCategory, DayOfWeek } from './types';

export const MOCK_COURSES: Course[] = [
    // 문화예술교과 - 전학년, 월 5,6 고정
    { id: 'art1', category: '문화예술교과', name: '바리스타 기초', times: [{day: '월', period: 5}, {day: '월', period: 6}], color: 'bg-rose-100 text-rose-700 border-rose-300 ring-rose-400', allowedGrades: [1, 2, 3] },
    { id: 'art2', category: '문화예술교과', name: '통기타 앙상블', times: [{day: '월', period: 5}, {day: '월', period: 6}], color: 'bg-rose-100 text-rose-700 border-rose-300 ring-rose-400', allowedGrades: [1, 2, 3] },
    
    // 돋움교과 - 1학년만, 목 3,4 고정
    { id: 'dodum1', category: '돋움교과', name: '심화 수학 탐구', times: [{day: '목', period: 3}, {day: '목', period: 4}], color: 'bg-sky-100 text-sky-700 border-sky-300 ring-sky-400', allowedGrades: [1] },
    { id: 'dodum2', category: '돋움교과', name: '기초 과학 실험', times: [{day: '목', period: 3}, {day: '목', period: 4}], color: 'bg-sky-100 text-sky-700 border-sky-300 ring-sky-400', allowedGrades: [1] },

    // 새김교과 - 2학년만, 화 1,2 / 목 1,2,3,4 고정
    { id: 'saegim1', category: '새김교과', name: '글로벌 영어 회화', times: [{day: '화', period: 1}, {day: '화', period: 2}], color: 'bg-emerald-100 text-emerald-700 border-emerald-300 ring-emerald-400', allowedGrades: [2] },
    { id: 'saegim2', category: '새김교과', name: '문학과 비판적 사고', times: [{day: '목', period: 1}, {day: '목', period: 2}, {day: '목', period: 3}, {day: '목', period: 4}], color: 'bg-emerald-100 text-emerald-700 border-emerald-300 ring-emerald-400', allowedGrades: [2] },
    
    // 디지프로랩 - 전학년, 목 5,6 고정
    { id: 'digi1', category: '디지프로랩', name: '파이썬 데이터분석', times: [{day: '목', period: 5}, {day: '목', period: 6}], color: 'bg-violet-100 text-violet-700 border-violet-300 ring-violet-400', allowedGrades: [1, 2, 3] },
    { id: 'digi2', category: '디지프로랩', name: '정보기술과 알고리즘', times: [{day: '목', period: 5}, {day: '목', period: 6}], color: 'bg-violet-100 text-violet-700 border-violet-300 ring-violet-400', allowedGrades: [1, 2, 3] },
];

export const CATEGORY_INFO: Record<CourseCategory, { title: string, color: string }> = {
    '문화예술교과': { title: '문화예술교과', color: 'text-rose-600' },
    '돋움교과': { title: '돋움교과', color: 'text-sky-600' },
    '새김교과': { title: '새김교과', color: 'text-emerald-600' },
    '디지프로랩': { title: '디지프로랩', color: 'text-violet-600' }
};

export const DAYS: DayOfWeek[] = ['월', '화', '수', '목', '금'];
export const PERIODS = [1, 2, 3, 4, 5, 6, 7];
