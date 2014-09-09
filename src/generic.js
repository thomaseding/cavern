function clone (obj) {
  var result = {};
  for (var x in obj) {
    if (obj.hasOwnProperty (x)) {
      result [x] = obj [x];
    }
  }
  result.constructor = obj.constructor;
  result.prototype = obj.prototype;
  return result;
}

function extend (child, parent, prototype) {
  child.prototype = parent.asPrototype
    ? parent.asPrototype ()
    : new parent ()
    ;
  child.prototype.prototype = parent.prototype;
  child.prototype.constructor = child;
  prototype = prototype || {};
  for (var x in prototype) {
    if (prototype.hasOwnProperty (x)) {
      child.prototype [x] = prototype [x];
    }
  }
}

var addEvent = window.addEventListener
	? function(el, type, f) {
			el.addEventListener(type, f, false);
		}
	: function(el, type, f) {
			el.attachEvent("on" + type, f);
		}
  ;

var removeEvent = window.removeEventListener
	? function (el, type, f) {
			el.removeEventListener (type, f, false);
		}
	: function (el, type, f) {
			el.detachEvent ("on" + type, f);
		}
  ;

function replicate (n, x) {
  var xs = [];
  for (var i = 0; i < n; ++i) {
    xs [i] = x;
  }
  return xs;
}

function id (x) {
  return x;
}

String.prototype.count = function (c) {
  var count = 0;
  var pos = this.indexOf (c);
  while (pos != -1) {
    ++count;
    pos = this.indexOf (c, pos + 1);
  }
  return count;
};

Array.prototype.random = function () {
  return this [Math.floor (Math.random () * this.length)];
};

Array.prototype.pushWhen = function (pred, x) {
  if (pred (x)) {
    this.push (x);
    return true;
  }
  return false;
};

Number.prototype.repeat = function (f) {
  for (var i = 0; i < this; ++i) {
    f ();
  }
};
