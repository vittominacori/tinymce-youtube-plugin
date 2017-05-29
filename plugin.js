(function (tinymce) {
    'use strict';

    var YOUTUBE = {
        title: 'Insert YouTube video',
        icon: 'youtube.png',
        options: [
            {
                type: 'textbox',
                name: 'code',
                label: 'Only the video ID'
            },
            {
                type: 'listbox',
                name: 'size',
                label: 'Size',
                values: [
                    {text: '560 x 315', value: {width: 560, height: 315}},
                    {text: '1280 x 720', value: {width: 1280, height: 720}},
                    {text: '853 x 480', value: {width: 853, height: 480}},
                    {text: '640 x 360', value: {width: 640, height: 360}}
                ]
            },
            {
                type: 'checkbox',
                name: 'rel',
                checked: true,
                text: 'Show suggested videos'
            },
            {
                type: 'checkbox',
                name: 'controls',
                checked: true,
                text: 'Show player controls'
            },
            {
                type: 'checkbox',
                name: 'showinfo',
                checked: true,
                text: 'Show video title and player actions'
            }
        ],
        createEmbed: function (e) {

            var url = 'https://www.youtube.com/embed/' + e.data.code;
            var params = [];

            if (!e.data.rel) { params.rel = 0; }
            if (!e.data.controls) { params.controls = 0; }
            if (!e.data.showinfo) { params.showinfo = 0; }

            if (Object.keys(params).length > 0) {
                url += '?' + Object.keys(params).map(function (key) {
                        return key + '=' + params[key];
                    }).join('&');
            }

            return '<iframe ' +
                'width="' + e.data.size.width + '" ' +
                'height="' + e.data.size.height + '" ' +
                'src="' + url + '" ' +
                'style="max-width: 100%;" ' + 'frameborder="0" allowfullscreen>' +
                '</iframe>';
        }
    };

    tinymce.PluginManager.add('youtube', function (editor, url) {

        //Add a button that opens a window
        editor.addButton('youtube', {
            tooltip: YOUTUBE.title,
            image: url + '/icon/' + YOUTUBE.icon,
            onclick: function() {
                // Open window
                editor.windowManager.open({
                    title: YOUTUBE.title,
                    body: YOUTUBE.options,
                    onsubmit: function(e){
                        // Insert content when the window form is submitted
                        if (e.data.code) {
                            editor.insertContent(
                                YOUTUBE.createEmbed(e)
                            );
                        } else {
                            tinyMCE.activeEditor.windowManager.alert('Please fill the code field to use YouTube plugin.');
                        }
                    }
                });
            }
        });

        // Adds a menu item to the tools menu
        editor.addMenuItem('youtube', {
            text: YOUTUBE.title,
            icon: true,
            image: url + '/icon/' + YOUTUBE.icon,
            context: 'tools',
            onclick: function () {
                // Open window
                editor.windowManager.open({
                    title: YOUTUBE.title,
                    body: YOUTUBE.options,
                    onsubmit: function(e){
                        // Insert content when the window form is submitted
                        if (e.data.code) {
                            editor.insertContent(
                                YOUTUBE.createEmbed(e)
                            );
                        } else {
                            tinyMCE.activeEditor.windowManager.alert('Please fill the code field to use YouTube plugin.');
                        }
                    }
                });
            }
        });
    });
})(window.tinymce);