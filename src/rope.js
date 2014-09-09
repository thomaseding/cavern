function Rope (pos, length) {
  Thing.call (this, pos, "");
  this.setLength (length);
}

Rope.asPrototype = function () {
  return new Rope (new Pos (0, 0), 0);
};

extend (Rope, Thing, {
    
    move: function () {
      switch (this.dir) {
        case Dir.UP:
          this.raise ();
          break;
        case Dir.DOWN:
          this.lower ();
          break;
      }
      return Thing.prototype.move.call (this);
    }

  , setLength: function (length) {
      this.length = Math.max (length, 0);
      this.picStr = replicate (this.length, "|").join ("\n");
      this.box = new Box (this.pos (), 1, this.length);
      return this;
    }

  , raise: function () {
      return this.setLength (this.length - 1);
    }

  , lower: function () {
      return this.setLength (this.length + 1);
    }
});

/*************************************************************************************/

function SilkThread (pos, length) {
  Rope.call (this, pos, length);
  this.chanceToBreak = 0.05;
}

SilkThread.asPrototype = function () {
  return new SilkThread (new Pos (0, 0), 0);
};

extend (SilkThread, Rope, {
  
    move: function () {
      if (Math.random () < this.chanceToBreak) {
        this.life = 0;
      }
      return Rope.prototype.move.call (this);
    }
});
