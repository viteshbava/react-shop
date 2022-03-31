import ReactDOM from 'react-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import styles from './FloatingAlerts.module.css';
import FloatingAlert from './FloatingAlert';
import Alert from './Alert';

import { uiActions } from '../../../redux/slices/ui-slice';

// const OneAlert = ({ alert }) => {
//   const nodeRef = useRef();
//   const dispatch = useDispatch();

//   return (
//     <CSSTransition
//       nodeRef={nodeRef}
//       timeout={500}
//       classNames={{
//         enter: styles.enter,
//         enterActive: styles.enterActive,
//         exit: styles.exit,
//         exitActive: styles.exitActive,
//       }}
//     >
//       <button
//         ref={nodeRef}
//         onClick={() => dispatch(uiActions.removeAlert(alert.id))}
//         type="button"
//       >
//         {alert.title}
//       </button>
//     </CSSTransition>
//   );
// };

const FloatingAlerts = ({ alerts }) =>
  ReactDOM.createPortal(
    <div className={styles.wrapper}>
      {alerts.map((alert) => (
        <FloatingAlert key={alert.id} alert={alert} />
      ))}
    </div>,
    document.querySelector('#alert-root')
  );

// const FloatingAlerts = ({ alerts }) => {
//   console.log('Alerts received FloatingAlerts: ', alerts);
//   return ReactDOM.createPortal(
//     <TransitionGroup className={styles.wrapper}>
//       {alerts.map((alert) => (
//         <OneAlert key={alert.id} alert={alert} />
//       ))}
//     </TransitionGroup>,
//     document.querySelector('#alert-root')
//   );
// };

//   const dispatch = useDispatch();
//   const [showFloatingAlerts, setShowFloatingAlerts] = useState(true);

//   // const alertList = alerts.map((alert) => (
//   //   <CSSTransition key={alert.id}>
//   //     <FloatingAlert key={alert.id} alert={alert} />
//   //     {/* <button
//   //       onClick={() => dispatch(uiActions.removeAlert(alert.id))}
//   //       type="button"
//   //     >
//   //       alert.message
//   //     </button> */}
//   //   </CSSTransition>
//   // ));

//   useEffect(() => {
//     if (!alerts.length) setShowFloatingAlerts(false);
//   }, [alerts.length]);

//   const closeFloatingAlerts = () => {
//     if (!alerts.length) setShowFloatingAlerts(false);
//   };

//   if (!showFloatingAlerts) return null;

//   console.log('Alerts received FloatingAlerts: ', alerts);
//   return ReactDOM.createPortal(
//     <TransitionGroup className={styles.wrapper}>
//       {alerts.map((alert) => (
//         <CSSTransition
//           key={alert.id}
//           timeout={5000}
//           classNames={{
//             enter: styles.enter,
//             enterActive: styles.enterActive,
//             exit: styles.exit,
//             exitActive: styles.exitActive,
//           }}
//           onExited={closeFloatingAlerts}
//         >
//           <button
//             onClick={() => dispatch(uiActions.removeAlert(alert.id))}
//             type="button"
//           >
//             {alert.title}
//           </button>
//         </CSSTransition>
//       ))}
//     </TransitionGroup>,
//     document.querySelector('#alert-root')

//     // console.log('Alerts received FloatingAlerts: ', alerts);
//     // return ReactDOM.createPortal(
//     //   <TransitionGroup className={styles.wrapper}>
//     //     {alerts.map((alert) => {
//     //       console.log('Alert being passed to FloatingAlert: ', alert);
//     //       return <FloatingAlert key={alert.id} alert={alert} />;
//     //     })}
//     //   </TransitionGroup>,
//     //   document.querySelector('#alert-root')
//   );
// };

export default FloatingAlerts;
