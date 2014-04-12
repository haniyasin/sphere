//Object loader is responsible for finding object by address/id, loading him from storage and starting with
//help of dsa.manager
//Also it is responsible for releasing object correctly

//object is representation of link to another object within sphere
/*
exports.init = function(send, react){
    react('update',
	  function(client, data, element){
	      send('sphere.ui.area_slave', 'open', data);
	  },
	  'release',
	  function(client){
	  }
	 );
}

//object is like a container and may be using container in background, but more like usual canvas

exports.init = function(send, react){
    return {
	"in" : {
	    "get" : function(client, element){

	    },
	    "release" : function(client, element){
	    }
	}
    }        
}

//object is container for other object. May contain any number of any type objects

exports.init = function(send, react){
    react('update',
	  function(client, element){

	  },
	  'release',
	  function(client, element){
	  }
	 );
}


//object is representation of text within sphere
exports.init = function(send, react){
    react('update', 
	  function(client, data, element){
	      //тут бы наверное не помешало бы переодически проверять как там наш объект в хранилище,
	      //тем более, что всё что для этого надо, было передано в сообщении
	      send('ui', 'fill_element', element, data);
	  });
    react('release',
	  function(client){
	      //пока не совсем ясно надо ли вообще оно, релизить то, ведь редактировать это другое дело
	      // обновление тоже, хотя если обновляется через таймер, то да, надо релизить, это точно
	      //send('ui)
	  });
}
*/
//object is representation of image within sphere

exports.image = function(context, send, react, sequence){
    react("init", 
	 function(next, ui, element){
	     context.set('element', element);
	     context.set('ui', ui);
	 });
    react("update",
	  function(next, data){
	      send(context.get('ui'), 'fill_element', context.get('element'), data); 
	  });
    
    react("release",
	  function(next){
//	      send(context.get)
	  });
}

exports.init = function(env, context, send, react, sprout){
    react("init", function(stack, ui){
	     context.set('ui', ui); 
	  });

    react("load", function(stack, object_info, element){
	      //необходимо подумать над изменяющимися данным с хранилище
	      sequence(['s', 'dsa.storage', 'extract', object_info, { "type" : true, "data" : true}],
		       ['ff', function(sequence, ret, next){
			    next('sphere.objects' + ret.last.type);
			}],
		       ['s', 'dsa.manager', 'get', 'ret.last', ui, element],
		       ['s', 'ret.last', 'update', 'ret[0].data'],
		       ['next', 'ret[-1]']
		      );
	  });
}