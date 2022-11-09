// import { useEffect, useRef } from 'react';
// import { createPortal } from 'react-dom';

// export const Portal = ({ children }) => {
//   const elRef = useRef(null);

//   if (!elRef.current) {
//     elRef.current = document.createElement('div');
//   }

//   useEffect(() => {
//     const portalRoot = document.getElementById('portal');
//     portalRoot.appendChild(elRef.current);

//     return () => portalRoot.removeChild(elRef.current);
//   }, []);

//   return createPortal(<div>{children}</div>, elRef.current);
// };
