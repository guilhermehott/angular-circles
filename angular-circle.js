/*jslint indent: 4, maxlen: 100 */
/*globals angular, Circles */

(function (ng, Circles) {
    'use strict';

    var ngCircle = ng.module('angular-circle', []),
        iteration = 0,
        DEFAULT_SETTINGS = {
            radius: 60,
            value: 50,
            maxValue: 100,
            width: 10,
            text: function (value) {
                return value + '%';
            },
            colors: ['#bdc3c7', '#2980b9'],
            duration: 0,
            wrpClass:   'circles-wrp',
            textClass:  'circles-text'
        },
        POSSIBLE_SETTINGS = [
            'radius', 'maxValue', 'width', 'text', 'colors', 'duration', 'wrpClass', 'textClass'
        ];

    ngCircle.provider('ngCircleSettings', [function () {
        var self = this,
            $get,
            set;

        $get = function () {
            return DEFAULT_SETTINGS;
        };

        set = function (settingsObject) {
            ng.extend(DEFAULT_SETTINGS, settingsObject);
        };

        self.$get = $get;
        self.set = set;
    }]);

    ngCircle.directive('ngCircle', ['ngCircleSettings', function (ngCircleSettings) {
        var link;

        link = function (scope, element) {
            var self = scope,
                elementId = 'ng-circle-' + iteration,
                settings = ngCircleSettings,
                attrsSettings = {},
                circle;

            if (!self.value || isNaN(self.value)) {
                return;
            }

            element[0].id = elementId;

            ng.forEach(POSSIBLE_SETTINGS, function (setting) {
                if (self[setting]) {
                    attrsSettings[setting] = self[setting];
                } else {
                    attrsSettings[setting] = DEFAULT_SETTINGS[setting];
                }
            });

            circle = Circles.create(ng.extend({}, settings, attrsSettings, {
                id: elementId,
                value: self.value
            }));

            iteration += 1;

            self.$watch('value', function (newValue) {
                circle.update(newValue);
            });
        };

        return {
            restrict: 'A',
            scope: {
                value: '=',
                radius: '@',
                maxValue: '@',
                width: '@',
                text: '@',
                colors: '=',
                duration: '@',
                wrpClass: '@',
                textClass: '@'
            },
            link: link
        };
    }]);
}(angular, Circles));
