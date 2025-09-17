@import '~taro-ui/dist/style/index.scss';

// 全局变量
$primary-color: #007AFF;
$success-color: #52c41a;
$warning-color: #faad14;
$error-color: #ff4d4f;
$text-color: #333333;
$text-color-secondary: #666666;
$border-color: #e8e8e8;
$background-color: #f8f9fa;

// 重置样式
* {
  box-sizing: border-box;
}

page {
  background-color: $background-color;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
}

// 通用工具类
.flex {
  display: flex;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-between {
  display: flex;
  justify-content: space-between;
}

.text-center {
  text-align: center;
}

.text-primary {
  color: $primary-color;
}

.text-secondary {
  color: $text-color-secondary;
}

.margin-top {
  margin-top: 32rpx;
}

.margin-bottom {
  margin-bottom: 32rpx;
}

.padding {
  padding: 32rpx;
}