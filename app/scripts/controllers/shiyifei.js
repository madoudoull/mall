angular.module("bugcenterApp").filter('f',function(){
					return function(a,page,size){
						if(a!=undefined){
							var start=page*size
							var end=(page+1)*size
							return a.slice(start,end)
						}
					}
				}).controller("Sy",["$state","$rootScope","$scope","$http","$interval","$timeout",function($state,$rootScope,$scope,$http,$interval,$timeout){
	$scope.labels = ["重要", "中等", "一般"];

	$scope.series = ['重要', '中等', '一般'];
	$scope.data = [
	    [65, 59, 80, 81, 56, 55, 40],
	    [28, 48, 40, 19, 86, 27, 90]
	];

	$scope.onClick = function (points, evt) {
	    console.log(points, evt);
	};

	  // Simulate async data update
	$timeout(function () {
	    $scope.data = [$scope.arr.length,$scope.arr1.length,$scope.arr2.length];
	}, 3000);
	

	$scope.datalen=0
	$scope.user =sessionStorage.Susername
	$scope.arr=[];
	$scope.arr1=[];
	$scope.arr2=[];
	// $scope.jiejue="解决"
	$http({
		url:"http://www.bugcenter.com.cn:1511/item",
		method:"get",
		params:{to:$scope.user}
	}).success(function(e){
		// var Sspan=document.getElementByClassName("s_span");
		$scope.Sdata = e
		$scope.datalen=e.length
		for(var i=0;i<e.length;i++){
			if(e[i].importance==0){
				console.log(e[i].importance.length)
				// this.Sspan.style.background="red"
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
		for(var i=0;i<e.length;i++){
			if(e[i].frequency==0){
				
				e[i].frequency="偶尔"
			}else if(e[i].frequency==1){
				e[i].frequency="经常"
			}
		}
		console.log($scope.Sdata)
		for(var i=0;i<e.length;i++){
			if(e[i].status==0){
				e[i].status="解决"
			}else if(e[i].status==1){
				e[i].status="已解决"
			}else if(e[i].status==2){
				e[i].status="已关闭"
			}
			// if(e[i].status="已关闭"){
			// 	s_but.disable=true
			// }
			
		}
		$scope.fn=function(e){
	if(e.status=="解决"){
		$http({
			url:"http://www.bugcenter.com.cn:1511/item/"+e.id,
			method:"post",
			data:{status:1}
		}).success(function(){
			for(var i = 0;i<$scope.Sdata.length;i++){
				if($scope.Sdata[i].status=="解决"){
					$scope.Sdata[$scope.Sdata.indexOf(e)].status="已解决"
				}
			}
		})
	}
		
	}
	$scope.size=5;
	$scope.s=0;
	$scope.Le= Math.ceil($scope.datalen/$scope.size)
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
			url:"http://www.bugcenter.com.cn:1511/item/"+e.id,
			method:"post",
			data:{status:1}
		}).success(function(){
			for(var i = 0;i<$scope.Sdata.length;i++){
				if($scope.Sdata[i].status=="解决"){
					$scope.Sdata[$scope.Sdata.indexOf(e)].status="已解决"
				}
			}
		})
	}
		
	}


 $scope.Lns = true
  $scope.Lns1 = true
  $scope.aaaa=''
	$scope.$watch("aaaa",function(e){
		console.log(e)
		if($scope.aaaa!=""){
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
	$http({
		url:"http://www.bugcenter.com.cn:1511/item",
		method:"get"
	}).success(function(e){
		console.log(e)
	})
	$scope.Sout = function(){
		sessionStorage.clear()
		$state.go("/login")
	}
	if(!$scope.user){
		$state.go("/login")
	}
}])
	
