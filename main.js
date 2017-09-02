var xhr = new XMLHttpRequest();
xhr.open("GET", "images.json", true);
xhr.timeout = 15000;
xhr.ontimeout = function() {
	console.log("Твоё время ушло");
};
xhr.onreadystatechange = function() {
	if (xhr.readyState == XMLHttpRequest.DONE)
	{
		obj = JSON.parse(xhr.response);
		(function () {
			// подгружаем миниатюры в карусель
			for (var i = 0; i < obj.images.length; i++) {
				carouselList.append("<li><img id='img-" + (i) + "' src='" + obj.images[i].miniature + "'></li>");
			};
			// меняем большую картинку
			$("#carousel-list img").click(function() {
				var set = $(this).attr('id').split("-")[1];
				$("#photo").attr("src", obj.images[set].full)
			})
		})();
	}
};
xhr.send(null);

//покатаемся на карусельке
var carouselList = $('#carousel-list');
var carouselLeft = $(".carousel-left");
var carouselRight = $(".carousel-right");

var pixelsOffset = 256;
var currentLeftValue = 0;
var elementsCount = 6;   //carouselList.children.length почему прилетает только 2??
var minimumOffset = - (elementsCount * pixelsOffset - 798);
var maximumOffset = 0;

carouselLeft.click(function(){
	if (currentLeftValue < maximumOffset) {
		currentLeftValue += 798;
		carouselList.animate({ left: currentLeftValue + "px"}, 500);
	};
});
carouselRight.click(function(){
	if (currentLeftValue > minimumOffset) {
		currentLeftValue -= 798;
		carouselList.animate({ left : currentLeftValue + "px"}, 500);
	};
});

function isPolindrome(str) {
	var a = str.toLowerCase().split('').reverse().join(); //split(/(\w)/g);
	return /(\w+)/g.test(str)==a;
}