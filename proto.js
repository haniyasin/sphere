//This file is only draft, fragments of thoughts, prototype on paper, not working code, designed to develop specification.
//Useful code is apper after specification. Specification after this draft:)

///client_bootstrap something like this

//initialize session





function editor_new(send, react){
    
}





















////old stuff, only as ideas from past!!!!!!
///////////////////////////////////////////
var session_id = localstorage.get('session_id') | session.id_generate();

//var dht = manager.get('dht');

var resource_searcher = manager.get('resource_searcher');

var cstorage_address = resource_searcher.search_exists(session_id);

var cstorage = manager.get('storage');
cstorage.connect(cstorage_address);

var session_data = cstorage.get(session_id);

var session = manager.get('sphere.cli_session');

session.set(session_data);

//initialize main chain

var ui = manager.get('ui');

var root_frame = ui.root.set(localstorage.get('ui_root'));

var mc_id = localstorage.get(session.main_chain);

var ccstorage_address = resource_searcher.search_exists(mc_id);
var ccstorage = manager.get('storage');
cstorage.connect(ccstorage_address);
var main_chain_data = ccstorage.get(mc_id);

var main_chain = manager.get('sphere.chain');
main_chain.set(main_chain_data);
main_chain.display();
root_frame.add(main_chain.frame);

// chain

function chain_content(){
    
}

function chain(){
    /*
     * desc is
     * 
     * type; // chain, text, image
     * link; //boolean, like a href
     *  children=[];
     * */
    var _desc;
    var content;
    var children = []]
    this.frame = new ui.frame();

    this.set = function(desc){
	_desc = desc;
	content = new chain_content(_desc.type, _desc);
	if(_desc.type == chain_type.chain){
	    for(child in _desc.children){
		children.push(manager.get('sphere.chain').set(_desc_children[child]));
	    }
	}
	//creating youself ui and initialize all children
    }

    this.display() = function(){
	//displaying youself and children
    }    
    
  
}

