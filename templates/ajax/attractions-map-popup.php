<?php
global $post;
$post_id = $postData['attraction_id'];
$post = get_post($post_id);
setup_postdata($post);

$city = get_field('city');
$state = get_field('state');
$zip_code = get_field('zip_code');
$street_address = get_field('address');
$full_address = $street_address;
if ($city !== ''):
    $full_address = $full_address . ' ' . $city;
endif;
if ($state !== ''):
    $full_address = $full_address . ' ' . $state;
endif;
if ($zip_code !== ''):
    $full_address = $full_address . ' ' . $zip_code;
endif;
$map_url = "https://maps.google.com?daddr=" . urlencode($full_address);
if (((bool) strpos($_SERVER['HTTP_USER_AGENT'], 'iPad')) || ((bool) strpos($_SERVER['HTTP_USER_AGENT'], 'iPhone'))):
    $map_url = "http://maps.apple.com?daddr=" . urlencode($full_address);
endif;
?>
<div class="attraction-info">
    <h2><a href="<?php the_permalink(); ?>" target="_blank"><?php the_title(); ?></a></h2>
    <?php $the_content = get_the_content(); ?>
    <p><?php echo wp_trim_words($the_content, 10, '...'); ?></p>
    <?php if ($street_address !== '') : ?>
        <div class="check_street_address_meta">
            <?php echo $street_address; ?><br/><?php echo $city; ?>, <?php echo $state; ?> <?php echo $zip_code; ?>
        </div>
    <?php endif; ?>
    <?php if (($phone_number = get_field('phone_number')) !== '') : ?>
        <div class="check_attraction_phone_meta">
            <?php echo $phone_number; ?>
        </div>
    <?php endif; ?>
</div>
<a href="<?php echo $map_url; ?>" class="item-link" target="_blank">Get Directions</a>
<?php if (!empty($parent_types)) : ?>
    <a href="#" class="item-link btnClose btnBackPopup">Back</a>
<?php endif; ?>
<a href="#" class="item-link btnClosePopup">Close</a>
<?php wp_reset_postdata(); ?>