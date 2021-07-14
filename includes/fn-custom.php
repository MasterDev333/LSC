<?php
add_image_size('header-hp-d', 1095, 675, true);
add_image_size('header-hp-d-2x', 2190, 1350, true);
add_image_size('header-hp-m', 375, 231, true);

add_image_size('header-video-d', 1670, 640, true);
add_image_size('header-video-d-2x', 3340, 1280, true);
add_image_size('header-video-m', 414, 618, true);

add_image_size('ci-1-d', 630, 700, true);
add_image_size('ci-1-d-2x', 1260, 1400, true);
add_image_size('ci-1-m', 375, 417, true);

add_image_size('ci-6-d', 755, 425, true);
add_image_size('ci-6-d-2x', 1510, 850, true);

add_image_size('ci-2-d', 575, 830, true);
add_image_size('ci-2-d-2x', 1150, 1660, true);
add_image_size('ci-2-m', 375, 541, true);

add_image_size('ci-e-1-d', 520, 458, true);
add_image_size('ci-e-1-d-2x', 1040, 916, true);
add_image_size('ci-e-1-m', 375, 330, true);
add_image_size('ci-e-2-d', 798, 651, true);
add_image_size('ci-e-2-d-2x', 1596, 1302, true);
add_image_size('ci-e-2-m', 375, 306, true);

add_image_size('ci-3-bg', 1670, 1070, true);

add_image_size('img-grid-d', 380, 250, true);
add_image_size('img-grid-d-2x', 760, 500, true);

add_image_size('gallery-d', 828, 582, true);
add_image_size('gallery-d-2x', 1656, 1164, true);
add_image_size('gallery-m', 375, 264, true);

add_image_size('community-d', 1670, 822, true);
add_image_size('community-d-2x', 3340, 1644, true);
add_image_size('community-m', 375, 466, true);

add_image_size('slider-d', 1670, 919, true);
add_image_size('slider-d-2x', 3340, 1838, true);
add_image_size('slider-m', 375, 206, true);

add_image_size('video-d', 749, 451, true);
add_image_size('video-d-2x', 1498, 902, true);
add_image_size('video-m', 375, 226, true);

add_image_size('plan-d', 520, 500, false);
add_image_size('plan-d-2x', 1040, 1000, false);
add_image_size('plan-m', 307, 270, false);

add_image_size('header-about-d', 1284, 561, true);
add_image_size('header-about-d-2x', 2568, 1122, true);
add_image_size('header-about-m', 375, 340, true);

add_image_size('ci-5-d', 628, 622, true);
// add_image_size( 'ci-5-d-2x', 628, 622, true );
add_image_size('ci-5-m', 375, 371, true);

add_image_size('ci-5-e-d', 517, 391, true);
add_image_size('ci-5-e-d-2x', 1034, 728, true);
add_image_size('ci-5-e-m', 375, 284, true);

add_image_size('event-big-d', 1287, 561, true);
add_image_size('event-big-d-2x', 2574, 1122, true);
add_image_size('event-big-m', 375, 163, true);

add_image_size('event-small-d', 517, 391, true); // duplicate
add_image_size('event-small-d-2x', 1034, 728, true);

add_image_size('contact-maps', 1670, 787, true);

add_image_size('team', 400, 400, true);
add_image_size('team-2x', 800, 800, true);

add_image_size('blog-d', 626, 385, true);
add_image_size('blog-d-2x', 1252, 770, true);

add_image_size('blog-single-d', 830, 582, true);
add_image_size('blog-single-d-2x', 1660, 1164, true);
add_image_size('blog-single-m', 375, 263, true);

add_image_size('blog-single-t', 410, 250, true);

add_image_size('slider-1', 1070, 717, true);
add_image_size('slider-1-2x', 2140, 1434, true);

add_image_size('slider-2', 9999, 750, true);
add_image_size('slider-2-2x', 9999, 1500, true);

add_image_size('landing-footer-map', 2614, 1098, true);

add_filter('upload_mimes', 'add_file_types_to_uploads');

function add_file_types_to_uploads($file_types) {
    $new_filetypes = array();
    $new_filetypes['svg'] = 'image/svg+xml';
    $file_types = array_merge($file_types, $new_filetypes);
    return $file_types;
}

// Full URL without query string
function page_full_url_without_query_string() {
    $s = &$_SERVER;
    $ssl = (!empty($s['HTTPS']) && $s['HTTPS'] == 'on') ? true : false;
    $sp = strtolower($s['SERVER_PROTOCOL']);
    $protocol = substr($sp, 0, strpos($sp, '/')) . (($ssl) ? 's' : '');
    $port = $s['SERVER_PORT'];
    $port = ((!$ssl && $port == '80') || ($ssl && $port == '443')) ? '' : ':' . $port;
    $host = isset($s['HTTP_X_FORWARDED_HOST']) ? $s['HTTP_X_FORWARDED_HOST'] : (isset($s['HTTP_HOST']) ? $s['HTTP_HOST'] : null);
    $host = isset($host) ? $host : $s['SERVER_NAME'] . $port;
    $uri = $protocol . '://' . $host . $s['REQUEST_URI'];
    $segments = explode('?', $uri, 2);
    $url = $segments[0];
    return $url;
}

// add a tag to link
// with comments
class Add_Class_To_Link_Walker extends Walker_Nav_Menu {

    function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) {
        if (isset($args->item_spacing) && 'discard' === $args->item_spacing) {
            $t = '';
            $n = '';
        } else {
            $t = "\t";
            $n = "\n";
        }
        $indent = ( $depth ) ? str_repeat($t, $depth) : '';

        $classes = empty($item->classes) ? array() : (array) $item->classes;
        $classes[] = 'menu-item-' . $item->ID;

        /**
         * Filters the arguments for a single nav menu item.
         *
         * @since 4.4.0
         *
         * @param stdClass $args  An object of wp_nav_menu() arguments.
         * @param WP_Post  $item  Menu item data object.
         * @param int      $depth Depth of menu item. Used for padding.
         */
        $args = apply_filters('nav_menu_item_args', $args, $item, $depth);
        // var_dump_pre( $args );

        /**
         * Filters the CSS classes applied to a menu item's list item element.
         *
         * @since 3.0.0
         * @since 4.1.0 The `$depth` parameter was added.
         *
         * @param string[] $classes Array of the CSS classes that are applied to the menu item's `<li>` element.
         * @param WP_Post  $item    The current menu item.
         * @param stdClass $args    An object of wp_nav_menu() arguments.
         * @param int      $depth   Depth of menu item. Used for padding.
         */
        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args, $depth));
        $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';


        /**
         * Filters the ID applied to a menu item's list item element.
         *
         * @since 3.0.1
         * @since 4.1.0 The `$depth` parameter was added.
         *
         * @param string   $menu_id The ID that is applied to the menu item's `<li>` element.
         * @param WP_Post  $item    The current menu item.
         * @param stdClass $args    An object of wp_nav_menu() arguments.
         * @param int      $depth   Depth of menu item. Used for padding.
         */
        $id = apply_filters('nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args, $depth);
        $id = $id ? ' id="' . esc_attr($id) . '"' : '';

        $output .= $indent . '<li' . $id . $class_names . '>';

        $atts = array();
        $atts['title'] = !empty($item->attr_title) ? $item->attr_title : '';
        $atts['target'] = !empty($item->target) ? $item->target : '';
        if ('_blank' === $item->target && empty($item->xfn)) {
            $atts['rel'] = 'noopener noreferrer';
        } else {
            $atts['rel'] = $item->xfn;
        }
        $atts['href'] = !empty($item->url) ? $item->url : '';
        $atts['aria-current'] = $item->current ? 'page' : '';

        //-----------------------------------------------------------------------------------------------------
        // needs ACF option set
        // $atts['class'] = get_field( 'a_tag_class', $item ) ? get_field( 'a_tag_class', $item  ) : '';
        //-----------------------------------------------------------------------------------------------------

        /**
         * Filters the HTML attributes applied to a menu item's anchor element.
         *
         * @since 3.6.0
         * @since 4.1.0 The `$depth` parameter was added.
         *
         * @param array $atts {
         *     The HTML attributes applied to the menu item's `<a>` element, empty strings are ignored.
         *
         *     @type string $title        Title attribute.
         *     @type string $target       Target attribute.
         *     @type string $rel          The rel attribute.
         *     @type string $href         The href attribute.
         *     @type string $aria_current The aria-current attribute.
         * }
         * @param WP_Post  $item  The current menu item.
         * @param stdClass $args  An object of wp_nav_menu() arguments.
         * @param int      $depth Depth of menu item. Used for padding.
         */
        $atts = apply_filters('nav_menu_link_attributes', $atts, $item, $args, $depth);

        $attributes = '';
        foreach ($atts as $attr => $value) {
            if (!empty($value)) {
                $value = ( 'href' === $attr ) ? esc_url($value) : esc_attr($value);
                $attributes .= ' ' . $attr . '="' . $value . '"';
            }
        }

        /** This filter is documented in wp-includes/post-template.php */
        $title = apply_filters('the_title', $item->title, $item->ID);

        /**
         * Filters a menu item's title.
         *
         * @since 4.4.0
         *
         * @param string   $title The menu item's title.
         * @param WP_Post  $item  The current menu item.
         * @param stdClass $args  An object of wp_nav_menu() arguments.
         * @param int      $depth Depth of menu item. Used for padding.
         */
        $title = apply_filters('nav_menu_item_title', $title, $item, $args, $depth);

        $item_output = $args->before;
        $item_output .= '<a' . $attributes . '>';
        $item_output .= $args->link_before . $title . $args->link_after;
        $item_output .= '</a>';
        // $item_output .= '</a><span class="trigger"><i class="far fa-chevron-down"></i></span>';

        $item_output .= $args->after;

        /**
         * Filters a menu item's starting output.
         *
         * The menu item's starting output only includes `$args->before`, the opening `<a>`,
         * the menu item's title, the closing `</a>`, and `$args->after`. Currently, there is
         * no filter for modifying the opening and closing `<li>` for a menu item.
         *
         * @since 3.0.0
         *
         * @param string   $item_output The menu item's starting HTML output.
         * @param WP_Post  $item        Menu item data object.
         * @param int      $depth       Depth of menu item. Used for padding.
         * @param stdClass $args        An object of wp_nav_menu() arguments.
         */
        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }

}

/** Main Header Menu */
function custom_header_menu($theme_location) {
    if (( $theme_location ) && ( $locations = get_nav_menu_locations() ) && isset($locations[$theme_location])) {

        $menu = get_term($locations[$theme_location], 'nav_menu');
        $menu_items = wp_get_nav_menu_items($menu->term_id);

        $menu_list .= '';
        $last_menu_item = end($menu_items);
        // $current_page_url = page_full_url_without_query_string();

        $count = 0;
        $submenu = false;

        foreach ($menu_items as $menu_item) {
            // var_dump_pre( $menu_item );
            $link = $menu_item->url;
            $title = $menu_item->title;
            $target = $menu_item->target;
            $active_menu_class = '';

            // if( $link == $current_page_url) {
            //    $active_menu_class = ' current-menu-item';
            // }

            $class_names = $value = '';
            $classes = empty($menu_item->classes) ? array() : (array) $menu_item->classes;
            $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $menu_item));

            if (!$menu_item->menu_item_parent) {
                $parent_id = $menu_item->ID;

                $menu_list .= '<li class="' . $class_names . ' ">' . "\n";

                $menu_list .= '<a href="' . $link . '" target="' . $target . '">' . $title . '</a>' . "\n";
            }

            if ($parent_id == $menu_item->menu_item_parent) {

                if (!$submenu) {
                    $submenu = true;
                    $menu_list .= '<ul>' . "\n";
                }

                $menu_list .= '<li>' . "\n";
                $menu_list .= '<a href="' . $link . '" target="' . $target . '">' . $title . '</a>' . "\n";

                $level_2_menu_id = $menu_item->ID;

                if (get_nav_menu_item_children($level_2_menu_id, $menu_items)) {
                    $level_3_submenu = false;
                    $lvl_3_submenu_count = 1;
                    $level_2_childrens = get_nav_menu_item_children($level_2_menu_id, $menu_items);
                    $lvl_3_last_menu_item = end($level_2_childrens);

                    foreach ($level_2_childrens as $level_3_single_menu) {

                        if ($lvl_3_submenu_count == 1 && !$level_3_submenu) {
                            $level_3_submenu = true;
                            $menu_list .= '<ul>' . "\n";
                        }

                        $menu_list .= '<li><a href="' . $level_3_single_menu->url . '" target="' . $target . '">' . $level_3_single_menu->title . '</a></li>' . "\n";

                        if (($level_3_single_menu->ID == $lvl_3_last_menu_item->ID) && $level_3_submenu) {
                            $menu_list .= '</ul>' . "\n";
                            $level_3_submenu = false;
                        }

                        $lvl_3_submenu_count++;
                    }
                }

                $menu_list .= '</li>' . "\n";

                if ($menu_items[$count + 1]->menu_item_parent != $parent_id && $menu_items[$count + 1]->menu_item_parent != $menu_item->ID && $submenu) {
                    $menu_list .= '</ul>' . "\n";
                    $submenu = false;
                }
            }

            if (isset($menu_items[$count + 1]) && ( 0 == $menu_items[$count + 1]->menu_item_parent )) {
                $menu_list .= '</li>' . "\n";
                $submenu = false;
            }

            // if($last_menu_item->ID == $menu_items[$count]->ID){
            //     $menu_list .= '</li>' . "\n";
            // }

            $count++;
        }

        $menu_list .= '';
    } else {
        $menu_list = '<!-- no menu defined in location "' . $theme_location . '" -->';
    }
    return $menu_list;
}

/** Main Header Menu */
function custom_header_mobile_menu($theme_location) {
    if (($theme_location) && ($locations = get_nav_menu_locations()) && isset($locations[$theme_location])) {
        $menu = get_term($locations[$theme_location], 'nav_menu');
        $menu_items = wp_get_nav_menu_items($menu->term_id);

        $menu_list .= '';
        $last_menu_item = end($menu_items);

        $count = 0;
        $submenu = false;

        foreach ($menu_items as $menu_item) {

            $link = $menu_item->url;
            $title = $menu_item->title;
            $target = $menu_item->target;
            $menu_id = $menu_item->ID;

            $class_names = $value = '';
            $classes = empty($menu_item->classes) ? array() : (array) $menu_item->classes;
            $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $menu_item));

            if (!$menu_item->menu_item_parent) {
                $parent_id = $menu_item->ID;

                if (get_nav_menu_item_children($menu_id, $menu_items)) {
                    $menu_list .= '<li class="menu-item-has-children ' . $class_names . ' ">' . "\n";
                } else {
                    if ($class_names) {
                        $menu_list .= '<li class="' . $class_names . ' ">' . "\n";
                    } else {
                        $menu_list .= '<li>' . "\n";
                    }
                }

                $menu_list .= '<a href="' . $link . '" target="' . $target . '">' . $title . '</a>' . "\n";
            }

            if ($parent_id == $menu_item->menu_item_parent) {

                if (!$submenu) {
                    $submenu = true;
                    $menu_list .= '<ul class="sub-menu">' . "\n";

                    $menu_obj = get_single_menu_item_details_by_id($parent_id, $menu_items);
                    $menu_list .= '<li><a href="' . $menu_obj->url . '">' . $menu_obj->title . '</a></li>' . "\n";
                }

                if (get_nav_menu_item_children($menu_id, $menu_items)) {
                    $menu_list .= '<li class="menu-item-has-children ' . $class_names . ' ">' . "\n";
                } else {
                    if ($class_names) {
                        $menu_list .= '<li class="' . $class_names . ' ">' . "\n";
                    } else {
                        $menu_list .= '<li>' . "\n";
                    }
                }

                $menu_list .= '<a href="' . $link . '" target="' . $target . '">' . $title . '</a>' . "\n";

                $level_2_menu_id = $menu_item->ID;

                if (get_nav_menu_item_children($level_2_menu_id, $menu_items)) {
                    $level_3_submenu = false;
                    $lvl_3_submenu_count = 1;
                    $level_2_childrens = get_nav_menu_item_children($level_2_menu_id, $menu_items);
                    $lvl_3_last_menu_item = end($level_2_childrens);

                    foreach ($level_2_childrens as $level_3_single_menu) {

                        if ($lvl_3_submenu_count == 1 && !$level_3_submenu) {
                            $level_3_submenu = true;
                            $menu_list .= '<ul class="sub-menu">' . "\n";

                            $menu_level_2_obj = get_single_menu_item_details_by_id($level_2_menu_id, $menu_items);
                            $menu_list .= '<li><a href="' . $menu_level_2_obj->url . '">' . $menu_level_2_obj->title . '</a></li>' . "\n";
                        }

                        if ($class_names) {
                            $menu_list .= '<li class="' . $class_names . ' ">' . "\n";
                        } else {
                            $menu_list .= '<li>' . "\n";
                        }

                        $menu_list .= '<a href="' . $level_3_single_menu->url . '" target="' . $target . '">' . $level_3_single_menu->title . '</a>' . "\n";
                        $menu_list .= '</li>' . "\n";

                        if (($level_3_single_menu->ID == $lvl_3_last_menu_item->ID) && $level_3_submenu) {
                            $menu_list .= '</ul>' . "\n";
                            $level_3_submenu = false;
                        }

                        $lvl_3_submenu_count++;
                    }
                }

                $menu_list .= '</li>' . "\n";

                if ($menu_items[$count + 1]->menu_item_parent != $parent_id && $menu_items[$count + 1]->menu_item_parent != $menu_item->ID && $submenu) {
                    $menu_list .= '</ul>' . "\n";
                    $submenu = false;
                }
            }

            if (isset($menu_items[$count + 1]) && ( 0 == $menu_items[$count + 1]->menu_item_parent )) {
                $menu_list .= '</li>' . "\n";
                $submenu = false;
            }

            // if($last_menu_item->ID == $menu_items[$count]->ID){
            //     $menu_list .= '</li>' . "\n";
            // }

            $count++;
        }

        $menu_list .= '';
    } else {
        $menu_list = '<!-- no menu defined in location "' . $theme_location . '" -->';
    }
    return $menu_list;
}

/**
 * Returns all child nav_menu_items under a specific parent
 *
 * @param int the parent nav_menu_item ID
 * @param array nav_menu_items
 * @param bool gives all children or direct children only
 * @return array returns filtered array of nav_menu_items
 */
function get_nav_menu_item_children($parent_id, $nav_menu_items, $depth = true) {
    $nav_menu_item_list = array();
    foreach ((array) $nav_menu_items as $nav_menu_item) {
        if ($nav_menu_item->menu_item_parent == $parent_id) {
            $nav_menu_item_list[] = $nav_menu_item;
            if ($depth) {
                if ($children = get_nav_menu_item_children($nav_menu_item->ID, $nav_menu_items)) {
                    $nav_menu_item_list = array_merge($nav_menu_item_list, $children);
                }
            }
        }
    }
    return $nav_menu_item_list;
}

// Top Header Menu
function top_header_custom_menu($theme_location) {

    if (($theme_location) && ($locations = get_nav_menu_locations()) && isset($locations[$theme_location])) {

        $menu = get_term($locations[$theme_location], 'nav_menu');
        $menu_items = wp_get_nav_menu_items($menu->term_id);

        $menu_list = '';
        $count = 0;

        foreach ($menu_items as $menu_item) {
            $link = $menu_item->url;
            $title = $menu_item->title;
            $target = $menu_item->target;

            $class_names = $value = '';

            $classes = empty($menu_item->classes) ? array() : (array) $menu_item->classes;

            $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $menu_item));

            if (!$menu_item->menu_item_parent) {
                $parent_id = $menu_item->ID;

                if ($class_names) {
                    $menu_list .= '<li class="' . $class_names . '">' . "\n";
                } else {
                    $menu_list .= '<li>' . "\n";
                }

                $menu_list .= '<a target="' . $target . '" href="' . $link . '">' . $title . '</a>' . "\n";
            }

            if ($menu_items[$count + 1]->menu_item_parent != $parent_id) {
                $menu_list .= '</li>' . "\n";
            }

            $count++;
        }
    } else {
        $menu_list = '<!-- no menu defined in location "' . $theme_location . '" -->';
    }
    return $menu_list;
}

// Footer custom menu
function custom_footer_menu($theme_location) {
    if (($theme_location) && ($locations = get_nav_menu_locations()) && isset($locations[$theme_location])) {
        $menu = get_term($locations[$theme_location], 'nav_menu');
        $menu_items = wp_get_nav_menu_items($menu->term_id);

        $menu_list .= '';
        $last_menu_item = end($menu_items);

        $count = 0;
        $submenu = false;

        foreach ($menu_items as $menu_item) {

            $link = $menu_item->url;
            $title = $menu_item->title;

            $class_names = $value = '';
            $classes = empty($menu_item->classes) ? array() : (array) $menu_item->classes;
            $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $menu_item));

            if (!$menu_item->menu_item_parent) {
                $parent_id = $menu_item->ID;

                $menu_list .= '<div>' . "\n";
                if( $link ){
                    $menu_list .= '<h6 class="arrow-right">';
                        $menu_list .= '<a href="' . $link . '">' . $title . '</a>' . "\n";
                    $menu_list .= '</h6>' . "\n";
                }
                else{
                    $menu_list .= '<h6 class="arrow-right">' . $title . '</h6>' . "\n";
                }
            }

            if ($parent_id == $menu_item->menu_item_parent) {

                if (!$submenu) {
                    $submenu = true;
                    $menu_list .= '<ul class="footer-nav">' . "\n";
                }

                $menu_list .= '<li>' . "\n";
                $menu_list .= '<a href="' . $link . '">' . $title . '</a>' . "\n";
                $menu_list .= '</li>' . "\n";


                if ($menu_items[$count + 1]->menu_item_parent != $parent_id && $submenu) {
                    $menu_list .= '</ul>' . "\n";
                    $submenu = false;
                }
            }

            if (isset($menu_items[$count + 1]) && ( 0 == $menu_items[$count + 1]->menu_item_parent )) {
                $menu_list .= '</div>' . "\n";
                $submenu = false;
            }

            if ($last_menu_item->ID == $menu_items[$count]->ID) {
                $menu_list .= '</div>' . "\n";
            }

            $count++;
        }

        $menu_list .= '';
    } else {
        $menu_list = '<!-- no menu defined in location "' . $theme_location . '" -->';
    }
    return $menu_list;
}

// ACF group field checking if array keys have value
function acf_group_field_key_value_checking($arr) {
    $arr_count = count($arr);
    $arr_key_values = false;

    foreach ($arr as $key => $value) {
        if (!empty($arr[$key])) {
            $arr_key_values = true;
        }
    }

    return $arr_key_values;
}

// Add shortcode support to textarea field of ACF.
add_filter('acf/format_value/type=textarea', 'do_shortcode');

// Shortcode [year] support
function year_shortcode($atts, $content = null) {
    extract($atts = shortcode_atts(
            array(
        '' => '',
            ), $atts, 'year'));
    ob_start();
    ?>
    <?php echo get_the_date('Y'); ?>
    <?php
    return ob_get_clean();
}

add_shortcode('year', 'year_shortcode');

// Get single menu item details by ID
function get_single_menu_item_details_by_id($menu_id, $nav_menu_items) {
    $menu_item_details = '';
    foreach ((array) $nav_menu_items as $nav_menu_item) {
        if ($nav_menu_item->ID == $menu_id) {
            $menu_item_details = $nav_menu_item;
        }
    }
    return $menu_item_details;
}

/**
 * Like get_template_part() put lets you pass args to the template file
 * Args are available in the tempalte as $template_args array
 * @param string filepart
 * @param mixed wp_args style argument list
 * https://wordpress.stackexchange.com/questions/176804/passing-a-variable-to-get-template-part
 */
function get_template_part_args($file, $template_args = array(), $cache_args = array()) {
    $template_args = wp_parse_args($template_args);
    $cache_args = wp_parse_args($cache_args);
    if ($cache_args) {
        foreach ($template_args as $key => $value) {
            if (is_scalar($value) || is_array($value)) {
                $cache_args[$key] = $value;
            } else if (is_object($value) && method_exists($value, 'get_id')) {
                $cache_args[$key] = call_user_method('get_id', $value);
            }
        }
        if (( $cache = wp_cache_get($file, serialize($cache_args)) ) !== false) {
            if (!empty($template_args['return']))
                return $cache;
            echo $cache;
            return;
        }
    }
    $file_handle = $file;
    do_action('start_operation', 'hm_template_part::' . $file_handle);
    if (file_exists(get_stylesheet_directory() . '/' . $file . '.php'))
        $file = get_stylesheet_directory() . '/' . $file . '.php';
    elseif (file_exists(get_template_directory() . '/' . $file . '.php'))
        $file = get_template_directory() . '/' . $file . '.php';
    ob_start();
    $return = require( $file );
    $data = ob_get_clean();
    do_action('end_operation', 'hm_template_part::' . $file_handle);
    if ($cache_args) {
        wp_cache_set($file, $data, serialize($cache_args), 3600);
    }
    if (!empty($template_args['return']))
        if ($return === false)
            return false;
        else
            return $data;
    echo $data;
}

/*
 * name: var_dump_pre
 * description: formated var_dump
 * 
 * */

function var_dump_pre($var, $title = '', $color = 'white', $dump = FALSE) {
    ?>

    <?php
    $style = 'clear:both;overflow:auto;border:1px solid #BFBFBF; margin-top:10px; padding-left:3px;padding-bottom:3px;background-color:' . $color;
    echo '<div class="debug" style="' . $style . '" >';
    $db = debug_backtrace();
    //echo 'function: '.$db[0]['file'].' @ line:['.$db[0]['line'].']';
    $file = strrev(implode(strrev(' /<span style="color:black">'), explode("/", strrev($db[0]['file']), 2)));
    $file .= '</span>';
    echo '<div style="width:100%; margin-left:-3px; color:#969696;background-color:#F0F0F0;padding:3px 0px 3px 3px"><small><span style="color:black">file: </span>' . $file . ' <br />@<br /><span style="color:black">line:[' . $db[0]['line'] . ']</span></small></div>';
    echo '<pre>';

    if ($title != '')
        echo '<div style="width:100%; margin-left:-3px; background-color:#E5E5F8;padding:3px 0px 3px 3px"><strong>' . $title . ':</strong></div><br />';

    if ($dump || is_bool($var)) {
        if (is_bool($var)) {

            switch ($var) {
                case TRUE:
                    echo '<span style="color:green">';
                    var_dump($var);
                    echo '</span>';
                    break;

                case FALSE:
                    echo '<span style="color:red">';
                    var_dump($var);
                    echo '</span>';
                    break;
            }
        } else
            var_dump($var);
    } else
        print_r($var);
    echo '</pre>';
    echo '</div>';
    echo '<div style="clear:both"></div>';
}

add_action('wp_head', 'my_wp_ajaxurl');

function my_wp_ajaxurl() {
    $url = parse_url(home_url());
    if ($url['scheme'] == 'https') {
        $protocol = 'https';
    } else {
        $protocol = 'http';
    }
    ?>
    <script type="text/javascript">
        var ajaxurl = '<?php echo admin_url('admin-ajax.php', $protocol); ?>';
    </script>
    <?php
}

add_action('init', function () {
    add_rewrite_rule('news/?$', 'index.php?pagename=news', 'top');
    flush_rewrite_rules();
}, 1000);

add_filter('frm_setup_new_fields_vars', 'frm_set_edit_val', 20, 2);

function frm_set_edit_val($values, $field) {

    global $post;

    // var_dump_pre( $post );
    // var_dump_pre( $field );

    if ($field->id == 10) { // Replace 171 with your field ID
        // If on the back-end, don't adjust field value
        if (FrmAppHelper::is_admin()) {
            return $values;
        }
        // If on front-end set a specific field value
        $values['value'] = get_permalink($post->ID);
    }

    return $values;
}

add_action('frm_after_create_entry', 'create_cookie', 30, 2);

function create_cookie() {

    setcookie('view_guides', '1', time() + ( 3600 * 24 * 7 ), '/');
}

add_action('wp_head', 'custom_wp_head');
function custom_wp_head() {
    ?>
    <!-- wp_head custom scripts -->
        <?php if( $head = get_field( 'head', 'option' )): ?> 
            <?php echo $head; ?>
        <?php endif; ?>
    <!-- END: wp_head custom scripts -->
    <?php
}

function add_slug_body_class( $classes ) {
global $post;
if ( isset( $post ) ) {
$classes[] = $post->post_type . '-' . $post->post_name;
}
return $classes;
}
add_filter( 'body_class', 'add_slug_body_class' );

add_filter( 'frm_api_request_args', 'my_custom_frm_api_request_header', 10, 2 );
function my_custom_frm_api_request_header( $arg_array, $args ) {
    if ( $args['url'] == 'https://api2.enquiresolutions.com/2/Individual/' ) { 
        $arg_array['headers']['Ocp-Apim-Subscription-Key'] = '73f7c375f9784c95905ce440e25578cb';
    }
    return $arg_array;
}