function Rock (pos, picStr) {
  Thing.call (this, pos, picStr);
  this.zIndex = 5;
}

extend (Rock, Thing, {

    shatter: function () {
      this.life = 0;
      return [];
    }
});

Rock.asPrototype = function () {
  return new Rock (new Pos (0, 0), "");
}

/*************************************************************************************/

function Shard (pos, picStr) {
  Rock.call (this, pos, picStr);
  this.damage = 1;
}

Shard.asPrototype = function () {
  return new Shard (new Pos (0, 0), "");
}; 

extend (Shard, Rock, {

    decideDir: function () {
      return this.setDir (Dir.DOWN);
    }
});

/*************************************************************************************/

function Stalactite (pos, damage, picStr) {
  Rock.call (this, pos, picStr);
  this.damage = damage;
  this.waterType = WaterDrop;
  this.fallen = false;
  this.chanceToDrip = 0.07;
  this.chanceToFall = 0.03;
}

Stalactite.asPrototype = function () {
  return new Stalactite (new Pos (0, 0), 0, "");
};

extend (Stalactite, Rock, {

    drip: function () {
      var flat = this.toFlattenedString ().toUpperCase ();
      var vCount = flat.count ('V');
      if (!vCount) {
        return null;
      }
      var n = Math.floor (Math.random () * vCount);
      var x = flat.indexOf ('V');
      for (var i = 0; i < n; ++i) {
        x = flat.indexOf ('V', x + 1);
      }
      var lines = this.toString ().toUpperCase ().split ('\n');
      var y = lines.length - 1;
      while (lines [y].charAt (x) != 'V') {
        --y;
      }
      return new this.waterType (
        new Pos (x, y + 1).add (this.pos ())
      );
    }

  , shatter: function () {
      var shards = Rock.prototype.shatter.call (this);
      var pos = this.pos ().add (new Pos (0, this.height () - 2));
      shards.push (new Shard (pos.add (new Pos (-1, 0)), "\\"));
      shards.push (new Shard (pos.add (new Pos (this.width (), 0)), "/"));
      return shards;
    }

  , decideDir: function () {
      if (this.fallen) {
        return this.setDir (Dir.DOWN);
      }
      if (Math.random () < this.chanceToFall) {
        return this.setDir (Dir.DOWN);
      }
      return this.setDir (Dir.NONE);
    }

  , move: function () {
      this.fallen = this.fallen || this.dir == Dir.DOWN;
      return Rock.prototype.move.call (this);
    }
});

/*************************************************************************************/

function Stalagmite (pos, damage, picStr) {
  Rock.call (this, pos, picStr);
  this.damage = damage;
  this.life = Infinity;
}

Stalagmite.asPrototype = function () {
  return new Stalagmite (new Pos (0, 0), 0, "");
};

extend (Stalagmite, Rock);
