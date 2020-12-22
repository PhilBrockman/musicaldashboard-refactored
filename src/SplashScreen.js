import React, { useReducer, useEffect } from "react";
import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";

// Define the steps
const TOUR_STEPS = [
  {
    target: ".tour-button",
    content: "Want to take the tour?",
    disableBeacon:true,
    spotlightClicks: true,
  }
];

// Define our state
const INITIAL_STATE = {
  key: new Date(),
  run: false,
  continuous: true,
  loading: false,
  stepIndex: 0,
  steps: TOUR_STEPS,
};

// Set up the reducer function
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START":
      return { ...state, run: true };
    case "RESET":
      return { ...state, stepIndex: 0 };
    case "STOP":
      return { ...state, run: false };
    case "NEXT_OR_PREV":
      return { ...state, ...action.payload };
    case "RESTART":
      return {
        ...state,
        stepIndex: 0,
        run: true,
        loading: false,
        key: new Date(),
      };
    default:
      return state;
  }
};

// Define the Tour component
const SplashScreen = () => {
  const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);
  useEffect(() => {
    if (!localStorage.getItem("tour")) {
      dispatch({ type: "START" });
    }
  }, []);
  const callback = (data) => {
    const { action, index, type, status } = data;
    if (
      action === ACTIONS.CLOSE ||
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      dispatch({ type: "STOP" });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      dispatch({
        type: "NEXT_OR_PREV",
        payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) },
      });
    }
  };
  const startTour = () => {
    dispatch({ type: "RESTART" });
  };
  return (
    <>
      <JoyRide
        {...tourState}
        callback={callback}
        showSkipButton={true}
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },

          buttonBack: {
            marginRight: 10,
          },
          overlayColor: 'rgba(52, 0, 0, 0.5)',
          options: {
            arrowColor: '#e3ffeb',
            backgroundColor: '#e3ffeb',
            overlayColor: 'rgba(79, 26, 0, 0.0)',
            primaryColor: '#000',
            textColor: '#004a14',
            width: 900,
            zIndex: 1000,
          }

        }}
        locale={{
          last: "Naw, I'm ready to roll the dice",
        }}
      />
    </>
  );
};
export default SplashScreen;
