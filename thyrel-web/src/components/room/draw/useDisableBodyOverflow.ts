import React from 'react';

/*
  This hook will add style with `overflow: hidden` and remove it on cleanup
*/
export function useDisableBodyOverflow() {
  const styleElementRef = React.useRef(document.createElement('style'));

  React.useEffect(() => {
    const styleElement = styleElementRef.current;

    styleElement.innerHTML = 'body, #root { overflow: hidden; }';

    document.getElementsByTagName('head')[0].appendChild(styleElement);
    return () => {
      document.getElementsByTagName('head')[0].removeChild(styleElement);
    };
  }, []);
}
