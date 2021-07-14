<?php
/*
  Template Name: Attractions
 */

get_header();
?>

<main class="main">

    <!-- section map-are start -->
    <?php echo do_shortcode('[area-attractions location="willow-bend"]'); ?>
    <?php echo do_shortcode('[area-attractions location="at-home"]'); ?>
    <?php echo do_shortcode('[area-attractions location="midtown-park"]'); ?>
    <!-- section map-are end -->
    <?php
        $feed_items = false;
        $career_opening_feed_url = get_field("career_opening_feed_url", "option");
        if ($career_opening_feed_url) {
            $limit = 0;
            $feed_items = am_wcr_parse_feed($career_opening_feed_url, $limit);
        }
    ?>
    <?php if ($feed_items) { ?>
        <section class="mt-9 mb-13 mt-md-6 mb-md-5">
            <div class="container a-up animated fadeInUp animation-end">
                <h2 class="an-line-t-l">Open Positions</h2>
                <div class="grid articles-card my-6">
                    <?php $i = 1; ?>
                    <?php foreach ($feed_items as $item) { ?>
                        <?php
                        if ($i === 4) {
                            break;
                        }
                        ?>
                        <article class="col-4 col-md-12">
                            <div class="articles-card-info a-up animated fadeInUp animation-end">
                                <h3><?php echo esc_html($item->get_title()); ?></h3>
                                <p><?php echo wp_trim_words($feed_items[0]->get_content(), 30, null); ?></p>
                                <p><a href="<?php echo esc_url($item->get_link()); ?>" class="link-underline">LEARN MORE</a></p>
                            </div>
                        </article>
                        <?php $i++; ?>
                    <?php } ?>
                </div>
                <p><a href="#" class="btn">SEE ALL OPEN POSITIONS</a></p>
            </div>
        </section>
    <?php } ?>

</main>

<?php get_footer(); ?>