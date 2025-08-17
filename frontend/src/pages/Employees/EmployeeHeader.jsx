import React from 'react'

const EmployeeHeader = ({ filters, setFilters, onSearch }) => {
    return (
        <div className="bottom-header">
            <div className="left-bottom-header">
               <select
                    className="dropdown"
                    value={filters.position}
                    onChange={(e) => setFilters({ ...filters, position: e.target.value })}
                >
                    <option value="">Position</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                </select>
            </div>

            <div className="right-bottom-header">
                <input
                    type="text"
                    placeholder="Search"
                    className="search-box"
                    onChange={(e) => onSearch(e.target.value)}
                />
                {/* <button className="add-btn" onClick={handleOpenCandidateModal}>
                    Add Candidate
                </button> */}
            </div>
          
        </div>
    )
}

export default EmployeeHeader
