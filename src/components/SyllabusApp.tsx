import React, { useState, useRef } from 'react';
import { cn } from '../lib/utils';
import { 
    BookOpen, 
    Target, 
    CalendarDays, 
    BarChart, 
    CheckCircle2, 
    Navigation, 
    AlertTriangle, 
    ShieldCheck,
    UploadCloud,
    FileText,
    Copy,
    Check,
    Sparkles,
    RefreshCw,
    Info,
    HelpCircle,
    Loader2
} from 'lucide-react';

interface PlanItem {
    title: string;
    sub?: string;
    weeks: string;
    hours: string;
    elements: string[];
    activities: string;
    methods: string[];
}

interface RubricItem {
    capability: string;
    a: string;
    b: string;
    c: string;
}

interface RubricGroup {
    title: string;
    criteriaList: RubricItem[];
}

interface SyllabusData {
    semester: string;
    category: string;
    subjectName: string;
    grade: string;
    credits: string;
    teacher: string;
    description: string;
    goals: string[];
    plans: PlanItem[];
    rubrics: RubricGroup[];
    safety: { title: string; desc: string }[];
    digital: { title: string; desc: string; hours: string }[];
}

const DEFAULT_SYLLABUS: SyllabusData = {
    semester: "2026학년도 1학기",
    category: "디지프로랩",
    subjectName: "정보기술과 알고리즘 (알고리즘 설계)",
    grade: "1학년",
    credits: "2학점",
    teacher: "김시윤",
    description: "정보기술과 알고리즘은 결마루미래학교 1학년 일반교과 과정으로, 학생 개인의 관심사와 연계된 UN SDGs 의제를 탐구하고 이를 바탕으로 프로젝트를 수행하는 실천 중심의 과목이다. 교과서 중심의 지식 전달을 지양하고, 학생이 자신의 흥미 및 진로 키워드를 도출하여 AI(바이브 코딩)와 협력해 실생활의 문제를 해결하거나 자신의 가치관을 알리는 '웹 애플리케이션(데이터베이스 연동)'을 직접 설계하고 구현한다. 이 과정을 통해 학생은 프로그래밍 문법 암기가 아닌, 논리적 구조화 역량(프롬프트 엔지니어링), 프론트엔드와 백엔드 데이터의 흐름을 이해하는 정보 문해 역량, 그리고 시행착오(오류)를 극복하는 자기주도적 문제해결 역량을 기른다.",
    goals: [
        "UN SDGs의 다양한 가치를 이해하고, 자신의 일상 및 진로 관심사와 연계하여 나만의 탐구 주제와 지표를 도출한다.",
        "AI와의 협력적 소통(프롬프트 작성)을 통해 자신의 철학과 아이디어를 웹의 구조로 기획하고 구현할 수 있다.",
        "관심 분야의 데이터를 지속적으로 수집·관리하기 위한 데이터베이스 구조를 설계하고, 동적 웹 애플리케이션을 완성한다.",
        "프로젝트 수행 중 발생하는 오류(버그)를 분석 및 해결(디버깅)하고, 동료와의 피드백을 통해 결과물을 개선하는 태도를 기른다."
    ],
    plans: [
        {
            title: "나의 관심사와 가치가 담긴 웹사이트 구축",
            sub: "나를 코딩하다",
            weeks: "1~9주",
            hours: "16시수",
            elements: ["자기 이해 및 콘텐츠 기획력", "AI 활용 프롬프트 설계 능력", "자연어 알고리즘 표현 능력", "오류 해결 능력"],
            activities: "탐색/설계(와이어프레임 스케치) - 제작(AI 대화 기반 HTML/CSS 작성 및 디자인 요소 추가) - 디버깅(오류 원인 분석 및 UX 다듬기) - 공유/성찰",
            methods: ["실습과정평가", "자기평가", "동료평가"]
        },
        {
            title: "나의 관심사 아카이빙 DB 웹앱 구축 및 연동",
            sub: "나를 기록하다",
            weeks: "10~17주",
            hours: "18시수",
            elements: ["DB 구조 논리적 설계 능력", "프론트엔드·백엔드 연동 능력", "데이터 유효성 검사/QA"],
            activities: "탐색/기획(DB 지표 선정 및 구조 설계) - 설계/제작(입력 폼 제작 및 DB 연동) - 고도화(유효성 검사 및 무한 QA) - 공유/성찰(베타테스트)",
            methods: ["실습과정평가", "자기평가", "동료평가"]
        }
    ],
    rubrics: [
        {
            title: "프로젝트 1: 웹사이트(정적 웹사이트) 기획 및 제작",
            criteriaList: [
                {
                    capability: "자기주도적 역량",
                    a: "자신의 '건강한 삶' 키워드를 명확히 정의하고, 기술적 한계에 부딪혔을 때 스스로 해결책을 찾아 책임감 있게 웹사이트를 완성함.",
                    b: "가이드에 맞추어 와이어프레임 스케치 및 제작 절차에 성실히 참여하며, 기한 내에 웹사이트를 완성함.",
                    c: "자기 관리 및 추진력이 부족하여 타인의 도움에 크게 의존하거나, 실천적 단계에서 책임을 다하지 못함."
                },
                {
                    capability: "정보문해 역량",
                    a: "AI에게 구체적인 조건과 맥락을 부여한 프롬프트를 작성하며, 화면이 깨지거나 오류가 날 경우 AI와 함께 원인을 정확히 분석(디버깅)함.",
                    b: "AI가 생성한 HTML/CSS 뼈대 코드를 이해하여 프로젝트에 반영하고, 기본적인 인터랙션 요소를 구현함.",
                    c: "AI 생성 결과물에 대한 비판적 판단이 없거나 지시가 불명확하여, 웹사이트 뼈대 코드를 제대로 구현하지 못함."
                },
                {
                    capability: "창의융합 탐구역량",
                    a: "자신의 가치관을 창의적 UI/UX(색상, 폰트 등)와 결합하고, 가상의 페르소나를 세심하게 배려한 우수한 결과물을 창출함.",
                    b: "자신의 관심사를 웹사이트의 주제로 설정하고, 배운 바이브 코딩 기법을 적용하여 내 생각이 담긴 결과물을 제작함.",
                    c: "기존 웹사이트 사례를 단순 복제하거나, 건강한 삶이라는 콘텐츠와 웹 기술이 유의미하게 결합되지 않음."
                },
                {
                    capability: "글로벌 사회문화 역량",
                    a: "자신의 웰빙을 인류 보편적 지속가능성과 연결하여 깊이 있게 성찰하고, 방문하는 모두를 포용하고 배려하는 따뜻한 콘텐츠를 훌륭하게 구현함.",
                    b: "보편적인 건강한 삶의 가치를 이해하고, 타인을 존중하는 기본적인 태도를 웹사이트 콘텐츠와 디자인에 반영함.",
                    c: "웰빙의 의미를 협소하게 이해하거나 사회적 연결성을 인식하지 못하며, 다양성을 존중하고 포용하는 콘텐츠 구성이 미흡함."
                }
            ]
        },
        {
            title: "프로젝트 2: 건강한 생활 데이터베이스가 연동된 동적 웹 앱",
            criteriaList: [
                {
                    capability: "자기주도적 역량",
                    a: "에러 메시지를 AI에게 정확히 전달하여 주도적으로 해결책을 찾고(무한 QA), 전 과정을 관통하는 종합 성찰을 깊이 있게 수행함.",
                    b: "가이드에 따라 기한 내에 산출물을 완성하며, 발생한 오류를 교사나 동료의 도움을 받아 수정함.",
                    c: "에러 발생 시 끈기 있게 해결하려 하지 않고 코드를 완성하지 못하거나, 성찰 질문에 대한 답을 회피함."
                },
                {
                    capability: "정보문해 역량",
                    a: "적절한 입력 폼을 선택하여 UI를 설계하고, 백엔드 연동뿐만 아니라 데이터 유효성 검사까지 방어적 코딩을 구현함.",
                    b: "AI를 활용하여 입력 폼 코드를 작성하고, 웹 앱을 배포하여 기본적으로 데이터가 백엔드에 전송되는 기능을 구현함.",
                    c: "웹과 DB의 논리적 연결 구조를 구축하지 못하여, 데이터 저장 기능(전송)을 성공적으로 구현하지 못함."
                },
                {
                    capability: "공동체 역량",
                    a: "동료 베타 테스트에 주도적으로 참여하여 풍부한 데이터를 제공하고, 발견한 아이디어를 공유하여 공동체의 성장에 실질적으로 기여함.",
                    b: "동료 베타 테스트 및 데이터 입력 활동에 필수적인 범위 내에서 참여하고 의견을 나눔.",
                    c: "베타 테스트 활동에 대한 참여가 저조하고 데이터 입력이 부실하며, 협력적 문제 해결에 기여하지 않음."
                }
            ]
        }
    ],
    safety: [
        {
            title: "약물 및 사이버중독 예방",
            desc: "건강한 생활 데이터베이스 기록 프로젝트와 연계하여, 디지털 기기 의존도를 낮추고 실제 삶의 질을 높이는 건강 습관들을 체계적인 데이터베이스로 구축하며 관리합니다. (3시간)"
        }
    ],
    digital: [
        {
            title: "노트북 활용 수업",
            hours: "34시간",
            desc: "AI를 활용한 프롬프트 엔지니어링 및 나만의 웹 앱 개발 프로젝트 진행"
        },
        {
            title: "디지털 과의존 예방교육",
            hours: "2시간 (노트북 활용 수업 내 포함)",
            desc: "AI 기술의 안전한 활용과 디지털 발자국에 대해 이해하고, AI 활용 시 나만의 보안 가이드라인 만들기"
        }
    ]
};

// 샘플 템플릿 텍스트 가이드
const TEMPLATE_GUIDE_TEXT = `[과목 정보]
학기: 2026학년도 1학기
교과군: 환경생태과학
과목명: 기후위기와 행동하는 시민
학년: 1학년
학점: 2학점
지도교사: 박찬우

[과목 성격]
본 과목은 전 지구적 기후 위기 상황에서 청소년들이 스스로 생태적 주체로서 목소리를 내고 실천적인 대안을 기획하는 모듈형 탐구 교과입니다. 단순 이론 습득을 지양하고 지역 기반의 환경 문제를 직접 발굴, 분석, 해결하는 PBL(Project-Based Learning) 방식을 지향합니다.

[과목 목표]
- 기후변화와 생태계 위기 의제를 다각도로 탐색하고 환경 윤리적 태도를 내재화한다.
- 실생활 에너지 데이터를 수집 및 가시화하여 설득력 있는 탄소발자국 지표를 수립한다.
- 생태적 대안을 현장에 실천하고 실질적인 피드백을 설계하여 공동체적 해결을 지향한다.

[교수학습 평가 계획]
1~8주 | 16시수 | 지역사회 생태 모니터링 및 실천기 | 탐색 - 실태 파악 - 대안 기획 - 소통 | 실습과정평가, 자기평가
9~17주 | 18시수 | 탄소제로 결마루 협동 프로젝트 | 계획 - 제작 - 전교생 나눔 - 최종 성찰 | 공동체평가, 동료피드백

[평가 루브릭: 프로젝트 1]
역량: 자기주도적 역량
A (우수): 기후 행동 주제를 주도적으로 선정하고 능동적으로 자료를 수집하여 창의적 홍보를 완성함.
B (기본): 안내된 가이드와 협동 양식에 투입되어 기한 내 실천 결과를 무리 없이 가시화함.
C (보완): 활동에 미온적으로 임하며 외부 데이터에 전적으로 기피하는 성향을 보임.

역량: 공동체 역량
A (우수): 팀 내 이견을 민주적으로 조율하고, 전교적 탄소 캠페인에 적극 기여하여 큰 성과를 이룸.
B (기본): 할당된 역할을 책임감 있게 이행하고 구성원과 원만한 피드백을 주고받음.
C (보완): 팀 내 갈등 시 책임을 회피하고 베타 테스트나 전도 캠페인에 기여하지 않음.`;

export default function SyllabusApp() {
    const [activeTab, setActiveTab] = useState<'info' | 'plan' | 'rubric' | 'extra' | 'uploader'>('info');
    const [syllabus, setSyllabus] = useState<SyllabusData>(DEFAULT_SYLLABUS);
    
    // 업로더 및 에디터 전용 상태
    const [dragActive, setDragActive] = useState(false);
    const [isParsingPdf, setIsParsingPdf] = useState(false);
    const [rawText, setRawText] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const triggerToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleCopyTemplate = () => {
        navigator.clipboard.writeText(TEMPLATE_GUIDE_TEXT);
        setIsCopied(true);
        triggerToast("템플릿 양식이 클립보드에 복사되었습니다!");
        setTimeout(() => setIsCopied(false), 2000);
    };

    // 🌟 핵심: 비-AI (규칙 및 정규식 기반) 컴파일러 파서 구현
    const compileSyllabusFile = (text: string) => {
        if (!text || text.trim() === "") {
            triggerToast("텍스트 내용이 비어있습니다.");
            return;
        }

        try {
            const lines = text.split('\n');
            
            // 기본 템플릿 형식 복원 (에러 대비 복사본 생성)
            const parsedData: SyllabusData = {
                semester: "2026학년도 1학기",
                category: "일반교과",
                subjectName: "미지정 과목",
                grade: "전학년",
                credits: "2학점",
                teacher: "교사 미지정",
                description: "",
                goals: [],
                plans: [],
                rubrics: [],
                safety: [...DEFAULT_SYLLABUS.safety],
                digital: [...DEFAULT_SYLLABUS.digital]
            };

            let currentSection = "";
            let currentDescriptionLines: string[] = [];
            let activeRubricGroup: RubricGroup | null = null;

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line === "") continue;

                // Section 판정
                if (line.startsWith("[") && line.endsWith("]")) {
                    currentSection = line.slice(1, -1).trim();
                    
                    // 만약 루브릭 섹션이라면 rubricGroup 초기화 및 생성
                    if (currentSection.startsWith("평가 루브릭")) {
                        const title = currentSection;
                        activeRubricGroup = { title, criteriaList: [] };
                        parsedData.rubrics.push(activeRubricGroup);
                    }
                    continue;
                }

                // Section별 규칙 기반 파싱
                if (currentSection === "과목 정보") {
                    const colonIndex = line.indexOf(":");
                    if (colonIndex !== -1) {
                        const key = line.substring(0, colonIndex).trim();
                        const val = line.substring(colonIndex + 1).trim();
                        
                        if (key.includes("학기")) parsedData.semester = val;
                        else if (key.includes("교과군") || key.includes("분야")) parsedData.category = val;
                        else if (key.includes("과목명")) parsedData.subjectName = val;
                        else if (key.includes("학년")) parsedData.grade = val;
                        else if (key.includes("학점")) parsedData.credits = val;
                        else if (key.includes("지도교사") || key.includes("선생님")) parsedData.teacher = val;
                    }
                } else if (currentSection === "과목 성격") {
                    currentDescriptionLines.push(line);
                } else if (currentSection === "과목 목표") {
                    // 숫자, 탄환(-) 목록 파싱
                    const cleanGoal = line.replace(/^[-+*\d.]\s*/, '').trim();
                    if (cleanGoal) {
                        parsedData.goals.push(cleanGoal);
                    }
                } else if (currentSection === "교수학습 평가 계획") {
                    // 형식: 1~8주 | 16시수 | 나의 관심사와 가치가 담긴 웹사이트 구축 | 탐색 | 실습과정평가
                    const tokens = line.split("|").map(t => t.trim());
                    if (tokens.length >= 3) {
                        const weeks = tokens[0] || "";
                        const hours = tokens[1] || "";
                        const title = tokens[2] || "미제공 프로젝트";
                        const activities = tokens[3] || "가이드 활동";
                        const methods = tokens[4] ? tokens[4].split(",").map(m => m.trim()) : ["실습과정평가"];
                        
                        parsedData.plans.push({
                            title,
                            weeks,
                            hours,
                            elements: ["기본 역량 탐색", "주도적 목표 수립"],
                            activities,
                            methods
                        });
                    }
                } else if (currentSection.startsWith("평가 루브릭") && activeRubricGroup) {
                    // 형식:
                    // 역량: 자기주도적 역량
                    // A (우수): ...
                    // B (기본): ...
                    // C (보완): ...
                    if (line.startsWith("역량:")) {
                        const capability = line.replace("역량:", "").trim();
                        // 다음 3라인을 A, B, C 준거로 읽는 규칙 기반 해석기
                        let aVal = "기준 미지정";
                        let bVal = "기준 미지정";
                        let cVal = "기준 미지정";

                        for (let offset = 1; offset <= 3; offset++) {
                            const nextLine = lines[i + offset] ? lines[i + offset].trim() : "";
                            if (nextLine.startsWith("A")) {
                                aVal = nextLine.replace(/^A\s*\(.*?\)\s*:\s*/, '').replace(/^A\s*:\s*/, '').trim();
                            } else if (nextLine.startsWith("B")) {
                                bVal = nextLine.replace(/^B\s*\(.*?\)\s*:\s*/, '').replace(/^B\s*:\s*/, '').trim();
                            } else if (nextLine.startsWith("C")) {
                                cVal = nextLine.replace(/^C\s*\(.*?\)\s*:\s*/, '').replace(/^C\s*:\s*/, '').trim();
                            }
                        }
                        
                        activeRubricGroup.criteriaList.push({
                            capability,
                            a: aVal,
                            b: bVal,
                            c: cVal
                        });
                        
                        // offset만큼 줄 건너뛰기
                        i += 3;
                    }
                }
            }

            parsedData.description = currentDescriptionLines.join(" ");

            // 최소한의 데이터 검증 수립
            if (!parsedData.subjectName || parsedData.subjectName === "미지정 과목") {
                triggerToast("파싱 경고: [과목명] 형식을 찾지 못했습니다. 템플릿 구성을 확인해주세요.");
            }

            setSyllabus(parsedData);
            triggerToast("교수학습계획서 파일이 성공적으로 컴파일 및 정리되었습니다!");
            setActiveTab("info"); // 정보 탭으로 자동 이동해서 확인하게 만듦
        } catch (e) {
            triggerToast("오류 발생: 텍스트 문법을 파싱하는 동안 문제가 발생했습니다.");
            console.error(e);
        }
    };

    // 프리셋 바로 주입하기 기능 (데모용 원클릭 테스트)
    const loadPresetSyllabus = () => {
        setRawText(TEMPLATE_GUIDE_TEXT);
        compileSyllabusFile(TEMPLATE_GUIDE_TEXT);
    };

    // PDFJS CDN 동적 로더 및 텍스트 파서
    const loadPdfJS = (): Promise<any> => {
        return new Promise((resolve, reject) => {
            if ((window as any).pdfjsLib) {
                resolve((window as any).pdfjsLib);
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
            script.onload = () => {
                const pdfjsLib = (window as any).pdfjsLib;
                pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
                resolve(pdfjsLib);
            };
            script.onerror = (e) => reject(new Error("PDF 파싱 라이브러리를 로드하는 도중 오류가 발생했습니다. 인터넷 연결을 확인해 주세요."));
            document.body.appendChild(script);
        });
    };

    const extractTextFromPdf = async (arrayBuffer: ArrayBuffer): Promise<string> => {
        const pdfjsLib = await loadPdfJS();
        const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
        const pdf = await loadingTask.promise;
        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            
            let lastY = -1;
            let pageLines: string[] = [];
            let currentLine = "";
            for (const item of textContent.items as any[]) {
                const y = item.transform[5];
                if (lastY !== -1 && Math.abs(y - lastY) > 5) {
                    pageLines.push(currentLine);
                    currentLine = item.str;
                } else {
                    currentLine += (currentLine ? " " : "") + item.str;
                }
                lastY = y;
            }
            if (currentLine) {
                pageLines.push(currentLine);
            }
            fullText += pageLines.join("\n") + "\n\n";
        }
        return fullText;
    };

    // 파일 로딩
    const handleFile = async (file: File) => {
        if (!file) return;

        if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
            setIsParsingPdf(true);
            triggerToast("PDF 파일에서 텍스트를 추출하고 있습니다... 잠시만 기다려주세요.");
            try {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const arrayBuffer = e.target?.result as ArrayBuffer;
                    try {
                        const extractedText = await extractTextFromPdf(arrayBuffer);
                        setRawText(extractedText);
                        compileSyllabusFile(extractedText);
                        triggerToast("PDF 파일 텍스트 추출 완료 및 컴파일 성공!");
                    } catch (error: any) {
                        console.error(error);
                        triggerToast("PDF 분석 실패: " + (error.message || "알 수 없는 오류가 발생했습니다."));
                    } finally {
                        setIsParsingPdf(false);
                    }
                };
                reader.readAsArrayBuffer(file);
            } catch (err: any) {
                console.error(err);
                triggerToast("파일 읽기 오류가 발생했습니다.");
                setIsParsingPdf(false);
            }
        } else {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                setRawText(text);
                compileSyllabusFile(text);
            };
            reader.readAsText(file);
        }
    };

    // 드래그 엔 드롭 관련 핸들러
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-5xl mx-auto pb-10">
            {/* Toast 알림 */}
            {toastMessage && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-slate-950 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce border border-slate-800">
                        <Sparkles className="w-5 h-5 text-emerald-400" />
                        <span className="font-semibold text-sm">{toastMessage}</span>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="bg-white rounded-3xl p-8 mb-6 shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                <div>
                    <div className="flex gap-2 mb-3">
                        <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md text-xs font-bold border border-emerald-100">
                            {syllabus.semester}
                        </span>
                        <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-md text-xs font-bold border border-slate-200">
                            {syllabus.category}
                        </span>
                    </div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        {syllabus.subjectName}
                    </h1>
                </div>
                <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-slate-500">결마루미래학교 미래과정</p>
                    <p className="text-xl font-bold text-slate-800">{syllabus.grade} <span className="font-medium text-slate-400">| {syllabus.credits}</span></p>
                    <p className="text-sm text-slate-600 mt-1">담당교사: <span className="font-bold text-emerald-600">{syllabus.teacher}</span></p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 bg-slate-200/50 p-1.5 rounded-2xl overflow-x-auto hidden-scrollbar">
                {[
                    { id: 'info', label: '과목 개요 및 목표', icon: Target },
                    { id: 'plan', label: '교수학습·평가 계획', icon: CalendarDays },
                    { id: 'rubric', label: '핵심역량 평가 루브릭', icon: BarChart },
                    { id: 'uploader', label: '계획서 업로드/정리기 (비-AI)', icon: UploadCloud }
                ].map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)} 
                            className={cn(
                                "flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 min-w-max",
                                activeTab === tab.id 
                                    ? "bg-white shadow-md text-emerald-700 font-extrabold" 
                                    : "text-slate-500 hover:bg-slate-200/40 hover:text-slate-800"
                            )}
                        >
                            <Icon className={cn("w-4 h-4", activeTab === tab.id ? "text-emerald-600" : "")} />
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
                        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl border border-slate-800">
                            <h3 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
                                <Navigation className="w-4 h-4 text-emerald-400 animate-pulse" />
                                결마루 교육과정 수립 원칙 (성장 중심)
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300 leading-relaxed marker:text-emerald-400 list-disc pl-5">
                                <li>단원명 대신 <strong className="text-white">학습경험(주제·PBL)</strong> 단위를 사용합니다.</li>
                                <li>지필/수행 구분 대신 <strong className="text-white">성장 증거(산출물, 성찰)</strong>를 정량화합니다.</li>
                                <li>평가는 등급이 없는 <strong className="text-white">Pass/Fail 및 다면적 정성적 의견</strong>입니다.</li>
                                <li>역량 5개 중 <strong className="text-white">중점 하위 역량들만 타겟팅</strong>하여 기록합니다.</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">1. 과목 성격</h2>
                            <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-wrap">
                                {syllabus.description || "아직 과목 설명 및 성격이 정의되지 않았습니다. 계획서 업로드 기를 통해 생성해 보세요!"}
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">2. 과목 목표</h2>
                            {syllabus.goals.length > 0 ? (
                                <ul className="space-y-4">
                                    {syllabus.goals.map((goal, idx) => (
                                        <li key={idx} className="flex gap-4 items-start">
                                            <div className="w-6 h-6 shrink-0 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-extrabold mt-0.5 border border-emerald-100">
                                                {idx + 1}
                                            </div>
                                            <p className="text-slate-700 text-sm leading-relaxed">{goal}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-slate-400 text-sm italic">과목 목표 항목이 비어있습니다.</p>
                            )}
                        </div>
                    </div>
                )}

                {/* 2. 교수학습 평가 계획 */}
                {activeTab === 'plan' && (
                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">교수학습-평가 계획 및 마디별 흐름</h2>
                                <p className="text-xs text-slate-500 mt-1">프로젝트 기반으로 전개되는 시기 및 피드백 구조입니다.</p>
                            </div>
                        </div>
                        {syllabus.plans.length > 0 ? (
                            <div className="overflow-x-auto p-4">
                                <table className="w-full text-sm text-left border-collapse min-w-[800px]">
                                    <thead>
                                        <tr className="bg-slate-50/80 text-slate-600 font-bold border-y border-slate-200/80">
                                            <th className="p-4 w-48">학습경험 (주제·프로젝트명)</th>
                                            <th className="p-4 w-24 text-center">시기 / 시수</th>
                                            <th className="p-4 w-48 animate-pulse">평가 요소</th>
                                            <th className="p-4">주요학습활동 (수업 흐름)</th>
                                            <th className="p-4 w-32">평가방법</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {syllabus.plans.map((p, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                                                <td className="p-4">
                                                    <p className="font-extrabold text-slate-800">{p.title}</p>
                                                    {p.sub && <p className="text-xs text-slate-500 mt-1">({p.sub})</p>}
                                                </td>
                                                <td className="p-4 text-center">
                                                    <p className="font-semibold text-slate-700">{p.weeks}</p>
                                                    <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold mt-1">{p.hours}</span>
                                                </td>
                                                <td className="p-4 text-slate-600 text-xs space-y-1.5">
                                                    {p.elements.map((el, eIdx) => (
                                                        <p key={eIdx}>• {el}</p>
                                                    ))}
                                                </td>
                                                <td className="p-4 text-slate-600 leading-relaxed text-xs">
                                                    {p.activities}
                                                </td>
                                                <td className="p-4 space-y-1">
                                                    {p.methods.map((m, mIdx) => (
                                                        <span key={mIdx} className="block text-center px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-[10px] font-bold">
                                                            {m}
                                                        </span>
                                                    ))}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-12 text-center text-slate-400 italic">등록된 교수학습 계획 세부사항이 없습니다.</div>
                        )}
                    </div>
                )}

                {/* 3. 평가 루브릭 */}
                {activeTab === 'rubric' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {syllabus.rubrics.length > 0 ? (
                            syllabus.rubrics.map((rGroup, gIdx) => (
                                <div key={gIdx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                                    <div className="bg-slate-950 p-6 border-b border-slate-800 text-white flex justify-between items-center">
                                        <h2 className="text-md font-bold inline-flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                            {rGroup.title}
                                        </h2>
                                        <span className="text-[10px] bg-slate-800 px-3 py-1 rounded-full text-slate-300 font-bold border border-slate-700">
                                            구조화 완료
                                        </span>
                                    </div>
                                    <div className="overflow-x-auto p-4">
                                        <table className="w-full text-sm text-left border-collapse min-w-[700px]">
                                            <thead>
                                                <tr className="text-center font-bold text-slate-700 border-b border-slate-200 bg-slate-50">
                                                    <th className="p-4 w-40">성취 역량구분</th>
                                                    <th className="p-4 bg-emerald-50/30 text-emerald-800 w-1/3">A (우수)</th>
                                                    <th className="p-4 bg-sky-50/30 text-sky-800 w-1/3">B (기본)</th>
                                                    <th className="p-4 bg-rose-50/30 text-rose-800 w-1/3">C (보완)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {rGroup.criteriaList.map((crit, cIdx) => (
                                                    <tr key={cIdx}>
                                                        <td className="p-4 text-center font-extrabold text-slate-800 bg-slate-50/20">{crit.capability}</td>
                                                        <td className="p-4 text-slate-600 leading-relaxed text-xs hover:bg-emerald-50/20 transition-colors whitespace-pre-wrap">{crit.a}</td>
                                                        <td className="p-4 text-slate-600 leading-relaxed text-xs hover:bg-sky-50/20 transition-colors whitespace-pre-wrap">{crit.b}</td>
                                                        <td className="p-4 text-slate-600 leading-relaxed text-xs hover:bg-rose-50/20 transition-colors whitespace-pre-wrap">{crit.c}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400 italic shadow-sm">
                                정의된 평가 루브릭이 없습니다. 계획서를 업로드해 채점 준거 기준을 정렬해 보세요.
                            </div>
                        )}
                    </div>
                )}

                {/* 5. 컴파일러/업로더 전용 영역 */}
                {activeTab === 'uploader' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* 왼쪽: 파일 업로더 및 텍스트 라이터 */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                                <h2 className="text-md font-extrabold text-slate-800 mb-2 flex items-center gap-2">
                                    <UploadCloud className="w-5 h-5 text-emerald-600" />
                                    텍스트 및 PDF 계획서 드롭 & 컴파일
                                </h2>
                                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                                    작성한 학사 계획서 파일(.txt, .pdf)을 아래 영역에 드래그하거나 직접 붙여넣어 주세요. 
                                    비-AI 파서가 규칙에 맞춰 정렬해 줍니다.
                                </p>

                                {/* Drag and Drop Zone */}
                                <div 
                                    onDragEnter={handleDrag}
                                    onDragOver={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDrop={handleDrop}
                                    onClick={() => !isParsingPdf && fileInputRef.current?.click()}
                                    className={cn(
                                        "border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[140px] mb-4 gap-2",
                                        dragActive 
                                            ? "border-emerald-500 bg-emerald-50" 
                                            : "border-slate-300 hover:border-emerald-400 hover:bg-slate-50/50",
                                        isParsingPdf && "cursor-not-allowed opacity-80"
                                    )}
                                >
                                    <input 
                                        type="file" 
                                        ref={fileInputRef}
                                        onChange={handleFileInput}
                                        accept=".txt,.json,.pdf,application/pdf"
                                        className="hidden" 
                                        disabled={isParsingPdf}
                                    />
                                    {isParsingPdf ? (
                                        <div className="flex flex-col items-center justify-center gap-2 animate-pulse">
                                            <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                                            <div>
                                                <p className="text-sm font-bold text-slate-700">PDF 파일 분석 및 텍스트 추출 중...</p>
                                                <p className="text-xs text-slate-400 mt-1">파일 용량 및 페이지 수에 따라 수 초가 소요됩니다.</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                                            <div>
                                                <p className="text-sm font-bold text-slate-700">여기에 계획서 파일 드래그 & 드롭</p>
                                                <p className="text-xs text-slate-400 mt-1">또는 클릭하여 컴퓨터에서 파일 찾기 (.txt, .pdf 지원)</p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-xs font-bold text-slate-700">혹은 계획서 텍스트 직접 적기</label>
                                        <button 
                                            onClick={loadPresetSyllabus}
                                            className="text-xs bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 px-3 py-1.5 rounded-lg font-bold flex items-center gap-2 transition-colors cursor-pointer border border-slate-200"
                                        >
                                            <RefreshCw className="w-3.5 h-3.5" />
                                            데모 파일 데이터 주입
                                        </button>
                                    </div>
                                    <textarea 
                                        rows={8}
                                        value={rawText}
                                        onChange={(e) => setRawText(e.target.value)}
                                        placeholder="규칙양식에 따라 기입하거나 파일에서 읽어온 원본이 표시됩니다..."
                                        className="w-full text-xs p-4 bg-slate-900 text-slate-100 rounded-2xl outline-none font-mono resize-none border border-slate-800"
                                    />
                                    <button 
                                        onClick={() => compileSyllabusFile(rawText)}
                                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-all shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <Sparkles className="w-4 h-4 text-emerald-200" />
                                        양식 자동 분석 및 변환하기
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 오른쪽: 가이드 및 문법 구조 */}
                        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col">
                            <div className="flex justify-between items-center border-b pb-4 mb-4">
                                <h2 className="text-md font-bold text-slate-800 flex items-center gap-2">
                                    <Info className="w-5 h-5 text-sky-500" />
                                    텍스트 구조 컴파일 가이드
                                </h2>
                                <button 
                                    onClick={handleCopyTemplate}
                                    className="text-xs bg-slate-900 text-white hover:bg-slate-800 py-1.5 px-3 rounded-lg font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                                >
                                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                    가이드 템플릿 복사
                                </button>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto max-h-[460px] text-xs leading-relaxed text-slate-600 space-y-4 pr-1">
                                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex gap-3">
                                    <HelpCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                    <p className="text-[11px]">
                                        이 분석 도구는 AI 서버 API 키가 연동되지 않아도 브라우저에서 <strong>100% 안전하게 오프라인 규칙대로 데이터를 구문 정렬</strong>합니다.
                                        아래 구조와 섹션 이름 그대로 적용해야 원활히 파싱됩니다.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <p className="font-bold text-slate-800">✅ 컴파일 문법 핵심 규칙 설명:</p>
                                    <ul className="list-decimal pl-5 space-y-1 text-slate-500">
                                        <li>각각의 파트는 대괄호 <strong className="text-slate-800">`[과목 정보]`</strong> 같은 섹션명으로 분기합니다.</li>
                                        <li>정보 파트는 콜론<strong className="text-slate-800">`과목명:`</strong> 과 같이 밸류를 가릅니다.</li>
                                        <li>주별 계획은 버티컬 슬래시<strong className="text-slate-800">`|`</strong> 기호로 마디구간, 시수, 주제를 분리해 주세요.</li>
                                        <li>루브릭은 <strong className="text-slate-800">`역량: 역량명`</strong> 적고 줄바꿈 후 바로 아래에 <strong className="text-slate-800">`A (기존): 내용` | `B (기존): 내용` | `C (기존): 내용`</strong>를 정렬해 둡니다.</li>
                                    </ul>
                                </div>

                                <div className="p-3 bg-slate-900 text-slate-300 rounded-2xl font-mono text-[10px] whitespace-pre overflow-x-auto border border-slate-800 max-h-40">
                                    {TEMPLATE_GUIDE_TEXT}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
