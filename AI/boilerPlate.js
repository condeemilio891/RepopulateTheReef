// Base Node Class (All behavior tree nodes inherit from this)
class BTNode {
  constructor() {
    this.parent = null;        // Parent node reference
    this.children = [];        // Child nodes (for composites/decorators)
    this._state = 'idle';      // 'idle' | 'running' | 'success' | 'failure'
  }

  // Main execution method (to be overridden)
  tick(blackboard) {
    throw new Error('tick() must be implemented by subclass');
  }

  // Reset node state
  reset() {
    this.state = 'autoPilot';
  }
}

// Behavior Tree Class (Manages execution)
class BehaviorTree {
  constructor(rootNode, blackboard) {
    this.root = rootNode;
    this.blackboard = blackboard;
    this.runningNode = null; // Track currently running node
  }

  update() {
    if (!this.runningNode) {
      this.runningNode = this.root; // Start from root if no active node
    }

    const result = this.runningNode.tick(this.blackboard);
    this.handleResult(result);
  }

  handleResult(result) {
    if (result !== 'running') {
      this.root.reset(); // Full reset when sequence completes
      this.runningNode = null;
    }
  }

}


class Sequence extends BTNode {
  constructor(children = []) { // Accept children array
    super();
    this.children = children;
    this.currentChildIndex = 0;
  }

  tick(blackboard) {
    while (this.currentChildIndex < this.children.length) {
      const child = this.children[this.currentChildIndex];
      const result = child.tick(blackboard);

      if (result === 'running') return 'running';
      if (result === 'failure') {
        this.reset();
        return 'failure';
      }
      
      this.currentChildIndex++;
    }
    
    this.reset();
    return 'success';
  }

  reset() {
    super.reset();
    this.currentChildIndex = 0;
    this.children.forEach(child => child.reset());
  }
}



class Selector extends BTNode {
    constructor(children = []) { // Accept children array
    super();
    this.children = children;
    this.currentChildIndex = 0;
  }

  tick(blackboard) {
    while (this.currentChildIndex < this.children.length) {
      const child = this.children[this.currentChildIndex];
      const result = child.tick(blackboard);

      if (result === 'running') return 'running';
      if (result === 'success') {
        this.reset();
        return 'success';
      }
      
      this.currentChildIndex++;
    }
    
    this.reset();
    return 'failure';
  }

  reset() {
    super.reset();
    this.currentChildIndex = 0;
    this.children.forEach(child => child.reset());
  }
}



class Inverter extends BTNode {
  constructor(child) {
    super();
    this.children = [child];
  }

  tick(blackboard) {
    const result = this.children[0].tick(blackboard);
    return result === 'success' ? 'failure' : 'success';
  }
}

class Repeat extends BTNode {
  constructor(child) {
    super();
    this.children = [child]; // Store SINGLE child in array
  }

  tick(blackboard) {
    const result = this.children[0].tick(blackboard);
    if (result !== 'running') {
      this.children[0].reset();
    }
    return 'running';
  }

  reset() {
    super.reset();
    this.children[0].reset();
  }
}

