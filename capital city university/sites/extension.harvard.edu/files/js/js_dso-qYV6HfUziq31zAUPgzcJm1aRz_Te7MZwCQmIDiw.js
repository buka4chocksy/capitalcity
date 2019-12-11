/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));
;
window.onload = function() {
	var url = window.location.href;

	function is_in_str(url, substr) {
		var str_index = url.indexOf(substr);
		return str_index != -1;
	}

	if (is_in_str(url, "youbelong-") || is_in_str(url, "graduate-certificates-degree-")) {
		var topics = ["alb", "biotech", "government", "it", "management", "museumstudies", "psychology", "sustainability"];

		if (is_in_str(url, "youbelong-")) {
			var topic = url.slice(url.indexOf("youbelong-")+10);
		}
		else {
			var topic = url.slice(url.indexOf("graduate-certificates-degree-")+29);
		}
		for (var i=0; i<topics.length; i++) {
			if (topic == topics[i]) {
				//Get the "Primary Program Interest" select element in RFI form"
				var select_interest = document.getElementById("tfa_1");

				if (topic == "alb") {
					//Enable and display the "Undergraduate Degree" select element in RFI for Chrome
					var $interest_div = $("#tfa_1254-D");
					if($interest_div.hasClass("offstate")) {
						$interest_div.removeClass("offstate");
						$("#tfa_1254").removeAttr("disabled");
					}
					//Set "Primary Program Interest" select element to "Undergraduate Degree Program"
					select_interest.value = "tfa_2";
					break;
				}
				else {
					//Set "Primary Program Interest" select element to "Graduate Degree Program"
					select_interest.value = "tfa_3";
					var $interest_div = $("#tfa_1273-D");

					//Enable and display the "Graduate Degree" select element in RFI for Chrome
					if($interest_div.hasClass("offstate")) {
						$interest_div.removeClass("offstate");
						$("#tfa_1273").removeAttr("disabled");
					}
					//Get the "Graduate Degree" select element in RFI form and set value
					var select_degree = document.getElementById("tfa_1273");
					switch (topic) {
						case "biotech":
							select_degree.value = "tfa_1278";
							break;
						case "government":
							select_degree.value = "tfa_1284";
							break;
						case "it":
							select_degree.value = "tfa_1286";
							break;
						case "management":
							select_degree.value = "tfa_1291";
							break;
						case "museumstudies":
							select_degree.value = "tfa_1293";
							break;
						case "psychology":
							select_degree.value = "tfa_1294";
							break;
						case "sustainability":
							select_degree.value = "tfa_1297";
							break;
					}
					break;
				}	
			}
		}
	}	
}
;
/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

	$(window).scroll(function() {
        var scrollTop = $(window).scrollTop();

        if(scrollTop <= 0){
            $('.header-container').addClass('top');
            $('header.header').addClass('top');
        }

        if(scrollTop > 50) {
            $('.header-container').removeClass('top');
            $('header.header').removeClass('top');
        }
    })

    $('.form-item-search-api-views-fulltext input').focus(function() {
        $('#edit-submit-promoted-search--2').css('pointer-events', 'auto');
    })

    $('.form-item-search-api-views-fulltext input').blur(function() {
        $('#edit-submit-promoted-search--2').css('pointer-events', 'none');
    })



})(jQuery, Drupal, this, this.document);;