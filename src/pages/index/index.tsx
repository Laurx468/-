import React from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { SOLUTIONS } from '../../utils/constants'
import './index.scss'

const Index: React.FC = () => {
  const navigateToDesign = () => {
    Taro.switchTab({ url: '/pages/design/index' })
  }

  const navigateToTemplate = (templateId: number) => {
    Taro.navigateTo({ 
      url: `/pages/template/index?templateId=${templateId}` 
    })
  }

  const navigateToOrders = () => {
    Taro.switchTab({ url: '/pages/orders/index' })
  }

  const navigateToQuote = () => {
    Taro.navigateTo({ url: '/pages/quote/index' })
  }

  return (
    <View className='index-page'>
      {/* 顶部Banner */}
      <View className='hero-banner'>
        <View className='hero-content'>
          <Text className='hero-title'>智慧生活，一触即达</Text>
          <Text className='hero-subtitle'>专业智能家居方案定制</Text>
        </View>
        <View className='hero-decoration'>
          <View className='decoration-circle circle-1' />
          <View className='decoration-circle circle-2' />
          <View className='decoration-circle circle-3' />
        </View>
      </View>

      {/* 快速入口 */}
      <View className='quick-actions'>
        <View className='action-item' onClick={navigateToDesign}>
          <View className='action-icon design-icon'>
            <Text className='icon-text'>✏️</Text>
          </View>
          <Text className='action-text'>开始设计</Text>
        </View>
        <View className='action-item' onClick={navigateToOrders}>
          <View className='action-icon orders-icon'>
            <Text className='icon-text'>📋</Text>
          </View>
          <Text className='action-text'>我的工单</Text>
        </View>
        <View className='action-item' onClick={navigateToQuote}>
          <View className='action-icon quote-icon'>
            <Text className='icon-text'>💰</Text>
          </View>
          <Text className='action-text'>方案报价</Text>
        </View>
      </View>

      {/* 热门智能方案 */}
      <View className='solutions-section'>
        <View className='section-header'>
          <Text className='section-title'>热门智能方案</Text>
          <Text className='section-more'>更多</Text>
        </View>
        <View className='solutions-grid'>
          {SOLUTIONS.map((solution) => (
            <View 
              key={solution.id} 
              className='solution-card'
              onClick={() => navigateToTemplate(solution.template.id)}
            >
              <View className='solution-icon'>
                <Text className='icon-emoji'>{solution.icon}</Text>
              </View>
              <Text className='solution-name'>{solution.name}</Text>
              <Text className='solution-desc'>{solution.description}</Text>
              <Text className='solution-price'>{solution.price}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 服务优势 */}
      <View className='advantages-section'>
        <Text className='section-title'>为什么选择我们</Text>
        <View className='advantages-list'>
          <View className='advantage-item'>
            <Text className='check-icon'>✅</Text>
            <Text>专业设计团队，量身定制</Text>
          </View>
          <View className='advantage-item'>
            <Text className='check-icon'>✅</Text>
            <Text>一站式服务，省心省力</Text>
          </View>
          <View className='advantage-item'>
            <Text className='check-icon'>✅</Text>
            <Text>品牌保障，售后无忧</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index