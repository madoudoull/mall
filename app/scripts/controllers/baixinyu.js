angular.module("bugcenterApp").controller("Bx",["$state","$rootScope","$scope","$http","$interval",function($state,$rootScope,$scope,$http,$interval){
	$scope.labels = ["重要", "中等", "一般"];
    $scope.u=sessionStorage.getItem("Busername")
    if(!$scope.u){
    	$state.go('/login')
    }
    $scope.jiejue=''
    
    $scope.arr=[]
    $scope.arr1=[]
    $scope.arr2=[]
    $scope.Quit=function(){
    	sessionStorage.clear()
    	$state.go('/login')
    }
    $http({
    	url:'http://www.bugcenter.com.cn:1511/item',
    	method:'get',
    	params:{to:$scope.u}
    }).success(function(e){
//  	debugger
    	$scope.data1=e
    	$scope.datalen=e.length
    	
    	for(var i=0;i<$scope.data1.length;i++){
    		if($scope.data1[i].importance==0){
    			$scope.data1[i].importance='重要'
    			$scope.arr.push($scope.data1[i])
    		}else if($scope.data1[i].importance==1){
    			$scope.data1[i].importance='中等'
    			$scope.arr1.push($scope.data1[i])
    		}else if($scope.data1[i].importance==2){
    			$scope.data1[i].importance='一般'
    			$scope.arr2.push($scope.data1[i])
    		}
    	}
    	if($scope.arr.length){
    		$scope.data = [$scope.arr.length, $scope.arr1.length, $scope.arr2.length];
    	}
    	for(var i=0;i<$scope.data1.length;i++){
    		if($scope.data1[i].frequency ==0){
    			$scope.data1[i].frequency ='偶尔'
    		}else if($scope.data1[i].frequency ==1){
    			$scope.data1[i].frequency ='经常'
    		}
    	}
    	
    	for(var i=0;i<e.length;i++){
    		if(e[i].status ==0){
    			e[i].status ='解决'
    		}else if(e[i].status ==1){
    			e[i].status ='已解决'
    		}else if(e[i].status ==2){
    			e[i].status ='已关闭'
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
    
//  $scope.fn=function(e){
//  	if(){
//  		
//  	}
//  	$http({
//  		url:'http://www.bugcenter.com.cn:1511/item/'+e,
//  		method:'put',
//  		data:{status:1}
//  	}).success(function(d){
//  		alert(1)
//  	})
//  }
    
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
		if($scope.aaa!=""){
			$scope.Lns = false
			$scope.Lns1 = false
			$scope.size=999999999999999
		}else{
			$scope.Lns = true
			$scope.Lns1 = true
			$scope.size=5
		}
	})
}])
.filter('f',function(){
	return function(a,page,size){
		if(a!=undefined){
			var start=page*size
			var end=(page+1)*size
			return a.slice(start,end)
		}
	}
})
	








  
  

