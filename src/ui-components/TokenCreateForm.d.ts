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
export declare type TokenCreateFormInputValues = {
    expired?: number;
    revoked?: number;
    token?: string;
    token_type?: string;
    user_id?: number;
};
export declare type TokenCreateFormValidationValues = {
    expired?: ValidationFunction<number>;
    revoked?: ValidationFunction<number>;
    token?: ValidationFunction<string>;
    token_type?: ValidationFunction<string>;
    user_id?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TokenCreateFormOverridesProps = {
    TokenCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    expired?: PrimitiveOverrideProps<TextFieldProps>;
    revoked?: PrimitiveOverrideProps<TextFieldProps>;
    token?: PrimitiveOverrideProps<TextFieldProps>;
    token_type?: PrimitiveOverrideProps<TextFieldProps>;
    user_id?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TokenCreateFormProps = React.PropsWithChildren<{
    overrides?: TokenCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TokenCreateFormInputValues) => TokenCreateFormInputValues;
    onSuccess?: (fields: TokenCreateFormInputValues) => void;
    onError?: (fields: TokenCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TokenCreateFormInputValues) => TokenCreateFormInputValues;
    onValidate?: TokenCreateFormValidationValues;
} & React.CSSProperties>;
export default function TokenCreateForm(props: TokenCreateFormProps): React.ReactElement;
