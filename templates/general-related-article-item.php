<article class="col-4 col-md-12">
	<div class="articles-card-img img-a">
		<div class="img-a-img _4-2">
			<?php $image = get_field( 'image_desktop' ) ?>
			<?php if( !empty( $image ) ): ?>
				<?php $bg_url = $image['sizes']['blog-single-t']; ?>
				<?php $bg_url_2x = $image['sizes']['blog-single-t']; ?>
				<a href="<?php echo get_permalink() ?>">
					<picture>
						<?php $image = get_field( 'image_mobile' ) ?>
						<?php if( !empty( $image ) ): ?>
							<source src="<?php echo $image['sizes']['blog-single-t']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
						<?php endif; ?>
						<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
					</picture>
				</a>
			<?php endif; ?>
		</div>
	</div>
	<div class="articles-card-info a-up">
		<h3>
			<a href="<?php echo get_permalink() ?>">
				<?php the_title() ?>
			</a>
		</h3>
	</div>
</article>