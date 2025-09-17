import { Device, Room } from '../types'

// 格式化价格
export const formatPrice = (price: number): string => {
  return `¥${price.toLocaleString()}`
}

// 计算设备总价
export const calculateDevicesTotal = (devices: Device[]): number => {
  return devices.reduce((total, device) => {
    return total + device.price * (device.quantity || 1)
  }, 0)
}

// 计算方案总价
export const calculateTotalPrice = (
  devices: Device[],
  rooms: Room[]
): number => {
  const deviceTotal = calculateDevicesTotal(devices)
  const designFee = Math.max(300, rooms.length * 100)
  const installationFee = devices.reduce((sum, device) => sum + (device.quantity || 1), 0) * 50
  const serviceFee = 200

  return deviceTotal + designFee + installationFee + serviceFee
}

// 生成唯一ID
export const generateId = (prefix = 'id'): string => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// 检查点是否在矩形内
export const isPointInRect = (
  point: { x: number; y: number },
  rect: { x: number; y: number; width: number; height: number }
): boolean => {
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  )
}

// 防抖函数
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }
}

// 节流函数
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func.apply(null, args)
    }
  }
}

// 深拷贝对象
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T
  }
  
  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item)) as unknown as T
  }
  
  if (typeof obj === 'object') {
    const clonedObj = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  
  return obj
}

// 格式化时间
export const formatTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hour = String(d.getHours()).padStart(2, '0')
  const minute = String(d.getMinutes()).padStart(2, '0')
  
  return `${year}-${month}-${day} ${hour}:${minute}`
}

// 获取房间类型中文名
export const getRoomTypeName = (type: string): string => {
  const typeMap = {
    living: '客厅',
    bedroom: '卧室', 
    kitchen: '厨房',
    bathroom: '卫生间',
    study: '书房',
    other: '其他'
  }
  return typeMap[type] || '未知'
}

// 获取设备分类中文名
export const getDeviceCategoryName = (category: string): string => {
  const categoryMap = {
    lighting: '照明',
    security: '安防',
    climate: '环境',
    entertainment: '娱乐', 
    appliances: '家电'
  }
  return categoryMap[category] || '未知'
}

// 计算房间面积
export const calculateRoomArea = (room: Room): number => {
  // 假设 1 单位 = 1 平米
  return Math.round((room.width * room.height) / 100) / 100
}

// 获取设备适用房间
export const getDeviceSuitableRooms = (device: Device, rooms: Room[]): Room[] => {
  return rooms.filter(room => 
    device.suitable.includes(room.name) || 
    device.suitable.includes('全屋')
  )
}