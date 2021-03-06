<?php

// Register Custom Post Type
add_action( 'init', 'am_custom_post_types', 0 );
function am_custom_post_types() {

	$labels = array(
		'name'                  => _x( 'Attractions', 'Post Type General Name', 'text_domain' ),
		'singular_name'         => _x( 'Attraction', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'             => __( 'Attractions', 'text_domain' ),
		'name_admin_bar'        => __( 'Attraction', 'text_domain' ),
		'archives'              => __( 'Attraction Archives', 'text_domain' ),
		'attributes'            => __( 'Attraction Attributes', 'text_domain' ),
		'parent_item_colon'     => __( 'Parent Attraction:', 'text_domain' ),
		'all_items'             => __( 'All Attractions', 'text_domain' ),
		'add_new_item'          => __( 'Add New Attraction', 'text_domain' ),
		'add_new'               => __( 'Add New', 'text_domain' ),
		'new_item'              => __( 'New Attraction', 'text_domain' ),
		'edit_item'             => __( 'Edit Attraction', 'text_domain' ),
		'update_item'           => __( 'Update Attraction', 'text_domain' ),
		'view_item'             => __( 'View Attraction', 'text_domain' ),
		'view_items'            => __( 'View Attractions', 'text_domain' ),
		'search_items'          => __( 'Search Attraction', 'text_domain' ),
		'not_found'             => __( 'Not found', 'text_domain' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'text_domain' ),
		'featured_image'        => __( 'Featured Image', 'text_domain' ),
		'set_featured_image'    => __( 'Set featured image', 'text_domain' ),
		'remove_featured_image' => __( 'Remove featured image', 'text_domain' ),
		'use_featured_image'    => __( 'Use as featured image', 'text_domain' ),
		'insert_into_item'      => __( 'Insert into attraction', 'text_domain' ),
		'uploaded_to_this_item' => __( 'Uploaded to this attraction', 'text_domain' ),
		'items_list'            => __( 'Attractions list', 'text_domain' ),
		'items_list_navigation' => __( 'Attractions list navigation', 'text_domain' ),
		'filter_items_list'     => __( 'Filter attractions list', 'text_domain' ),
	);
	$args = array(
		'label'                 => __( 'Attraction', 'text_domain' ),
		'menu_icon'				=> 'dashicons-location',
		'description'           => __( 'Post Type Description', 'text_domain' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor', 'thumbnail' ),
		'taxonomies'            => array( 'location', 'type' ),
		'hierarchical'          => true,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => false,
		'exclude_from_search'   => true,
		'publicly_queryable'    => false,
		'capability_type'       => 'post',
	);
	register_post_type( 'attraction', $args );

	$labels = array(
		'name'                  => _x( 'FAQ', 'Post Type General Name', 'text_domain' ),
		'singular_name'         => _x( 'FAQ', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'             => __( 'FAQ', 'text_domain' ),
		'name_admin_bar'        => __( 'FAQ', 'text_domain' ),
		'archives'              => __( 'FAQ Archives', 'text_domain' ),
		'attributes'            => __( 'FAQ Attributes', 'text_domain' ),
		'parent_item_colon'     => __( 'Parent FAQ:', 'text_domain' ),
		'all_items'             => __( 'All FAQ', 'text_domain' ),
		'add_new_item'          => __( 'Add New FAQ', 'text_domain' ),
		'add_new'               => __( 'Add New', 'text_domain' ),
		'new_item'              => __( 'New FAQ', 'text_domain' ),
		'edit_item'             => __( 'Edit FAQ', 'text_domain' ),
		'update_item'           => __( 'Update FAQ', 'text_domain' ),
		'view_item'             => __( 'View FAQ', 'text_domain' ),
		'view_items'            => __( 'View FAQ', 'text_domain' ),
		'search_items'          => __( 'Search FAQ', 'text_domain' ),
		'not_found'             => __( 'Not found', 'text_domain' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'text_domain' ),
		'featured_image'        => __( 'Featured Image', 'text_domain' ),
		'set_featured_image'    => __( 'Set featured image', 'text_domain' ),
		'remove_featured_image' => __( 'Remove featured image', 'text_domain' ),
		'use_featured_image'    => __( 'Use as featured image', 'text_domain' ),
		'insert_into_item'      => __( 'Insert into FAQ', 'text_domain' ),
		'uploaded_to_this_item' => __( 'Uploaded to this FAQ', 'text_domain' ),
		'items_list'            => __( 'FAQ list', 'text_domain' ),
		'items_list_navigation' => __( 'FAQ list navigation', 'text_domain' ),
		'filter_items_list'     => __( 'Filter FAQs list', 'text_domain' ),
	);
	$args = array(
		'label'                 => __( 'FAQ', 'text_domain' ),
		'description'           => __( 'Post Type Description', 'text_domain' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor', 'thumbnail' ),
		'taxonomies'            => array( 'location', 'type' ),
		'hierarchical'          => false,
		'public'                => false,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => false,
		'exclude_from_search'   => true,
		'publicly_queryable'    => false,
		'capability_type'       => 'post',
	);
	register_post_type( 'faq', $args );

	$labels = array(
		'name'                  => _x( 'News', 'Post Type General Name', 'text_domain' ),
		'singular_name'         => _x( 'News', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'             => __( 'News', 'text_domain' ),
		'name_admin_bar'        => __( 'News', 'text_domain' ),
		'archives'              => __( 'News Archives', 'text_domain' ),
		'attributes'            => __( 'News Attributes', 'text_domain' ),
		'parent_item_colon'     => __( 'Parent News:', 'text_domain' ),
		'all_items'             => __( 'All News', 'text_domain' ),
		'add_new_item'          => __( 'Add New News', 'text_domain' ),
		'add_new'               => __( 'Add New', 'text_domain' ),
		'new_item'              => __( 'New News', 'text_domain' ),
		'edit_item'             => __( 'Edit News', 'text_domain' ),
		'update_item'           => __( 'Update News', 'text_domain' ),
		'view_item'             => __( 'View News', 'text_domain' ),
		'view_items'            => __( 'View News', 'text_domain' ),
		'search_items'          => __( 'Search News', 'text_domain' ),
		'not_found'             => __( 'Not found', 'text_domain' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'text_domain' ),
		'featured_image'        => __( 'Featured Image', 'text_domain' ),
		'set_featured_image'    => __( 'Set featured image', 'text_domain' ),
		'remove_featured_image' => __( 'Remove featured image', 'text_domain' ),
		'use_featured_image'    => __( 'Use as featured image', 'text_domain' ),
		'insert_into_item'      => __( 'Insert into attraction', 'text_domain' ),
		'uploaded_to_this_item' => __( 'Uploaded to this attraction', 'text_domain' ),
		'items_list'            => __( 'News list', 'text_domain' ),
		'items_list_navigation' => __( 'News list navigation', 'text_domain' ),
		'filter_items_list'     => __( 'Filter attractions list', 'text_domain' ),
	);
	$args = array(
		'label'                 => __( 'Attraction', 'text_domain' ),
		'description'           => __( 'Post Type Description', 'text_domain' ),
		'menu_icon'				=> 'dashicons-admin-site-alt3',
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor', 'thumbnail' ),
		'taxonomies'            => array( 'location', 'type' ),
		'hierarchical'          => true,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'post',
	);
	register_post_type( 'news', $args );

	$labels = array(
		'name'                  => _x( 'Guide', 'Post Type General Name', 'text_domain' ),
		'singular_name'         => _x( 'Guide', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'             => __( 'Guide', 'text_domain' ),
		'name_admin_bar'        => __( 'Guide', 'text_domain' ),
		'archives'              => __( 'Guide Archives', 'text_domain' ),
		'attributes'            => __( 'Guide Attributes', 'text_domain' ),
		'parent_item_colon'     => __( 'Parent Guide:', 'text_domain' ),
		'all_items'             => __( 'All Guide', 'text_domain' ),
		'add_new_item'          => __( 'Add New Guide', 'text_domain' ),
		'add_new'               => __( 'Add New', 'text_domain' ),
		'new_item'              => __( 'New Guide', 'text_domain' ),
		'edit_item'             => __( 'Edit Guide', 'text_domain' ),
		'update_item'           => __( 'Update Guide', 'text_domain' ),
		'view_item'             => __( 'View Guide', 'text_domain' ),
		'view_items'            => __( 'View Guide', 'text_domain' ),
		'search_items'          => __( 'Search Guide', 'text_domain' ),
		'not_found'             => __( 'Not found', 'text_domain' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'text_domain' ),
		'featured_image'        => __( 'Featured Image', 'text_domain' ),
		'set_featured_image'    => __( 'Set featured image', 'text_domain' ),
		'remove_featured_image' => __( 'Remove featured image', 'text_domain' ),
		'use_featured_image'    => __( 'Use as featured image', 'text_domain' ),
		'insert_into_item'      => __( 'Insert into guide', 'text_domain' ),
		'uploaded_to_this_item' => __( 'Uploaded to this guide', 'text_domain' ),
		'items_list'            => __( 'Guide list', 'text_domain' ),
		'items_list_navigation' => __( 'Guide list navigation', 'text_domain' ),
		'filter_items_list'     => __( 'Filter guides list', 'text_domain' ),
	);
	$args = array(
		'label'                 => __( 'Guide', 'text_domain' ),
		'description'           => __( 'Post Type Description', 'text_domain' ),
		'menu_icon'				=> 'dashicons-media-document',
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor', 'thumbnail' ),
		'taxonomies'            => array( 'location', 'type' ),
		'hierarchical'          => true,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'post',
	);
	register_post_type( 'guide', $args );

	$labels = array(
		'name'                  => _x( 'Events', 'Post Type General Name', 'text_domain' ),
		'singular_name'         => _x( 'Event', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'             => __( 'Events', 'text_domain' ),
		'name_admin_bar'        => __( 'Event', 'text_domain' ),
		'archives'              => __( 'Event Archives', 'text_domain' ),
		'attributes'            => __( 'Event Attributes', 'text_domain' ),
		'parent_item_colon'     => __( 'Parent Event:', 'text_domain' ),
		'all_items'             => __( 'All Events', 'text_domain' ),
		'add_new_item'          => __( 'Add New Event', 'text_domain' ),
		'add_new'               => __( 'Add New', 'text_domain' ),
		'new_item'              => __( 'New Event', 'text_domain' ),
		'edit_item'             => __( 'Edit Event', 'text_domain' ),
		'update_item'           => __( 'Update Event', 'text_domain' ),
		'view_item'             => __( 'View Event', 'text_domain' ),
		'view_items'            => __( 'View Events', 'text_domain' ),
		'search_items'          => __( 'Search Event', 'text_domain' ),
		'not_found'             => __( 'Not found', 'text_domain' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'text_domain' ),
		'featured_image'        => __( 'Featured Image', 'text_domain' ),
		'set_featured_image'    => __( 'Set featured image', 'text_domain' ),
		'remove_featured_image' => __( 'Remove featured image', 'text_domain' ),
		'use_featured_image'    => __( 'Use as featured image', 'text_domain' ),
		'insert_into_item'      => __( 'Insert into Event', 'text_domain' ),
		'uploaded_to_this_item' => __( 'Uploaded to this Event', 'text_domain' ),
		'items_list'            => __( 'Events list', 'text_domain' ),
		'items_list_navigation' => __( 'Events list navigation', 'text_domain' ),
		'filter_items_list'     => __( 'Filter Events list', 'text_domain' ),
	);
	$args = array(
		'label'                 => __( 'Event', 'text_domain' ),
		'description'           => __( 'Post Type Description', 'text_domain' ),
		'menu_icon'				=> 'dashicons-calendar-alt',
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor' ),
		'taxonomies'            => array( 'location', 'type' ),
		'hierarchical'          => true,
		'public'                => false,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => false,
		'exclude_from_search'   => false,
		'publicly_queryable'    => false,
		'capability_type'       => 'post',
	);
	register_post_type( 'event', $args );
}

// Register Custom Taxonomy
add_action( 'init', 'am_custom_taxonomy', 0 );
function am_custom_taxonomy() {

	$labels = array(
		'name'                       => _x( 'Locations', 'Taxonomy General Name', 'text_domain' ),
		'singular_name'              => _x( 'Location', 'Taxonomy Singular Name', 'text_domain' ),
		'menu_name'                  => __( 'Locations', 'text_domain' ),
		'all_items'                  => __( 'All Locations', 'text_domain' ),
		'parent_item'                => __( 'Parent Location', 'text_domain' ),
		'parent_item_colon'          => __( 'Parent Location:', 'text_domain' ),
		'new_item_name'              => __( 'New Location Name', 'text_domain' ),
		'add_new_item'               => __( 'Add New Location', 'text_domain' ),
		'edit_item'                  => __( 'Edit Location', 'text_domain' ),
		'update_item'                => __( 'Update Location', 'text_domain' ),
		'view_item'                  => __( 'View Location', 'text_domain' ),
		'separate_items_with_commas' => __( 'Separate Locations with commas', 'text_domain' ),
		'add_or_remove_items'        => __( 'Add or remove Locations', 'text_domain' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'text_domain' ),
		'popular_items'              => __( 'Popular Locations', 'text_domain' ),
		'search_items'               => __( 'Search Locations', 'text_domain' ),
		'not_found'                  => __( 'Not Found', 'text_domain' ),
		'no_terms'                   => __( 'No Locations', 'text_domain' ),
		'items_list'                 => __( 'Locations list', 'text_domain' ),
		'items_list_navigation'      => __( 'Locations list navigation', 'text_domain' ),
	);
	$args = array(
		'labels'                     => $labels,
		'hierarchical'               => true,
		'public'                     => true,
		'show_ui'                    => true,
		'show_admin_column'          => true,
		'show_in_nav_menus'          => true,
		'show_tagcloud'              => true,
	);
	register_taxonomy( 'location', array( 'attraction', 'post', 'page', 'faq', 'news', 'guide', 'event' ), $args );
        
    $labels = array(
		'name'                       => _x( 'Types', 'Taxonomy General Name', 'text_domain' ),
		'singular_name'              => _x( 'Type', 'Taxonomy Singular Name', 'text_domain' ),
		'menu_name'                  => __( 'Types', 'text_domain' ),
		'all_items'                  => __( 'All Types', 'text_domain' ),
		'parent_item'                => __( 'Parent Type', 'text_domain' ),
		'parent_item_colon'          => __( 'Parent Type:', 'text_domain' ),
		'new_item_name'              => __( 'New Type Name', 'text_domain' ),
		'add_new_item'               => __( 'Add New Type', 'text_domain' ),
		'edit_item'                  => __( 'Edit Type', 'text_domain' ),
		'update_item'                => __( 'Update Type', 'text_domain' ),
		'view_item'                  => __( 'View Type', 'text_domain' ),
		'separate_items_with_commas' => __( 'Separate types with commas', 'text_domain' ),
		'add_or_remove_items'        => __( 'Add or remove types', 'text_domain' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'text_domain' ),
		'popular_items'              => __( 'Popular Types', 'text_domain' ),
		'search_items'               => __( 'Search Types', 'text_domain' ),
		'not_found'                  => __( 'Not Found', 'text_domain' ),
		'no_terms'                   => __( 'No types', 'text_domain' ),
		'items_list'                 => __( 'Types list', 'text_domain' ),
		'items_list_navigation'      => __( 'Types list navigation', 'text_domain' ),
	);
	$args = array(
		'labels'                     => $labels,
		'hierarchical'               => true,
		'public'                     => true,
		'show_ui'                    => true,
		'show_admin_column'          => true,
		'show_in_nav_menus'          => true,
		'show_tagcloud'              => true,
	);
	register_taxonomy( 'type', array( 'attraction' ), $args );

}
