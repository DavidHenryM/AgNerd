import { forwardRef, Ref, useEffect } from "react";

const DynamicComponent = forwardRef<unknown, HTMLButtonElement>((props, ref) => {
  useEffect(() => {
    console.log('Ref in DynamicComponent:', ref);
  }, [ref]);

  if (!ref) {
    return (<div>No ref provided</div>);
  } else {
    return (
      <div ref={ref as Ref<HTMLDivElement>}>
        {/* Or apply the ref to an internal element/component instance */}
        <p>Hi from Dynamic Component</p>
      </div>
    );
  }
});

DynamicComponent.displayName = 'DynamicComponent';
export default DynamicComponent;