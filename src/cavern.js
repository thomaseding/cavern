function Cavern (width, height) {
  this.box = new Box (new Pos (0, 0), width, height);
  this.bat = new Bat (new Pos (Math.floor (width / 2) - 1, Math.ceil (height / 2)));
  this.things = [this.bat];
}

Cavern.prototype = {

    width: function () {
      return this.box.width;
    }

  , height: function () {
      return this.box.height;
    }

  , toString: (function () {
      var getZIndex = function (x) {
        return x.zIndex;
      };

      return function () {
        this.things.sort (getZIndex);
        var cavern = this;
        var grid = replicate (cavern.height (), ' ').map (function () {
          return replicate (cavern.width (), ' ');
        });
        this.things.forEach (function (thing) {
          var pos = thing.pos ();
          var lines = thing.toString ().split ('\n');
          lines.forEach (function (line, y) {
            var cs = line.split ("");
            cs.forEach (function (c, x) {
              if (c != ' ') {
                grid [y + pos.y] [x + pos.x] = c;
              }
            });
          });
        });
        return grid.map (function (cs) {
          return cs.join ("");
        }).join ('\n');
      };
    }) ()

  , add: function (thing) {
      if (this.contains (thing)) {
        this.things.push (thing);
        thing.things.forEach (function (containedThing) {
          this.add (containedThing);
        }, this);
        return true;
      }
      return false;
    }

  , contains: function (thing) {
      return this.box.containsBox (thing.box);
    }

  , fits: function (thing) {
      return this.contains (thing)
        &&  this.things.every (function (t) {
              return !thing.overlap (t);
            })
        ;
    }

  , tryAdd: function (thing) {
      if (this.fits (thing)) {
        this.add (thing);
        return true;
      }
      return false;
    }

  , thingsInX: function (x) {
      return this.things.filter (function (thing) {
        return thing.box.containsX (x) && thing.box.containsX (x + 1);
      });
    }

  , thingsInY: function (y) {
      return this.things.filter (function (thing) {
        return thing.box.containsY (y) && thing.box.containsX (y + 1);
      });
    }

  , thingsInPos: function (pos) {
      var shiftedPos = pos.add (new Pos (1, 1));
      return this.things.filter (function (thing) {
        return thing.box.containsPos (pos) && thing.box.containsPos (shiftedPos);
      });
    }

  , getEvery: function (type) {
      return this.things.filter (function (thing) {
        return thing instanceof type;
      });
    }

  , runCollisions: function () {
      var things = this.things.slice ();
      for (var i = 0; i < things.length; ++i) {
        for (var j = i + 1; j < things.length; ++j) {
          things [i].tryCollide (things [j]);
        }
      }
      return this;
    }

  , populateCeiling: function () {
      var x = 0;
      var possibleThings = stalactiteTypes.concat (Spider);
      while (x < this.width ()) {
        do {
          var pos = new Pos (x, 0);
          while (this.thingsInPos (pos).length) {
            pos = new Pos (++x, 0);
          }
          var thing = new (possibleThings.random ()) (pos);
        } while (x < this.width () && !this.tryAdd (thing));
        x += thing.width ();
      }
      return this;
    }

  , populateFloor: function () {
      var x = 0;
      var y = this.height ();
      var possibleThings = stalagmiteTypes;
      while (x < this.width ()) {
        do {
          var pos = new Pos (x, y);
          while (this.thingsInPos (pos).length) {
            pos = new Pos (++x, y);
          }
          var thing = new (possibleThings.random ()) (pos);
          thing.setPos (pos.sub (new Pos (0, thing.height ())));
        } while (x < this.width () && !this.tryAdd (thing));
        x += thing.width ();
      }
      return this;
    }

  , moveThing: function (thing) {
      thing.decideDir ();
      var width = thing.width ();
      var height = thing.height ();
      var newPos = thing.pos ().add (thing.dir.toPos ());
      if (this.box.containsBox (new Box (newPos, width, height))) {
        thing.move ();
      }
      return thing;
    }

  , moveThings: function () {
      this.things.forEach (function (thing) {
        this.moveThing (thing);
      }, this);
    }

  , drip: function () {
      var existingDrops = this.getEvery (WaterDrop);
      var stalactites = this.getEvery (Stalactite).filter (function (stalactite) {
        return !stalactite.fallen;
      });
      var newDrops = [];
      stalactites.forEach (function (stalactite) {
        if (Math.random () < stalactite.chanceToDrip) {
          newDrops.pushWhen (id, stalactite.drip ());
        }
      });
      newDrops.forEach (function (drop) {
        this.tryAdd (drop);
      }, this);
      return this;
    }

  , removeDead: function () {
      this.things = this.things.filter (function (thing) {
        return thing.alive ();
      });
      return this;
    }
};
