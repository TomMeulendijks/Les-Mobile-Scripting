function App(){

	var nieuwslijst = document.getElementById('nieuwslijst');
	var itemTemplate = document.getElementById('test');
	var model = [];

	console.log(itemTemplate);

	microAjax("/nieuws.json", function (res) {
			
			model = JSON.parse(res).responseData.feed.entries;
			parseModel();
	  
	});

	console.log('test');

	function parseModel(){
		for(var i = 0; model.length>i; i++){

			var li = document.createElement('li');

			var template = new t(itemTemplate.innerHTML);
			li.innerHTML = template.render(model[i]);

			//div.innerHTML = template;

			nieuwslijst.appendChild(li);

		}
	}

}
window.onload = App;