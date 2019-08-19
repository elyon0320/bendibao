// pages/shopList/shopList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  //请求道的商品列表信息
	shopInfo:[],
	//shoplist页数索引    由于页面一加载onload 就调用loadMore()了一次 所以 默认index=0，加载函数 自增加1
	pageIndex:0,
	//页数的店铺数量
	pageSize:20,
	//目录id 默认设为1
	classID:1,
	//定义一个变量(用来判断是否还有更多数据)：
	hasMore:true
  },
/*3.封装方法:加载获取更多*/
loadMore(){
	//如果false(没有更多数据了),就不会执行下面的代码 
	if(!this.data.hasMore) return;
	wx.request({
		url:"https://locally.uieee.com/categories/"+this.data.classID+"/shops",
		data:{
			_limit:this.data.pageSize,
			_page:++this.data.pageIndex
		},
		success:(res)=>{
			// console.log(res);
			//6.每次请求过来的数据 如果直接setData赋值给商品列表 会把之前已经加载的数据覆盖
			// ↑解决方法：所以需要把老的数据 和新请求到的数据 数组拼接(str.concat()) 再赋值给shopInfo
			let newList=this.data.shopInfo.concat(res.data);
			let count = parseInt(res.header['X-Total-Count']);
			  console.log(count);
			let flag = this.data.pageSize * this.data.pageIndex < count;
			console.log(flag);
			this.setData({
				shopInfo:newList,
				hasMore:flag
			})
		}
	})
},
/*点击前往商家详情页*/
goToDetails(){
	wx.navigateTo({
		url:"",
	})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  // console.log(options);
	
	if(options.class){
		//1.根据首页传送过来的参数(参数均存放在options里),设置导航条
		wx.setNavigationBarTitle({
			title:options.title,
		});
	}
	
	//2.把先前index页面 传过来的options里的class,设置到data中（自己新建的classID用来存放）
	this.setData({
		classID:options.class
	})
	
	// 4.调用上面封装好的方法:loadMore(){}
	this.loadMore();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
	console.log("往下拉事件");
	//① 往下拉 刷新所有的列表信息，所以先要把数据设置回默认值
	this.setData({
		shopInfo:[],
		pageIndex:0,
		// pageSize:20,	
		// classID:1,
		hasMore:true
	})
	//②再重新请求一次数据
	this.loadMore();
	//③手动设置将顶部的加载动画 停止 要不然手机端会显示一直在加载
	wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
	console.log("上拉了");
	// 5.上拉触底时 也调用封装好的<加载数据>函数
	this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})