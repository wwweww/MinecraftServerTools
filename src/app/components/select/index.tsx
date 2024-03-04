export interface SelectProps {
    title: string,
    onChange: (value: string) => any,
    placeholder: string,
    icon: JSX.Element,
    className?: string | undefined,
    extensions: string[],
    windowTitle: string,
}

export interface InputProps {
    title: string,
    onChange: (value: string) => any,
    placeholder: string,
    className?: string | undefined,
    defaultValue?: string
}

