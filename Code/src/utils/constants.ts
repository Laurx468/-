import { Device, Template, Solution, BuildingTool } from '../types'

// 设备库数据
export const DEVICES: Device[] = [
  {
    id: 1,
    name: '智能LED灯泡',
    category: 'lighting',
    price: 89,
    features: ['调光调色', '语音控制', '定时开关'],
    power: '9W',
    suitable: ['客厅', '卧室', '书房'],
    icon: '💡'
  },
  {
    id: 2,
    name: '智能门锁',
    category: 'security',
    price: 1299,
    features: ['指纹识别', '密码开锁', '远程监控'],
    power: '电池供电',
    suitable: ['入户门'],
    icon: '🔒'
  },
  {
    id: 3,
    name: '智能摄像头',
    category: 'security',
    price: 199,
    features: ['1080P高清', '夜视功能', '移动侦测'],
    power: '5V/1A',
    suitable: ['客厅', '门口', '阳台'],
    icon: '📹'
  },
  {
    id: 4,
    name: '智能温控器',
    category: 'climate',
    price: 399,
    features: ['温度调节', '湿度监测', 'APP控制'],
    power: '12V/2A',
    suitable: ['客厅', '卧室'],
    icon: '🌡️'
  },
  {
    id: 5,
    name: '智能音响',
    category: 'entertainment',
    price: 599,
    features: ['高保真音质', '语音助手', '多房间同步'],
    power: '20W',
    suitable: ['客厅', '书房'],
    icon: '🔊'
  },
  {
    id: 6,
    name: '智能窗帘',
    category: 'appliances',
    price: 799,
    features: ['电动开合', '定时控制', '光线感应'],
    power: '24V/1.5A',
    suitable: ['客厅', '卧室'],
    icon: '🪟'
  },
  {
    id: 7,
    name: '智能开关',
    category: 'lighting',
    price: 159,
    features: ['远程控制', '定时功能', '场景模式'],
    power: '220V',
    suitable: ['全屋'],
    icon: '🎛️'
  },
  {
    id: 8,
    name: '智能插座',
    category: 'appliances',
    price: 79,
    features: ['远程开关', '电量监测', '过载保护'],
    power: '220V/10A',
    suitable: ['全屋'],
    icon: '🔌'
  }
]

// 预设模板数据
export const TEMPLATES: Template[] = [
  {
    id: 1,
    name: '一室一厅',
    size: '50㎡',
    rooms: [
      { id: 'r1', name: '客厅', type: 'living', x: 50, y: 50, width: 150, height: 100, devices: [] },
      { id: 'r2', name: '卧室', type: 'bedroom', x: 220, y: 50, width: 100, height: 100, devices: [] },
      { id: 'r3', name: '厨房', type: 'kitchen', x: 50, y: 170, width: 80, height: 60, devices: [] },
      { id: 'r4', name: '卫生间', type: 'bathroom', x: 150, y: 170, width: 60, height: 60, devices: [] }
    ],
    walls: [
      { id: 'w1', x1: 30, y1: 30, x2: 350, y2: 30, thickness: 8 },
      { id: 'w2', x1: 30, y1: 30, x2: 30, y2: 250, thickness: 8 },
      { id: 'w3', x1: 30, y1: 250, x2: 350, y2: 250, thickness: 8 },
      { id: 'w4', x1: 350, y1: 30, x2: 350, y2: 250, thickness: 8 }
    ],
    doors: [
      { id: 'd1', x: 70, y: 25, width: 30, height: 10, orientation: 'horizontal' },
      { id: 'd2', x: 200, y: 125, width: 10, height: 30, orientation: 'vertical' }
    ],
    windows: [
      { id: 'win1', x: 250, y: 25, width: 40, height: 10, orientation: 'horizontal' }
    ]
  },
  {
    id: 2,
    name: '两室一厅',
    size: '80㎡',
    rooms: [
      { id: 'r1', name: '客厅', type: 'living', x: 50, y: 50, width: 180, height: 120, devices: [] },
      { id: 'r2', name: '主卧', type: 'bedroom', x: 250, y: 50, width: 120, height: 100, devices: [] },
      { id: 'r3', name: '次卧', type: 'bedroom', x: 250, y: 170, width: 120, height: 80, devices: [] },
      { id: 'r4', name: '厨房', type: 'kitchen', x: 50, y: 190, width: 90, height: 70, devices: [] },
      { id: 'r5', name: '卫生间', type: 'bathroom', x: 160, y: 190, width: 70, height: 70, devices: [] }
    ],
    walls: [
      { id: 'w1', x1: 30, y1: 30, x2: 390, y2: 30, thickness: 8 },
      { id: 'w2', x1: 30, y1: 30, x2: 30, y2: 280, thickness: 8 },
      { id: 'w3', x1: 30, y1: 280, x2: 390, y2: 280, thickness: 8 },
      { id: 'w4', x1: 390, y1: 30, x2: 390, y2: 280, thickness: 8 }
    ],
    doors: [
      { id: 'd1', x: 80, y: 25, width: 30, height: 10, orientation: 'horizontal' },
      { id: 'd2', x: 240, y: 100, width: 10, height: 30, orientation: 'vertical' },
      { id: 'd3', x: 240, y: 200, width: 10, height: 30, orientation: 'vertical' }
    ],
    windows: [
      { id: 'win1', x: 300, y: 25, width: 50, height: 10, orientation: 'horizontal' },
      { id: 'win2', x: 385, y: 100, width: 10, height: 40, orientation: 'vertical' }
    ]
  },
  {
    id: 3,
    name: '三室两厅',
    size: '120㎡',
    rooms: [
      { id: 'r1', name: '客厅', type: 'living', x: 50, y: 50, width: 200, height: 150, devices: [] },
      { id: 'r2', name: '餐厅', type: 'living', x: 270, y: 50, width: 120, height: 80, devices: [] },
      { id: 'r3', name: '主卧', type: 'bedroom', x: 270, y: 150, width: 140, height: 120, devices: [] },
      { id: 'r4', name: '次卧', type: 'bedroom', x: 50, y: 220, width: 100, height: 90, devices: [] },
      { id: 'r5', name: '书房', type: 'study', x: 170, y: 220, width: 80, height: 90, devices: [] },
      { id: 'r6', name: '厨房', type: 'kitchen', x: 420, y: 50, width: 80, height: 100, devices: [] },
      { id: 'r7', name: '卫生间', type: 'bathroom', x: 420, y: 170, width: 80, height: 70, devices: [] }
    ],
    walls: [
      { id: 'w1', x1: 30, y1: 30, x2: 530, y2: 30, thickness: 8 },
      { id: 'w2', x1: 30, y1: 30, x2: 30, y2: 330, thickness: 8 },
      { id: 'w3', x1: 30, y1: 330, x2: 530, y2: 330, thickness: 8 },
      { id: 'w4', x1: 530, y1: 30, x2: 530, y2: 330, thickness: 8 }
    ],
    doors: [
      { id: 'd1', x: 120, y: 25, width: 30, height: 10, orientation: 'horizontal' },
      { id: 'd2', x: 260, y: 130, width: 10, height: 30, orientation: 'vertical' },
      { id: 'd3', x: 260, y: 270, width: 10, height: 30, orientation: 'vertical' }
    ],
    windows: [
      { id: 'win1', x: 350, y: 25, width: 60, height: 10, orientation: 'horizontal' },
      { id: 'win2', x: 525, y: 120, width: 10, height: 50, orientation: 'vertical' }
    ]
  }
]

// 解决方案数据
export const SOLUTIONS: Solution[] = [
  { id: 1, name: '全屋智能', description: '全方位智控', icon: '🏠', price: '￥15,999起', template: TEMPLATES[2] },
  { id: 2, name: '安防套装', description: '全面防护', icon: '🔒', price: '￥3,299起', template: TEMPLATES[1] },
  { id: 3, name: '影音娱乐', description: '沉浸体验', icon: '🎬', price: '￥8,999起', template: TEMPLATES[0] },
  { id: 4, name: '智能照明', description: '光影艺术', icon: '💡', price: '￥1,299起', template: TEMPLATES[1] }
]

// 建筑工具
export const BUILDING_TOOLS: BuildingTool[] = [
  { id: 'room', name: '房间', icon: '🏠', color: 'bg-blue-500' },
  { id: 'wall', name: '墙壁', icon: '🧱', color: 'bg-gray-600' },
  { id: 'door', name: '门', icon: '🚪', color: 'bg-yellow-600' },
  { id: 'window', name: '窗户', icon: '🪟', color: 'bg-cyan-500' },
  { id: 'device', name: '设备', icon: '📱', color: 'bg-green-500' }
]

// 设备分类
export const DEVICE_CATEGORIES = [
  { id: 'all', name: '全部', icon: '⚡' },
  { id: 'lighting', name: '照明', icon: '💡' },
  { id: 'security', name: '安防', icon: '🔒' },
  { id: 'climate', name: '环境', icon: '🌡️' },
  { id: 'entertainment', name: '娱乐', icon: '🎵' },
  { id: 'appliances', name: '家电', icon: '📱' }
]