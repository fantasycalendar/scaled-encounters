"use strict";

define(["app/constants"], function (constants) {
	return {
		url: "/battle-setup",
		templateUrl: "app/battle-setup/battle-setup.html?" + constants.VERSION,
		controller: function ($scope, $state, actionQueue, combat, util) {
			window.scope = $scope;

			$scope.partial = util.partialFactory("app/battle-setup/partials/");
			$scope.combat = combat;

			var combatState = combat.init(),
				forward;

			if ( combatState & constants.NO_PLAYERS ) {
				actionQueue.unshift("players.manage", "You must select a party");
				forward = true;
			}

			if ( combatState & constants.NO_MONSTERS ) {
				actionQueue.unshift("encounter-manager", "You must select an encounter");
				forward = true;
			}

			if ( forward ) {
				// In the end, send them back here
				actionQueue.queue("battle-setup");

				actionQueue.next($state);
				return;
			}
		},
	};
});
