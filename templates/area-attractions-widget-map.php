<?php global $google_map_api; ?>
<link rel='stylesheet' id='am_area-attractions-widget-css'  href='<?php echo get_theme_file_uri('css/area-attractions-widget.css'); ?>?ver=<?php echo filemtime(get_theme_file_uri('css/area-attractions-widget.css')); ?>' type='text/css' media='all' />
<section class="py-8 pt-lg-0 pb-lg-3 p-relative entry map-wrapper ov-h area-attractions-map-wrapper">
    <div class="container">
        <div class="map-inner a-right">
            <h2>Area Attractions</h2>
            <?php
            $taxonomies = get_terms(array(
                'taxonomy' => 'type',
                'hide_empty' => true,
                'orderby' => 'name',
                'order' => 'DESC'
            ));

            $terms = false;
            if ($taxonomies) {
                foreach ($taxonomies as $taxonomy) {
                    $args = array(
                        'post_type' => 'attraction',
                        'post_status' => 'publish',
                        'posts_per_page' => -1,
                        'meta_query' => array(
                            array(
                                'key' => 'latitude',
                                'value' => '',
                                'compare' => '!=',
                            ),
                            array(
                                'key' => 'longitude',
                                'value' => '',
                                'compare' => '!=',
                            ),
                        )
                    );
                    $tax_query = array();
                    $tax_query[] = array(
                        'taxonomy' => 'type',
                        'field' => 'slug',
                        'terms' => $taxonomy->slug,
                    );

                    if (!empty($location)) {
                        $tax_query[] = array(
                            'taxonomy' => 'location',
                            'field' => 'slug',
                            'terms' => $location,
                        );
                    }
                    if (!empty($tax_query)) {
                        //$args['tax_query']['relation'] = 'AND';
                        $args['tax_query'] = $tax_query;
                    }
                    $post_query = new WP_Query($args);
                    if ($post_query->found_posts > 0) {
                        $taxonomy->post_query = $post_query;
                        $terms[] = $taxonomy;
                    }
                }
            }
            if (!empty($terms)) {
                ?>
                <div class="fade-tabset">
                    <ul class="tabset">
                        <?php
                        $tabs = 1;
                        $custom_order = [];
                        $next_index = 1;
                        foreach ($terms as $term_data) {
                            if ($term_data->slug == 'sights') {
                                $custom_order[0] = $term_data;
                            } else {
                                $custom_order[$next_index++] = $term_data;
                            }
                        }
                        ksort($custom_order);
                        foreach ($custom_order as $category) {
                            $active = '';
                            if ($tabs == 1) {
                                $active = 'active';
                                $tabs = 2;
                            }
                            ?>
                            <li><a href="#attraction-type-tab-<?php echo $category->slug; ?>" class="tab-links <?php echo $active; ?>" data-slug="<?php echo $category->slug; ?>" data-id="<?php echo $category->slug; ?>-tab"><?php echo $category->name; ?></a></li>
                            <?php
                        }
                        ?>
                    </ul>
                    <div class="tab-mob-btn am_mob-hide">
                        <button class="btn-see-map _active"><i class="icon-map"></i>See map</button>
                        <button href="#" class="btn-see-list"><i class="icon-format_list_bulleted"></i>See LIST</button>
                    </div>

                    <div class="tab-content am_mob-hide">
                        <?php
                        $tabs = 1;
                        $listings_data = [];
                        foreach ($custom_order as $category) {
                            $active = ' hidden-tab';
                            if ($tabs == 1) {
                                $active = ' active';
                            } else {
                                $active = ' hidden-tab';
                            }
                            $tax_query = [];
                            ?>
                            <div id="attraction-type-tab-<?php echo $category->slug; ?>" class="tab<?php echo $active; ?> popup-tabcontent">
                                <?php
                                if ($category->post_query->have_posts()) {
                                    $count_item = 1;
                                    $totalpost = $category->post_query->found_posts;
                                    ?>
                                    <ol>
                                        <?php
                                        while ($category->post_query->have_posts()) {
                                            $category->post_query->the_post();
                                            $p_id = get_the_ID();
                                            $lat = ($listing_location_lat = get_field('latitude', $p_id)) ? $listing_location_lat : '';
                                            $lng = ($listing_location_lng = get_field('longitude', $p_id)) ? $listing_location_lng : '';
                                            if (!empty($lat) && !empty($lng)) {
                                                $url = get_permalink($p_id);
                                                $image_url = wp_get_attachment_image_src(get_post_thumbnail_id($p_id), 'thumbnail');
                                                $img_url = isset($image_url[0]) ? $image_url[0] : '';
                                                if ('' == $img_url):
                                                    $img_url = get_theme_file_uri('images/map/listing-thumbnail.png');
                                                endif;
                                                $attraction_url = get_field('attraction_url', $p_id);
                                                $address = get_field("address");
                                                $city = get_field("city");
                                                $state = get_field("state");
                                                $zip_code = get_field("zip_code");
                                                $phone_number = get_field("phone_number");
                                                // first category as opened with markers data
                                                if ($tabs == 1) {
                                                    $listings_data[] = array(
                                                        'ID' => $p_id,
                                                        'title' => get_the_title(),
                                                        'lat' => $lat,
                                                        'lng' => $lng,
                                                        'img' => $img_url,
                                                        'attraction_url' => $attraction_url,
                                                        'url' => $url,
                                                        'address' => $address,
                                                        'city' => $city,
                                                        'state' => $state,
                                                        'zip_code' => $zip_code,
                                                        'phone_number' => $phone_number
                                                    );
                                                }
                                                ?>
                                                <li class="data-listing"><a data-address="<?php echo $address; ?>" data-city="<?php echo $city; ?>" data-state="<?php echo $state; ?>" data-zip_code="<?php echo $zip_code; ?>" data-phone_number="<?php echo $phone_number; ?>" data-pid="<?php echo $p_id; ?>" data-img="<?php echo $img_url; ?>" data-lat="<?php echo $lat; ?>" data-lng="<?php echo $lng; ?>" data-title="<?php the_title(); ?>" data-url="<?php echo $url; ?>" data-attraction_url="<?php echo $attraction_url; ?>" class="map-icon-click map-data-<?php echo $category->slug; ?>" href="javascript:void(0);"><?php //echo $count_item++; echo '. ';                ?><?php
                                                        $title = get_the_title();
                                                        if (strlen($title) > 40) {
                                                            echo mb_strimwidth(get_the_title(), 0, 40, '...');
                                                        } else {
                                                            the_title();
                                                        }
                                                        ?></a></li>
                                                <?php
                                            }
                                        }
                                        wp_reset_query();
                                        ?>
                                    </ol>
                                    <?php
                                }
                                ?>
                            </div>
                            <?php $tabs = 2; ?>
                        <?php } ?>
                    </div>
                </div>
                <?php
            }
            ?>
        </div>
    </div>
    <div class="bg-map a-up-full animated am_mob-show">
<!--        <img src="<?php bloginfo('template_directory'); ?>/images/none-maps.jpg" alt="maps">-->
        <div id="map_canvas" class="mapping attraction-map"></div>
    </div>
</section>

<script type="text/javascript">
    var map;
    var bounds;
    var markers = [];
    var marker_color = '';
    var markerIcon = '<?php echo get_theme_file_uri('images/map/marker.png'); ?>';
<?php if (!empty($location)) { ?>
        markerIcon = '<?php echo get_theme_file_uri('images/map/marker-' . $location . '.png'); ?>';
<?php } ?>

    var locations = [];
<?php
if (!empty($listings_data)) {
    foreach ($listings_data as $data) {
        ?>
            locations.push({"ID":<?php echo $data['ID']; ?>, "title": "<?php echo $data['title']; ?>", 'lat':<?php echo floatval($data['lat']); ?>, 'lng':<?php echo floatval($data['lng']); ?>, 'img': "<?php echo $data['img']; ?>", 'url': "<?php echo $data['url']; ?>", 'attraction_url': "<?php echo $data['attraction_url']; ?>", 'address': "<?php echo $data['address']; ?>", 'city': "<?php echo $data['city']; ?>", 'state': "<?php echo $data['state']; ?>", 'zip_code': "<?php echo $data['zip_code']; ?>", 'phone_number': "<?php echo $data['phone_number']; ?>"})
        <?php
    }
}
?>
</script>
<script type="text/javascript" src="<?php echo get_theme_file_uri('includes/js/area-attractions-widget.js'); ?>?ver=<?php echo filemtime(get_theme_file_uri('includes/js/area-attractions-widget.js')); ?>" id = "am_includes-js-jquery-main-js-js" ></script>    
<script async defer src="https://maps.googleapis.com/maps/api/js?key=<?php echo $google_map_api; ?>&callback=initializeMap"></script> 