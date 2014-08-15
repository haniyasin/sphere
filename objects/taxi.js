/*
 * taxi application. Вызывает два подприложения - одно для пассажира, а другое для перевозчика
 */

var ui = require('../../dsa/objects/ui.js'),
dsa = require('../../dsa/init.js'),
passenger = dsa.get('sphere/objects/taxi/passenger'),
taxi = dsa.get('sphere/objects/taxi/taxi');

module.exports = function(dsa, stack){
    with(ui.highlevel){
	var sub_app_chooser = new card( {
					    name : "app_chooser"
					}, null, stack);
	if(typeof sub_app_chooser.old != 'undefined')
	    return;

	new click({
		      height : 1,
		      width : 2,
		      label : 'пассажир',
		      on_click : function(){
			  passenger.display().run(stack);
		      }
		  }, null, stack);
	new click({
		      height : 1,
		      width : 2,
		      label : 'перевозчик',
		      on_click : function(){
			  taxi.display().run(stack);
		      }
		  }, null, stack);

    };
	
    this.destroy = function(){
    };
};

