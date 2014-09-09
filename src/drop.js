function WaterDrop (pos) {
  Thing.call (this, pos, "'");
  this.damage = 1;
  this.zIndex = 1;
}

extend (WaterDrop, Thing, {

    decideDir: function () {
      return this.setDir (Dir.DOWN);
    }
});
