//Object manager is responsible for founding object by address/id, loading him from storage and starting with
//dsa.manager help
//Also it is responsible for releasing object correctly
exports.init = function(send, react){
    react("load", function(source, object_info, element){
	      //параметры из последовательности начинаются с ret
	      //Некоторое пояснение для себя и чтобы не забыть, вся эта конструкция - это последовательный
	      //вызов сервиса, тот вызывает следующий со своими результатами и следущий следующего и тд
	      //Все результаты сохраняются в сообщении последовательно, от сообщения к сообщению
	      //благодаря обязательному использованию arguments
	      //при посыле сообщения из обработчика сообщения и таким образом упаковыванию аргументов
	      //
	      sequent_send(['dsa.storage', 'extract', object_info, { "type" : true, "data" : true}],
			   ['dsa.manager', 'get', 'ret1[0].type'],
			   ['ret2[0]', 'load', 'ret1[0].data', element],
			   [source, 'object_created', 'ret2[0]']
			  );
	  });
}