# TinyMCE YouTube plugin
Add YouTube video to your TinyMCE content

## Installation

* `cd /your-tinymce-path/plugins`
* `git clone https://github.com/vittominacori/tinymce-youtube-plugin.git`
* `mv tinymce-youtube-plugin youtube`

## Configuration

```
<script>
    tinymce.init({
        selector: 'textarea',
        height: 500,
        plugins: [ 'youtube' ],
        toolbar: 'youtube'
    });
</script>
```