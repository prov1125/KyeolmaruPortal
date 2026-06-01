export type DayOfWeek = '월' | '화' | '수' | '목' | '금';

export interface CourseTime {
    day: DayOfWeek;
    period: number;
}

export type CourseCategory = '문화예술교과' | '돋움교과' | '새김교과' | '디지프로랩';

export interface Course {
    id: string;
    category: CourseCategory;
    name: string;
    times: CourseTime[];
    color: string;
    allowedGrades: number[];
}

export type ViewType = 
    | 'dashboard' 
    | 'timetable' 
    | 'attendance' 
    | 'syllabus'
    | 'portfolio'
    | 'evaluation'
    | 'growth'
    | 'meeting'
    | 'mentoring'
    | 'course_open'
    | 'admin_users'
    | 'admin_spaces';
