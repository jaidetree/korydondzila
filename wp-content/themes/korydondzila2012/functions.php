<?php

/**
 * Defines the functions of the themes.
 */
function get_page_by_slug($slug) {
    return get_page_by_path( '/' . $slug);
}

/**
 * Quickly allows us to add a thumbnail to a page post type.
 * So we can attach Kory's photo to the page.
 */
add_theme_support( 'post-thumbnails', array( 'post', 'page', 'kory_work' ) );

add_filter('upload_mimes', 'kory_upload_mimes');

function kory_upload_mimes ( $existing_mimes=array() ) {

    // add your extension to the array
    $existing_mimes['mel'] = 'text/mel';

    // add as many as you like
    // and return the new full result
    return $existing_mimes;

}

?>