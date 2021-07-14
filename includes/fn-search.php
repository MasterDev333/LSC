<?php

class FN_Search {

    public function __construct() {
        add_filter('query_vars', array(&$this, 'query_vars'));
        add_action('pre_get_posts', array(&$this, 'pre_get_posts'), 10);
    }
 
    public function query_vars($vars) {
        $vars[] = 'location-type';
        return $vars;
    }

    public function pre_get_posts($query) {
        // Alter only main query, in frontend and for search requests
        if ($query->is_search && !is_admin() && $query->is_main_query()) {
            global $wp_query;
            $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
            $search_string = get_search_query();
            $location_type = get_query_var('location-type');            
            $args = array(
                // 'post_type' => array('post', 'page', 'attraction', 'faq', 'news', 'guide', 'event'),
                'post_type' => array('post', 'page', 'faq', 'news', 'guide', 'event'),
                'post_status' => 'publish',
                'posts_per_page' => 10,
                'paged' => $paged
            );
            $tax_query = array();
            if (!empty($search_string)) {
                $args['s'] = $search_string;
            }
            if (!empty($location_type)) {
                $tax_query[] = array(
                    'taxonomy' => 'location',
                    'field' => 'slug',
                    'terms' => $location_type
                );
            }
            if (!empty($tax_query)) {
                $args['tax_query'] = $tax_query;
            }
            $wp_query = new WP_Query($args);
        }
    }

    public function pagination($args = array(), $class = 'pagination') {
        if ($GLOBALS['wp_query']->max_num_pages <= 1)
            return;

        $args = wp_parse_args($args, array(
            'mid_size' => 2,
            //'prev_next'          => false,
            'prev_text' => __('<i class="icon-keyboard_arrow_left"></i> Previous', 'am'),
            'next_text' => __('Next <i class="icon-keyboard_arrow_right"></i>', 'am'),
            'screen_reader_text' => (''),
        ));
        $links = paginate_links($args);
        echo '<div class="' . $class . '">' . $links . '</div>';
    }

}

new FN_Search();
