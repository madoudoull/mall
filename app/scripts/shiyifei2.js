// angular.module("syf",[]).directive("shoufenqing",function(){
//    return{
//      restrict:'ECMA',
//      template:'',
//      replac<div class="panel panel-default" ng-repeat="x in dataOne"><div class="panel-heading" role="tab" id="heading{{$index+1}}"><h4 class="panel-title"><p class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse{{$index+1}}" aria-expanded="false" aria-controls="collapse{{$index+1}}">{{x.summary}}({{x.frequency}})</p><span class="s_span">{{x.importance}}</span></h4></div><div id="collapse{{$index+1}}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading{{$index+1}}"><div class="panel-body"><div class="s_p1"><x ng-bind-html="x.description|MyHtml"></x></div><span>{{x.date}}</span><br>发布人：<span>{{x.from}}</span><button id="s_but" ng-click="fn(x.id)">{{x.status}}</button></div></div></div>e:true,
//      scope:{dataOne:"=data"},
//    }
// })