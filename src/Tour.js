import React, { useReducer, useEffect } from "react";
import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import Button from '@material-ui/core/Button';

// Define the steps
const TOUR_STEPS = [
  {
    target: '.shaker',
    content: 'Click the yellow die to randomize the initial configuration.',
    disableBeacon:true,
    disableOverlayClose: true,
    spotlightClicks: true,
  },
  {
    target: '.ask-for-help',
    content: 'Click to reveal details about this attribute.',
    disableOverlayClose: true,
    spotlightClicks: true,
  },
  {
    target: '.ditch-attribute',
    content: 'Click to remove your customizations. ',
    disableOverlayClose: true,
    spotlightClicks: true,
  },
  {
    target: '.sidebar-toggler',
    content: 'Click to toggle attribute selection menu.',
    disableOverlayClose: true,
    spotlightClicks: true,
  },
  {
    target: '.interactive',
    content: 'Click on an attribute to customize its parameters.',
    disableOverlayClose: true,
    spotlightClicks: true,
  },
  {
    target: 'input',
    content: 'When you are satisfide with your customizations, enter your email and click create!',
    disableBeacon:true,
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
const Tour = () => {
  const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);
  useEffect(() => {
    if (!localStorage.getItem("tour")) {
      // dispatch({ type: "START" });
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
      <Button
        variant="contained"
        className="tour-button"
        onClick={startTour}
        >
        Start Tour
      </Button>
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

           // modal arrow and background color
           arrowColor: "#eee",
           backgroundColor: "#eee",
           // page overlay color
           overlayColor: "rgba(0, 26, 79, 0.4)",
           //button color
           primaryColor: "blue",
           //text color
           textColor: "black",
           //width of modal
           width: 500,
           //zindex of modal
           zIndex: 1000
        }}
        locale={{
          last: "End tour",
          skip: "Close tour"}}
        showProgress={true}
      />
    </>
  );
};
export default Tour;
