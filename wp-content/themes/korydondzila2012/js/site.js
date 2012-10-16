(function($){
    $(document).ready(function(){
        /**
         * Not my best JavaScript, I'm well aware...
         * It's just one of those projects ok?!
         */
        var hash = window.location.hash;
        var pages = [ 'reel', 'about', 'works', 'home'];
        var page;
        var fadeInOrder = [ '.contact-info', '.ui-nav li:eq(0)', '.ui-nav li:eq(2)', '.ui-nav li:eq(1)' ];
        var pages = {};

        $(fadeInOrder.join()).css('opacity', 0);

        for ( var i in fadeInOrder ) {
            var $el = $(fadeInOrder[i]);

            $el.delay(i * 800).animate({ 'opacity': 1.0 }, 'slow');
        }

        if ( ! hash ) {
            hash = "home";
            page = hash;
        } else {
            page = "home";
        }

        hash = hash.replace('#!/', '');

        $.get('/' + hash, function(data, textStatus, jqXHR){ 
            $('.content').html(data);
            //$(obj).text(hash).attr('href', '#!/' + hash);
            $('.ui').find('a[href$="' + hash + '"]').attr('href', '#!/' + page).text(page);
        });

        var original_labels = { 
            works: { 
                selector: '.ui-nav li:eq(0)',
                label: 'works',
                href: '#!/works'
            }, 
            about: { 
                selector: '.ui-nav li:eq(2)',
                label: 'about',
                href: '#!/about'
            },
            reel: {
                selector: '.ui-nav li:eq(1)',
                label: 'reel',
                href: '#!/reel'
            }
        };

        $(window).on('hashchange', function(){ 
            var hash = window.location.hash;
            hash = hash.replace('#!/', '');

            if ( ! hash ) {
                hash = "home";
            }


            if ( pages[hash] ){
                $('.content').html(pages[hash]);
            } else {
                $.get('/' + hash, function(data, textStatus, jqXHR){ 
                    pages[hash] = data;
                    $('.content').html(data);
                });
            }

            update_ui(hash);

        });

        function update_ui(new_label){
            for ( var i in original_labels ) {
                var link = original_labels[i];
                $(link.selector).find('a').text(link.label).attr('href', link.href);
                if ( new_label == i && new_label != "home" ) { 
                    $(link.selector).find('a').text('home').attr('href', '#!/home');
                }
            }
        }

        $('html').on('click', 'body.home .main a.reel', function(){ 
            $('.ui ul .reel').click();
        });
    });
})(jQuery);
