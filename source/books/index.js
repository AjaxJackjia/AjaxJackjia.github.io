window.onload = function () {
  var genBookItem = function(item) {
		var $img = $("<img/>");
		$img.css("width", "107px");
		$img.attr("src", "http://7xk4nm.com1.z0.glb.clouddn.com" + item['photo']);
		$img.attr("alt", item['name']);

		var $item = $('<a target="_blank"></a>');
		$item.css("display", "inline-block");
		$item.css("border-bottom", "none");
		$item.css("padding-right", "20px");
		$item.css("padding-top", "20px");
		$item.css("width", "107px");
		$item.attr("href", item['link']);

		$item.append($img);
		return $item;
	};

	var init = function() {
		//adjust title style
		$("#reading").css("margin-top", "-10px");
		$("#reading").css("margin-bottom", "30px");
		$("#read").css("margin-top", "-10px");
		$("#read").css("margin-bottom", "30px");

		//generate reading
		for (index in BOOKS_OF_READING) {
			var bookItem = genBookItem(BOOKS_OF_READING[index]);
			$("#reading").append(bookItem);
		}

		//generate read
		for (index in BOOKS_OF_READ) {
			var bookItem = genBookItem(BOOKS_OF_READ[index]);
			$("#read").append(bookItem);
		}
	};

	init();
};


	
	

