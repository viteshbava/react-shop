import { useState, useEffect, cloneElement } from 'react';

const AnimateList = ({ children, unmountList }) => {
  // currentChildren are the actual children that are rendered, even if the external state is empty (because we want to wait for animating to finish)
  const [currentChildren, setCurrentChildren] = useState(children);

  // When all animations have finished and there are no more children left to render, call unmountList function.  This should set state in the parent component to unmount the list.
  useEffect(() => {
    if (!currentChildren.length) unmountList();
  }, [currentChildren.length, unmountList]);

  // NOTE: this code not fully tested yet...
  // Extract elements from children that are new (i.e. do not yet exist in currentChildren)
  // Using a set here for efficency reasons
  const currKeySet = new Set(currentChildren.map((child) => child.key));
  const newChildren = children.filter((child) => !currKeySet.has(child.key));

  // Add new children (if any) to currentChildren
  useEffect(() => {
    if (newChildren.length > 0)
      setCurrentChildren((prev) => [...prev, ...newChildren]);
  }, [newChildren]);

  // get keySet for children
  // Using a set here for efficency reasons
  const newKeySet = new Set(children.map((child) => child.key));

  // returnChildren: For each element in currentChildren, check if its key lives in children: if yes, show=true, if no, show=false
  // also include a onClose function that will be used at end of animating out to remove the element from currentChildren
  const returnChildren = currentChildren.map((child) =>
    cloneElement(child, {
      isMounted: newKeySet.has(child.key),
      onClose: () =>
        setCurrentChildren((prev) => prev.filter((c) => c.key !== child.key)),
    })
  );

  return returnChildren;
};

export default AnimateList;
