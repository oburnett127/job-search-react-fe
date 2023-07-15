/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Application } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ApplicationUpdateForm(props) {
  const {
    id: idProp,
    application: applicationModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    applicant_id: "",
    job_id: "",
  };
  const [applicant_id, setApplicant_id] = React.useState(
    initialValues.applicant_id
  );
  const [job_id, setJob_id] = React.useState(initialValues.job_id);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = applicationRecord
      ? { ...initialValues, ...applicationRecord }
      : initialValues;
    setApplicant_id(cleanValues.applicant_id);
    setJob_id(cleanValues.job_id);
    setErrors({});
  };
  const [applicationRecord, setApplicationRecord] =
    React.useState(applicationModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Application, idProp)
        : applicationModelProp;
      setApplicationRecord(record);
    };
    queryData();
  }, [idProp, applicationModelProp]);
  React.useEffect(resetStateValues, [applicationRecord]);
  const validations = {
    applicant_id: [{ type: "Required" }],
    job_id: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          applicant_id,
          job_id,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Application.copyOf(applicationRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ApplicationUpdateForm")}
      {...rest}
    >
      <TextField
        label="Applicant id"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={applicant_id}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              applicant_id: value,
              job_id,
            };
            const result = onChange(modelFields);
            value = result?.applicant_id ?? value;
          }
          if (errors.applicant_id?.hasError) {
            runValidationTasks("applicant_id", value);
          }
          setApplicant_id(value);
        }}
        onBlur={() => runValidationTasks("applicant_id", applicant_id)}
        errorMessage={errors.applicant_id?.errorMessage}
        hasError={errors.applicant_id?.hasError}
        {...getOverrideProps(overrides, "applicant_id")}
      ></TextField>
      <TextField
        label="Job id"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={job_id}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              applicant_id,
              job_id: value,
            };
            const result = onChange(modelFields);
            value = result?.job_id ?? value;
          }
          if (errors.job_id?.hasError) {
            runValidationTasks("job_id", value);
          }
          setJob_id(value);
        }}
        onBlur={() => runValidationTasks("job_id", job_id)}
        errorMessage={errors.job_id?.errorMessage}
        hasError={errors.job_id?.hasError}
        {...getOverrideProps(overrides, "job_id")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || applicationModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || applicationModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
