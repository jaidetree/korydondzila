<?php get_header(); ?>
<div id="wrapper">
    <div class="container">
        <div class="main">
            <section class="content">
            </section>
        </div><!-- .main -->
        <div class="ui">
            <div class="contact-info">
                <section class="contact">
                    <div class="box">
                        <div class="face front">
                        </div>
                        <div class="face back">
                            <?php $page = get_page_by_slug('about-box'); ?>
                            <?php echo get_the_post_thumbnail( $page->ID, 'full', array( 'class' => 'profile' ) ); ?>
                            <?php echo $page->post_content; ?>
                        </div><!-- .back -->
                    </div><!-- .box -->
                </section>
            </div><!-- .contact-info -->
            <nav>
                <ul class="ui-nav">
                    <li class="works">
                        <div class="box">
                            <div class="inside">
                                <div class="face front">
                                </div>
                                <div class="face back">
                                    <a href="#!/works">works</a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="reel">
                        <div class="box">
                            <div class="inside">
                                <div class="face front">
                                </div>
                                <div class="face back">
                                    <a href="#!/reel">reel</a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="about">
                        <div class="box">
                            <div class="inside">
                                <div class="face front">
                                </div>
                                <div class="face back">
                                    <a href="#!/about">about</a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </div><!-- .ui -->
    </div><!-- .container -->
</div><!-- #wrapper -->
<?php get_footer(); ?>