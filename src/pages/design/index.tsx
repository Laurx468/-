import React, { useState, useRef, useEffect } from 'react'
import { View, Text, Canvas } from '@tarojs/components'
import { AtFloatLayout, AtList, AtListItem } from 'taro-ui'
import Taro from '@tarojs/taro'
import { useAppStore } from '../../store'
import { TEMPLATES, BUILDING_TOOLS } from '../../utils/constants'
import { generateId, isPointInRect } from '../../utils/helpers'
import './index.scss'

const Design: React.FC = () => {
  const [isTemplateVisible, setIsTemplateVisible] = useState(false)
  const canvasRef = useRef<any>(null)
  
  const {
    rooms,
    walls,
    doors,
    windows,
    selectedRoom,
    currentTool,
    addRoom,
    addWall,
    addDoor,
    addWindow,
    setSelectedRoom,
    setCurrentTool,
    loadTemplate,
    clearCanvas
  } = useAppStore()

  // 绘制Canvas
  const drawCanvas = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = Taro.createCanvasContext('design-canvas')
    
    // 清空画布
    ctx.clearRect(0, 0, 375, 300)
    
    // 绘制网格
    ctx.setStrokeStyle('#f0f0f0')
    ctx.setLineWidth(0.5)
    for (let i = 0; i <= 375; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, 300)
      ctx.stroke()
    }
    for (let i = 0; i <= 300; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(375, i)
      ctx.stroke()
    }
    
    // 绘制墙壁
    walls.forEach(wall => {
      ctx.setStrokeStyle('#666')
      ctx.setLineWidth(wall.thickness || 8)
      ctx.beginPath()
      ctx.moveTo(wall.x1, wall.y1)
      ctx.lineTo(wall.x2, wall.y2)
      ctx.stroke()
    })
    
    // 绘制房间
    rooms.forEach(room => {
      const isSelected = selectedRoom?.id === room.id
      
      ctx.setFillStyle(isSelected ? 'rgba(0, 122, 255, 0.2)' : 'rgba(0, 122, 255, 0.1)')
      ctx.fillRect(room.x, room.y, room.width, room.height)
      
      ctx.setStrokeStyle(isSelected ? '#007AFF' : '#ccc')
      ctx.setLineWidth(isSelected ? 3 : 2)
      ctx.strokeRect(room.x, room.y, room.width, room.height)
      
      ctx.setFillStyle('#333')
      ctx.setFontSize(14)
      ctx.setTextAlign('center')
      ctx.fillText(room.name, room.x + room.width/2, room.y + room.height/2)
      
      // 绘制设备
      if (room.devices) {
        room.devices.forEach((device, index) => {
          const deviceX = room.x + 10 + (index % 3) * 30
          const deviceY = room.y + 20 + Math.floor(index / 3) * 30
          
          ctx.setFillStyle('#fff')
          ctx.fillRect(deviceX, deviceY, 20, 20)
          ctx.setStrokeStyle('#007AFF')
          ctx.setLineWidth(1)
          ctx.strokeRect(deviceX, deviceY, 20, 20)
          
          ctx.setFontSize(12)
          ctx.fillText(device.icon || '📱', deviceX + 10, deviceY + 15)
        })
      }
    })
    
    // 绘制门
    doors.forEach(door => {
      ctx.setFillStyle('#8B4513')
      ctx.fillRect(door.x, door.y, door.width, door.height)
      
      ctx.setStrokeStyle('#8B4513')
      ctx.setLineWidth(2)
      ctx.beginPath()
      if (door.orientation === 'horizontal') {
        ctx.arc(door.x, door.y + door.height/2, door.width, -Math.PI/2, 0)
      } else {
        ctx.arc(door.x + door.width/2, door.y, door.height, 0, Math.PI/2)
      }
      ctx.stroke()
    })
    
    // 绘制窗户
    windows.forEach(window => {
      ctx.setFillStyle('#87CEEB')
      ctx.fillRect(window.x, window.y, window.width, window.height)
      
      ctx.setStrokeStyle('#4682B4')
      ctx.setLineWidth(2)
      ctx.strokeRect(window.x, window.y, window.width, window.height)
      
      if (window.orientation === 'horizontal') {
        ctx.beginPath()
        ctx.moveTo(window.x + window.width/2, window.y)
        ctx.lineTo(window.x + window.width/2, window.y + window.height)
        ctx.stroke()
      }
    })
    
    ctx.draw()
  }

  const handleCanvasTouch = (e: any) => {
    const { touches } = e
    if (!touches || touches.length === 0) return

    const touch = touches[0]
    const { x, y } = touch

    switch (currentTool) {
      case 'room':
        handleAddRoom(x, y)
        break
      case 'wall':
        handleAddWall(x, y)
        break
      case 'door':
        handleAddDoor(x, y)
        break
      case 'window':
        handleAddWindow(x, y)
        break
    }
  }

  const handleAddRoom = (x: number, y: number) => {
    // 检查是否点击了现有房间
    const clickedRoom = rooms.find(room => 
      isPointInRect({ x, y }, room)
    )

    if (clickedRoom) {
      setSelectedRoom(clickedRoom)
    } else {
      // 创建新房间
      const newRoom = {
        id: generateId('room'),
        name: '新房间',
        type: 'other' as const,
        x: Math.max(0, x - 50),
        y: Math.max(0, y - 40),
        width: 100,
        height: 80,
        devices: []
      }
      addRoom(newRoom)
      setSelectedRoom(newRoom)
    }
  }

  const handleAddWall = (x: number, y: number) => {
    const newWall = {
      id: generateId('wall'),
      x1: Math.max(0, x - 50),
      y1: y,
      x2: Math.max(0, x + 50),
      y2: y,
      thickness: 8
    }
    addWall(newWall)
  }

  const handleAddDoor = (x: number, y: number) => {
    const newDoor = {
      id: generateId('door'),
      x: Math.max(0, x - 15),
      y: Math.max(0, y - 5),
      width: 30,
      height: 10,
      orientation: 'horizontal' as const
    }
    addDoor(newDoor)
  }

  const handleAddWindow = (x: number, y: number) => {
    const newWindow = {
      id: generateId('window'),
      x: Math.max(0, x - 20),
      y: Math.max(0, y - 5),
      width: 40,
      height: 10,
      orientation: 'horizontal' as const
    }
    addWindow(newWindow)
  }

  const selectTemplate = (template: any) => {
    loadTemplate(template)
    setIsTemplateVisible(false)
    Taro.showToast({
      title: '模板已应用',
      icon: 'success'
    })
  }

  const handleSave = () => {
    Taro.showToast({
      title: '保存成功',
      icon: 'success'
    })
  }

  const handleNextStep = () => {
    Taro.switchTab({ url: '/pages/devices/index' })
  }

  useEffect(() => {
    drawCanvas()
  }, [rooms, walls, doors, windows, selectedRoom])

  return (
    <View className='design-page'>
      {/* 工具栏 */}
      <View className='toolbar'>
        <View className='tool-left'>
          <View 
            className='tool-button'
            onClick={() => setIsTemplateVisible(true)}
          >
            <Text className='tool-icon'>📋</Text>
            <Text>模板</Text>
          </View>
        </View>
        
        <View className='tool-center'>
          {BUILDING_TOOLS.slice(0, 4).map(tool => (
            <View
              key={tool.id}
              className={`tool-item ${currentTool === tool.id ? 'active' : ''}`}
              onClick={() => setCurrentTool(tool.id as any)}
            >
              <Text className='tool-icon'>{tool.icon}</Text>
              <Text className='tool-name'>{tool.name}</Text>
            </View>
          ))}
        </View>
        
        <View className='tool-right'>
          <View className='tool-button' onClick={clearCanvas}>
            <Text className='tool-icon'>🗑️</Text>
          </View>
        </View>
      </View>

      {/* Canvas 绘图区 */}
      <View className='canvas-container'>
        <Canvas
          id='design-canvas'
          canvasId='design-canvas'
          className='design-canvas'
          onTouchStart={handleCanvasTouch}
        />
        
        {/* 操作提示 */}
        <View className='canvas-guide'>
          {currentTool === 'room' && <Text>💡 点击画布添加房间，点击房间选中编辑</Text>}
          {currentTool === 'wall' && <Text>🧱 点击画布添加墙壁</Text>}
          {currentTool === 'door' && <Text>🚪 点击画布添加门</Text>}
          {currentTool === 'window' && <Text>🪟 点击画布添加窗户</Text>}
        </View>
      </View>

      {/* 元素统计 */}
      {(rooms.length > 0 || walls.length > 0 || doors.length > 0 || windows.length > 0) && (
        <View className='elements-stats'>
          <Text className='stats-title'>设计元素</Text>
          <View className='stats-grid'>
            {rooms.length > 0 && (
              <View className='stats-item'>
                <Text className='stats-icon'>🏠</Text>
                <Text className='stats-count'>{rooms.length}</Text>
                <Text className='stats-label'>房间</Text>
              </View>
            )}
            {walls.length > 0 && (
              <View className='stats-item'>
                <Text className='stats-icon'>🧱</Text>
                <Text className='stats-count'>{walls.length}</Text>
                <Text className='stats-label'>墙壁</Text>
              </View>
            )}
            {doors.length > 0 && (
              <View className='stats-item'>
                <Text className='stats-icon'>🚪</Text>
                <Text className='stats-count'>{doors.length}</Text>
                <Text className='stats-label'>门</Text>
              </View>
            )}
            {windows.length > 0 && (
              <View className='stats-item'>
                <Text className='stats-icon'>🪟</Text>
                <Text className='stats-count'>{windows.length}</Text>
                <Text className='stats-label'>窗户</Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* 底部操作栏 */}
      <View className='bottom-actions'>
        <View className='action-button secondary' onClick={clearCanvas}>
          <Text className='action-icon'>🗑️</Text>
          <Text>清空</Text>
        </View>
        <View className='action-button secondary' onClick={handleSave}>
          <Text className='action-icon'>💾</Text>
          <Text>保存</Text>
        </View>
        <View className='action-button primary' onClick={handleNextStep}>
          <Text className='action-icon'>➡️</Text>
          <Text>下一步</Text>
        </View>
      </View>

      {/* 模板选择弹窗 */}
      <AtFloatLayout
        isOpened={isTemplateVisible}
        title='选择户型模板'
        onClose={() => setIsTemplateVisible(false)}
      >
        <AtList>
          {TEMPLATES.map(template => (
            <AtListItem
              key={template.id}
              title={template.name}
              note={`${template.size} | ${template.rooms.map(r => r.name).join('、')}`}
              arrow='right'
              onClick={() => selectTemplate(template)}
            />
          ))}
        </AtList>
      </AtFloatLayout>
    </View>
  )
}

export default Design