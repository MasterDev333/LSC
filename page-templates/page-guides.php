<?php
/*
Template Name: Guides
Template Post Type: page
*/

get_header(); ?>
<?php global $post; ?>
<main class="main">
	<section class="my-7 my-md-4 ov-h">
		<div class="container">
			<h1 class="an-line-b-c text-center a-up animated fadeInUp full-visible animation-end">
				Guides
			</h1>
			<?php $posts_not_in = array() ?>
			<?php 
				$posts = get_field( 'featured_blog' );
				if( !$posts ){
					$args = array (
						'post_type'         => array( 'guide' ),
						'post_status'		=> array( 'publish' ),
						'posts_per_page'    => 1,
						'orderby'           => 'date',
					);
					$wp_query = new WP_Query( $args );
					$posts = $wp_query->posts; 
				}
			?> 
			<!-- filters -->
			<form id="filter-blog-form">
				<div class="blog-filter a-up my-7 animated fadeInUp full-visible animation-end">
					<div class="blog-filter-category">
						<span class="label-by">
							Filter by
						</span>
						<select name="cat" class="blog-filter-category">
							<option value="">
								All
							</option>
							<?php $terms = get_terms( 'location', array( ) ); ?>
							<?php $i = 0; ?>
							<?php if ( $terms ): ?>
								<?php foreach( $terms as $term ): ?>
									<?php if( $i == 0 ){ echo 'checked'; } ?>
									<option value="<?php echo  $term->term_id ?>">
										<?php echo $term->name ?>
									</option>
									<?php $i++; ?>
								<?php endforeach ?>
							<?php endif ?>
						</select>
					</div>
					<div class="blog-filter-search">
						<input type="text" name="s" placeholder=" Search" class="">
						<button class="blog-filter-btn" type="submit">
						</button>
					</div>
					<input type="hidden" name="post_type" value="guide">
					<input type="hidden" name="page" id="page" value="1">
					<input type="hidden" name="action" value="load-more-news">
					<input type="hidden" name="posts_not_in" value="<?php echo $posts[0]->ID; ?>">
				</div>
			</form>
			<!-- featured -->
			<?php if( $posts ): ?>
		        <?php $posts_not_in = array() ?>
			    <?php foreach( $posts as $post):  ?>
			        <?php setup_postdata( $post ); ?>
			        <?php $posts_not_in[] = $post->ID; ?>
					<?php get_template_part_args( 'templates/blog-list-featured', array( ) ); ?>
			    <?php endforeach; ?>
			    <?php wp_reset_postdata(); ?>
			    <?php wp_reset_query() ?>
			<?php endif; ?>	
			<?php 
				$args = array (
					'post_type'         => array( 'guide' ),
					'post_status'		=> array( 'publish' ),
					'posts_per_page'    => 10,
					'orderby'           => 'date',
					'post__not_in' 		=> $posts_not_in,
				);
				$wp_query = new WP_Query( $args );

				$grid_array_start_big = array( 1, 3 );
				$grid_array_start_small = array( 6, 8 );

				$grid_array_end = array( 2, 5, 7, 10 );

				$grid_array = array( 1, 2, 6, 7 );

			?>
			<?php if( $wp_query->have_posts( )): ?>
				<div id="blog-wrapper">
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
					<div class="blog-pagination pagination pagination-full">
						<?php 
							$page_no = 1;
							$args = array(
								'base'               => get_pagenum_link(1) . '%_%',
								// 'base'               => get_post_type_archive_link( 'insight' ) . '%_%', // - goto CPT archive page
								'format'             => 'page/%#%',
								'total'              => $wp_query->max_num_pages,
								'current'            => $page_no,
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
				</div>
			<?php else: ?>	
				<?php //no posts ?>
			<?php endif; ?>
			<?php wp_reset_query() ?>
		</div>
	</section>
</main>
<?php get_footer(); ?>