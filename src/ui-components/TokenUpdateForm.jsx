/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Token } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function TokenUpdateForm(props) {
  const {
    id: idProp,
    token: tokenModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    expired: "",
    revoked: "",
    token: "",
    token_type: "",
    user_id: "",
  };
  const [expired, setExpired] = React.useState(initialValues.expired);
  const [revoked, setRevoked] = React.useState(initialValues.revoked);
  const [token, setToken] = React.useState(initialValues.token);
  const [token_type, setToken_type] = React.useState(initialValues.token_type);
  const [user_id, setUser_id] = React.useState(initialValues.user_id);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = tokenRecord
      ? { ...initialValues, ...tokenRecord }
      : initialValues;
    setExpired(cleanValues.expired);
    setRevoked(cleanValues.revoked);
    setToken(cleanValues.token);
    setToken_type(cleanValues.token_type);
    setUser_id(cleanValues.user_id);
    setErrors({});
  };
  const [tokenRecord, setTokenRecord] = React.useState(tokenModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Token, idProp)
        : tokenModelProp;
      setTokenRecord(record);
    };
    queryData();
  }, [idProp, tokenModelProp]);
  React.useEffect(resetStateValues, [tokenRecord]);
  const validations = {
    expired: [{ type: "Required" }],
    revoked: [{ type: "Required" }],
    token: [],
    token_type: [],
    user_id: [],
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
          expired,
          revoked,
          token,
          token_type,
          user_id,
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
            Token.copyOf(tokenRecord, (updated) => {
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
      {...getOverrideProps(overrides, "TokenUpdateForm")}
      {...rest}
    >
      <TextField
        label="Expired"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={expired}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              expired: value,
              revoked,
              token,
              token_type,
              user_id,
            };
            const result = onChange(modelFields);
            value = result?.expired ?? value;
          }
          if (errors.expired?.hasError) {
            runValidationTasks("expired", value);
          }
          setExpired(value);
        }}
        onBlur={() => runValidationTasks("expired", expired)}
        errorMessage={errors.expired?.errorMessage}
        hasError={errors.expired?.hasError}
        {...getOverrideProps(overrides, "expired")}
      ></TextField>
      <TextField
        label="Revoked"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={revoked}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              expired,
              revoked: value,
              token,
              token_type,
              user_id,
            };
            const result = onChange(modelFields);
            value = result?.revoked ?? value;
          }
          if (errors.revoked?.hasError) {
            runValidationTasks("revoked", value);
          }
          setRevoked(value);
        }}
        onBlur={() => runValidationTasks("revoked", revoked)}
        errorMessage={errors.revoked?.errorMessage}
        hasError={errors.revoked?.hasError}
        {...getOverrideProps(overrides, "revoked")}
      ></TextField>
      <TextField
        label="Token"
        isRequired={false}
        isReadOnly={false}
        value={token}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              expired,
              revoked,
              token: value,
              token_type,
              user_id,
            };
            const result = onChange(modelFields);
            value = result?.token ?? value;
          }
          if (errors.token?.hasError) {
            runValidationTasks("token", value);
          }
          setToken(value);
        }}
        onBlur={() => runValidationTasks("token", token)}
        errorMessage={errors.token?.errorMessage}
        hasError={errors.token?.hasError}
        {...getOverrideProps(overrides, "token")}
      ></TextField>
      <TextField
        label="Token type"
        isRequired={false}
        isReadOnly={false}
        value={token_type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              expired,
              revoked,
              token,
              token_type: value,
              user_id,
            };
            const result = onChange(modelFields);
            value = result?.token_type ?? value;
          }
          if (errors.token_type?.hasError) {
            runValidationTasks("token_type", value);
          }
          setToken_type(value);
        }}
        onBlur={() => runValidationTasks("token_type", token_type)}
        errorMessage={errors.token_type?.errorMessage}
        hasError={errors.token_type?.hasError}
        {...getOverrideProps(overrides, "token_type")}
      ></TextField>
      <TextField
        label="User id"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={user_id}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              expired,
              revoked,
              token,
              token_type,
              user_id: value,
            };
            const result = onChange(modelFields);
            value = result?.user_id ?? value;
          }
          if (errors.user_id?.hasError) {
            runValidationTasks("user_id", value);
          }
          setUser_id(value);
        }}
        onBlur={() => runValidationTasks("user_id", user_id)}
        errorMessage={errors.user_id?.errorMessage}
        hasError={errors.user_id?.hasError}
        {...getOverrideProps(overrides, "user_id")}
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
          isDisabled={!(idProp || tokenModelProp)}
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
              !(idProp || tokenModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
