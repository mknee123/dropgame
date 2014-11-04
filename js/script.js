//make an array to keep track of all existing drops
var drop_array = new Array();

/**
 * The Drop class is a blueprint for each raindrop we generate
 * @author  John Doe
 * @version 1.0, May 2014
 */
function Drop(){
	this.x; //starts empty, will keep track of each drop's left-right position as a #
	this.y; //starts empty, will keep track of each drop's up-down position as a #
	this.item_on_page; //represents drop's physical presence on the screen
	/** 
	*	The create method creates a DIV that looks like a blue drop on the page
	*/
	this.create = function(){
		//make a div tag in the HTML, store it into the item-on-page we set up above.
		this.item_on_page = document.createElement("div");
		//give it a class which styles it in CSS to resemble a drop
		this.item_on_page.className = "raindrop";
		//store a random x and y position, different for each drop. I'm using screen width of 800, height of 600:
		this.x = Math.floor(Math.random()*800);
		this.y = -50;
		//use those x and y coordinates in the CSS to position the drop:
		this.item_on_page.style.left = this.x + "px";
		this.item_on_page.style.top = this.y + "px";
		//attach the item to our HTML hierarchy, as a child of the body:
		document.body.appendChild(this.item_on_page);
	}
	/** 
	*   The destroy function does lots of cleaning up when a drop is removed from the page
	*/
	this.destroy = function(){
		//clear all splashes
		for(var j=0; j<document.getElementsByClassName("splash").length; j++){
			document.body.removeChild(document.getElementsByClassName("splash")[j]);	
		}
		//generate a copy of our animated GIF as an <img> tag:
		var newsplash = document.createElement("img");
		newsplash.className = "splash";
		//make each path/filename unquie so it replays the animation
		newsplash.src = "img/splash-anim-gif.gif?"+Math.random();
		//style it and set its position to that of the drop
		newsplash.style.position ="absolute";
		newsplash.style.left = this.x+"px";
		newsplash.style.top = this.y +"px";
		//place it onto the HTML page
		document.body.appendChild(newsplash);
		//remove the drop object from the array so other functions stop trying to manipulate it:
		var this_drops_index_num = drop_array.indexOf(this);
		//splice a single item out of the array
		drop_array.splice(this_drops_index_num, 1);
		//remove the graphic of the drop from HTML page
		document.body.removeChild(this.item_on_page);
	}
} //close the Drop class

/**
* This function moves all existing drops downward a little
*
*/
function moveAllDrops(){
	//console.log("moveAllDrops");
	//loop through all the existing drops
	for(var i=0; i<drop_array.length; i++){
		//add to the y property of the drop
	drop_array[i].y +=5;
	drop_array[i].item_on_page.style.top = drop_array[i].y + 'px';
	//if drop is touching floor
	if(drop_array[i].y>400){
		drop_array[i].destroy();
	}
	}
}
/**
* This function creates a drop every so often
*
*/
function spawn(){
	//make an object that's an instance of the Drop Class:
	var another_drop = new Drop();
	another_drop.create();
	drop_array.push(another_drop);
}
onload=init;

function init() {
	//make an drop bject every so often:
	setInterval(function(){spawn()}, 500);
	//start moving the drops a little, every so often:
	setInterval(moveAllDrops, 1000/100);
}
