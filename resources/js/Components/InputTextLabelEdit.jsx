import React from "react";
import { Input } from "./ui/input";
import { Info } from "lucide-react";
import { Label } from "./ui/label";

const InputTextLabelEdit = ({
    children,
    labelFor,
    inputId,
    labelText,
    inputProps,
    error,
    variant,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                <div>
                    <Label
                        variant={variant}
                        className="cursor-pointer"
                        htmlFor={labelFor}
                    >
                        {labelText}
                    </Label>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative w-full">
                        {children}
                        <Input className="pl-9" id={inputId} {...inputProps} />
                    </div>
                </div>
            </div>
            <div
                className={`flex font-semibold items-center mr-10 ${error ? "justify-between" : "text-gray-500 justify-end"
                    }`}
            >
                {error && <p className="text-red-500 font-normal">{error}</p>}
            </div>
        </div>
    );
};

export default InputTextLabelEdit;
