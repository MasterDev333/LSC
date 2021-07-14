<?php get_header(); ?>
	<main class="main">
	    <section class="py-8 pt-md-4 pb-md-6">
	        <div class="container a-up mb-l-0 animated fadeInUp full-visible animation-end">
	            <?php if ( have_posts() ) { ?>
	                <h1 class="an-line-b-c text-center">Search</h1>
	            <?php } else { ?>
	                <h1 class="an-line-b-c text-center">No Results Found</h1>
	            <?php } ?>
	        </div>
	    </section>

	    <section class="pt-10 pb-7 pt-md-2 pb-md-0 bg-gray">
			<div class="container _lg">
				<div class="form-search alt">
					<form action="<?php bloginfo('url'); ?>/" method="get">
						<input type="text" name="s" placeholder="Search" value="<?php echo $search_string; ?>" />
						<input type="submit" value="Search" />
					</form>
				</div>
			</div>
		</section>
	</main>
<?php get_footer(); ?>