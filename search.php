<?php get_header(); ?>
<?php
$search_string = get_search_query();
$location_type = $_REQUEST['location-type'];
$search_permalink = add_query_arg('s', $search_string, site_url());
?>
<main class="main">
    <section class="py-8 pt-md-4 pb-md-6">
        <div class="container a-up mb-l-0 animated fadeInUp full-visible animation-end">
            <?php if ( have_posts() ) { ?>
                <h1 class="an-line-b-c text-center">Search</h1>
            <?php } else { ?>
                <h1 class="an-line-b-c text-center">No Results Found</h1>
            <?php } ?>
        </div>
    </section>

    <section class="pt-10 pb-7 pt-md-2 pb-md-0 bg-gray">
		<div class="container _lg">
			<div class="form-search <?php echo have_posts() ? '' : 'alt'; ?>">
				<form action="<?php bloginfo('url'); ?>/" method="get">
					<input type="text" name="s" placeholder="Search" value="<?php echo $search_string; ?>" />
					<input type="submit" value="Search" />
				</form>
			</div>
		</div>
		
		<?php if ( have_posts() ) : ?>
        <div class="container _lg">
            <div class="result-inner" style="position: relative;">
                <?php
                $locations = get_terms('location', array(
                    'hide_empty' => true,
                ));
                ?>
                <?php if ($locations) { ?>
                    <div class="result-sidebar" style="">
                        <div class="d-md-none">
                            <h3>Categories</h3>
                            <ul class="result-filter">
                                <li class="<?php echo (empty($location_type) ? 'active' : ''); ?>"><a href="<?php echo $search_permalink; ?>">All</a></li>
                                <?php foreach ($locations as $location) { ?>
                                    <li class="<?php echo ($location_type === $location->slug) ? 'active' : ''; ?>"><a href="<?php echo add_query_arg('location-type', $location->slug, $search_permalink); ?>"><?php echo $location->name; ?></a></li>
                                <?php } ?>
                            </ul>
                        </div>
                        <div class="d-none d-md-block sel-white mb-md-4">
                            <h4 class="text-center">Filter by</h4>
                            <select class="w-100p" id="search-page-filter-select">
                                <option value="<?php echo $search_permalink; ?>" <?php selected($location_type, "", true); ?>>All</option>
                                <?php foreach ($locations as $location) { ?>
                                    <option value="<?php echo add_query_arg('location-type', $location->slug, $search_permalink); ?>" <?php selected($location_type, $location->slug, true); ?>><?php echo $location->name; ?></option>
                                <?php } ?>
                            </select>
                        </div>
                    </div>
                <?php } ?>
                <div class="result-content">
					<ul class="result-list a-up-nested">
						<?php while (have_posts()) : the_post(); ?>
							<li class="animated fadeInUp full-visible">
								<?php
								$entry_terms = "";
								$post_id = get_the_ID();
								$terms = get_the_terms($post_id, 'location');
								if (!empty($terms)) {
									echo '<h6>';
									foreach ($terms as $term) {
										$entry_terms .= $term->name . ', ';
									}
									$entry_terms = rtrim($entry_terms, ', ');
									echo $entry_terms . '</h6>';
								}
								?>                                    
								<h3>
									<?php the_title(); ?>
								</h3>
								<div class="result-txt">
									<p>
										<?php if( get_the_content( ) ): ?>
											<?php echo wp_trim_words(get_the_content(), 20, '...'); ?>
												
										<?php else: ?>
											<?php echo get_post_meta(get_the_ID(), '_yoast_wpseo_metadesc', true); ?>
										<?php endif ?>
									</p>
									<a href="<?php echo get_permalink($post_id); ?>" class="link-underline">
										READ MORE
									</a>
								</div>
							</li>
						<?php endwhile; ?>
					</ul>                    
					<?php
					$args = array(
						'mid_size' => 2,
						'prev_text' => __('<i class="icon-keyboard_arrow_left"></i> Previous', 'am'),
						'next_text' => __('Next <i class="icon-keyboard_arrow_right"></i>', 'am')
					);
					$class = 'search-pagination blog-pagination pagination pagination-full _left a-up animated fadeInUp full-visible animation-end';
					FN_Search::pagination($args, $class);
                    ?>                       
                </div>
            </div>
        </div>
		<?php else : ?>
		<div class="container _lg">
			<div class="not-found">
				<p>No Results Found</p>
			</div>
		</div>
		<?php endif; ?>
    </section>
</main>
<?php get_footer(); ?>