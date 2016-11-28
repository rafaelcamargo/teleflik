angular.module('templates', ['components/card/card-template.html', 'components/icon/icon-template.html', 'components/interest-card-list/interest-card-list-template.html', 'components/interest-card/interest-card-template.html', 'components/interest-form/interest-form-template.html', 'components/interest-manager/interest-manager-template.html', 'components/logo/logo-template.html', 'components/menu/menu-template.html', 'components/show-card-list/show-card-list-template.html', 'components/show-card/show-card-template.html', 'components/topbar/topbar-template.html', 'components/viewport/viewport-template.html', 'views/home/home-template.html', 'views/interests/interests-template.html']);

angular.module("components/card/card-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/card/card-template.html",
    "<div class=\"card\">\n" +
    "  <ng-transclude></ng-transclude>\n" +
    "</div>\n" +
    "");
}]);

angular.module("components/icon/icon-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/icon/icon-template.html",
    "<i class=\"icon {{$ctrl.icon}}\"></i>\n" +
    "");
}]);

angular.module("components/interest-card-list/interest-card-list-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/interest-card-list/interest-card-list-template.html",
    "<div class=\"card-list-container\">\n" +
    "  <ul class=\"card-list\">\n" +
    "    <li ng-repeat=\"interest in $ctrl.interests\">\n" +
    "      <interest-card data-interest=\"interest\"></interest-card>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("components/interest-card/interest-card-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/interest-card/interest-card-template.html",
    "<div class=\"interest-card\">\n" +
    "  <card>\n" +
    "    <div class=\"interest-keyword\"\n" +
    "      ng-bind=\"$ctrl.interest.keyword\">\n" +
    "    </div>\n" +
    "    <button class=\"button button-secondary button-circled\"\n" +
    "      ng-click=\"$ctrl.remove($ctrl.interest)\">\n" +
    "      <icon data-icon=\"ion-android-close\"></icon>\n" +
    "    </button>\n" +
    "  </card>\n" +
    "</div>\n" +
    "");
}]);

angular.module("components/interest-form/interest-form-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/interest-form/interest-form-template.html",
    "<form class=\"interest-form\" ng-submit=\"$ctrl.add()\">\n" +
    "  <div class=\"input-container input-container-buttoned\">\n" +
    "    <input type=\"text\" ng-model=\"$ctrl.interest.keyword\"\n" +
    "      placeholder=\"Exemplo: Beatles\" />\n" +
    "    <button type=\"submit\" class=\"button button-primary button-circled\">\n" +
    "      <icon data-icon=\"ion-plus\"></icon>\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n" +
    "");
}]);

angular.module("components/interest-manager/interest-manager-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/interest-manager/interest-manager-template.html",
    "<div class=\"interest-manager\">\n" +
    "  <interest-form></interest-form>\n" +
    "  <interest-card-list></interest-card-list>\n" +
    "</div>\n" +
    "");
}]);

angular.module("components/logo/logo-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/logo/logo-template.html",
    "<div class=\"logo-container\">\n" +
    "  <div class=\"logo\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("components/menu/menu-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/menu/menu-template.html",
    "<div class=\"menu-container\">\n" +
    "  <div class=\"menu-item-container menu-item-has-link\">\n" +
    "    <a href=\"javascript:void(0)\" ng-click=\"$ctrl.goToInterestsView()\">\n" +
    "      <icon data-icon=\"ion-plus\">\n" +
    "    </a>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("components/show-card-list/show-card-list-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/show-card-list/show-card-list-template.html",
    "<div class=\"card-list-container show-card-list-container\">\n" +
    "  <div class=\"show-card-list-messages-container\">\n" +
    "    <div class=\"show-card-list-messages-no-interests-found\"\n" +
    "      ng-show=\"!$ctrl.interests.length\">\n" +
    "      <card>\n" +
    "        <div class=\"show-card-list-messages-icon-container\">\n" +
    "          <icon data-icon=\"ion-wand\"></icon><br/>\n" +
    "        </div>\n" +
    "        <div class=\"show-card-list-messages-text-container\">\n" +
    "          A mágica só acontece quando você nos diz o que gosta.<br/>\n" +
    "          Para adicionar interesses, use o sinal de mais acima.\n" +
    "        </div>\n" +
    "      </card>\n" +
    "    </div>\n" +
    "    <div class=\"show-card-list-messages-results-found\"\n" +
    "      ng-show=\"$ctrl.shows.length\">\n" +
    "      <div class=\"show-card-list-messages-icon-container\">\n" +
    "        <icon data-icon=\"ion-flag\"></icon><br/>\n" +
    "      </div>\n" +
    "      <div class=\"show-card-list-messages-text-container\">\n" +
    "        Yup! <strong ng-bind=\"$ctrl.shows.length\"></strong>\n" +
    "        <span ng-bind=\"$ctrl.results.label\"></span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"show-card-list-messages-no-results-found\"\n" +
    "      ng-show=\"!$ctrl.shows\">\n" +
    "      <div class=\"show-card-list-messages-icon-container\">\n" +
    "        <icon data-icon=\"ion-map\"></icon><br/>\n" +
    "      </div>\n" +
    "      <div class=\"show-card-list-messages-text-container\">\n" +
    "        Nada interessante pela frente.<br/>\n" +
    "        <a class=\"button button-primary\" href=\"javascript:void(0)\"\n" +
    "          ng-click=\"$ctrl.goToInterestsView()\">\n" +
    "          Adicionar mais interesses\n" +
    "        </a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"show-card-list-messages-server-error\"\n" +
    "      ng-show=\"$ctrl.error\">\n" +
    "      <div class=\"show-card-list-messages-icon-container\">\n" +
    "        <icon data-icon=\"ion-help-buoy\"></icon><br/>\n" +
    "      </div>\n" +
    "      <div class=\"show-card-list-messages-text-container\"\n" +
    "        ng-bind=\"$ctrl.error\">\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <ul class=\"card-list\">\n" +
    "    <li ng-repeat=\"show in $ctrl.shows\">\n" +
    "      <show-card data-show=\"show\"></show-card>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("components/show-card/show-card-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/show-card/show-card-template.html",
    "<card>\n" +
    "  <div class=\"show-card-title-container\">\n" +
    "    <h2 ng-bind=\"$ctrl.show.title\"></h2>\n" +
    "  </div>\n" +
    "  <div class=\"show-card-details-container\">\n" +
    "    <div class=\"show-card-details-item\">\n" +
    "      <icon data-icon=\"ion-calendar\"></icon>\n" +
    "      <span class=\"show-card-details-item-text\"\n" +
    "        ng-bind=\"$ctrl.show.date\">\n" +
    "      </span>\n" +
    "    </div>\n" +
    "    <div class=\"show-card-details-item\">\n" +
    "      <icon data-icon=\"ion-android-time\"></icon>\n" +
    "      <span class=\"show-card-details-item-text\"\n" +
    "        ng-bind=\"$ctrl.show.time\">\n" +
    "      </span>\n" +
    "    </div>\n" +
    "    <div class=\"show-card-details-item show-card-details-item-media\">\n" +
    "      <icon data-icon=\"ion-ios-monitor-outline\"></icon>\n" +
    "      <span class=\"show-card-details-item-text\"\n" +
    "        ng-click=\"$ctrl.showMediaDetails($ctrl.show.media)\"\n" +
    "        ng-bind=\"$ctrl.show.media.name\">\n" +
    "      </span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</card>\n" +
    "");
}]);

angular.module("components/topbar/topbar-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/topbar/topbar-template.html",
    "<div class=\"topbar-container\">\n" +
    "  <div class=\"topbar-content\" ng-if=\"$ctrl.title\">\n" +
    "    <div class=\"topbar-back-trigger\" ng-click=\"$ctrl.back()\">\n" +
    "      <icon data-icon=\"ion-android-arrow-back\"></icon>\n" +
    "    </div>\n" +
    "    <h1 ng-bind=\"$ctrl.title\"></h1>\n" +
    "  </div>\n" +
    "  <div class=\"topbar-content\" ng-if=\"!$ctrl.title\">\n" +
    "    <ng-transclude></ng-transclude>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("components/viewport/viewport-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/viewport/viewport-template.html",
    "<div class=\"viewport\" ng-style=\"$ctrl.style\">\n" +
    "  <ng-transclude></ng-transclude>\n" +
    "</div>\n" +
    "");
}]);

angular.module("views/home/home-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/home/home-template.html",
    "<topbar>\n" +
    "  <logo></logo>\n" +
    "  <menu></menu>\n" +
    "</topbar>\n" +
    "<viewport>\n" +
    "  <show-card-list></show-card-list>\n" +
    "</viewport>\n" +
    "");
}]);

angular.module("views/interests/interests-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/interests/interests-template.html",
    "<topbar data-title=\"Interesses\"></topbar>\n" +
    "<viewport>\n" +
    "  <interest-manager></interest-manager>\n" +
    "</viewport>\n" +
    "");
}]);
