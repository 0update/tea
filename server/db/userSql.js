const User = {
	//查询用户手机号
	queryUserTel( option ){
		
		return 'select * from user where tel = '+option.userTel+'';
			
	},
	queryUserPwd( option ){
		return 'select * from user where (tel = '+option.userTel+') and pwd = '+option.userPwd+'';
	},
	//新增用户
	inserData( option ){
	    
		let userTel = option.userTel;
		let userPwd = option.userPwd  || '666666';
	    //引入token包
	    let jwt = require('jsonwebtoken');
	    //用户信息
	    let payload = {tel:userTel};
	    //口令
	    let secret = 'JM';
	    //生成token
	    let token = jwt.sign(payload,secret,{
            expiresIn:60
        });   
		return 'insert into user (tel,pwd,imgUrl,nickName,token) values ("'+userTel+'","'+userPwd+'","/images/user.jpeg","'+userTel+'","'+token+'")';
	}
}
module.exports = User;