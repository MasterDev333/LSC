<?php extract( $template_args ) ?>
<?php //var_dump( $template_args ) ?>
<?php $val = isset( $v ) && !empty( $v ) ? $v : 'content'; ?>
<?php $option = isset( $o ) && !empty( $o ) ? $o : false; ?>
<?php 
	if( 'o' == $option ){
		$shortcode = get_field( $val, 'option' );
	} 
	elseif( 'f' == $option ){
		$shortcode = get_field( $val );
	}
	else{
		$shortcode = get_sub_field( $val );
	}
?>
<?php if( $shortcode ): ?> 
	<?php echo do_shortcode( $shortcode ); ?>
<?php endif; ?>