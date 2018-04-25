Vue.component('my-conpoent', {
  props: {
    // 必须是字符串类型
    propA: Number,
    // 必须是字符串或者数字类型
    propB: [String, Number],
    //布尔值如果没有定义默认就是true
    poopC: {
      type: Boolean,
      defalt: true
    },
    // 如果是数组或者对象，默认值必须是一个函数来返回
    propE: {
      type: Array,
      defalt: function () {
        return [];
      }
    },
    // 自定义一个验证函数
    propE: {
      validator: function (value) {
        return value > 10;
      }
    }
  }
})