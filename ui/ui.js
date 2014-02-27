exports.init = function ui(send, react){
    return {
	"in" : {
	    "show" : function(){
		send('ui', 'show');
		send('sphere.ui.address_panel', 'init');
		send('sphere.ui.area', 'init', '_primary');
		send('sphere.ui.area', 'init', '_slave');
		send('sphere.ui.action_panel', 'init');
	    },
	    "hide" : function(){
		send('ui', 'hide');
	    }	    
	}
    }
}
