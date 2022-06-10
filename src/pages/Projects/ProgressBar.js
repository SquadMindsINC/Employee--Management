import React from 'react';


const ProgressBar = () => {
  return (
    <div>
      <div className="container">
        <h2 style={{ textShadow: '0 0 3px pink, 0 0 5px skyblue' }}>Project Status</h2>
        <div className="progress">
          <div className="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ width: "40%" }}>
            Project A 40% Complete
          </div>
        </div>
        <div className="progress">
          <div className="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ width: "50%" }}>
            Project B 50% Complete
          </div>
        </div>
        <div className="progress">
          <div className="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "60%" }}>
            Project C  60% Complete
          </div>
        </div>
        <div className="progress">
          <div className="progress-bar progress-bar-danger progress-bar-striped" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: "70%" }}>
            Project D 70% Complete
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar;