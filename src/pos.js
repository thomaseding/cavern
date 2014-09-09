function Pos (x, y) {
  this.x = x;
  this.y = y;
}

Pos.prototype = {

    add: function (pos) {
      return new Pos (this.x + pos.x, this.y + pos.y);
    }

  , sub: function (pos) {
      return new Pos (this.x - pos.x, this.y - pos.y);
    }

  , equals: function (pos) {
      return this.x == pos.x && this.y == pos.y;
    }

  , toString: function () {
      return ["[Pos", this.x, this.y, ']'].join (' ');
    }
};
