import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ collapsed, userRole }) {
  const [open, setOpen] = useState({
    product: false,
    employee: false,
    role: false,
  });

  return (
    <aside
      className={`bg-gray-400 border-r shadow-sm transition-all duration-300 ease-in-out ${collapsed ? "w-20" : "w-64"
        } h-screen sticky top-0 left-0`}
    >
      <nav className="h-full flex flex-col py-2">
        {/* Brand */}
        <div className={`flex items-center px-4 mb-6 ${collapsed ? "justify-center" : ""}`}>
          <NavLink to="/dashboard" className="flex items-center">
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-900 rounded-lg blur opacity-60"></div>
                {collapsed && (
                  <div className="relative border rounded-lg p-2">
                    <span className={`text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-red-700`}>
                      DD
                    </span>
                  </div>
                )}
              </div>
              {!collapsed && (
                <div className="ml-5">
                  <div className="relative pb-3">
                    <span className="text-4xl items-center font-bold text-red-700">
                      DexterDigi
                    </span>
                    <div className="absolute -bottom-1  left-0 right-0 h-[2px] bg-red-500 bg-gradient-to-l from-slate-600 to-transparent"></div>
                  </div>
                </div>
              )}
            </div>
          </NavLink>
        </div>

        <div className="flex-1 px-3 space-y-1 overflow-y-auto">
          {/* Main Menu */}
          {!collapsed && (
            <div className="text-xs font-semibold text-gray-700 uppercase px-2 mb-2">
              Main Menu
            </div>
          )}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                ? "bg-gray-500 text-black"
                : "text-black hover:bg-gray-500 "
              }`
            }
          > 
            <span className="flex items-center justify-center ml-1 w-5 h-5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </span>
            {!collapsed && <span>Dashboard</span>}
          </NavLink>
          
          <hr className=" p-1" />
          {/* Employee Management */}
          {!collapsed && (
            <div className="text-xs font-semibold text-gray-700 uppercase px-2 mt-6 mb-2">
              Employee Management
            </div>
          )}
          <div className="space-y-1">
            <button
              onClick={() => setOpen((prev) => ({ ...prev, employee: !prev.employee }))}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${open.employee ? "bg-gray-500 text-black" : "text-black hover:bg-gray-500  hover:text-gray-900"
                }`}
            >
              <span className="flex items-center justify-center ml-1 w-5 h-5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              {!collapsed && (
                <>
                  <span className="flex-1 text-left ml-3">Employees</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${open.employee ? "rotate-90" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
            {!collapsed && open.employee && (
              <div className="pl-4 space-y-1">
                {userRole === 'Admin' && (
                  <NavLink
                    to="/employees/create"
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 ${isActive
                        ? "bg-red-50 text-gray-800 font-medium"
                      : "text-gray-900 hover:bg-red-100 hover:text-gray-900"
                      }`
                    }
                  >
                    <span className="flex items-center justify-center w-5 h-5 mr-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </span>
                    Add Employee
                  </NavLink>
                )}
                <NavLink
                  to="/employees"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 ${isActive
                       ? "bg-red-50 text-gray-800 font-medium"
                      : "text-gray-900 hover:bg-red-100 hover:text-gray-900"
                    }`
                  }
                >
                  <span className="flex items-center justify-center w-5 h-5 mr-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </span>
                  Employee List
                </NavLink>
              </div>
            )}
          </div>

          <hr className=" p-1" />
          {/* Role Management */}
          {!collapsed && (
            <div className="text-xs font-semibold text-gray-700 uppercase px-2 mt-6 mb-2">
              Role Management
            </div>
          )}

          <div className="space-y-1">
            <button
              onClick={() => setOpen((prev) => ({ ...prev, role: !prev.role }))}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${open.role ? "bg-gray-500 text-black" : "text-black hover:bg-gray-500  hover:text-gray-900"
                }`}
            >
              <span className="flex items-center justify-center ml-1 w-5 h-5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </span>
              {!collapsed && (
                <>
                  <span className="flex-1 text-left ml-3">Role Management</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${open.role ? "rotate-90" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
            {!collapsed && open.role && (
              <div className="pl-4 space-y-1">
                {userRole === 'Admin' && (
                  <NavLink
                    to="/roles/create"
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 ${isActive
                         ? "bg-red-50 text-gray-800 font-medium"
                      : "text-gray-900 hover:bg-red-100 hover:text-gray-900"
                      }`
                    }
                  >
                    <span className="flex items-center justify-center w-5 h-5 mr-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </span>
                    Create Role
                  </NavLink>
                )}
                <NavLink
                  to="/roles"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 ${isActive
                       ? "bg-red-50 text-gray-800 font-medium"
                      : "text-gray-900 hover:bg-red-100 hover:text-gray-900"
                    }`
                  }
                >
                  <span className="flex items-center justify-center w-5 h-5 mr-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  </span>
                  Role List
                </NavLink>
              </div>
            )}
          </div>

          <hr className=" p-1" />
          {/* Product Management */}
          {!collapsed && (
            <div className="text-xs font-semibold text-gray-700 uppercase px-2 mt-6 mb-2">
              Product Management
            </div>
          )}
          <div className="space-y-1">
            <button
              onClick={() => setOpen((prev) => ({ ...prev, product: !prev.product }))}
              className={`flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${open.product ? "bg-gray-500 text-black" : "text-black hover:bg-gray-500 hover:text-gray-900"
                }`}
            >
              <span className="flex items-center justify-center ml-1 w-5 h-5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </span>
              {!collapsed && (
                <>
                  <span className="flex-1 text-left ml-3">Products</span>
                  <svg
                    className={`w-4 h-4 text-black transform transition-transform duration-200 ${open.product ? "rotate-90" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
            {!collapsed && open.product && (
              <div className="pl-4 space-y-1">
                <NavLink
                  to="/products/create"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 ${isActive
                       ? "bg-red-50 text-gray-800 font-medium"
                      : "text-gray-900 hover:bg-red-100 hover:text-gray-900"
                    }`
                  }
                >
                  <span className="flex items-center justify-center w-5 h-5 mr-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </span>
                  Add Product
                </NavLink>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 ${isActive
                      ? "bg-red-50 text-gray-800 font-medium"
                      : "text-gray-900 hover:bg-red-100 hover:text-gray-900"
                    }`
                  }
                >
                  <span className="flex items-center justify-center w-5 h-5 mr-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </span>
                  Product List
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {/* Version or Additional Info */}
        {!collapsed && (
          <div className="mt-auto pt-1 border-t border-gray-200">
            <div className="px-4 py-1">
              <p className="text-xs text-gray-800 text-center">
                Version 1.0.0
              </p>
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
}