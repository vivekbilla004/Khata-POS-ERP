import Modal from "./Modal";

export default function ConfirmDialog({
  open,
  title,
  message,
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <Modal>

      <div className="space-y-5">

        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <p className="text-slate-500">
          {message}
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Delete
          </button>

        </div>

      </div>

    </Modal>
  );
}