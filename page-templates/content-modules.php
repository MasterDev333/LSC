<?php
/*
Template Name: Content Modules
*/

get_header(); ?>
	<?php $page_color = get_field( 'page_color' ) ?>
	<main class="main">
		<?php if( get_field( 'is_landing_page' ) ): ?>
			<header class="header-landing">
				<div class="container">
					<div class="logo-block">
						<a href="<?php echo get_permalink() ?>">
							<?php get_template_part_args( 'templates/content-modules-image', array( 'v' => 'header_logo', 'o' => 'f', 'v2x' => false ) ); ?>
						</a>
					</div>
				</div>
				<?php  
					// phone number
					$phone_number = str_replace( '-', '', get_field('global_phone', 'option') );
					if( 'red' == $theme_color ) {
						$phone_number = get_field('midtown_park_phone', 'option') ?  str_replace( '-', '', get_field('midtown_park_phone', 'option' ) ) : $phone_number;
					}
					elseif( 'green' == $theme_color ) {
						$phone_number = get_field('willow_bend_phone', 'option') ?  str_replace( '-', '', get_field('willow_bend_phone', 'option' ) ) : $phone_number;
					}
					elseif( 'blue' == $theme_color ) {
						$phone_number = get_field('at_home_phone', 'option') ?  str_replace( '-', '', get_field('at_home_phone', 'option' ) ) : $phone_number;
					}
					if( get_field( 'overwrite_page_phone_number' ) ){
						$phone_number = get_field( 'phone_number' ) ?  str_replace( '-', '', get_field( 'phone_number' ) ) : $phone_number;
					}
				?>
				<?php if( $phone_number ): ?>
					<div class="header-cta-mob">
						<a class="header-cta-btn" href="tel:<?php echo $phone_number; ?>">
							Call Now
						</a>
					</div>
				<?php endif; ?>
			</header>
		<?php endif ?>
		<?php if( have_rows('content_modules') ): ?>
			<?php while ( have_rows('content_modules') ) : ?> 
				<?php the_row(); ?>
				<?php if( get_row_layout() == 'header' ): ?>
					<?php $type = get_sub_field( 'style' ); ?>
					<!-- header <?php echo $type ?> -->
					<?php if( 's1' == $type ): ?> 
						<section class="hero-wrapper py-10 pt-md-3 pb-md-5 p-relative" data-theme="blue">
							<div class="container">
								<div class="hero-inner">
									<div class="hero-txt mb-l-0 a-up" data-a-delay-1="">
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h1' ) ); ?>
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'text', 't' => 'p', 'w' => 'div', 'wc' => 'callout' ) ); ?>
										<?php $link = get_sub_field('cta_button'); ?>
										<?php if( $link ): ?>
											<?php
												$link_url = $link['url'];
												$link_title = $link['title'];
												$link_target = $link['target'] ? $link['target'] : '_self';
											?>
											<p>
												<a class="link-underline text-white popup-video-show" href="#<?php echo esc_url( $link_url ); ?>" target="<?php echo esc_attr( $link_target ); ?>">
													<?php echo esc_html( $link_title ); ?>
												</a>
											</p>
										<?php endif; ?> 
									</div>
									<div class="hero-img">
										<div class="img-a-video">
											<div class="img-a-img">
												<?php $image = get_sub_field( 'image_desktop' ) ?>
												<?php if( !empty( $image ) ): ?>
													<?php $bg_url = $image['sizes']['header-hp-d']; ?>
													<?php $bg_url_2x = $image['sizes']['header-hp-d-2x']; ?>
													<picture>
														<?php $image = get_sub_field( 'image_mobile' ) ?>
														<?php if( !empty( $image ) ): ?>
															<source src="<?php echo $image['sizes']['header-hp-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
														<?php endif; ?>
														<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
													</picture>
												<?php endif; ?>
											</div>
											<?php if( $video_url = get_sub_field( 'video_url' )): ?> 
												<div class="hero-img-popup-link">
													<div class="img-a-bg-video">
														<video src="<?php echo $video_url; ?>" muted <?php if ( get_sub_field( 'autoplay' ) ){ echo 'autoplay'; } ?> loop></video>
													</div>
												</div>
											<?php endif; ?>
										</div>
									</div>
								</div>
							</div>
							<div class="bg-str full a-down-full">
								<picture>
									<source srcset="<?php echo get_template_directory_uri(); ?>/images/bg1-m.jpg" media="(max-width: 414px)">
									<img src="<?php echo get_template_directory_uri(); ?>/images/bg1.jpg" alt="" srcset="<?php echo get_template_directory_uri(); ?>/images/bg1@2x.jpg 2x">
								</picture>
							</div>
						</section>
					<?php elseif( 's3' == $type ): ?>
						<section class="mt-12 mb-3 mt-md-4">
							<div class="container">
								<div class="left-rigth-inner _start">
									<div class="left-rigth-txt mb-3 mb-md-0 a-up mw-500">
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'label', 't' => 'h6', 'tc' => 'text-brand' ) ); ?>
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h1', 'tc' => 'text-brand' ) ); ?>
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'text', 't' => 'p' ) ); ?>
									</div>
									<div class="left-rigth-img mbn-12 o-md-last mbn-sm-60p">
										<div class="img-a">
											<div class="img-a-img _6-7">
												<?php $image = get_sub_field( 'image_desktop' ) ?>
												<?php if( !empty( $image ) ): ?>
													<?php $bg_url = $image['sizes']['ci-1-d']; ?>
													<?php $bg_url_2x = $image['sizes']['ci-1-d-2x']; ?>
													<picture>
														<?php $image = get_sub_field( 'image_mobile' ) ?>
														<?php if( !empty( $image ) ): ?>
															<source src="<?php echo $image['sizes']['ci-1-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
														<?php endif; ?>
														<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
													</picture>
												<?php endif; ?>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					<?php elseif( 's4' == $type ): ?>
						<section class="pt-7 pb-12 pt-md-3 pb-md-5 text-center p-relative">
							<div class="container a-down z-1 p-relative">
								<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'label', 't' => 'h6', 'tc' => 'text-brand' ) ); ?>
								<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'page_title', 't' => 'h1', 'tc' => 'an-line-b-c' ) ); ?>
								<div class="img-a my-5 my-md-3">
									<div class="img-a-img _12-5">
										<?php $image = get_sub_field( 'image_desktop' ) ?>
										<?php if( !empty( $image ) ): ?>
											<?php $bg_url = $image['sizes']['header-about-d']; ?>
											<?php $bg_url_2x = $image['sizes']['header-about-d-2x']; ?>
											<picture>
												<?php $image = get_sub_field( 'image_mobile' ) ?>
												<?php if( !empty( $image ) ): ?>
													<source src="<?php echo $image['sizes']['header-about-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
												<?php endif; ?>
												<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
											</picture>
										<?php endif; ?>
									</div>
								</div>
								<div class="mw-700 mx-a mt-6 mt-md-1">
									<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2' ) ); ?>
									<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'text', 't' => 'p' ) ); ?>
									<?php get_template_part_args( 'templates/content-modules-cta-button', array( 'v' => 'cta_button', 'c' => 'btn', 'w' => 'p' ) ); ?>
									<?php if( $file = get_sub_field( 'pdf' )): ?> 
										<p class="mt-6 xy-center">
											<i class="icon-file_download mr-1 text-brand fs-24">
											</i>
											<a href="<?php echo $file['url']; ?>" class="link-underline" download>
												<?php if( $file_name = get_sub_field( 'pdf_name' )): ?> 
													<?php echo $file_name; ?>
												<?php else: ?>
													Download PDF
												<?php endif; ?>
											</a>
										</p>
									<?php endif; ?>
								</div>
							</div>
							<div class="bg-b-half bg-gray bg-p-white beforeHeightUp">
							</div>
						</section>
					<?php elseif( 's6' == $type ): ?>
						<section class="pt-7 pb-9 pt-md-3 pb-md-5  text-center p-relative">
							<div class="container a-down z-1 p-relative">
								<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'page_title', 't' => 'h1', 'tc' => 'an-line-b-c' ) ); ?>
								<div class="img-a my-5 my-md-3">
									<div class="img-a-img _12-5">
										<?php $image = get_sub_field( 'image_desktop' ) ?>
										<?php if( !empty( $image ) ): ?>
											<?php $bg_url = $image['sizes']['header-about-d']; ?>
											<?php $bg_url_2x = $image['sizes']['header-about-d-2x']; ?>
											<picture>
												<?php $image = get_sub_field( 'image_mobile' ) ?>
												<?php if( !empty( $image ) ): ?>
													<source src="<?php echo $image['sizes']['header-about-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
												<?php endif; ?>
												<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
											</picture>
										<?php endif; ?>
									</div>
								</div>
								<div class="mw-700 mx-a mt-6 mt-md-1 text-white">
									<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2' ) ); ?>
									<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'text', 't' => 'p' ) ); ?>
								</div>
							</div>
							<div class="bg-b-half bg-blue bg-p-gray beforeHeightUp"></div>
						</section>
					<?php elseif( 's5' == $type ): ?>
						<section class="py-6">
							<div class="container a-up mb-l-0">
								<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h1', 'tc' => 'an-line-b-c text-center' ) ); ?>
							</div>
						</section>
					<?php elseif( 's8' == $type ): ?>
						<section class="hero-wrapper hero-landing py-6 py-md-4 mh-640 container-to-bottom p-relative">
							<div class="container mb-l-0" data-a-delay-1="">
								<div class="grid">
									<div class="col-6 col-lg-12">
										<div class="pt-6 pt-lg-0 pb-lg-5 a-up">
											<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h1' ) ); ?>
											<span class="arrow-bottom">
												<img src="<?php echo get_template_directory_uri( ); ?>/images/ico-arrow-bottom.svg" alt="">
											</span>
										</div>
									</div>
									<div class="col-6 col-lg-12 p-relative">
										<div class="form-intro d-md-show a-up <?php echo 'form-intro-add'; ?>">
											<div class="form-box">
												<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'form_title', 't' => 'h3', 'tc' => 'text-center mb-5' ) ); ?>
												<div class="form-wrapper">
													<?php get_template_part_args( 'templates/content-modules-formidable', array( 'v' => 'form' ) ); ?>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="bg-str full a-op">
								<?php $image = get_sub_field( 'image_desktop' ) ?>
								<?php if( !empty( $image ) ): ?>
									<?php $bg_url = $image['sizes']['header-video-d']; ?>
									<?php $bg_url_2x = $image['sizes']['header-video-d-2x']; ?>
									<picture>
										<?php $image = get_sub_field( 'image_mobile' ) ?>
										<?php if( !empty( $image ) ): ?>
											<source src="<?php echo $image['sizes']['header-video-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
										<?php endif; ?>
										<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
									</picture>
								<?php endif; ?>
							</div>
						</section>
						<div class="promo-space">
						</div>
						<section class="m-md-show">
							<div class="container">
								<div class="form-intro">
									<div class="form-box">
										<div class="form-box">
											<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'form_title', 't' => 'h3', 'tc' => 'text-center mb-5' ) ); ?>
											<div class="form-wrapper">
												<?php get_template_part_args( 'templates/content-modules-formidable', array( 'v' => 'form' ) ); ?>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					<?php elseif( 's7' == $type ): ?>
						<section class="hero-wrapper hero-landing py-6 py-md-4 text-center mh-640 container-to-bottom p-relative">
							<div class="container a-up mb-l-0" data-a-delay-1="">
								<div class="pt-6 pt-lg-0 pb-lg-5">
									<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h1' ) ); ?>
									<span class="arrow-bottom">
										<img src="<?php echo get_template_directory_uri( ); ?>/images/ico-arrow-bottom.svg" alt="">
									</span>
								</div>
							</div>
							<div class="bg-str full a-op">
								<?php $image = get_sub_field( 'image_desktop' ) ?>
								<?php if( !empty( $image ) ): ?>
									<?php $bg_url = $image['sizes']['header-video-d']; ?>
									<?php $bg_url_2x = $image['sizes']['header-video-d-2x']; ?>
									<picture>
										<?php $image = get_sub_field( 'image_mobile' ) ?>
										<?php if( !empty( $image ) ): ?>
											<source src="<?php echo $image['sizes']['header-video-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
										<?php endif; ?>
										<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
									</picture>
								<?php endif; ?>
							</div>
						</section>
					<?php elseif( 's2' == $type ): ?>
						<section class="hero-wrapper py-6 py-md-4 text-center mh-800 container-to-bottom p-relative">
							<div class="container a-up mb-l-0" data-a-delay-1="">
								<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h1' ) ); ?>
							</div>
							<div class="bg-str full a-down-full">
								<?php $image = get_sub_field( 'image_desktop' ) ?>
								<?php if( !empty( $image ) ): ?>
									<?php $bg_url = $image['sizes']['community-d']; ?>
									<?php $bg_url_2x = $image['sizes']['community-d-2x']; ?>
									<picture>
										<?php $image = get_sub_field( 'image_mobile' ) ?>
										<?php if( !empty( $image ) ): ?>
											<source src="<?php echo $image['sizes']['community-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
										<?php endif; ?>
										<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
									</picture>
								<?php endif; ?>
								<?php if( $video_url = get_sub_field( 'video_url' )): ?> 
									<div class="bg-video">
										<video playsinline="" webkit-playsinline="" loop="" <?php if ( get_sub_field( 'autoplay' ) ){ echo 'autoplay=""'; } ?> muted=""> 
											<source src="<?php echo $video_url; ?>" type="video/mp4">
										</video>
									</div>
								<?php endif; ?>
							</div>
						</section>
					<?php else: ?>
					<?php endif ?>
				<?php elseif( get_row_layout() == 'content' ): ?>
					<?php $type = get_sub_field( 'style' ); ?>
					<!-- content <?php echo $type; ?>-->
					<?php if( 's1' == $type ): ?> 
						<section class="my-19 my-md-7  text-center">
							<div class="container a-up _s">
								<div class="callout">
									<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'content' ) ); ?>
								</div>
							</div>
						</section>
					<?php elseif( 's3' == $type ): ?>
						<section class="py-6 py-md-4 bg-blue bg-p-gray text-white text-center a-b-up" id="blue-bar">
							<div class="container mb-l-0 a-up">
								<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2' ) ); ?>
							</div>
						</section>
					<?php elseif( 's2' == $type ): ?>
						<section class="pt-20 mb-5 pt-md-15 p-relative">
							<div class="container a-up">
								<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2', 'tc' => 'text-brand' ) ); ?>
								<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'content', 't' => 'p', 'w' => 'div', 'wc' => 'callout mw-700' ) ); ?>
							</div>
							<div class="bg-pattern _t-r a-left"></div>
						</section>
					<?php else: ?>
					<?php endif ?>
				<?php elseif( get_row_layout() == 'cta' ): ?>
					<!-- cta-->
					<?php  
						$margin_bottom = get_sub_field( 'margin_bottom' );
						$margin_top = get_sub_field( 'margin_top' );
					?>
					<section class="text-center <?php echo $margin_top; ?> <?php echo $margin_bottom; ?>">
						<?php /*
							my-12 			my-md-7			text-center
							mt-15 			my-md-8	mb-20	text-center
							mt-10 			my-md-8	mb-15  	text-center
							mt-10 my-lg-8			mb-20  	text-center
						*/ ?>
						<div class="container a-up">
							<div class="mw-700 mx-a">
								<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2' ) ); ?>
								<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'content', 't' => 'p' ) ); ?>
								<?php if( get_sub_field( 'has_contact_info' )): ?> 
									<?php if( get_sub_field( 'contact_info' ) ): ?>
										<?php $ii = 0; ?>
										<?php while( has_sub_field( 'contact_info' ) ): ?>
											<address class="contact-info <?php if( 0 == $ii ){ echo 'mb-5'; } ?>">
												<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'title', 't' => 'h5' ) ); ?>
												<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'name', 't' => 'p' ) ); ?>
												<?php get_template_part_args( 'templates/content-modules-email', array( 'v' => 'email', 't' => 'p' ) ); ?>
												<?php get_template_part_args( 'templates/content-modules-phone', array( 'v' => 'phone', 'w' => 'p' ) ); ?>
											</address>
											<?php $ii ++ ?>
										<?php endwhile; ?>
									<?php endif ?>
								<?php endif; ?>
								<?php if( !get_sub_field( 'has_multiple_buttons' ) ): ?>
									<?php get_template_part_args( 'templates/content-modules-cta-button', array( 'v' => 'cta_button', 'c' => 'btn mx-1 mb-2', 'w' => 'p', 'wc' => 'mt-5 mb-3 mxn-1' ) ); ?>	
								<?php endif ?>
							</div>
							<?php if( get_sub_field( 'has_multiple_buttons' ) ): ?>
								<p class="mt-5 mb-3 mxn-1">
									<?php if( get_sub_field( 'cta_buttons' ) ): ?>
										<?php while( has_sub_field( 'cta_buttons' ) ): ?>
											<?php get_template_part_args( 'templates/content-modules-cta-button', array( 'v' => 'cta_button', 'c' => 'btn mx-1 mb-2' ) ); ?>
										<?php endwhile; ?>
									<?php endif ?>
								</p>
							<?php endif ?>
							<?php if ( get_sub_field( 'has_download' ) ): ?>
								<?php if( $file = get_sub_field( 'file' )): ?> 
									<p class="xy-center">
										<?php if( !get_sub_field( 'hide_icon' )): ?> 
											<i class="icon-file_download mr-1 text-brand fs-24">
											</i>
										<?php endif; ?>
										<a href="<?php echo $file['url']; ?>" class="link-underline" download>
											<?php if( $file_name = get_sub_field( 'file_name' )): ?> 
												<?php echo $file_name; ?>
											<?php else: ?>
												<?php echo $file['title']; ?>
											<?php endif; ?>
										</a>
									</p>
								<?php endif; ?>
							<?php endif ?>
						</div>
					</section>
				<?php elseif( get_row_layout() == 'image_gallery' ): ?>
					<section class="img-row py-1">
						<?php $images = get_sub_field('image_gallery'); ?>
						<?php if( $images ): ?>
							<?php $i = 0; ?>
							<?php foreach( $images as $image ): ?>
								<div class="img-row-item <?php if( !in_array( $i, array( 0, 1, 3 ) ) ){ echo 'd-xs-none'; } ?>" >
									<div class="bg-str ar-8-5 a-op">
										<picture>
											<source src="<?php echo $image['sizes']['gallery-m']; ?>" alt="<?php echo $image['alt'] ?>"  media="(max-width: 414px)" >
											<img src="<?php echo $image['sizes']['gallery-d']; ?>" srcset="<?php echo $image['sizes']['gallery-d-2x']; ?> 2x" alt="<?php echo $image['alt'] ?>" />
										</picture>
									</div>
								</div>
								<?php $i++; ?>
							<?php endforeach; ?>
						<?php endif; ?>
					</section>
				<?php elseif( get_row_layout() == 'content_image' ): ?>
					<?php $type = get_sub_field( 'style' ); ?>
					<!-- content_image <?php echo $type; ?> -->
					<?php if( 's1' == $type ): ?> 
						<?php  
							$style = '';
							$margin_bottom = get_sub_field( 'margin_bottom' );
							$margin_top = get_sub_field( 'margin_top' );
						?>
						<section class="content-image <?php echo $margin_top; ?> <?php echo $margin_bottom; ?>">
							<?php /*
								mt-10 mt-md-7 mb-46 mb-lg-20 mb-md-10
								mt-14 mt-md-7 mb-40 mb-lg-20 mb-md-10
								mt-15 mt-md-7 mb-32 mb-lg-20 mb-md-6
								mt-20 mt-md-7 mb-20 mb-lg-20 mb-md-10
								mt-25 mt-md-7 mb-40 mb-lg-20 mb-md-10
							*/ ?>
							<div class="container">
								<div class="left-rigth-inner">
									<?php if ( '_left' == get_sub_field( 'image_align' ) ): ?>
										<div class="left-rigth-img pl-md-7 mb-md-15">
											<div class="img-a">
												<div class="img-a-img _6-7">
													<?php $image = get_sub_field( 'image_desktop' ) ?>
													<?php if( !empty( $image ) ): ?>
														<?php $bg_url = $image['sizes']['ci-1-d']; ?>
														<?php $bg_url_2x = $image['sizes']['ci-1-d-2x']; ?>
														<picture>
															<?php $image = get_sub_field( 'image_mobile' ) ?>
															<?php if( !empty( $image ) ): ?>
																<source src="<?php echo $image['sizes']['ci-1-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
															<?php endif; ?>
															<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
														</picture>
													<?php endif; ?>
												</div>
											</div>
											<div class="bg-pattern _b-r a-right"></div>
										</div>
									<?php endif ?>
									<div class="left-rigth-txt mb-l-0 a-up <?php echo get_sub_field( 'list_style' ); ?>">
										<?php if( get_sub_field( 'label' ) ): ?> 
											<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'label', 't' => 'span', 'w' => 'h6', 'wc' => 'an-line' ) ); ?>
										<?php else: ?>
											<h6 class="an-line _ml-0 _w-90">
												<span></span>
											</h6>
										<?php endif; ?>
										<?php $h_color = get_sub_field( 'heading_color' ) ? 'text-brand' : '' ?>
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2', 'tc' => $h_color ) ); ?>
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'content' ) ); ?>
										<?php if( $has_logos = get_sub_field( 'has_logos' )): ?> 
											<?php if( get_sub_field( 'logos' ) ): ?>
												<p class="mb-3 mxn-1">
													<?php while( has_sub_field( 'logos' ) ): ?>
														<?php get_template_part_args( 'templates/content-modules-image', array( 'v' => 'logo', 'v2x' => false ) ); ?>
													<?php endwhile; ?>
												</p>
											<?php endif ?>
										<?php endif; ?>
										<?php get_template_part_args( 'templates/content-modules-cta-button', array( 'v' => 'cta_button', 'c' => 'link-underline', 'w' => 'p' ) ); ?>
									</div>
									<?php if ( '_right' == get_sub_field( 'image_align' ) ): ?>
										<div class="left-rigth-img pl-md-7 mb-md-15">
											<div class="img-a">
												<div class="img-a-img _6-7">
													<?php $image = get_sub_field( 'image_desktop' ) ?>
													<?php if( !empty( $image ) ): ?>
														<?php $bg_url = $image['sizes']['ci-1-d']; ?>
														<?php $bg_url_2x = $image['sizes']['ci-1-d-2x']; ?>
														<picture>
															<?php $image = get_sub_field( 'image_mobile' ) ?>
															<?php if( !empty( $image ) ): ?>
																<source src="<?php echo $image['sizes']['ci-1-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
															<?php endif; ?>
															<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
														</picture>
													<?php endif; ?>
												</div>
											</div>
											<div class="bg-pattern _b-l a-left"></div>
										</div>
									<?php endif ?>
								</div>
							</div>
						</section>
					<?php elseif( 's2' == $type ): ?>
						<?php if ( 'large' == get_sub_field( 'margin_style' ) ): ?>
							<section class="content-image mt-10 mb-26 mt-md-10 mb-md-10" data-theme="<?php echo get_sub_field( 'box_color' ) ?>">
						<?php elseif ( 'medium' == get_sub_field( 'margin_style' ) ): ?>
							<section class="content-image mt-15 mb-10 my-md-7" data-theme="<?php echo get_sub_field( 'box_color' ) ?>">
						<?php else: ?>	
							<section class="content-image mt-10 mb-26 mt-md-10 mb-md-10" data-theme="<?php echo get_sub_field( 'box_color' ) ?>">
						<?php endif ?>
							<div class="container">
								<?php if( have_rows('extra_images') ): ?>
									<?php while( have_rows('extra_images') ): ?>
										<?php the_row(); ?>
										<div class="left-rigth-inner-img">
											<div class="left-rigth-inner-img-left">
												<div class="img-a">
													<div class="img-a-img _5-4">
														<?php $image = get_sub_field( 'image_left_desktop' ) ?>
														<?php if( !empty( $image ) ): ?>
															<?php $bg_url = $image['sizes']['ci-e-1-d']; ?>
															<?php $bg_url_2x = $image['sizes']['ci-e-1-d-2x']; ?>
															<picture>
																<?php $image = get_sub_field( 'image_left_mobile' ) ?>
																<?php if( !empty( $image ) ): ?>
																	<source src="<?php echo $image['sizes']['ci-e-1-d-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
																<?php endif; ?>
																<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
															</picture>
														<?php endif; ?>
													</div>
												</div>
											</div>
											<div class="left-rigth-inner-img-right mr-to-edge">
												<div class="img-a">
													<div class="img-a-img _8-6">
														<?php $image = get_sub_field( 'image_right_desktop' ) ?>
														<?php if( !empty( $image ) ): ?>
															<?php $bg_url = $image['sizes']['ci-e-2-d']; ?>
															<?php $bg_url_2x = $image['sizes']['ci-e-2-d-2x']; ?>
															<picture>
																<?php $image = get_sub_field( 'image_right_mobile' ) ?>
																<?php if( !empty( $image ) ): ?>
																	<source src="<?php echo $image['sizes']['ci-e-2-d-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
																<?php endif; ?>
																<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
															</picture>
														<?php endif; ?>
													</div>
												</div>
											</div>
										</div>
									<?php endwhile; ?>
								<?php endif; ?>
								<div class="left-rigth-inner">
									<div class="left-rigth-img tl-to-edge mr-md-7 mb-md-4">
										<div class="img-a">
											<div class="img-a-img _5-8">
												<?php $image = get_sub_field( 'image_desktop' ) ?>
												<?php if( !empty( $image ) ): ?>
													<?php $bg_url = $image['sizes']['ci-2-d']; ?>
													<?php $bg_url_2x = $image['sizes']['ci-2-d-2x']; ?>
													<picture>
														<?php $image = get_sub_field( 'image_mobile' ) ?>
														<?php if( !empty( $image ) ): ?>
															<source src="<?php echo $image['sizes']['ci-2-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
														<?php endif; ?>
														<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
													</picture>
												<?php endif; ?>
											</div>
										</div>
										<div class="bg-pattern _c-r-v2 a-right"></div>
									</div>
									<div class="left-rigth-txt mb-l-0 a-up ">
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'label', 't' => 'span', 'w' => 'h6', 'wc' => 'an-line' ) ); ?>
										<?php $h_color = get_sub_field( 'heading_color' ) ? 'text-brand' : '' ?>
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2', 'tc' => $h_color ) ); ?>
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'content', 't' => 'p' ) ); ?>
										<?php get_template_part_args( 'templates/content-modules-cta-button', array( 'v' => 'cta_button', 'c' => 'link-underline', 'w' => 'p' ) ); ?>
									</div>
								</div>
							</div>
						</section>
					<?php elseif( 's4' == $type ): ?>
						<section class="content-image py-3 pb-md-7 pt-md-0 mt-40 mt-md-60p bg-blue bg-p-gray text-white a-b-up">
							<div class="container">
								<div class="left-rigth-inner">
									<div class="left-rigth-txt mb-l-0 a-up  color-current">
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'label', 't' => 'span', 'w' => 'h6', 'wc' => 'an-line' ) ); ?>
										<?php $h_color = get_sub_field( 'heading_color' ) ? 'text-brand' : '' ?>
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2', 'tc' => $h_color ) ); ?>
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'content', 't' => 'p' ) ); ?>
										<?php get_template_part_args( 'templates/content-modules-cta-button', array( 'v' => 'cta_button', 'c' => 'link-underline', 'w' => 'p') ); ?>
									</div>
									<div class="left-rigth-img ttn-30p mb-md-2">
										<div class="img-a">
											<div class="img-a-img _6-7">
												<?php $image = get_sub_field( 'image_desktop' ) ?>
												<?php if( !empty( $image ) ): ?>
													<?php $bg_url = $image['sizes']['ci-1-d']; ?>
													<?php $bg_url_2x = $image['sizes']['ci-1-d-2x']; ?>
													<picture>
														<?php $image = get_sub_field( 'image_mobile' ) ?>
														<?php if( !empty( $image ) ): ?>
															<source src="<?php echo $image['sizes']['ci-1-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
														<?php endif; ?>
														<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
													</picture>
												<?php endif; ?>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					<?php elseif( 's6' == $type ): ?>
						<section class="content-image mt-14 mb-20 mb-lg-20 mt-md-7 mb-md-10">
							<div class="container">
								<div class="left-rigth-inner <?php if ( 'large' == get_sub_field( 'image_size' ) ){ echo '_6-4'; } ?>">
									<div class="left-rigth-img <?php if ( 'small' == get_sub_field( 'image_size' ) ){ echo 'mr-md-7'; } ?> mb-md-8">
										<div class="img-a">
											<div class="img-a-img <?php if ( 'large' == get_sub_field( 'image_size' ) ){ echo '_8-4'; } ?>">
												<?php $image = get_sub_field( 'image_desktop' ) ?>
												<?php if( !empty( $image ) ): ?>
													<?php $bg_url = $image['sizes']['ci-6-d']; ?>
													<?php $bg_url_2x = $image['sizes']['ci-6-d-2x']; ?>
													<picture>
														<?php $image = get_sub_field( 'image_mobile' ) ?>
														<?php if( !empty( $image ) ): ?>
															<source src="<?php echo $image['sizes']['ci-6-d']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
														<?php endif; ?>
														<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
													</picture>
												<?php endif; ?>
											</div>
										</div>
									</div>
									<div class="left-rigth-txt mb-l-0 a-up ">
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'label', 't' => 'span', 'w' => 'h6', 'wc' => 'an-line' ) ); ?>
										<?php if( $heading_url = get_sub_field( 'heading_url' )): ?> 
											<?php if( $heading = get_sub_field( 'heading' )): ?> 
												<h2 class="titles">
													<a href="<?php echo $heading_url; ?>">
														<?php echo $heading; ?>
													</a>
												</h2>
											<?php endif; ?>
										<?php else: ?>
											<?php $h_color = get_sub_field( 'heading_color' ) ? 'text-brand' : '' ?>
											<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2', 'tc' => 'titles '.$h_color ) ); ?>
										<?php endif; ?>
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'content', 't' => 'p' ) ); ?>
									</div>
								</div>
							</div>
						</section>
					<?php elseif( 's5' == $type ): ?>
						<?php  
							$style = '';
							$margin_bottom = get_sub_field( 'margin_bottom' );
							$margin_top = get_sub_field( 'margin_top' );
						?>
						<section class="content-image ov-h <?php echo $margin_top; ?> <?php echo $margin_bottom; ?>">
							<div class="container">
								<div class="left-rigth-inner">
									<div class="left-rigth-txt mb-l-0 a-up">
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'label', 't' => 'span', 'w' => 'h6', 'wc' => 'an-line' ) ); ?>
										<?php if( $heading_url = get_sub_field( 'heading_url' )): ?> 
											<?php if( $heading = get_sub_field( 'heading' )): ?> 
												<h2 class="titles">
													<a href="<?php echo $heading_url; ?>">
														<?php echo $heading; ?>
													</a>
												</h2>
											<?php endif; ?>
										<?php else: ?>
											<?php $h_color = get_sub_field( 'heading_color' ) ? 'text-brand' : '' ?>
											<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2', 'tc' => $h_color ) ); ?>
										<?php endif; ?>
										    	
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'content', 't' => 'p' ) ); ?>
										<?php get_template_part_args( 'templates/content-modules-cta-button', array( 'v' => 'cta_button', 'c' => 'link-underline', 'w' => 'p' ) ); ?>
									</div>
									<div class="left-rigth-img _double-img mb-md-5">
										<div class="img-a top-img">
											<div class="img-a-img _5-3">
												<?php if( have_rows('extra_image') ): ?>
													<?php while( have_rows('extra_image') ): ?>
														<?php the_row(); ?>
														<?php $image = get_sub_field( 'image_desktop' ) ?>
														<?php if( !empty( $image ) ): ?>
															<?php $bg_url = $image['sizes']['ci-5-e-d']; ?>
															<?php $bg_url_2x = $image['sizes']['ci-5-e-d-2x']; ?>
															<picture>
																<?php $image = get_sub_field( 'image_mobile' ) ?>
																<?php if( !empty( $image ) ): ?>
																	<source src="<?php echo $image['sizes']['ci-5-e-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
																<?php endif; ?>
																<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
															</picture>
														<?php endif; ?>
													<?php endwhile; ?>
												<?php endif; ?>
											</div>
										</div>
										<div class="p-relative bottom-img">
											<div class="img-a">
												<div class="img-a-img _5-6">
													<?php $image = get_sub_field( 'image_desktop' ) ?>
													<?php if( !empty( $image ) ): ?>
														<?php $bg_url = $image['sizes']['ci-5-d']; ?>
														<?php $bg_url_2x = $image['sizes']['ci-5-d']; ?>
														<picture>
															<?php $image = get_sub_field( 'image_mobile' ) ?>
															<?php if( !empty( $image ) ): ?>
																<source src="<?php echo $image['sizes']['ci-5-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
															<?php endif; ?>
															<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
														</picture>
													<?php endif; ?>
												</div>
											</div>
											<div class="bg-pattern _c-r-v2 a-right">
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					<?php elseif( 's3' == $type ): ?>
						<?php $image = get_sub_field( 'background_image' ) ?>
						<?php if( !empty( $image ) ): ?>
							<?php $bg_image =  $image['sizes']['ci-3-bg']; ?>
						<?php else: ?>
							<?php $bg_image = get_template_directory_uri().'/images/bg2.jpg' ?>
						<?php endif; ?>
						<section class="content-image py-15 py-lg-8  py-md-4 bg-img a-bg-up" style="background-image: url(<?php echo $bg_image; ?>)">
							<div class="container">
								<div class="left-rigth-inner-v2">
									<div class="left-rigth-img">
										<div class="img-a">
											<div class="img-a-img _6-7">
												<?php $image = get_sub_field( 'image_desktop' ) ?>
												<?php if( !empty( $image ) ): ?>
													<?php $bg_url = $image['sizes']['ci-2-d']; ?>
													<?php $bg_url_2x = $image['sizes']['ci-2-d-2x']; ?>
													<picture>
														<?php $image = get_sub_field( 'image_mobile' ) ?>
														<?php if( !empty( $image ) ): ?>
															<source src="<?php echo $image['sizes']['ci-2-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
														<?php endif; ?>
														<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
													</picture>
												<?php endif; ?>
											</div>
										</div>
									</div>
									<div class="left-rigth-txt mb-l-0 a-up bg-white">
										<?php $label_color = get_sub_field( 'label_color' ) ? 'text-brand' : '' ?>
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'label', 't' => 'span', 'w' => 'h6', 'wc' => 'an-line '.$label_color ) ); ?>
										<?php $h_color = get_sub_field( 'heading_color' ) ? 'text-brand' : '' ?>
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2', 'tc' => $h_color ) ); ?>
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'content', 't' => 'p' ) ); ?>
										<?php get_template_part_args( 'templates/content-modules-cta-button', array( 'v' => 'cta_button', 'c' => 'link-underline', 'w' => 'p' ) ); ?>
									</div>
								</div>
							</div>
						</section>
					<?php else: ?>
					<?php endif ?>
				<?php elseif( get_row_layout() == 'image_grid' ): ?>
					<!-- image_grid -->
					<section class="mt-15 mb-19 mt-md-8 mb-md-9 ov-h">
						<div class="container">
							<div class="grid articles-card">
								<?php if( get_sub_field( 'image_grid' ) ): ?>
									<?php while( has_sub_field( 'image_grid' ) ): ?>
										<article class="col-4 col-md-12">
											<div class="articles-card-img img-a">
												<div class="img-a-img _4-2">
													<?php $image = get_sub_field( 'image_desktop' ) ?>
													<?php if( !empty( $image ) ): ?>
														<?php $bg_url = $image['sizes']['img-grid-d']; ?>
														<?php $bg_url_2x = $image['sizes']['img-grid-d-2x']; ?>
														<picture>
															<?php $image = get_sub_field( 'image_mobile' ) ?>
															<?php if( !empty( $image ) ): ?>
																<source src="<?php echo $image['sizes']['ci-2-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
															<?php endif; ?>
															<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
														</picture>
													<?php endif; ?>
												</div>
											</div>
											<div class="articles-card-info a-up">
												<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h3' ) ); ?>
												<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'content', 't' => 'p' ) ); ?>
												<?php get_template_part_args( 'templates/content-modules-cta-button', array( 'v' => 'cta_button', 'c' => 'link-underline', 'w' => 'p' ) ); ?>
											</div>
										</article>
									<?php endwhile; ?>
								<?php endif ?>
							</div>
						</div>
					</section>
				<?php elseif( get_row_layout() == 'slider' ): ?>
					<?php if( get_sub_field( 'slider' ) ): ?>
						<?php $type = get_sub_field( 'style' ); ?>
						<!-- slider <?php echo $type; ?> -->
						<?php if( 's1' == $type ): ?> 
							<?php  
								$style = '';
								$margin_bottom = get_sub_field( 'margin_bottom' );
								$margin_top = get_sub_field( 'margin_top' );
							?>
							<section class="<?php echo $margin_top; ?> <?php echo $margin_bottom; ?>">
								<div class="swiper-container swiper-community swiper-slider">
									<div class="swiper-wrapper">
										<?php while( has_sub_field( 'slider' ) ): ?>
											<?php $image = get_sub_field( 'image_desktop' ) ?>
											<?php if( !empty( $image ) ): ?>
												<?php $image_description = get_sub_field( 'image_description' ) ? get_sub_field( 'image_description' ) : ' '; ?>
												<div class="swiper-slide" data-tittle="<?php echo $image_description; ?>">
													<figure class="slide-bgimg a-bg-up" style="background-image:url(<?php echo $image['sizes']['slider-d']; ?>)">
														<div class="ar-16-8 bg-str">
															<?php $image = get_sub_field( 'image_desktop' ) ?>
															<?php if( !empty( $image ) ): ?>
																<?php $bg_url = $image['sizes']['slider-d']; ?>
																<?php $bg_url_2x = $image['sizes']['slider-d-2x']; ?>
																<picture>
																	<?php $image = get_sub_field( 'image_mobile' ) ?>
																	<?php if( !empty( $image ) ): ?>
																		<source src="<?php echo $image['sizes']['slider-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
																	<?php endif; ?>
																	<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
																</picture>
															<?php endif; ?>
														</div>
													</figure>
												</div>
											<?php endif; ?>
										<?php endwhile; ?>
									</div>
									<div class="swiper-bottom">
										<div class="swiper-pagination"></div>
										<div class="swiper-data-tittle"></div>
										<div class="swiper-button-block">
											<div class="swiper-button-prev"></div>
											<div class="swiper-button-next"></div>
										</div>
									</div>
								</div>
							</section>
						<?php elseif( 's2' == $type ): ?>
							<?php if( get_sub_field( 'slider' ) ): ?>
								<?php  
									$style = '';
									$margin_bottom = get_sub_field( 'margin_bottom' );
									$margin_top = get_sub_field( 'margin_top' );
								?>
								<section class="ov-h <?php echo $margin_top; ?> <?php echo $margin_bottom; ?>">
									<?php /*
										pt-0 pt-lg-6 			pb-10 pb-lg-0
										pt-0 			pt-md-6 pb-13			pb-md-5 ov-h
										pt-9  			pt-md-6 pb-0			pb-md-5 ov-h
									*/ ?>
									<div class="container">
										<div class="swiper-community swiper-full slick-slider">
											<div class="slider-wrapper">
												<?php while( has_sub_field( 'slider' ) ): ?>
													<div class="">
														<figure class="">
															<div class="">
																<?php $image = get_sub_field( 'image_desktop' ) ?>
																<?php if( !empty( $image ) ): ?>
																	<?php $bg_url = $image['sizes']['slider-2']; ?>
																	<?php $bg_url_2x = $image['sizes']['slider-2-2x']; ?>
																	<picture>
																		<?php $image_mobile = get_sub_field( 'image_mobile' ) ?>
																		<?php if( !empty( $image_mobile ) ): ?>
																			<source src="<?php echo $image_mobile['url']; ?>" alt="<?php echo $image_mobile['alt']; ?>" title="<?php echo $image_mobile['title']; ?>"  media="(max-width: 414px)">
																		<?php endif; ?>
																		<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
																	</picture>
																<?php endif; ?>
															</div>
														</figure>
													</div>
												<?php endwhile; ?>
											</div>
											<div class="swiper-bottom">
												<div class="swiper-pagination"></div>
												<div class="swiper-button-block">
													<div class="swiper-button-prev"></div>
													<div class="swiper-button-next"></div>
												</div>
											</div>
										</div>
									</div>
								</section>
							<?php endif ?>
						<?php endif ?>
					<?php endif ?>
				<?php elseif( get_row_layout() == 'content_grid' ): ?>
					<!-- content_grid -->
					<?php if( get_sub_field( 'content_grid' ) ): ?>
						<?php if( 'blue' == get_sub_field( 'background_color' ) ): ?>
							<section class="pt-12 pb-15 py-md-8 bg-blue bg-p-gray text-white text-center a-b-up">
								<div class="container a-up">
									<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2' ) ); ?>
									<div class="grid donation-row pt-5 pt-lg-2">
										<?php if( get_sub_field( 'content_grid' ) ): ?>
											<?php while( has_sub_field( 'content_grid' ) ): ?>
												<div class="col-4 col-lg-12 my-lg-2">
													<div class="donation-item">
														<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h3' ) ); ?>
														<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'text', 't' => 'p' ) ); ?>
													</div>
												</div>
											<?php endwhile; ?>
										<?php endif ?>
									</div>
								</div>
							</section>
						<?php else: ?>
							<?php if( get_sub_field( 'heading' ) ): ?>
								<?php if( 'large' == get_sub_field( 'margin_style' ) ): ?>
									<section class="pt-9 pb-13 pt-md-6 pb-md-5 a-b-up ov-h <?php echo get_sub_field( 'background_color' ) ?>">
								<?php else: ?>
									<section class="mt-9 mb-13 mt-md-6 mb-md-5 ov-h <?php echo get_sub_field( 'background_color' ) ?>">
								<?php endif ?>
									<div class="container a-up">
							<?php else: ?>
								<?php if( 'large' == get_sub_field( 'margin_style' ) ): ?>
									<section class="mt-15 mb-14 mt-md-6 mb-md-9 ov-h <?php echo get_sub_field( 'background_color' ) ?>">
								<?php else: ?>
									<section class="mt-9 mb-13 mt-md-6 mb-md-5 ov-h <?php echo get_sub_field( 'background_color' ) ?>">
								<?php endif ?>
									<div class="container">
							<?php endif ?>
									<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2', 'tc' => 'an-line-t-l' ) ); ?>
									<div class="grid articles-card <?php if( get_sub_field( 'heading' ) ){ echo 'mt-6'; } ?> <?php if( get_sub_field( 'cta_button' ) ){ echo 'mb-6'; } ?>">
										<?php while( has_sub_field( 'content_grid' ) ): ?>
											<article class="col-4 col-md-12">
												<div class="articles-card-info a-up">
													<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h3' ) ); ?>
													<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'text', 't' => 'p' ) ); ?>
													<?php get_template_part_args( 'templates/content-modules-cta-button', array( 'v' => 'cta_button', 'c' => 'link-underline', 'w' => 'p' ) ); ?>
												</div>
											</article>
										<?php endwhile; ?>
									</div>
									<?php get_template_part_args( 'templates/content-modules-cta-button', array( 'v' => 'cta_button', 'c' => 'btn', 'w' => 'p' ) ); ?>
								</div>
							</section>
						<?php endif ?>
						<?php endif ?>
				<?php elseif( get_row_layout() == 'services_amenities' ): ?>
					<!-- services_amenities <?php echo get_sub_field( 'background_color' ); ?>-->
					<?php if( 'white' == get_sub_field( 'background_color' ) ): ?>
						<section class="my-12 my-md-8 ov-h">
							<div class="container mb-l-0 a-up-nested">
								<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2' ) ); ?>
								<?php $services_amenities = get_sub_field('services_amenities'); ?>
								<?php if( $services_amenities ): ?>
									<ul class="<?php echo get_sub_field( 'number_of_columns' ) ?> list-marker">
										<?php foreach( $services_amenities as $service ):  ?>
											<li>
												<?php echo $service['text']; ?>
											</li>
										<?php endforeach; ?>
									</ul>
								<?php endif; ?>
							</div>
							<div class="decor-v-line a-down"></div>
						</section>
					<?php else: ?>	
						<section class="pt-15 pb-8 pt-md-10  pt-sm-50p pb-md-6 bg-blue bg-p-gray text-white p-relative a-b-up">
							<div class="container ov-h">
								<div class="grid mt-md-5">
									<div class="col-6 col-md-12 a-up">
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2' ) ); ?>
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'content', 't' => 'p' ) ); ?>
									</div>
								</div>
								<div class="grid mt-4 mb-2 my-md-4">
									<?php $services_amenities = get_sub_field('services_amenities'); ?>
									<?php if( $services_amenities ): ?>
										<?php $per_row = ceil( count( $services_amenities ) / 2 ); ?>									
										<?php $x = 0; ?>									
										<?php foreach( $services_amenities as $service ):  ?>
											<?php if( $x % $per_row == 0): ?>
												<div class="col-6 col-md-12 a-up">
													<ul class="list-ico">
											<?php endif ?>
											<li>
												<i>
													<img src="<?php echo $service['icon']['url'] ?>">
												</i>
												<?php echo $service['text']; ?>
											</li>
											<?php $x++ ?>
											<?php if( $x % $per_row == 0): ?>
												</div>
											<?php endif ?>
										<?php endforeach; ?>
										<?php if( count( $services_amenities ) % 2 != 0 ) : ?>
												</ul>
											</div>
										<?php endif ?>
									<?php endif; ?>
								</div>
								<?php get_template_part_args( 'templates/content-modules-cta-button', array( 'v' => 'cta_button', 'c' => 'link-underline text-white a-up', 'w' => 'p' ) ); ?>
							</div>
							<div class="decor-v-line a-down"></div>
						</section>
					<?php endif ?>
				<?php elseif( get_row_layout() == 'video_content' ): ?>
					<?php $type = get_sub_field( 'style' ); ?>
					<!-- video_content <?php echo $type; ?>-->
					<?php if( 's1' == $type ): ?> 
						<section class="mt-20 mb-20 mb-lg-20 mt-md-7 mb-md-10">
							<div class="container">
								<div class="left-rigth-inner _6-4">
									<div class="left-rigth-img  mb-md-8">
										<div class="img-a-video">
											<div class="img-a-img">
												<?php $image = get_sub_field( 'image_desktop' ) ?>
												<?php if( !empty( $image ) ): ?>
													<?php $bg_url = $image['sizes']['video-d']; ?>
													<?php $bg_url_2x = $image['sizes']['video-d-2x']; ?>
													<picture>
														<?php $image = get_sub_field( 'image_mobile' ) ?>
														<?php if( !empty( $image ) ): ?>
															<source src="<?php echo $image['sizes']['video-d']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
														<?php endif; ?>
														<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
													</picture>
												<?php endif; ?>
											</div>
											<div class="img-a-bg-video">
												<?php if( $video_url = get_sub_field( 'video_url' )): ?> 
													<div class="hero-img-popup-link custom-video">
														<span class="box-play">
															<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
																<path fill-rule="evenodd" clip-rule="evenodd" d="M30 0C13.44 0 0 13.44 0 30C0 46.56 13.44 60 30 60C46.56 60 60 46.56 60 30C60 13.44 46.56 0 30 0ZM30 54C16.77 54 6 43.23 6 30C6 16.77 16.77 6 30 6C43.23 6 54 16.77 54 30C54 43.23 43.23 54 30 54ZM42 30L24 43.5V16.5L42 30Z" fill="white"></path>
															</svg>
														</span>
														<div class="box-bg" style="background-image: url(<?php echo $bg_url_2x ?>)"></div>
														<video src="<?php echo $video_url; ?>" controls="" muted <?php if ( get_sub_field( 'autoplay' ) ){ echo 'autoplay=""'; } ?>>
														</video>
													</div>
												<?php endif; ?>
											</div>
										</div>
									</div>
									<div class="left-rigth-txt mb-l-0 a-up ">
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'label', 't' => 'span', 'w' => 'h6', 'wc' => 'an-line' ) ); ?>
										<?php //get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2', 'tc' => 'titles' ) ); ?>
										<?php if( $heading = get_sub_field( 'heading' )): ?> 
											<?php if( $heading_url = get_field( 'heading_url' )): ?> 
												<h2 class="titles">
													<a href="<?php echo get_sub_field( 'heading_url' ) ?>">
														<?php echo $heading; ?>
													</a>
												</h2>
											<?php else: ?>
												<?php $h_color = get_sub_field( 'heading_color' ) ? 'text-brand' : '' ?>
												<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2', 'tc' => 'titles '. $h_color ) ); ?>
											<?php endif; ?>
										<?php endif; ?>
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'content', 't' => 'p' ) ); ?>
										<?php get_template_part_args( 'templates/content-modules-cta-button', array( 'v' => 'cta_button', 'c' => 'link-underline', 'w' => 'p' ) ); ?>
									</div>
								</div>
							</div>
						</section>
					<?php elseif( 's3' == $type ): ?>
						<section class="mt-20 mb-20 mb-lg-20 mt-md-7 mb-md-10">
							<div class="container">
								<div class="left-rigth-inner _6-4">
									<div class="left-rigth-img  mb-md-8">
										<div class="img-a-video">
											<div class="img-a-img">
												<?php $image = get_sub_field( 'image_desktop' ) ?>
												<?php if( !empty( $image ) ): ?>
													<?php $bg_url = $image['sizes']['video-d']; ?>
													<?php $bg_url_2x = $image['sizes']['video-d-2x']; ?>
													<picture>
														<?php $image = get_sub_field( 'image_mobile' ) ?>
														<?php if( !empty( $image ) ): ?>
															<source src="<?php echo $image['sizes']['video-d']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
														<?php endif; ?>
														<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
													</picture>
												<?php endif; ?>
											</div>
											<div class="img-a-bg-video">
												<?php if( $video_url = get_sub_field( 'video_url' )): ?> 
													<div class="hero-img-popup-link">
														<iframe src="<?php echo $video_url; ?>" width="640" height="360" frameborder="0" allow="<?php if ( get_sub_field( 'autoplay' ) ){ echo 'autoplay;'; } ?> fullscreen; picture-in-picture" allowfullscreen=""></iframe>
													</div>
												<?php endif; ?>
											</div>
										</div>
									</div>
									<div class="left-rigth-txt mb-l-0 a-up ">
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'label', 't' => 'span', 'w' => 'h6', 'wc' => 'an-line' ) ); ?>
										<?php //get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2', 'tc' => 'titles' ) ); ?>
										<?php if( $heading = get_sub_field( 'heading' )): ?> 
											<?php if( $heading_url = get_field( 'heading_url' )): ?> 
												<h2 class="titles">
													<a href="<?php echo get_sub_field( 'heading_url' ) ?>">
														<?php echo $heading; ?>
													</a>
												</h2>
											<?php else: ?>
												<?php $h_color = get_sub_field( 'heading_color' ) ? 'text-brand' : '' ?>
												<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2', 'tc' => 'titles '. $h_color ) ); ?>
											<?php endif; ?>
										<?php endif; ?>
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'content', 't' => 'p' ) ); ?>
										<?php get_template_part_args( 'templates/content-modules-cta-button', array( 'v' => 'cta_button', 'c' => 'link-underline', 'w' => 'p' ) ); ?>
									</div>
								</div>
							</div>
						</section>
					<?php elseif( 's2' == $type ): ?>
						<section class="py-8 bg-blue bg-p-gray text-center text-white">
							<div class="container a-up">
								<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'content', 't' => 'p', 'w' => 'div', 'wc' => 'mw-600 mx-a pb-5' ) ); ?>
								<?php if( get_sub_field( 'video_blocks' ) ): ?>
									<div class="grid grid-sm _x-center">
										<?php while( has_sub_field( 'video_blocks' ) ): ?>
											<div class="col-6 col-md-12 pb-0 pb-md-6">
												<?php if( $video_url = get_sub_field( 'video_url' )): ?> 
													<?php $image = get_sub_field( 'poster' ) ?>
													<?php $bg_url_2x = ''; ?>
													<?php if( !empty( $image ) ): ?>
														<?php $bg_url_2x = $image['sizes']['video-d-2x']; ?>
													<?php endif; ?>
													<div class="mb-4">
														<div class="video-block custom-video">
															<span class="box-play">
																<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
																	<path fill-rule="evenodd" clip-rule="evenodd" d="M30 0C13.44 0 0 13.44 0 30C0 46.56 13.44 60 30 60C46.56 60 60 46.56 60 30C60 13.44 46.56 0 30 0ZM30 54C16.77 54 6 43.23 6 30C6 16.77 16.77 6 30 6C43.23 6 54 16.77 54 30C54 43.23 43.23 54 30 54ZM42 30L24 43.5V16.5L42 30Z" fill="white"/>
																</svg>
															</span>
															<div class="box-bg" style="background-image: url(<?php echo $bg_url_2x ?>)"></div>
															<video src="<?php echo $video_url; ?>" controls="" muted <?php if ( get_sub_field( 'autoplay' ) ){ echo 'autoplay=""'; } ?>>
															</video>
														</div>
													</div>
												<?php endif; ?>
												<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h3' ) ); ?>
												<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'content', 't' => 'p' ) ); ?>
											</div>
										<?php endwhile; ?>
									</div>
								<?php endif ?>
								<div class="mw-600 mx-a pt-5">
									<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'bottom_content', 't' => 'p' ) ); ?>
									<?php get_template_part_args( 'templates/content-modules-cta-button', array( 'v' => 'cta_button', 'c' => 'btn', 'w' => 'p' ) ); ?>
								</div>
							</div>
						</section>
					<?php endif ?>
				<?php elseif( get_row_layout() == 'testimonials' ): ?>
					<!-- testimonials -->
					<?php if( get_sub_field( 'testimonial' ) ): ?>
						<?php  
							$style = '';
							$margin_bottom = get_sub_field( 'margin_bottom' );
							$margin_top = get_sub_field( 'margin_top' );
						?>
						<section class="bg-blue bg-p-gray text-white text-center a-b-up <?php echo $margin_top; ?> <?php echo $margin_bottom; ?>">
							<?php /*
								py-10 py-md-6 				
								py-10 py-md-6 mb-16 mb-md-5 
							*/ ?>
							<div class="container">
								<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2', 'w' => 'div', 'wc' => 'text-center mb-6' ) ); ?>
								<div class="swiper-container swiper-review">
									<div class="swiper-wrapper">
										<?php while( has_sub_field( 'testimonial' ) ): ?>
											<div class="swiper-slide">
												<div class="swiper-review-item a-up">
													<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'quote', 't' => 'div', 'tc' => 'callout' ) ); ?>
													<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'name', 't' => 'h6' ) ); ?>
												</div>
											</div>
										<?php endwhile; ?>
									</div>
									<div class="swiper-button-prev"></div>
									<div class="swiper-button-next"></div>
								</div>
							</div>
						</section>
					<?php endif ?>
				<?php elseif( get_row_layout() == 'floor_plans' ): ?>
					<!-- floor_plans -->
					<section class="floor-plans-section">
						<div class="container">
							<div class="title-area a-up">
								<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2' ) ); ?>
								<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'content', 't' => 'p' ) ); ?>
							</div>
							<div class="floor-plans-container">
								<?php if( get_sub_field( 'floor_plans' ) ): ?>
									<?php $i = 0; ?>
									<div class="floor-plans-select">
										<select name="" id="floor-plans-select">
											<?php while( has_sub_field( 'floor_plans' ) ): ?>
												<option value="<?php echo get_sub_field( 'name' ) ?>" data-plan-id="<?php echo $i; ?>">
													<?php echo get_sub_field( 'name' ); ?>
												</option>
												<?php $i ++; ?>
											<?php endwhile; ?>
										</select>
									</div>
								<?php endif ?>
								<div class="floor-plans-imgs">
									<div class="plans-img-decor-box a-left">
									</div>
									<ul class="plans-img-list">
										<?php if( get_sub_field( 'floor_plans' ) ): ?>
											<?php $i = 0; ?>
											<?php while( has_sub_field( 'floor_plans' ) ): ?>
												<li class="plans-img-list-item <?php if( 0 == $i ){ echo '_active'; } ?>" data-plan-id="<?php echo $i ?>">
													<div class="plans-img-list-item-inner">
														<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'name', 't' => 'h2', 'tc' => 'plans-img-list-item-title' ) ); ?>
														<div class="plans-img-list-item-pic">
															<?php $image = get_sub_field( 'image_desktop' ) ?>
															<?php if( !empty( $image ) ): ?>
																<?php $bg_url = $image['sizes']['plan-d']; ?>
																<?php $bg_url_2x = $image['sizes']['plan-d-2x']; ?>
																<picture>
																	<?php $image = get_sub_field( 'image_mobile' ) ?>
																	<?php if( !empty( $image ) ): ?>
																		<source src="<?php echo $image['sizes']['plan-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
																	<?php endif; ?>
																	<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
																</picture>
															<?php endif; ?>
														</div>
														<?php if( $url = get_sub_field( 'virtual_tour_url' ) ): ?>
															<a href="<?php echo $url ?>" class="link-underline">
																VIEW VIRTUAL TOUR
															</a>
														<?php endif ?>
													</div>
												</li>
												<?php $i ++; ?>
											<?php endwhile; ?>
										<?php endif ?>
									</ul>
								</div>
								<?php if( get_sub_field( 'floor_plans' ) ): ?>
									<?php $i = 0; ?>
									<div class="floor-plans-controls">
										<ul class="plans-controls-list">
											<?php while( has_sub_field( 'floor_plans' ) ): ?>
												<li class="plans-controls-list-item <?php if( 0 == $i ){ echo '_active'; } ?>" data-plan-id="<?php echo $i; ?>">
													<a href="">
														<?php echo get_sub_field( 'name' ) ?>
													</a>
												</li>
												<?php $i ++; ?>
											<?php endwhile; ?>
										</ul>
									</div>
								<?php endif ?>
							</div>
						</div>
					</section>
				<?php elseif( get_row_layout() == 'timeline' ): ?>
					<!-- timeline -->
					<?php if( get_sub_field( 'timeline' ) ): ?>
						<section class="my-20 mt-md-8 mb-md-8 ov-h">
							<div class="container _xs">
								<ul class="event-block">
									<?php while( has_sub_field( 'timeline' ) ): ?>
										<li class="a-up">
											<div class="event-timeline">
												<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'event_name', 't' => 'h2', 'tc' => 'an-line-t-l _mw-full' ) ); ?>
											</div>
											<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'event_text', 't' => 'p', 'w' => 'div' ) ); ?>
										</li>
									<?php endwhile; ?>
								</ul>
							</div>
						</section>
					<?php endif ?>
				<?php elseif( get_row_layout() == 'available_positions' ): ?>
					<!-- available_positions -->
					<section class="pt-9 pb-13 pt-md-6 pb-md-5 bg-gray a-b-up ov-h">
						<div class="container a-up">
							<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2', 'tc' => 'an-line-t-l' ) ); ?>
							<?php if( get_sub_field( 'available_positions' ) ): ?>
								<ul class="grid available-positions mt-6">
									<?php while( has_sub_field( 'available_positions' ) ): ?>
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'positions', 't' => 'li', 'tc' => 'col-4 col-lg-6 col-md-12' ) ); ?>
									<?php endwhile; ?>
								</ul>
							<?php endif ?>
							<?php get_template_part_args( 'templates/content-modules-cta-button', array( 'v' => 'cta_button', 'c' => 'btn', 'w' => 'p' ) ); ?>
						</div>
					</section>
				<?php elseif( get_row_layout() == 'faqs' ): ?>
					<!-- faqs -->
					<section class="py-8">
						<div class="container a-up mb-l-0">
							<h1 class="an-line-b-c text-center">
								FAQs
							</h1>
						</div>
					</section>
					<section class="py-10 py-md-5 bg-gray">
						<div class="container _lg">
							<div class="result-inner">
								<div class="result-sidebar">
									<div class="d-md-none">
										<h3>
											Categories
										</h3>
										<ul class="result-filter location-filters">
											<li class="active">
												<a href="#">
													All
												</a>
											</li>
											<?php $terms = get_terms( 'location', array( ) ); ?>
											<?php $i = 0; ?>
											<?php if( $terms ): ?>
												<?php foreach( $terms as $term ): ?>
													<li class="">
														<a href="#" data-id="<?php echo $term->term_id; ?>" data-hash="#<?php echo $term->slug; ?>">
															<?php echo $term->name ?>
														</a>
													</li>
													<?php $i ++; ?>
												<?php endforeach ?>
											<?php endif ?>
										</ul>
									</div>
									<div class="d-none d-md-block sel-white mb-md-4">
										<h4 class="text-center">
											Filter by
										</h4>
										<select class="w-100p location-dropdown">
											<option value="all">
												All
											</option>
											<?php $i = 0; ?>
											<?php if( $terms ): ?>
												<?php foreach( $terms as $term ): ?>
													<option value="<?php echo $term->term_id; ?>" data-hash="#<?php echo $term->slug; ?>" <?php //if( 0 == $i ){ echo 'selected'; } ?>>
														<?php echo $term->name ?>
													</option>
													<?php $i ++; ?>
												<?php endforeach ?>
											<?php endif ?>
										</select>
									</div>
								</div>
								<div class="result-content">
									<?php $terms = get_terms( 'location', array( ) ); ?>
									<?php $ii = 0; ?>
									<?php $i = 0; ?>
									<?php foreach( $terms as $term ): ?>
										<?php 
											$args = array (

												'post_type'         => array( 'faq' ),
												'post_status'		=> array( 'publish' ),
												'posts_per_page'    => -1,
												'orderby'           => 'date',
												'tax_query' => array(
													array(
														'taxonomy' => 'location',
														'field'    => 'id',
														'terms'    => $term->term_id,
													),
												),
											);
											$wp_query = new WP_Query( $args );
										?>
										<?php if( $wp_query->have_posts( )): ?>
											<ul class="accordion simple-accordion location-accordion" data-hash="#<?php echo $term->slug; ?>" id="location-<?php echo $term->term_id; ?>">
												<!-- <li>
													<h3>
														<?php echo $term->name ?>
													</h3>
												</li> -->
												<?php while ( $wp_query->have_posts( )): ?>
													<?php  $wp_query->the_post() ?>
													<li class="<?php if( 0 == $ii ){ echo 'active'; } ?>">
														<a href="#" class="opener">
															<?php the_title() ?>
														</a>
														<div class="slide">
															<?php echo apply_filters( 'the_content', $post->post_content ) ?>
														</div>
													</li>
												<?php $ii ++; ?>
												<?php endwhile ?>
												<?php wp_reset_query() ?>
											</ul>
										<?php endif ?>
										<?php $i ++; ?>
									<?php endforeach ?>
								</div>
							</div>
						</div>
					</section>
				<?php elseif( get_row_layout() == 'contact_form' ): ?>
					<!-- contact_form -->
					<?php if( ! get_field( 'is_landing_page' ) ): ?>
						<section class="py-6">
							<div class="container a-up mb-l-0">
								<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h1', 'tc' => 'an-line-b-c text-center' ) ); ?>
							</div>
						</section>
						<section class="pt-6 pb-2 bg-gray ">
							<div class="container _xxs a-up">
								<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'content', 't' => 'p', 'tc' => 'text-center' ) ); ?>
								<div class="form-wrapper form-white">
									<?php get_template_part_args( 'templates/content-modules-formidable', array( 'v' => 'form' ) ); ?>
								</div>
							</div>
						</section>
					<?php endif ?>
				<?php elseif( get_row_layout() == 'contact_boxes' ): ?>
					<!-- contact_boxes -->
					<section class="py-12 py-md-7 ov-h bg-gray _bg-an-off _bg-t-22">
						<div class="container">
							<div class="grid articles-card">
								<?php if( get_sub_field( 'contact_boxes' ) ): ?>
								
									<?php while( has_sub_field( 'contact_boxes' ) ): ?>
										<article class="col-4 col-md-12">
											<div class="articles-card-img img-a">
												<div class="img-a-img _4-2">
													<a href="<?php echo get_sub_field( 'url' ) ?>">
														<?php $image = get_sub_field( 'image_desktop' ) ?>
														<?php if( !empty( $image ) ): ?>
															<?php $bg_url = $image['sizes']['ci-5-e-d']; ?>
															<?php $bg_url_2x = $image['sizes']['ci-5-e-d-2x']; ?>
															<picture>
																<?php $image = get_sub_field( 'image_mobile' ) ?>
																<?php if( !empty( $image ) ): ?>
																	<source src="<?php echo $image['sizes']['ci-5-e-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
																<?php endif; ?>
																<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
															</picture>
														<?php endif; ?>
														
													</a>
												</div>
											</div>
											<div class="articles-card-info a-up">
												<h3>
													<a href="<?php echo get_sub_field( 'url' ) ?>">
														<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'name' ) ); ?>
													</a>
												</h3>
												<p>
													<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'address' ) ); ?>
													<?php if( get_sub_field( 'phone' ) ): ?> 
														<br>
														<?php get_template_part_args( 'templates/content-modules-phone', array( 'v' => 'phone' ) ); ?>
													<?php endif; ?>
												</p>
											</div>
										</article>
									<?php endwhile; ?>
								<?php endif ?>
							</div>
						</div>
					</section>
				<?php elseif( get_row_layout() == 'contact_box' ): ?>
					<!-- contact_box -->
					<?php $type = get_sub_field( 'style' ); ?>
					<?php if( 's1' == $type ): ?> 
						<section class="py-8 py-lg-0 p-relative entry map-wrapper ov-h">
							<div class="container">
								<div class="map-inner a-right _img-block">
									<div class="map-img-block ar-16-9 p-relative">
										<?php $image = get_sub_field( 'image_desktop' ) ?>
										<?php if( !empty( $image ) ): ?>
											<?php $bg_url = $image['sizes']['slider-d']; ?>
											<?php $bg_url_2x = $image['sizes']['slider-d-2x']; ?>
											<picture class="p-bg-str">
												<?php $image = get_sub_field( 'image_mobile' ) ?>
												<?php if( !empty( $image ) ): ?>
													<source src="<?php echo $image['sizes']['slider-d-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
												<?php endif; ?>
												<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
											</picture>
										<?php endif; ?>
									</div>
									<div class="map-txt-block text-center">
										<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'name', 't' => 'h2' ) ); ?>
										<p>
											<?php if( $gmaps_url = get_sub_field( 'gmaps_url' )): ?> 
												<a href="<?php echo  $gmaps_url ?>" target="_blank" >
													<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'address' ) ); ?>
												</a>
											<?php else: ?>
												<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'address' ) ); ?>
											<?php endif; ?>
											    	
											<?php if( $phone = get_sub_field( 'phone' )): ?> 
												<br>
												<?php get_template_part_args( 'templates/content-modules-phone', array( 'v' => 'phone' ) ); ?>
											<?php endif; ?>
											<?php if( $email = get_sub_field( 'email' )): ?> 
												<br>
												<?php get_template_part_args( 'templates/content-modules-email', array( 'v' => 'email' ) ); ?>
											<?php endif; ?>
										</p>
									</div>
								</div>
							</div>
							<?php $image = get_sub_field( 'background_image' ) ?>
							<?php if( !empty( $image ) ): ?>
								<div class="bg-map a-up-full">
									<img src="<?php echo $image['sizes']['contact-maps']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>" />
								</div>
							<?php endif; ?>
							<?php /*
							<svg class="map-marker" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="22" cy="22" r="22" fill="var(--theme-brand)"></circle>
								<path d="M21.988 8.66602C14.628 8.66602 8.66797 14.6393 8.66797 21.9993C8.66797 29.3593 14.628 35.3327 21.988 35.3327C29.3613 35.3327 35.3346 29.3593 35.3346 21.9993C35.3346 14.6393 29.3613 8.66602 21.988 8.66602ZM27.6413 29.9993L22.0013 26.5993L16.3613 29.9993L17.8546 23.586L12.8813 19.2793L19.4413 18.7193L22.0013 12.666L24.5613 18.706L31.1213 19.266L26.148 23.5727L27.6413 29.9993Z" fill="white"></path>
							</svg>
							*/ ?>
						</section>
					<?php elseif( 's2' == $type ): ?>
						<section class="py-6 pt-md-4 pb-md-0 bg-gray _bg-an-off _bg-t-32">
							<div class="container a-up _g-md-0">
								<div class="d-grid _gg-0">
									<div>
										<div class="h-100p map-img-block ar-1-1 p-relative">
											<?php $image = get_sub_field( 'image_desktop' ) ?>
											<?php if( !empty( $image ) ): ?>
												<?php $bg_url = $image['sizes']['ci-1-d']; ?>
												<?php $bg_url_2x = $image['sizes']['ci-1-d-2x']; ?>
												<picture class="p-bg-str">
													<?php $image = get_sub_field( 'image_mobile' ) ?>
													<?php if( !empty( $image ) ): ?>
														<source src="<?php echo $image['sizes']['ci-1-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
													<?php endif; ?>
													<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
												</picture>
											<?php endif; ?>
										</div>
									</div>
									<div class="bg-brand py-4 px-2  text-white text-center a-c-inherit xy-center d-xs-block2">
										<div class="mw-450">
											<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'name', 't' => 'h2' ) ); ?>
											<p>
												<?php if( $phone = get_sub_field( 'phone' )): ?> 
													<br>
													<?php get_template_part_args( 'templates/content-modules-phone', array( 'v' => 'phone' ) ); ?>
												<?php endif; ?>
												<?php if( $email = get_sub_field( 'email' )): ?> 
													<br>
													<?php get_template_part_args( 'templates/content-modules-email', array( 'v' => 'email' ) ); ?>
												<?php endif; ?>
											</p>
											<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'text', 't' => 'p' ) ); ?>
										</div>
									</div>
								</div>
							</div>
						</section>
					<?php endif ?>
				<?php elseif( get_row_layout() == 'statistics' ): ?>
					<section class="pt-7 pb-4 pt-md-3 pb-md-5   text-center p-relative">
						<div class="container a-up z-1 p-relative">
							<ul class="donate-list">
								<?php if( get_sub_field( 'statistics' ) ): ?>
									<?php while( has_sub_field( 'statistics' ) ): ?>
										<li>
											<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'title', 't' => 'h6' ) ); ?>
											<h3 class="donate-num">
												<?php echo get_sub_field( 'before' ) ?><span class="counter"><?php echo get_sub_field( 'number' ) ?></span><?php echo get_sub_field( 'after' ) ?>
											</h3>
										</li>
									<?php endwhile; ?>
								<?php endif ?>
							</ul>
						</div>
					</section>
				<?php elseif( get_row_layout() == 'leadership' ): ?>
					<?php $type = get_sub_field( 'style' ); ?>
					<!-- leadership <?php echo $type ?> -->
					<?php if( 'image' == $type || 'image-4' == $type ): ?> 
						<section class="py-10 bg-blue bg-p-gray text-white text-center">
							<div class="container">
								<div class="mw-650 mx-a a-up  mb-9 mb-md-5">
									<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2' ) ); ?>
									<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'subheading', 't' => 'p' ) ); ?>
								</div>
								<?php if( get_sub_field( 'leadership' ) ): ?>
									<div class="grid _gap-5 _x-center">
										<?php while( has_sub_field( 'leadership' ) ): ?>
											<div class="<?php if ( 'image-4' == $type ){ echo 'col-3'; } else { echo 'col-4'; } ?> col-md-12 col-lg-6">
												<div class="img-not-a a-op">
													<div class="img-a-img _1-1">
														<?php $image = get_sub_field( 'image_desktop' ) ?>
														<?php if( !empty( $image ) ): ?>
															<?php $bg_url = $image['sizes']['team']; ?>
															<?php $bg_url_2x = $image['sizes']['team-2x']; ?>
															<picture>
																<?php $image = get_sub_field( 'image_mobile' ) ?>
																<?php if( !empty( $image ) ): ?>
																	<source src="<?php echo $image['sizes']['team']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
																<?php endif; ?>
																<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
															</picture>
														<?php endif; ?>
													</div>
												</div>
												<div class="leader-info">
													<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'name', 't' => 'h3' ) ); ?>
													<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'position', 't' => 'h6' ) ); ?>
												</div>
											</div>
										<?php endwhile; ?>
									</div>
								<?php endif ?>
							</div>
						</section>
					<?php elseif( 'text-1' == $type ): ?>
						<section class="py-10 text-center">
							<div class="container _s a-up">
								<div class="mw-650 mx-a mb-9">
									<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2' ) ); ?>
									<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'subheading', 't' => 'p' ) ); ?>
								</div>
								<div class="d-grid _gg-5">
									<?php if( get_sub_field( 'leadership' ) ): ?>
										<?php while( has_sub_field( 'leadership' ) ): ?>
											<div>
												<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'name', 't' => 'h3' ) ); ?>
												<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'position', 't' => 'h6' ) ); ?>
											</div>
										<?php endwhile; ?>
									<?php endif ?>
								</div>
							</div>
						</section>
					<?php elseif( 'text-2' == $type ): ?>
						<section class="pt-9 pb-15 bg-gray text-center">
							<div class="container _s a-up">
								<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2' ) ); ?>
								<ul class="column-block _col-3 name-list mt-6">
									<?php if( get_sub_field( 'leadership' ) ): ?>
										<?php while( has_sub_field( 'leadership' ) ): ?>
											<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'name', 't' => 'li' ) ); ?>
										<?php endwhile; ?>
									<?php endif ?>
								</ul>
							</div>
						</section>
					<?php endif ?>
				<?php elseif( get_row_layout() == 'careers' ): ?>
					<!-- careers -->
					<?php
				        $feed_items = false;
				        $career_opening_feed_url = get_field("career_opening_feed_url", "option");
				        if( $career_opening_feed_url ){
				            $limit = 0;
				            $feed_items = am_wcr_parse_feed($career_opening_feed_url, $limit);
				        }
				    ?>
				    <?php if( $feed_items ): ?>
				        <section class="mt-9 mb-13 mt-md-6 mb-md-5">
				            <div class="container a-up animated fadeInUp animation-end">
				                <h2 class="an-line-t-l">
					                Open Positions
					            </h2>
				                <div class="grid articles-card my-6">
				                    <?php $i = 1; ?>
				                    <?php foreach( $feed_items as $item){ ?>
				                        <?php
					                        if ($i === 4) {
					                            break;
					                        }
				                        ?>
				                        <article class="col-4 col-md-12">
				                            <div class="articles-card-info a-up animated fadeInUp animation-end">
				                                <h3><?php echo esc_html($item['title']); ?></h3>
				                                <p><?php echo wp_trim_words($item['content'], 30, null); ?></p>
				                                <p><a href="<?php echo esc_url($item['link']); ?>" class="link-underline">LEARN MORE</a></p>
				                            </div>
				                        </article>
				                        <?php $i++; ?>
				                    <?php } ?>
				                </div>
				                <?php get_template_part_args( 'templates/content-modules-cta-button', array( 'v' => 'cta_button', 'c' => 'btn', 'w' => 'p' ) ); ?>
				            </div>
				        </section>
				    <?php endif; ?>
				<?php elseif( get_row_layout() == 'attraction' ): ?>
					<!-- attraction -->
					<?php if( $location = get_sub_field( 'location' )): ?> 
						<?php echo do_shortcode('[area-attractions location="'. $location.'"]'); ?>
					<?php endif; ?>
				<?php elseif( get_row_layout() == 'paragraph' ): ?>
					<?php $type = get_sub_field( 'type' ); ?>
					<?php if( '' == $type ): ?> 
					<?php elseif( '' == $type ): ?>
					<?php else: ?>
					<?php endif ?>
				<?php elseif( get_row_layout() == 'download' ): ?>
					<?php  
						$style = '';
						$remove_margin_top = get_sub_field( 'remove_margin_top' );
						$remove_margin_bottom = get_sub_field( 'remove_margin_bottom' );
						if( $remove_margin_top ){
							$style .= 'padding-top:0px;';
						}
						if( $remove_margin_bottom ){
							$style .= 'padding-bottom:0px;';
						}
					?>
					<section class="section section-entry" style="<?php echo $style; ?>" >
				<?php endif; ?>
			<?php endwhile;?>
		<?php else: ?>
			<!-- // no layouts found -->
		<?php endif; ?>
	</main>

<?php get_footer(); ?>