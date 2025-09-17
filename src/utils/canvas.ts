import { Room, Wall, Door, Window } from '../types'

export class CanvasDrawer {
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!
    this.width = canvas.width
    this.height = canvas.height
  }

  // 清空画布
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  // 绘制网格
  drawGrid(gridSize = 20, color = '#f0f0f0') {
    this.ctx.strokeStyle = color
    this.ctx.lineWidth = 0.5

    // 垂直线
    for (let x = 0; x <= this.width; x += gridSize) {
      this.ctx.beginPath()
      this.ctx.moveTo(x, 0)
      this.ctx.lineTo(x, this.height)
      this.ctx.stroke()
    }

    // 水平线
    for (let y = 0; y <= this.height; y += gridSize) {
      this.ctx.beginPath()
      this.ctx.moveTo(0, y)
      this.ctx.lineTo(this.width, y)
      this.ctx.stroke()
    }
  }

  // 绘制墙壁
  drawWalls(walls: Wall[]) {
    walls.forEach(wall => {
      this.ctx.strokeStyle = '#666'
      this.ctx.lineWidth = wall.thickness || 8
      this.ctx.beginPath()
      this.ctx.moveTo(wall.x1, wall.y1)
      this.ctx.lineTo(wall.x2, wall.y2)
      this.ctx.stroke()
    })
  }

  // 绘制房间
  drawRooms(rooms: Room[], selectedRoom?: Room | null) {
    rooms.forEach(room => {
      const isSelected = selectedRoom?.id === room.id
      
      // 房间填充
      this.ctx.fillStyle = isSelected ? 'rgba(0, 122, 255, 0.2)' : 'rgba(0, 122, 255, 0.1)'
      this.ctx.fillRect(room.x, room.y, room.width, room.height)
      
      // 房间边框
      this.ctx.strokeStyle = isSelected ? '#007AFF' : '#ccc'
      this.ctx.lineWidth = isSelected ? 3 : 2
      this.ctx.strokeRect(room.x, room.y, room.width, room.height)
      
      // 房间标签
      this.ctx.fillStyle = '#333'
      this.ctx.font = '14px Arial'
      this.ctx.textAlign = 'center'
      this.ctx.fillText(room.name, room.x + room.width/2, room.y + room.height/2)
      
      // 绘制设备
      if (room.devices) {
        room.devices.forEach((device, index) => {
          const deviceX = room.x + 10 + (index % 3) * 30
          const deviceY = room.y + 20 + Math.floor(index / 3) * 30
          
          this.ctx.fillStyle = '#fff'
          this.ctx.fillRect(deviceX, deviceY, 20, 20)
          this.ctx.strokeStyle = '#007AFF'
          this.ctx.lineWidth = 1
          this.ctx.strokeRect(deviceX, deviceY, 20, 20)
          
          this.ctx.font = '12px Arial'
          this.ctx.fillText(device.icon || '📱', deviceX + 10, deviceY + 15)
        })
      }
    })
  }

  // 绘制门
  drawDoors(doors: Door[]) {
    doors.forEach(door => {
      this.ctx.fillStyle = '#8B4513'
      this.ctx.fillRect(door.x, door.y, door.width, door.height)
      
      // 绘制门弧线
      this.ctx.strokeStyle = '#8B4513'
      this.ctx.lineWidth = 2
      this.ctx.beginPath()
      if (door.orientation === 'horizontal') {
        this.ctx.arc(door.x, door.y + door.height/2, door.width, -Math.PI/2, 0)
      } else {
        this.ctx.arc(door.x + door.width/2, door.y, door.height, 0, Math.PI/2)
      }
      this.ctx.stroke()
    })
  }

  // 绘制窗户
  drawWindows(windows: Window[]) {
    windows.forEach(window => {
      this.ctx.fillStyle = '#87CEEB'
      this.ctx.fillRect(window.x, window.y, window.width, window.height)
      
      // 绘制窗框
      this.ctx.strokeStyle = '#4682B4'
      this.ctx.lineWidth = 2
      this.ctx.strokeRect(window.x, window.y, window.width, window.height)
      
      // 绘制窗格
      if (window.orientation === 'horizontal') {
        this.ctx.beginPath()
        this.ctx.moveTo(window.x + window.width/2, window.y)
        this.ctx.lineTo(window.x + window.width/2, window.y + window.height)
        this.ctx.stroke()
      } else {
        this.ctx.beginPath()
        this.ctx.moveTo(window.x, window.y + window.height/2)
        this.ctx.lineTo(window.x + window.width, window.y + window.height/2)
        this.ctx.stroke()
      }
    })
  }

  // 完整绘制方法
  draw(data: {
    rooms: Room[]
    walls: Wall[]
    doors: Door[]
    windows: Window[]
    selectedRoom?: Room | null
  }) {
    this.clear()
    this.drawGrid()
    this.drawWalls(data.walls)
    this.drawRooms(data.rooms, data.selectedRoom)
    this.drawDoors(data.doors)
    this.drawWindows(data.windows)
  }
}