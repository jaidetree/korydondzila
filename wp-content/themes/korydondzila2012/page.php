<?php while ( have_posts() ) : the_post(); ?>

    <div <?php post_class(); ?>>
        <h1><?php the_title(); ?></h1>
        <?php the_content(); ?>
        <?php get_template_part( 'content-page', $post->post_name ); ?>
    </div>

<?php endwhile; // end of the loop. ?>