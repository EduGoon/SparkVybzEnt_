import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

interface PageTransitionProps {
  children: React.ReactNode;
  locationKey: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, locationKey }) => (
  <SwitchTransition mode="out-in">
    <CSSTransition
      key={locationKey}
      timeout={350}
      classNames="fade"
      unmountOnExit
    >
      <div>{children}</div>
    </CSSTransition>
  </SwitchTransition>
);

export default PageTransition;
