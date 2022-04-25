import React, { useState, useEffect, cloneElement, useMemo } from 'react';

interface PropTypes {
  children: React.ReactNode;
  unmountList: () => void;
}

const AnimateList = ({ children, unmountList }: PropTypes) => {
  // const adjChildren: JSX.Element = React.Children.toArray(children);

  // let adjChildren: JSX.Element[] = useMemo(() => [], []);
  // if (!Array.isArray(children)) {
  //   adjChildren.push(children);
  // } else {
  //   adjChildren = children;
  // }

  // currentChildren are the actual children that are rendered, even if the external state is empty (because we want to wait for animating to finish)
  const [currentChildren, setCurrentChildren] = useState(children);

  console.log(children);

  // When all animations have finished and there are no more children left to render, call unmountList function.  This should set state in the parent component to unmount the list.
  useEffect(() => {
    if (Array.isArray(currentChildren) && !currentChildren?.length)
      unmountList();
  }, [currentChildren, unmountList]);

  // Add new children (if any) to currentChildren
  useEffect(() => {
    // Extract elements from children that are new (i.e. do not yet exist in currentChildren)
    // Using a set here for efficency reasons
    const currKeySet = new Set(
      React.Children.map(currentChildren, (child) => child.key)
    );
    const newChildren = React.Children.toArray(children).filter(
      (child) => !currKeySet.has(child.key)
    );
    if (newChildren.length > 0)
      setCurrentChildren((prev) => [...prev, ...newChildren]);
  }, [children, currentChildren]);

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
