    //  广德的post请求
    setTimeout(function () {
      const param = {
        "platformId": vue.Email,
        "pwd": vue.password,
        "loginChannel": 3
      }
      vue.function.server.post(vue.function.server.postLoginWebUrl, null, param, function (res) {
        if (!res) {
          vue.$refs.loading.hide()
        }
        // console.log('postOauthLoginUrl: ', res)
        if (res.token == -1400) {
          // 密码错误
          vue.$refs.loading.hide()
          vue.function.toastr.error(vue.label.msg1)
        } else if (res.token == -1302) {
          // 邮箱未激活
          vue.$refs.loading.hide()
          vue.function.toastr.error(vue.label.msg4)
        } else if (res.token == -1404) {
          // 无用户
          vue.$refs.loading.hide()
          vue.function.toastr.error(vue.label.msg5)
        } else {
          vue.$refs.loading.hide()
          // 登陆成功 存 cookie
          vue.function.cookie.setCookie('account', res.account, 24)
          vue.function.cookie.setCookie('token', res.token, 24)
          vue.function.cookie.setCookie('vpnId', res.vpnId, 24)
          // 设置已经登陆
          vue.root.login = true;
          // 显示登录成功信息登陆成功
          vue.function.toastr.success(vue.label.msg6)
          // setTimeout(function() {
          // 跳转配置页面
          if (vue.$route.query['from'] == 'registe') {
            vue.$router.push({
              name: 'manual',
              query: {
                from: 'registe'
              }
            })
          } else {
            vue.$router.push({
              name: 'manual'
            })
          }
          // }, 100)
        }
      })
    }, config.loadingTimeout)



    //  我的axiso请求
    setTimeout(function () {
      const param = {
        "platformId": vue.Email,
        "pwd": vue.password,
        "loginChannel": 3
      }
      that.$http.post(vue.function.server.postLoginWebUrl, param).then(function (res) {
        console.log(res)
        // return
        if (!res) {
          vue.$refs.loading.hide()
        }
        console.log('postOauthLoginUrl: ', res)
        if (res.data.data.token == -1400) {
          // 密码错误
          vue.$refs.loading.hide()
          vue.function.toastr.error(vue.label.msg1)
        } else if (res.data.data.token == -1302) {
          // 邮箱未激活
          vue.$refs.loading.hide()
          vue.function.toastr.error(vue.label.msg4)
        } else if (res.data.data.token == -1404) {
          // 无用户
          vue.$refs.loading.hide()
          vue.function.toastr.error(vue.label.msg5)
        } else {
          vue.$refs.loading.hide()
          // 登陆成功 存 cookie
          vue.function.cookie.setCookie('account', res.data.data.account, 24)
          vue.function.cookie.setCookie('token', res.data.data.token, 24)
          vue.function.cookie.setCookie('vpnId', res.data.data.vpnId, 24)
          // 设置已经登陆
          vue.root.login = true;
          // 显示登录成功信息登陆成功
          vue.function.toastr.success(vue.label.msg6)
          // setTimeout(function() {
          // 跳转配置页面
          if (vue.$route.query['from'] == 'registe') {
            vue.$router.push({
              name: 'manual',
              query: {
                from: 'registe'
              }
            })
          } else {
            vue.$router.push({
              name: 'manual'
            })
          }
        }
      }).catch(function (error) {
        // vue.$refs.loading.hide()
      })

    }, config.loadingTimeout)


    //封装的axiso请求


    post: function (url, header, params, callback, special) {
        console.log(vue)
        vue.$http.axios({
          url: url,
          method: 'POST',
          transformRequest: function (request) {
            if (header) {
              header.forEach(function (element, index) {
                request.setRequestHeader(element[0], element[1]);
              });
            }
          },
          params: params,
          timeout: 15000,
          headers: {
            "Content-type": 'application/json'
          },
          responseType: 'json'
        }).then((data) => {
          // console.log(data)
          // 调用成功的场合
          // 执行callback
          if (special) {
            // 特殊情况下
            // 不做处理 正常返回
            callback(data);
          } else if (data.status === 200) {
            callback(data.data);
          } else if (data.status === 444) {
            toastr.warning('请勿重复提交当前页面')
            callback(false)
          } else if (data.status === 401) {
            callback(false)
            toastr.error('登录过期，请重新登录')
            setTimeout(function () {
              // 返回主页
              location.href = '';
              // 删除cookie
              cookie.delCookie('account')
              cookie.delCookie('token')
              cookie.delCookie('vpnId')
            }, 1500)
          } else if (data.status === 4014) {
            callback(false)
            toastr.error('token失效，请重新登陆')
            // 删除cookie
            cookie.delCookie('account')
            cookie.delCookie('token')
            cookie.delCookie('vpnId')
            // 返回主页
            location.href = '';
          } else if (data.status === 400) {
            callback(false)
            toastr.error(data.msg)
            setTimeout(function () {
              // 返回主页
              location.href = '';
            }, 1500)
          } else {
            callback(false)
            // 错误的场合报错
            console.log(data.status, data.msg)
            // toastr.error(data.msg)
          }
        }).catch(function (err) {
          console.log(err.message);
        })
      },



      // 调用axiso请求
      that.function.server.post(vue.function.server.postLoginWebUrl, null, param, _ => console.log(1));