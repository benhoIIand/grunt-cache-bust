'use strict';

var grunt = require('grunt');

module.exports = {

    videos: function(test) {
        test.expect(5);

        var markup = grunt.file.read('tmp/videos/videos.html');

        test.ok(markup.match(/empty-video\.[a-z0-9]{16}\.mp4/), 'testing mp4 video in video>source tag');
        test.ok(markup.match(/empty-video\.[a-z0-9]{16}\.ogg/), 'testing ogg video in video>source tag');
        test.ok(markup.match(/empty-video\.[a-z0-9]{16}\.webm/), 'testing webm video in video>source tag');
        test.ok(markup.match(/empty-video.webm/), 'testing webm video in video>source tag without type does not get replaced');
        test.ok(markup.match(/empty-video-stand-alone\.[a-z0-9]{16}\.mp4/), 'testing src attribute in video tag');

        test.done();
    }

};
