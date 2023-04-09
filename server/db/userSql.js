const User = {
	//查询用户手机号
	queryUserTel( option ){
		
		return 'select * from user where tel = '+option.userTel+'';
			
	},
	queryUserPwd( option ){
		return 'select * from user where (tel = '+option.userTel+') and pwd = '+option.userPwd+'';
	},
	inserData( option ){
		let userTel = option.userTel;
		let userPwd = option.userPwd  || '666666';
		return 'insert into user (tel,pwd,imgUrl,nickName,token) values ("'+userTel+'","'+userPwd+'","1.jpg","1","2")';
	}
}
module.exports = User;