<?php
global $am_option;

$am_option['shortname'] = "am";
$am_option['textdomain'] = "am";

// Functions
require get_parent_theme_file_path( '/includes/fn-core.php' );
require get_parent_theme_file_path( '/includes/fn-custom.php' );
require get_parent_theme_file_path( '/includes/fn-post-types.php' );
require get_parent_theme_file_path( '/includes/fn-attractions.php' );
require get_parent_theme_file_path( '/includes/fn-search.php' );
require get_parent_theme_file_path( '/includes/fn-blog-list.php' );

// Extensions
require get_parent_theme_file_path( '/includes/extensions/breadcrumb-trail.php' );

/* Theme Init */
require get_parent_theme_file_path( '/includes/theme-widgets.php' );
require get_parent_theme_file_path( '/includes/theme-init.php' );

