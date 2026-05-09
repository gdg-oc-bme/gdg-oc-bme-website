"use client";

import { useState, useCallback } from "react";
import { fetchApi, postApi, putApi, deleteApi, getToken, setToken, clearToken } from "@/lib/api";

type EntityType = "events" | "team" | "articles" | "projects" | "opportunities" | "checkins";

interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "textarea" | "datetime-local" | "date" | "number";
  required?: boolean;
}

const fieldConfigs: Record<EntityType, FieldConfig[]> = {
  events: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea" },
    { key: "dateTime", label: "Date & Time", type: "datetime-local" },
    { key: "location", label: "Location", type: "text" },
    { key: "imageUrl", label: "Image URL", type: "text" },
    { key: "category", label: "Category", type: "text" },
    { key: "checkInCode", label: "Check-in Code", type: "text" },
  ],
  team: [
    { key: "name", label: "Name", type: "text", required: true },
    { key: "role", label: "Role", type: "text", required: true },
    { key: "imageUrl", label: "Image URL", type: "text" },
    { key: "linkedinUrl", label: "LinkedIn URL", type: "text" },
    { key: "githubUrl", label: "GitHub URL", type: "text" },
    { key: "orderIndex", label: "Order", type: "number" },
  ],
  articles: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "content", label: "Content", type: "textarea" },
    { key: "imageUrl", label: "Image URL", type: "text" },
    { key: "author", label: "Author", type: "text" },
    { key: "createdAt", label: "Created At", type: "datetime-local" },
  ],
  projects: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea" },
    { key: "githubLink", label: "GitHub Link", type: "text" },
    { key: "techStack", label: "Tech Stack", type: "text" },
    { key: "imageUrl", label: "Image URL", type: "text" },
  ],
  opportunities: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "company", label: "Company", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "link", label: "Application Link", type: "text" },
    { key: "deadline", label: "Deadline", type: "date" },
    { key: "location", label: "Location", type: "text" },
  ],
  checkins: [
    { key: "eventId", label: "Event ID", type: "number", required: true },
    { key: "memberName", label: "Name", type: "text" },
    { key: "memberEmail", label: "Email", type: "text" },
    { key: "checkedInAt", label: "Checked In At", type: "text" },
  ],
};

const apiPaths: Record<EntityType, string> = {
  events: "/events",
  team: "/team",
  articles: "/articles",
  projects: "/projects",
  opportunities: "/opportunities",
  checkins: "/checkin",
};

const tabLabels: Record<EntityType, string> = {
  events: "Events",
  team: "Team",
  articles: "Articles",
  projects: "Projects",
  opportunities: "Opportunities",
  checkins: "Check-ins",
};

export default function AdminPage() {
  const [token, setTokenState] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<EntityType>("events");
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [creating, setCreating] = useState(false);
  const [eventNames, setEventNames] = useState<Record<string, string>>({});

  const loadItems = useCallback(async (tab: EntityType) => {
    setLoading(true);
    try {
      let path = apiPaths[tab];
      if (tab === "checkins") {
        path = "/checkin";
      }
      const data = await fetchApi<Record<string, unknown>[]>(path);
      setItems(data);
      if (tab === "checkins") {
        const events = await fetchApi<Record<string, unknown>[]>("/events");
        const map: Record<string, string> = {};
        events.forEach((e) => {
          map[String(e.id)] = String(e.title);
        });
        setEventNames(map);
      }
    } catch {
      setItems([]);
    }
    setLoading(false);
  }, []);

  const initAuth = useCallback(() => {
    const t = getToken();
    if (t) {
      setTokenState(t);
      loadItems(activeTab);
    }
    setInitialized(true);
  }, [activeTab, loadItems]);

  if (!initialized) {
    initAuth();
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await postApi<{ token: string }>("/auth/login", {
        email,
        password,
      });
      setToken(res.token);
      setTokenState(res.token);
      loadItems(activeTab);
    } catch {
      setLoginError("Invalid credentials. Try admin@gdgoc.bme.hu / admin123");
    }
  };

  const handleLogout = () => {
    clearToken();
    setTokenState(null);
  };

  const handleTabChange = (tab: EntityType) => {
    setActiveTab(tab);
    setEditing(null);
    setCreating(false);
    if (token) loadItems(tab);
  };

  const handleCreate = async (data: Record<string, unknown>) => {
    try {
      await postApi(apiPaths[activeTab], data, token!);
      setCreating(false);
      loadItems(activeTab);
    } catch {
      alert("Failed to create. Check your input.");
    }
  };

  const handleUpdate = async (data: Record<string, unknown>) => {
    try {
      await putApi(
        `${apiPaths[activeTab]}/${data.id}`,
        data,
        token!
      );
      setEditing(null);
      loadItems(activeTab);
    } catch {
      alert("Failed to update. Check your input.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteApi(`${apiPaths[activeTab]}/${id}`, token!);
      loadItems(activeTab);
    } catch {
      alert("Failed to delete.");
    }
  };

  if (!token) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-xl border border-google-border p-8">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-google-blue rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <h1 className="text-xl font-bold text-google-dark">
                Admin Login
              </h1>
              <p className="text-sm text-google-gray mt-1">
                GDGoC BME Dashboard
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-google-dark mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-google-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-google-blue"
                  placeholder="admin@gdgoc.bme.hu"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-google-dark mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-google-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-google-blue"
                  required
                />
              </div>
              {loginError && (
                <p className="text-google-red text-xs">{loginError}</p>
              )}
              <button
                type="submit"
                className="w-full bg-google-blue text-white py-2 rounded-lg font-medium text-sm hover:bg-blue-600 transition-colors"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const fields = fieldConfigs[activeTab];

  const displayValue = (item: Record<string, unknown>, key: string) => {
    const val = item[key];
    if (val === null || val === undefined) return "-";
    if (key === "eventId" && activeTab === "checkins") {
      const name = eventNames[String(val)];
      return name ? `${val} – ${name}` : String(val);
    }
    if (typeof val === "string" && val.length > 50) return val.slice(0, 50) + "...";
    return String(val);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-google-dark">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-google-gray hover:text-google-red transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-google-border mb-6 overflow-x-auto">
        {(Object.keys(tabLabels) as EntityType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab
                ? "border-google-blue text-google-blue"
                : "border-transparent text-google-gray hover:text-google-dark"
            }`}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      {/* Add button */}
      {activeTab !== "checkins" && (
        <div className="mb-4">
          <button
            onClick={() => {
              setCreating(true);
              setEditing(null);
            }}
            className="bg-google-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            + Add New {tabLabels[activeTab].slice(0, -1)}
          </button>
        </div>
      )}

      {/* Create Form */}
      {creating && (
        <ItemForm
          fields={fields}
          onSave={handleCreate}
          onCancel={() => setCreating(false)}
        />
      )}

      {/* Edit Form */}
      {editing && (
        <ItemForm
          fields={fields}
          initial={editing}
          onSave={handleUpdate}
          onCancel={() => setEditing(null)}
        />
      )}

      {/* Table */}
      {loading ? (
        <p className="text-google-gray text-sm">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-google-gray text-sm">
          No {tabLabels[activeTab].toLowerCase()} found.
        </p>
      ) : (
        <div className="overflow-x-auto border border-google-border rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-google-light">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-google-dark">
                  ID
                </th>
                {fields.slice(0, 3).map((f) => (
                  <th
                    key={f.key}
                    className="text-left px-4 py-3 font-medium text-google-dark"
                  >
                    {f.label}
                  </th>
                ))}
                <th className="text-right px-4 py-3 font-medium text-google-dark">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={String(item.id)}
                  className="border-t border-google-border hover:bg-google-light/50"
                >
                  <td className="px-4 py-3 text-google-gray">{String(item.id)}</td>
                  {fields.slice(0, 3).map((f) => (
                    <td key={f.key} className="px-4 py-3 text-google-dark">
                      {displayValue(item, f.key)}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    {activeTab !== "checkins" && (
                      <button
                        onClick={() => {
                          setEditing(item);
                          setCreating(false);
                        }}
                        className="text-google-blue hover:underline text-xs font-medium mr-3"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(Number(item.id))}
                      className="text-google-red hover:underline text-xs font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ItemForm({
  fields,
  initial,
  onSave,
  onCancel,
}: {
  fields: FieldConfig[];
  initial?: Record<string, unknown> | null;
  onSave: (data: Record<string, unknown>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Record<string, unknown>>(() => {
    if (initial) return { ...initial };
    const obj: Record<string, unknown> = {};
    fields.forEach((f) => {
      obj[f.key] = f.type === "number" ? 0 : "";
    });
    return obj;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-google-light rounded-xl p-6 mb-6 border border-google-border"
    >
      <h3 className="font-semibold text-google-dark mb-4">
        {initial ? "Edit" : "Create"} Item
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.key} className={f.type === "textarea" ? "md:col-span-2" : ""}>
            <label className="block text-sm font-medium text-google-dark mb-1">
              {f.label}
            </label>
            {f.type === "textarea" ? (
              <textarea
                value={String(form[f.key] || "")}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className="w-full border border-google-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-google-blue min-h-[100px]"
                required={f.required}
              />
            ) : (
              <input
                type={f.type}
                value={String(form[f.key] ?? "")}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value,
                  })
                }
                className="w-full border border-google-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-google-blue"
                required={f.required}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="bg-google-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          {initial ? "Save Changes" : "Create"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-google-gray px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
