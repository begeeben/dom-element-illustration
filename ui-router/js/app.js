'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['ui.router'])
    .run(['$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {

            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
            // to active whenever 'contacts.list' or one of its decendents is active.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ])
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                // .when('/c?id', '/contacts/:id')
                // .when('/user/:id', '/contacts/:id')'/'
                .when('/', ['$state', function ($state) {
                    $state.transitionTo('contacts.detail', {contactId: 1}, {location: false});
                }])
                .when('/contacts', ['$state', function ($state) {
                    $state.transitionTo('contacts.detail', {contactId: 1}, {location: false});
                }])
                .otherwise('/');

            $stateProvider
            .state("home", {
                url: "/"
            })
            .state('contacts', {
                url: '/contacts',
                template: 'Contacts: <div ui-view></div>'
            })
            .state('contacts.detail', {
                url: '/:contactId',
                template: '<p class="lead">Contact ID is {{$stateParams.contactId}}</p>'
            });
        }
    ]);