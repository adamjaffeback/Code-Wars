var LinkedList = function() {
  this.head = null;
};

LinkedList.prototype.push = function( val ) {
  var newNode = {
    val: val,
    next: null
  };

  if ( this.head ) {
    var currentNode = this.head;

    while( currentNode.next ) {
      currentNode = currentNode.next;
    }

    currentNode.next = newNode;
  } else {
    this.head = newNode;
  }

  return this;
};

LinkedList.prototype.pop = function() {
  var removedNode;

  if ( !this.head ) {
    return null;
  } else if( !this.head.next ) {
    removedNode = this.head;
    this.head = null;
    return removedNode;
  } else {
    // move through the linked list to the last element
    var lastElement;
    var currentElement = this.head;

    while( currentElement.next ) {
      lastElement = currentElement;
      currentElement = currentElement.next;
    }

    // remove reference to the element
    removedNode = lastElement.next;
    lastElement.next = null;
    // return the node
    return removedNode;
  }
};

LinkedList.prototype.remove = function( nodeVal ) {
  var currentNode = this.head;

  if ( !currentNode ) {
    return false;
  } else if ( currentNode.val === nodeVal ) {
    this.head = this.head.next;
    return true;
  }

  while( currentNode.next ) {
    if ( currentNode.next.val === nodeVal ) {
      currentNode.next = currentNode.next.next;
      return true;
    } else {
      currentNode = currentNode.next;
    }
  }

  return false;
};

LinkedList.prototype.reverse = function() {
  var nodes = [];

  if ( !this.head || !this.head.next ) {
    return this;
  }

  // get all nodes
  var currentNode = this.head;

  while( currentNode.next ) {
    nodes.push( currentNode );
    currentNode = currentNode.next;
  }

  nodes.push( currentNode );

  var newList = new LinkedList();

  while( nodes.length > 0 ) {
    var node = nodes.pop();
    newList.push( node.val );
  }

  return newList;
};

LinkedList.prototype.reverseInPlace = function() {
  if ( !this.head || !this.head.next ) {
    return this;
  }

  var current = this.head;
  var next = this.head.next;
  // make current head the tail
  current.next= null;
  var oldList;

  while( next ) {
    oldList = next.next;
    next.next = current; // reverse
    current = next;
    next = oldList;
  }

  this.head = current;

  return this;
};