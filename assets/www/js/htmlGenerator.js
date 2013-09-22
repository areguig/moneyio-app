function Generator () {
	this.simpleElement = function (id,classes,content)
	{
		var result = " ";
		//setting the id
		result+="id=\'"+id+"\' ";
		
		//setting the list of classes 
		result+="class=\`";
		for(var i = 0; i < classes.length; i++)
		{
			result+= classes[i]+" ";
		}	
		result+="\'>";
		
		//setting the div content
		for(var i = 0; i < content.length; i++)
		{
			result+= content[i];
		}
		result +=" ";
		return result;
	}
	
	// Div element generator
	this.div = function(id, classes, content)
	{
		var result = "<div "; 
		result += this.simpleElement(id,classes,content);
		result +="</div>";
		return result;
	}
	
	//a element generator
	this.a = function(id,classes,content,href)
	{
		var result = "<a ";
		result += "href=\'";
		if(href == undefined || href == null)
		{
			result+="#"
		}
		else
		{
			result+=href;	
		}
		result +="\' ";
		result += this.simpleElement(id,classes,content);
		result +="</a>";		
		return result;	 
	} 
	
	
}