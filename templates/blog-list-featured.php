<?php global $post; ?>
<div class="grid _y-center blog-grid my-8">
	<div class="col-6 col-md-12">
		<div class="img-a">
			<div class="img-a-img _8-5">
				<?php $image = get_field( 'image_desktop' ) ?>
				<?php if( !empty( $image ) ): ?>
					<?php $bg_url = $image['sizes']['gallery-d']; ?>
					<?php $bg_url_2x = $image['sizes']['gallery-d-2x']; ?>
					<a href="<?php echo get_permalink() ?>">
						<picture>
							<?php $image = get_field( 'image_mobile' ) ?>
							<?php if( !empty( $image ) ): ?>
								<source src="<?php echo $image['sizes']['gallery-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
							<?php endif; ?>
							<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
						</picture>
					</a>
				<?php endif; ?>
			</div>
			<div class="img-a-decor" style="transform: translate(100%, 0%) translate(0%, 0px); opacity: 0;">
			</div>
		</div>
	</div>
	<div class="col-6 col-md-12">
		<div class="pl-4 pl-lg-0 mb-l-0 text-md-center">
			<h2>
				<?php the_title() ?>
			</h2>
			<p>
				<?php echo wp_trim_words( wp_strip_all_tags( apply_filters( 'the_content', $post->post_content ) ), 20 ) ?>
			</p>
			<p>
				<a href="<?php echo get_permalink() ?>" class="btn">
					Read MORE
				</a>
			</p>
		</div>
	</div>
</div>