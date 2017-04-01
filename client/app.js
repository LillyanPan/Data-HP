var app = angular.module( "data-hp", ['ui.router', 'satellizer'] );

app.config( function ( $stateProvider, $urlRouterProvider, $authProvider ) {
  $stateProvider
  .state('home', {
      url: '/',
      templateUrl: 'index.html'
      // controller: 'LoginCtrl',
    })
})
