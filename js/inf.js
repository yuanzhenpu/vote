var inf={
	ajax:function(url,parm,callback){
		//弹框
		var lay;
		if("undefined" == typeof layui){
			lay=parent.layui;
		}else{
			lay=layui;
		}
		$.ajax({
			type: "post",
			dataType: "json",
			traditional: true,
			async: true,//异步请求，不阻塞程序执行
			//加上这句话
			xhrFields: {
				 withCredentials: true
			},
       		crossDomain: true,
//			url: "http://test.sqzht.com/znb/" + url,//测试服务器
//			url: "https://m.sqzht.com/znb/" + url,//正式服务器
//			url: location.origin+ "/znb/" + url,//正式服务器
			url: location.origin+ "/manage/" + url,//正式服务器
			data: parm,
			success: function(result) {
				switch(result.resultscode){
					case "-1":
						lay.layer.msg(result.errorMessage, {icon: 2,time:2000},function(){
							parent.location.href=result.data.url;
						});
						return;
					case "0":
						lay.layer.alert(result.errorMessage);
						return;
				}
				callback(result);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				//绑定失败
				console.error("服务器错误，错误代码:"+textStatus+"，请联系管理员");
			},
		});
	},
	bindCunGuan:function(uid,cgid,cmid){
		//绑定村官
		if(cgid){
			//绑定支农宝村官
			inf.ajax("public/VipUser/bindingVillageofficial",
				{uid:uid,villageofficialuid:cgid},
				function(obj){
					if(obj.resultscode==1){
						//绑定成功！
						layui.layer.alert('绑定村官成功！', {icon: 1, title:'提示'}
							, function(index){
								layui.layer.close(index);
								location.href = "https://m.znbchina.com/fsb/html/shop/app_download.html";
							}
						)
					}else{
						if(obj.errorMessage=="您是村官不能绑定其他村官!"||obj.errorMessage=="您已绑定村官，不能再次绑定!"){
							//绑定失败
							layui.layer.alert(obj.errorMessage, {icon: 2, title:'提示'}
								, function(index){
									layui.layer.close(index);
									location.href = "https://m.znbchina.com/fsb/html/shop/app_download.html";
								}
							)
						}else{
							//绑定失败
							layui.layer.alert(obj.errorMessage, {icon: 2, title:'提示'}
								, function(index){
									layui.layer.close(index);
								}
							)
						}
					}
				}
			)
		}else if(cmid){
			//村民推荐，绑定村民
			//获取推荐人村民的手机号
			inf.ajax("back/VipUser/getVipUserById",
				{id:cmid},
				function(obj){
					if(obj.resultscode==1){
						//查询村民信息成功！
						var cmTel=obj.data.vipUser.username;
						//绑定村民
						inf.ajax("public/VipUser/bindVillageupUid",
							{username:cmTel,uid:uid},
							function(obj){
								if(obj.resultscode==1){
									//绑定村民成功！
									layui.layer.alert("恭喜您，推荐成功！", {icon: 1, title:'提示'}
										,function(index){
											layui.layer.close(index);
											location.href = "https://m.znbchina.com/fsb/html/shop/app_download.html";
										}
									)
								}else{
									//绑定村民失败
									layui.layer.alert(obj.errorMessage, {icon: 2, title:'提示'}
										,function(index){
											layui.layer.close(index);
										}
									)
								}
							}
						)
					}else{
						//查询村民信息失败
						layui.layer.alert(obj.errorMessage, {icon: 2, title:'提示'}
							,function(index){
								layui.layer.close(index);
							}
						)
					}
				}
			)
		}else{
			//不需要绑定村官
			layui.layer.alert("登录成功，但是没有查到村官、村民信息！", {icon: 2, title:'提示'}
				, function(index){
					layui.layer.close(index);
				}
			)
		}
	}
}
