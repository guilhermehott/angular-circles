/*jslint indent: 4, maxlen: 100 */
/*global angular */

(function () {
    'use strict';

    var // Constants
        INTERVAL_BIG = 1000,
        INTERVAL_SMALL = 250,
        COLOR_SET_1 = ['#1abc9c', '#2c3e50'],
        COLOR_SET_2 = ['#2ecc71', '#9b59b6'],

        // Variables
        demo;

    demo = angular.module('angular-circles-demo', ['angular-circles']);

    demo.config(['ngCirclesSettingsProvider', function (ngCirclesSettingsProvider) {
        ngCirclesSettingsProvider.set({
            colors: ['#f1c40f', '#c0392b']
        });
    }]);

    demo.controller('CirclesControllerOne', ['$scope', '$interval', function (self, $interval) {
        var // Variables
            reverse;

        self.value = 10;

        $interval(function () {
            if (self.value > 90) {
                reverse = true;
            } else if (self.value < 10) {
                reverse = false;
            }

            if (!reverse) {
                self.value += 1;
            } else {
                self.value -= 1;
            }
        }, INTERVAL_SMALL);
    }]);

    demo.controller('CirclesControllerTwo', ['$scope', '$interval', function (self, $interval) {
        var // Functions
            makeText,

            // Variables
            reverse,
            currentColorSet;

        makeText = function (val) {
            return val + '€';
        };

        self.makeText = makeText;
        self.value = 25;
        self.colors = COLOR_SET_2;

        $interval(function () {
            if (self.value > 175) {
                reverse = true;
            } else if (self.value < 25) {
                reverse = false;
            }

            if (!reverse) {
                self.value += 25;
            } else {
                self.value -= 25;
            }

            if (currentColorSet === COLOR_SET_1) {
                currentColorSet = COLOR_SET_2;
            } else {
                currentColorSet = COLOR_SET_1;
            }

            self.colors = currentColorSet;
        }, INTERVAL_BIG);
    }]);

    demo.controller('CirclesControllerThree', ['$scope', '$interval', function (self, $interval) {
        var // Functions
            makeText,

            // Variables
            currentUnit = '$';

        makeText = function (val) {
            return val + currentUnit;
        };

        self.makeText = makeText;

        $interval(function () {
            if (currentUnit === '$') {
                currentUnit = '£';
            } else {
                currentUnit = '$';
            }
        }, INTERVAL_BIG);
    }]);
}());
