'use strict';

/**
 * @ngdoc overview
 * @name bugcenterApp
 * @description
 * # bugcenterApp
 *
 * Main module of the application.
 */
angular
  .module('bugcenterApp',["ui.router","summernote","chart.js","ngSanitize"]).config(["$stateProvider","$urlRouterProvider","ChartJsProvider",function($stateProvider,$urlRouterProvider,ChartJsProvider){
        $urlRouterProvider.when("","/login"),
        $stateProvider.state("/login",{
          url:"/login",
          templateUrl:"views/login.html",
          controller:"Login"
        }).state("/Ln",{
          url:"/Ln",
          templateUrl:"views/lining.html",
          controller:"Ln"
        }).state("/Lx",{
          url:"/LX",
          templateUrl:"views/lixueci.html",
          controller:"Lx"
        }).state("/Sy",{
          url:"/Sy",
          templateUrl:"views/shiyifei.html",
          controller:"Sy"
        }).state("/Bx",{
          url:"/Bx",
          templateUrl:"views/baixinyu.html",
          controller:"Bx"
        }),
        ChartJsProvider.setOptions({
            chartColors: ['green',"blue","red"],
            responsive: true
        });
        // Configure all line charts
            ChartJsProvider.setOptions('line', {
            showLines: true
        });

  }]).filter('MyHtml', function ($sce) {
        return function (input) {
            return $sce.trustAsHtml(input);
        }
    });
