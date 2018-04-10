var app = new Vue({
  el: "#app",
  data: {
    checked: false,
    selectArr: [],
    list: [{
        id: 1,
        name: 'iphonex',
        price: 8888,
        count: 1
      },
      {
        id: 2,
        name: 'ipad Pro',
        price: 5888,
        count: 1
      },
      {
        id: 3,
        name: 'MacBook Pro',
        price: 28888,
        count: 1
      },
    ]
  },
  computed: {
    totalPrice: function () {
      var total = 0;
      for (var i = 0; i < this.list.length; i++) {
        var item = this.list[i];
        total += item.price * item.count;
      }
      return total.toString().replace(/\B(?=(\d{3})+$)/g, ',')
    }
  },
  methods: {
    handleReduce: function (index) {
      console.log(this.list[index]);
      if (this.list[index].count === 1) return;
      this.list[index].count--;
    },
    handleAdd: function (index) {
      console.log(this.list[index]);
      this.list[index].count++;
    },
    handleRemove: function (index) {
      console.log(this.list[index]);
      this.list.splice(index, 1)
    }
    // 只是实现全选的js
    // chooseAll: function (event) {
    //   var that = this;
    //   that.selectArr = [];
    //   if (event.currentTarget.checked) {
    //     that.list.forEach(function (item, index) {
    //       that.selectArr.push(index);
    //     });
    //   }
    //   console.log(that.selectArr);
    // }
  }
})