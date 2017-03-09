angular.module("bugcenterApp").controller("Login",["$rootScope","$scope","$http","$state","$interval","$timeout",function($rootScope,$scope,$http,$state,$interval,$timeout){
	$scope.class=$scope.class1='form-group has-success'
	$scope.check=false
	$scope.Lnzz ="/[a-zA-Z0-9]/"
	$scope.updata={}
	//获取cookie
	function getcookie(objname){
		var str = document.cookie.split("; ");
		for(var i = 0;i < str.length;i ++){
			var arr = str[i].split("=");
		if(arr[0] == objname) return unescape(arr[1]);
		}
	}
	//获取账号
	var cookuser = getcookie('username')
	//如果有则自定填写
	if(cookuser){
		$scope.updata.username=cookuser
	}
	$scope.login = function(){
		if($scope.updata){
			if($scope.updata.username==null){
				$scope.Lntext="请输入正确的登录账号!"
				$scope.Motai="Motai1"
				$timeout(function(){
					$scope.Motai="Motai"
				},2000)
			}else if($scope.updata.password==null){
				$scope.Lntext="请输入正确的登录密码!"
				$scope.Motai="Motai1"
				$timeout(function(){
					$scope.Motai="Motai"
				},2000)
			}else{
				//判断是否选择记住账号，如果记住则存到coolie，有效期七天
				if($scope.check==true){
					function setCookie(cookie_name,value,Path,timeout){
						var date = new Date();
						date.setDate(date.getDate()+timeout)
						document.cookie = cookie_name+"="+escape(value)+";path"+"="+Path+
						';expires='+date.toGMTString()
					}
					setCookie('username',$scope.updata.username,'/',7)
				}
				$http({
					url:"http://www.bugcenter.com.cn:1511/users/login",
					method:"post",
					data:$scope.updata
				}).success(function(e){
					$scope.uid=e.uid
					$scope.Lntext="登录成功!"
					$scope.Motai="Motai1"
					$timeout(function(){
						$scope.Motai="Motai"
					},1500)
					$http({
						url:"http://www.bugcenter.com.cn:1511/users/"+$scope.uid,
						method:"get",
					}).success(function(e){
						// console.log(e)
						if(e.charactor==0){
							$state.go("/Sy")
							sessionStorage.setItem("Susername",e.username)
						}
						if(e.charactor==1){
							$state.go("/Lx")
							sessionStorage.setItem("Lusername",e.username)
						}
						if(e.charactor==2){
							$state.go("/Bx")
							sessionStorage.setItem("Busername",e.username)
						}
						if(e.charactor==3){
							$state.go("/Ln")
							sessionStorage.setItem("username",e.username)
						}
					})
					}).error(function() {
						$scope.Lntext="登录失败，请重新登录!"
						$scope.Motai="Motai1"
						$timeout(function(){
							$scope.Motai="Motai"
						},2000)
						$scope.updata.length=0
					});
				}
			}else{
				$scope.Lntext="请完整填写登录信息!"
				$scope.Motai="Motai1"
				$timeout(function(){
					$scope.Motai="Motai"
				},2000)
			}
		}
}])
	
