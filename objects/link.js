//object is representation of link to another object within sphere

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