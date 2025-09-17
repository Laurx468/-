import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { useAppStore } from '../../store'
import { formatTime } from '../../utils/helpers'
import './index.scss'

const Orders: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0)
  const { orders } = useAppStore()
  
  const tabList = [
    { title: '全部工单' },
    { title: '进行中' },
    { title: '已完成' },
    { title: '已取消' }
  ]

  // 过滤工单
  const filteredOrders = orders.filter(order => {
    if (currentTab === 0) return true // 全部
    if (currentTab === 1) return ['pending', 'designing', 'installing'].includes(order.status) // 进行中
    if (currentTab === 2) return order.status === 'completed' // 已完成
    if (currentTab === 3) return order.status === 'cancelled' // 已取消
    return true
  })

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    const colorMap = {
      pending: '#ff9500',
      designing: '#007AFF',
      installing: '#007AFF',
      completed: '#52c41a',
      cancelled: '#ff3b30'
    }
    return colorMap[status] || '#666'
  }

  // 获取进度步骤
  const getProgressSteps = (status: string) => {
    const allSteps = [
      { name: '需求确认', key: 'pending' },
      { name: '方案设计', key: 'designing' },
      { name: '报价确认', key: 'quoted' },
      { name: '施工安装', key: 'installing' },
      { name: '验收完成', key: 'completed' }
    ]
    
    const statusIndex = {
      pending: 0,
      designing: 1,
      quoted: 2,
      installing: 3,
      completed: 4,
      cancelled: -1
    }
    
    const currentIndex = statusIndex[status] || 0
    
    return allSteps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      current: index === currentIndex
    }))
  }

  return (
    <View className='orders-page'>
      {/* Tab切换 */}
      <AtTabs
        current={currentTab}
        tabList={tabList}
        onClick={setCurrentTab}
        className='orders-tabs'
      >
        <AtTabsPane current={currentTab} index={0}>
          <View className='orders-content'>
            {filteredOrders.length > 0 ? (
              <View className='orders-list'>
                {filteredOrders.map(order => (
                  <View key={order.id} className='order-card'>
                    {/* 工单头部 */}
                    <View className='order-header'>
                      <View className='order-info'>
                        <Text className='order-title'>{order.title}</Text>
                        <Text className='order-id'>#{order.id}</Text>
                      </View>
                      <View 
                        className='status-tag'
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        <Text className='status-text'>{order.statusText}</Text>
                      </View>
                    </View>

                    {/* 工单进度 */}
                    <View className='order-progress'>
                      <View className='progress-header'>
                        <Text className='progress-title'>进度跟踪</Text>
                        <Text className='progress-percent'>{order.progress}%</Text>
                      </View>
                      
                      {/* 进度条 */}
                      <View className='progress-bar'>
                        <View 
                          className='progress-fill'
                          style={{ width: `${order.progress}%` }}
                        />
                      </View>
                      
                      {/* 进度步骤 */}
                      <View className='progress-steps'>
                        {getProgressSteps(order.status).map((step, index) => (
                          <View 
                            key={index}
                            className={`progress-step ${step.completed ? 'completed' : ''} ${step.current ? 'current' : ''}`}
                          >
                            <View className='step-dot' />
                            <Text className='step-name'>{step.name}</Text>
                          </View>
                        ))}
                      </View>
                    </View>

                    {/* 工单信息 */}
                    <View className='order-meta'>
                      <View className='meta-row'>
                        <Text className='meta-label'>创建时间</Text>
                        <Text className='meta-value'>{order.createTime}</Text>
                      </View>
                      {order.updateTime && (
                        <View className='meta-row'>
                          <Text className='meta-label'>更新时间</Text>