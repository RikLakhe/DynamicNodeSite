const fs = require('fs');

mergeValues =(values,content) =>{
	//cycle over the keys
	for(var key in values){
		//replace all keys with value form the value object
		content= content.replace(`{{${key}}}`,values[key]);
	}
	//return merged values
	return content;
}

view = (templateName,values, response) => {
	var fileContents  = fs.readFileSync(`./views/${templateName}.html`,{encoding:'utf8'});

	//insert values into the content
	fileContents = mergeValues(values,fileContents)
	//write out the contents to the response
	response.write(fileContents)
	}


module.exports.view = view;