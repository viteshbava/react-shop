/* NOTE: have included disabling of eslint rule in this file: eslint-disable-next-line @typescript-eslint/no-explicit-any
   TODO: return to these disables to follow TypeScript/eslint rules correctly
*/

import React, { useState, useEffect, cloneElement } from 'react';

interface PropTypes {
  children: React.ReactNode | React.ReactNode[];
  unmountList: () => void;
  wrapper: 'div' | 'ul';
}

const AnimateList = ({
  children,
  wrapper: Wrapper,
  unmountList,
}: PropTypes) => {
  // currentChildren are the actual children that are rendered, even if the external state is empty (because we want to wait for animating to finish)
  const [currentChildren, setCurrentChildren] = useState(children);

  // When all animations have finished and there are no more children left to render, call unmountList function.  This should set state in the parent component to unmount the list.
  useEffect(() => {
    if (!(currentChildren as React.ReactNode[]).length) unmountList();
  }, [currentChildren, unmountList]);

  // Extract elements from children that are new (i.e. do not yet exist in currentChildren)
  // Using a set here for efficency reasons
  const currKeySet = new Set(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (currentChildren as React.ReactNode[]).map((child: any) => child?.key)
  );
  const newChildren = (children as React.ReactNode[]).filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (child: any) => !currKeySet.has(child?.key)
  );

  // Add new children (if any) to currentChildren
  useEffect(() => {
    if (newChildren.length > 0)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setCurrentChildren((prev: any) => [...prev, ...newChildren]);
  }, [newChildren]);

  // get keySet for children
  // Using a set here for efficency reasons
  const newKeySet = new Set(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (children as React.ReactNode[]).map((child: any) => child.key)
  );

  // returnChildren: For each element in currentChildren, check if its key lives in children: if yes, show=true, if no, show=false
  // also include a onClose function that will be used at end of animating out to remove the element from currentChildren
  const returnChildren = (currentChildren as React.ReactNode[]).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (child: any) =>
      cloneElement(child, {
        isMounted: newKeySet.has(child.key),
        onClose: () =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setCurrentChildren((prev: any) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            prev.filter((c: any) => c.key !== child.key)
          ),
      })
  );

  return <Wrapper>{returnChildren}</Wrapper>;
};

export default AnimateList;
