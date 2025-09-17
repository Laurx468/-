import { create } from 'zustand'
import { Room, Device, Wall, Door, Window, Template, Order, User } from '../types'

interface AppState {
  // 用户相关
  user: User | null
  setUser: (user: User) => void
  
  // 设计相关
  rooms: Room[]
  walls: Wall[]
  doors: Door[]
  windows: Window[]
  selectedRoom: Room | null
  currentTool: 'room' | 'wall' | 'door' | 'window' | 'device'
  
  // 设备相关
  selectedDevices: Device[]
  
  // 工单相关
  orders: Order[]
  
  // 设计方法
  addRoom: (room: Room) => void
  updateRoom: (id: string, updates: Partial<Room>) => void
  removeRoom: (id: string) => void
  setSelectedRoom: (room: Room | null) => void
  
  // 墙壁方法
  addWall: (wall: Wall) => void
  removeWall: (id: string) => void
  
  // 门窗方法
  addDoor: (door: Door) => void
  addWindow: (window: Window) => void
  
  // 设备方法
  selectDevice: (device: Device) => void
  unselectDevice: (deviceId: string | number) => void
  updateDeviceQuantity: (deviceId: string | number, quantity: number) => void
  
  // 模板方法
  loadTemplate: (template: Template) => void
  clearCanvas: () => void
  
  // 工具方法
  setCurrentTool: (tool: 'room' | 'wall' | 'door' | 'window' | 'device') => void
  
  // 工单方法
  setOrders: (orders: Order[]) => void
  addOrder: (order: Order) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  // 初始状态
  user: null,
  rooms: [],
  walls: [],
  doors: [],
  windows: [],
  selectedRoom: null,
  currentTool: 'room',
  selectedDevices: [],
  orders: [
    {
      id: 'WD202403150001',
      title: '三室两厅智能家居方案',
      status: 'designing',
      statusText: '设计中',
      createTime: '2024-03-15 14:30',
      progress: 40,
      amount: '￥15,600'
    },
    {
      id: 'WD202403120002',
      title: '两室一厅安防套装',
      status: 'completed',
      statusText: '已完成',
      createTime: '2024-03-12 09:15',
      progress: 100,
      amount: '￥3,200'
    }
  ],

  // 用户方法
  setUser: (user) => set({ user }),

  // 房间管理
  addRoom: (room) => set((state) => ({ 
    rooms: [...state.rooms, room] 
  })),

  updateRoom: (id, updates) => set((state) => ({
    rooms: state.rooms.map(room => 
      room.id === id ? { ...room, ...updates } : room
    )
  })),

  removeRoom: (id) => set((state) => ({
    rooms: state.rooms.filter(room => room.id !== id)
  })),

  setSelectedRoom: (room) => set({ selectedRoom: room }),

  // 墙壁管理
  addWall: (wall) => set((state) => ({
    walls: [...state.walls, wall]
  })),

  removeWall: (id) => set((state) => ({
    walls: state.walls.filter(wall => wall.id !== id)
  })),

  // 门窗管理
  addDoor: (door) => set((state) => ({
    doors: [...state.doors, door]
  })),

  addWindow: (window) => set((state) => ({
    windows: [...state.windows, window]
  })),

  // 设备管理
  selectDevice: (device) => set((state) => {
    const existing = state.selectedDevices.find(d => d.id === device.id)
    if (existing) {
      return {
        selectedDevices: state.selectedDevices.map(d =>
          d.id === device.id ? { ...d, quantity: (d.quantity || 1) + 1 } : d
        )
      }
    } else {
      return {
        selectedDevices: [...state.selectedDevices, { ...device, quantity: 1 }]
      }
    }
  }),

  unselectDevice: (deviceId) => set((state) => ({
    selectedDevices: state.selectedDevices.filter(d => d.id !== deviceId)
  })),

  updateDeviceQuantity: (deviceId, quantity) => set((state) => ({
    selectedDevices: quantity <= 0
      ? state.selectedDevices.filter(d => d.id !== deviceId)
      : state.selectedDevices.map(d =>
          d.id === deviceId ? { ...d, quantity } : d
        )
  })),

  // 模板管理
  loadTemplate: (template) => set({
    rooms: template.rooms || [],
    walls: template.walls || [],
    doors: template.doors || [],
    windows: template.windows || [],
    selectedRoom: null
  }),

  clearCanvas: () => set({
    rooms: [],
    walls: [],
    doors: [],
    windows: [],
    selectedRoom: null
  }),

  // 工具管理
  setCurrentTool: (tool) => set({ currentTool: tool }),

  // 工单管理
  setOrders: (orders) => set({ orders }),
  
  addOrder: (order) => set((state) => ({
    orders: [order, ...state.orders]
  }))
}))