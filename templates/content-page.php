<div <?php post_class('post') ?> id="post-<?php the_ID(); ?>">
	<div class="text-center">
		<h1 class="an-line-b-c">
			<?php the_title() ?>
		</h1>
	</div>
	<div class="entry">
		<?php the_content(__('Read more', 'am')); ?>
		<div class="clear clearfix"></div>
		<?php wp_link_pages( array( 'before' => '<div class="page-link"><p><span>' . __( 'Pages:', 'am' ) . '</span>', 'after' => '</p></div>' ) ); ?>
		<?php edit_post_link(__('Edit', 'am'), '<br /><p>', '</p>'); ?>
	</div><!-- /entry -->
	
</div><!-- /post -->