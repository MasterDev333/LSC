(function ($) {
    $(function () {
        var getGeolocationFromAddress = function () {
            var address = $('#acf-address').find('input[type=text]').val();
            var city = $('#acf-city').find('input[type=text]').val();
            var state = $('#acf-state').find('input[type=text]').val();
            var zip_code = $('#acf-zip_code').find('input[type=text]').val();
            if (address === '' || city === '' || state === '' || zip_code === '') {
                alert('Address, City, State and Zip Code are required fields.');
                return false;
            }
            var full_address = address + ' ' + city + ' ' + state + ' ' + zip_code;
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'address': full_address}, function (results, status) {                                
                if (status == google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
                    $('#acf-geolocation_info').find('input[type=text]').val('Longitude: ' + longitude + ' Latitude: ' + latitude);
                }
            });
        };

        $('input[name=get_coordinate]').click(function () {
            getGeolocationFromAddress();
        });

        $('input[name=clear_coordinate]').click(function () {
            $('#acf-geolocation_info').find('input[type=text]').val('Longitude: ' + '' + ' Latitude: ' + '');
        });
    });
})(jQuery);