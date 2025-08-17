import React, { useEffect, useState, useMemo } from "react";
import "./Candidates.css";
import CandidateHeader from "./CandidateHeader";
import AddCandidateModal from "../../components/modal/AddCandidateModal";
import api from "../../utils/axios.utils";
import moreIcon from "../../assets/icons/more.svg";

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "", position: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const statusOptions = ["New", "Ongoing", "Onboarding", "Selected", "Rejected"];

  // Fetch candidates
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await api.get("/api/v1/candidates");
        setCandidates(response.data.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  // Handle status change
  const handleStatusChange = async (candidateId, newStatus) => {
    try {
      await api.post(`/api/v1/candidates/update/${candidateId}`, { status: newStatus });
      setCandidates(prev =>
        prev.map(c => (c._id === candidateId ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleAddCandidate = (newCandidate) => {
    console.log(newCandidate)
    setCandidates((prev) => [newCandidate, ...prev]);
  };

  // Filter + Search
  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      const matchesStatus = filters.status ? c.status === filters.status : true;
      const matchesPosition = filters.position ? c.position === filters.position : true;
      const matchesSearch =
        c.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesPosition && matchesSearch;
    });
  }, [candidates, filters, searchTerm]);

  return (
    <>
      <CandidateHeader filters={filters} setFilters={setFilters} onSearch={setSearchTerm} />
      <AddCandidateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddCandidate} />

      <div className="candidates">
        <table className="data-table">
          <thead>
            <tr>
              <th>Sr no.</th>
              <th>Candidate Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Status</th>
              <th>Experience</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="loading">Loading candidates...</td>
              </tr>
            ) : filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate, index) => (
                <tr key={candidate._id || index}>
                  <td>{index + 1}</td>
                  <td>{candidate.fullname}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.phone}</td>
                  <td>{candidate.position}</td>
                  <td>
                    <select value={candidate.status} onChange={(e) => handleStatusChange(candidate._id, e.target.value)} className="dropdown">
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td>{candidate.experience} yrs</td>
                  <td><img src={moreIcon} alt="" /></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">No candidates found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Candidates;
