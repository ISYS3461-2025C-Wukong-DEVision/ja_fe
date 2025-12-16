import React, { useState } from "react";
import authService from "../../services/authService";
import { createApplication } from "../../services/applicationService";

const ApplicationCard = ({ job_post_id }) => {
  const [cvFile, setCvFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const currentUser = authService.getCurrentUser();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      alert("Chỉ được upload file PDF");
      return;
    }
    setCvFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cvFile || !coverLetter.trim()) {
      alert("Vui lòng upload CV và viết cover letter");
      return;
    }

    const data = {
      applicant_id: currentUser.id,
      job_post_id,
      description: coverLetter,
      cvFile, // UI trước, backend xử lý sau
    };

    try {
      setLoading(true);
      await createApplication(data);
      alert("Apply job thành công 🎉");
    } catch (error) {
      console.error(error);
      alert("Apply job thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl p-6 bg-white rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">Apply for this position</h2>

      {/* Upload CV */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Upload CV (PDF)
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full text-sm"
        />
      </div>

      {/* Cover Letter */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Cover Letter
        </label>
        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          rows={5}
          placeholder="Write your cover letter here..."
          className="w-full border rounded-md p-2 focus:outline-none focus:ring"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-primary text-white rounded-md hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Apply Now"}
      </button>
    </form>
  );
};

export default ApplicationCard;
