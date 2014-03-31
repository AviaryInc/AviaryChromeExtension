'use strict';

chrome.contextMenus.create({
    title: 'Edit this photo with Aviary',
    contexts:['image'],
    onclick: function(data) {
        var windowSettings = {
            'url': '../index.html#'+encodeURIComponent(data.srcUrl),
            'width': 1200,
            'height': 900,
        };
        chrome.windows.create(windowSettings);
    }
});