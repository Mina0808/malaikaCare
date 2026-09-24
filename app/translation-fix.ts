"use client";
if (typeof Node === "function" && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild;
  // @ts-expect-error
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      if (console) {
        console.error(
          "Cannot remove a child from a different parent",
          child,
          this,
        );
      }
      return child;
    }
    // @ts-expect-error
    return originalRemoveChild.apply(this, arguments);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  // @ts-expect-error
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (console) {
        console.error(
          "Cannot insert before a reference node from a different parent",
          referenceNode,
          this,
        );
      }
      return newNode;
    }
    // @ts-expect-error
    return originalInsertBefore.apply(this, arguments);
  };
}
