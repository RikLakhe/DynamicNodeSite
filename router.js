const Profile =require('./profile.js');
const render = require('./render.js');

//2. handle http route GET/ and POST/
homeRoute = (request,response) =>{
	//if url == / && GET
	if(request.url === "/"){
		response.writeHead(200,{'Content-type':'text/plain'});
		render.view('header',{},response);
		render.view('search',{},response);
		render.view('footer',{},response);
		response.end();
		// parse the request containing file name
		// const pathname = url.parse(request.url).pathname;
		// const location = `/files/index.html`;
		//print the name of the file for which the request is made
		// console.log(`Request for ${location} received `);

		//read the requested file content from the file system
		// fs.readFile(location.substr(1),function(err,data){
		// 		if(err){
		// 			console.log(err);
		// 			// http status 404:not found 
		// 			// content type : text/plain
		// 			response.writeHead(404,{'Content-Type':'text/html'});

		// 		}else{
		// 			// page found
		// 			// htttp status 202: ok
		// 			// content type:text/plain
		// 			response.writeHead(200,{'Content-Type':'text/html'});

		// 			response.write(data.toString());
		// 		}

		// 		// send the response body
		// 		response.end();
		// 	});
	}
}

//3. handle http route GET /:username
userRoute=(request,response)=>{
	const userName = request.url.replace("/","");
	if(userName.length>0){
		response.writeHead(200,{'Content-type':'text/plain'});
		render.view('header',{},response);

		//get json from treehouse
		var studentProfile =new Profile(userName);
		//on end
		studentProfile.on("end",function(profileJson){
			//show profile

			//store the values which we need 
			const value ={
				avatarUrl:profileJson.gravatar_url,
				username:profileJson.profile_name,
				badges:profileJson.badges.length,
				javascript:profileJson.points.JavaScript 
			}

			//simple response
			render.view('profile',value,response);
			render.view('footer',{},response);
			response.end();

		});

		//on error
		studentProfile.on('error',function(error){
			//show error
			render.view('error',{errorMessage: error.message},response);
			render.view('search',{},response);
			render.view('footer',{},response);
			response.end();
		});
		

		
		// get json on end

		// on error show error

	}

}

module.exports.home = homeRoute;
module.exports.user = userRoute;
