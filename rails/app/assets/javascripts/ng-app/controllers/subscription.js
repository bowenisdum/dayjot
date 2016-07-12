angular.module('mainApp')
.controller('SubscriptionCtrl', ["$scope", "Auth", "Subscription", function ($scope, Auth, Subscription) {

	$scope.subscriptionActive = function() {
		return Subscription.active();
	};

	$scope.subscribe = function() {
		event.preventDefault();
		event.stopPropagation();
		handler.open({
	      name: 'VidJou',
	      description: 'Activate Monthly Subscription',
	      amount: 500
	    });
	};

	$scope.cancel = function(event) {
		event.preventDefault();
		event.stopPropagation();
		Subscription.cancel();
	};

	$scope.stripeCallback = function(token) {
		$scope.$apply(function() {
			var data = {
				plan: "journal_monthly_5",
				token: token.id
			};
			Subscription.update(data);
		});
	};

	var handler = StripeCheckout.configure({
		key: 'pk_test_AHbjgbzuH6NYHw13ECmTJe23',
		locale: 'auto',
		allowRememberMe: false,
		panelLabel: "Subscribe",
		token: function(token) {
		  // You can access the token ID with `token.id`.
		  // Get the token ID to your server-side code for use.
		  angular.element("#subscriptionCtrlDiv").scope().stripeCallback(token);
		}
	});

	// Close Checkout on page navigation:
	$(window).on('popstate', function() {
		handler.close();
	});
}]);