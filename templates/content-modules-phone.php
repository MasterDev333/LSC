<?php extract( $template_args ) ?>
<?php //var_dump( $template_args ) ?>
<?php $val = isset( $v ) && !empty( $v ) ? $v : 'phone'; ?>
<?php $option = isset( $o ) && !empty( $o ) ? $o : false; ?>
<?php $tag = isset( $t ) && !empty( $t ) ? $t : false; ?>
<?php 
	if( 'o' == $option ){
		$phone = get_field( $val, 'option' );
	} 
	elseif( 'f' == $option ){
		$phone = get_field( $val );
	}
	else{
		$phone = get_sub_field( $val );
	}
?>
<?php if( $phone ): ?> 
	<?php if( $tag ): ?>
		<<?php echo $tag; ?>>
	<?php endif ?>

	<a href="tel:<?php echo str_replace(array( '-', ' ', '(', ')' ), '', $phone ); ?>">
		<?php echo $phone; ?>
	</a>

	<?php if( $tag ): ?>
		</<?php echo $tag; ?>>
	<?php endif ?>
<?php endif; ?>