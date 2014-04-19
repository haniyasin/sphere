/*
 * Implementation of card abstraction
 * 
 * Card - это что-то вроде колоды карт, стека карт, причём этакого объёмного стека, карта это как листик 
 * дерева.  В зависимости от условий дерево может быть отображено как дерево, стек, сетка, список, пара 
 * списков или как-то иначе. В сущности, чем примитивнее способ отображения(например маленький экран 
 * телефона), тем проще отображение, тем оно последовательнее и меньше, вплоть до списка.  
 */

exports.init = function(env, dsa, ui){
    var root,
        prev_card,
        cur_card,
        cur_layer,
        offset = 0,
    cur_x = 0;
    
    dsa.on('card_create', 
	   function(sprout, stack, info){
	       var card = {
		   id : env.capsule.modules.uuid.generate_str(),
		   geometry : {
		       x : (cur_x += 20) + '%',
		       y : '5%',
		       width : '90%',
		       height : '90%'
		   },
		   prev_sprout : [],
		   sprout : []
	       };

	       if(typeof(cur_card) != 'undefined'){
		   if(typeof(prev_card) != 'undefined')
		       prev_card.prev_sprout.push(cur_card);
		   prev_card = cur_card;
		   cur_card.sprout.push(card);
		   card.prev_sprout.push(cur_card);		   
	       }

	       cur_card = card;

	       dsa.sprout.msg(ui.container, 'create', card.geometry).sprout(sprout).run(stack);
	       stack['card'] = card.id;
	       return true;	       
	   });

    dsa.on('card_get_offset', function(sprout, stack, size){
	       stack['card_offset'] = offset;
	       offset += size + 0.1;
	   });
    dsa.on('card_delete', 
	   function(sprout, stack, id){
	   });    
}