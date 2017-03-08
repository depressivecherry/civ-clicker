/**
	CivClicker
	Copyright (C) 2016; see the README.md file for authorship.

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program in the LICENSE file.
	If it is not there, see <http://www.gnu.org/licenses/>.
**/

(function(){

	var ui = {

		find: function (selector) {
			if (typeof selector === 'string') {
				return document.querySelectorAll(selector)[0];
			} else if (typeof selector === 'object') {
				return selector;
			} else {
				return undefined;
			}
		},
		isHidden: function (selector) {
			// NOTE: This does not work for fixed-position elements
			var elt = ui.find(selector);
			return (elt.offsetParent === null);
		},
		toggle: function (selector) {
			var elt = ui.find(selector);
			if (ui.isHidden(elt)) {
				elt.style.display = "block";
				return true;
			} else {
				elt.style.display = "none";
				return false;
			}
		},

		// Moved from jsutils.js, setElemDisplay function, and refactored ...
		// Wrapper to set an HTML element's visibility.
		// Pass the element object or ID as the 1st param.
		// Pass true as the 2nd param to be visible, false to be hidden, no value to
		// toggle.
		// Compensates for IE's lack of support for the "initial" property value.
		// May not support all HTML elements.
		// Returns the input visibility state, or undefined on an error.
		show: function (selector, visible) {

			var elt = ui.find(selector);
			var displayVal;
			var tagName;

			if (!elt) {
				return undefined;
			}

			// If the visibility is unspecified, toggle it.
			if (visible === undefined) { 
				visible = (elt.style.display == "none"); 
			}

			tagName = elt.tagName.toUpperCase();

			/* xxx This is disabled because browser support for visibility: collapse is too inconsistent.
				// If it's a <col> element, use visibility: collapse instead.
				if (tagName == "COL") {
					elt.style.visibility = visible ? "inherit" : "collapse"; 
					return;
				}
			*/

			if (visible) {
				displayVal = "initial";
				// Note that HTML comes in upper case, XML in lower.
				switch (tagName) {
					case "SPAN": displayVal = "inline"; break;
					case "DIV": displayVal = "block"; break;
					case "P": displayVal = "block"; break;
					case "TABLE": displayVal = "table"; break;
					case "CAPTION": displayVal = "table-caption"; break;
					case "THEAD": displayVal = "table-header-group"; break;
					case "TBODY": displayVal = "table-row-group"; break;
					case "TFOOT": displayVal = "table-footer-group"; break;
					case "TR": displayVal = "table-row"; break;
					case "COL": displayVal = "table-column"; break;
					case "TD": displayVal = "table-cell"; break;
					case "LI": displayVal = "list-item"; break;
					default: console.warn("Unsupported tag <"+tagName+"> passed to ui.show"); break;
				}
			} else {
				displayVal = "none";
			}
			elt.style.display = displayVal;

			return visible;
		}
	};

	if (window) { 
		window.ui = ui;
	} else { 
		console.error("ui instantiation failed"); 
	}

})();