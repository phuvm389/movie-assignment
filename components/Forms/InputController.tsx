import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { InputControllerProps } from "./InputController.interface";
import { NumberFormatValues, NumericFormat } from "react-number-format";

export const InputController = (props: InputControllerProps) => {
  const { control } = useFormContext();

  return (
    <div className="relative w-full mb-3">
      <label
        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <Controller
        name={props.name}
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <>
            {props.type === "number" && (
              <NumericFormat
                onValueChange={(values: NumberFormatValues) =>
                  field.onChange(values.floatValue)
                }
                value={field.value}
                placeholder={props.placeholder}
                id={props.id}
                thousandSeparator={true}
                decimalScale={3}
                fixedDecimalScale={true}
                allowNegative={false}
              />
            )}
            {props.type === "textarea" && (
              <textarea
                rows={4}
                cols={50}
                onChange={field.onChange}
                value={field.value}
                placeholder={props.placeholder}
                id={props.id}
              />
            )}
            {props.type !== "textarea" && props.type !== "number" && (
              <input
                onChange={field.onChange}
                value={field.value}
                type={props.type ?? "text"}
                placeholder={props.placeholder}
                id={props.id}
              />
            )}
            {fieldState?.error?.type && (
              <p className="text-red-500">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};
