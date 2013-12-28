/**
 * Gallery 3 JS Client
 * (c) Ferimer, servicios informaticos, 2013 - All rights reserved
 * License: GNU Affero V3 (see LICENSE file)
 * Fernando Rodríguez Sela <fernando@ferimer.es>
 */

function g3client(url, apikey) {
  this.gallerydata = {
    g3url: url,
    g3apikey: apikey
  };
  this.onalbum = function() {};
  this.onphoto = function() {};
  this.onmovie = function() {};

  function _g3send(method, url, gobj, onresource, isImage) {
    var req = new XMLHttpRequest();

    function reqG3Listener () {
      if (onresource && typeof(onresource) == 'function') {
        return onresource(req.response);
      }
      if (!req.response.entity || !req.response.entity.type) {
        return;
      }

      switch(req.response.entity.type) {
      case 'album':
        gobj.onalbum(req.response);
        break;
      case 'photo':
        gobj.onphoto(req.response);
        break;
      case 'movie':
        gobj.onmovie(req.response);
        break;
      default:
        console.log('Not recognized');
      }
    };

    req.onload = reqG3Listener;
    req.open(method, url, true);
    req.setRequestHeader('X-Gallery-Request-Key', gobj.gallerydata.g3apikey);
    req.setRequestHeader('X-Gallery-Request-Method', method);
    if (!onresource || !isImage) {
      req.responseType = 'json';
    } else {
      req.responseType = 'blob';
    }
    req.send();
  }

  this.g3GET = function g3getGET(url) {
    _g3send("get", url, this);
  }

  this.g3RESOURCE = function g3getRESOURCE(url, callback, isImage) {
    _g3send("get", url, this, callback, isImage);
  }
}

g3client.prototype = {
  getItem: function getItem(itemIdOrURL = 1) {
    if (isNaN(itemIdOrURL)) {
      this.g3GET(itemIdOrURL);
    }
    this.g3GET(this.gallerydata.g3url + '/rest/item/' + itemIdOrURL);
  },

  getResource: function getResource(url, callback, isImage = true) {
    this.g3RESOURCE(url, callback, isImage);
  }
};

