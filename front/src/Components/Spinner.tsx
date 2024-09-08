import React, {CSSProperties} from "react";
import {ClockLoader, HashLoader} from "react-spinners";

const override: CSSProperties = {
    display: "block",
    marginLeft: '10px',
    borderColor: "red",
};

type LoaderType = 'clock' | 'hash';

interface SpinnerProps {
    color?: string;
    loader?: LoaderType;
    size?: number
}

const Spinner: React.FC<SpinnerProps> = ({color = 'blue', loader, size}: SpinnerProps) => {

    const loaderMap = {
        clock: ClockLoader,
        hash: HashLoader,
    };

    const LoaderComponent = loaderMap[loader] || ClockLoader;

    return (
        <LoaderComponent
            color={color}
            loading={true}
            cssOverride={override}
            size={size || 75}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
};

export default Spinner;