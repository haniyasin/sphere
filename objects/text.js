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