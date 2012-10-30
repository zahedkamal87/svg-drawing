function Shape() {
  this.points = [];
  this.color = 'red';
  this.border_color = 'black';
  this.border_width = 2;
  this.is_closed = false;
}
Shape.prototype.addPoint = function addPoint(point) {
  if (point.isEqual(this.firstPoint()))
    this.is_closed = true;
  this.points.push(point);
  if (this.on_change)
    this.on_change();
};
Shape.prototype.hasPoints = function hasPoints() {
  return this.points.length;
};
Shape.prototype.firstPoint = function firstPoint() {
  return this.points[0];
};
Shape.prototype.removeLastPoint = function removeLastPoint() {
  this.points.pop();
  if (this.is_closed)
    this.is_closed = false;
  if (this.on_change)
    this.on_change();
  return this;
};
Shape.prototype.applyColor = function applyColor(color) {
  var dark_color = 'Dark' + color;

  // for some reason, Salmon & Grey are darker than DarkSalmon & DarkGrey
  if (color == 'Grey' || color == 'Salmon' || color == 'OliveGreen') {
    var orig_color = color;
    color = dark_color;
    dark_color = orig_color;
  }
  if (color == 'Brown') {
    color = 'Sienna';
    dark_color = 'SaddleBrown';
  }
  
  this.color = color;
  this.border_color = dark_color;
  if (this.on_change)
    this.on_change();
  return this;
};
Shape.prototype.onChange = function onChange(fn) {
  this.on_change = fn;
}
Shape.prototype.toJSON = function toJSON() {
  return {
    'points': this.points,
    'color': this.color,
    'border_color': this.border_color,
    'border_width': this.border_width,
    'is_closed': this.is_closed
  };
}