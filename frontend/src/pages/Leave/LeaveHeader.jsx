import React from 'react'
import AddLeaveModal from '../../components/modal/AddLeaveModal'

const LeaveHeader = ({ filters, setFilters, onSearch, onAddCandidate }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    const handleOpenLeaveModal = () => {
        setIsModalOpen(true)
    }

    return (
        <div className="bottom-header">
            <div className="left-bottom-header">
                <select
                    className="dropdown"
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                    <option value="">Status</option>
                               <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
         
                </select>
            </div>

            <div className="right-bottom-header">
                <input
                    type="text"
                    placeholder="Search"
                    className="search-box"
                    onChange={(e) => onSearch(e.target.value)}
                />
                <button className="add-btn" onClick={handleOpenLeaveModal}>
                    Add Leave
                </button>
            </div>

            {isModalOpen && (
                <AddLeaveModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={onAddCandidate}
                />
            )}
        </div>
    )
}

export default LeaveHeader
