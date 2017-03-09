angular.module("bugcenterApp").filter('f',function(){
					return function(a,page,size){
						if(a!=undefined){
							var start=page*size
							var end=(page+1)*size
							return a.slice(start,end)
						}
					}
				}).controller("Lx",["$state","$rootScope","$scope","$http","$interval",function($state,$rootScope,$scope,$http,$interval){
	$scope.labels = ["重要", "中等", "一般"];
	
  	
  	$scope.datalen=0
$scope.Lxuser = sessionStorage.getItem("Lusername")
  if(!$scope.Lxuser){
  	$state.go('/login')
  }
	

	$scope.lxc='ng-disabled'
	$scope.arr=[]
	$scope.arr1=[]
	$scope.arr2=[]
$scope.Quit1=function(){
	sessionStorage.clear()
	$state.go('/login')
}
$scope.Lxipm="Lxred"
  $http({
  	url:"http://www.bugcenter.com.cn:1511/item",
  	method:"get",
  	params:{"to":$scope.Lxuser}
  }).success(function(e){
  	$scope.data1=e
  	$scope.datalen=e.length
  	
  	for(var i=0;i<e.length;i++){
			if(e[i].status==0){
				e[i].status="解决"
				
				}
			 else if(e[i].status==1){
				e[i].status="已解决"				
			}
			else if(e[i].status==2){
				e[i].status="已关闭"	
				
			}
		}
  console.log(e)
  	$scope.Lxdata1 = e
  	for(var i =0;i<e.length;i++){
  		if(e[i].importance==0){
  			e[i].importance="重要"
  			$scope.arr.push(e[i].importance)
  			
  		}else if(e[i].importance==1){
  			e[i].importance="中等"
  			$scope.arr1.push(e[i].importance)
  		}else if(e[i].importance==2){
  			e[i].importance="一般"
  			$scope.arr2.push(e[i].importance)
  		}
  	}
	if($scope.arr.length){
		$scope.data = [$scope.arr.length,$scope.arr1.length,$scope.arr2.length];
	}
	for(var j =0;j<$scope.Lxdata1.length;j++){
		if($scope.Lxdata1[j].importance=="重要"){
			$scope.Lxipm="Lxred"
		}else if($scope.Lxdata1[j].importance=="中等"){
			$scope.Lxipm="Lxred1"
		}else if($scope.Lxdata1[j].importance=="一般"){
			$scope.Lxipm="Lxred2"
		}
	}
	$scope.Lxdatatw=e
	for(var i =0;i<e.length;i++){
  		if(e[i].frequency==0){
  			e[i].frequency="偶尔"
  		}else if(e[i].frequency==1){
  			e[i].frequency="经常"
  		}
  	}
	$scope.size=5;
	$scope.s=0;
	$scope.Le = Math.ceil($scope.datalen/$scope.size)
	console.log($scope.Le)
//	console.log($scope.datalen)
	$scope.Fn=function(){
		$scope.s--
		if($scope.s<0){
			$scope.s=0
		}
	}
	$scope.Fn1=function(e){
		$scope.s++
		if($scope.s>$scope.Le-1){
			$scope.s=$scope.Le-1
		}
	}
 })
  
  
 $scope.fn=function(e){
	if(e.status=="解决"){
		$http({
			url:'http://www.bugcenter.com.cn:1511/item/'+e.id,
			method:'put',
			data:{status:1}
		}).success(function(){
			$scope.data1[$scope.data1.indexOf(e)].status="已解决"
			
		})
	}
}
  
  $scope.Lns = true
  $scope.Lns1 = true
  $scope.aaa=''
	$scope.$watch("aaa",function(e){
		console.log(e)
		if($scope.aaa!=""){
			$scope.Lns = false
			$scope.Lns1 = false
			$scope.size=999999999999999
		}else{
			$scope.Lns = true
			$scope.Lns1 = true
			$scope.size=5
		}
		console.log($scope.aaa)
	})
}])
	
