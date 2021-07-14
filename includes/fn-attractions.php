<?php

class FN_Attractions {

    public function __construct() {
        $this->acf_filters();
        $this->save_post_actions();

        add_action('admin_print_styles-post.php', array(&$this, 'admin_styles_post_type_attraction'));
        add_action('admin_print_styles-post-new.php', array(&$this, 'admin_styles_post_type_attraction'));
        add_action('admin_print_scripts-post.php', array(&$this, 'admin_script_post_type_attraction'));
        add_action('admin_print_scripts-post-new.php', array(&$this, 'admin_script_post_type_attraction'));
        add_shortcode('area-attractions', array($this, 'area_attractions_widget'));
    }

    public function acf_filters() {
        add_filter('acf/load_field/name=geolocation_info', array(&$this, 'geolocation_info'));
    }

    public function geolocation_info($field) {
        global $post;
        if (isset($post) && $post->post_type !== 'attraction') {
            return $field;
        }
        $field['readonly'] = 1;
        $field['wrapper']['width'] = '100';
        $field['wrapper']['class'] = 'admin-get-coordinate-wrapper';
        $field['append'] = '<input class="button button-primary" type="button" name="get_coordinate" value="Get Coordinates" /> <input class="button button-primary" type="button" name="clear_coordinate" value="Clear Coordinates" />';
        return $field;
    }

    public function save_post_actions() {
        add_action('acf/save_post', array(&$this, 'save_post'), 20);
    }

    public function save_post($post_id) {
        if (isset($_POST['post_type']) && $_POST['post_type'] == 'attraction' && current_user_can('edit_post', $post_id)) {
            $post_data = $_POST['acf'];
            $geolocation_info = str_replace(array('Longitude: ', ' Latitude:'), array('', ''), $post_data['field_60d61fb7e16a1']);
            if (strlen($geolocation_info) > 0) :
                $geolocation_info_array = explode(' ', $geolocation_info);
                if (count($geolocation_info_array) === 2) :
                    update_field("longitude", $geolocation_info_array[0], $post_id);
                    update_field("latitude", $geolocation_info_array[1], $post_id);
                //update_post_meta($post_id, 'attraction_location_lng', $geolocation_info_array[0]);
                //update_post_meta($post_id, 'attraction_location_lat', $geolocation_info_array[1]);
                endif;
            endif;
        }
        return $post_id;
    }

    public function admin_styles_post_type_attraction() {
        global $typenow;
        if ('attraction' === $typenow) {
            wp_enqueue_style('edit-attraction-admin', get_theme_file_uri('css/edit-attraction-admin.css'), array(), filemtime(get_theme_file_path('css/edit-attraction-admin.css')));
        }
    }

    public function admin_script_post_type_attraction() {
        global $typenow;
        if ('attraction' === $typenow) {
            global $google_map_api;
            wp_enqueue_script('googlemaps', 'https://maps.googleapis.com/maps/api/js?&key=' . $google_map_api . '&libraries=places', array(), '', true);
            wp_enqueue_script('edit-attraction-admin', get_theme_file_uri('includes/js/edit-attraction-admin.js'), array('jquery'), filemtime(get_theme_file_path('includes/js/edit-attraction-admin.js')));
        }
    }

    public function area_attractions_widget($atts = []) {
        $attr = shortcode_atts(array(
            'location' => ''
                ), $atts);

        $location = (isset($attr['location']) && !empty($attr['location'])) ? $attr['location'] : '';
        $location_id = '';
        $location_qry = '';
        if (!empty($location)) {
            $term = get_term_by('slug', $location, 'location');
            if ($term) {
                $location_id = $term->term_id;
                $location_qry = '&location=' . $location_id;
            }
        }
        ob_start();
        require_once get_theme_file_path("templates/area-attractions-widget-map.php");
        return ob_get_clean();
    }

}

new FN_Attractions();

function am_wcr_parse_feed($career_opening_feed_url, $limit) {
    $cache_key = "career_opening_feed_cache";
    //wp_cache_delete($cache_key);
    $items = wp_cache_get($cache_key);
    if (!$items || empty($items)) {
//        ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
        // fetch feed
        $feed = fetch_feed($career_opening_feed_url);

        if (is_wp_error($feed)) {
            return;
        }

        $max_items = $feed->get_item_quantity($limit);
        $feed_items = $feed->get_items(0, $max_items);

        if (empty($feed_items) || !is_array($feed_items)) {
            return;
        }
        $items = false;
        if ($feed_items) {
            foreach ($feed_items as $feed_item) {
                $items[] = array('title' => esc_html($feed_item->get_title()), 'content' => $feed_item->get_content(), 'link' => $feed_item->get_link());
            }

            wp_cache_set($cache_key, $items, '', 1800);
        }
        return $items;
    } else {
        return $items;
    }
}
