//object is representation of image within sphere

exports.init = function(send, react){
    react('update',
	  function(client, data, element){
	     send('ui', 'fill_element', element, data); 
	  },
	  'release',
	  function(client){
	  });
}