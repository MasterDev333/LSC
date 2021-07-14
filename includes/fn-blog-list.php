<?php

add_action('wp_ajax_load-more-news', 'get_news_request' );
add_action('wp_ajax_nopriv_load-more-news', 'get_news_request' );
function get_news_request(){

    global $post;
    
    $res = new stdClass;
    $res->post = $_POST;
    $res->error = false;
    $res->error_text = '';
    ob_start();

    $res->page = $_POST['page'] ? $_POST['page'] : 1;
    $res->post_type = $_POST['post_type'] ? $_POST['post_type'] : 1;
    $res->posts_not_in = $_POST['posts_not_in'] ? array( $_POST['posts_not_in'] ) : array();

    $args = array( 
        'post_type'         => array( $res->post_type ), 
        'post_status'       => array( 'publish' ),
        'posts_per_page'     => 10, 
        'paged'             => $res->page,
        'orderby'           => 'date',
        'post__not_in'      => $res->posts_not_in,
    );  

    if( $_POST['s'] ){
        $args['s']          = $_POST['s'];
    }

    if( !empty( $_POST['cat'] ) ){
        $tax = in_array( $res->post_type, array( 'news', 'guide' ) ) ? 'location' : 'category';
        $args['tax_query'][] = array(
            'taxonomy'  => $tax, 
            'field'     => 'term_id', 
            'terms'     => $_POST['cat']
        );
    }
    
    $grid_array_start_big = array( 1, 3 );
    $grid_array_start_small = array( 6, 8 );

    $grid_array_end = array( 2, 5, 7, 10 );

    $grid_array = array( 1, 2, 6, 7 );

    $res->args = $args;

    $wp_query = new WP_Query( $args );
    ?>

    <?php if( $wp_query->have_posts( )): ?>
        <?php $count = 1; ?>
        <?php while ( $wp_query->have_posts( )): ?>
            <?php $wp_query->the_post() ?>

            <?php if( in_array( $count, $grid_array_start_big ) ): ?>
                <div class="grid blog-grid my-7 my-md-0">
            <?php endif ?>
            <?php if( in_array( $count, $grid_array_start_small ) ): ?>
                <div class="grid blog-grid _gap-4 mt-7 mb-3 my-md-0">
            <?php endif ?>

            <?php if( in_array( $count, $grid_array ) ): ?>
                <!-- <?php echo $count; ?> blog list big -->
                <?php get_template_part_args( 'templates/blog-list-big', array( ) ); ?>
            <?php else: ?>
                <!--<?php echo $count; ?> blog list small -->
                <?php get_template_part_args( 'templates/blog-list-small', array( ) ); ?>
            <?php endif ?>

            <?php if( in_array( $count, $grid_array_end ) ): ?>
                </div>
            <?php endif ?>

            <?php $count ++; ?>
        <?php endwhile; ?>
    <?php else: ?>  
        <?php //no posts ?>
    <?php endif; ?>
    <div class="blog-pagination pagination pagination-full">
        <?php 
            $args = array(
                'base'               => get_pagenum_link(1) . '%_%',
                // 'base'               => get_post_type_archive_link( 'insight' ) . '%_%', // - goto CPT archive page
                'format'             => 'page/%#%',
                'total'              => $wp_query->max_num_pages,
                'current'            => $res->page,
                'show_all'           => false,
                'end_size'           => 2,
                'mid_size'           => 2,
                'prev_next'          => true,
                'prev_text'          => '< Previous',
                'next_text'          => 'Next >',
                'type'               => 'plain',
                'add_args'           => false,
                'add_fragment'       => '',
                'before_page_number' => '',
                'after_page_number'  => ''
            ); 
            echo paginate_links( $args );   
        ?>
    </div>
    <?php wp_reset_query() ?>
    
    <?php
    
    $res->res = ob_get_clean();
    if ( $wp_query->max_num_pages > $res->page ){
        $res->has_more_pages = true;
    }
    wp_reset_query();

    echo json_encode( $res );
    die();
}