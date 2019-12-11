(function(){
  function sortDrupalBehaviors() {
    var weights = {};
    for (var k in Drupal.behaviors) {
      var v = Drupal.behaviors[k];
      var pieces = k.split('.');
      if (pieces.length == 2 && pieces[1] === 'weight') {
        // This v is not a behavior, but a weight setting for another behavior.
        weights[pieces[0]] = v;
        delete Drupal.behaviors[k];
      }
      else if (typeof weights[k] != 'number') {
        // This v is a behavior object, but it might contain a weight setting.
        if (typeof v == 'object' && v && typeof v.weight == 'number') {
          weights[k] = v.weight;
        }
        else if (weights[k] == undefined) {
          weights[k] = false;
        }
      }
    }

    var ww = [0];
    var by_weight = {0: {}};
    for (var k in weights) {
      if (Drupal.behaviors[k] == undefined) {
        continue;
      }
      var w = weights[k];
      w = (typeof w == 'number') ? w : 0;
      if (by_weight[w] == undefined) {
        by_weight[w] = {};
        ww.push(w);
      }
      by_weight[w][k] = Drupal.behaviors[k];
    }
    ww.sort(function(a,b){return a - b;});

    // Other scripts that want to mess with behaviors, will only see those with weight = 0.
    Drupal.behaviors = by_weight[0];

    var sorted = [];
    for (var i = 0; i < ww.length; ++i) {
      var w = ww[i];
      sorted.push(by_weight[w]);
    }
    return sorted;
  }

  var attachBehaviors_original = Drupal.attachBehaviors;

  Drupal.attachBehaviors = function(context, settings) {
    var sorted = sortDrupalBehaviors();
    Drupal.attachBehaviors = function(context, settings) {
      context = context || document;
      settings = settings || Drupal.settings;
      // Execute all of them.
      for (var i = 0; i < sorted.length; ++i) {
        jQuery.each(sorted[i], function() {
          if (typeof this.attach == 'function') {
            this.attach(context, settings);
          }
        });
      }
    }
    Drupal.attachBehaviors.apply(this, [context, settings]);
  };

})();

;
/**
 * @file
 * File: scald_file.js.
 */

(function ($) {
  Drupal.behaviors.scaldFile = {
    attach: function (context, settings) {
      $('body').once('scald-file', function() {
        if (typeof CKEDITOR !== 'undefined') {
          CKEDITOR.on('instanceReady', function(ev) {
            CKEDITOR.instances[ev.editor.name].document.appendStyleSheet(Drupal.settings.basePath + settings.scaldFile.path);
          });
        }
      });
    }
  };
})(jQuery);
;
(function ($) {
  Drupal.behaviors.scaldImage = {
    attach: function (context, settings) {
      if (typeof Drupal.dndck4 !== 'undefined') {
        Drupal.dndck4.addOption('txtLink', 'image', 'atom', 'scald_image', function (infoTab, dialogDefinition) {
          infoTab.add({
            id: 'txtLink',
            type: 'text',
            label: Drupal.t('Link'),
            // "Link" edits the 'link' property in the options JSON string.
            setup: function (widget) {
              var options = JSON.parse(widget.data.options);
              if (options.link) {
                this.setValue(decodeURIComponent(options.link));
              }
            },
            commit: function (widget) {
              // Copy the current options into a new object,
              var options = JSON.parse(widget.data.options);
              var value = this.getValue();
              if (value != '') {
                options.link = encodeURIComponent(value);
              }
              else {
                delete options.link;
              }
              widget.setData('options', JSON.stringify(options));
            }
          });
        });
        Drupal.dndck4.addOption('cmbLinkTarget', 'image', 'atom', 'scald_image', function (infoTab, dialogDefinition) {
          infoTab.add({
            id: 'cmbLinkTarget',
            type: 'select',
            label: Drupal.t('Link Target'),
            items: [[Drupal.t('None'), '_self'], [Drupal.t('Blank'), '_blank'], [Drupal.t('Parent'), '_parent']],
            // "Link Target" edits the 'linkTarget' property in the options JSON string.
            setup: function (widget) {
              var options = JSON.parse(widget.data.options);
              if (options.linkTarget) {
                this.setValue(options.linkTarget);
              }
            },
            commit: function (widget) {
              // Copy the current options into a new object,
              var options = JSON.parse(widget.data.options);
              var value = this.getValue();
              if (value != '') {
                options.linkTarget = value;
              }
              else {
                delete options.linkTarget;
              }
              widget.setData('options', JSON.stringify(options));
            }
          });
        });
      }
    }
  };
})(jQuery);
;
