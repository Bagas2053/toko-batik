export default function AdminRowActions({ onDetail, onEdit, onDelete, hideDelete }) {
  return (
    <div className="d-flex flex-wrap gap-1">
      {onDetail && (
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary rounded-0 px-2"
          onClick={onDetail}
          title="Detail"
          aria-label="Detail"
        >
          <i className="bi bi-eye" />
        </button>
      )}
      {onEdit && (
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary rounded-0 px-2"
          onClick={onEdit}
          title="Ubah"
          aria-label="Ubah"
        >
          <i className="bi bi-pencil" />
        </button>
      )}
      {onDelete && !hideDelete && (
        <button
          type="button"
          className="btn btn-sm btn-outline-danger rounded-0 px-2"
          onClick={onDelete}
          title="Hapus"
          aria-label="Hapus"
        >
          <i className="bi bi-trash" />
        </button>
      )}
    </div>
  );
}
