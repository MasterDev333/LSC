<?php get_header(); ?>
	<?php global $post; ?>
	<?php $posts_not_in = array( $post->ID ) ?>
	<?php $view_guides = $_COOKIE['view_guides'] ?>

	<!-- login modal -->
	<section class="py-6 pt-md-10 bg-blue-and-p text-white gate p-relative d-none">
		<div class="container _xxs">
			<div class="gate-inner">
				<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'guide_form_text', 'o' => 'o', 't' => 'p', 'tc' => 'text-center' ) ); ?>
				<div class="form-wrapper mt-5 mb-5">
					<?php get_template_part_args( 'templates/content-modules-formidable', array( 'v' => 'form', 'o' => 'o' ) ); ?>
				</div>
			</div>
		</div>
		<a href="#" class="btn-gate-close"></a>
	</section>

	<section class="mt-6 my-md-4 ov-h">
		<div class="container _xxs a-down">
			<h6 class="text-center text-brand">
				GUIDES
			</h6>
			<h1 class="an-line-b-c text-center">
				<?php the_title() ?>
			</h1>
			<p class="text-center">
				<?php the_time(get_option('date_format')) ?>
				<?php if(! get_field( 'hide_author' )): ?> 
					 – <?php the_author( ) ?>
				<?php endif; ?>
			</p>
			<div class="callout text-center text-brand">
				<?php if( $intro_copy = get_field( 'intro_copy' )): ?> 
					<p>
						<?php echo $intro_copy; ?>
					</p>
				<?php endif; ?>
			</div>
			<?php if( $view_guides ): ?>
				<p class="text-center">
					<a href="#" class="link-icon text-brand hov-o">
						<i class="i-download"></i>DOWNLOAD PDF
					</a>
				</p>
			<?php endif ?>
			<div class="img-a mt-4 mb-7 my-md-4 post-mm d-block">
				<div class="img-a-img _8-4">
					<?php $image = get_field( 'image_desktop' ) ?>
					<?php if( !empty( $image ) ): ?>
						<?php $bg_url = $image['sizes']['blog-single-d']; ?>
						<?php $bg_url_2x = $image['sizes']['blog-single-d-2x']; ?>
						<picture>
							<?php $image = get_field( 'image_mobile' ) ?>
							<?php if( !empty( $image ) ): ?>
								<source src="<?php echo $image['sizes']['blog-single-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
							<?php endif; ?>
							<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
						</picture>
					<?php endif; ?>
				</div>
			</div>
			<?php if( $view_guides ): ?>
				<?php echo apply_filters( 'the_content', $post->post_content ) ?>
			<?php else: ?>
				<p class="text-center">
					<a href="#" class="btn" id="view-guide-button">
						View Guide
					</a>
				</p>
			<?php endif ?>
		</div>
	</section>

	<?php $posts_not_in = array() ?>
	<?php 
		if( 'Custom' == get_field( 'related_articles_type' )){
			$posts = get_field('custom_articles');
		}
		else{
			$categories_array = wp_get_post_terms( $post->ID, 'location', array( 'fields' => 'ids' ) );
			$posts_not_in = array( $post->ID );
			$args = array (
				'post_type' 		=> 'guide',
				'post_status'		=> array( 'publish' ),
				'posts_per_page' 	=> 3, 
				'tax_query' 		=> array(
					array(
						'taxonomy' => 'location',
						'field'    => 'term_id',
						'terms'    => $categories_array,
					),
				),
				'orderby'           => 'date',
				'post__not_in' 		=> $posts_not_in,
			);
			$wp_query = new WP_Query( $args );
			$posts = $wp_query->posts; 
		}
	?> 
	<?php if( $posts ): ?>
		<?php if( $wp_query->have_posts( )): ?>
			<section class="py-7 pt-md-7 pb-md-5 ov-h">
				<div class="container">
					<h2 class="text-center">
						Related Guides
					</h2>
					<div class="grid articles-card my-6 my-md-5">
					    <?php foreach( $posts as $post):  ?>
					        <?php setup_postdata( $post ); ?>
					        <?php $posts_not_in[] = $post->ID ?>
							<?php get_template_part( 'templates/general', 'related-article-item' ) ?>
					    <?php endforeach; ?>
					    <?php wp_reset_postdata();  ?>
						<?php wp_reset_query() ?>
					</div>
					<p class="text-center">
						<a href="<?php echo home_url( 'guides' ); ?>" class="btn">
							VIEW ALL Guides
						</a>
					</p>
				</div>
			</section>
		<?php else: ?>	
			<?php //no posts ?>
		<?php endif; ?>
	<?php endif; ?>	

	<?php get_template_part_args( 'templates/blog-list-cta', array( ) ); ?>

<?php get_footer(); ?>