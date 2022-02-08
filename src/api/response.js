import client from "./client";

const getEvaluationResponse = (evaluationId) =>
  client.get(`/response/evaluation/${evaluationId}`);

const evaluateResponse = (
  responseId,
  coreFunctions,
  supportFunctions,
  attachments,
  feedback,
  faculty,
  facultySignature,
  supervisor,
  supervisorSignature,
  average
) =>
  client.put(`/response/${responseId}`, {
    feedback,
    coreFunctions,
    supportFunctions,
    attachments,
    ratings: { average },
    status: {
      faculty: {
        signature: facultySignature,
        user: faculty,
      },
      intermediateSupervisor: {
        signature: supervisorSignature,
        user: supervisor,
        isApproved: true,
        dateApproved: Date.now(),
      },
    },
  });

const directorApprove = (
  responseid,
  faculty,
  facultySignature,
  supervisor,
  supervisorSignature,
  director,
  directorSignature
) =>
  client.put(`/response/${responseid}`, {
    status: {
      faculty: {
        signature: facultySignature,
        user: faculty,
      },
      intermediateSupervisor: {
        signature: supervisorSignature,
        user: supervisor,
        isApproved: true,
        dateApproved: Date.now(),
      },
      director: {
        signature: directorSignature,
        user: director,
        isApproved: true,
        dateApproved: Date.now(),
      },
    },
  });

const PMTApprove = (
  responseid,
  faculty,
  facultySignature,
  supervisor,
  supervisorSignature,
  director,
  directorSignature,
  PMT,
  PMTSignature
) =>
  client.put(`/response/${responseid}`, {
    status: {
      faculty: {
        signature: facultySignature,
        user: faculty,
      },
      intermediateSupervisor: {
        signature: supervisorSignature,
        user: supervisor,
        isApproved: true,
        dateApproved: Date.now(),
      },
      director: {
        signature: directorSignature,
        user: director,
        isApproved: true,
        dateApproved: Date.now(),
      },
      PMT: {
        signature: PMTSignature,
        user: PMT,
        isApproved: true,
        dateApproved: Date.now(),
      },
    },
  });

const HEADApprove = (
  responseid,
  faculty,
  facultySignature,
  supervisor,
  supervisorSignature,
  director,
  directorSignature,
  PMT,
  PMTSignature,
  HEAD,
  HEADSignature
) =>
  client.put(`/response/${responseid}`, {
    status: {
      faculty: {
        signature: facultySignature,
        user: faculty,
      },
      intermediateSupervisor: {
        signature: supervisorSignature,
        user: supervisor,
        isApproved: true,
        dateApproved: Date.now(),
      },
      director: {
        signature: directorSignature,
        user: director,
        isApproved: true,
        dateApproved: Date.now(),
      },
      PMT: {
        signature: PMTSignature,
        user: PMT,
        isApproved: true,
        dateApproved: Date.now(),
      },
      HEAD: {
        signature: HEADSignature,
        user: HEAD,
        isApproved: true,
        dateApproved: Date.now(),
      },
    },
  });

const HRApprove = (
  responseid,
  faculty,
  facultySignature,
  supervisor,
  supervisorSignature,
  director,
  directorSignature,
  PMT,
  PMTSignature,
  HEAD,
  HEADSignature,
  HR,
  HRSignature
) =>
  client.put(`/response/${responseid}`, {
    status: {
      faculty: {
        signature: facultySignature,
        user: faculty,
      },
      intermediateSupervisor: {
        signature: supervisorSignature,
        user: supervisor,
        isApproved: true,
        dateApproved: Date.now(),
      },
      director: {
        signature: directorSignature,
        user: director,
        isApproved: true,
        dateApproved: Date.now(),
      },
      PMT: {
        signature: PMTSignature,
        user: PMT,
        isApproved: true,
        dateApproved: Date.now(),
      },
      HEAD: {
        signature: HEADSignature,
        user: HEAD,
        isApproved: true,
        dateApproved: Date.now(),
      },
      HR: {
        signature: HRSignature,
        user: HR,
        isApproved: true,
        dateApproved: Date.now(),
      },
    },
  });

const responseApi = {
  getEvaluationResponse,
  evaluateResponse,
  directorApprove,
  PMTApprove,
  HEADApprove,
  HRApprove,
};
export default responseApi;
