
window.onload = main;
var currentDiv;
function main()
{

	
	changeButton();
	var tiles = document.getElementById('puzzlearea').getElementsByTagName('div');
	var n = 0;
	var id = 0;
	document.getElementById("shufflebutton").onclick = shufflePuzzle;
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++){
			tiles[n].id = id;
			id++; 
			tiles[n].onmouseover = hoverCall;
			tiles[n].onmouseout = mouseOut;
			tiles[n].onclick = clickCall;
			
			if(i===parseInt("3") && j===parseInt("3")){
				break;
			}
			tiles[n].className = "puzzlepiece";
			if(i==0 || j==0){
				if(i==0 && j==0){
					tiles[n].style.top = "0px";
					tiles[n].style.left = "0px";
					tiles[n].style.backgroundPositionX = "0px";
					tiles[n].style.backgroundPositionY = "0px";
					n++;
					continue;
				}
				else if(i==0){
					tiles[n].style.left = (parseInt(j)) * 100 + "px";
					tiles[n].style.top = "0px";
					tiles[n].style.backgroundPositionX = (parseInt(-j)*100)+ "px";
					tiles[n].style.backgroundPositionY = "0px";
				}
				else if(j==0){
					tiles[n].style.left = "0px";
					tiles[n].style.top = (parseInt(i)) * 100 + "px";
					tiles[n].style.backgroundPositionX = "0px";
					tiles[n].style.backgroundPositionY = (parseInt(-i)*100)+ "px";
				}
			}
			else{
				tiles[n].style.top = (parseInt(i)) * 100 + "px";
				tiles[n].style.left = (parseInt(j)) * 100 + "px";
				tiles[n].style.backgroundPositionX = (parseInt(-j)*100)+ "px";
				tiles[n].style.backgroundPositionY = (parseInt(-i)*100)+ "px";
			}
			n++;
		}
	}
	
}

function shufflePuzzle()
{
	if(document.getElementById('empty') == null){
		addDiv();
	}
	var index = 0;
	var last_num = 0;
	var count = 0;
	while(count < 100)
	{
		var empty_x = document.getElementById('empty').style.left;
		var empty_y = document.getElementById('empty').style.top;
	
		var neighs = [];
		var empty_div_curr_loc = document.getElementById('empty').value;
	
		var leftid = parseInt(empty_div_curr_loc)-1;
		var rightid = parseInt(empty_div_curr_loc)+1;
		var topid = parseInt(empty_div_curr_loc)-4;
		var downid = parseInt(empty_div_curr_loc)+4;
	
		var left_neighbour;
		var right_neighbour;
		var top_neighbour;
		var bottom_neighbour;
	

		if(leftid>=0 && leftid<=15)
			left_neighbour = (document.getElementById(leftid).style.left);
		if(rightid>=0 && rightid<=15)
			right_neighbour = (document.getElementById(rightid).style.left);
		if(topid>=0 && topid<=15)
			top_neighbour = (document.getElementById(topid).style.top);
		if(downid>=0 && downid<=15)
			bottom_neighbour = (document.getElementById(downid).style.top);
	

		if (parseInt(empty_div_curr_loc)==4 || parseInt(empty_div_curr_loc)==8 || parseInt(empty_div_curr_loc)==12 || parseInt(empty_div_curr_loc)==0)
			left_neighbour = undefined;
		if (parseInt(empty_div_curr_loc)==3 || parseInt(empty_div_curr_loc)==7 || parseInt(empty_div_curr_loc)==11 || parseInt(empty_div_curr_loc)==15)
			right_neighbour = undefined;
		if (parseInt(empty_div_curr_loc)==0 || parseInt(empty_div_curr_loc)==1 || parseInt(empty_div_curr_loc)==2 || parseInt(empty_div_curr_loc)==3)
			top_neighbour = undefined;
		if (parseInt(empty_div_curr_loc)==12 || parseInt(empty_div_curr_loc)==13 || parseInt(empty_div_curr_loc)==14 || parseInt(empty_div_curr_loc)==15)
			bottom_neighbour = undefined;
	

		if(left_neighbour){
			neighs.push(leftid);
		}
	
		if(right_neighbour){
			neighs.push(rightid);
		}
	
		if(bottom_neighbour){
			neighs.push(downid);
		}
	
		if(top_neighbour){
			neighs.push(topid);
		}
	
		index = newRandomGen(neighs.length, last_num);
		var emp_div_id = document.getElementById('empty').value;
		var cur_div = neighs[parseInt(index)-1];
		document.getElementById('empty').value = cur_div;
		document.getElementById(cur_div).setAttribute('id', emp_div_id);
		
		interchangeCoords('empty', emp_div_id);
		
		neighs.length = 0;
		last_num = index;
		count++;
	}
}

function newRandomGen(maxi, lastnum)
{
	var randomnumber = Math.floor((Math.random() * parseInt(maxi)) + 1);
	while(true){
		randomnumber = Math.floor((Math.random() * parseInt(maxi)) + 1);
		if(lastnum != randomnumber){
			break;
		}
	}
	return randomnumber;
}

function hoverCall()
{
	var empty_x = document.getElementById('empty').style.left;
	var empty_y = document.getElementById('empty').style.top;
	
	var l_x = document.getElementById(this.id).style.left; 
	var t_y = document.getElementById(this.id).style.top;	
	
	if((parseInt(l_x) == parseInt(parseInt(empty_x) - 100)) && (parseInt(t_y) == parseInt(empty_y))){
		document.getElementById(this.id).className += " movablepiece";
	}

	if((parseInt(l_x) == parseInt(parseInt(empty_x) + 100)) && (parseInt(t_y) == parseInt(empty_y))){
		document.getElementById(this.id).className += " movablepiece";
	}
	
	if((parseInt(t_y) == parseInt(parseInt(empty_y) - 100)) && (parseInt(l_x) == parseInt(empty_x))){
		document.getElementById(this.id).className += " movablepiece";
	}
	
	if((parseInt(t_y) == parseInt(parseInt(empty_y) + 100)) && (parseInt(l_x) == parseInt(empty_x))){
		document.getElementById(this.id).className += " movablepiece";
	}
}

function interchangeCoords(index1, index2)
{
	var empty_x = document.getElementById(index1).style.left;
	var empty_y = document.getElementById(index1).style.top;
	
	var l_x = document.getElementById(index2).style.left; 
	var t_y = document.getElementById(index2).style.top;	
	
	document.getElementById(index1).style.left = l_x;
	document.getElementById(index1).style.top = t_y;
	
	document.getElementById(index2).style.left = empty_x;
	document.getElementById(index2).style.top = empty_y;
}

function clickCall()
{
	if(document.getElementById('empty') == null){
		alert("Please shuffle the puzzle to Start the game");
	}
	
	var empty_x = document.getElementById('empty').style.left;
	var empty_y = document.getElementById('empty').style.top;
	
	var l_x = document.getElementById(this.id).style.left; 
	var t_y = document.getElementById(this.id).style.top;	
	
	if((parseInt(l_x) == parseInt(parseInt(empty_x) - 100)) && (parseInt(t_y) == parseInt(empty_y))){
		document.getElementById('empty').value = this.id;
		this.id = parseInt(this.id)+1;
		currentDiv = this.id;
		interchangeCoords('empty', currentDiv);
	}
	
	if((parseInt(l_x) == parseInt(parseInt(empty_x) + 100)) && (parseInt(t_y) == parseInt(empty_y))){
		document.getElementById('empty').value = this.id;
		this.id = parseInt(this.id)-1;
		currentDiv = this.id;
		interchangeCoords('empty', currentDiv);
	}
	
	if((parseInt(t_y) == parseInt(parseInt(empty_y) - 100)) && (parseInt(l_x) == parseInt(empty_x))){
		document.getElementById('empty').value = this.id;
		this.id = parseInt(this.id)+4;
		currentDiv = this.id;
		interchangeCoords('empty', currentDiv);
	}
	
	if((parseInt(t_y) == parseInt(parseInt(empty_y) + 100)) && (parseInt(l_x) == parseInt(empty_x))){
		document.getElementById('empty').value = this.id;
		this.id = parseInt(this.id)-4;
		currentDiv = this.id;
		interchangeCoords('empty', currentDiv);
	}
}


function addDiv()
{
	var newDiv = document.createElement('div');
	newDiv.id = 'empty';
	document.getElementById('puzzlearea').appendChild(newDiv);
	document.getElementById('empty').value = "15";
	document.getElementById('empty').style.left = "300px";
	document.getElementById('empty').style.top = "300px";
}

function mouseOut()
{
	this.className = this.className.replace("movablepiece", '');
}

//Functions for extra feature-------------------------------------------------------------------------------------------------------------------

function changeButton(){
	var $input = $('<input type="button" value="Change Image" />');
	$input.click(function(){
		changeImage();
	});
	
	$input.appendTo($("#controls"));
	
}

function changeImage(){
	var tiles = document.getElementById('puzzlearea').getElementsByTagName('div');
	x = Math.floor(Math.random()*4);
	for (var i=0; i<tiles.length; i++) 
					
	{
		if(x==0 ){
			tiles[i].style.backgroundImage="url('background.jpg')";   
			tiles[i].className = 'puzzlepiece';                         
			tiles[i].style.left = (i%4*100)+'px';
			tiles[i].style.top = (parseInt(i/4)*100) + 'px';
			tiles[i].style.backgroundPosition= '-' + tiles[i].style.left + ' ' + '-' + tiles[i].style.top; 
		}else if(x==1){
			tiles[i].style.backgroundImage="url('kaneki.jpg')";   
			tiles[i].className = 'puzzlepiece';                         
			tiles[i].style.left = (i%4*100)+'px';
			tiles[i].style.top = (parseInt(i/4)*100) + 'px';
			tiles[i].style.backgroundPosition= '-' + tiles[i].style.left + ' ' + '-' + tiles[i].style.top;
			
		}else if(x==2){
			tiles[i].style.backgroundImage="url('sasuke.jpg')";   
			tiles[i].className = 'puzzlepiece';                         
			tiles[i].style.left = (i%4*100)+'px';
			tiles[i].style.top = (parseInt(i/4)*100) + 'px';
			tiles[i].style.backgroundPosition= '-' + tiles[i].style.left + ' ' + '-' + tiles[i].style.top;
			
		}else if(x==3){
			tiles[i].style.backgroundImage="url('naruto.jpg')";   
			tiles[i].className = 'puzzlepiece';                         
			tiles[i].style.left = (i%4*100)+'px';
			tiles[i].style.top = (parseInt(i/4)*100) + 'px';
			tiles[i].style.backgroundPosition= '-' + tiles[i].style.left + ' ' + '-' + tiles[i].style.top;
			
		}
	}
}

