<?php extract( $template_args ) ?>
<?php //var_dump( $template_args ) ?>
<?php $val = isset( $v ) && !empty( $v ) ? $v : 'email'; ?>
<?php $option = isset( $o ) && !empty( $o ) ? $o : false; ?>
<?php $tag = isset( $t ) && !empty( $t ) ? $t : false; ?>
<?php $class = isset( $c )  && !empty( $c ) ? $c : ''; ?>

<?php 
	if( 'o' == $option ){
		$email = get_field( $val, 'option' );
	} 
	elseif( 'f' == $option ){
		$email = get_field( $val );
	}
	else{
		$email = get_sub_field( $val );
	}
?>
<?php if( $email ): ?> 
	<?php if( $tag ): ?>
		<<?php echo $tag; ?>>
	<?php endif ?>

	<a href="mailto:<?php echo $email; ?>" class="<?php echo $class; ?>">
		<?php echo $email; ?>
	</a>

	<?php if( $tag ): ?>
		</<?php echo $tag; ?>>
	<?php endif ?>
<?php endif; ?>