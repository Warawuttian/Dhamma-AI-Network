// Standalone admin user list script.
// Expects a container element with id="admin-users-table".
// Add <script src="/js/admin.js"></script> to an admin page to use it.

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  return isNaN(d) ? "—" : d.toISOString().replace("T", " ").slice(0, 19) + " UTC";
}

function renderAdminUsers(users) {
  const container = document.getElementById("admin-users-table");
  if (!container) return;
  if (!users.length) {
    container.innerHTML = '<p class="admin-users-empty">No users registered yet.</p>';
    return;
  }
  const rows = users
    .map(
      (u) => `<tr>
        <td>${escapeHtml(u.name) || "—"}</td>
        <td>${escapeHtml(u.email)}</td>
        <td>${escapeHtml(u.role)}</td>
        <td>${escapeHtml(u.google_id)}</td>
        <td>${formatDate(u.created_at)}</td>
        <td>${formatDate(u.last_login)}</td>
      </tr>`
    )
    .join("");
  container.innerHTML = `<table class="admin-users">
    <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Google ID</th><th>Created</th><th>Last Login</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

async function loadAdminUsers() {
  const container = document.getElementById("admin-users-table");
  if (!container) return;
  try {
    const res = await fetch("/admin/users");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    renderAdminUsers(data.users || []);
  } catch (err) {
    container.innerHTML = `<p class="admin-users-error">Failed to load users: ${escapeHtml(err.message)}</p>`;
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadAdminUsers);
} else {
  loadAdminUsers();
}
