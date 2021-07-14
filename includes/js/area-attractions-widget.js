jQuery(document).ready(function ($) {
    if ($('.area-attractions-map-wrapper').length) {
        if ($(window).width() < 768) {
            $('.area-attractions-map-wrapper').addClass('attractions-map');
        }
    }
    jQuery('.area-attractions-map-wrapper .tab-links').unbind('click').bind('click', function (e) {
        e.preventDefault();
        $('.tab-links').removeClass('active');
        var tab_id = $(this).data('id');
        var slug = $(this).data('slug');
        $(this).addClass('active');
        $('.popup-tabcontent').addClass('hidden-tab');
        $('.popup-tabcontent').removeClass('active');
        $('.' + tab_id).removeClass('hidden-tab');
        $('.' + tab_id).removeClass('active');
        //console.log('IDD::'+tab_id);			
        var s_locations = [];
        let
        unique = [];
        $('.map-data-' + slug).each(function (index) {
            // only split has map					
            var title = $(this).data('title');
            var lat = $(this).data('lat');
            var lng = $(this).data('lng');
            var img = $(this).data('img');
            var url = $(this).data('url');
            var pid = $(this).data('pid');
            var address = $(this).data('address');
            var city = $(this).data('city');
            var state = $(this).data('state');
            var zip_code = $(this).data('zip_code');
            var phone_number = $(this).data('phone_number');
            var attraction_url = $(this).data('attraction_url');
            // check for unique values
            if (unique.indexOf(pid) === -1) {
                unique.push(pid);
                s_locations.push({'ID': pid, 'title': title, 'lat': lat, 'lng': lng, 'img': img, 'address': address, 'city': city, 'state': state, 'zip_code': zip_code, 'phone_number': phone_number, 'url': url, 'attraction_url': attraction_url});
            }
        });

        /*str = JSON.stringify(s_locations, null, 4);
         console.log('LOC::'+str);*/
        removeOldMarkers();
        var infoWindow = new google.maps.InfoWindow({});
        bounds = new google.maps.LatLngBounds();
        popup_info_window(s_locations, bounds, infoWindow);

    });

    $('.map-icon-click').unbind('click').bind('click', function (e) {
        e.preventDefault();
        $('.map-icon-click').removeClass('active');
        $('.map-icon-click').parent().removeClass('active');
        var box_id = $(this).data('pid');
        var lat = $(this).data('lat');
        var lng = $(this).data('lng');
        $(this).addClass('active');
        $(this).parent().addClass('active');
        var screensize = $(window).width();
        if (screensize <= 768) {
            $('html, body').animate({
                scrollTop: $("#map_canvas").offset().top
            }, 1500);
        }

        recenter_map_click(lat, lng);
        $('.icon-' + box_id).trigger('click');
    });

});
function recenter_map_click(lat, lng) {
    initialLocation = new google.maps.LatLng(lat, lng);
    map.setCenter(initialLocation);

}
function initializeMap() {
    var mapOptions = {
        mapTypeId: 'roadmap',
        mapTypeControl: false
    };
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);

    // Multiple Markers
    //var markers = [];
    bounds = new google.maps.LatLngBounds();

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    popup_info_window(locations, bounds, infoWindow);
    //jQuery('.area-attractions-map-wrapper .tab-links.active').trigger('click');

}

var am_build_address_from_arr = function (address, city, state, zip_code, phone_number) {
    var full_address = '<div class="contact-details"><p class="address">';
    if (address !== '') {
        full_address += address + '<br/>';
    }

    if (city !== '' && state !== '' && zip_code !== '') {
        full_address += city + ", " + state + " " + zip_code;
    } else if (state !== '' && zip_code !== '') {
        full_address += state + " " + zip_code;
    } else if (city !== '' && zip_code !== '') {
        full_address += city + ", " + zip_code;
    } else if (city !== '' && state !== '') {
        full_address += city + ", " + state;
    }
    full_address += '</p>';
    if (phone_number !== '') {
        full_address += '<p class="tel-wrapper"><a class="tel" href="tel:' + phone_number.replace(/[^0-9]+/g, "") + '">' + phone_number + '</a></p>';
    }
    full_address += '</div>';
    return full_address;
};

function popup_info_window(locations, bounds, infoWindow) {
    removeOldMarkers();
    //var bounds = new google.maps.LatLngBounds();    
    var imageIcon = {
        url: markerIcon,
        scaledSize: new google.maps.Size(42, 42),
        labelOrigin: new google.maps.Point(21, 17)
    };

    let
    j = 1;
    for (i = 0; i < locations.length; i++) {
        var position = new google.maps.LatLng(locations[i].lat, locations[i].lng);
        bounds.extend(position);
        marker = new google.maps.Marker({
            icon: imageIcon,
            position: position,
            map: map,
            title: locations[i].title,
            label: {
                color: 'white',
                text: j + '',
                fontweight: 'bold'
            }
        });

        markers.push(marker);
        j++;
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                var popup_item_link = '';
                if (locations[i].attraction_url !== '') {
                    popup_item_link = '<a class="go-now" target="_blank" href="' + locations[i].attraction_url + '">VISIT</a>';
                }
                var full_address = am_build_address_from_arr(locations[i].address, locations[i].city, locations[i].state, locations[i].zip_code, locations[i].phone_number);

                var popup_info = '<div class="info_content">' +
                        '<div class="listing-img"><img src="' + locations[i].img + '"></div>' +
                        '<h3>' + locations[i].title + '</h3>' + full_address +
                        '<p>' + popup_item_link + '</p></div>';
                map.panTo(marker.getPosition());
                infoWindow.setContent(popup_info);
                infoWindow.open(map, marker);

            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen

    }
    map.fitBounds(bounds);
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
        this.setZoom(11);
        google.maps.event.removeListener(boundsListener);
    });
//    if (!$(".tab-mob-btn").is(":visible")) {
//        $('.tab-content').hide();
//    }
    setTimeout(function () {
        if ($(".tab-content").is(":visible")) {
            map.panBy(-250, 0);
        }
        //console.log('add Class');

        jQuery(".gm-style >  div:nth-child(1)").addClass('here1');

        jQuery(".gm-style >  div:nth-child(1) >  div:nth-child(3)").addClass('here2');
        jQuery(".gm-style >  div:nth-child(1) >  div:nth-child(3) > div:nth-child(1)").addClass('here3');
        jQuery(".gm-style >  div:nth-child(1) >  div:nth-child(3) > div:nth-child(1) > div:nth-child(3)").addClass('here4');
        jQuery(".gm-style >  div:nth-child(1) >  div:nth-child(3) > div:nth-child(1) > div:nth-child(3) > div").addClass('here5');

        if (jQuery(".gm-style >  div:nth-child(1) >  div:nth-child(3) > div:nth-child(1) > div:nth-child(3) > div").length) {
            jQuery(".gm-style >  div:nth-child(1) >  div:nth-child(3) > div:nth-child(1) > div:nth-child(3) > div").each(function (index) {
                jQuery(this).find("img").addClass('marker-icon').addClass('icon-' + locations[index].ID);
                jQuery(this).find("img").parent().addClass('marker-icon-parent');
            });
        } else if (jQuery(".gm-style >  div:nth-child(2) >  div:nth-child(3) > div:nth-child(1) > div:nth-child(3) > div").length) {
            jQuery(".gm-style >  div:nth-child(2) >  div:nth-child(3) > div:nth-child(1) > div:nth-child(3) > div").each(function (index) {
                jQuery(this).find("img").addClass('marker-icon').addClass('icon-' + locations[index].ID);
                jQuery(this).find("img").parent().addClass('marker-icon-parent');
            });
        }

        jQuery(".gm-style >  div:nth-child(1) >  div:nth-child(1)").addClass('xhere2');
        jQuery(".gm-style >  div:nth-child(1) >  div:nth-child(1) > div:nth-child(4)").addClass('xhere3');
        jQuery(".gm-style >  div:nth-child(1) >  div:nth-child(1) > div:nth-child(4) > div").addClass('xhere4');

        jQuery(".gm-style >  div:nth-child(1) >  div:nth-child(1) > div:nth-child(4) > div").each(function () {
            jQuery(this).find("img").addClass('marker-icon-alt');
            jQuery(this).find("img").parent().addClass('marker-icon-parent-alt');
        });


    }, 600);


}

function removeOldMarkers() {
    if (markers.length) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
            markers[i].setLabel(null);
        }
        markers = [];
    }
}
