
angular.module("bugcenterApp").controller("Ln",["$state","$rootScope","$scope","$http","$interval","$timeout",function($state,$rootScope,$scope,$http,$interval,$timeout){
	$scope.options = {
    height: 300,
    focus: true,
    airMode: false,
    toolbar: [
            ['fontclr', ['color']],
            ['fontface', ['fontname']],
            ['textsize', ['fontsize']],
           
        ]
  };
	$scope.dataname=["Ui设计","前端","后台"]
	$scope.frequency=["偶尔","经常"]
	$scope.importance =["重要","中等","一般"]
	$scope.jinc="偶尔"
	$scope.imp = "重要"
	$scope.Jue=["Ui设计","前端","后台"]
	$scope.Fabu="Fabu"
	$scope.Users = "lnn"
	$scope.Motai="Motai"
	$scope.userName = []
	$scope.userName1 = []
	//默认已指派
	$scope.status =0
	$scope.FabuLn = function(){
		$scope.Fabu="Fabu1"
	}
	//声明空对象
	$scope.uesrifm = {}
	//判断bug分类（ui设计、前端、后台）
	$scope.fn = function(index){
		$scope.uesrifm.classify=index
		$http({
			url:"http://www.bugcenter.com.cn:1511/users",
			method:"get",
		}).success(function(e){
			if(index==0){
				$scope.userName.length=0
				for(var i =0;i<e.length;i++){
					if(e[i].charactor==0){
						$scope.userName.push(e[i].username)
						$scope.Users = $scope.userName[0]
					}
				}
			}else if(index==1){
				$scope.userName.length=0
				for(var i =0;i<e.length;i++){
					if(e[i].charactor==1){
						$scope.userName.push(e[i].username)
						$scope.Users = $scope.userName[0]
					}
				}
			}else if(index==2){
				$scope.userName.length=0
				for(var i =0;i<e.length;i++){
					if(e[i].charactor==2){
						$scope.userName.push(e[i].username)
						$scope.Users = $scope.userName[0]
					}
				}
			}
		})
	}
	//未关闭
	$scope.buglist = []
	//未处理
	$scope.buglist1 = []
	//已关闭
	$scope.buglist2 = []
	//点击发布判断bug频率（偶尔、经常）
	$scope.Submit = function(){
		if($scope.jinc=="偶尔"){
			$scope.uesrifm.frequency=0
		}else if($scope.jinc=="经常"){
			$scope.uesrifm.frequency=1
		}
		//判断bug重要性（重要、中等、一般）
		if($scope.imp=="重要"){
			$scope.uesrifm.importance =0
		}else if($scope.imp=="中等"){
			$scope.uesrifm.importance =1
		}else if($scope.imp=="一般"){
			$scope.uesrifm.importance =2
		}
		//存bug简介到$scope.uesrifm.summary
		$scope.uesrifm.summary=$scope.Textarea
		//存bug详情到$scope.uesrifm.description
		$scope.uesrifm.description=$scope.text1
		//获取当前时间 
		var mydate = new Date()
		var Year = mydate.getFullYear()
		var month = mydate.getMonth()+1
		var day = mydate.getDate()
		var Hous = mydate.getHours()
		var Min = mydate.getMinutes()
		var Se = mydate.getSeconds()
		var Mydate = Year+'-'+month+'-'+day+' '+Hous+':'+Min+':'+Se
		//存当前时间到$scope.uesrifm.date
		$scope.uesrifm.date =Mydate
		//获取存bug指向（即bug发布给谁） 
		$scope.uesrifm.to =$scope.Users
		//默认存bug已指派
		$scope.uesrifm.status=$scope.status 
		//存bug发布人
		$scope.uesrifm.from =sessionStorage.getItem("username")
		//执行$http,发布bug
		if($scope.uesrifm.classify==null){
			$scope.Lntext="请选择Bug错误分类!"
			$scope.Motai="Motai1"
			$timeout(function(){
				$scope.Motai="Motai"
			},2000)
		}else if($scope.uesrifm.summary==null){
			$scope.Lntext="请填写此Bug简介!"
			$scope.Motai="Motai1"
			$timeout(function(){
				$scope.Motai="Motai"
			},2000)
		}else if($scope.uesrifm.description==null){
			$scope.Lntext="请填写此Bug详情!"
			$scope.Motai="Motai1"
			$timeout(function(){
				$scope.Motai="Motai"
			},2000)
		}else{
			$http({
				url:"http://www.bugcenter.com.cn:1511/item",
				method:"post",
				data:$scope.uesrifm
			}).success(function(e){
				$scope.Lntext="发布成功!"
				$scope.Motai="Motai1"
				$timeout(function(){
					$scope.Motai="Motai"
				},1500)
				$scope.Fabu="Fabu"
				$scope.jinc="偶尔"
				$scope.imp="重要"
				$scope.Textarea=""
				$scope.text1=""
				$scope.buglist1.push(e)
			})
		}
		
	}
	//存放图表数据
	$scope.tudata = []
	$scope.tudata1 = []
	$scope.tudata2 = []
	//获取所有用户
	$http({
		url:"http://www.bugcenter.com.cn:1511/users",
		method:"get",
	}).success(function(e){
		// 过滤测试人员获取所有其他用户
		for(var i =0;i<e.length;i++){
			if(e[i].charactor!=3){
				$scope.userName.push(e[i].username)
				$scope.userName1.push(e[i].username)
			}
		}
		$http({
			url:"http://www.bugcenter.com.cn:1511/item",
			method:"get",
			// params:{"to":$scope.userName}
		}).success(function(e){
			for(var i = 0;i<e.length;i++){
				if(e[i].importance==0||e[i].importance=="重要"){
					$scope.tudata.push(e[i])
				}
				if(e[i].importance==1||e[i].importance=="中等"){
					$scope.tudata1.push(e[i])
				}
				if(e[i].importance==2||e[i].importance=="一般"){
					$scope.tudata2.push(e[i])
				}
				if(e[i].status==1){
					if(e[i].importance==0){
						e[i].importance="重要"
					}
					if(e[i].importance==1){
						e[i].importance="中等"
					}
					if(e[i].importance==2){
						e[i].importance="一般"
					}

					$scope.bugtext=e[i].description
					$scope.buglist.push(e[i])

				}else if(e[i].status==0){
					if(e[i].importance==0){
						e[i].importance="重要"
					}
					if(e[i].importance==1){
						e[i].importance="中等"
					}
					if(e[i].importance==2){
						e[i].importance="一般"
					}
					$scope.myHtml=$scope.bugtext1=e[i].description
					$scope.buglist1.push(e[i])
				}else if(e[i].status==2){
					if(e[i].importance==0){
						e[i].importance="重要"
					}
					if(e[i].importance==1){
						e[i].importance="中等"
					}
					if(e[i].importance==2){
						e[i].importance="一般"
					}
					$scope.myHtml=$scope.bugtext2=e[i].description
					$scope.buglist2.push(e[i])
				}
			}
			//图表信息
			$scope.labels = ['重要','中等','一般']
			// $scope.series = ['重要', '中等','一般'];
			$scope.data = [$scope.tudata.length,$scope.tudata1.length,$scope.tudata2.length];
			$scope.onClick = function (points, evt) {
			    console.log(points, evt);
			};

			  // Simulate async data update
			$timeout(function () {
				$scope.labels = ['一般','中等','重要']
			    $scope.data = [$scope.tudata2.length,$scope.tudata1.length,$scope.tudata.length];
			}, 3000);
		})
			
	})
	$scope.bugguanbi="bugbutton1",
	$scope.gunabi ="确认关闭"
	$scope.bugg=false
	$scope.Fnout = function(e){
		$http({
			url:"http://www.bugcenter.com.cn:1511/item/"+e.id,
			method:"put",
			data:{"status":2}
		}).success(function(){
			$scope.Lntext="已关闭!"
			$scope.Motai="Motai1"
			$timeout(function(){
				$scope.Motai="Motai"
			},1500)
			console.log(e)
			$scope.buglist.splice($scope.buglist.indexOf(e),1)
			$scope.buglist2.push(e)
			console.log($scope.buglist)
		})
	}
	$scope.back = function(){
		$scope.Fabu="Fabu"
	}
	//退出登录
	$scope.Outfn = function(){
		sessionStorage.clear()
		$state.go("/login")
	}
	//判断是否已登录账号
	if(!sessionStorage.getItem("username")){
		$state.go("/login")
	}
	//判断图表数据
	// for(var i = 0;i<$scope.buglist.length;i++){
	// 	if($scope.buglist[i]=="0"){
	// 		$scope.tudata.push($scope.buglist[i])
	// 		console.log($scope.tudata)
	// 	}
	// }
}])
	
