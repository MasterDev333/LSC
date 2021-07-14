<?php get_header(); ?>
	<section class="mt-12 mb-12 my-md-8">
		<div class="container a-up">
			<div class="mw-700 mx-a">
				<div class="text-center">
					<h1 class="an-line-b-c">
						<?php the_title() ?>
					</h1>
				</div>
				<div class="entry py-4">
					<?php echo apply_filters( 'the_content', $post->post_content ) ?>
				</div>
			</div>
		</div>
	</section>
<?php get_footer(); ?>
