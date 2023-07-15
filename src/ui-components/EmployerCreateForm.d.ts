/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type EmployerCreateFormInputValues = {
    name?: string;
};
export declare type EmployerCreateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmployerCreateFormOverridesProps = {
    EmployerCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmployerCreateFormProps = React.PropsWithChildren<{
    overrides?: EmployerCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EmployerCreateFormInputValues) => EmployerCreateFormInputValues;
    onSuccess?: (fields: EmployerCreateFormInputValues) => void;
    onError?: (fields: EmployerCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmployerCreateFormInputValues) => EmployerCreateFormInputValues;
    onValidate?: EmployerCreateFormValidationValues;
} & React.CSSProperties>;
export default function EmployerCreateForm(props: EmployerCreateFormProps): React.ReactElement;
