import React, { useState } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtSearchBar, AtTabs, AtTabsPane } from 'taro-ui'
import Taro from '@tarojs/taro'
import { useAppStore } from '../../store'
import { DEVICES, DEVICE_CATEGORIES } from '../../utils/constants'
import { formatPrice } from '../../utils/helpers'
import './index.scss'

const Devices: React.FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const [currentTab, setCurrentTab] = useState(0)
  
  const { selectedDevices, selectDevice, unselectDevice, updateDeviceQuantity } = useAppStore()

  // 过滤设备
  const filteredDevices = DEVICES.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                         device.features.some(f => f.toLowerCase().includes(searchValue.toLowerCase()))
    
    const selectedCategory = DEVICE_CATEGORIES[currentTab]
    const matchesCategory = selectedCategory.id === 'all' || device.category === selectedCategory.id
    
    return matchesSearch && matchesCategory
  })

  const handleDeviceSelect = (device) => {
    const existing = selectedDevices.find(d => d.id === device.id)
    if (existing) {
      unselectDevice(device.id)
    } else {
      selectDevice(device)
    }
  }

  const handleQuantityChange = (deviceId, change) => {
    const device = selectedDevices.find(d => d.id === deviceId)
    if (device) {
      const newQuantity = (device.quantity || 1) + change
      updateDeviceQuantity(deviceId, Math.max(0, newQuantity))
    }
  }

  const getTotalPrice = () => {
    return selectedDevices.reduce((sum, device) => sum + device.price * (device.quantity || 1), 0)
  }

  const isDeviceSelected = (deviceId) => {
    return selectedDevices.some(d => d.id === deviceId)
  }

  const getSelectedDevice = (deviceId) => {
    return selectedDevices.find(d => d.id === deviceId)
  }

  const handleViewQuote = () => {
    Taro.navigateTo({ url: '/pages/quote/index' })
  }

  return (
    <View className='devices-page'>
      {/* 搜索栏 */}
      <View className='search-section'>
        <AtSearchBar
          value={searchValue}
          onChange={setSearchValue}
          placeholder='搜索设备名称或功能'
          showActionButton={false}
        />
      </View>

      {/* 分类标签 */}
      <AtTabs
        current={currentTab}
        scroll
        tabList={DEVICE_CATEGORIES.map(cat => ({ 
          title: `${cat.icon} ${cat.name}` 
        }))}
        onClick={setCurrentTab}
      >
        <AtTabsPane current={currentTab} index={0}>
          {/* 设备列表 */}
          <ScrollView scrollY className='devices-scroll'>
            <View className='devices-grid'>
              {filteredDevices.map(device => {
                const selected = isDeviceSelected(device.id)
                const selectedDevice = getSelectedDevice(device.id)

                return (
                  <View 
                    key={device.id} 
                    className={`device-card ${selected ? 'selected' : ''}`}
                  >
                    {/* 设备图标和选中状态 */}
                    <View className='device-header'>
                      <View className='device-icon'>
                        <Text className='icon-emoji'>{device.icon}</Text>
                      </View>
                      {selected && (
                        <View className='selected-badge'>
                          <Text className='badge-text'>✓</Text>
                        </View>
                      )}
                    </View>

                    {/* 设备信息 */}
                    <View className='device-info'>
                      <Text className='device-name'>{device.name}</Text>
                      <Text className='device-price'>{formatPrice(device.price)}</Text>
                      
                      {/* 设备特性标签 */}
                      <View className='device-features'>
                        {device.features.slice(0, 2).map((feature, index) => (
                          <View key={index} className='feature-tag'>
                            <Text className='feature-text'>{feature}</Text>
                          </View>
                        ))}
                      </View>

                      {/* 适用房间 */}
                      <View className='device-suitable'>
                        <Text className='suitable-label'>适用：</Text>
                        <Text className='suitable-rooms'>{device.suitable.join('、')}</Text>
                      </View>

                      {/* 功率信息 */}
                      <View className='device-power'>
                        <Text className='power-label'>功率：</Text>
                        <Text className='power-value'>{device.power}</Text>
                      </View>
                    </View>

                    {/* 操作按钮 */}
                    <View className='device-actions'>
                      {!selected ? (
                        <View 
                          className='add-button'
                          onClick={() => handleDeviceSelect(device)}
                        >
                          <Text className='add-text'>+ 添加</Text>
                        </View>
                      ) : (
                        <View className='quantity-control'>
                          <View 
                            className='quantity-btn'
                            onClick={() => handleQuantityChange(device.id, -1)}
                          >
                            <Text className='btn-text'>-</Text>
                          </View>
                          <Text className='quantity-text'>{selectedDevice?.quantity || 1}</Text>
                          <View 
                            className='quantity-btn'
                            onClick={() => handleQuantityChange(device.id, 1)}
                          >
                            <Text className='btn-text'>+</Text>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                )
              })}
            </View>

            {/* 空状态 */}
            {filteredDevices.length === 0 && (
              <View className='empty-state'>
                <Text className='empty-icon'>🔍</Text>
                <Text className='empty-text'>未找到相关设备</Text>
                <Text className='empty-desc'>尝试调整搜索关键词或分类</Text>
              </View>
            )}
          </ScrollView>
        </AtTabsPane>
      </AtTabs>

      {/* 已选设备悬浮球 */}
      {selectedDevices.length > 0 && (
        <View className='selected-devices-float'>
          <View className='float-content'>
            <View className='selected-info'>
              <Text className='selected-count'>已选 {selectedDevices.length} 种设备</Text>
              <Text className='total-price'>{formatPrice(getTotalPrice())}</Text>
            </View>
            <View className='float-action' onClick={handleViewQuote}>
              <Text className='action-text'>查看报价</Text>
              <Text className='action-arrow'>→</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default Devices