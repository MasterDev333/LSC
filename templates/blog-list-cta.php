<?php  
	global $post;

	$option = get_field( 'override_global_cta_boxes' ) ? $post->ID : 'option'; 

	if( 'news' == $post->post_type ){	
		$sub_field = 'news_cta_boxes';
	}
	elseif( 'guide' == $post->post_type ){
		$sub_field = 'guide_cta_boxes';
	}
	else{
		$sub_field = 'cta_boxes';
	}
?>
<?php if( get_field( $sub_field, $option ) ): ?>
	<section class="py-8 py-md-5 bg-gray ov-h text-md-center">
		<div class="container a-up">
			<div class="grid _gap-132">
				<?php while( has_sub_field( $sub_field,  $option ) ): ?>
					<div class="col-6 col-md-12">
						<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'heading', 't' => 'h2' ) ); ?>
						<?php get_template_part_args( 'templates/content-modules-text', array( 'v' => 'text', 't' => 'p' ) ); ?>
						<?php get_template_part_args( 'templates/content-modules-cta-button', array( 'v' => 'cta_button', 'c' => 'btn', 'w' => 'p' ) ); ?>
					</div>
				<?php endwhile; ?>
			</div>
		</div>
	</section>
<?php endif ?>