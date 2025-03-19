import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import TaskListCard from "../components/cards/TaskListCard";
import {
  fetchTasks,
  fetchDepartments,
  fetchPriorities,
  fetchEmployees,
} from "../services/api";
import { Link, useLocation } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterData, setFilterData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    department: [],
    priority: [],
    employee: [],
  });
  const [pendingFilters, setPendingFilters] = useState({
    department: [],
    priority: [],
    employee: [],
  });

  const dropdownRef = useRef(null);
  const location = useLocation();
  const token = import.meta.env.VITE_API_TOKEN;

  const statusOrder = [
    { id: 1, name: "დასაწყები" },
    { id: 2, name: "პროგრესში" },
    { id: 3, name: "მზად ტესტირებისთვის" },
    { id: 4, name: "დასრულებული" },
  ];

  useEffect(() => {
    fetchTasks(token).then((fetchedTasks) => setTasks(fetchedTasks));
    const savedFilterState = JSON.parse(
      sessionStorage.getItem("selectedFilters")
    );
    if (savedFilterState) {
      setSelectedOptions(savedFilterState);
    }
  }, []);

  useEffect(() => {
    sessionStorage.removeItem("selectedFilters");
  }, [location]);

  const filters = [
    { type: "department", label: "დეპარტამენტი" },
    { type: "priority", label: "პრიორიტეტი" },
    { type: "employee", label: "თანამშრომელი" },
  ];

  const handleFilterClick = async (type) => {
    if (activeFilter === type) {
      setActiveFilter(null);
      return;
    }
    setActiveFilter(type);
    if (type === "department") {
      setFilterData(await fetchDepartments());
    } else if (type === "priority") {
      setFilterData(await fetchPriorities());
    } else if (type === "employee") {
      setFilterData(await fetchEmployees(token));
    }
  };

  const handleCheckboxChange = (filterType, option, checked) => {
    setPendingFilters((prev) => {
      const updated = checked
        ? [...prev[filterType], option]
        : prev[filterType].filter((opt) => opt.id !== option.id);
      return { ...prev, [filterType]: updated };
    });
  };

  const applyFilters = () => {
    setSelectedOptions({ ...pendingFilters });
    sessionStorage.setItem("selectedFilters", JSON.stringify(pendingFilters));
    setActiveFilter(null);
  };

  const removeSelectedOption = (filterType, optionId) => {
    setSelectedOptions((prev) => {
      const updated = prev[filterType].filter((opt) => opt.id !== optionId);
      const newState = { ...prev, [filterType]: updated };
      sessionStorage.setItem("selectedFilters", JSON.stringify(newState));
      return newState;
    });
  };

  const clearAllFilters = () => {
    setSelectedOptions({
      department: [],
      priority: [],
      employee: [],
    });
    setPendingFilters({
      department: [],
      priority: [],
      employee: [],
    });
    sessionStorage.removeItem("selectedFilters");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !e.target.closest(".filter-button")
      ) {
        setActiveFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterTasks = () => {
    return tasks.filter((task) => {
      return (
        (selectedOptions.department.length === 0 ||
          selectedOptions.department.some(
            (opt) => opt.id === task.department.id
          )) &&
        (selectedOptions.priority.length === 0 ||
          selectedOptions.priority.some(
            (opt) => opt.id === task.priority.id
          )) &&
        (selectedOptions.employee.length === 0 ||
          selectedOptions.employee.some((opt) => opt.id === task.employee.id))
      );
    });
  };

  const groupTasksByStatus = (tasks) => {
    return tasks.reduce((acc, task) => {
      const statusId = task.status.id;
      if (!acc[statusId]) {
        acc[statusId] = [];
      }
      acc[statusId].push(task);
      return acc;
    }, {});
  };

  const filteredTasks = filterTasks();
  const groupedTasks = groupTasksByStatus(filteredTasks);

  return (
    <Layout>
      <div className="text-2xl font-semibold mb-[30px]">დავალებების გვერდი</div>

      <div className="relative">
        <div className="flex items-center justify-between w-[688px] h-[44px] gap-[45px] rounded-[10px] border border-[#DEE2E6] mb-[8px] p-4">
          {filters.map(({ type, label }) => (
            <div
              key={type}
              className="flex items-center gap-7 cursor-pointer filter-button"
              onClick={() => handleFilterClick(type)}
            >
              <span
                className={`w-[105px] text-[16px] text-center ${
                  activeFilter === type
                    ? "text-[#8338EC] font-bold"
                    : "text-[#0D0F10]"
                }`}
              >
                {label}
              </span>
              <img src="/assets/arrowDown.png" alt="arrow" />
            </div>
          ))}
        </div>

        {activeFilter && (
          <div
            ref={dropdownRef}
            className="absolute left-0 mt-1 w-[688px] bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10"
          >
            <ul>
              {filterData.map((item) => (
                <li key={item.id} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={
                      pendingFilters[activeFilter]?.some(
                        (opt) => opt.id === item.id
                      ) || false
                    }
                    onChange={(e) =>
                      handleCheckboxChange(activeFilter, item, e.target.checked)
                    }
                  />
                  <span>
                    {activeFilter === "employee"
                      ? item.name + " " + item.surname
                      : item.name}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                onClick={applyFilters}
                className="bg-[#8338EC] w-[155px] h-[35px] py-[8px] px-[20px] rounded-[20px] flex items-center justify-center text-white font-bold cursor-pointer"
              >
                არჩევა
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-[30px]">
        {Object.keys(selectedOptions).map((filterType) =>
          selectedOptions[filterType].map((option) => (
            <button
              key={`${filterType}-${option.id}`}
              onClick={() => removeSelectedOption(filterType, option.id)}
              className="w-[100px] h-[29px] rounded-[43px] border border-[#CED4DA] pt-[6px] pr-[10px] pb-[6px] pl-[10px] flex items-center justify-between text-[#343A40] cursor-pointer"
            >
              <span className="text-[12px]">
                {filterType === "department"
                  ? option.name.length > 6
                    ? option.name.substring(0, 6) + "..."
                    : option.name
                  : filterType === "employee"
                  ? option.surname
                  : option.name}
              </span>
              <img
                src="/assets/close.png"
                alt="close"
                className="w-[14px] h-[14px]"
              />
            </button>
          ))
        )}
        {Object.values(selectedOptions).some((arr) => arr.length > 0) && (
          <button onClick={clearAllFilters} className="text-[#343A40]">
            <span className="text-[14px] cursor-pointer ml-2">გასუფთავება</span>
          </button>
        )}
      </div>

      <div className="flex justify-between gap-[30px] mt-[30px]">
        {statusOrder.map((status) => (
          <div key={status.id} className="w-[381px]  rounded-[10px]">
            <StatusBadge statusName={status.name} />
            <div>
              {groupedTasks[status.id]?.map((task) => (
                <Link to={`/task/${task.id}`} key={task.id}>
                  <TaskListCard task={task} />
                </Link>
              )) || ""}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default TaskListPage;
