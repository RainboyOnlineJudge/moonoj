列表控件--显示各种列表,?vueTable

参数

 - 更新地址
 - refresh 事件

如何去设计table的功能


原则:table只负责数据更新

# 接收的参数


# createElement函数的使用

```
  :url 更新的地址
  page
  pageSize
  :columns="columns" 整合的如何使用,显示的数据
  :data="data" 数据
  size="size"  大小
  :with="width" 宽度
  :height="height" 高度
  :border="border" 边界
  :stripe="stripe"
  :showHeader="showHeader" 头部
  :highlightRow="highlightRow"
  :rowClassName="rowClassName"
  :disabledHover="disabledHover"
```
