import React from "react";

const ProjectWindow = (isOpen) => {

    return (
        <>
            {isOpen && <div className="project-window"></div>}
        </>
    )
}

export default ProjectWindow;