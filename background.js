'use strict';

let config = {
    is_block: false
};

initialize();

/**
 * Get current status and set browser icon.
 */
function initialize() {
    browser.storage.local.get().then((conf) => {
        config = conf;
        toggleCacheListener();
        reloadIcon();
    });
}

/**
 * On Click, toggle Cache Enable/Disable.
 */
browser.browserAction.onClicked.addListener(() => {
    config.is_block = !config.is_block;
    browser.storage.local.set(config);
    toggleCacheListener();
    reloadIcon();
});

/**
 * EventListener toggle
 */
function toggleCacheListener() {
    if (!config.is_block) {
        browser.browserSettings.cacheEnabled.set({value: true});
    }
    else {
        browser.browserSettings.cacheEnabled.set({value: false});
    }
}

/**
 * Reload toolbar icon.
 */
function reloadIcon() {
    if (config.is_block) {
        browser.browserAction.setIcon({path: 'icons/icon_blocked.svg'});
    }
    else {
        browser.browserAction.setIcon({path: 'icons/icon.svg'});
    }
}