"use client";

import { useState, useEffect, useCallback } from "react";

interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  office: string;
  startDate: string | null;
  status: string;
  contactedAt: string | null;
  confirmedAt: string | null;
  notes: string | null;
  createdAt: string;
}

export default function AdminPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesValue, setNotesValue] = useState("");

  const fetchRegistrations = useCallback(async () => {
    try {
      const res = await fetch("/api/register");
      const data = await res.json();
      setRegistrations(data);
    } catch (err) {
      console.error("Failed to fetch registrations:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const updateRegistration = async (
    id: string,
    data: Record<string, unknown>
  ) => {
    try {
      await fetch(`/api/register/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      await fetchRegistrations();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const deleteRegistration = async (id: string, name: string) => {
    if (!confirm(`Delete registration for ${name}? This cannot be undone.`))
      return;
    try {
      await fetch(`/api/register/${id}`, { method: "DELETE" });
      await fetchRegistrations();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const markContacted = (id: string) =>
    updateRegistration(id, {
      status: "CONTACTED",
      contactedAt: new Date().toISOString(),
    });

  const markConfirmed = (id: string) =>
    updateRegistration(id, {
      status: "CONFIRMED",
      confirmedAt: new Date().toISOString(),
    });

  const saveNotes = (id: string) => {
    updateRegistration(id, { notes: notesValue });
    setEditingNotes(null);
  };

  const exportCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Office",
      "Start Date",
      "Status",
      "Notes",
      "Registered",
    ];
    const rows = registrations.map((r) => [
      `${r.firstName} ${r.lastName}`,
      r.email,
      r.phone || "",
      r.office,
      r.startDate || "",
      r.status,
      r.notes || "",
      new Date(r.createdAt).toLocaleDateString(),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `blueprint-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const counts = {
    total: registrations.length,
    new: registrations.filter((r) => r.status === "New").length,
    contacted: registrations.filter((r) => r.status === "CONTACTED").length,
    confirmed: registrations.filter((r) => r.status === "CONFIRMED").length,
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      New: "bg-gray-200 text-gray-700",
      CONTACTED: "bg-amber-100 text-amber-800 border border-amber-300",
      CONFIRMED: "bg-emerald-100 text-emerald-800 border border-emerald-300",
    };
    return (
      <span
        className={`inline-block px-3 py-1 text-xs font-semibold tracking-wide rounded-full ${styles[status] || styles.New}`}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sand-100 flex items-center justify-center">
        <p className="text-coastal-700 font-ui">Loading registrations...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-100">
      {/* Header */}
      <header className="bg-coastal-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl">Coastal Blueprint</h1>
            <p className="text-coastal-400 text-sm mt-1">
              Registration Admin
            </p>
          </div>
          <a
            href="/"
            className="text-coastal-400 hover:text-white text-sm transition-colors"
          >
            &larr; View Site
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Registrations", value: counts.total, color: "border-coastal-600" },
            { label: "New", value: counts.new, color: "border-gray-400" },
            { label: "Contacted", value: counts.contacted, color: "border-amber-400" },
            { label: "Confirmed", value: counts.confirmed, color: "border-emerald-500" },
          ].map((card) => (
            <div
              key={card.label}
              className={`bg-white p-5 border-t-[3px] ${card.color}`}
            >
              <p className="text-gray-500 text-xs font-ui tracking-wide uppercase mb-1">
                {card.label}
              </p>
              <p className="text-coastal-900 text-3xl font-display">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Actions bar */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-ui text-coastal-900 font-semibold text-lg">
            All Registrations
          </h2>
          <button
            onClick={exportCSV}
            className="bg-coastal-900 hover:bg-coastal-800 text-white text-sm font-medium px-5 py-2.5 transition-colors duration-200"
          >
            Export CSV
          </button>
        </div>

        {/* Table */}
        {registrations.length === 0 ? (
          <div className="bg-white p-12 text-center">
            <p className="text-gray-500 font-ui">
              No registrations yet. They&apos;ll appear here once people
              register.
            </p>
          </div>
        ) : (
          <div className="bg-white shadow-sm overflow-x-auto">
            <table className="w-full text-sm font-ui">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="px-4 py-3 font-semibold text-coastal-900">
                    Name
                  </th>
                  <th className="px-4 py-3 font-semibold text-coastal-900">
                    Email
                  </th>
                  <th className="px-4 py-3 font-semibold text-coastal-900">
                    Phone
                  </th>
                  <th className="px-4 py-3 font-semibold text-coastal-900">
                    Office
                  </th>
                  <th className="px-4 py-3 font-semibold text-coastal-900">
                    Start Date
                  </th>
                  <th className="px-4 py-3 font-semibold text-coastal-900">
                    Status
                  </th>
                  <th className="px-4 py-3 font-semibold text-coastal-900">
                    Registered
                  </th>
                  <th className="px-4 py-3 font-semibold text-coastal-900">
                    Notes
                  </th>
                  <th className="px-4 py-3 font-semibold text-coastal-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-gray-100 hover:bg-sand-100/50"
                  >
                    <td className="px-4 py-3 font-medium text-coastal-900">
                      {r.firstName} {r.lastName}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{r.email}</td>
                    <td className="px-4 py-3 text-gray-500">{r.phone || "—"}</td>
                    <td className="px-4 py-3 text-gray-500">{r.office}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {r.startDate || "—"}
                    </td>
                    <td className="px-4 py-3">{statusBadge(r.status)}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {editingNotes === r.id ? (
                        <div className="flex gap-1">
                          <input
                            type="text"
                            value={notesValue}
                            onChange={(e) => setNotesValue(e.target.value)}
                            className="border border-gray-200 px-2 py-1 text-xs w-32 focus:outline-none focus:border-coastal-600"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveNotes(r.id);
                              if (e.key === "Escape") setEditingNotes(null);
                            }}
                          />
                          <button
                            onClick={() => saveNotes(r.id)}
                            className="text-coastal-600 hover:text-coastal-900 text-xs px-1"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingNotes(r.id);
                            setNotesValue(r.notes || "");
                          }}
                          className="text-gray-400 hover:text-coastal-600 text-xs transition-colors"
                        >
                          {r.notes || "Add note"}
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        {r.status === "New" && (
                          <button
                            onClick={() => markContacted(r.id)}
                            className="border border-amber-400 text-amber-700 hover:bg-amber-50 text-xs font-semibold px-3 py-1.5 transition-colors duration-200"
                          >
                            Contacted
                          </button>
                        )}
                        {(r.status === "New" || r.status === "CONTACTED") && (
                          <button
                            onClick={() => markConfirmed(r.id)}
                            className="border border-emerald-400 text-emerald-700 hover:bg-emerald-50 text-xs font-semibold px-3 py-1.5 transition-colors duration-200"
                          >
                            Confirmed
                          </button>
                        )}
                        <button
                          onClick={() =>
                            deleteRegistration(
                              r.id,
                              `${r.firstName} ${r.lastName}`
                            )
                          }
                          className="border border-red-300 text-red-600 hover:bg-red-50 text-xs font-semibold px-3 py-1.5 transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
