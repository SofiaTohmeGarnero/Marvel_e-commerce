import { render } from "@testing-library/react";
import { FC, PropsWithChildren, ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";

export function renderWithReactHookForm(ui: ReactElement, {defaultValues = {}} = {}) {
    
    const Wrapper: FC<PropsWithChildren> = ({children}) => {
        const methods = useForm({defaultValues});
        return <FormProvider {...methods}>{children}</FormProvider>
    }

    return {
        ...render(ui, {wrapper: Wrapper})
    }
}