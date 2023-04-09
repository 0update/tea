var express = require('express');
var router = express.Router();
var connection=require('../db/sql');
var user=require('../db/userSql');
var QcloudSms = require("qcloudsms_js");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//修改密码
router.post('/api/recovery',function(req,res,next){
	
	let params = {
		userTel : req.body.phone,
		userPwd : req.body.pwd
	}
	
	//查询用户是否存在
	connection.query( user.queryUserTel( params ) ,function(error,results){
		//某一条记录数id
		let id = results[0].id;
		let pwd = results[0].pwd;
		console.log(  `update user set pwd = replace(pwd,${pwd},${params.userPwd}) where id = ${id}` )
		connection.query(`update user set pwd = replace(pwd,'${pwd}','${params.userPwd}') where id = ${id}`,function(err,result){
			res.send({
				code:200,
				data:{
					success:true,
					msg:'修改成功'
				}
			})
		})
	})
	
	
})
//修改密码前查询用户是否存在
router.post('/api/selectUser',function(req,res,next){
	
	let params = {
		userTel : req.body.phone
	}
	//查询用户是否存在
	connection.query( user.queryUserTel( params ) ,function(error,results){
		if( results.length > 0 ){
			res.send({
				code:200,
				data:{
					success:true
				}
			})
		}else{
			res.send({
				code:0,
				data:{
					success:false,
					msg:'此用户不存在'
				}
			})
		}
	})
	
})
//注册一个用户
router.post('/api/register',function(req,res,next){
	let params = {
		userTel : req.body.phone,
		userPwd : req.body.pwd
	}
	//查询用户是否存在
	connection.query( user.queryUserTel( params ) ,function(error,results){
		if(error) throw error;
		//用户存在
		if( results.length > 0 ){
			res.send({
				code:200,
				data:{
					success:true,
					msg:'登录成功',
					data:results[0]
				}
			})
		}else{
			//不存在，新增一条数据
			connection.query( user.inserData ( params ),function(err,result){
				//验证插入是否成功
				connection.query( user.queryUserTel( params ) , function(e,r){
					res.send({
						code:200,
						data:{
							success:true,
							msg:'注册成功',
							data:r[0]
						}
					})
				})
			})
		}
	})
	
})


//增加一个用户
router.post('/api/addUser',function(req,res,next){
	
	let params = {
		userTel : req.body.phone
	}
	//查询用户是否存在
	connection.query( user.queryUserTel( params ) ,function(error,results){
		if(error) throw error;
		//用户存在
		if( results.length > 0 ){
			res.send({
				code:200,
				data:{
					success:true,
					msg:'登录成功',
					data:results[0]
				}
			})
		}else{
			//不存在，新增一条数据
			connection.query( user.inserData ( params ),function(err,result){
				connection.query( user.queryUserTel( params ) , function(e,r){
					res.send({
						code:200,
						data:{
							success:true,
							msg:'登录成功',
							data:r[0]
						}
					})
				})
			})
		}
	})
})

// router.post('/api/addUser',function(req,res,next){
// 	let params={
// 		userTel:req.body.phone,
// 	}	
// 	//查询用户手机号是否存在
// 	connection.query( user.queryUserTel(params) ,function(error,results){
// 		if(error) throw error;
// 		//手机号存在 
// 		alert(1)
// 		if( results.length > 0 ){
// 				res.send({
// 					code:200,
// 					data:{
// 						success:true,
// 						msg:'登录成功',
// 						data:result[0]
// 					}
// 				})			
// 		}else{
// 			//新增一个用户
// 			connection.query( user.inserData ( params ),function(err,result){
// 				connection.query( user.queryUserTel( params ) , function(e,r){
// 					res.send({
// 						code:200,
// 						data:{
// 							success:true,
// 							msg:'登录成功',
// 							data:r[0]
// 						}
// 					})
// 				})
// 			})						
// 		}
// 	})
// })

//验证码
router.post('/api/code',function(req,res,next){
	console.log('11');
	let tel = req.body.phone;
	
	// 短信应用SDK AppID
	var appid = 1400187558;  // SDK AppID是1400开头
	
	// 短信应用SDK AppKey
	var appkey = "dc9dc3391896235ddc2325685047edc7";
	
	// 需要发送短信的手机号码
	var phoneNumbers = [tel];
	
	// 短信模板ID，需要在短信应用中申请
	var templateId = 285590;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
	
	// 签名
	var smsSign = "三人行慕课";  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`
	
	// 实例化QcloudSms
	var qcloudsms = QcloudSms(appid, appkey);
	
	// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
	function callback(err, ress, resData) {
	    if (err) {
	        console.log("err: ", err);
	    } else {
			res.send({
				code:200,
				data:{
					success:true,
					data:ress.req.body.params[0]
				}
			})
	    }
	}
	
	var ssender = qcloudsms.SmsSingleSender();
	//这个变量：params 就是往手机上，发送的短信
	var params = [  Math.floor( Math.random()*(9999-1000))+1000   ];
	ssender.sendWithParam(86, phoneNumbers[0], templateId,
	  params, smsSign, "", "", callback);  // 签名参数不能为空串
	
})
//登陆
router.post('/api/login',function(req,res,next){
	//后端要接收前端传递过来的值
	let params = {
		userTel : req.body.userTel,
		userPwd : req.body.userPwd
	};
	
	//查询用户手机号是否存在
	connection.query( user.queryUserTel(params) ,function(error,results){
		//手机号存在 
		if( results.length > 0 ){
			connection.query( user.queryUserPwd( params ) ,function(err,result){
				if(  result.length > 0 ){
					//手机号和密码都对
					res.send({
						code:200,
						data:{
							success:true,
							msg:'登录成功',
							data:result[0]
						}
					})
				}else{
					//密码不对
					res.send({
						code:302,
						data:{
							success:false,
							msg:'密码不正确'
						}
					})
				}
			})
			
		}else{
			//不存在
			res.send({
				code:301,
				data:{
					success:false,
					msg:'手机号不存在'
				}
			})
		}
		
	})
})
//搜索
router.get('/api/goods/shopList',function(req,res,next){
	// console.log(11)
	let searchName=req.query.searchName;
	connection.query('select * from goods_list where name like "%'+searchName+'%"',function(error,results){
		res.send({
			code:0,
			//返回data
			data:results
		})
	})
});
//首页铁观音的数据
router.get('/api/index_list/2/data/1', function(req, res, next) {
	res.send({
		data:{			
		msg:'暂无数据'
		}
	})
	// res.send({
	// 	// 状态码
	// 	code:0,
	// 	data:[
	// 		{
	// 			id:1,
	// 			type:'adList',
	// 			data:[
	// 				{
	// 					id:1,
	// 					imgUrl:'./images/tgy.jpeg'
	// 				},
	// 				{
	// 					id:2,
	// 					imgUrl:'./images/tgy.jpeg'
	// 				}
	// 			]
	// 		},
	// 		{
	// 			id:1,
	// 			type:'iconsList',
	// 			data:[
	// 				{
	// 					id:1,
	// 					title:'自饮茶',
	// 					imgUrl:'./images/icons1.png'
	// 				},
	// 				{
	// 					id:2,
	// 					title:'茶具',
	// 					imgUrl:'./images/icons2.png'
	// 				},
	// 				{
	// 					id:3,
	// 					title:'茶礼盒',
	// 					imgUrl:'./images/icons3.png'
	// 				},
	// 				{
	// 					id:4,
	// 					title:'领福利',
	// 					imgUrl:'./images/icons4.png'
	// 				},
	// 				{
	// 					id:5,
	// 					title:'官方验证',
	// 					imgUrl:'./images/icons5.png'
	// 				}
	// 			]
	// 		},
	// 		{
	// 			id:3,
	// 			type:'likeList',
	// 			data:[
	// 				{
	// 					id:1,
	// 					imgUrl:'./images/like.jpeg',
	// 					name:'建盏茶具套装 红色芝麻毫 12件套',
	// 					price:299
	// 				},
	// 				{
	// 					id:2,
	// 					imgUrl:'./images/like.jpeg',
	// 					name:'建盏茶具套装 红色芝麻毫 12件套',
	// 					price:299
	// 				},
	// 				{
	// 					id:3,
	// 					imgUrl:'./images/like3.jpeg',
	// 					name:'建盏茶具套装 红色芝麻毫 12件套',
	// 					price:299
	// 				},
	// 				{
	// 					id:4,
	// 					imgUrl:'./images/like.jpeg',
	// 					name:'建盏茶具套装 红色芝麻毫 12件套',
	// 					price:299
	// 				},
	// 				{
	// 					id:5,
	// 					imgUrl:'./images/like.jpeg',
	// 					name:'建盏茶具套装 红色芝麻毫 12件套',
	// 					price:299
	// 				},
	// 				{
	// 					id:6,
	// 					imgUrl:'./images/like.jpeg',
	// 					name:'建盏茶具套装 红色芝麻毫 12件套',
	// 					price:299
	// 				},
	// 				{
	// 					id:7,
	// 					imgUrl:'./images/like.jpeg',
	// 					name:'建盏茶具套装 红色芝麻毫 12件套',
	// 					price:299
	// 				}
	// 			]
	// 		}
			
	// 	]
	// })

})
//首页大红袍的数据
router.get('/api/index_list/1/data/1', function(req, res, next) {
	res.send({
		data:{			
		msg:'暂无数据'
		}
	})
	// res.send({
	// 	code:0,
	// 	data:[
	// 		{
	// 			id:1,
	// 			type:'adList',
	// 			data:[
	// 				{
	// 					id:1,
	// 					imgUrl:'./images/dhp.jpeg'
	// 				},
	// 				{
	// 					id:2,
	// 					imgUrl:'./images/dhp.jpeg'
	// 				}
	// 			]
	// 		},
	// 		{
	// 			id:2,
	// 			type:'likeList',
	// 			data:[
	// 				{
	// 					id:1,
	// 					imgUrl:'./images/like.jpeg',
	// 					name:'建盏茶具套装 红色芝麻毫 12件套',
	// 					price:299
	// 				},
	// 				{
	// 					id:2,
	// 					imgUrl:'./images/like.jpeg',
	// 					name:'建盏茶具套装 红色芝麻毫 12件套',
	// 					price:299
	// 				},
	// 				{
	// 					id:3,
	// 					imgUrl:'./images/like.jpeg',
	// 					name:'建盏茶具套装 红色芝麻毫 12件套',
	// 					price:299
	// 				}
	// 			]
	// 		}			
	// 	]
	// })
})
//首页推荐的数据
router.get('/api/index_list/0/data/1', function(req, res, next) {
	res.send({
		code:0,
		data:{
			topBar:[
				{id:0,label:'推荐'},
				{id:1,label:'美妆'},
				{id:2,label:'电器'},
				{id:3,label:'服饰'},
				{id:4,label:'手机'},
				{id:5,label:'奢品'},
				{id:6,label:'洗护'},
			],
			data:[
				//swiper
				{
					id:0,
					type:'swiperList',
					data:[
						{id:0,imgUrl:'./images/a.jpg'},
						{id:1,imgUrl:'./images/b.png'},
						{id:3,imgUrl:'./images/swiper3.jpeg'}
					]
				},
				//icons
				{
					id:1,
					type:'iconsList',
					data:[
						{
							id:1,
							title:'自饮茶',
							imgUrl:'./images/icons1.png'
						},
						{
							id:2,
							title:'茶具',
							imgUrl:'./images/icons2.png'
						},
						{
							id:3,
							title:'送礼物',
							imgUrl:'./images/icons3.png'
						},
						{
							id:4,
							title:'领福利',
							imgUrl:'./images/icons4.png'
						},
						{
							id:5,
							title:'官方验证',
							imgUrl:'./images/icons5.png'
						}
					]
				},
				//爆款推荐
				{
					id:3,
					type:'recommendList',
					data:[
						{
							id:1,
							name:'龙井1號铁罐250g',
							content:'鲜爽甘醇 口粮首选',
							price:'68',
							imgUrl:'./images/recommend.jpeg'
						},
						{
							id:2,
							name:'龙井1號铁罐250g',
							content:'鲜爽甘醇 口粮首选',
							price:'68',
							imgUrl:'./images/recommend.jpeg'
						}
					]
				},
				//猜你喜欢
				{
					id:4,
					type:'likeList',
					data:[
						{
							id:1,
							imgUrl:'./images/goods1.jpg',
							name:'赛事茶-第三届武夷',
							price:299
						},
						{
							id:2,
							imgUrl:'./images/goods3.jpg',
							name:'明前春茶 绿茶',
							price:299
						},
						{
							id:3,
							imgUrl:'./images/goods4.jpg',
							name:'绿茶 远致龙井三号 150g',
							price:499
						},			
						{
							id:4,
							imgUrl:'./images/like.jpeg',
							name:'茶具',
							price:199
						},
	
					]
				}
				
			]
		}
	})
});
//分类的接口
router.get('/api/goods/list',function(req,res,next){
	
	res.send({
		code:0,
		data:[
			{
				//一级
				id:0,
				name:'推荐',
				data:[
					{
						//二级
						id:0,
						name:'推荐',
						list:[
						//三级
							{
								id:0,
								name:'铁观音',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:1,
								name:'功夫茶具',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:3,
								name:'茶具电器',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:4,
								name:'紫砂壶',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:5,
								name:'龙井',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:6,
								name:'武夷岩茶',
								imgUrl:'./images/list1.jpeg'
							}
						]
					}
				]
			},
			{
				//一级
				id:1,
				name:'绿茶',
				data:[
					{
						//二级
						id:0,
						name:'绿茶',
						list:[
						//三级
							{
								id:0,
								name:'龙井',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:1,
								name:'碧螺春',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:3,
								name:'雀舌',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:4,
								name:'安吉白茶',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:5,
								name:'六安瓜片',
								imgUrl:'./images/list1.jpeg'
							}
						]
					}
				]
			},
			{
				//一级
				id:2,
				name:'乌龙',
				data:[
					{
						//二级
						id:0,
						name:'乌龙',
						list:[
						//三级
							{
								id:0,
								name:'龙井',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:1,
								name:'碧螺春',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:3,
								name:'雀舌',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:4,
								name:'安吉白茶',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:5,
								name:'六安瓜片',
								imgUrl:'./images/list1.jpeg'
							}
						]
					}
				]
			},
			{
				//一级
				id:3,
				name:'红茶',
				data:[
					{
						//二级
						id:0,
						name:'红茶',
						list:[
						//三级
							{
								id:0,
								name:'龙井',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:1,
								name:'碧螺春',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:3,
								name:'雀舌',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:4,
								name:'安吉白茶',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:5,
								name:'六安瓜片',
								imgUrl:'./images/list1.jpeg'
							}
						]
					}
				]
			},
			{
				//一级
				id:4,
				name:'白茶',
				data:[
					{
						//二级
						id:0,
						name:'白茶',
						list:[
						//三级
							{
								id:0,
								name:'龙井',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:1,
								name:'碧螺春',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:3,
								name:'雀舌',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:4,
								name:'安吉白茶',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:5,
								name:'六安瓜片',
								imgUrl:'./images/list1.jpeg'
							}
						]
					}
				]
			},
			{
				//一级
				id:5,
				name:'普洱',
				data:[
					{
						//二级
						id:0,
						name:'普洱',
						list:[
						//三级
							{
								id:0,
								name:'龙井',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:1,
								name:'碧螺春',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:3,
								name:'雀舌',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:4,
								name:'安吉白茶',
								imgUrl:'./images/list1.jpeg'
							},
							{
								id:5,
								name:'六安瓜片',
								imgUrl:'./images/list1.jpeg'
							}
						]
					}
				]
			}
			
		]
	})
		
})
//查看商品id接口
router.get('/api/goods/id',function(req,res,next){
	let id = req.query.id;
	connection.query('select * from goods_list where id='+id+'',function(error,results){
		if( error ) throw error;
		
		res.json({
			code:0,
			data:results[0],			
		})
		
	})
})
module.exports = router;
