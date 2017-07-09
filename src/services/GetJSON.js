// make an XHR request and return a promise
function GetJSON(url, log){
	return new Promise((resolve, reject) => {
		var xhr = new XMLHttpRequest();
		xhr.addEventListener("load", function(data){
			if(log){
				console.log(data.target.response);
			}
			resolve(JSON.parse(data.target.response));
		});
		xhr.open("GET", url);
		xhr.send();
	});
}

export default GetJSON;