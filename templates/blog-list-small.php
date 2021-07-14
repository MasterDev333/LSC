<div class="col-4 col-md-12">
	<div class="img-a">
		<div class="img-a-img _8-5">
			<?php $image = get_field( 'image_desktop' ) ?>
			<?php if( !empty( $image ) ): ?>
				<?php $bg_url = $image['sizes']['blog-d']; ?>
				<?php $bg_url_2x = $image['sizes']['blog-d-2x']; ?>
				<a href="<?php echo get_permalink() ?>">
					<picture>
						<?php $image = get_field( 'image_mobile' ) ?>
						<?php if( !empty( $image ) ): ?>
							<source src="<?php echo $image['sizes']['header-hp-m']; ?>" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title']; ?>"  media="(max-width: 414px)">
						<?php endif; ?>
						<img src="<?php echo $bg_url; ?>" srcset="<?php echo $bg_url_2x; ?> 2x" alt="<?php echo $image['alt']; ?>" title="<?php echo $image['title'] ?>">
					</picture>
				</a>
			<?php endif; ?>
		</div>

		<div class="img-a-decor" style="transform: translate(100%, 0%) translate(0%, 0px); opacity: 0;">
		</div>

	</div>
	<h3>
		<a href="<?php echo get_permalink() ?>">
			<?php the_title() ?>
		</a>
	</h3>
</div>