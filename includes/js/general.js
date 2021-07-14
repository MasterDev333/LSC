(function($) {
    
    $(document).on('ready', function (e) {
		$(document).on('change', '#search-page-filter-select', function(){
                    window.location = $(this).val();
                });
    });
    
    $(window).on('load', function (e) {
		
    });
    
})(jQuery);