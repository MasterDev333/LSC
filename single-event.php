<?php get_header(); ?>

	<main class="main">
		<?php $posts_not_in = array( $post->ID ) ?>
		<section class="pt-7 pb-12 pt-md-3 pb-md-5   text-center p-relative">
			<div class="container a-up z-1 p-relative">
				<h1 class="an-line-b-c">
					Events
				</h1>
				<div class="img-a my-5 my-md-3">
					<div class="img-a-img _12-5">
						<?php $image = get_field( 'image_desktop' ) ?>
						<?php if( !empty( $image ) ): ?>
							<?php $bg_url = $image['sizes']['event-big-d']; ?>
							<?php $bg_url_2x = $image['sizes']['event-big-d-2x']; ?>
							<picture>
								<?php $image = get_field( 'image_mobile' ) ?>
								<?php if( !empty( $image ) ): ?>
									<source src="<?php echo $image['sizes']['event-big-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
								<?php endif; ?>
								<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
							</picture>
						<?php endif; ?>
					</div>
				</div>
				<div class="mw-700 mx-a mt-6 mt-md-1">
					<h2>
						<?php the_title() ?>
					</h2>
					<?php 
						$event_start_date = get_field( 'event_start_date' ); 
						$event_start_hour = get_field( 'event_start_hour' );
						$event_end_hour = get_field( 'event_end_hour' );

						$event_date_time = $event_start_date;
						if( $event_start_hour ){
							$event_date_time .= ' | ' . $event_start_hour;
						}
						if( $event_end_hour ){
							$event_date_time .= '-' . $event_end_hour;
						}
					?>
					<?php if( $event_start_date ): ?> 
						<h6>
							<?php echo $event_date_time; ?>
						</h6>
					<?php endif; ?>
					<?php echo apply_filters( 'the_content', $post->post_content ) ?>
					<ul class="hero-list">
						<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'persons_name', 'o' => 'f', 't' => 'strong', 'w' => 'li' ) ); ?>
						<?php get_template_part_args( 'templates/content-modules-email', array( 'v' => 'email', 'o' => 'f', 'c' => 'text-brand', 't' => 'li' ) ); ?>
						<?php get_template_part_args( 'templates/content-modules-phone', array( 'v' => 'phone', 't' => 'li', 'o' => 'f' ) ); ?>
					</ul>
				</div>
			</div>
			<div class="bg-b-half bg-gray bg-p-white beforeHeightUp">
			</div>
		</section>

		<section class="my-14 my-md-8 ov-h">
			<div class="container">
				<div class="grid articles-card">
					<?php 
						$args = array (
							'post_type'         => array( 'event' ),
							'post_status'		=> array( 'publish' ),
							'posts_per_page'    => -1,
							'post__not_in' 		=> $posts_not_in,
							'meta_query' => array(
								array(
									'key' 		=> 'event_start_date',
									'value' 	=> date('Ymd'),
									'compare' 	=> '>=',
									'type' 		=> 'DATE',
								),

							),
						);
						$wp_query = new WP_Query( $args );
					?>
					<?php if( $wp_query->have_posts( )): ?>
						<?php  while( $wp_query->have_posts( )): ?>
							<?php  $wp_query->the_post() ?>
							<article class="col-4 col-md-12 mb-3">
								<div class="articles-card-img img-a">
									<div class="img-a-img _4-2">
										<?php $image = get_field( 'image_desktop' ) ?>
										<?php if( !empty( $image ) ): ?>
											<?php $bg_url = $image['sizes']['event-small-d']; ?>
											<?php $bg_url_2x = $image['sizes']['event-small-d-2x']; ?>
											<picture>
												<?php $image = get_field( 'image_mobile' ) ?>
												<?php if( !empty( $image ) ): ?>
													<source src="<?php echo $image['sizes']['event-small-d']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
												<?php endif; ?>
												<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
											</picture>
										<?php endif; ?>
									</div>
								</div>
								<div class="articles-card-info a-up">
									<h3>
										<?php the_title(); ?>
									</h3>
									<?php 
										$event_start_date = get_field( 'event_start_date' ); 
										$event_start_hour = get_field( 'event_start_hour' );
										$event_end_hour = get_field( 'event_end_hour' );

										$event_date_time = $event_start_date;
										if( $event_start_hour ){
											$event_date_time .= ' | ' . $event_start_hour;
										}
										if( $event_end_hour ){
											$event_date_time .= '-' . $event_end_hour;
										}
									?>
									<?php if( $event_start_date ): ?> 
										<h6>
											<?php echo $event_date_time; ?>
										</h6>
									<?php endif; ?>
									<?php echo wp_trim_words( wp_strip_all_tags( apply_filters( 'the_content', $post->post_content ) ), 20 ) ?>
									<?php get_template_part_args( 'templates/content-modules-cta-button', array( 'v' => 'contact_us_link', 'o' => 'f', 'c' => 'link-underline', 'w' => 'p' ) ); ?>
								</div>
							</article>
						<?php endwhile; ?>
					<?php else: ?>	
						<?php //no posts ?>
					<?php endif; ?>
					<?php wp_reset_query() ?>
				</div>
			</div>
		</section>
	</main>

<?php get_footer(); ?>