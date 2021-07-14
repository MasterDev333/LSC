<?php
/*
Template Name: Full Width
Template Post Type: page, post
*/

get_header(); ?>
	<section class="mt-12 mb-12 my-md-8">
		<div class="container a-up">
			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
				<?php get_template_part( 'templates/content', 'page' ); ?>
			<?php endwhile; endif; ?>
		</div>
	</section>
<?php get_footer(); ?>