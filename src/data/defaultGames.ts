import { ReelGameItem, PresetImage } from '../types';

import goldenCastleImg from '../assets/images/golden_castle_poster_1791283148345.jpg';
import goldenWhaleImg from '../assets/images/sea_story_whale_poster_1791283172206.jpg';
import oceanParadiseImg from '../assets/images/ocean_paradise_poster_1791283191048.jpg';
import jawsSharkImg from '../assets/images/jaws_shark_poster_1791282516142.jpg';
import sonogongReelImg from '../assets/images/sonogong_reel_game_1791282132072.jpg';
import yamatoFleetImg from '../assets/images/yamato_fleet_poster_1791282536232.jpg';
import goldenDragonImg from '../assets/images/golden_dragon_poster_1791283209744.jpg';
import aladdinLampImg from '../assets/images/aladdin_lamp_game_poster_1791283256576.jpg';
import cherryMasterImg from '../assets/images/cherry_master_square_poster_1791283275656.jpg';
import popeyeReelImg from '../assets/images/popeye_reel_game_1791155313671.jpg';
import jungleBookImg from '../assets/images/jungle_book_game_1791155325474.jpg';
import reelCheonjiImg from '../assets/images/reel_cheonji_game_1791155335594.jpg';

export const PRESET_IMAGES: PresetImage[] = [
  {
    name: '뽀빠이 릴게임 (룰렛사다리)',
    url: popeyeReelImg,
    tag: '아케이드/사다리'
  },
  {
    name: '정글북 자연빵 (300만 스페셜)',
    url: jungleBookImg,
    tag: '정글/자연빵'
  },
  {
    name: '릴천지 (14종 올인원)',
    url: reelCheonjiImg,
    tag: '올인원/무설치'
  },
  {
    name: '황금성릴게임 (황금성)',
    url: goldenCastleImg,
    tag: '정통/기사'
  },
  {
    name: '바다이야기 (대왕고래)',
    url: goldenWhaleImg,
    tag: '심해/고래'
  },
  {
    name: '오션파라다이스 (메갈로돈)',
    url: oceanParadiseImg,
    tag: '해양/샤크'
  },
  {
    name: '죠스급 초대형 상어 (백경)',
    url: jawsSharkImg,
    tag: '폭풍/상어'
  },
  {
    name: '손오공 릴게임 (초싸이언)',
    url: sonogongReelImg,
    tag: '판타지/손오공'
  },
  {
    name: '야마토 골드함대 (야마토)',
    url: yamatoFleetImg,
    tag: '함대/제독'
  },
  {
    name: '신천지 골든 드래곤',
    url: goldenDragonImg,
    tag: '신화/황금용'
  },
  {
    name: '알라딘릴게임 (요술램프)',
    url: aladdinLampImg,
    tag: '사막/요술램프'
  },
  {
    name: '체리마스터 97 레트로',
    url: cherryMasterImg,
    tag: '아케이드/네온'
  }
];

export const INITIAL_9_GAMES: ReelGameItem[] = [
  {
    id: 'game-1',
    slotIndex: 1,
    title: '뽀빠이 릴게임',
    subtitle: '룰렛사다리 & 블랙홀 3D 릴게임',
    category: 'retro',
    categoryLabel: '아케이드 릴',
    imageUrl: popeyeReelImg,
    badge: '화제작',
    badgeColor: 'amber',
    rtp: 98.4,
    volatility: '높음',
    jackpotAmount: 48600000,
    playerCount: 1680,
    description: '추억의 뽀빠이 선장이 선사하는 특급 보너스 아케이드! 룰렛사다리, 블랙홀3D 릴게임, 주사위손오공, 룰렛3D, 알라딘릴게임 등 다채로운 미니게임과 통쾌한 잭팟 찬스를 모바일 무설치로 바로 만끽할 수 있습니다.',
    targetUrl: 'http://www.kty76.com',
    features: ['룰렛사다리 & 블랙홀3D 탑재', '다채로운 5종 미니 보너스', '원클릭 모바일 무설치 바로시작'],
    isSquarePoster: true
  },
  {
    id: 'game-2',
    slotIndex: 2,
    title: '정글북 자연빵',
    subtitle: '정글북 300만 스페셜 자연빵 & 맹수 연타',
    category: 'ocean',
    categoryLabel: '어드벤처 릴',
    imageUrl: jungleBookImg,
    badge: '300만 자연빵',
    badgeColor: 'emerald',
    rtp: 98.6,
    volatility: '초고변동',
    jackpotAmount: 88500000,
    playerCount: 1940,
    description: '미지의 깊은 정글 속 맹수들이 지키는 정글북 전설의 300만 스페셜 자연빵! 재규어의 날카로운 포효, 거대 아나콘다의 와일드 콤보, 악어의 잭팟 연출과 함께 조작 없는 100% 리얼 오리지널 자연빵의 압도적인 배당을 선사합니다.',
    targetUrl: 'http://rgb285.com/',
    features: ['정글북 300만 스페셜 자연빵', '거대 아나콘다 와일드 연타', '조작 없는 100% 리얼 자연빵 배당'],
    isSquarePoster: true
  },
  {
    id: 'game-3',
    slotIndex: 3,
    title: '릴천지',
    subtitle: '국내 최대 14종 올인원 & 현금 2만원 즉시 지급',
    category: 'classic',
    categoryLabel: '올인원 포털',
    imageUrl: reelCheonjiImg,
    badge: '현금 2만 지급',
    badgeColor: 'rose',
    rtp: 98.8,
    volatility: '초고변동',
    jackpotAmount: 96800000,
    playerCount: 2580,
    description: '무설치로 편하게 접속하는 대한민국 대표 올인원 릴게임 포털 릴천지! 국내 최대 14종 명작 릴게임(All of The Reel Game) 완벽 모바일 지원, 신규 회원 현금 2만원 즉시 지급 이벤트 및 안전한 초고속 입출금 서비스를 제공합니다.',
    targetUrl: 'https://rg-53.com/',
    features: ['국내 최대 14종 기종 무설치 통합', '신규 가입 현금 2만원 즉시 지급', '3분 안심 초고속 실시간 정산'],
    isSquarePoster: true
  },
  {
    id: 'game-4',
    slotIndex: 4,
    title: '황금성릴게임',
    subtitle: '황금열쇠 3단 점등 & 대박 슈퍼 연타',
    category: 'classic',
    categoryLabel: '정통 릴게임',
    imageUrl: goldenCastleImg,
    badge: '실시간 1위',
    badgeColor: 'amber',
    rtp: 98.6,
    volatility: '초고변동',
    jackpotAmount: 78540000,
    playerCount: 1840,
    description: '대한민국 오리지널 정통 황금성의 계승작. 백마를 탄 황금 기사와 요정이 3개의 황금열쇠를 잠금 해제할 때 터지는 극상의 슈퍼 골든 보너스와 무한 연타 시스템을 완벽 구현했습니다.',
    targetUrl: 'http://rgb285.com',
    features: ['황금열쇠 3중 중첩 보너스', '최고 50연타 잭팟 구간', '황금 기사 보너스 스테이지'],
    isSquarePoster: true
  },
  {
    id: 'game-5',
    slotIndex: 5,
    title: '바다이야기',
    subtitle: '바다이야기 잠수함 사이렌 & 황금고래 유영',
    category: 'ocean',
    categoryLabel: '바다 시리즈',
    imageUrl: goldenWhaleImg,
    badge: '황금고래 출현',
    badgeColor: 'blue',
    rtp: 98.4,
    volatility: '높음',
    jackpotAmount: 92410000,
    playerCount: 2190,
    description: '심해에서 울려 퍼지는 3단 사이렌 경보음과 해파리 떼 통과 후 화면 중앙을 웅장하게 가르는 초대형 황금 대왕고래의 전설적인 잭팟 예시 연출을 선사합니다.',
    targetUrl: 'http://rgb285.com',
    features: ['잠수함 3단 사이렌 경보', '황금고래 출현 확정 잭팟', '무제한 프리 스핀 트리거'],
    isSquarePoster: true
  },
  {
    id: 'game-6',
    slotIndex: 6,
    title: '오션파라다이스',
    subtitle: '메갈로돈 샤크 콤보 & 트로피컬 와일드',
    category: 'ocean',
    categoryLabel: '바다 시리즈',
    imageUrl: oceanParadiseImg,
    badge: '잭팟 임박',
    badgeColor: 'emerald',
    rtp: 98.2,
    volatility: '보통',
    jackpotAmount: 64200000,
    playerCount: 1450,
    description: '거대한 메갈로돈 상어가 릴을 찢고 나오는 역동적인 와일드 콤보와 금빛 코인이 쏟아지는 트로피컬 아일랜드 배경의 차세대 해양 릴게임 대표작입니다.',
    targetUrl: 'http://rgb285.com',
    features: ['메갈로돈 5연속 콤보', '산호초 와일드 프리 스핀', '초보자 친화적 안정적 환수율'],
    isSquarePoster: true
  },
  {
    id: 'game-7',
    slotIndex: 7,
    title: '죠스급 초대형 상어',
    subtitle: '백경 해무 번개 & 분노의 상어 연타',
    category: 'ocean',
    categoryLabel: '바다 시리즈',
    imageUrl: jawsSharkImg,
    badge: '환수율 98.5%',
    badgeColor: 'purple',
    rtp: 98.5,
    volatility: '초고변동',
    jackpotAmount: 89320000,
    playerCount: 1320,
    description: '거친 폭풍우와 번개 사이를 가르고 솟구치는 거대한 죠스급 백상어의 무자비한 이빨! 하이롤러 매니아들이 열광하는 최고 배당 잭팟 족보를 탑재했습니다.',
    targetUrl: 'https://rg-53.com',
    features: ['번개 스톰 특수 예시 사운드', '죠스 와일드 바이트 콤보', '하이롤러 최고 배당 테이블'],
    isSquarePoster: true
  },
  {
    id: 'game-8',
    slotIndex: 8,
    title: '손오공 릴게임',
    subtitle: '초싸이언 황금 아우라 파워업 & 천상 로맨스 보너스',
    category: 'fantasy',
    categoryLabel: '신화·판타지',
    imageUrl: sonogongReelImg,
    badge: '인기 폭발',
    badgeColor: 'rose',
    rtp: 98.1,
    volatility: '높음',
    jackpotAmount: 58900000,
    playerCount: 1670,
    description: '황금빛 초싸이언 손오공의 폭발적인 에너지와 천상 선녀의 신비로운 사랑이 결합된 명작 판타지 릴게임! 하트 트리거 시 황금빛 777이 연쇄 폭발하며 압도적인 고배당을 형성합니다.',
    targetUrl: 'https://rg-53.com',
    features: ['초싸이언 손오공 파워업', '천상선녀 하트 보너스', '황금빛 777 연속 폭발'],
    isSquarePoster: true
  },
  {
    id: 'game-9',
    slotIndex: 9,
    title: '야마토 골드함대',
    subtitle: '황금 전함 일제 주포사격 & 제독의 황금검',
    category: 'classic',
    categoryLabel: '정통 릴게임',
    imageUrl: yamatoFleetImg,
    badge: '고배당 보너스',
    badgeColor: 'purple',
    rtp: 98.7,
    volatility: '초고변동',
    jackpotAmount: 97450000,
    playerCount: 1780,
    description: '황금 제독의 지휘 아래 거대한 황금 전함 야마토가 폭풍우를 가르고 진격합니다! 주포 일제 사격 애니메이션과 황금검 발도 연출로 초대형 잭팟을 격침하세요.',
    targetUrl: 'https://rg-53.com',
    features: ['황금 주포 일제 사격 예시', '황금검 세이버 잭팟', '대규모 연타 함대 배틀'],
    isSquarePoster: true
  },
  {
    id: 'game-10',
    slotIndex: 10,
    title: '신천지 골든 드래곤',
    subtitle: '승천하는 쌍룡 & 여의주 메가 잭팟',
    category: 'fantasy',
    categoryLabel: '신화·판타지',
    imageUrl: goldenDragonImg,
    badge: '신규 업데이트',
    badgeColor: 'amber',
    rtp: 98.3,
    volatility: '초고변동',
    jackpotAmount: 51200000,
    playerCount: 990,
    description: '천둥 번개 속을 뚫고 솟구치는 거대한 황금빛 쌍룡! 여의주 심볼이 중첩되는 순간 화면 전체가 황금빛으로 물들며 압도적인 보너스 릴 회전이 펼쳐집니다.',
    targetUrl: 'http://www.kty76.com',
    features: ['쌍룡 승천 예시 연출', '황금빛 여의주 중첩', '스피드 스핀 원클릭 모드'],
    isSquarePoster: true
  },
  {
    id: 'game-11',
    slotIndex: 11,
    title: '알라딘릴게임',
    subtitle: '신비의 요술램프 & 지니의 3가지 소원',
    category: 'fantasy',
    categoryLabel: '신화·판타지',
    imageUrl: aladdinLampImg,
    badge: '인기 급상승',
    badgeColor: 'emerald',
    rtp: 97.9,
    volatility: '안정',
    jackpotAmount: 38100000,
    playerCount: 890,
    description: '신비로운 아라비안 밤하늘과 황금 램프에서 피어오르는 보라빛 연기 속 지니의 마법! 보석 심볼이 정렬될 때마다 3배수 멀티플라이어 프리 스핀이 쏟아집니다.',
    targetUrl: 'http://www.kty76.com',
    features: ['지니 마법 3배수 배당', '황금 융단 프리 회전', '초보 추천 안정적 배당'],
    isSquarePoster: true
  },
  {
    id: 'game-12',
    slotIndex: 12,
    title: '체리마스터 97 레트로',
    subtitle: '원조 네온 777 & 오리지널 체리 8라인',
    category: 'retro',
    categoryLabel: '클래식 레트로',
    imageUrl: cherryMasterImg,
    badge: '오리지널 777',
    badgeColor: 'rose',
    rtp: 98.0,
    volatility: '안정',
    jackpotAmount: 32500000,
    playerCount: 1540,
    description: '아케이드 오락실의 황금기를 이끈 체리마스터의 정통 기판을 100% 현대적으로 복원! 8라인 격자 릴에서 터지는 정통 체리, 바(BAR), 777의 명불허전 사운드를 만끽하세요.',
    targetUrl: 'http://www.kty76.com',
    features: ['8라인 정통 레트로 기판 구현', '777 일자 정렬 특수 잭팟', '빠른 회전과 간결한 인터페이스'],
    isSquarePoster: true
  }
];
