/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Token } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TokenUpdateFormInputValues = {
    expired?: number;
    revoked?: number;
    token?: string;
    token_type?: string;
    user_id?: number;
};
export declare type TokenUpdateFormValidationValues = {
    expired?: ValidationFunction<number>;
    revoked?: ValidationFunction<number>;
    token?: ValidationFunction<string>;
    token_type?: ValidationFunction<string>;
    user_id?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TokenUpdateFormOverridesProps = {
    TokenUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    expired?: PrimitiveOverrideProps<TextFieldProps>;
    revoked?: PrimitiveOverrideProps<TextFieldProps>;
    token?: PrimitiveOverrideProps<TextFieldProps>;
    token_type?: PrimitiveOverrideProps<TextFieldProps>;
    user_id?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TokenUpdateFormProps = React.PropsWithChildren<{
    overrides?: TokenUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    token?: Token;
    onSubmit?: (fields: TokenUpdateFormInputValues) => TokenUpdateFormInputValues;
    onSuccess?: (fields: TokenUpdateFormInputValues) => void;
    onError?: (fields: TokenUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TokenUpdateFormInputValues) => TokenUpdateFormInputValues;
    onValidate?: TokenUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TokenUpdateForm(props: TokenUpdateFormProps): React.ReactElement;
