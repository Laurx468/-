import React from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useAppStore } from '../../store'
import { formatPrice, calculateTotalPrice } from '../../utils/helpers'
import './index.scss'

const Quote: React.FC = () => {
  const { rooms, selectedDevices, addOrder } = useAppStore()

  // 计算各项费用
  const deviceTotal = selectedDevices.reduce((sum, device) => 
    sum + device.price * (device.quantity || 1), 0
  )
  const designFee = Math.max(300, rooms.length * 100)
  const installationFee = selectedDevices.reduce((sum, device) => 
    sum + (device.quantity || 1), 0
  ) * 50
  const serviceFee = 200
  const totalPrice = deviceTotal + designFee + installationFee + serviceFee

  const handleModifyPlan = () => {
    Taro.switchTab({ url: '/pages/design/index' })
  }

  const handleSubmitOrder = () => {
    const newOrder = {
      id: `WD${Date.now()}`,
      title: `${rooms.length}房间智能家居方案`,
      status: 'pending' as const,
      statusText: '待确认',
      createTime: new Date().toLocaleString('zh-CN'),
      progress: 0,
      amount: formatPrice(totalPrice)
    }
    
    addOrder(newOrder)
    
    Taro.showToast({
      title: '订单提交成功',
      icon: 'success'
    })
    
    setTimeout(() => {
      Taro.switchTab({ url: '/pages/orders/index' })
    }, 1500)
  }

  const handleBack = () => {
    Taro.navigateBack()
  }

  return (
    <View className='quote-page'>
      {/* 头部导航 */}
      <View className='header'>
        <View className='nav-left' onClick={handleBack}>
          <Text className='back-icon'>←</Text>
          <Text className='back-text'>返回</Text>
        </View>
        <Text className='nav-title'>方案报价</Text>
        <View className='nav-right'></View>
      </View>

      {/* 方案概览 */}
      <View className='overview-card'>
        <Text className='overview-title'>我的智能家居方案</Text>
        <View className='overview-stats'>
          <View className='stat-item'>
            <Text className='stat-number'>{rooms.length}</Text>
            <Text className='stat-label'>房间</Text>
          </View>
          <View className='stat-item'>
            <Text className='stat-number'>{selectedDevices.length}</Text>
            <Text className='stat-label'>设备种类</Text>
          </View>
          <View className='stat-item'>
            <Text className='stat-number'>
              {selectedDevices.reduce((sum, device) => sum + (device.quantity || 1), 0)}
            </Text>
            <Text className='stat-label'>设备总数</Text>
          </View>
        </View>
      </View>

      {/* 设备清单 */}
      {selectedDevices.length > 0 && (
        <View className='devices-list-card'>
          <Text className='card-title'>设备清单</Text>
          <View className='devices-list'>
            {selectedDevices.map(device => (
              <View key={device.id} className='device-item'>
                <View className='device-info'>
                  <Text className='device-icon'>{device.icon}</Text>
                  <View className='device-details'>
                    <Text className='device-name'>{device.name}</Text>
                    <Text className='device-spec'>数量: {device.quantity} | 单价: {formatPrice(device.price)}</Text>
                  </View>
                </View>
                <Text className='device-total'>{formatPrice(device.price * (device.quantity || 1))}</Text>
              </View>
            ))}
          </View>
          <View className='devices-subtotal'>
            <Text className='subtotal-label'>设备小计</Text>
            <Text className='subtotal-amount'>{formatPrice(deviceTotal)}</Text>
          </View>
        </View>
      )}

      {/* 费用明细 */}
      <View className='cost-breakdown-card'>
        <Text className='card-title'>费用明细</Text>
        <View className='cost-list'>
          <View className='cost-item'>
            <View className='cost-info'>
              <Text className='cost-name'>设备费用</Text>
              <Text className='cost-desc'>{selectedDevices.length}种设备</Text>
            </View>
            <Text className='cost-amount'>{formatPrice(deviceTotal)}</Text>
          </View>
          
          <View className='cost-item'>
            <View className='cost-info'>
              <Text className='cost-name'>设计费</Text>
              <Text className='cost-desc'>{rooms.length}个房间</Text>
            </View>
            <Text className='cost-amount'>{formatPrice(designFee)}</Text>
          </View>
          
          <View className='cost-item'>
            <View className='cost-info'>
              <Text className='cost-name'>安装费</Text>
              <Text className='cost-desc'>
                {selectedDevices.reduce((sum, device) => sum + (device.quantity || 1), 0)}个设备
              </Text>
            </View>
            <Text className='cost-amount'>{formatPrice(installationFee)}</Text>
          </View>
          
          <View className='cost-item'>
            <View className='cost-info'>
              <Text className='cost-name'>服务费</Text>
              <Text className='cost-desc'>调试和培训</Text>
            </View>
            <Text className='cost-amount'>{formatPrice(serviceFee)}</Text>
          </View>
        </View>
        
        <View className='total-cost'>
          <Text className='total-label'>方案总价</Text>
          <Text className='total-amount'>{formatPrice(totalPrice)}</Text>
        </View>
      </View>

      {/* 优惠信息 */}
      <View className='promotion-card'>
        <View className='promotion-header'>
          <Text className='promotion-icon'>🎉</Text>
          <Text className='promotion-title'>限时优惠</Text>
        </View>
        <View className='promotion-list'>
          <View className='promotion-item'>
            <Text className='promotion-text'>• 新用户专享9.5折优惠</Text>
          </View>
          <View className='promotion-item'>
            <Text className='promotion-text'>• 免费提供3年质保服务</Text>
          </View>
          <View className='promotion-item'>
            <Text className='promotion-text'>• 赠送智能家居使用培训</Text>
          </View>
        </View>
      </View>

      {/* 底部操作按钮 */}
      <View className='bottom-actions'>
        <View className='action-button secondary' onClick={handleModifyPlan}>
          <Text>修改方案</Text>
        </View>
        <View className='action-button primary' onClick={handleSubmitOrder}>
          <Text>提交订单</Text>
        </View>
      </View>
    </View>
  )
}

export default Quote