import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Canvas } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { useAppStore } from '../../store'
import { TEMPLATES } from '../../utils/constants'
import { Template } from '../../types'
import './index.scss'

const TemplatePage: React.FC = () => {
  const [template, setTemplate] = useState<Template | null>(null)
  const canvasRef = useRef<any>(null)
  const { loadTemplate } = useAppStore()

  useEffect(() => {
    const instance = getCurrentInstance()
    const templateId = instance.router?.params?.templateId
    
    if (templateId) {
      const foundTemplate = TEMPLATES.find(t => t.id === parseInt(templateId))
      if (foundTemplate) {
        setTemplate(foundTemplate)
      }
    }
  }, [])

  // 绘制模板Canvas
  const drawTemplateCanvas = () => {
    if (!template || !canvasRef.current) return

    const ctx = Taro.createCanvasContext('template-canvas')
    
    // 清空画布
    ctx.clearRect(0, 0, 375, 300)
    
    // 绘制网格
    ctx.setStrokeStyle('#f8f8f8')
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
    if (template.walls) {
      template.walls.forEach(wall => {
        ctx.setStrokeStyle('#666')
        ctx.setLineWidth(wall.thickness || 8)
        ctx.beginPath()
        ctx.moveTo(wall.x1, wall.y1)
        ctx.lineTo(wall.x2, wall.y2)
        ctx.stroke()
      })
    }
    
    // 绘制房间
    if (template.rooms) {
      template.rooms.forEach(room => {
        ctx.setFillStyle('rgba(0, 122, 255, 0.15)')
        ctx.fillRect(room.x, room.y, room.width, room.height)
        
        ctx.setStrokeStyle('#007AFF')
        ctx.setLineWidth(2)
        ctx.strokeRect(room.x, room.y, room.width, room.height)
        
        ctx.setFillStyle('#333')
        ctx.setFontSize(14)
        ctx.setTextAlign('center')
        ctx.fillText(room.name, room.x + room.width/2, room.y + room.height/2)
      })
    }
    
    // 绘制门
    if (template.doors) {
      template.doors.forEach(door => {
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
    }
    
    // 绘制窗户
    if (template.windows) {
      template.windows.forEach(window => {
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
    }
    
    ctx.draw()
  }

  const handleUseTemplate = () => {
    if (template) {
      loadTemplate(template)
      Taro.showToast({
        title: '模板已应用',
        icon: 'success'
      })
      
      // 跳转到设计页面
      setTimeout(() => {
        Taro.switchTab({ url: '/pages/design/index' })
      }, 1500)
    }
  }

  const handleBack = () => {
    Taro.navigateBack()
  }

  useEffect(() => {
    if (template) {
      setTimeout(() => {
        drawTemplateCanvas()
      }, 100)
    }
  }, [template])

  if (!template) {
    return (
      <View className='template-page'>
        <View className='loading'>
          <Text>加载中...</Text>
        </View>
      </View>
    )
  }

  return (
    <View className='template-page'>
      {/* 头部导航 */}
      <View className='header'>
        <View className='nav-left' onClick={handleBack}>
          <Text className='back-icon'>←</Text>
          <Text className='back-text'>返回</Text>
        </View>
        <Text className='nav-title'>方案预览</Text>
        <View className='nav-right' onClick={handleUseTemplate}>
          <Text className='use-text'>使用模板</Text>
        </View>
      </View>

      {/* 模板信息 */}
      <View className='template-info'>
        <Text className='template-name'>{template.name}</Text>
        <Text className='template-size'>建筑面积: {template.size}</Text>
        
        <View className='rooms-info'>
          <Text className='rooms-title'>房间布局:</Text>
          <View className='rooms-tags'>
            {template.rooms.map(room => (
              <View key={room.id} className='room-tag'>
                <Text>{room.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* 户型预览图 */}
      <View className='canvas-container'>
        <View className='canvas-header'>
          <Text className='canvas-title'>户型预览图</Text>
        </View>
        <Canvas
          id='template-canvas'
          canvasId='template-canvas'
          className='template-canvas'
        />
      </View>

      {/* 模板特色 */}
      <View className='template-features'>
        <Text className='features-title'>方案特色</Text>
        <View className='features-list'>
          <View className='feature-item'>
            <Text className='feature-icon'>🏠</Text>
            <Text className='feature-text'>合理布局，空间利用率高</Text>
          </View>
          <View className='feature-item'>
            <Text className='feature-icon'>💡</Text>
            <Text className='feature-text'>智能化程度高，生活便捷</Text>
          </View>
          <View className='feature-item'>
            <Text className='feature-icon'>🔒</Text>
            <Text className='feature-text'>安全可靠，品质保障</Text>
          </View>
        </View>
      </View>

      {/* 底部操作按钮 */}
      <View className='bottom-actions'>
        <View className='action-button secondary' onClick={handleBack}>
          <Text>返回首页</Text>
        </View>
        <View className='action-button primary' onClick={handleUseTemplate}>
          <Text>使用此模板</Text>
        </View>
      </View>
    </View>
  )
}

export default TemplatePage