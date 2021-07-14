<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
	<meta name="format-detection" content="telephone=no">
	<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php endif; ?>
	<link rel="shortcut icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/favicon.png">
	<?php wp_head(); ?>
</head>
<?php $theme_color = get_field( 'page_color' ); ?>
<?php if ( is_search( ) ){
	$theme_color = 'orange';
} ?>
<body <?php body_class(); ?> data-theme="<?php echo $theme_color; ?>" >
	<!-- after opening body script -->
	<?php if( $after_opening_body = get_field( 'after_opening_body', 'option' )): ?> 
		<?php echo $after_opening_body; ?>
	<?php endif; ?>
	<!-- END: after opening body script -->
	<div class="wrapper">
		<?php $landing_page = get_field( 'is_landing_page' ); ?>
		<?php if ($landing_page != '1' || is_search()) : ?>
			<header class="header">
				<div class="header-menu-wrapper">
					<div class="container _xl">
						<div class="btn-mob-search-open">
							<a href="#" class="btn-search-open"><i class="icon-search"></i></a>
						</div>
						<?php  
							$header_logo = get_field('header_logo', 'option');

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
						<div class="logo">
							<a href="<?php echo site_url(); ?>">
								<?php if($header_logo) : ?>
									<img src="<?php echo $header_logo['url']; ?>" alt="<?php echo $header_logo['alt']; ?>">
								<?php else: ?>
									<img src="<?php echo get_template_directory_uri(); ?>/images/logo-black.svg" alt="logo">
								<?php endif; ?>
							</a>
						</div>
						<div class="nav-main">
							<ul class="nav-top">
								<li><a href="javascript:;" class="btn-search-open">SEARCH</a></li>
								<?php echo top_header_custom_menu('top_header_menu'); ?>
							</ul>
							<div class="nav-drop">
								<nav class="nav">
									<ul class="header-menu">
										<?php //echo custom_header_menu('mainmenu'); ?>
										<?php
											$args = array(
												'theme_location'    => 'mainmenu',
												'container'         => false,
												'container_class'   => false,
												'items_wrap'        => '%3$s',
												'menu_class'        => '',
									            'walker'         => new Add_Class_To_Link_Walker()
											);
											wp_nav_menu($args);
										?>
									</ul>
								</nav>
								<?php // desktop phone number ?>
								<?php if( $phone_number && wp_is_mobile() ): ?>
									<div class="nav-drop-btn">
										<a class="btn btn-outline-h-blue _xs" href="tel:<?php echo $phone_number; ?>">
											Call Now
										</a>
									</div>
								<?php else : ?>
									<div class="nav-drop-btn">
										<a class="btn btn-outline-h-blue _xs" href="<?php bloginfo('url'); ?>/contact-us">
											Call Now
										</a>
									</div>
								<?php endif; ?>
							</div>
						</div>
						<!-- <button class="nav-opener"><span></span></button> -->

						<!-- <a href="#menu" class="mob-menu-btn"><span></span></a> -->
						<a id="mobile-menu-btn"><span></span></a>
					</div>


					<div class="mobile-menu-container">
						<div class="mobile-menu-content">
							<div class="top-mob-menu-panel">
								<a href="#" id="search-mob-menu-btn"></a>
								<a href="#" id="cancel-search-mob-menu-btn"></a>
								<a href="#" id="close-mob-menu-btn"></a>
								<!-- <button id="close-mob-menu-btn" class="btn-clear"></button> -->
							</div>

							<div class="main-mob-menu-panel">
								<a href="" id="sub-menu-back-btn"></a>

								<form class="mobile-search-form" action="<?php echo site_url('/'); ?>" method="GET">
									<input name="s" type="text" placeholder="Type to Search..." value="<?php echo get_search_query(); ?>">
									<input type="submit" id="" value="">
								</form>

								<nav class="mobile-menu-nav">
									<ul id="mobile-menu" class="mobile-menu">
										<?php echo custom_header_mobile_menu('mainmenu'); ?>
									</ul>
								</nav>

								<nav class="mobile-add-menu-nav">
									<ul class="mobile-add-menu">
										<?php echo top_header_custom_menu('top_header_menu'); ?>
									</ul>
								</nav>

							</div>
						</div>
					</div>
				</div>
				<div class="header-search-wrapper">
					<div class="container _xl">
						<form class="header-search-block" action="<?php echo site_url('/'); ?>" method="GET">
							<input name="s" type="text" placeholder="Type to Search..." value="<?php echo get_search_query(); ?>">
							<button type="submit" class="hidden"></button>
							<button class="btn-search-close"></button>
						</form>
					</div>
				</div>
				<?php // mobile phone number ?>
				<?php if( $phone_number ): ?>
					<div class="header-cta-mob">
						<a class="header-cta-btn" href="tel:<?php echo $phone_number; ?>">
							Call Now
						</a>
					</div>
				<?php endif; ?>
			</header>
		<?php endif; ?>