function Box (pos, width, height) {
  this.pos = pos;
  this.width = width;
  this.height = height;
}

Box.prototype = {

    shift: function (pos) {
      return new Box (this.pos.add (pos), this.width, this.height);
    }

  , area: function () {
      return this.width * this.height;
    }

  , setPos: function (pos) {
      this.pos = pos;
      return this;
    }

  , corners: function () {
      return [
          this.pos
        , this.pos.add (new Pos (0, this.height))
        , this.pos.add (new Pos (this.width, 0))
        , this.pos.add (new Pos (this.width, this.height))
        ];
    }

  , containsX: function (x) {
      return this.area () && this.pos.x <= x && x <= this.pos.x + this.width;
    }

  , containsY: function (y) {
      return this.area () && this.pos.y <= y && y <= this.pos.y + this.height;
    }

  , containsPos: function (pos) {
      return this.containsX (pos.x) && this.containsY (pos.y);
    }

  , containsBox: function (box) {
      return this.containsPos (box.pos)
        && this.containsPos (
          box.pos.add (
            new Pos (
                Math.max (0, box.width)
              , Math.max (0, box.height)
            )
          )
        )
      ;
    }

  , overlap: function (lhs) {
      var leftmost = this.pos.x < lhs.pos.x
        ? this
        : lhs
        ;
      var rightmost = this == leftmost
        ? lhs
        : this
        ;
      var topmost = this.pos.y < lhs.pos.y
        ? this
        : lhs
        ;
      var bottommost = this == topmost
        ? lhs
        : this
        ;
      if (leftmost.pos.x + leftmost.width <= rightmost.pos.x) {
        return false;
      }
      if (topmost.pos.y + topmost.height <= bottommost.pos.y) {
        return false;
      }
      return true;
    }

  , toString: function () {
       return ["[Box", this.pos, this.width, this.height, ']'].join (' ') +
          "\n" + replicate (this.height, replicate (this.width, "#").join ("")).join ("\n");
    }
}

/*************************************************************************************/

function CollisionBox (pos, bool2dArray) {
  var width = 0;
  var boxes = [];
  bool2dArray.forEach (function (bools, y) {
    width = Math.max (width, bools.length);
    bools.forEach (function (bool, x) {
      if (bool) {
        var newPos = pos.add (new Pos (x, y));
        boxes.push (new Box (newPos, 1, 1));
      }
    });
  });
  Box.call (this, pos, width, bool2dArray.length);
  this.boxes = boxes;
}

CollisionBox.asPrototype = function () {
  return new CollisionBox (new Pos (0, 0), []);
};

extend (CollisionBox, Box, {

    overlap: function (lhs) {
      if (!Box.prototype.overlap.call (this, lhs)) {
        return false;
      }
      return this.boxes.some (function (box) {
        return lhs.overlap (box);
      });
    }

  , setPos: function (pos) {
      var originalPos = this.pos;
      Box.prototype.setPos.call (this, pos);
      this.boxes.forEach (function (box) {
        var offset = box.pos.sub (originalPos);
        box.setPos (pos.add (offset));
      }, this);
      return this;
    }

  , shift: function (pos) {
      var boxes = this.boxes.map (function (box) {
        return box.shift (pos);
      });
      var result = new CollisionBox (this.pos.add (pos), []);
      result.width = this.width;
      result.height = this.height;
      result.boxes = boxes;
      return result;
    }

  , toString: function () {
      var str = ["[CBox", this.pos, this.width, this.height, ']'].join (' ');
      str += "\n";
      var arr = replicate (this.height, 0).map (function () {
        return replicate (this.width, ".");
      }, this);
      this.boxes.forEach (function (box) {
        arr [box.pos.y - this.pos.y] [box.pos.x - this.pos.x] = "#";
      }, this);
      str += arr.map (function (x) {
        return x.join ("");
      }).join ("\n");
      return str;
    }
});
