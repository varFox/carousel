function Container() {
  this.id = "";
  this.className = "";
  this.htmlCode = "";
}

Container.prototype.render = function() {
  return this.htmlCode;
}

function Menu(myId, myClass, myItems) {
  Container.call(this);
  this.id = myId;
  this.className = myClass;
  this.items = myItems;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Container.prototype.remove = function() {
  var del = document.getElementById(this.id);
  del.parentNode.removeChild(del);
}



Menu.prototype.render = function() {
  var result = "<ul class='" + this.className + "' id='" + this.id + "'>";
  for (var item in this.items) {
    if (this.items[item] instanceof MenuItem) {
      result += this.items[item].render();
    };
  };
  result += "</ul>";
  return result;
};

function MenuItem(myHref, myName, myMenu) {
  Container.call(this);
  this.className = 'menu-item';
  this.href = myHref;
  this.name = myName;
  this.menu = myMenu;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function() {
  var rez = "<li id='" + this.id + "' class='" + this.className + "'><a href='" + this.href + "'>" + this.name + "</a>";
  if(this.menu !==null) {
    for (var i in this.menu) {
      rez += Menu.prototype.render.call(this.menu[i]);
    };
  };
  rez +="</li>"
  return rez;
}
var supSubMenuItem1 = new MenuItem('/na', 'Ягодная');
var supSubMenuItem2 = new MenuItem('/v', 'Сгущенное молоко');
var supSubMenu1 = new Menu('mySupSubMenu1', 'mySupSubClass', {0: supSubMenuItem1, 1: supSubMenuItem2});
var subMenuItem1 = new MenuItem('/', 'Все печеньки');
var subMenuItem2 = new MenuItem('/', 'С орешками');
var subMenuItem3 = new MenuItem('/', 'С шоколадом');
var subMenuItem4 = new MenuItem('/', 'Без сахара');
var subMenuItem5 = new MenuItem('/', 'Сахорные');
var subMenuItem6 = new MenuItem('/', 'С начинкой >', {0: supSubMenu1});
var subMenuItem7 = new MenuItem('/', 'Шоколадное');
var subMenu1 = new Menu('mySubMenu1', 'mySubClass', {0: subMenuItem1, 1: subMenuItem2, 2: subMenuItem3});
var subMenu2 = new Menu('mySubMenu2', 'mySubClass', {0: subMenuItem4, 1: subMenuItem5, 2: subMenuItem6, 3: subMenuItem7});
var menuItem1 = new MenuItem('/', 'Главная');
var menuItem2 = new MenuItem('/promo', 'Промоакции', {0: subMenu1});
var menuItem3 = new MenuItem('/catalog', 'Печеньки', {0: subMenu2});
var menuItem4 = new MenuItem('/contacts', 'Контакты');
var menu = new Menu('myId', 'myClass', {0: menuItem1, 1: menuItem2, 2: menuItem3, 3: menuItem4});


var div = document.write(menu.render());
