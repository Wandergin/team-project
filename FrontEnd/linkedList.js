// 'type' stores the type of the 'data'
// 'data' stores a value (in this case a dictionary of search terms o a certain type)
// 'next' points to the next node in the list
function Node(data, type){
	this.type = type;
	this.data = data;
	this.next = null;
}

function LinkedList(){
	this._length = 0;
	this.head = null;
}

// add(value, name) adds a node to a list.
LinkedList.prototype.add = function(value, name){
	var node = new Node(value, name);
	var currentNode = this.head;
	
	// 1st use-case: an empty list
	if(!currentNode){
		this.head = node;
		this._length++;
		
		return node;
	}
	
	// 2nd use-case: a non-empty list
	while(currentNode.next){
		currentNode = currentNode.next;
	}
	
	currentNode.next = node;
	
	this._length++;
	
	return node;
};

// searchNodeAt(position) searches for a node at n-position in our list
LinkedList.prototype.searchNodeAt = function(position){
	var currentNode = this.head;
	var length = this._length;
	var count = 0;
	var message = {failure: 'Error: non-existent node in this list.'};
	
	// 1st use-case: an invalid position 
	if(length === 0|| position < 0 || position > length){
		throw new Error(message.failure);
	}
	
	// 2nd use-case: a valid position 
	while(count < position){
		currentNode = currentNode.next;
		count++;
	}
	
	return currentNode;
};

// remove(position) removes a node from a list
LinkedList.prototype.remove = function(position){
	var currentNode = this.head;
	var length = this._length;
	var count = 0;
	var message = {failure: 'Error: non-existent node in this list.'};
	var previousNode = null;
	var nextNode = null;
	var deletedNode = null;
	
	// 1st use-case: an invalid position
	if(position < 0 || position > length){
		throw new Error(message.failure);
	}
	
	// 2nd use-case: the first node is removed
	if(position === 0){
		this.head = currentNode.next;
		deletedNode = currentNode;
		currentNode = null;
		this._length--;
		
		return deletedNode;
	}
	
	// 3rd use-case: any other node is removed
	while(count < position){
		previousNode = currentNode;
		currentNode = currentNode.next;
		nextNode = currentNode.next;
		count++;
	}
	
	previousNode.next = nextNode;
	deletedNode = currentNode;
	currentNode = null;
	this._length--;
	
	return deletedNode;
	
};

// searchNodeAt(type) searches for a node of a certain type in our list.
LinkedList.prototype.searchNodeType = function(type){
	var currentNode = this.head;
	var length = this._length;
	var count = 0;
	var message = {failureType: 'Error: non-existent node type.', failureNull: 'Error: no nodes have been added'};
	
	// 1st use-case: an invalid list length 
	if(length === 0){
		throw new Error(message.failureNull);
	}
	
	// 2nd use-case: an invalid type
	if(type === null || type === ''){
		throw new Error(message.failureType);
	}
	
	// 3rd use-case: any type
	while(count < length){
		if(currentNode.type === type){
			return currentNode;
		}
		currentNode = currentNode.next;
		count++;
	}
	// if type is not found, throw an error
	throw new Error(message.failureType);
	
}

// show() prints in the console log all the type of data that is stored in the LinkedList
LinkedList.prototype.show = function(){
	var currentNode = this.head;
	while(currentNode != null){
		console.log(currentNode.type);
		currentNode = currentNode.next;
	}
}

var test = new LinkedList();

test.add(1, 'cuisine');
test.add(2, 'location');
test.add(3, 'rating');
test.add(4, 'people');
test.add(5, 'time');

test.show();

