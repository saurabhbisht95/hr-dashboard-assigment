import React from 'react'
import AddCandidateModal from '../../components/modal/AddCandidateModal'

const CandidateHeader = ({ filters, setFilters, onSearch, onAddCandidate }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false)

    const handleOpenCandidateModal = () => {
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
                    <option value="new">New</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="onboarding">Onboarding</option>
                    <option value="selected">Selected</option>
                    <option value="rejected">Rejected</option>
                </select>

                <select
                    className="dropdown"
                    value={filters.position}
                    onChange={(e) => setFilters({ ...filters, position: e.target.value })}
                >
                    <option value="">Position</option>
                    <option value="intern">Intern</option>
                    <option value="fulltime">Full time</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>

                </select>
            </div>

            <div className="right-bottom-header">
                <input
                    type="text"
                    placeholder="Search"
                    className="search-box"
                    onChange={(e) => onSearch(e.target.value)}
                />
                <button className="add-btn" onClick={handleOpenCandidateModal}>
                    Add Candidate
                </button>
            </div>

            {isModalOpen && (
                <AddCandidateModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={onAddCandidate}
                />
            )}
        </div>
    )
}

export default CandidateHeader
