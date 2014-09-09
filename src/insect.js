function Insect (pos, picStr) {
  Thing.call (this, pos, picStr);
  this.heal = 7;
  this.zIndex = 7;
}

Insect.asPrototype = function () {
  return new Insect (new Pos (0, 0), "");
};

extend (Insect, Thing);

/*************************************************************************************/

function Fly (pos) {
  Insect.call (this, pos, "%");
}

extend (Fly, Insect, {

    decideDir: function () {
      return this.setDir (Dir.getDirs ().random ());
    }
});

/*************************************************************************************/

function Spider (pos) {
  Insect.call (this, pos, Unicode.capitalZhe);
  this.thread = new SilkThread (pos, 0);
  this.things.push (this.thread);
}

extend (Spider, Insect, {

    decideDir: function () {
      if (!this.hanging ()) {
        return this.setDir (Dir.DOWN);
      }
      var rand = Math.random ();
      if (rand < 0.1) {
        return this.setDir (Dir.UP);
      }
      if (rand < 0.8) {
        return this.setDir (Dir.NONE);
      }
      return this.setDir (Dir.DOWN);
    }

  , hanging: function () {
      return this.thread.alive ();
    }

  , move: function () {
      if (this.hanging ()) {
        switch (this.dir) {
          case Dir.UP:
            this.thread.raise ();
            break;
          case Dir.DOWN:
            this.thread.lower ();
            break;
        }
      }
      return Insect.prototype.move.call (this);
    }
});
