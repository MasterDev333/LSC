		<?php if( get_field( 'is_landing_page' ) ): ?>
			<?php if( have_rows('content_modules') ): ?>
				<?php while ( have_rows('content_modules') ) : ?> 
					<?php the_row(); ?>
					<?php if( get_row_layout() == 'contact_form' ): ?>
						<!-- contact_form -->
						<footer class="footer-landing ov-h <?php if( 's3' == get_sub_field( 'style' )){ echo 'footer-landing-v2';} ?>  ">
							<?php if( 's3' == get_sub_field( 'style' )): ?> 
								<div class="map-block pt-5">
									<div class="container">
										<div class="map">
											<?php $map_address = get_sub_field( 'map_address' ) ?>
											<?php if( !empty( $map_address ) ): ?>
												<div class="mapouter">
													<div class="gmap_canvas">
														<iframe width="1290" height="541" id="gmap_canvas" src="<?php echo $map_address; ?>" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
														</iframe>
														<style>.mapouter{position:relative;text-align:right;height:541px;width:1290px;}</style>
														<style>.gmap_canvas {overflow:hidden;background:none!important;height:541px;width:1290px;}</style>
													</div>
												</div>
											<?php endif; ?>
										</div>
									</div>
								</div>
							<?php endif; ?>
							<div class="container _s a-up">
								<div class="footer-holder py-10 py-lg-6">
									<div class="grid">
										<div class="col-info col-4 col-lg-12 <?php if( 's3' == get_sub_field( 'style' )){ echo ' text-white'; } ?>">
											<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'content', 't' => 'p', 'w' => 'div', 'wc' => 'pb-1' ) ); ?>
											<div class="logo-bottom mb-3">
												<a href="<?php echo get_permalink( 'url' ) ?>">
													<?php get_template_part_args( 'templates/content-modules-image', array( 'v' => 'logo', 'v2x' => false ) ); ?>
												</a>
											</div>
											<address class="f-contact-info pb-4">
												<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'address', 't' => 'p' ) ); ?>
									            <?php get_template_part_args( 'templates/content-modules-phone', array( 'v' => 'phone', 't' => 'p' ) ); ?>
												<?php get_template_part_args( 'templates/content-modules-email', array( 'v' => 'email', 't' => 'p' ) ); ?>
									        </address>
									        <div class="">
									        	<?php get_template_part_args( 'templates/content-modules-cta-button', array( 'v' => 'cta_button', 'c' => 'btn btn-outline-h-white' ) ); ?>
											</div>
										</div>
										<div class="col-form col-8 col-lg-12 pb-0 pb-lg-6">
											<div class="form-box">
												<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h3', 'tc' => 'text-center mb-5' ) ); ?>
												<div class="form-wrapper">
													<?php get_template_part_args( 'templates/content-modules-formidable', array( 'v' => 'form' ) ); ?>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</footer>
					<?php endif ?>
				<?php endwhile;?>
			<?php else: ?>
				<!-- // no layouts found -->
			<?php endif; ?>
		<?php else: ?>
			<?php  
				$footer_logo = get_field('footer_logo', 'option');
				$f_address_contact_information = get_field('f_address_contact_information', 'option');
				$f_social_networks = get_field('f_social_networks', 'option');
				$copyright_text = get_field('copyright_text', 'option');
				$f_facebook = $f_social_networks['facebook'];
				$f_twitter = $f_social_networks['twitter'];
				$f_instagram = $f_social_networks['instagram'];
			?>
			<footer class="footer bg-blue bg-p-gray text-white ov-h">
				<div class="container a-up">
					<div class="footer-top pt-10 pt-md-8">
						<div class="footer-logo-block">
							<a href="<?php echo site_url(); ?>" class="footer-logo">
								<?php if($footer_logo) : ?>
									<img src="<?php echo $footer_logo['url']; ?>" alt="<?php echo $footer_logo['alt']; ?>">
								<?php else: ?>
									<img src="<?php echo get_template_directory_uri(); ?>/images/logo-white.svg" alt="logo">
								<?php endif; ?>
							</a>
							<?php if($f_address_contact_information) : ?>
								<div class="footer-nav-info">
									<?php echo $f_address_contact_information; ?>
								</div>
								</ul>
							<?php endif; ?>
							<?php if(have_rows('f_buttons', 'option')) : ?>
								<div class="footer-btn">
									<?php while(have_rows('f_buttons', 'option')) : the_row(); ?>
										<?php $button = get_sub_field('button'); ?>
										<?php if($button) : ?>
											<a class="btn btn-outline-h-white _s" target="<?php echo $button['target']; ?>" href="<?php echo esc_url($button['url']); ?>"><?php echo esc_html($button['title']); ?></a>
										<?php endif; ?>
									<?php endwhile; ?>
								</div>
							<?php endif; ?>
						</div>
						<?php echo custom_footer_menu('footermenu'); ?>
					</div>
					<div class="footer-bottom mt-9 mt-md-5">
						<?php if(acf_group_field_key_value_checking($f_social_networks)) : ?>
							<ul class="footer-social">
								<?php if($f_facebook) : ?>
									<li><a href="<?php echo $f_facebook; ?>" target="_blank"><i class="icon-facebook1"></i></a></li>
								<?php endif; ?>
								<?php if($f_twitter) : ?>
									<li><a href="<?php echo $f_twitter; ?>" target="_blank"><i class="icon-twitter"></i></a></li>
								<?php endif; ?>
								<?php if($f_instagram) : ?>
									<li><a href="<?php echo $f_instagram; ?>" target="_blank"><i class="icon-instagram"></i></a></li>
								<?php endif; ?>
							</ul>
						<?php endif; ?>
						<ul class="footer-bottom-nav">
							<?php if(have_rows('f_important_links', 'option')) : ?>
								<?php while(have_rows('f_important_links', 'option')) : the_row(); ?>
									<?php $link = get_sub_field('link'); ?>
									<li><a href="<?php echo esc_url($link['url']); ?>"><?php echo $link['title']; ?></a></li>
								<?php endwhile; ?>
							<?php endif; ?>
							<?php if($copyright_text) : ?>
								<li><?php echo $copyright_text; ?></li>
							<?php endif; ?>
							<li><a href="https://tegan.io/" target="_blank"><i class="ico-tegan"></i>Site by Tegan</a></li>
						</ul>
					</div>
				</div>
			</footer>	
		<?php endif ?>
	</div>
	<?php wp_footer(); ?>
	<!-- before closing body script -->
	<?php if( $before_closing_body = get_field( 'before_closing_body', 'option' )): ?> 
		<?php echo $before_closing_body; ?>
	<?php endif; ?>
	<!-- END: before closing body script -->
</body>
</html>