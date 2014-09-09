function Dir (x, y) {
  this.pos = new Pos (x, y);
}

Dir.prototype = {

    toPos: function () {
      return this.pos;
    }

  , opposite: function () {
      switch (this) {
        case Dir.UP:
          return Dir.DOWN;
        case Dir.DOWN:
          return Dir.UP;
        case Dir.LEFT:
          return Dir.RIGHT;
        case Dir.RIGHT:
          return Dir.LEFT;
        case Dir.NONE:
          return Dir.NONE;
      }
    }
};

Dir.UP = new Dir (0, -1);
Dir.DOWN = new Dir (0, 1);
Dir.LEFT = new Dir (-1, 0);
Dir.RIGHT = new Dir (1, 0);
Dir.NONE = new Dir (0, 0);

Dir.getDirs = function () {
  return [Dir.UP, Dir.DOWN, Dir.LEFT, Dir.RIGHT, Dir.NONE];
};
