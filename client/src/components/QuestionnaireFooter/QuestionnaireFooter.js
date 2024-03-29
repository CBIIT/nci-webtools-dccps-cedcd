import React from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

export default function QuestionnaireFooter({
  isAdmin,
  handleNext,
  handlePrevious,
  handleApprove,
  handleReject,
  handleSave,
  handleSaveContinue,
  handleSubmitForReview,
}) {
  const user = useSelector((state) => state.user);
  const section = useSelector((state) => state.sectionReducer);
  const cohortStatus = useSelector((state) => state.cohort.status);
  const saveDisabled = ["submitted", "in review"].includes(cohortStatus);
  const sectionsIncomplete = [section.A, section.B, section.C, section.D, section.E, section.F, section.G].some(
    (status) => status !== "complete",
  );
  const submitForReviewDisabled = ["published", "submitted", "in review"].includes(cohortStatus) || sectionsIncomplete;
  const approveOrRejectDisabled = !["submitted", "in review"].includes(cohortStatus) || sectionsIncomplete;
  const noop = (e) => {};

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Row className="mx-0 my-3">
      <Button
        variant="primary"
        className="col-lg-2 col-md-6"
        onClick={(e) => {
          e.preventDefault();
          if (handlePrevious) {
            handlePrevious();
            scrollToTop();
          }
        }}
        disabled={!handlePrevious}>
        Previous
      </Button>

      <Button
        variant="primary"
        className="col-lg-2 col-md-6 mr-auto"
        onClick={(e) => {
          e.preventDefault();
          if (handleNext) {
            handleNext();
            scrollToTop();
          }
        }}
        disabled={!handleNext}>
        Next
      </Button>

      <div className="w-100 d-block d-lg-none mb-2" />

      {isAdmin && /SystemAdmin/.test(user.role) ? (
        <>
          <Button
            variant="primary"
            className="col-lg-2 col-md-6"
            disabled={approveOrRejectDisabled || !handleApprove}
            onClick={handleApprove || noop}>
            Approve
          </Button>
          <Button
            variant="primary"
            className="col-lg-2 col-md-6"
            disabled={approveOrRejectDisabled || !handleReject}
            onClick={handleReject || noop}>
            Reject
          </Button>
        </>
      ) : (
        <>
          <Button
            className="col-lg-2 col-md-4"
            variant="primary"
            disabled={saveDisabled || !handleSave}
            onClick={handleSave || noop}>
            Save
          </Button>

          <Button
            className="col-lg-2 col-md-4"
            variant="primary"
            disabled={saveDisabled || !handleSaveContinue}
            onClick={(e) => {
              e.preventDefault();
              if (handleSaveContinue) {
                handleSaveContinue();
                scrollToTop();
              }
            }}>
            Save &amp; Continue
          </Button>

          <Button
            className="col-lg-2 col-md-4"
            variant="primary"
            disabled={submitForReviewDisabled || !handleSubmitForReview}
            onClick={handleSubmitForReview || noop}>
            Submit For Review
          </Button>
        </>
      )}
    </Row>
  );
}
