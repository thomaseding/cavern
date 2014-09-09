function Bat (pos) {
  Thing.call (this, pos, Unicode.capitalLambda + "(\")" + Unicode.capitalLambda);
  this.life = 100;
  this.damage = 1;
  this.zIndex = 10;
}

extend (Bat, Thing, {
    
    tryCollide: function (thing) {
      var result = this.prototype.tryCollide.call (this, thing);
      if (result) {
        this.life += thing.heal;
      }
      return result;
    }

  , move: (function () {
      var i = 0;
      var animations = ["^(\")^", Unicode.capitalLambda + "(\")" + Unicode.capitalLambda];
      return function () {
        i = i < animations.length
          ? i
          : 0
          ;
        this.picStr = animations [i++];
        return Thing.prototype.move.call (this);
      }
    }) ()

  , decideDir: (function () {
      var keyUp = 38;
      var keyDown = 40;
      var keyLeft = 37;
      var keyRight = 39;
      var dir = Dir.NONE;
      addEvent (window, "keypress", function (e) {
        e = e || window.event;
        switch (e.which || e.keyCode) {
          case keyUp:
            dir = Dir.UP;
            break;
          case keyDown:
            dir = Dir.DOWN;
            break;
          case keyLeft:
            dir = Dir.LEFT;
            break;
          case keyRight:
            dir = Dir.RIGHT;
            break;
        }
      });
      addEvent (window, "keyup", function (e) {
        e = e || window.event;
        switch (e.which || e.keyCode) {
          case keyUp:
            /* fallthrough */
          case keyDown:
            /* fallthrough */
          case keyLeft:
            /* fallthrough */
          case keyRight:
            dir = Dir.NONE;
        }
      });
      return function () {
        return this.setDir (dir);
      };
    }) ()
});
