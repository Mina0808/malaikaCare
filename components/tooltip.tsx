"use client"
import * as Tooltip from "@radix-ui/react-tooltip";
import React, { ReactNode } from 'react';


const TooltipComponent = ({ msg, children }: { msg: string, children: ReactNode }) => {
    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    {children}
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content className="TooltipContent relate z-20 bg-emerald-400 text-white p-1 rounded-lg whitespace-pre-line" sideOffset={5}>
                        {msg}
                        <Tooltip.Arrow className="TooltipArrow" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
};

export default TooltipComponent;