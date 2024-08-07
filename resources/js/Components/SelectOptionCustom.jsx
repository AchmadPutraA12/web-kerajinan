import React from "react";
import { CircleAlert } from "lucide-react";
import { Label } from "./ui/label";

const SelectOptionCustom = ({
    labelName,
    optionMap,
    errors,
    selectOptionProps,
    htmlFor,
    optionName,
    variant,
    className,
}) => {
    return (
        <div className="flex flex-col gap-2">
            {labelName && (
                <Label
                    variant={variant}
                    htmlFor={htmlFor}
                    className="font-medium text-sm"
                >
                    {labelName}
                </Label>
            )}

            <div className="flex items-center gap-4">
                <select
                    className={`w-full text-sm bg-background border-border rounded-lg ${className}`}
                    id={htmlFor}
                    {...selectOptionProps}
                >
                    <option value="">- {optionName} -</option>
                    {optionMap}
                </select>
            </div>
            {errors && (
                <p className="text-sm flex items-center gap-2 text-red-600 bg-red-100 p-2 rounded-lg">
                    <CircleAlert className="w-4 h-4" />
                    <span>{errors}</span>
                </p>
            )}
        </div>
    );
};

export default SelectOptionCustom;
