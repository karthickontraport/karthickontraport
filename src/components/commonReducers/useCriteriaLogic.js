import React, { useReducer, useCallback, useEffect } from "react";

const criteriaReducer = (state, action) => {
  const updatedCriteria = [...state.criteria];

  switch (action.type) {
    case "FIELD_CHANGE":
      updatedCriteria[action.index].field = action.value;
      break;
    case "OPERATOR_CHANGE":
      updatedCriteria[action.index].operator = action.value;
      break;
    case "VALUE_CHANGE":
      updatedCriteria[action.index].value = action.value;
      break;
    case "CONDITION_CHANGE":
      updatedCriteria[action.index].condition = action.value;
      break;
    case "ADD_CRITERION":
      updatedCriteria.push({
        field: "",
        operator: "",
        value: "",
        condition: "AND",
      });
      break;
    case "REMOVE_CRITERION":
      if (updatedCriteria.length > 1) {
        updatedCriteria.splice(action.index, 1);
      }
      break;
    case "COPY_CRITERION":
      const copiedCriterion = { ...updatedCriteria[action.index] };
      updatedCriteria.push(copiedCriterion);
      break;
    case "CLEAR_CRITERIA":
      return {
        groupName: "",
        criteria: [{ field: "", operator: "", value: "", condition: "AND" }],
      };
    case "SET_GROUP_NAME":
      return { ...state, groupName: action.value };
    default:
      return state;
  }

  return { ...state, criteria: updatedCriteria };
};

const useCriteriaLogic = () => {
  const initialState = {
    groupName: "",
    criteria: [{ field: "", operator: "", value: "", condition: "AND" }],
  };

  const [state, dispatch] = useReducer(criteriaReducer, initialState);

  const handleChange = (type, index, value) => {
    dispatch({ type, index, value });
  };

  const handleFieldChange = useCallback(
    (index, newField) => handleChange("FIELD_CHANGE", index, newField),
    []
  );
  const handleOperatorChange = useCallback(
    (index, newOperator) => handleChange("OPERATOR_CHANGE", index, newOperator),
    []
  );
  const handleValueChange = useCallback(
    (index, newValue) => handleChange("VALUE_CHANGE", index, newValue),
    []
  );
  const handleConditionChange = useCallback(
    (index, newCondition) =>
      handleChange("CONDITION_CHANGE", index, newCondition),
    []
  );

  const addCriterion = useCallback(
    () => dispatch({ type: "ADD_CRITERION" }),
    []
  );
  const removeCriterion = useCallback(
    (index) => dispatch({ type: "REMOVE_CRITERION", index }),
    []
  );
  const copyCriterion = useCallback(
    (index) => dispatch({ type: "COPY_CRITERION", index }),
    []
  );
  const clearCriteria = useCallback(
    () => dispatch({ type: "CLEAR_CRITERIA" }),
    []
  );
  const setGroupName = useCallback(
    (value) => dispatch({ type: "SET_GROUP_NAME", value }),
    []
  );

  // Use effect to store the criteria data and group name in local storage
  useEffect(() => {
    localStorage.setItem("criteriaData", JSON.stringify(state.criteria));
    localStorage.setItem("groupName", state.groupName);
  }, [state.criteria, state.groupName]);

  return {
    groupName: state.groupName,
    criteria: state.criteria,
    handleFieldChange,
    handleOperatorChange,
    handleValueChange,
    handleConditionChange,
    addCriterion,
    removeCriterion,
    copyCriterion,
    clearCriteria,
    setGroupName,
  };
};

export default useCriteriaLogic;
