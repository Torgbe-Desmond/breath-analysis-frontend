import { Box, Button, Modal } from "@mui/material";

function DeleteQuestionModals({
  deleteModalOpen,
  setDeleteModalOpen,
  confirmDelete,
  questionToDelete
}) {
  return (
    <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
      <Box
        className="modal-pop-up"
        sx={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { sx: 300, lg: 400 },
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          textAlign: "center",
        }}
      >
        <h3>Are you sure you want to delete this question?</h3>
        <p>
          <strong>{questionToDelete?.label}</strong>
        </p>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <button className="btn danger " variant="contained" color="error" onClick={confirmDelete}>
            Delete
          </button>
          <button className="btn" variant="outlined" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeleteQuestionModals;
