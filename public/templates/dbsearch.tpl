<form id="search-widget-form" role="search" method="GET" action="">
	<div class="" id="search-widget-fields">
		<input type="text" class="form-control" placeholder="[[global:search]]" name="query" value="">
	</div>
</form>

<script>
(function() {
	function handleSearch() {
		var searchButton = $("#search-widget-button"),
				searchFields = $("#search-widget-fields"),
				searchInput = $("#search-widget-fields input");

		function dismissSearch(){
			searchFields.hide();
			searchButton.show();
		}

		searchButton.off().on('click', function(e) {
			if (!config.loggedIn && !config.allowGuestSearching) {
				app.alert({
					message:'[[error:search-requires-login]]',
					timeout: 3000
				});
				ajaxify.go('login');
				return false;
			}
			e.stopPropagation();

			searchFields.removeClass('hide').show();
			$(this).hide();

			searchInput.focus();

			$('#search-widget-form').on('submit', dismissSearch);
			searchInput.on('blur', dismissSearch);
			return false;
		});

		$('#search-widget-form').on('submit', function () {
			var input = $(this).find('input');
			ajaxify.go('search/' + input.val().replace(/^[ ?#]*/, ''));
			input.val('');
			return false;
		});
	}

	handleSearch();

}());
</script>
