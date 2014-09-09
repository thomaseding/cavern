function Thing (pos, picStr) {
  this.life = 1;
  this.damage = 0;
  this.heal = 0;
  this.picStr = picStr;
  this.zIndex = 0;
  this.dir = Dir.NONE;
  this.box = new CollisionBox (
      pos
    , picStr.split ('\n').map (function (line) {
        return line.split ("").map (function (chr) {
          return chr != ' ';
        });
      })
  );
  this.things = [];
}

Thing.asPrototype = function () {
  return new Thing (new Pos (0, 0), "");
};

Thing.prototype = {

    toString: function () {
      return this.picStr;
    }

  , toFlattenedString: function () {
      var lines = this.toString ().split ('\n');
      var result = lines.shift ().split ("");
      lines.forEach (function (line) {
        line.split ("").forEach (function (c, i) {
          if (c != ' ') {
            result [i] = c;
          }
        });
      });
      return result.join ("");
    }

  , tryCollide: function (lhs) {
      var collision = this.overlap (lhs);
      if (collision) {
        this.life -= lhs.damage;
        lhs.life -= this.damage;
      }
      return collision;
    }

  , overlap: function (lhs) {
      return this.box.overlap (lhs.box)
    }

  , setDir: function (dir) {
      this.dir = dir;
      return this;
    }

  , decideDir: function () {
      return this.setDir (Dir.NONE);
    }

  , fall: function () {
      this.setDir (Dir.DOWN);
      this.move ();
    }

  , setPos: function (pos) {
      this.box.setPos (pos);
    }

  , move: function () {
      this.box = this.box.shift (this.dir.toPos ());
      return this;
    }

  , pos: function () {
      return this.box.pos;
    }

  , width: function () {
      return this.box.width;
    }

  , height: function () {
      return this.box.height;
    }

  , alive: function () {
      return this.life > 0;
    }
};
