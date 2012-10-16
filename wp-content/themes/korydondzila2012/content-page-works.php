<?php 
    $args = array(
        'post_type' => 'attachment', 
        'posts_per_page' => -1,
        'post_parent' => get_the_ID(),
    );
    $attachments = get_posts($args);
    if ($attachments): ?>
    <ul class="works-list">
        <?php foreach ( $attachments as $attachment ): 
            $title = apply_filters( 'the_title' , $attachment->post_title ); ?>
            <li>
                <h2><?php echo wp_get_attachment_link( $attachment->ID , 'thumbnail', false, false, false ); ?></h2>
                <p><?php echo $attachment->post_content; ?></p>
            </li>
        <?php endforeach; ?>
    </ul>
    <?php endif; ?>