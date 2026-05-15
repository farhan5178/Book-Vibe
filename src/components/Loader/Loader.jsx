import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
            <span className="loading loading-bars loading-lg text-green-500"></span>
        </div>
    );
};

export default Loader;
